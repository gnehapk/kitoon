var cluster_helpers_1 = require('../clusters/cluster-helpers');
var ModalHelpers = require('../modal/modal-helpers');
var HostListController = (function () {
    function HostListController($scope, $interval, $location, $log, $modal, $timeout, clusterSvc, serverService, utilService, requestService) {
        var _this = this;
        this.$scope = $scope;
        this.$interval = $interval;
        this.$location = $location;
        this.$log = $log;
        this.$modal = $modal;
        this.$timeout = $timeout;
        this.clusterSvc = clusterSvc;
        this.serverService = serverService;
        this.utilService = utilService;
        this.requestService = requestService;
        this.updateHost = function (hosts) {
            var self = _this;
            _.each(hosts, function (host) {
                host.alerts = 0;
                if (self.hostStats[host.nodeid]) {
                    host.cpu_average = Math.round(Math.random() * 70);
                    host.memory_average = self.hostStats[host.nodeid].memAvg;
                }
                else {
                    host.cpu_average = Math.round(Math.random() * 70);
                    host.memory_average = Math.round(Math.random() * 70);
                }
                if (host.clusterid != null && host.clusterid !== '00000000-0000-0000-0000-000000000000') {
                    if (!self.clusters[host.clusterid]) {
                        self.clusterSvc.get(host.clusterid).then(function (cluster) {
                            host.cluster_type = cluster.type;
                            host.cluster_name = cluster.name;
                            self.clusters[host.clusterid] = { name: cluster.name, type: cluster.type };
                        });
                    }
                    else {
                        host.cluster_type = self.clusters[host.clusterid].type;
                        host.cluster_name = self.clusters[host.clusterid].name;
                    }
                }
                else {
                    host.cluster_type = "Free";
                    host.cluster_name = "Unassigned";
                }
                self.serverService.getHostMemoryUtilization(host.nodeid, '').then(function (memory_utilization) {
                    self.hostStats[host.nodeid] = { memAvg: host.utilizations.memoryusage.percentused };
                });
            });
            _this.list = hosts;
        };
        this.paramsObject = $location.search();
        if (Object.keys(this.paramsObject).length > 0) {
            if ("tab" in this.paramsObject) {
                delete this.paramsObject.tab;
            }
            this.updateSearchQuery(this.paramsObject);
        }
        this.clusterHelper = new cluster_helpers_1.ClusterHelper(utilService, requestService, $log, $timeout);
        this.clusters = {};
        this.hostStats = {};
        this.timer = this.$interval(function () { return _this.reloadData(); }, 60000);
        this.$scope.$on('$destroy', function () {
            _this.$interval.cancel(_this.timer);
        });
        this.reloadData();
    }
    HostListController.prototype.isArray = function (data) {
        return data instanceof Array;
    };
    HostListController.prototype.updateSearchQuery = function (paramsObject) {
        var _this = this;
        this.searchQuery = '';
        /*  paramsObject can have 3 case : -
                1) { status: [error,warning] , tab: <OSD,HOST,etc> }
                2) { tab: <OSD,HOST,etc> }
                3) { status: [error,warning] }
            and searchQuery will be like this : -
            /api/<ver>/clusters?status=ok&status=warning&tab=<HOST/OSD/etc>
        */
        Object.keys(paramsObject).forEach(function (value) {
            var joinedStr = "";
            if (paramsObject[value] instanceof Array) {
                var queryArray = paramsObject[value].map(function (status) {
                    return value + '=' + status;
                });
                joinedStr = queryArray.join('&');
            }
            else {
                joinedStr = value + "=" + paramsObject[value];
            }
            if (_this.searchQuery !== '') {
                _this.searchQuery += "&";
            }
            _this.searchQuery += joinedStr;
        });
    };
    HostListController.prototype.clearSearchQuery = function (key, itemIndex) {
        if (itemIndex === null) {
            delete this.paramsObject[key];
        }
        else {
            this.paramsObject[key].splice(itemIndex, 1);
        }
        this.updateSearchQuery(this.paramsObject);
        this.reloadData();
    };
    HostListController.prototype.reloadData = function () {
        if (this.clusterId === undefined) {
            if (this.searchQuery === '') {
                this.serverService.getList().then(this.updateHost);
            }
            else {
                this.serverService.getFilteredList(this.searchQuery).then(this.updateHost);
            }
        }
        else {
            if (this.searchQuery === '') {
                this.serverService.getListByCluster(this.clusterId).then(this.updateHost);
            }
            else {
                this.serverService.getFilteredListByCluster(this.clusterId, this.searchQuery).then(this.updateHost);
            }
        }
    };
    HostListController.prototype.getClusterTypeTitle = function (type) {
        return this.clusterHelper.getClusterType(type).type;
    };
    HostListController.prototype.getNodeTypeTitle = function (node) {
        if (node.roles.length === 0)
            return 'Unassigned';
        else if (node.roles[0] === "OSD")
            return 'OSD Host';
        else if (node.roles[0] === "MON")
            return 'Monitor';
    };
    HostListController.prototype.getHostDonutColor = function (donut_value) {
        if (donut_value >= 90)
            return '#CC0000';
        if (donut_value >= 80)
            return '#EC7A08';
        else
            return '#3F9C35';
    };
    HostListController.prototype.removeHost = function (host) {
        var _this = this;
        var modal = ModalHelpers.RemoveConfirmation(this.$modal, {});
        modal.$scope.$hide = _.wrap(modal.$scope.$hide, function ($hide, confirmed) {
            if (confirmed) {
                _this.serverService.delete(host.hostname);
            }
            $hide();
        });
    };
    HostListController.prototype.reinitialize = function (host) {
        this.serverService.reinitialize(host.hostname);
    };
    HostListController.prototype.createNewCluster = function () {
        this.$location.path('/clusters/new');
    };
    HostListController.$inject = [
        '$scope',
        '$interval',
        '$location',
        '$log',
        '$modal',
        '$timeout',
        'ClusterService',
        'ServerService',
        'UtilService',
        'RequestService'
    ];
    return HostListController;
})();
exports.HostListController = HostListController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaG9zdHMvaG9zdC50cyJdLCJuYW1lcyI6WyJIb3N0TGlzdENvbnRyb2xsZXIiLCJIb3N0TGlzdENvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJIb3N0TGlzdENvbnRyb2xsZXIuaXNBcnJheSIsIkhvc3RMaXN0Q29udHJvbGxlci51cGRhdGVTZWFyY2hRdWVyeSIsIkhvc3RMaXN0Q29udHJvbGxlci5jbGVhclNlYXJjaFF1ZXJ5IiwiSG9zdExpc3RDb250cm9sbGVyLnJlbG9hZERhdGEiLCJIb3N0TGlzdENvbnRyb2xsZXIuZ2V0Q2x1c3RlclR5cGVUaXRsZSIsIkhvc3RMaXN0Q29udHJvbGxlci5nZXROb2RlVHlwZVRpdGxlIiwiSG9zdExpc3RDb250cm9sbGVyLmdldEhvc3REb251dENvbG9yIiwiSG9zdExpc3RDb250cm9sbGVyLnJlbW92ZUhvc3QiLCJIb3N0TGlzdENvbnRyb2xsZXIucmVpbml0aWFsaXplIiwiSG9zdExpc3RDb250cm9sbGVyLmNyZWF0ZU5ld0NsdXN0ZXIiXSwibWFwcGluZ3MiOiJBQUNBLGdDQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBSzFELElBQVksWUFBWSxXQUFNLHdCQUF3QixDQUFDLENBQUE7QUFFdkQ7SUFzQklBLDRCQUNZQSxNQUFpQkEsRUFDakJBLFNBQThCQSxFQUM5QkEsU0FBOEJBLEVBQzlCQSxJQUFvQkEsRUFDcEJBLE1BQVdBLEVBQ1hBLFFBQTRCQSxFQUM1QkEsVUFBMEJBLEVBQzFCQSxhQUE0QkEsRUFDNUJBLFdBQXdCQSxFQUN4QkEsY0FBOEJBO1FBaEM5Q0MsaUJBbUxDQTtRQTVKZUEsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7UUFDakJBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXFCQTtRQUM5QkEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1FBQzlCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7UUFDcEJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQUtBO1FBQ1hBLGFBQVFBLEdBQVJBLFFBQVFB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QSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUMvRUEsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFBQUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDSEEsRUFBRUEsQ0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBQzlFQSxDQUFDQTtZQUFBQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDSEEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUN4R0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFzQ01MLGdEQUFtQkEsR0FBMUJBLFVBQTJCQSxJQUFJQTtRQUMzQk0sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7SUFDeERBLENBQUNBO0lBRU1OLDZDQUFnQkEsR0FBdkJBLFVBQXdCQSxJQUFJQTtRQUN4Qk8sRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBO1FBQ3hCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQTtZQUM1QkEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLEtBQUtBLENBQUNBO1lBQzVCQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtJQUN6QkEsQ0FBQ0E7SUFFTVAsOENBQWlCQSxHQUF4QkEsVUFBeUJBLFdBQVdBO1FBQ2hDUSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUN4Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7UUFDeENBLElBQUlBO1lBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBO0lBQzFCQSxDQUFDQTtJQUVNUix1Q0FBVUEsR0FBakJBLFVBQWtCQSxJQUFJQTtRQUF0QlMsaUJBU0NBO1FBUkdBLElBQUlBLEtBQUtBLEdBQUdBLFlBQVlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFDeERBLENBQUNBLENBQUNBO1FBQ0hBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLFVBQUNBLEtBQUtBLEVBQUVBLFNBQWtCQTtZQUN0RUEsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEtBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQzdDQSxDQUFDQTtZQUNEQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUNaQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNQQSxDQUFDQTtJQUVNVCx5Q0FBWUEsR0FBbkJBLFVBQW9CQSxJQUFJQTtRQUNwQlUsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDbkRBLENBQUNBO0lBRU1WLDZDQUFnQkEsR0FBdkJBO1FBQ0lXLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO0lBQ3pDQSxDQUFDQTtJQTFLTVgsMEJBQU9BLEdBQWtCQTtRQUM1QkEsUUFBUUE7UUFDUkEsV0FBV0E7UUFDWEEsV0FBV0E7UUFDWEEsTUFBTUE7UUFDTkEsUUFBUUE7UUFDUkEsVUFBVUE7UUFDVkEsZ0JBQWdCQTtRQUNoQkEsZUFBZUE7UUFDZkEsYUFBYUE7UUFDYkEsZ0JBQWdCQTtLQUNuQkEsQ0FBQ0E7SUFnS05BLHlCQUFDQTtBQUFEQSxDQW5MQSxBQW1MQ0EsSUFBQTtBQW5MWSwwQkFBa0IscUJBbUw5QixDQUFBIiwiZmlsZSI6Im1vZHVsZXMvaG9zdHMvaG9zdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtDbHVzdGVySGVscGVyfSBmcm9tICcuLi9jbHVzdGVycy9jbHVzdGVyLWhlbHBlcnMnO1xuaW1wb3J0IHtDbHVzdGVyU2VydmljZX0gZnJvbSAnLi4vcmVzdC9jbHVzdGVycyc7XG5pbXBvcnQge1NlcnZlclNlcnZpY2V9IGZyb20gJy4uL3Jlc3Qvc2VydmVyJztcbmltcG9ydCB7VXRpbFNlcnZpY2V9IGZyb20gJy4uL3Jlc3QvdXRpbCc7XG5pbXBvcnQge1JlcXVlc3RTZXJ2aWNlfSBmcm9tICcuLi9yZXN0L3JlcXVlc3QnO1xuaW1wb3J0ICogYXMgTW9kYWxIZWxwZXJzIGZyb20gJy4uL21vZGFsL21vZGFsLWhlbHBlcnMnO1xuXG5leHBvcnQgY2xhc3MgSG9zdExpc3RDb250cm9sbGVyIHtcbiAgICBwcml2YXRlIGNsdXN0ZXJJZDogYW55O1xuICAgIHB1YmxpYyBsaXN0OiBBcnJheTxhbnk+O1xuICAgIHByaXZhdGUgY2x1c3RlcnM6IHt9O1xuICAgIHByaXZhdGUgaG9zdFN0YXRzOiB7fTtcbiAgICBwcml2YXRlIGNsdXN0ZXJIZWxwZXI6IENsdXN0ZXJIZWxwZXI7XG4gICAgcHJpdmF0ZSBzZWFyY2hRdWVyeTogc3RyaW5nO1xuICAgIHByaXZhdGUgcGFyYW1zT2JqZWN0OiBhbnk7XG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbXG4gICAgICAgICckc2NvcGUnLFxuICAgICAgICAnJGludGVydmFsJyxcbiAgICAgICAgJyRsb2NhdGlvbicsXG4gICAgICAgICckbG9nJyxcbiAgICAgICAgJyRtb2RhbCcsXG4gICAgICAgICckdGltZW91dCcsXG4gICAgICAgICdDbHVzdGVyU2VydmljZScsXG4gICAgICAgICdTZXJ2ZXJTZXJ2aWNlJyxcbiAgICAgICAgJ1V0aWxTZXJ2aWNlJyxcbiAgICAgICAgJ1JlcXVlc3RTZXJ2aWNlJ1xuICAgIF07XG4gICAgcHJpdmF0ZSB0aW1lcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxuICAgICAgICBwcml2YXRlICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSAkbG9jYXRpb246IG5nLklMb2NhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgJGxvZzogbmcuSUxvZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgJG1vZGFsOiBhbnksXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IG5nLklUaW1lb3V0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjbHVzdGVyU3ZjOiBDbHVzdGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzZXJ2ZXJTZXJ2aWNlOiBTZXJ2ZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHV0aWxTZXJ2aWNlOiBVdGlsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZXF1ZXN0U2VydmljZTogUmVxdWVzdFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5wYXJhbXNPYmplY3QgPSAkbG9jYXRpb24uc2VhcmNoKCk7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnBhcmFtc09iamVjdCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYoXCJ0YWJcIiBpbiB0aGlzLnBhcmFtc09iamVjdCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnBhcmFtc09iamVjdC50YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlYXJjaFF1ZXJ5KHRoaXMucGFyYW1zT2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsdXN0ZXJIZWxwZXIgPSBuZXcgQ2x1c3RlckhlbHBlcih1dGlsU2VydmljZSwgcmVxdWVzdFNlcnZpY2UsICRsb2csICR0aW1lb3V0KTtcbiAgICAgICAgdGhpcy5jbHVzdGVycyA9IHt9O1xuICAgICAgICB0aGlzLmhvc3RTdGF0cyA9IHt9O1xuICAgICAgICB0aGlzLnRpbWVyID0gdGhpcy4kaW50ZXJ2YWwoKCkgPT4gdGhpcy5yZWxvYWREYXRhKCksIDYwMDAwKTtcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGludGVydmFsLmNhbmNlbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVsb2FkRGF0YSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FycmF5KGRhdGEpOiBCb29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBBcnJheTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlU2VhcmNoUXVlcnkocGFyYW1zT2JqZWN0OiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9ICcnO1xuICAgICAgICAvKiAgcGFyYW1zT2JqZWN0IGNhbiBoYXZlIDMgY2FzZSA6IC1cbiAgICAgICAgICAgICAgICAxKSB7IHN0YXR1czogW2Vycm9yLHdhcm5pbmddICwgdGFiOiA8T1NELEhPU1QsZXRjPiB9XG4gICAgICAgICAgICAgICAgMikgeyB0YWI6IDxPU0QsSE9TVCxldGM+IH1cbiAgICAgICAgICAgICAgICAzKSB7IHN0YXR1czogW2Vycm9yLHdhcm5pbmddIH1cbiAgICAgICAgICAgIGFuZCBzZWFyY2hRdWVyeSB3aWxsIGJlIGxpa2UgdGhpcyA6IC1cbiAgICAgICAgICAgIC9hcGkvPHZlcj4vY2x1c3RlcnM/c3RhdHVzPW9rJnN0YXR1cz13YXJuaW5nJnRhYj08SE9TVC9PU0QvZXRjPlxuICAgICAgICAqL1xuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXNPYmplY3QpLmZvckVhY2goKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBqb2luZWRTdHIgPSBcIlwiO1xuICAgICAgICAgICAgaWYocGFyYW1zT2JqZWN0W3ZhbHVlXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5QXJyYXkgPSBwYXJhbXNPYmplY3RbdmFsdWVdLm1hcChmdW5jdGlvbihzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSArICc9JyArIHN0YXR1cztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGpvaW5lZFN0ciA9IHF1ZXJ5QXJyYXkuam9pbignJicpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGpvaW5lZFN0ciA9IHZhbHVlICsgXCI9XCIgKyBwYXJhbXNPYmplY3RbdmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCB0aGlzLnNlYXJjaFF1ZXJ5ICE9PSAnJyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ICs9IFwiJlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ICs9IGpvaW5lZFN0cjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyU2VhcmNoUXVlcnkoa2V5LCBpdGVtSW5kZXgpIHtcbiAgICAgICAgaWYoaXRlbUluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5wYXJhbXNPYmplY3Rba2V5XTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXNPYmplY3Rba2V5XS5zcGxpY2UoaXRlbUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVNlYXJjaFF1ZXJ5KHRoaXMucGFyYW1zT2JqZWN0KTtcbiAgICAgICAgdGhpcy5yZWxvYWREYXRhKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbG9hZERhdGEoKSB7XG4gICAgICAgIGlmKHRoaXMuY2x1c3RlcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VhcmNoUXVlcnkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJTZXJ2aWNlLmdldExpc3QoKS50aGVuKHRoaXMudXBkYXRlSG9zdCk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJTZXJ2aWNlLmdldEZpbHRlcmVkTGlzdCh0aGlzLnNlYXJjaFF1ZXJ5KS50aGVuKHRoaXMudXBkYXRlSG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VhcmNoUXVlcnkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJTZXJ2aWNlLmdldExpc3RCeUNsdXN0ZXIodGhpcy5jbHVzdGVySWQpLnRoZW4odGhpcy51cGRhdGVIb3N0KTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlclNlcnZpY2UuZ2V0RmlsdGVyZWRMaXN0QnlDbHVzdGVyKHRoaXMuY2x1c3RlcklkLCB0aGlzLnNlYXJjaFF1ZXJ5KS50aGVuKHRoaXMudXBkYXRlSG9zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVIb3N0ID0gKGhvc3RzKSA9PiB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgXy5lYWNoKGhvc3RzLCBmdW5jdGlvbihob3N0OiBhbnkpIHtcbiAgICAgICAgICAgIGhvc3QuYWxlcnRzID0gMDtcbiAgICAgICAgICAgIGlmIChzZWxmLmhvc3RTdGF0c1tob3N0Lm5vZGVpZF0pIHtcbiAgICAgICAgICAgICAgICBob3N0LmNwdV9hdmVyYWdlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzApO1xuICAgICAgICAgICAgICAgIGhvc3QubWVtb3J5X2F2ZXJhZ2UgPSBzZWxmLmhvc3RTdGF0c1tob3N0Lm5vZGVpZF0ubWVtQXZnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaG9zdC5jcHVfYXZlcmFnZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDcwKTtcbiAgICAgICAgICAgICAgICBob3N0Lm1lbW9yeV9hdmVyYWdlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNzApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhvc3QuY2x1c3RlcmlkICE9IG51bGwgJiYgaG9zdC5jbHVzdGVyaWQgIT09ICcwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLmNsdXN0ZXJzW2hvc3QuY2x1c3RlcmlkXSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsdXN0ZXJTdmMuZ2V0KGhvc3QuY2x1c3RlcmlkKS50aGVuKGZ1bmN0aW9uKGNsdXN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvc3QuY2x1c3Rlcl90eXBlID0gY2x1c3Rlci50eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaG9zdC5jbHVzdGVyX25hbWUgPSBjbHVzdGVyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsdXN0ZXJzW2hvc3QuY2x1c3RlcmlkXSA9IHsgbmFtZTogY2x1c3Rlci5uYW1lLCB0eXBlOiBjbHVzdGVyLnR5cGUgfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBob3N0LmNsdXN0ZXJfdHlwZSA9IHNlbGYuY2x1c3RlcnNbaG9zdC5jbHVzdGVyaWRdLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGhvc3QuY2x1c3Rlcl9uYW1lID0gc2VsZi5jbHVzdGVyc1tob3N0LmNsdXN0ZXJpZF0ubmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3N0LmNsdXN0ZXJfdHlwZSA9IFwiRnJlZVwiO1xuICAgICAgICAgICAgICAgIGhvc3QuY2x1c3Rlcl9uYW1lID0gXCJVbmFzc2lnbmVkXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnNlcnZlclNlcnZpY2UuZ2V0SG9zdE1lbW9yeVV0aWxpemF0aW9uKGhvc3Qubm9kZWlkLCcnKS50aGVuKChtZW1vcnlfdXRpbGl6YXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLmhvc3RTdGF0c1tob3N0Lm5vZGVpZF0gPSB7IG1lbUF2ZzogaG9zdC51dGlsaXphdGlvbnMubWVtb3J5dXNhZ2UucGVyY2VudHVzZWQgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5saXN0ID0gaG9zdHM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENsdXN0ZXJUeXBlVGl0bGUodHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbHVzdGVySGVscGVyLmdldENsdXN0ZXJUeXBlKHR5cGUpLnR5cGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE5vZGVUeXBlVGl0bGUobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5yb2xlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gJ1VuYXNzaWduZWQnO1xuICAgICAgICBlbHNlIGlmKG5vZGUucm9sZXNbMF0gPT09IFwiT1NEXCIpXG4gICAgICAgICAgICByZXR1cm4gJ09TRCBIb3N0JztcbiAgICAgICAgZWxzZSBpZihub2RlLnJvbGVzWzBdID09PSBcIk1PTlwiKVxuICAgICAgICAgICAgcmV0dXJuICdNb25pdG9yJztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SG9zdERvbnV0Q29sb3IoZG9udXRfdmFsdWUpIHtcbiAgICAgICAgaWYgKGRvbnV0X3ZhbHVlID49IDkwKSByZXR1cm4gJyNDQzAwMDAnO1xuICAgICAgICBpZiAoZG9udXRfdmFsdWUgPj0gODApIHJldHVybiAnI0VDN0EwOCc7XG4gICAgICAgIGVsc2UgcmV0dXJuICcjM0Y5QzM1JztcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlSG9zdChob3N0KTogdm9pZCB7XG4gICAgICAgIHZhciBtb2RhbCA9IE1vZGFsSGVscGVycy5SZW1vdmVDb25maXJtYXRpb24odGhpcy4kbW9kYWwsIHtcbiAgICAgICAgfSk7XG4gICAgICAgIG1vZGFsLiRzY29wZS4kaGlkZSA9IF8ud3JhcChtb2RhbC4kc2NvcGUuJGhpZGUsICgkaGlkZSwgY29uZmlybWVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICBpZihjb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlclNlcnZpY2UuZGVsZXRlKGhvc3QuaG9zdG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlaW5pdGlhbGl6ZShob3N0KTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VydmVyU2VydmljZS5yZWluaXRpYWxpemUoaG9zdC5ob3N0bmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5ld0NsdXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9jbHVzdGVycy9uZXcnKTtcbiAgICB9XG59Il19