// <reference path="../typings/tsd.d.ts" />
// <reference path="./cluster-helpers.ts" />
// <reference path="../modal/modal-helpers.ts" />
// <reference path="../typings/node.d.ts"/>
var cluster_helpers_1 = require('./cluster-helpers');
var ModalHelpers = require('../modal/modal-helpers');
var volume_helpers_1 = require('../volumes/volume-helpers');
var ClusterNewController = (function () {
    /**
     * Initializing the properties of the class ClusterNewController.
     */
    function ClusterNewController(qService, logService, scopeService, modalService, timeoutService, locationService, volumeService, clusterService, serverService, osdService, poolService, utilService, requestService, requestTrackingService, configSvc) {
        var _this = this;
        this.qService = qService;
        this.logService = logService;
        this.scopeService = scopeService;
        this.modalService = modalService;
        this.timeoutService = timeoutService;
        this.locationService = locationService;
        this.volumeService = volumeService;
        this.clusterService = clusterService;
        this.serverService = serverService;
        this.osdService = osdService;
        this.poolService = poolService;
        this.utilService = utilService;
        this.requestService = requestService;
        this.requestTrackingService = requestTrackingService;
        this.configSvc = configSvc;
        this.minMonsRequired = 3;
        this.journalSize = { value: 5, unit: 'GB' };
        this.sizeUnits = ['MB', 'GB'];
        this.openstack = false;
        this.cephMixHostRoles = false;
        this.postAcceptHostCallBack = function (host) {
            _this.serverService.getByHostname(host.hostname).then(function (hostFound) {
                host.id = hostFound.nodeid;
                _this.selectHost(host, true);
            });
        };
        this.step = 1;
        this.clusterHelper = new cluster_helpers_1.ClusterHelper(utilService, requestService, logService, timeoutService);
        this.newVolume = {};
        this.newPool = {};
        this.hosts = [];
        this.volumes = [];
        this.pools = [];
        this.disks = [];
        this.newHost = {};
        this.hostTypes = ["Monitor", "OSD Host", "OSD + Monitor"];
        this.availableNetworks = [];
        this.selectedHosts = 0;
        this.clusterTypes = this.clusterHelper.getClusterTypes();
        this.clusterType = this.clusterTypes[1];
        this.openstackServices = angular.copy(this.clusterHelper.getOpenStackServices());
        this.newVolume.copyCount = volume_helpers_1.VolumeHelpers.getRecomendedCopyCount();
        this.newVolume.copyCountList = volume_helpers_1.VolumeHelpers.getCopiesList();
        this.newVolume.sizeUnits = volume_helpers_1.VolumeHelpers.getTargetSizeUnits();
        this.newVolume.sizeUnit = _.first(this.newVolume.sizeUnits);
        this.newPool.copyCountList = volume_helpers_1.VolumeHelpers.getCopiesList();
        this.newPool.copyCount = volume_helpers_1.VolumeHelpers.getRecomendedCopyCount();
        var queryParams = locationService.search();
        if (Object.keys(queryParams).length > 0 && queryParams['hostsaccepted'] === "true") {
            this.fetchFreeHosts();
        }
        else {
            this.serverService.getDiscoveredHosts().then(function (freeHosts) {
                if (freeHosts.length > 0) {
                    var modal = ModalHelpers.UnAcceptedHostsFound(_this.modalService, {}, freeHosts.length);
                    modal.$scope.$hide = _.wrap(modal.$scope.$hide, function ($hide, confirmed) {
                        if (confirmed) {
                            _this.locationService.path('/clusters/new/accept-hosts');
                        }
                        $hide();
                        _this.fetchFreeHosts();
                    });
                }
                else {
                    _this.fetchFreeHosts();
                }
            });
        }
        this.configSvc.getConfig().then(function (config) {
            if (config.ceph_min_monitors) {
                _this.minMonsRequired = config.ceph_min_monitors;
            }
            if (config.ceph_mix_host_roles) {
                _this.cephMixHostRoles = config.ceph_mix_host_roles;
            }
        });
    }
    ClusterNewController.prototype.updateFingerPrint = function (host) {
        var _this = this;
        this.newHost.cautionMessage = "";
        this.newHost.errorMessage = "";
        this.utilService.getSshFingerprint(host.hostname).then(function (sshfingerprint) {
            host.sshfingerprint = sshfingerprint;
        }, function () {
            _this.newHost.cautionMessage = "Error!.";
            _this.newHost.errorMessage = "Could not fetch ssh fingerprint";
        });
    };
    ClusterNewController.prototype.updateIPAddress = function (host) {
        this.utilService.getIpAddresses(host.hostname).then(function (result) {
            host.ipaddress = result.length > 0 ? result[0] : "N/A";
        });
    };
    ClusterNewController.prototype.fetchFreeHosts = function () {
        var _this = this;
        this.serverService.getFreeHosts().then(function (freeHosts) { return _this.loadFreeHosts(freeHosts); });
    };
    ClusterNewController.prototype.loadFreeHosts = function (freeHosts) {
        var _this = this;
        this.hosts = [];
        this.availableNetworks = [];
        var subnets = new Set();
        _.each(freeHosts, function (freeHost) {
            var host = {
                id: freeHost.nodeid,
                hostname: freeHost.hostname,
                ipaddress: freeHost.management_ip4,
                state: "ACCEPTED",
                disks: freeHost.storage_disks,
                selected: false,
            };
            host.disks = _.filter(freeHost.storage_disks, function (disk) {
                return disk.Type === 'disk' && disk.Used == false;
            });
            _this.hosts.push(host);
            _this.updateFingerPrint(host);
            _.each(freeHost.network_info.Subnet, function (network) {
                subnets.add(network);
            });
        });
        subnets.forEach(function (network) {
            _this.availableNetworks.push({ address: network, cluster: false, access: false });
        });
        if (this.availableNetworks.length > 0) {
            this.availableNetworks[0].cluster = true;
            this.availableNetworks[0].access = true;
        }
    };
    ClusterNewController.prototype.isMon = function (hostType) {
        return hostType === this.hostTypes[0] || hostType === this.hostTypes[2];
    };
    ClusterNewController.prototype.isOsd = function (hostType) {
        return hostType === this.hostTypes[1] || hostType === this.hostTypes[2];
    };
    ClusterNewController.prototype.getDisks = function () {
        return this.disks;
    };
    ClusterNewController.prototype.getHostsDisksSize = function (host) {
        var size = 0;
        size = _.reduce(host.disks, function (size, disk) {
            return size + disk.Size;
        }, 0);
        return size;
    };
    ClusterNewController.prototype.getDisksSize = function () {
        var size = 0;
        size = _.reduce(this.disks, function (size, disk) {
            return size + disk.Size;
        }, 0);
        return size;
    };
    ClusterNewController.prototype.countDisks = function () {
        var _this = this;
        var disks = [];
        _.each(this.hosts, function (host) {
            if (host.selected && _this.isOsd(host.hostType)) {
                Array.prototype.push.apply(disks, _this.getHostFreeDisks(host));
            }
        });
        this.disks = disks;
    };
    ClusterNewController.prototype.getHostFreeDisks = function (host) {
        var freeDisks = _.filter(host.disks, function (disk) {
            return disk.Type === 'disk' && disk.Used == false;
        });
        return freeDisks;
    };
    ClusterNewController.prototype.hostTypeChanged = function (host) {
        this.validateHost(host);
        this.countDisks();
    };
    ClusterNewController.prototype.validateHost = function (host) {
        if (host.selected) {
            if (host.hostType === undefined) {
                this.errorMessage = "Host '" + host.hostname + "' does not have any role attached.";
                return false;
            }
            else if (this.isOsd(host.hostType) && this.getHostFreeDisks(host).length === 0) {
                this.errorMessage = "Host '" + host.hostname + "' does not have any disk attached and it can't be added as an OSD Host.";
                return false;
            }
        }
        this.errorMessage = "";
        return true;
    };
    ClusterNewController.prototype.selectHost = function (host, selection) {
        host.selected = selection;
        if (selection && host.hostType === undefined) {
            if (this.getHostFreeDisks(host).length === 0) {
                host.hostType = this.hostTypes[0]; //No Disk available so make this a Mon
            }
            else {
                host.hostType = this.hostTypes[1]; //There are some disks so it can be an OSD
            }
        }
        host.selected ? this.selectedHosts++ : this.selectedHosts--;
        this.countDisks();
        this.validateHost(host);
    };
    ClusterNewController.prototype.selectAllHosts = function () {
        var _this = this;
        this.selectedHosts = 0;
        _.each(this.hosts, function (host) {
            _this.selectHost(host, true);
        });
    };
    ClusterNewController.prototype.showDisks = function () {
        var template = 'views/clusters/storageprofile/storage-profile-disks.html';
        var myModal = this.modalService({ template: template, container: 'body', });
    };
    ClusterNewController.prototype.sortHostsInSummary = function () {
        this.summaryHostsSortOrder = this.summaryHostsSortOrder === '-hostname' ? 'hostname' : '-hostname';
    };
    ClusterNewController.prototype.addNewHost = function () {
        this.clusterHelper.addNewHost(this, this.serverService, this.timeoutService, this.requestService);
    };
    ClusterNewController.prototype.postAddNewHost = function (host) {
        this.clusterHelper.acceptNewHost(this, host);
    };
    ClusterNewController.prototype.acceptHost = function (host) {
        this.clusterHelper.acceptHost(this, host);
    };
    ClusterNewController.prototype.acceptAllHosts = function () {
        var _this = this;
        _.each(this.hosts, function (host) {
            if (host.state === "UNACCEPTED") {
                _this.acceptHost(host);
            }
        });
    };
    ClusterNewController.prototype.postAcceptHost = function (host) {
        if (host.id) {
            this.selectHost(host, true);
        }
        else {
            this.postAcceptHostCallBack(host);
        }
    };
    ClusterNewController.prototype.removeHost = function (host) {
        _.remove(this.hosts, function (currentHost) {
            return currentHost.hostname === host.hostname;
        });
    };
    ClusterNewController.prototype.addNewVolume = function (newVolume) {
        var freeDisks = _.filter(this.disks, function (disk) {
            return !disk.used;
        });
        var devicesMap = _.groupBy(freeDisks, function (disk) {
            return disk.node;
        });
        var devicesList = _.map(devicesMap, function (disks) {
            return disks;
        });
        var selectedDisks = volume_helpers_1.VolumeHelpers.getStorageDevicesForVolumeBasic(newVolume.size, newVolume.copyCount, devicesList);
        _.each(selectedDisks, function (selectedDisk) {
            selectedDisk.used = true;
        });
        newVolume.disks = selectedDisks;
        this.volumes.push(newVolume);
        this.newVolume = {};
        this.newVolume = {
            copyCountList: volume_helpers_1.VolumeHelpers.getCopiesList(),
            copyCount: volume_helpers_1.VolumeHelpers.getRecomendedCopyCount(),
            sizeUnits: volume_helpers_1.VolumeHelpers.getTargetSizeUnits(),
            sizeUnit: _.first(this.newVolume.sizeUnits)
        };
    };
    ClusterNewController.prototype.addNewPool = function (newPool) {
        this.pools.push(newPool);
        this.newPool = {
            copyCountList: volume_helpers_1.VolumeHelpers.getCopiesList(),
            copyCount: volume_helpers_1.VolumeHelpers.getRecomendedCopyCount()
        };
    };
    ClusterNewController.prototype.moveStep = function (nextStep) {
        var _this = this;
        this.errorMessage = "";
        var configValid = true;
        var monCount = 0;
        if (this.step === 1) {
            configValid = this.clusterName !== undefined && this.clusterName.trim().length > 0 && this.journalSize.value > 0;
        }
        else if (this.step === 2 && nextStep === 1) {
            monCount = this.getMonCount();
            if (monCount < this.minMonsRequired) {
                this.errorMessage = " Choose at least " + this.minMonsRequired + " monitors to continue";
                configValid = false;
            }
            else if (monCount % 2 === 0) {
                this.errorMessage = " Number of Monitors cannot be even";
                configValid = false;
            }
            else {
                configValid = _.every(this.hosts, function (host) { return _this.validateHost(host); });
            }
        }
        this.step = configValid ? this.step + nextStep : this.step;
    };
    ClusterNewController.prototype.isSubmitAvailable = function () {
        return this.step === 4;
    };
    ClusterNewController.prototype.isBackAvailable = function () {
        return this.step !== 1;
    };
    ClusterNewController.prototype.cancel = function () {
        this.locationService.path('/clusters').search({});
    };
    ClusterNewController.prototype.glusterCallBack = function (requests, volumes) {
        var _this = this;
        this.qService.all(requests).then(function (results) {
            var index = 0;
            while (index < results.length) {
                if (results[index].status === 202) {
                    _this.requestTrackingService.add(results[index].data, 'Creating volume \'' + volumes[index].name);
                }
                ++index;
            }
        });
    };
    ClusterNewController.prototype.postGlusterClusterCreate = function (cluster, volumes) {
        var _this = this;
        var requests = [];
        _.each(volumes, function (volume) {
            var localVolume = {
                cluster: cluster.cluster_id,
                volume_name: volume.name,
                volume_type: 2,
                replica_count: volume.copyCount,
                bricks: []
            };
            _.each(volume.disks, function (device) {
                var brick = {
                    node: device.node,
                    storage_device: device.storage_device_id
                };
                localVolume.bricks.push(brick);
            });
            console.log(localVolume);
            requests.push(_this.volumeService.create(localVolume));
        });
        this.glusterCallBack(requests, volumes);
    };
    ClusterNewController.prototype.createCephPoolsCallBack = function (cluster, poolsRequest) {
        var _this = this;
        this.poolService.create(poolsRequest).then(function (result) {
            if (result.status === 202) {
                _this.requestTrackingService.add(result.data, 'Creating pools in cluster \'' + cluster.cluster_name + '\'');
            }
            else {
                _this.logService.error('Unexpected response from Pools.create', result);
            }
        });
    };
    ClusterNewController.prototype.createCephPools = function (cluster, disks, pools) {
        var _this = this;
        this.logService.info('Post OSD Create');
        var poolsRequest = {
            cluster: cluster.cluster_id,
            pools: []
        };
        _.each(pools, function (pool) {
            poolsRequest.pools.push({
                pool_name: pool.name,
                pg_num: parseInt(pool.pgNum)
            });
            if (poolsRequest.pools.length > 0) {
                _this.createCephPoolsCallBack(cluster, poolsRequest);
            }
        });
    };
    ClusterNewController.prototype.addingOSDsCallBack = function (result, cluster, disks, pools) {
        var _this = this;
        this.logService.info('Adding OSDs callback ' + result.data);
        this.requestService.get(result.data).then(function (request) {
            if (request.staus === 'FAILED' || request.status === 'FAILURE') {
                _this.logService.info('Adding OSDs to cluster\'' + _this.clusterName + '\'  is failed');
            }
            else if (request.status === 'SUCCESS') {
                _this.logService.info('Adding OSDs to cluster \'' + _this.clusterName + '\' is completed successfully');
                _this.createCephPools(cluster, disks, pools);
            }
            else {
                _this.logService.info('Waiting for OSDs to be added to cluster \'' + _this.clusterName + '\'');
                _this.timeoutService(function () { return _this.addingOSDsCallBack(result, cluster, disks, pools); }, 5000);
            }
        });
    };
    ClusterNewController.prototype.cephCallBack = function (osds, cluster, disks, pools) {
        var _this = this;
        this.osdService.create(osds).then(function (result) {
            _this.requestTrackingService.add(result.data, 'Adding OSDs to cluster \'' + cluster.cluster_name + '\'');
            _this.addingOSDsCallBack(result, cluster, disks, pools);
            _this.timeoutService(function () { return _this.addingOSDsCallBack(result, cluster, disks, pools); }, 5000);
        });
    };
    ClusterNewController.prototype.postCephClusterCreate = function (cluster, disks, pools) {
        var osdList = [];
        _.each(disks, function (disk) {
            var osd = {
                node: disk.node,
                storage_device: disk.storage_device_id
            };
            osdList.push(osd);
        });
        var osds = {
            osds: osdList
        };
        this.cephCallBack(osds, cluster, disks, pools);
    };
    ClusterNewController.prototype.postClusterCreate = function (cluster, disks, volumes, pools) {
        this.logService.info('Post Cluster Create');
        if (this.clusterType.type === 'Gluster') {
            this.postGlusterClusterCreate(cluster, volumes);
        }
        else {
            this.postCephClusterCreate(cluster, disks, pools);
        }
    };
    ClusterNewController.prototype.clusterCreateSuccessCallBack = function (cluster) {
        var _this = this;
        var disks = this.getDisks();
        var volumes = this.volumes;
        var pools = this.pools;
        this.clusterService.getByName(this.clusterName).then(function (result) {
            cluster.cluster_id = result.cluster_id;
            _this.postClusterCreate(cluster, disks, volumes, pools);
        });
    };
    ClusterNewController.prototype.clusterCreateCallBack = function (result, cluster) {
        var _this = this;
        this.logService.info("Cluster Create CallBack" + result.data);
        this.requestService.get(result.data).then(function (request) {
            if (request.status === 'FAILED' || request.status === 'FAILURE') {
                _this.logService.info('Creating cluster \'' + _this.clusterName + '\' is failed');
            }
            else if (request.status === 'SUCCESS') {
                _this.logService.info('Cluster \'' + _this.clusterName + '\' is created successfully');
                _this.clusterCreateSuccessCallBack(cluster);
            }
            else {
                _this.logService.info('Waiting for Cluster \'' + _this.clusterName + '\' to be ready');
                _this.timeoutService(function () { return _this.clusterCreateCallBack(result, cluster); }, 5000);
            }
        });
    };
    ClusterNewController.prototype.createCluster = function (cluster) {
        var _this = this;
        this.clusterService.create(cluster).then(function (result) {
            if (result.status === 202) {
                _this.requestService.get(result.data.taskid).then(function (task) {
                    _this.requestTrackingService.add(task.id, task.name);
                });
                var modal = ModalHelpers.SuccessfulRequest(_this.modalService, {
                    title: 'Create Cluster Request is Submitted',
                    container: '.usmClientApp'
                });
                modal.$scope.$hide = _.wrap(modal.$scope.$hide, function ($hide) {
                    $hide();
                    _this.locationService.path('/tasks/' + result.data.taskid);
                });
            }
            else {
                _this.logService.error('Unexpected response from Clusters.create:', result);
            }
        });
    };
    ClusterNewController.prototype.getOSDHosts = function () {
        var _this = this;
        return _.filter(this.hosts, function (host) { return host.selected && _this.isOsd(host.hostType); });
    };
    ClusterNewController.prototype.getMonCount = function () {
        var _this = this;
        var count = 0;
        _.each(this.hosts, function (host) {
            if (host.selected && _this.isMon(host.hostType)) {
                count++;
            }
        });
        return count;
    };
    ClusterNewController.prototype.submit = function () {
        var _this = this;
        var nodes = [];
        _.each(this.hosts, function (host) {
            if (host.selected) {
                var localHost = {
                    nodeid: host.id,
                    nodetype: []
                };
                var disks = [];
                if (_this.isOsd(host.hostType)) {
                    localHost.nodetype.push('OSD');
                    localHost.disks = _.map(host.disks, function (disk) {
                        return { name: disk.DevName, fstype: 'xfs' };
                    });
                }
                if (_this.isMon(host.hostType)) {
                    localHost.nodetype.push('MON');
                }
                nodes.push(localHost);
            }
        });
        var clusterNetwork = _.find(this.availableNetworks, function (network) {
            return network.cluster;
        });
        var accessNetwork = _.find(this.availableNetworks, function (network) {
            return network.access;
        });
        var networks = {
            cluster: clusterNetwork.address,
            public: accessNetwork.address
        };
        var cluster = {
            name: this.clusterName,
            type: this.clusterType.type,
            journalSize: this.journalSize.value + this.journalSize.unit,
            nodes: nodes,
            networks: networks
        };
        this.createCluster(cluster);
    };
    ClusterNewController.$inject = [
        '$q',
        '$log',
        '$scope',
        '$modal',
        '$timeout',
        '$location',
        'VolumeService',
        'ClusterService',
        'ServerService',
        'OSDService',
        'PoolService',
        'UtilService',
        'RequestService',
        'RequestTrackingService',
        'ConfigService'
    ];
    return ClusterNewController;
})();
exports.ClusterNewController = ClusterNewController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2x1c3RlcnMvY2x1c3Rlci1uZXcudHMiXSwibmFtZXMiOlsiQ2x1c3Rlck5ld0NvbnRyb2xsZXIiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLnVwZGF0ZUZpbmdlclByaW50IiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIudXBkYXRlSVBBZGRyZXNzIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuZmV0Y2hGcmVlSG9zdHMiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5sb2FkRnJlZUhvc3RzIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuaXNNb24iLCJDbHVzdGVyTmV3Q29udHJvbGxlci5pc09zZCIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmdldERpc2tzIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuZ2V0SG9zdHNEaXNrc1NpemUiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5nZXREaXNrc1NpemUiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5jb3VudERpc2tzIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuZ2V0SG9zdEZyZWVEaXNrcyIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmhvc3RUeXBlQ2hhbmdlZCIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLnZhbGlkYXRlSG9zdCIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLnNlbGVjdEhvc3QiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5zZWxlY3RBbGxIb3N0cyIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLnNob3dEaXNrcyIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLnNvcnRIb3N0c0luU3VtbWFyeSIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmFkZE5ld0hvc3QiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5wb3N0QWRkTmV3SG9zdCIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmFjY2VwdEhvc3QiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5hY2NlcHRBbGxIb3N0cyIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLnBvc3RBY2NlcHRIb3N0IiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIucmVtb3ZlSG9zdCIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmFkZE5ld1ZvbHVtZSIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmFkZE5ld1Bvb2wiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5tb3ZlU3RlcCIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmlzU3VibWl0QXZhaWxhYmxlIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuaXNCYWNrQXZhaWxhYmxlIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuY2FuY2VsIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuZ2x1c3RlckNhbGxCYWNrIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIucG9zdEdsdXN0ZXJDbHVzdGVyQ3JlYXRlIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuY3JlYXRlQ2VwaFBvb2xzQ2FsbEJhY2siLCJDbHVzdGVyTmV3Q29udHJvbGxlci5jcmVhdGVDZXBoUG9vbHMiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5hZGRpbmdPU0RzQ2FsbEJhY2siLCJDbHVzdGVyTmV3Q29udHJvbGxlci5jZXBoQ2FsbEJhY2siLCJDbHVzdGVyTmV3Q29udHJvbGxlci5wb3N0Q2VwaENsdXN0ZXJDcmVhdGUiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5wb3N0Q2x1c3RlckNyZWF0ZSIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLmNsdXN0ZXJDcmVhdGVTdWNjZXNzQ2FsbEJhY2siLCJDbHVzdGVyTmV3Q29udHJvbGxlci5jbHVzdGVyQ3JlYXRlQ2FsbEJhY2siLCJDbHVzdGVyTmV3Q29udHJvbGxlci5jcmVhdGVDbHVzdGVyIiwiQ2x1c3Rlck5ld0NvbnRyb2xsZXIuZ2V0T1NESG9zdHMiLCJDbHVzdGVyTmV3Q29udHJvbGxlci5nZXRNb25Db3VudCIsIkNsdXN0ZXJOZXdDb250cm9sbGVyLnN1Ym1pdCJdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBQzNDLDRDQUE0QztBQUM1QyxpREFBaUQ7QUFDakQs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LEVBQUVBLFFBQVFBLENBQUNBLGNBQWNBO2dCQUNsQ0EsS0FBS0EsRUFBRUEsVUFBVUE7Z0JBQ2pCQSxLQUFLQSxFQUFFQSxRQUFRQSxDQUFDQSxhQUFhQTtnQkFDN0JBLFFBQVFBLEVBQUVBLEtBQUtBO2FBQ2xCQSxDQUFDQTtZQUNGQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxhQUFhQSxFQUFFQSxVQUFDQSxJQUFTQTtnQkFDcERBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLEtBQUtBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLEtBQUtBLENBQUNBO1lBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNIQSxLQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN0QkEsS0FBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM3QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsRUFBRUEsVUFBQ0EsT0FBT0E7Z0JBQ3pDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUN6QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDUEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDSEEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsT0FBT0E7WUFDcEJBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsT0FBT0EsRUFBRUEsS0FBS0EsRUFBRUEsTUFBTUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDckZBLENBQUNBLENBQUNBLENBQUNBO1FBQ0hBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0Es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QkEsQ0FBQ0E7UUFDRkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBN2pCTTVDLDRCQUFPQSxHQUFrQkE7UUFDNUJBLElBQUlBO1FBQ0pBLE1BQU1BO1FBQ05BLFFBQVFBO1FBQ1JBLFFBQVFBO1FBQ1JBLFVBQVVBO1FBQ1ZBLFdBQVdBO1FBQ1hBLGVBQWVBO1FBQ2ZBLGdCQUFnQkE7UUFDaEJBLGVBQWVBO1FBQ2ZBLFlBQVlBO1FBQ1pBLGFBQWFBO1FBQ2JBLGFBQWFBO1FBQ2JBLGdCQUFnQkE7UUFDaEJBLHdCQUF3QkE7UUFDeEJBLGVBQWVBO0tBQ2xCQSxDQUFDQTtJQThpQk5BLDJCQUFDQTtBQUFEQSxDQTVsQkEsQUE0bEJDQSxJQUFBO0FBNWxCWSw0QkFBb0IsdUJBNGxCaEMsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL2NsdXN0ZXJzL2NsdXN0ZXItbmV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG4vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NsdXN0ZXItaGVscGVycy50c1wiIC8+XG4vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tb2RhbC9tb2RhbC1oZWxwZXJzLnRzXCIgLz5cbi8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3Mvbm9kZS5kLnRzXCIvPlxuXG5pbXBvcnQge1Bvb2x9IGZyb20gJy4vY2x1c3Rlci1tb2RhbHMnO1xuaW1wb3J0IHtIb3N0fSBmcm9tICcuL2NsdXN0ZXItbW9kYWxzJztcbmltcG9ydCB7T1NEU2VydmljZX0gZnJvbSAnLi4vcmVzdC9vc2QnO1xuaW1wb3J0IHtWb2x1bWV9IGZyb20gJy4vY2x1c3Rlci1tb2RhbHMnO1xuaW1wb3J0IHtDbHVzdGVyfSBmcm9tICcuL2NsdXN0ZXItbW9kYWxzJztcbmltcG9ydCB7T3BlbnN0YWNrU2VydmljZX0gZnJvbSAnLi9jbHVzdGVyLW1vZGFscyc7XG5pbXBvcnQge1Bvb2xTZXJ2aWNlfSBmcm9tICcuLi9yZXN0L3Bvb2wnO1xuaW1wb3J0IHtVdGlsU2VydmljZX0gZnJvbSAnLi4vcmVzdC91dGlsJztcbmltcG9ydCB7S2V5VmFsdWV9IGZyb20gJy4vY2x1c3Rlci1tb2RhbHMnO1xuaW1wb3J0IHtTZXJ2ZXJTZXJ2aWNlfSBmcm9tICcuLi9yZXN0L3NlcnZlcic7XG5pbXBvcnQge1ZvbHVtZVNlcnZpY2V9IGZyb20gJy4uL3Jlc3Qvdm9sdW1lJztcbmltcG9ydCB7UmVxdWVzdFNlcnZpY2V9IGZyb20gJy4uL3Jlc3QvcmVxdWVzdCc7XG5pbXBvcnQge0NsdXN0ZXJTZXJ2aWNlfSBmcm9tICcuLi9yZXN0L2NsdXN0ZXJzJztcbmltcG9ydCB7Q29uZmlnU2VydmljZX0gZnJvbSAnLi4vcmVzdC9jb25maWcnO1xuaW1wb3J0IHtDbHVzdGVySGVscGVyfSBmcm9tICcuL2NsdXN0ZXItaGVscGVycyc7XG5pbXBvcnQgKiBhcyBNb2RhbEhlbHBlcnMgZnJvbSAnLi4vbW9kYWwvbW9kYWwtaGVscGVycyc7XG5pbXBvcnQge1ZvbHVtZUhlbHBlcnN9IGZyb20gJy4uL3ZvbHVtZXMvdm9sdW1lLWhlbHBlcnMnO1xuaW1wb3J0IHtSZXF1ZXN0VHJhY2tpbmdTZXJ2aWNlfSBmcm9tICcuLi9yZXF1ZXN0cy9yZXF1ZXN0LXRyYWNraW5nLXN2Yyc7XG5pbXBvcnQge251bWVyYWx9IGZyb20gJy4uL2Jhc2UvbGlicyc7XG5cbmV4cG9ydCBjbGFzcyBDbHVzdGVyTmV3Q29udHJvbGxlciB7XG4gICAgcHJpdmF0ZSBzdGVwOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBtaW5Nb25zUmVxdWlyZWQgPSAzO1xuICAgIHByaXZhdGUgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBzdW1tYXJ5SG9zdHNTb3J0T3JkZXI6IGFueTtcblxuICAgIHByaXZhdGUgY2x1c3Rlck5hbWU6IGFueTtcbiAgICBwcml2YXRlIGNsdXN0ZXJUeXBlczogQXJyYXk8Q2x1c3Rlcj47XG4gICAgcHJpdmF0ZSBjbHVzdGVyVHlwZTogQ2x1c3RlcjtcbiAgICBwcml2YXRlIGpvdXJuYWxTaXplID0geyB2YWx1ZTogNSwgdW5pdDogJ0dCJyB9O1xuICAgIHByaXZhdGUgc2l6ZVVuaXRzID0gWydNQicsICdHQiddO1xuXG4gICAgcHJpdmF0ZSBvcGVuc3RhY2sgPSBmYWxzZTtcbiAgICBwcml2YXRlIG9wZW5zdGFja1NlcnZpY2VzOiBBcnJheTxPcGVuc3RhY2tTZXJ2aWNlPjtcblxuICAgIHByaXZhdGUgbmV3SG9zdDogYW55O1xuICAgIHByaXZhdGUgaG9zdHM6IEFycmF5PGFueT47XG4gICAgcHJpdmF0ZSBob3N0VHlwZXM6IEFycmF5PHN0cmluZz47XG4gICAgcHJpdmF0ZSBkaXNrczogQXJyYXk8YW55PjtcbiAgICBwcml2YXRlIG9zZHM6IEFycmF5PGFueT47XG5cbiAgICBwcml2YXRlIGF2YWlsYWJsZU5ldHdvcmtzOiBBcnJheTxhbnk+O1xuXG4gICAgcHJpdmF0ZSB2b2x1bWVzOiBBcnJheTxhbnk+O1xuICAgIHByaXZhdGUgbmV3Vm9sdW1lOiBhbnk7XG4gICAgcHJpdmF0ZSBwb29sczogQXJyYXk8YW55PjtcbiAgICBwcml2YXRlIG5ld1Bvb2w6IGFueTtcbiAgICBwcml2YXRlIGNsdXN0ZXJIZWxwZXI6IENsdXN0ZXJIZWxwZXI7XG4gICAgcHJpdmF0ZSBzZWxlY3RlZEhvc3RzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBjZXBoTWl4SG9zdFJvbGVzOiBib29sZWFuID0gZmFsc2U7XG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbXG4gICAgICAgICckcScsXG4gICAgICAgICckbG9nJyxcbiAgICAgICAgJyRzY29wZScsXG4gICAgICAgICckbW9kYWwnLFxuICAgICAgICAnJHRpbWVvdXQnLFxuICAgICAgICAnJGxvY2F0aW9uJyxcbiAgICAgICAgJ1ZvbHVtZVNlcnZpY2UnLFxuICAgICAgICAnQ2x1c3RlclNlcnZpY2UnLFxuICAgICAgICAnU2VydmVyU2VydmljZScsXG4gICAgICAgICdPU0RTZXJ2aWNlJyxcbiAgICAgICAgJ1Bvb2xTZXJ2aWNlJyxcbiAgICAgICAgJ1V0aWxTZXJ2aWNlJyxcbiAgICAgICAgJ1JlcXVlc3RTZXJ2aWNlJyxcbiAgICAgICAgJ1JlcXVlc3RUcmFja2luZ1NlcnZpY2UnLFxuICAgICAgICAnQ29uZmlnU2VydmljZSdcbiAgICBdO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemluZyB0aGUgcHJvcGVydGllcyBvZiB0aGUgY2xhc3MgQ2x1c3Rlck5ld0NvbnRyb2xsZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBxU2VydmljZTogbmcuSVFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGxvZ1NlcnZpY2U6IG5nLklMb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNjb3BlU2VydmljZTogbmcuSVNjb3BlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogYW55LFxuICAgICAgICBwcml2YXRlIHRpbWVvdXRTZXJ2aWNlOiBuZy5JVGltZW91dFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbG9jYXRpb25TZXJ2aWNlOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHZvbHVtZVNlcnZpY2U6IFZvbHVtZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2x1c3RlclNlcnZpY2U6IENsdXN0ZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNlcnZlclNlcnZpY2U6IFNlcnZlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgb3NkU2VydmljZTogT1NEU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwb29sU2VydmljZTogUG9vbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdXRpbFNlcnZpY2U6IFV0aWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlcXVlc3RTZXJ2aWNlOiBSZXF1ZXN0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZXF1ZXN0VHJhY2tpbmdTZXJ2aWNlOiBhbnksXG4gICAgICAgIHByaXZhdGUgY29uZmlnU3ZjOiBDb25maWdTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy5zdGVwID0gMTtcbiAgICAgICAgdGhpcy5jbHVzdGVySGVscGVyID0gbmV3IENsdXN0ZXJIZWxwZXIodXRpbFNlcnZpY2UsIHJlcXVlc3RTZXJ2aWNlLCBsb2dTZXJ2aWNlLCB0aW1lb3V0U2VydmljZSk7XG4gICAgICAgIHRoaXMubmV3Vm9sdW1lID0ge307XG4gICAgICAgIHRoaXMubmV3UG9vbCA9IHt9O1xuICAgICAgICB0aGlzLmhvc3RzID0gW107XG4gICAgICAgIHRoaXMudm9sdW1lcyA9IFtdO1xuICAgICAgICB0aGlzLnBvb2xzID0gW107XG4gICAgICAgIHRoaXMuZGlza3MgPSBbXTtcbiAgICAgICAgdGhpcy5uZXdIb3N0ID0ge307XG4gICAgICAgIHRoaXMuaG9zdFR5cGVzID0gW1wiTW9uaXRvclwiLCBcIk9TRCBIb3N0XCIsIFwiT1NEICsgTW9uaXRvclwiXTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVOZXR3b3JrcyA9IFtdO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSG9zdHMgPSAwO1xuICAgICAgICB0aGlzLmNsdXN0ZXJUeXBlcyA9IHRoaXMuY2x1c3RlckhlbHBlci5nZXRDbHVzdGVyVHlwZXMoKTtcbiAgICAgICAgdGhpcy5jbHVzdGVyVHlwZSA9IHRoaXMuY2x1c3RlclR5cGVzWzFdO1xuXG4gICAgICAgIHRoaXMub3BlbnN0YWNrU2VydmljZXMgPSBhbmd1bGFyLmNvcHkodGhpcy5jbHVzdGVySGVscGVyLmdldE9wZW5TdGFja1NlcnZpY2VzKCkpO1xuXG4gICAgICAgIHRoaXMubmV3Vm9sdW1lLmNvcHlDb3VudCA9IFZvbHVtZUhlbHBlcnMuZ2V0UmVjb21lbmRlZENvcHlDb3VudCgpO1xuICAgICAgICB0aGlzLm5ld1ZvbHVtZS5jb3B5Q291bnRMaXN0ID0gVm9sdW1lSGVscGVycy5nZXRDb3BpZXNMaXN0KCk7XG5cbiAgICAgICAgdGhpcy5uZXdWb2x1bWUuc2l6ZVVuaXRzID0gVm9sdW1lSGVscGVycy5nZXRUYXJnZXRTaXplVW5pdHMoKTtcbiAgICAgICAgdGhpcy5uZXdWb2x1bWUuc2l6ZVVuaXQgPSBfLmZpcnN0KHRoaXMubmV3Vm9sdW1lLnNpemVVbml0cyk7XG5cbiAgICAgICAgdGhpcy5uZXdQb29sLmNvcHlDb3VudExpc3QgPSBWb2x1bWVIZWxwZXJzLmdldENvcGllc0xpc3QoKTtcbiAgICAgICAgdGhpcy5uZXdQb29sLmNvcHlDb3VudCA9IFZvbHVtZUhlbHBlcnMuZ2V0UmVjb21lbmRlZENvcHlDb3VudCgpO1xuXG4gICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IGxvY2F0aW9uU2VydmljZS5zZWFyY2goKTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKS5sZW5ndGggPiAwICYmIHF1ZXJ5UGFyYW1zWydob3N0c2FjY2VwdGVkJ10gPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoRnJlZUhvc3RzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyU2VydmljZS5nZXREaXNjb3ZlcmVkSG9zdHMoKS50aGVuKGZyZWVIb3N0cyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZyZWVIb3N0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RhbCA9IE1vZGFsSGVscGVycy5VbkFjY2VwdGVkSG9zdHNGb3VuZCh0aGlzLm1vZGFsU2VydmljZSwge30sIGZyZWVIb3N0cy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBtb2RhbC4kc2NvcGUuJGhpZGUgPSBfLndyYXAobW9kYWwuJHNjb3BlLiRoaWRlLCAoJGhpZGUsIGNvbmZpcm1lZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb25TZXJ2aWNlLnBhdGgoJy9jbHVzdGVycy9uZXcvYWNjZXB0LWhvc3RzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZXRjaEZyZWVIb3N0cygpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hGcmVlSG9zdHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZpZ1N2Yy5nZXRDb25maWcoKS50aGVuKChjb25maWcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25maWcuY2VwaF9taW5fbW9uaXRvcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbk1vbnNSZXF1aXJlZCA9IGNvbmZpZy5jZXBoX21pbl9tb25pdG9ycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcuY2VwaF9taXhfaG9zdF9yb2xlcyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jZXBoTWl4SG9zdFJvbGVzID0gY29uZmlnLmNlcGhfbWl4X2hvc3Rfcm9sZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVGaW5nZXJQcmludChob3N0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5uZXdIb3N0LmNhdXRpb25NZXNzYWdlID0gXCJcIjtcbiAgICAgICAgdGhpcy5uZXdIb3N0LmVycm9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgIHRoaXMudXRpbFNlcnZpY2UuZ2V0U3NoRmluZ2VycHJpbnQoaG9zdC5ob3N0bmFtZSkudGhlbihcbiAgICAgICAgICAgIChzc2hmaW5nZXJwcmludDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaG9zdC5zc2hmaW5nZXJwcmludCA9IHNzaGZpbmdlcnByaW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0hvc3QuY2F1dGlvbk1lc3NhZ2UgPSBcIkVycm9yIS5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0hvc3QuZXJyb3JNZXNzYWdlID0gXCJDb3VsZCBub3QgZmV0Y2ggc3NoIGZpbmdlcnByaW50XCI7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlSVBBZGRyZXNzKGhvc3Q6IGFueSkge1xuICAgICAgICB0aGlzLnV0aWxTZXJ2aWNlLmdldElwQWRkcmVzc2VzKGhvc3QuaG9zdG5hbWUpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaG9zdC5pcGFkZHJlc3MgPSByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IFwiTi9BXCI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBmZXRjaEZyZWVIb3N0cygpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXJTZXJ2aWNlLmdldEZyZWVIb3N0cygpLnRoZW4oKGZyZWVIb3N0cykgPT4gdGhpcy5sb2FkRnJlZUhvc3RzKGZyZWVIb3N0cykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkRnJlZUhvc3RzKGZyZWVIb3N0czogYW55KSB7XG4gICAgICAgIHRoaXMuaG9zdHMgPSBbXTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVOZXR3b3JrcyA9IFtdO1xuICAgICAgICB2YXIgc3VibmV0cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgXy5lYWNoKGZyZWVIb3N0cywgKGZyZWVIb3N0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHZhciBob3N0ID0ge1xuICAgICAgICAgICAgICAgIGlkOiBmcmVlSG9zdC5ub2RlaWQsXG4gICAgICAgICAgICAgICAgaG9zdG5hbWU6IGZyZWVIb3N0Lmhvc3RuYW1lLFxuICAgICAgICAgICAgICAgIGlwYWRkcmVzczogZnJlZUhvc3QubWFuYWdlbWVudF9pcDQsXG4gICAgICAgICAgICAgICAgc3RhdGU6IFwiQUNDRVBURURcIixcbiAgICAgICAgICAgICAgICBkaXNrczogZnJlZUhvc3Quc3RvcmFnZV9kaXNrcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaG9zdC5kaXNrcyA9IF8uZmlsdGVyKGZyZWVIb3N0LnN0b3JhZ2VfZGlza3MsIChkaXNrOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzay5UeXBlID09PSAnZGlzaycgJiYgZGlzay5Vc2VkID09IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmhvc3RzLnB1c2goaG9zdCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbmdlclByaW50KGhvc3QpO1xuICAgICAgICAgICAgXy5lYWNoKGZyZWVIb3N0Lm5ldHdvcmtfaW5mby5TdWJuZXQsIChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICAgICAgc3VibmV0cy5hZGQobmV0d29yayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1Ym5ldHMuZm9yRWFjaCgobmV0d29yaykgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVOZXR3b3Jrcy5wdXNoKHsgYWRkcmVzczogbmV0d29yaywgY2x1c3RlcjogZmFsc2UsIGFjY2VzczogZmFsc2UgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVOZXR3b3Jrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZU5ldHdvcmtzWzBdLmNsdXN0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVOZXR3b3Jrc1swXS5hY2Nlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBpc01vbihob3N0VHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBob3N0VHlwZSA9PT0gdGhpcy5ob3N0VHlwZXNbMF0gfHwgaG9zdFR5cGUgPT09IHRoaXMuaG9zdFR5cGVzWzJdO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc09zZChob3N0VHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBob3N0VHlwZSA9PT0gdGhpcy5ob3N0VHlwZXNbMV0gfHwgaG9zdFR5cGUgPT09IHRoaXMuaG9zdFR5cGVzWzJdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREaXNrcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNrcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SG9zdHNEaXNrc1NpemUoaG9zdDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgdmFyIHNpemU6IG51bWJlciA9IDA7XG4gICAgICAgIHNpemUgPSBfLnJlZHVjZShob3N0LmRpc2tzLCAoc2l6ZTogYW55LCBkaXNrOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaXplICsgZGlzay5TaXplO1xuICAgICAgICB9LCAwKTtcbiAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERpc2tzU2l6ZSgpOiBhbnkge1xuICAgICAgICB2YXIgc2l6ZTogbnVtYmVyID0gMDtcbiAgICAgICAgc2l6ZSA9IF8ucmVkdWNlKHRoaXMuZGlza3MsIChzaXplOiBhbnksIGRpc2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNpemUgKyBkaXNrLlNpemU7XG4gICAgICAgIH0sIDApO1xuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY291bnREaXNrcygpIHtcbiAgICAgICAgdmFyIGRpc2tzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICAgIF8uZWFjaCh0aGlzLmhvc3RzLCAoaG9zdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGhvc3Quc2VsZWN0ZWQgJiYgdGhpcy5pc09zZChob3N0Lmhvc3RUeXBlKSkge1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGRpc2tzLCB0aGlzLmdldEhvc3RGcmVlRGlza3MoaG9zdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kaXNrcyA9IGRpc2tzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIb3N0RnJlZURpc2tzKGhvc3QpIHtcbiAgICAgICAgdmFyIGZyZWVEaXNrcyA9IF8uZmlsdGVyKGhvc3QuZGlza3MsIChkaXNrOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXNrLlR5cGUgPT09ICdkaXNrJyAmJiBkaXNrLlVzZWQgPT0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnJlZURpc2tzO1xuICAgIH1cblxuICAgIHB1YmxpYyBob3N0VHlwZUNoYW5nZWQoaG9zdDogYW55KXtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUhvc3QoaG9zdCk7XG4gICAgICAgIHRoaXMuY291bnREaXNrcygpXG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlSG9zdChob3N0OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGhvc3Quc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChob3N0Lmhvc3RUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IFwiSG9zdCAnXCIgKyBob3N0Lmhvc3RuYW1lICsgXCInIGRvZXMgbm90IGhhdmUgYW55IHJvbGUgYXR0YWNoZWQuXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc09zZChob3N0Lmhvc3RUeXBlKSAmJiB0aGlzLmdldEhvc3RGcmVlRGlza3MoaG9zdCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBcIkhvc3QgJ1wiICsgaG9zdC5ob3N0bmFtZSArIFwiJyBkb2VzIG5vdCBoYXZlIGFueSBkaXNrIGF0dGFjaGVkIGFuZCBpdCBjYW4ndCBiZSBhZGRlZCBhcyBhbiBPU0QgSG9zdC5cIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IFwiXCI7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWxlY3RIb3N0KGhvc3Q6IGFueSwgc2VsZWN0aW9uOiBib29sZWFuKSB7XG4gICAgICAgIGhvc3Quc2VsZWN0ZWQgPSBzZWxlY3Rpb247XG4gICAgICAgIGlmKHNlbGVjdGlvbiAmJiBob3N0Lmhvc3RUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0SG9zdEZyZWVEaXNrcyhob3N0KS5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIGhvc3QuaG9zdFR5cGUgPSB0aGlzLmhvc3RUeXBlc1swXTsgIC8vTm8gRGlzayBhdmFpbGFibGUgc28gbWFrZSB0aGlzIGEgTW9uXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBob3N0Lmhvc3RUeXBlID0gdGhpcy5ob3N0VHlwZXNbMV07ICAvL1RoZXJlIGFyZSBzb21lIGRpc2tzIHNvIGl0IGNhbiBiZSBhbiBPU0RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGhvc3Quc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdGVkSG9zdHMrKyA6IHRoaXMuc2VsZWN0ZWRIb3N0cy0tO1xuICAgICAgICB0aGlzLmNvdW50RGlza3MoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZUhvc3QoaG9zdCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdEFsbEhvc3RzKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSG9zdHMgPSAwO1xuICAgICAgICBfLmVhY2godGhpcy5ob3N0cywgKGhvc3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SG9zdChob3N0LCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dEaXNrcygpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJ3ZpZXdzL2NsdXN0ZXJzL3N0b3JhZ2Vwcm9maWxlL3N0b3JhZ2UtcHJvZmlsZS1kaXNrcy5odG1sJztcbiAgICAgICAgdmFyIG15TW9kYWwgPSB0aGlzLm1vZGFsU2VydmljZSh7IHRlbXBsYXRlOiB0ZW1wbGF0ZSwgY29udGFpbmVyOiAnYm9keScsIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzb3J0SG9zdHNJblN1bW1hcnkoKSB7XG4gICAgICAgIHRoaXMuc3VtbWFyeUhvc3RzU29ydE9yZGVyID0gdGhpcy5zdW1tYXJ5SG9zdHNTb3J0T3JkZXIgPT09ICctaG9zdG5hbWUnID8gJ2hvc3RuYW1lJyA6ICctaG9zdG5hbWUnO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGROZXdIb3N0KCkge1xuICAgICAgICB0aGlzLmNsdXN0ZXJIZWxwZXIuYWRkTmV3SG9zdCh0aGlzLCB0aGlzLnNlcnZlclNlcnZpY2UsIHRoaXMudGltZW91dFNlcnZpY2UsIHRoaXMucmVxdWVzdFNlcnZpY2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3N0QWRkTmV3SG9zdChob3N0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5jbHVzdGVySGVscGVyLmFjY2VwdE5ld0hvc3QodGhpcywgaG9zdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFjY2VwdEhvc3QoaG9zdDogYW55KSB7XG4gICAgICAgIHRoaXMuY2x1c3RlckhlbHBlci5hY2NlcHRIb3N0KHRoaXMsIGhvc3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhY2NlcHRBbGxIb3N0cygpIHtcbiAgICAgICAgXy5lYWNoKHRoaXMuaG9zdHMsIChob3N0KSA9PiB7XG4gICAgICAgICAgICBpZiAoaG9zdC5zdGF0ZSA9PT0gXCJVTkFDQ0VQVEVEXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjY2VwdEhvc3QoaG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3N0QWNjZXB0SG9zdENhbGxCYWNrID0gKGhvc3Q6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnNlcnZlclNlcnZpY2UuZ2V0QnlIb3N0bmFtZShob3N0Lmhvc3RuYW1lKS50aGVuKChob3N0Rm91bmQpID0+IHtcbiAgICAgICAgICAgIGhvc3QuaWQgPSBob3N0Rm91bmQubm9kZWlkO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RIb3N0KGhvc3QsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdEFjY2VwdEhvc3QoaG9zdDogYW55KSB7XG4gICAgICAgIGlmIChob3N0LmlkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEhvc3QoaG9zdCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBvc3RBY2NlcHRIb3N0Q2FsbEJhY2soaG9zdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlSG9zdChob3N0OiBhbnkpIHtcbiAgICAgICAgXy5yZW1vdmUodGhpcy5ob3N0cywgKGN1cnJlbnRIb3N0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudEhvc3QuaG9zdG5hbWUgPT09IGhvc3QuaG9zdG5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGROZXdWb2x1bWUobmV3Vm9sdW1lOiBhbnkpIHtcbiAgICAgICAgdmFyIGZyZWVEaXNrczogYW55ID0gXy5maWx0ZXIodGhpcy5kaXNrcywgKGRpc2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFkaXNrLnVzZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdmFyIGRldmljZXNNYXA6IGFueSA9IF8uZ3JvdXBCeShmcmVlRGlza3MsIChkaXNrOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXNrLm5vZGU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBkZXZpY2VzTGlzdDogYW55ID0gXy5tYXAoZGV2aWNlc01hcCwgKGRpc2tzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXNrcztcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2VsZWN0ZWREaXNrcyA9IFZvbHVtZUhlbHBlcnMuZ2V0U3RvcmFnZURldmljZXNGb3JWb2x1bWVCYXNpYyhuZXdWb2x1bWUuc2l6ZSwgbmV3Vm9sdW1lLmNvcHlDb3VudCwgZGV2aWNlc0xpc3QpO1xuICAgICAgICBfLmVhY2goc2VsZWN0ZWREaXNrcywgKHNlbGVjdGVkRGlzazogYW55KSA9PiB7XG4gICAgICAgICAgICBzZWxlY3RlZERpc2sudXNlZCA9IHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBuZXdWb2x1bWUuZGlza3MgPSBzZWxlY3RlZERpc2tzO1xuICAgICAgICB0aGlzLnZvbHVtZXMucHVzaChuZXdWb2x1bWUpO1xuICAgICAgICB0aGlzLm5ld1ZvbHVtZSA9IHt9OyAgICBcbiAgICAgICAgdGhpcy5uZXdWb2x1bWUgPSB7XG4gICAgICAgICAgICBjb3B5Q291bnRMaXN0OiBWb2x1bWVIZWxwZXJzLmdldENvcGllc0xpc3QoKSxcbiAgICAgICAgICAgIGNvcHlDb3VudDogVm9sdW1lSGVscGVycy5nZXRSZWNvbWVuZGVkQ29weUNvdW50KCksXG4gICAgICAgICAgICBzaXplVW5pdHM6IFZvbHVtZUhlbHBlcnMuZ2V0VGFyZ2V0U2l6ZVVuaXRzKCksXG4gICAgICAgICAgICBzaXplVW5pdDogXy5maXJzdCh0aGlzLm5ld1ZvbHVtZS5zaXplVW5pdHMpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGFkZE5ld1Bvb2wobmV3UG9vbDogUG9vbCkge1xuICAgICAgICB0aGlzLnBvb2xzLnB1c2gobmV3UG9vbCk7XG4gICAgICAgIHRoaXMubmV3UG9vbCA9IHtcbiAgICAgICAgICAgIGNvcHlDb3VudExpc3Q6IFZvbHVtZUhlbHBlcnMuZ2V0Q29waWVzTGlzdCgpLFxuICAgICAgICAgICAgY29weUNvdW50OiBWb2x1bWVIZWxwZXJzLmdldFJlY29tZW5kZWRDb3B5Q291bnQoKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlU3RlcChuZXh0U3RlcDogYW55KSB7XG4gICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCJcIjtcbiAgICAgICAgdmFyIGNvbmZpZ1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFyIG1vbkNvdW50ID0gMDtcbiAgICAgICAgaWYodGhpcy5zdGVwID09PTEpe1xuICAgICAgICAgICAgY29uZmlnVmFsaWQgPSB0aGlzLmNsdXN0ZXJOYW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jbHVzdGVyTmFtZS50cmltKCkubGVuZ3RoID4gMCAmJiB0aGlzLmpvdXJuYWxTaXplLnZhbHVlID4gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuc3RlcCA9PT0gMiAmJiBuZXh0U3RlcCA9PT0gMSl7XG4gICAgICAgICAgICBtb25Db3VudCA9IHRoaXMuZ2V0TW9uQ291bnQoKTtcbiAgICAgICAgICAgIGlmKG1vbkNvdW50IDwgdGhpcy5taW5Nb25zUmVxdWlyZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCIgQ2hvb3NlIGF0IGxlYXN0IFwiICsgdGhpcy5taW5Nb25zUmVxdWlyZWQgKyBcIiBtb25pdG9ycyB0byBjb250aW51ZVwiO1xuICAgICAgICAgICAgICAgIGNvbmZpZ1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKG1vbkNvdW50JTIgPT09IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCIgTnVtYmVyIG9mIE1vbml0b3JzIGNhbm5vdCBiZSBldmVuXCI7XG4gICAgICAgICAgICAgICAgY29uZmlnVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgY29uZmlnVmFsaWQgPSBfLmV2ZXJ5KHRoaXMuaG9zdHMsIGhvc3QgPT4gdGhpcy52YWxpZGF0ZUhvc3QoaG9zdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RlcCA9IGNvbmZpZ1ZhbGlkID8gdGhpcy5zdGVwICsgbmV4dFN0ZXAgOiB0aGlzLnN0ZXA7XG4gICAgfVxuXG4gICAgcHVibGljIGlzU3VibWl0QXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwID09PSA0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0JhY2tBdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXAgIT09IDE7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvblNlcnZpY2UucGF0aCgnL2NsdXN0ZXJzJykuc2VhcmNoKHt9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2x1c3RlckNhbGxCYWNrKHJlcXVlc3RzOiBhbnksIHZvbHVtZXM6IGFueSkge1xuICAgICAgICB0aGlzLnFTZXJ2aWNlLmFsbChyZXF1ZXN0cykudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHNbaW5kZXhdLnN0YXR1cyA9PT0gMjAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdFRyYWNraW5nU2VydmljZS5hZGQocmVzdWx0c1tpbmRleF0uZGF0YSwgJ0NyZWF0aW5nIHZvbHVtZSBcXCcnICsgdm9sdW1lc1tpbmRleF0ubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3N0R2x1c3RlckNsdXN0ZXJDcmVhdGUoY2x1c3RlcjogYW55LCB2b2x1bWVzOiBhbnkpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICAgIF8uZWFjaCh2b2x1bWVzLCAodm9sdW1lOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHZhciBsb2NhbFZvbHVtZTogYW55ID0ge1xuICAgICAgICAgICAgICAgIGNsdXN0ZXI6IGNsdXN0ZXIuY2x1c3Rlcl9pZCxcbiAgICAgICAgICAgICAgICB2b2x1bWVfbmFtZTogdm9sdW1lLm5hbWUsXG4gICAgICAgICAgICAgICAgdm9sdW1lX3R5cGU6IDIsXG4gICAgICAgICAgICAgICAgcmVwbGljYV9jb3VudDogdm9sdW1lLmNvcHlDb3VudCxcbiAgICAgICAgICAgICAgICBicmlja3M6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXy5lYWNoKHZvbHVtZS5kaXNrcywgKGRldmljZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGJyaWNrOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGRldmljZS5ub2RlLFxuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlX2RldmljZTogZGV2aWNlLnN0b3JhZ2VfZGV2aWNlX2lkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsb2NhbFZvbHVtZS5icmlja3MucHVzaChicmljayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsVm9sdW1lKTtcbiAgICAgICAgICAgIHJlcXVlc3RzLnB1c2godGhpcy52b2x1bWVTZXJ2aWNlLmNyZWF0ZShsb2NhbFZvbHVtZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmdsdXN0ZXJDYWxsQmFjayhyZXF1ZXN0cywgdm9sdW1lcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZUNlcGhQb29sc0NhbGxCYWNrKGNsdXN0ZXI6IGFueSwgcG9vbHNSZXF1ZXN0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5wb29sU2VydmljZS5jcmVhdGUocG9vbHNSZXF1ZXN0KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAyMDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RUcmFja2luZ1NlcnZpY2UuYWRkKHJlc3VsdC5kYXRhLCAnQ3JlYXRpbmcgcG9vbHMgaW4gY2x1c3RlciBcXCcnICsgY2x1c3Rlci5jbHVzdGVyX25hbWUgKyAnXFwnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nU2VydmljZS5lcnJvcignVW5leHBlY3RlZCByZXNwb25zZSBmcm9tIFBvb2xzLmNyZWF0ZScsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDZXBoUG9vbHMoY2x1c3RlcjogYW55LCBkaXNrczogYW55LCBwb29sczogYW55KSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5pbmZvKCdQb3N0IE9TRCBDcmVhdGUnKTtcbiAgICAgICAgdmFyIHBvb2xzUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIGNsdXN0ZXI6IGNsdXN0ZXIuY2x1c3Rlcl9pZCxcbiAgICAgICAgICAgIHBvb2xzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIF8uZWFjaChwb29scywgKHBvb2w6IGFueSkgPT4ge1xuICAgICAgICAgICAgcG9vbHNSZXF1ZXN0LnBvb2xzLnB1c2goe1xuICAgICAgICAgICAgICAgIHBvb2xfbmFtZTogcG9vbC5uYW1lLFxuICAgICAgICAgICAgICAgIHBnX251bTogcGFyc2VJbnQocG9vbC5wZ051bSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocG9vbHNSZXF1ZXN0LnBvb2xzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNlcGhQb29sc0NhbGxCYWNrKGNsdXN0ZXIsIHBvb2xzUmVxdWVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRpbmdPU0RzQ2FsbEJhY2socmVzdWx0OiBhbnksIGNsdXN0ZXI6IGFueSwgZGlza3M6IGFueSwgcG9vbHM6IGFueSkge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UuaW5mbygnQWRkaW5nIE9TRHMgY2FsbGJhY2sgJyArIHJlc3VsdC5kYXRhKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2VydmljZS5nZXQocmVzdWx0LmRhdGEpLnRoZW4oKHJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXVzID09PSAnRkFJTEVEJyB8fCByZXF1ZXN0LnN0YXR1cyA9PT0gJ0ZBSUxVUkUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmluZm8oJ0FkZGluZyBPU0RzIHRvIGNsdXN0ZXJcXCcnICsgdGhpcy5jbHVzdGVyTmFtZSArICdcXCcgIGlzIGZhaWxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gJ1NVQ0NFU1MnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmluZm8oJ0FkZGluZyBPU0RzIHRvIGNsdXN0ZXIgXFwnJyArIHRoaXMuY2x1c3Rlck5hbWUgKyAnXFwnIGlzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNlcGhQb29scyhjbHVzdGVyLCBkaXNrcywgcG9vbHMpOyAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmluZm8oJ1dhaXRpbmcgZm9yIE9TRHMgdG8gYmUgYWRkZWQgdG8gY2x1c3RlciBcXCcnICsgdGhpcy5jbHVzdGVyTmFtZSArICdcXCcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRTZXJ2aWNlKCgpID0+IHRoaXMuYWRkaW5nT1NEc0NhbGxCYWNrKHJlc3VsdCwgY2x1c3RlciwgZGlza3MsIHBvb2xzKSwgNTAwMCk7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjZXBoQ2FsbEJhY2sob3NkczogYW55LCBjbHVzdGVyOiBhbnksIGRpc2tzOiBhbnksIHBvb2xzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vc2RTZXJ2aWNlLmNyZWF0ZShvc2RzKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0VHJhY2tpbmdTZXJ2aWNlLmFkZChyZXN1bHQuZGF0YSwgJ0FkZGluZyBPU0RzIHRvIGNsdXN0ZXIgXFwnJyArIGNsdXN0ZXIuY2x1c3Rlcl9uYW1lICsgJ1xcJycpO1xuICAgICAgICAgICAgdGhpcy5hZGRpbmdPU0RzQ2FsbEJhY2socmVzdWx0LCBjbHVzdGVyLCBkaXNrcywgcG9vbHMpO1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0U2VydmljZSgoKSA9PiB0aGlzLmFkZGluZ09TRHNDYWxsQmFjayhyZXN1bHQsIGNsdXN0ZXIsIGRpc2tzLCBwb29scyksIDUwMDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdENlcGhDbHVzdGVyQ3JlYXRlKGNsdXN0ZXI6IGFueSwgZGlza3M6IGFueSwgcG9vbHM6IGFueSkge1xuICAgICAgICB2YXIgb3NkTGlzdDogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgICBfLmVhY2goZGlza3MsIChkaXNrOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHZhciBvc2Q6IGFueSA9IHtcbiAgICAgICAgICAgICAgICBub2RlOiBkaXNrLm5vZGUsXG4gICAgICAgICAgICAgICAgc3RvcmFnZV9kZXZpY2U6IGRpc2suc3RvcmFnZV9kZXZpY2VfaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvc2RMaXN0LnB1c2gob3NkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIG9zZHM6IGFueSA9IHtcbiAgICAgICAgICAgIG9zZHM6IG9zZExpc3RcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNlcGhDYWxsQmFjayhvc2RzLCBjbHVzdGVyLCBkaXNrcywgcG9vbHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3N0Q2x1c3RlckNyZWF0ZShjbHVzdGVyOiBhbnksIGRpc2tzOiBhbnksIHZvbHVtZXMsIHBvb2xzKSB7XG4gICAgICAgIHRoaXMubG9nU2VydmljZS5pbmZvKCdQb3N0IENsdXN0ZXIgQ3JlYXRlJyk7XG4gICAgICAgIGlmICh0aGlzLmNsdXN0ZXJUeXBlLnR5cGUgPT09ICdHbHVzdGVyJykge1xuICAgICAgICAgICAgdGhpcy5wb3N0R2x1c3RlckNsdXN0ZXJDcmVhdGUoY2x1c3Rlciwgdm9sdW1lcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBvc3RDZXBoQ2x1c3RlckNyZWF0ZShjbHVzdGVyLCBkaXNrcywgcG9vbHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNsdXN0ZXJDcmVhdGVTdWNjZXNzQ2FsbEJhY2soY2x1c3RlcjogYW55KSB7XG4gICAgICAgIHZhciBkaXNrcyA9IHRoaXMuZ2V0RGlza3MoKTtcbiAgICAgICAgdmFyIHZvbHVtZXMgPSB0aGlzLnZvbHVtZXM7XG4gICAgICAgIHZhciBwb29scyA9IHRoaXMucG9vbHM7XG5cbiAgICAgICAgdGhpcy5jbHVzdGVyU2VydmljZS5nZXRCeU5hbWUodGhpcy5jbHVzdGVyTmFtZSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNsdXN0ZXIuY2x1c3Rlcl9pZCA9IHJlc3VsdC5jbHVzdGVyX2lkO1xuICAgICAgICAgICAgdGhpcy5wb3N0Q2x1c3RlckNyZWF0ZShjbHVzdGVyLCBkaXNrcywgdm9sdW1lcywgcG9vbHMpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBjbHVzdGVyQ3JlYXRlQ2FsbEJhY2socmVzdWx0OiBhbnksIGNsdXN0ZXI6IGFueSkge1xuICAgICAgICB0aGlzLmxvZ1NlcnZpY2UuaW5mbyhcIkNsdXN0ZXIgQ3JlYXRlIENhbGxCYWNrXCIgKyByZXN1bHQuZGF0YSk7XG4gICAgICAgIHRoaXMucmVxdWVzdFNlcnZpY2UuZ2V0KHJlc3VsdC5kYXRhKS50aGVuKChyZXF1ZXN0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gJ0ZBSUxFRCcgfHwgcmVxdWVzdC5zdGF0dXMgPT09ICdGQUlMVVJFJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nU2VydmljZS5pbmZvKCdDcmVhdGluZyBjbHVzdGVyIFxcJycgKyB0aGlzLmNsdXN0ZXJOYW1lICsgJ1xcJyBpcyBmYWlsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09ICdTVUNDRVNTJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nU2VydmljZS5pbmZvKCdDbHVzdGVyIFxcJycgKyB0aGlzLmNsdXN0ZXJOYW1lICsgJ1xcJyBpcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlckNyZWF0ZVN1Y2Nlc3NDYWxsQmFjayhjbHVzdGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmluZm8oJ1dhaXRpbmcgZm9yIENsdXN0ZXIgXFwnJyArIHRoaXMuY2x1c3Rlck5hbWUgKyAnXFwnIHRvIGJlIHJlYWR5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lb3V0U2VydmljZSgoKSA9PiB0aGlzLmNsdXN0ZXJDcmVhdGVDYWxsQmFjayhyZXN1bHQsIGNsdXN0ZXIpLCA1MDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlQ2x1c3RlcihjbHVzdGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jbHVzdGVyU2VydmljZS5jcmVhdGUoY2x1c3RlcikudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAyMDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RTZXJ2aWNlLmdldChyZXN1bHQuZGF0YS50YXNraWQpLnRoZW4oKHRhc2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0VHJhY2tpbmdTZXJ2aWNlLmFkZCh0YXNrLmlkLCB0YXNrLm5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBtb2RhbCA9IE1vZGFsSGVscGVycy5TdWNjZXNzZnVsUmVxdWVzdCh0aGlzLm1vZGFsU2VydmljZSwge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NyZWF0ZSBDbHVzdGVyIFJlcXVlc3QgaXMgU3VibWl0dGVkJyxcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiAnLnVzbUNsaWVudEFwcCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtb2RhbC4kc2NvcGUuJGhpZGUgPSBfLndyYXAobW9kYWwuJHNjb3BlLiRoaWRlLCAoJGhpZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJGhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvblNlcnZpY2UucGF0aCgnL3Rhc2tzLycgKyByZXN1bHQuZGF0YS50YXNraWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dTZXJ2aWNlLmVycm9yKCdVbmV4cGVjdGVkIHJlc3BvbnNlIGZyb20gQ2x1c3RlcnMuY3JlYXRlOicsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRPU0RIb3N0cygpIHtcbiAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHRoaXMuaG9zdHMsIGhvc3QgPT4gaG9zdC5zZWxlY3RlZCAmJiB0aGlzLmlzT3NkKGhvc3QuaG9zdFR5cGUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TW9uQ291bnQoKXtcbiAgICAgICAgICAgIHZhciBjb3VudDogbnVtYmVyPTA7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5ob3N0cywgKGhvc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGhvc3Quc2VsZWN0ZWQgJiYgdGhpcy5pc01vbihob3N0Lmhvc3RUeXBlKSkge1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdCgpIHtcbiAgICAgICAgdmFyIG5vZGVzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICAgIF8uZWFjaCh0aGlzLmhvc3RzLCAoaG9zdDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoaG9zdC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhbEhvc3Q6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZWlkOiBob3N0LmlkLFxuICAgICAgICAgICAgICAgICAgICBub2RldHlwZTogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciBkaXNrcyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3NkKGhvc3QuaG9zdFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsSG9zdC5ub2RldHlwZS5wdXNoKCdPU0QnKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxIb3N0LmRpc2tzID0gXy5tYXAoaG9zdC5kaXNrcywgKGRpc2s6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogZGlzay5EZXZOYW1lLCBmc3R5cGU6ICd4ZnMnIH07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01vbihob3N0Lmhvc3RUeXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbEhvc3Qubm9kZXR5cGUucHVzaCgnTU9OJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobG9jYWxIb3N0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjbHVzdGVyTmV0d29yazogYW55ID0gXy5maW5kKHRoaXMuYXZhaWxhYmxlTmV0d29ya3MsIChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV0d29yay5jbHVzdGVyO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGFjY2Vzc05ldHdvcms6IGFueSA9IF8uZmluZCh0aGlzLmF2YWlsYWJsZU5ldHdvcmtzLCAobmV0d29yaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldHdvcmsuYWNjZXNzO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG5ldHdvcmtzID0ge1xuICAgICAgICAgICAgY2x1c3RlcjogY2x1c3Rlck5ldHdvcmsuYWRkcmVzcyxcbiAgICAgICAgICAgIHB1YmxpYzogYWNjZXNzTmV0d29yay5hZGRyZXNzXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNsdXN0ZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLmNsdXN0ZXJOYW1lLFxuICAgICAgICAgICAgdHlwZTogdGhpcy5jbHVzdGVyVHlwZS50eXBlLFxuICAgICAgICAgICAgam91cm5hbFNpemU6IHRoaXMuam91cm5hbFNpemUudmFsdWUgKyB0aGlzLmpvdXJuYWxTaXplLnVuaXQsXG4gICAgICAgICAgICBub2Rlczogbm9kZXMsXG4gICAgICAgICAgICBuZXR3b3JrczogbmV0d29ya3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGVDbHVzdGVyKGNsdXN0ZXIpO1xuICAgIH1cbn1cbiJdfQ==
