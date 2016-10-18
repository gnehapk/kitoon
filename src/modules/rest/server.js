/// <reference path="../../../typings/tsd.d.ts" />
var AlarmStatus;
(function (AlarmStatus) {
    AlarmStatus[AlarmStatus["INDETERMINATE"] = 0] = "INDETERMINATE";
    AlarmStatus[AlarmStatus["CRITICAL"] = 1] = "CRITICAL";
    AlarmStatus[AlarmStatus["MAJOR"] = 2] = "MAJOR";
    AlarmStatus[AlarmStatus["MINOR"] = 3] = "MINOR";
    AlarmStatus[AlarmStatus["WARNING"] = 4] = "WARNING";
    AlarmStatus[AlarmStatus["CLEARED"] = 5] = "CLEARED"; //5
})(AlarmStatus || (AlarmStatus = {}));
(function (NodeState) {
    NodeState[NodeState["UNACCEPTED"] = 0] = "UNACCEPTED";
    NodeState[NodeState["INITIALIZING"] = 1] = "INITIALIZING";
    NodeState[NodeState["ACTIVE"] = 2] = "ACTIVE";
    NodeState[NodeState["FAILED"] = 3] = "FAILED";
    NodeState[NodeState["UNMANAGED"] = 4] = "UNMANAGED"; //4
})(exports.NodeState || (exports.NodeState = {}));
var NodeState = exports.NodeState;
(function (NodeStatus) {
    NodeStatus[NodeStatus["OK"] = 0] = "OK";
    NodeStatus[NodeStatus["WARN"] = 1] = "WARN";
    NodeStatus[NodeStatus["ERROR"] = 2] = "ERROR";
    NodeStatus[NodeStatus["UNKNOWN"] = 3] = "UNKNOWN"; //3
})(exports.NodeStatus || (exports.NodeStatus = {}));
var NodeStatus = exports.NodeStatus;
var ServerService = (function () {
    function ServerService(rest) {
        this.rest = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
        });
        this.restFull = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
            RestangularConfigurer.setFullResponse(true);
        });
    }
    // **getDashboardSummary**
    // **@returns** a promise with all details of main dashboard.
    ServerService.prototype.getDashboardSummary = function () {
        return this.rest.one('system/summary').get().then(function (summary) {
            return summary;
        });
    };
    // **getFilteredList**
    // **@returns** a promise with all servers with query string.
    ServerService.prototype.getFilteredList = function (queryString) {
        if (queryString != undefined) {
            queryString = "?" + queryString;
        }
        else {
            queryString = "";
        }
        return this.rest.all('nodes' + queryString).getList().then(function (servers) {
            return _.sortBy(servers, "hostname");
        });
    };
    // **getList**
    // **@returns** a promise with all servers.
    ServerService.prototype.getList = function () {
        return this.rest.all('nodes').getList().then(function (servers) {
            return _.sortBy(servers, "hostname");
        });
    };
    // **getListByCluster**
    // **@returns** a promise with all nodes part of the cluster.
    ServerService.prototype.getListByCluster = function (clusterId) {
        return this.rest.one('clusters', clusterId).all('nodes').getList().then(function (nodes) {
            return _.sortBy(nodes, "hostname");
        });
    };
    // **getFilteredListByCluster**
    // **@returns** a promise with all nodes part of the cluster with query string.
    ServerService.prototype.getFilteredListByCluster = function (clusterId, queryString) {
        if (queryString != undefined) {
            queryString = "?" + queryString;
        }
        else {
            queryString = "";
        }
        return this.rest.one('clusters', clusterId).all('nodes' + queryString).getList().then(function (nodes) {
            return _.sortBy(nodes, "hostname");
        });
    };
    // **getFreeHosts**
    // **@returns** a promise with all servers which are free.
    ServerService.prototype.getFreeHosts = function () {
        return this.rest.all('nodes').getList({ state: 'free' }).then(function (servers) {
            return _.sortBy(_.filter(servers, function (server) { return server.state === NodeState.ACTIVE; }), "hostname");
        });
    };
    // **getAllFreeHosts**
    // **@returns** a promise with all free servers including the unaccepted Hosts.
    ServerService.prototype.getAllFreeHosts = function () {
        return this.rest.all('nodes').getList({ state: 'free' }).then(function (servers) {
            return _.sortBy(servers, "state");
        });
    };
    // **getDiscoveredHosts**
    // **@returns** a promise with all unmanaged nodes.
    ServerService.prototype.getDiscoveredHosts = function () {
        return this.rest.all('unmanaged_nodes').getList().then(function (nodes) {
            var unmanagedNodes = [];
            _.each(nodes, function (node) {
                unmanagedNodes.push({ hostname: node.hostname, saltfingerprint: node.saltfingerprint });
            });
            return _.sortBy(unmanagedNodes, "hostname");
        });
    };
    ServerService.prototype.acceptHost = function (hostname, saltfingerprint) {
        return this.restFull.all('nodes').post(saltfingerprint);
    };
    // **get**
    // **@returns** a promise with this specific server's metadata.
    ServerService.prototype.get = function (id) {
        return this.rest.one('nodes', id).get().then(function (server) {
            return server;
        });
    };
    // **getByHostname**
    // **@returns** a promise with this specific server's metadata.
    ServerService.prototype.getByHostname = function (hostname) {
        return this.getList().then(function (servers) {
            return _.find(servers, function (server) {
                return server.hostname === hostname;
            });
        });
    };
    // **add**
    // **@returns** a promise with the request id for the operation.
    ServerService.prototype.add = function (host) {
        return this.restFull.all('nodes').post(host);
    };
    // **updateDiskStorageProfile**
    // **@returns** status of the http request.
    ServerService.prototype.updateDiskStorageProfile = function (nodeid, diskid, storageprofile) {
        return this.restFull.one('nodes', nodeid).one('disks', diskid).customPUT({ storageprofile: storageprofile });
    };
    // **getGrains**
    // **@returns** a promise with the metadata, key value pairs associated with
    // this specific server, aka grains in Salt Stack parlance.
    // **@see** http://docs.saltstack.com/en/latest/topics/targeting/grains.html
    ServerService.prototype.getGrains = function (id) {
        return this.rest.one('server', id).one('grains').get().then(function (server) {
            return server;
        });
    };
    // **getStorageDevices**
    // **@returns** a promise with all storage devices in the server.
    ServerService.prototype.getStorageDevices = function (hostId) {
        return this.rest.one('hosts', hostId).all('storage-devices').getList().then(function (devices) {
            return devices;
        });
    };
    // **getDiskStorageDevices**
    // **@returns** a promise with all storage devices in the server.
    ServerService.prototype.getDiskStorageDevices = function (hostId) {
        return this.rest.one('hosts', hostId).all('storage-devices').getList().then(function (devices) {
            return _.filter(devices, function (device) {
                return device.device_type === 'disk';
            });
        });
    };
    // **getStorageDevicesFree**
    // **@returns** a promise with all storage devices which are not being used in the server.
    ServerService.prototype.getStorageDevicesFree = function (hostId, hostname) {
        return this.getStorageDevices(hostId).then(function (devices) {
            if (hostname) {
                _.each(devices, function (device) {
                    device.hostname = hostname;
                });
            }
            return _.filter(devices, function (device) {
                return device.inuse === false && device.device_type === 'disk';
            });
        });
    };
    // **getSystemOverallUtilization**
    // **@returns** a promise with Overall Utilization across all the nodes in system.
    ServerService.prototype.getSystemOverallUtilization = function () {
        return this.rest.all('monitoring/system/utilization?resource=system_utilization.percent_bytes').getList().then(function (overall_utilization) {
            return overall_utilization;
        });
    };
    // **getSystemCpuUtilization**
    // **@returns** a promise with Average CPU Utilization across all the nodes in system.
    ServerService.prototype.getSystemCpuUtilization = function (time_slot) {
        return this.rest.all('monitoring/system/utilization?resource=cpu-user-cpu-system&duration=' + time_slot).getList().then(function (cpu_utilization) {
            return cpu_utilization;
        });
    };
    // **getSystemMemoryUtilization**
    // **@returns** a promise with Average Memory Utilization across all the nodes in system.
    ServerService.prototype.getSystemMemoryUtilization = function (time_slot) {
        return this.rest.all('monitoring/system/utilization?resource=memory-usage_percent&duration=' + time_slot).getList().then(function (memory_utilization) {
            return memory_utilization;
        });
    };
    // **getIOPS**
    // **@returns** a promise with disks IOPS.
    ServerService.prototype.getIOPS = function (time_slot) {
        return this.rest.all('monitoring/system/utilization?resource=disk-read_write&duration=' + time_slot).getList().then(function (iops) {
            return iops;
        });
    };
    // **getThroughput**
    // **@returns** a promise with network throughput.
    ServerService.prototype.getThroughput = function (time_slot) {
        return this.rest.all('monitoring/system/utilization?resource=interface-rx_tx&duration=' + time_slot).getList().then(function (throughput) {
            return throughput;
        });
    };
    // **getNetworkLatency**
    // **@returns** a promise with network latency.
    ServerService.prototype.getNetworkLatency = function (time_slot) {
        return this.rest.all('monitoring/system/utilization?resource=network_latency&duration=' + time_slot).getList().then(function (network_latency) {
            return network_latency;
        });
    };
    ServerService.prototype.reinitialize = function (hostname) {
        return this.restFull.one('nodes', hostname).all('actions').post({ action: 'reinitialize' });
    };
    ServerService.prototype.delete = function (hostname) {
        return this.restFull.one('nodes', hostname).all('actions').post({ action: 'delete' });
    };
    // **getHostSummary**
    // **@returns** a promise with all details of host dashboard.
    ServerService.prototype.getHostSummary = function (hostId) {
        return this.rest.one('nodes/' + hostId + '/summary').get().then(function (host_summary) {
            return host_summary;
        });
    };
    // **getHostCpuUtilization**
    // **@returns** a promise with host's cpu utilization.
    ServerService.prototype.getHostCpuUtilization = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=cpu-user-cpu-system&duration=' + time_slot).getList().then(function (cpu_utilization) {
            return cpu_utilization;
        });
    };
    // **getHostMemoryUtilization**
    // **@returns** a promise with host's memory utilization.
    ServerService.prototype.getHostMemoryUtilization = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=memory.percent-used&duration=' + time_slot).getList().then(function (memory_utilization) {
            return memory_utilization;
        });
    };
    // **getHostSwapUtilization**
    // **@returns** a promise with host's swap utilization.
    ServerService.prototype.getHostSwapUtilization = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=swap.percent-used&duration=' + time_slot).getList().then(function (swap_utilization) {
            return swap_utilization;
        });
    };
    // **getHostStorageUtilization**
    // **@returns** a promise with host's storage utilization.
    ServerService.prototype.getHostStorageUtilization = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=storage_utilization.percent_bytes&duration=' + time_slot).getList().then(function (storage_utilization) {
            return storage_utilization;
        });
    };
    // **getHostNetworkUtilization**
    // **@returns** a promise with host's network utilization.
    ServerService.prototype.getHostNetworkUtilization = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=interface-average.percent-network_utilization&duration=' + time_slot).getList().then(function (network_utilization) {
            return network_utilization;
        });
    };
    // **getHostIOPS**
    // **@returns** a promise with disks IOPS for host.
    ServerService.prototype.getHostIOPS = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=disk-read_write&duration=' + time_slot).getList().then(function (iops) {
            return iops;
        });
    };
    // **getHostThroughput**
    // **@returns** a promise with network throughput for host.
    ServerService.prototype.getHostThroughput = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=interface-rx_tx&duration=' + time_slot).getList().then(function (throughput) {
            return throughput;
        });
    };
    // **getHostNetworkLatency**
    // **@returns** a promise with network latency for host.
    ServerService.prototype.getHostNetworkLatency = function (nodeid, time_slot) {
        return this.rest.all('monitoring/node/' + nodeid + '/utilization?resource=ping.ping-*&duration=' + time_slot).getList().then(function (network_latency) {
            return network_latency;
        });
    };
    // **getNodeSlus**
    // **@returns** a promise with all slus of the node.
    ServerService.prototype.getNodeSlus = function (nodeId) {
        return this.rest.one('nodes', nodeId).all('slus').getList().then(function (slus) {
            return slus;
        });
    };
    ServerService.$inject = ['Restangular'];
    return ServerService;
})();
exports.ServerService = ServerService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcmVzdC9zZXJ2ZXIudHMiXSwibmFtZXMiOlsiQWxhcm1TdGF0dXMiLCJOb2RlU3RhdGUiLCJOb2RlU3RhdHVzIiwiU2VydmVyU2VydmljZSIsIlNlcnZlclNlcnZpY2UuY29uc3RydWN0b3IiLCJTZXJ2ZXJTZXJ2aWNlLmdldERhc2hib2FyZFN1bW1hcnkiLCJTZXJ2ZXJTZXJ2aWNlLmdldEZpbHRlcmVkTGlzdCIsIlNlcnZlclNlcnZpY2UuZ2V0TGlzdCIsIlNlcnZlclNlcnZpY2UuZ2V0TGlzdEJ5Q2x1c3RlciIsIlNlcnZlclNlcnZpY2UuZ2V0RmlsdGVyZWRMaXN0QnlDbHVzdGVyIiwiU2VydmVyU2VydmljZS5nZXRGcmVlSG9zdHMiLCJTZXJ2ZXJTZXJ2aWNlLmdldEFsbEZyZWVIb3N0cyIsIlNlcnZlclNlcnZpY2UuZ2V0RGlzY292ZXJlZEhvc3RzIiwiU2VydmVyU2VydmljZS5hY2NlcHRIb3N0IiwiU2VydmVyU2VydmljZS5nZXQiLCJTZXJ2ZXJTZXJ2aWNlLmdldEJ5SG9zdG5hbWUiLCJTZXJ2ZXJTZXJ2aWNlLmFkZCIsIlNlcnZlclNlcnZpY2UudXBkYXRlRGlza1N0b3JhZ2VQcm9maWxlIiwiU2VydmVyU2VydmljZS5nZXRHcmFpbnMiLCJTZXJ2ZXJTZXJ2aWNlLmdldFN0b3JhZ2VEZXZpY2VzIiwiU2VydmVyU2VydmljZS5nZXREaXNrU3RvcmFnZURldmljZXMiLCJTZXJ2ZXJTZXJ2aWNlLmdldFN0b3JhZ2VEZXZpY2VzRnJlZSIsIlNlcnZlclNlcnZpY2UuZ2V0U3lzdGVtT3ZlcmFsbFV0aWxpemF0aW9uIiwiU2VydmVyU2VydmljZS5nZXRTeXN0ZW1DcHVVdGlsaXphdGlvbiIsIlNlcnZlclNlcnZpY2UuZ2V0U3lzdGVtTWVtb3J5VXRpbGl6YXRpb24iLCJTZXJ2ZXJTZXJ2aWNlLmdldElPUFMiLCJTZXJ2ZXJTZXJ2aWNlLmdldFRocm91Z2hwdXQiLCJTZXJ2ZXJTZXJ2aWNlLmdldE5ldHdvcmtMYXRlbmN5IiwiU2VydmVyU2VydmljZS5yZWluaXRpYWxpemUiLCJTZXJ2ZXJTZXJ2aWNlLmRlbGV0ZSIsIlNlcnZlclNlcnZpY2UuZ2V0SG9zdFN1bW1hcnkiLCJTZXJ2ZXJTZXJ2aWNlLmdldEhvc3RDcHVVdGlsaXphdGlvbiIsIlNlcnZlclNlcnZpY2UuZ2V0SG9zdE1lbW9yeVV0aWxpemF0aW9uIiwiU2VydmVyU2VydmljZS5nZXRIb3N0U3dhcFV0aWxpemF0aW9uIiwiU2VydmVyU2VydmljZS5nZXRIb3N0U3RvcmFnZVV0aWxpemF0aW9uIiwiU2VydmVyU2VydmljZS5nZXRIb3N0TmV0d29ya1V0aWxpemF0aW9uIiwiU2VydmVyU2VydmljZS5nZXRIb3N0SU9QUyIsIlNlcnZlclNlcnZpY2UuZ2V0SG9zdFRocm91Z2hwdXQiLCJTZXJ2ZXJTZXJ2aWNlLmdldEhvc3ROZXR3b3JrTGF0ZW5jeSIsIlNlcnZlclNlcnZpY2UuZ2V0Tm9kZVNsdXMiXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFrRDtBQStDbEQsSUFBSyxXQU9KO0FBUEQsV0FBSyxXQUFXO0lBQ1pBLCtEQUFhQSxDQUFBQTtJQUNiQSxxREFBUUEsQ0FBQUE7SUFDUkEsK0NBQUtBLENBQUFBO0lBQ0xBLCtDQUFLQSxDQUFBQTtJQUNMQSxtREFBT0EsQ0FBQUE7SUFDUEEsbURBQU9BLENBQUFBLENBQVNBLEdBQUdBO0FBQ3ZCQSxDQUFDQSxFQVBJLFdBQVcsS0FBWCxXQUFXLFFBT2Y7QUFFRCxXQUFZLFNBQVM7SUFDakJDLHFEQUFVQSxDQUFBQTtJQUNWQSx5REFBWUEsQ0FBQUE7SUFDWkEsNkNBQU1BLENBQUFBO0lBQ05BLDZDQUFNQSxDQUFBQTtJQUNOQSxtREFBU0EsQ0FBQUEsQ0FBT0EsR0FBR0E7QUFDdkJBLENBQUNBLEVBTlcsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQU5ELElBQVksU0FBUyxHQUFULGlCQU1YLENBQUE7QUFFRCxXQUFZLFVBQVU7SUFDbEJDLHVDQUFFQSxDQUFBQTtJQUNGQSwyQ0FBSUEsQ0FBQUE7SUFDSkEsNkNBQUtBLENBQUFBO0lBQ0xB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T0FBT0EsRUFBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBU0EsSUFBSUE7WUFDL0UsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBN1NNcEMscUJBQU9BLEdBQWtCQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQStTcERBLG9CQUFDQTtBQUFEQSxDQW5UQSxBQW1UQ0EsSUFBQTtBQW5UWSxxQkFBYSxnQkFtVHpCLENBQUEiLCJmaWxlIjoibW9kdWxlcy9yZXN0L3NlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcbiAgICByb2xlczogQXJyYXk8c3RyaW5nPjtcbiAgICBhbG1jb3VudDogbnVtYmVyO1xuICAgIGFsbXN0YXR1czogQWxhcm1TdGF0dXM7XG4gICAgY2x1c3Rlcl9pcDQ6IHN0cmluZztcbiAgICBjbHVzdGVyaWQ6IHN0cmluZztcbiAgICBjcHVzOiBhbnlbXTtcbiAgICBlbmFibGVkPzogYm9vbGVhbjtcbiAgICBob3N0bmFtZTogc3RyaW5nO1xuICAgIGxvY2F0aW9uOiBzdHJpbmc7XG4gICAgbWFuYWdlbWVudF9pcDQ6IHN0cmluZztcbiAgICBtZW1vcnk6IHt9O1xuICAgIG5ldHdvcmtfaW5mbzoge307XG4gICAgbm9kZWlkOiBzdHJpbmc7XG4gICAgb3B0aW9uczoge307XG4gICAgb3M6IHt9O1xuICAgIHB1YmxpY19pcDQ6IHN0cmluZztcbiAgICBzdGF0ZTogTm9kZVN0YXRlO1xuICAgIHN0YXR1czogTm9kZVN0YXR1cztcbiAgICBzdG9yYWdlX2Rpc2tzOiBhbnlbXTtcbiAgICB0YWdzOiBhbnlbXTtcbiAgICB1dGlsaXphdGlvbnM6IHsgY3B1dXNhZ2U6IFVzYWdlRGF0YSwgbWVtb3J5dXNhZ2U6IFVzYWdlRGF0YSwgc3RvcmFnZXVzYWdlOiBVc2FnZURhdGEsIHN3YXB1c2FnZTogVXNhZ2VEYXRhLCBuZXR3b3JrdXNhZ2U6IFVzYWdlRGF0YSB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzYWdlRGF0YSB7XG4gICAgdXNlZDogbnVtYmVyO1xuICAgIHRvdGFsOiBudW1iZXI7XG4gICAgcGVyY2VudHVzZWQ/OiBudW1iZXI7XG4gICAgdXBkYXRlZGF0PzogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZFN1bW1hcnlEYXRhIHtcbiAgICAgbmFtZTogc3RyaW5nO1xuICAgICB1c2FnZTogVXNhZ2VEYXRhO1xuICAgICBzdG9yYWdlcHJvZmlsZXVzYWdlOiB7IGRlZmF1bHQ/OiB7IGlzRnVsbDpib29sZWFuLCBpc05lYXJGdWxsOiBib29sZWFuLCB1dGlsaXphdGlvbjogVXNhZ2VEYXRhIH0sIHNhcz86IHsgaXNGdWxsOmJvb2xlYW4sIGlzTmVhckZ1bGw6IGJvb2xlYW4sIHV0aWxpemF0aW9uOiBVc2FnZURhdGEgfSwgc3NkPzogeyBpc0Z1bGw6Ym9vbGVhbiwgaXNOZWFyRnVsbDogYm9vbGVhbiwgdXRpbGl6YXRpb246IFVzYWdlRGF0YSB9IH07XG4gICAgIHN0b3JhZ2Vjb3VudDogeyBjcml0aWNhbEFsZXJ0czogbnVtYmVyLCBkb3duOiBudW1iZXIsIHRvdGFsOm51bWJlciB9O1xuICAgICBzbHVjb3VudDogeyBjcml0aWNhbEFsZXJ0czogbnVtYmVyLCBkb3duOiBudW1iZXIsIGVycm9yOiBudW1iZXIsIG5lYXJmdWxsOiBudW1iZXIsIHRvdGFsOiBudW1iZXIgfTtcbiAgICAgbm9kZXNjb3VudDogeyBjcml0aWNhbEFsZXJ0czogbnVtYmVyLCBlcnJvcjogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCB1bmFjY2VwdGVkOiBudW1iZXIgfTtcbiAgICAgY2x1c3RlcnNjb3VudDogeyBjcml0aWNhbEFsZXJ0czogbnVtYmVyLCBlcnJvcjogbnVtYmVyLCBuZWFyZnVsbDogbnVtYmVyLCB0b3RhbDogbnVtYmVyIH07XG4gICAgIHByb3ZpZGVybW9uaXRvcmluZ2RldGFpbHM6IHsgY2VwaDogeyBtb25pdG9yOiB7IGNyaXRpY2FsQWxlcnRzOiBudW1iZXIsIGRvd246IG51bWJlciwgdG90YWw6IG51bWJlciB9LCBvYmplY3RzOiB7IG51bV9vYmplY3RzOiBudW1iZXIsIG51bV9vYmplY3RzX2RlZ3JhZGVkOiBudW1iZXIgfSwgcGdudW06IHsgdG90YWw6IG51bWJlciwgZXJyb3I6IG51bWJlciwgd2FybmluZzogbnVtYmVyIH0gfSB9O1xuICAgICBzdG9yYWdldXNhZ2U6IEFycmF5PHsgbmFtZTogc3RyaW5nLCB1c2FnZTogVXNhZ2VEYXRhIH0+O1xuICAgICB1dGlsaXphdGlvbnM6IHsgY3B1cGVyY2VudGFnZXVzYWdlOiBudW1iZXIsIG1lbW9yeXVzYWdlOiBVc2FnZURhdGEgfTtcbiAgICAgbW9uaXRvcmluZ3BsdWdpbnM6IHsgc3RvcmFnZV9wcm9maWxlX3V0aWxpemF0aW9uOiB7IG5hbWU6IHN0cmluZywgZW5hYmxlOiBib29sZWFuLCBjb25maWdzOiBBcnJheTx7IGNhdGVnb3J5OiBzdHJpbmcsIHR5cGU6IHN0cmluZywgdmFsdWU6IG51bWJlciB9PiB9IH07XG59XG5cbmVudW0gQWxhcm1TdGF0dXMge1xuICAgIElOREVURVJNSU5BVEUsICAvLzBcbiAgICBDUklUSUNBTCwgICAgICAgLy8xXG4gICAgTUFKT1IsICAgICAgICAgIC8vMlxuICAgIE1JTk9SLCAgICAgICAgICAvLzNcbiAgICBXQVJOSU5HLCAgICAgICAgLy80XG4gICAgQ0xFQVJFRCAgICAgICAgIC8vNVxufVxuXG5leHBvcnQgZW51bSBOb2RlU3RhdGUge1xuICAgIFVOQUNDRVBURUQsICAgICAvLzBcbiAgICBJTklUSUFMSVpJTkcsICAgLy8xXG4gICAgQUNUSVZFLCAgICAgICAgIC8vMlxuICAgIEZBSUxFRCwgICAgICAgICAvLzNcbiAgICBVTk1BTkFHRUQgICAgICAgLy80XG59XG5cbmV4cG9ydCBlbnVtIE5vZGVTdGF0dXMge1xuICAgIE9LLCAgICAgICAgIC8vMFxuICAgIFdBUk4sICAgICAgIC8vMVxuICAgIEVSUk9SLCAgICAgIC8vMlxuICAgIFVOS05PV04gICAgIC8vM1xufVxuXG5leHBvcnQgY2xhc3MgU2VydmVyU2VydmljZSB7XG4gICAgY29uZmlnOiBBcnJheTxhbnk+O1xuICAgIHJlc3Q6IHJlc3Rhbmd1bGFyLklTZXJ2aWNlO1xuICAgIHJlc3RGdWxsOiByZXN0YW5ndWxhci5JU2VydmljZTtcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnUmVzdGFuZ3VsYXInXTtcbiAgICBjb25zdHJ1Y3RvcihyZXN0OiByZXN0YW5ndWxhci5JQ29sbGVjdGlvbikge1xuICAgICAgICB0aGlzLnJlc3QgPSByZXN0LndpdGhDb25maWcoKFJlc3Rhbmd1bGFyQ29uZmlndXJlcikgPT4ge1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyLnNldEJhc2VVcmwoJy9hcGkvdjEvJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlc3RGdWxsID0gcmVzdC53aXRoQ29uZmlnKChSZXN0YW5ndWxhckNvbmZpZ3VyZXIpID0+IHtcbiAgICAgICAgICAgIFJlc3Rhbmd1bGFyQ29uZmlndXJlci5zZXRCYXNlVXJsKCcvYXBpL3YxLycpO1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyLnNldEZ1bGxSZXNwb25zZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLyAqKmdldERhc2hib2FyZFN1bW1hcnkqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgZGV0YWlscyBvZiBtYWluIGRhc2hib2FyZC5cbiAgICBnZXREYXNoYm9hcmRTdW1tYXJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Lm9uZSgnc3lzdGVtL3N1bW1hcnknKS5nZXQoKS50aGVuKGZ1bmN0aW9uKHN1bW1hcnk6IERhc2hib2FyZFN1bW1hcnlEYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gc3VtbWFyeTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRGaWx0ZXJlZExpc3QqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgc2VydmVycyB3aXRoIHF1ZXJ5IHN0cmluZy5cbiAgICBnZXRGaWx0ZXJlZExpc3QocXVlcnlTdHJpbmcpIHtcbiAgICAgICAgaWYocXVlcnlTdHJpbmcgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gXCI/XCIgKyBxdWVyeVN0cmluZztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBxdWVyeVN0cmluZyA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ25vZGVzJyArIHF1ZXJ5U3RyaW5nKS5nZXRMaXN0PE5vZGU+KCkudGhlbihmdW5jdGlvbihzZXJ2ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5zb3J0Qnkoc2VydmVycywgXCJob3N0bmFtZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRMaXN0KipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggYWxsIHNlcnZlcnMuXG4gICAgZ2V0TGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ25vZGVzJykuZ2V0TGlzdDxOb2RlPigpLnRoZW4oZnVuY3Rpb24oc2VydmVycykge1xuICAgICAgICAgICAgcmV0dXJuIF8uc29ydEJ5KHNlcnZlcnMsIFwiaG9zdG5hbWVcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0TGlzdEJ5Q2x1c3RlcioqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGFsbCBub2RlcyBwYXJ0IG9mIHRoZSBjbHVzdGVyLlxuICAgIGdldExpc3RCeUNsdXN0ZXIoY2x1c3RlcklkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3Qub25lKCdjbHVzdGVycycsIGNsdXN0ZXJJZCkuYWxsKCdub2RlcycpLmdldExpc3Q8Tm9kZT4oKS50aGVuKGZ1bmN0aW9uKG5vZGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5zb3J0Qnkobm9kZXMsIFwiaG9zdG5hbWVcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0RmlsdGVyZWRMaXN0QnlDbHVzdGVyKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggYWxsIG5vZGVzIHBhcnQgb2YgdGhlIGNsdXN0ZXIgd2l0aCBxdWVyeSBzdHJpbmcuXG4gICAgZ2V0RmlsdGVyZWRMaXN0QnlDbHVzdGVyKGNsdXN0ZXJJZCwgcXVlcnlTdHJpbmcpIHtcbiAgICAgICAgaWYocXVlcnlTdHJpbmcgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gXCI/XCIgKyBxdWVyeVN0cmluZztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBxdWVyeVN0cmluZyA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5vbmUoJ2NsdXN0ZXJzJywgY2x1c3RlcklkKS5hbGwoJ25vZGVzJytxdWVyeVN0cmluZykuZ2V0TGlzdDxOb2RlPigpLnRoZW4oZnVuY3Rpb24obm9kZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfLnNvcnRCeShub2RlcywgXCJob3N0bmFtZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRGcmVlSG9zdHMqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgc2VydmVycyB3aGljaCBhcmUgZnJlZS5cbiAgICBnZXRGcmVlSG9zdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QuYWxsKCdub2RlcycpLmdldExpc3Q8Tm9kZT4oeyBzdGF0ZTogJ2ZyZWUnIH0pLnRoZW4oZnVuY3Rpb24oc2VydmVycykge1xuICAgICAgICAgICAgcmV0dXJuIF8uc29ydEJ5KF8uZmlsdGVyKHNlcnZlcnMsIHNlcnZlciA9PiBzZXJ2ZXIuc3RhdGUgPT09IE5vZGVTdGF0ZS5BQ1RJVkUpLCBcImhvc3RuYW1lXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldEFsbEZyZWVIb3N0cyoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGFsbCBmcmVlIHNlcnZlcnMgaW5jbHVkaW5nIHRoZSB1bmFjY2VwdGVkIEhvc3RzLlxuICAgIGdldEFsbEZyZWVIb3N0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ25vZGVzJykuZ2V0TGlzdDxOb2RlPih7IHN0YXRlOiAnZnJlZScgfSkudGhlbihmdW5jdGlvbihzZXJ2ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5zb3J0Qnkoc2VydmVycywgXCJzdGF0ZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXREaXNjb3ZlcmVkSG9zdHMqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgdW5tYW5hZ2VkIG5vZGVzLlxuICAgIGdldERpc2NvdmVyZWRIb3N0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ3VubWFuYWdlZF9ub2RlcycpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKG5vZGVzOiBBcnJheTxhbnk+KSB7XG4gICAgICAgICAgICB2YXIgdW5tYW5hZ2VkTm9kZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgICAgICAgIF8uZWFjaChub2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgdW5tYW5hZ2VkTm9kZXMucHVzaCh7IGhvc3RuYW1lOiBub2RlLmhvc3RuYW1lLCBzYWx0ZmluZ2VycHJpbnQ6IG5vZGUuc2FsdGZpbmdlcnByaW50IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gXy5zb3J0QnkodW5tYW5hZ2VkTm9kZXMsIFwiaG9zdG5hbWVcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFjY2VwdEhvc3QoaG9zdG5hbWUsIHNhbHRmaW5nZXJwcmludDogeyBzYWx0ZmluZ2VycHJpbnQ6IHN0cmluZyB9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RGdWxsLmFsbCgnbm9kZXMnKS5wb3N0KHNhbHRmaW5nZXJwcmludCk7XG4gICAgfVxuXG4gICAgLy8gKipnZXQqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCB0aGlzIHNwZWNpZmljIHNlcnZlcidzIG1ldGFkYXRhLlxuICAgIGdldChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Lm9uZSgnbm9kZXMnLCBpZCkuZ2V0KCkudGhlbihmdW5jdGlvbihzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0QnlIb3N0bmFtZSoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIHRoaXMgc3BlY2lmaWMgc2VydmVyJ3MgbWV0YWRhdGEuXG4gICAgZ2V0QnlIb3N0bmFtZShob3N0bmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihzZXJ2ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5maW5kKHNlcnZlcnMsIGZ1bmN0aW9uKHNlcnZlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2ZXIuaG9zdG5hbWUgPT09IGhvc3RuYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqYWRkKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggdGhlIHJlcXVlc3QgaWQgZm9yIHRoZSBvcGVyYXRpb24uXG4gICAgYWRkKGhvc3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdEZ1bGwuYWxsKCdub2RlcycpLnBvc3QoaG9zdCk7XG4gICAgfVxuXG4gICAgLy8gKip1cGRhdGVEaXNrU3RvcmFnZVByb2ZpbGUqKlxuICAgIC8vICoqQHJldHVybnMqKiBzdGF0dXMgb2YgdGhlIGh0dHAgcmVxdWVzdC5cbiAgICB1cGRhdGVEaXNrU3RvcmFnZVByb2ZpbGUobm9kZWlkOiBzdHJpbmcsIGRpc2tpZDogc3RyaW5nLCBzdG9yYWdlcHJvZmlsZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3RGdWxsLm9uZSgnbm9kZXMnLCBub2RlaWQpLm9uZSgnZGlza3MnLCBkaXNraWQpLmN1c3RvbVBVVCh7IHN0b3JhZ2Vwcm9maWxlOiBzdG9yYWdlcHJvZmlsZSB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldEdyYWlucyoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIHRoZSBtZXRhZGF0YSwga2V5IHZhbHVlIHBhaXJzIGFzc29jaWF0ZWQgd2l0aFxuICAgIC8vIHRoaXMgc3BlY2lmaWMgc2VydmVyLCBha2EgZ3JhaW5zIGluIFNhbHQgU3RhY2sgcGFybGFuY2UuXG4gICAgLy8gKipAc2VlKiogaHR0cDovL2RvY3Muc2FsdHN0YWNrLmNvbS9lbi9sYXRlc3QvdG9waWNzL3RhcmdldGluZy9ncmFpbnMuaHRtbFxuICAgIGdldEdyYWlucyhpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Lm9uZSgnc2VydmVyJywgaWQpLm9uZSgnZ3JhaW5zJykuZ2V0KCkudGhlbihmdW5jdGlvbihzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXJ2ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0U3RvcmFnZURldmljZXMqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgc3RvcmFnZSBkZXZpY2VzIGluIHRoZSBzZXJ2ZXIuXG4gICAgZ2V0U3RvcmFnZURldmljZXMoaG9zdElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3Qub25lKCdob3N0cycsIGhvc3RJZCkuYWxsKCdzdG9yYWdlLWRldmljZXMnKS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gZGV2aWNlcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXREaXNrU3RvcmFnZURldmljZXMqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgc3RvcmFnZSBkZXZpY2VzIGluIHRoZSBzZXJ2ZXIuXG4gICAgZ2V0RGlza1N0b3JhZ2VEZXZpY2VzKGhvc3RJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Lm9uZSgnaG9zdHMnLCBob3N0SWQpLmFsbCgnc3RvcmFnZS1kZXZpY2VzJykuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24oZGV2aWNlcykge1xuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGRldmljZXMsIGZ1bmN0aW9uKGRldmljZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXZpY2UuZGV2aWNlX3R5cGUgPT09ICdkaXNrJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICBcbiAgICAvLyAqKmdldFN0b3JhZ2VEZXZpY2VzRnJlZSoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGFsbCBzdG9yYWdlIGRldmljZXMgd2hpY2ggYXJlIG5vdCBiZWluZyB1c2VkIGluIHRoZSBzZXJ2ZXIuXG4gICAgZ2V0U3RvcmFnZURldmljZXNGcmVlKGhvc3RJZCwgaG9zdG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RvcmFnZURldmljZXMoaG9zdElkKS50aGVuKGZ1bmN0aW9uKGRldmljZXMpIHtcbiAgICAgICAgICAgIGlmIChob3N0bmFtZSkge1xuICAgICAgICAgICAgICAgIF8uZWFjaChkZXZpY2VzLCBmdW5jdGlvbihkZXZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlLmhvc3RuYW1lID0gaG9zdG5hbWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoZGV2aWNlcywgZnVuY3Rpb24oZGV2aWNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldmljZS5pbnVzZSA9PT0gZmFsc2UgJiYgZGV2aWNlLmRldmljZV90eXBlID09PSAnZGlzayc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRTeXN0ZW1PdmVyYWxsVXRpbGl6YXRpb24qKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBPdmVyYWxsIFV0aWxpemF0aW9uIGFjcm9zcyBhbGwgdGhlIG5vZGVzIGluIHN5c3RlbS5cbiAgICBnZXRTeXN0ZW1PdmVyYWxsVXRpbGl6YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QuYWxsKCdtb25pdG9yaW5nL3N5c3RlbS91dGlsaXphdGlvbj9yZXNvdXJjZT1zeXN0ZW1fdXRpbGl6YXRpb24ucGVyY2VudF9ieXRlcycpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKG92ZXJhbGxfdXRpbGl6YXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBvdmVyYWxsX3V0aWxpemF0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldFN5c3RlbUNwdVV0aWxpemF0aW9uKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggQXZlcmFnZSBDUFUgVXRpbGl6YXRpb24gYWNyb3NzIGFsbCB0aGUgbm9kZXMgaW4gc3lzdGVtLlxuICAgIGdldFN5c3RlbUNwdVV0aWxpemF0aW9uKHRpbWVfc2xvdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmFsbCgnbW9uaXRvcmluZy9zeXN0ZW0vdXRpbGl6YXRpb24/cmVzb3VyY2U9Y3B1LXVzZXItY3B1LXN5c3RlbSZkdXJhdGlvbj0nK3RpbWVfc2xvdCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24oY3B1X3V0aWxpemF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gY3B1X3V0aWxpemF0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldFN5c3RlbU1lbW9yeVV0aWxpemF0aW9uKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggQXZlcmFnZSBNZW1vcnkgVXRpbGl6YXRpb24gYWNyb3NzIGFsbCB0aGUgbm9kZXMgaW4gc3lzdGVtLlxuICAgIGdldFN5c3RlbU1lbW9yeVV0aWxpemF0aW9uKHRpbWVfc2xvdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmFsbCgnbW9uaXRvcmluZy9zeXN0ZW0vdXRpbGl6YXRpb24/cmVzb3VyY2U9bWVtb3J5LXVzYWdlX3BlcmNlbnQmZHVyYXRpb249Jyt0aW1lX3Nsb3QpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKG1lbW9yeV91dGlsaXphdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG1lbW9yeV91dGlsaXphdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRJT1BTKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggZGlza3MgSU9QUy5cbiAgICBnZXRJT1BTKHRpbWVfc2xvdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmFsbCgnbW9uaXRvcmluZy9zeXN0ZW0vdXRpbGl6YXRpb24/cmVzb3VyY2U9ZGlzay1yZWFkX3dyaXRlJmR1cmF0aW9uPScrdGltZV9zbG90KS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihpb3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gaW9wcztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRUaHJvdWdocHV0KipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggbmV0d29yayB0aHJvdWdocHV0LlxuICAgIGdldFRocm91Z2hwdXQodGltZV9zbG90KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QuYWxsKCdtb25pdG9yaW5nL3N5c3RlbS91dGlsaXphdGlvbj9yZXNvdXJjZT1pbnRlcmZhY2UtcnhfdHgmZHVyYXRpb249Jyt0aW1lX3Nsb3QpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKHRocm91Z2hwdXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvdWdocHV0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldE5ldHdvcmtMYXRlbmN5KipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggbmV0d29yayBsYXRlbmN5LlxuICAgIGdldE5ldHdvcmtMYXRlbmN5KHRpbWVfc2xvdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmFsbCgnbW9uaXRvcmluZy9zeXN0ZW0vdXRpbGl6YXRpb24/cmVzb3VyY2U9bmV0d29ya19sYXRlbmN5JmR1cmF0aW9uPScrdGltZV9zbG90KS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihuZXR3b3JrX2xhdGVuY3kpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXR3b3JrX2xhdGVuY3k7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWluaXRpYWxpemUoaG9zdG5hbWUpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0RnVsbC5vbmUoJ25vZGVzJyxob3N0bmFtZSkuYWxsKCdhY3Rpb25zJykucG9zdCh7YWN0aW9uOiAncmVpbml0aWFsaXplJ30pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGUoaG9zdG5hbWUpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0RnVsbC5vbmUoJ25vZGVzJyxob3N0bmFtZSkuYWxsKCdhY3Rpb25zJykucG9zdCh7YWN0aW9uOiAnZGVsZXRlJ30pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0SG9zdFN1bW1hcnkqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgZGV0YWlscyBvZiBob3N0IGRhc2hib2FyZC5cbiAgICBnZXRIb3N0U3VtbWFyeShob3N0SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5vbmUoJ25vZGVzLycrIGhvc3RJZCArJy9zdW1tYXJ5JykuZ2V0KCkudGhlbihmdW5jdGlvbihob3N0X3N1bW1hcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBob3N0X3N1bW1hcnk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0SG9zdENwdVV0aWxpemF0aW9uKipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggaG9zdCdzIGNwdSB1dGlsaXphdGlvbi5cbiAgICBnZXRIb3N0Q3B1VXRpbGl6YXRpb24obm9kZWlkLCB0aW1lX3Nsb3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ21vbml0b3Jpbmcvbm9kZS8nK25vZGVpZCsnL3V0aWxpemF0aW9uP3Jlc291cmNlPWNwdS11c2VyLWNwdS1zeXN0ZW0mZHVyYXRpb249Jyt0aW1lX3Nsb3QpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKGNwdV91dGlsaXphdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGNwdV91dGlsaXphdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gKipnZXRIb3N0TWVtb3J5VXRpbGl6YXRpb24qKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBob3N0J3MgbWVtb3J5IHV0aWxpemF0aW9uLlxuICAgIGdldEhvc3RNZW1vcnlVdGlsaXphdGlvbihub2RlaWQsIHRpbWVfc2xvdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmFsbCgnbW9uaXRvcmluZy9ub2RlLycrbm9kZWlkKycvdXRpbGl6YXRpb24/cmVzb3VyY2U9bWVtb3J5LnBlcmNlbnQtdXNlZCZkdXJhdGlvbj0nK3RpbWVfc2xvdCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24obWVtb3J5X3V0aWxpemF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVtb3J5X3V0aWxpemF0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldEhvc3RTd2FwVXRpbGl6YXRpb24qKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBob3N0J3Mgc3dhcCB1dGlsaXphdGlvbi5cbiAgICBnZXRIb3N0U3dhcFV0aWxpemF0aW9uKG5vZGVpZCwgdGltZV9zbG90KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QuYWxsKCdtb25pdG9yaW5nL25vZGUvJytub2RlaWQrJy91dGlsaXphdGlvbj9yZXNvdXJjZT1zd2FwLnBlcmNlbnQtdXNlZCZkdXJhdGlvbj0nK3RpbWVfc2xvdCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24oc3dhcF91dGlsaXphdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHN3YXBfdXRpbGl6YXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0SG9zdFN0b3JhZ2VVdGlsaXphdGlvbioqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGhvc3QncyBzdG9yYWdlIHV0aWxpemF0aW9uLlxuICAgIGdldEhvc3RTdG9yYWdlVXRpbGl6YXRpb24obm9kZWlkLCB0aW1lX3Nsb3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ21vbml0b3Jpbmcvbm9kZS8nK25vZGVpZCsnL3V0aWxpemF0aW9uP3Jlc291cmNlPXN0b3JhZ2VfdXRpbGl6YXRpb24ucGVyY2VudF9ieXRlcyZkdXJhdGlvbj0nK3RpbWVfc2xvdCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24oc3RvcmFnZV91dGlsaXphdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JhZ2VfdXRpbGl6YXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0SG9zdE5ldHdvcmtVdGlsaXphdGlvbioqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIGhvc3QncyBuZXR3b3JrIHV0aWxpemF0aW9uLlxuICAgIGdldEhvc3ROZXR3b3JrVXRpbGl6YXRpb24obm9kZWlkLCB0aW1lX3Nsb3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ21vbml0b3Jpbmcvbm9kZS8nK25vZGVpZCsnL3V0aWxpemF0aW9uP3Jlc291cmNlPWludGVyZmFjZS1hdmVyYWdlLnBlcmNlbnQtbmV0d29ya191dGlsaXphdGlvbiZkdXJhdGlvbj0nK3RpbWVfc2xvdCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24obmV0d29ya191dGlsaXphdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldHdvcmtfdXRpbGl6YXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0SG9zdElPUFMqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBkaXNrcyBJT1BTIGZvciBob3N0LlxuICAgIGdldEhvc3RJT1BTKG5vZGVpZCwgdGltZV9zbG90KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QuYWxsKCdtb25pdG9yaW5nL25vZGUvJytub2RlaWQrJy91dGlsaXphdGlvbj9yZXNvdXJjZT1kaXNrLXJlYWRfd3JpdGUmZHVyYXRpb249Jyt0aW1lX3Nsb3QpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKGlvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiBpb3BzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldEhvc3RUaHJvdWdocHV0KipcbiAgICAvLyAqKkByZXR1cm5zKiogYSBwcm9taXNlIHdpdGggbmV0d29yayB0aHJvdWdocHV0IGZvciBob3N0LlxuICAgIGdldEhvc3RUaHJvdWdocHV0KG5vZGVpZCwgdGltZV9zbG90KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QuYWxsKCdtb25pdG9yaW5nL25vZGUvJytub2RlaWQrJy91dGlsaXphdGlvbj9yZXNvdXJjZT1pbnRlcmZhY2UtcnhfdHgmZHVyYXRpb249Jyt0aW1lX3Nsb3QpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uKHRocm91Z2hwdXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvdWdocHV0O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAqKmdldEhvc3ROZXR3b3JrTGF0ZW5jeSoqXG4gICAgLy8gKipAcmV0dXJucyoqIGEgcHJvbWlzZSB3aXRoIG5ldHdvcmsgbGF0ZW5jeSBmb3IgaG9zdC5cbiAgICBnZXRIb3N0TmV0d29ya0xhdGVuY3kobm9kZWlkLCB0aW1lX3Nsb3QpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5hbGwoJ21vbml0b3Jpbmcvbm9kZS8nK25vZGVpZCsnL3V0aWxpemF0aW9uP3Jlc291cmNlPXBpbmcucGluZy0qJmR1cmF0aW9uPScrdGltZV9zbG90KS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihuZXR3b3JrX2xhdGVuY3kpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXR3b3JrX2xhdGVuY3k7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vICoqZ2V0Tm9kZVNsdXMqKlxuICAgIC8vICoqQHJldHVybnMqKiBhIHByb21pc2Ugd2l0aCBhbGwgc2x1cyBvZiB0aGUgbm9kZS5cbiAgICBnZXROb2RlU2x1cyhub2RlSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5vbmUoJ25vZGVzJywgbm9kZUlkKS5hbGwoJ3NsdXMnKS5nZXRMaXN0PGFueT4oKS50aGVuKGZ1bmN0aW9uKHNsdXMpIHtcbiAgICAgICAgICAgIHJldHVybiBzbHVzO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==
