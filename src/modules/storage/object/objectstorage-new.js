// <reference path="../../../typings/tsd.d.ts" />
var ModalHelpers = require('../../modal/modal-helpers');
var storage_util_1 = require('../storage-util');
var libs_1 = require('../../base/libs');
var ObjectStorageController = (function () {
    function ObjectStorageController($routeParams, $location, $log, $q, $modal, clusterSvc, storageProfileSvc, storageSvc, requestTrackingSvc, requestSvc) {
        var _this = this;
        this.$routeParams = $routeParams;
        this.$location = $location;
        this.$log = $log;
        this.$q = $q;
        this.$modal = $modal;
        this.clusterSvc = clusterSvc;
        this.storageProfileSvc = storageProfileSvc;
        this.storageSvc = storageSvc;
        this.requestTrackingSvc = requestTrackingSvc;
        this.requestSvc = requestSvc;
        this.count = 1;
        this.types = ['Standard'];
        this.type = 'Standard';
        this.replicas = 3;
        this.ecprofiles = [{ k: 2, m: 1, text: '2+1', value: 'default' }, { k: 4, m: 2, text: '4+2', value: 'k4m2' }, { k: 6, m: 3, text: '6+3', value: 'k6m3' }, { k: 8, m: 4, text: '8+4', value: 'k8m4' }];
        this.ecprofile = this.ecprofiles[0];
        this.targetSize = 0;
        this.quota = { enabled: false, objects: { enabled: false, value: undefined }, percentage: { enabled: false, value: 75 } };
        this.pools = [];
        this.summary = false;
        if (this.poolWithRbd !== "true") {
            this.types.push('Erasure Coded');
        }
        var clusterId = $routeParams['clusterid'];
        this.clusterSvc.get(clusterId).then(function (cluster) {
            _this.cluster = cluster;
        });
        this.clusterSvc.getSlus(clusterId).then(function (slus) {
            _this.slus = slus;
            return _this.storageProfileSvc.getList();
        }).then(function (profiles) {
            // Here the storage profiles which doesn't have any OSDs will be ignored
            var profilesWithOSDs = _.groupBy(_this.slus, 'storageprofile');
            _this.profiles = _.filter(profiles, function (profile) { return profilesWithOSDs[profile.name]; });
            _this.profile = _this.profiles[0];
            _this.filterOSDs(_this.profile.name);
        });
    }
    ObjectStorageController.prototype.filterOSDs = function (storageprofile) {
        this.slusFiltered = _.filter(this.slus, function (osd) { return osd.storageprofile === storageprofile; });
        this.targetSize = storage_util_1.GetOptimalSizeForPGNum(this.pgs, this.slusFiltered, this.getReplicaCount());
    };
    // Replica count is required for Placement Groups calculations
    // In case of EC pools, replica would be the sum of k and m
    ObjectStorageController.prototype.getReplicaCount = function () {
        if (this.type === 'Standard') {
            return this.replicas;
        }
        else {
            return this.ecprofile.k + this.ecprofile.m;
        }
    };
    ObjectStorageController.prototype.changeStorageProfile = function (selectedProfile) {
        this.filterOSDs(selectedProfile.name);
    };
    ObjectStorageController.prototype.getQuotaPercentageSize = function (percent) {
        var val = parseInt(percent) || 0;
        return (val / 100) * this.targetSize;
    };
    ObjectStorageController.prototype.getQuotaTotalSize = function () {
        return this.targetSize;
    };
    ObjectStorageController.prototype.prepareSummary = function () {
        var pgNum = this.pgs;
        this.targetSize = storage_util_1.GetOptimalSizeForPGNum(pgNum, this.slusFiltered, this.getReplicaCount());
        if (this.count === 1) {
            var pool = {
                name: this.name,
                type: this.type,
                profile: this.profile,
                replicas: this.replicas,
                ecprofile: this.ecprofile,
                capacity: this.targetSize,
                quota: this.quota
            };
            this.pools.push(angular.copy(pool));
        }
        else {
            for (var index = 1; index <= this.count; index++) {
                var pool = {
                    name: this.name + index,
                    type: this.type,
                    profile: this.profile,
                    replicas: this.replicas,
                    ecprofile: this.ecprofile,
                    capacity: this.targetSize,
                    quota: this.quota
                };
                this.pools.push(angular.copy(pool));
            }
        }
        this.summary = true;
        if (this.poolWithRbd === "true") {
            this.poolName = this.name;
            this.prepareRbdSummary();
        }
    };
    ObjectStorageController.prototype.cancel = function () {
        this.$location.path('/storage');
    };
    ObjectStorageController.prototype.submit = function () {
        var _this = this;
        var list = [];
        for (var _i = 0, _a = this.pools; _i < _a.length; _i++) {
            var pool = _a[_i];
            var storage = {
                name: pool.name,
                profile: pool.profile.name,
                size: libs_1.numeral(pool.capacity).format('0b'),
                options: {}
            };
            if (pool.type === 'Standard') {
                storage['type'] = 'replicated';
                storage['replicas'] = pool.replicas;
            }
            else {
                storage['type'] = 'erasure_coded';
                storage.options['ecprofile'] = pool.ecprofile.value;
            }
            storage.options['pgnum'] = this.pgs.toString();
            if (pool.quota.enabled) {
                storage['quota_enabled'] = true;
                storage['quota_params'] = {};
                if (pool.quota.objects.enabled) {
                    storage['quota_params'].quota_max_objects = pool.quota.objects.value.toString();
                }
                if (pool.quota.percentage.enabled) {
                    storage['quota_params'].quota_max_bytes = Math.round((pool.quota.percentage.value / 100) * pool.capacity).toString();
                }
            }
            if (this.poolWithRbd === "true") {
                var rbdArray = _.map(this.rbdList, function (rbd) { return { name: rbd.name, size: rbd.size.value + rbd.size.unit }; });
                storage['blockdevices'] = rbdArray;
            }
            list.push(this.storageSvc.create(this.cluster.clusterid, storage));
        }
        this.$q.all(list).then(function (tasks) {
            for (var _i = 0; _i < tasks.length; _i++) {
                var task = tasks[_i];
                _this.requestSvc.get(task.data.taskid).then(function (result) {
                    _this.requestTrackingSvc.add(result.id, result.name);
                });
            }
        });
        var modal = ModalHelpers.SuccessfulRequest(this.$modal, {
            title: 'Add Object Storage Request is Submitted',
            container: '.usmClientApp'
        });
        modal.$scope.$hide = _.wrap(modal.$scope.$hide, function ($hide) {
            $hide();
            _this.$location.path('/storage');
        });
    };
    ObjectStorageController.$inject = [
        '$routeParams',
        '$location',
        '$log',
        '$q',
        '$modal',
        'ClusterService',
        'StorageProfileService',
        'StorageService',
        'RequestTrackingService',
        'RequestService'
    ];
    return ObjectStorageController;
})();
exports.ObjectStorageController = ObjectStorageController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc3RvcmFnZS9vYmplY3Qvb2JqZWN0c3RvcmFnZS1uZXcudHMiXSwibmFtZXMiOlsiT2JqZWN0U3RvcmFnZUNvbnRyb2xsZXIiLCJPYmplY3RTdG9yYWdlQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIk9iamVjdFN0b3JhZ2VDb250cm9sbGVyLmZpbHRlck9TRHMiLCJPYmplY3RTdG9yYWdlQ29udHJvbGxlci5nZXRSZXBsaWNhQ291bnQiLCJPYmplY3RTdG9yYWdlQ29udHJvbGxlci5jaGFuZ2VTdG9yYWdlUHJvZmlsZSIsIk9iamVjdFN0b3JhZ2VDb250cm9sbGVyLmdldFF1b3RhUGVyY2VudGFnZVNpemUiLCJPYmplY3RTdG9yYWdlQ29udHJvbGxlci5nZXRRdW90YVRvdGFsU2l6ZSIsIk9iamVjdFN0b3JhZ2VDb250cm9sbGVyLnByZXBhcmVTdW1tYXJ5IiwiT2JqZWN0U3RvcmFnZUNvbnRyb2xsZXIuY2FuY2VsIiwiT2JqZWN0U3RvcmFnZUNvbnRyb2xsZXIuc3VibWl0Il0sIm1hcHBpbmdzIjoiQUFBQSxpREFBaUQ7QUFXakQsSUFBWSxZQUFZLFdBQU0sMkJBQTJCLENBQUMsQ0FBQTtBQUcxRCw2QkFBcUMsaUJBQWlCLENBQUMsQ0FBQTtBQUN2RCxxQkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQW9DSUEsaUNBQW9CQSxZQUEwQ0EsRUFDbERBLFNBQThCQSxFQUM5QkEsSUFBb0JBLEVBQ3BCQSxFQUFnQkEsRUFDaEJBLE1BQU1BLEVBQ05BLFVBQTBCQSxFQUMxQkEsaUJBQXdDQSxFQUN4Q0EsVUFBMEJBLEVBQzFCQSxrQkFBMENBLEVBQzFDQSxVQUEwQkE7UUE3QzFDQyxpQkF1TENBO1FBbkp1QkEsaUJBQVlBLEdBQVpBLFlBQVlBLENBQThCQTtRQUNsREEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1FBQzlCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7UUFDcEJBLE9BQUVBLEdBQUZBLEVBQUVBLENBQWNBO1FBQ2hCQSxX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QSxPQUFPQTtnQkFDckJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBO2dCQUN2QkEsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0E7Z0JBQ3pCQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQTtnQkFDekJBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBO2FBQ3BCQSxDQUFBQTtZQUNEQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN4Q0EsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDSkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsRUFBRUEsS0FBS0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsS0FBS0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQy9DQSxJQUFJQSxJQUFJQSxHQUFHQTtvQkFDUEEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0E7b0JBQ3ZCQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQTtvQkFDZkEsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0E7b0JBQ3JCQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQTtvQkFDdkJBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBO29CQUN6QkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUE7b0JBQ3pCQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQTtpQkFDcEJBLENBQUFBO2dCQUNEQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4Q0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFDREEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDcEJB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QWtCQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDeERBLENBQUNBLENBQUNBLENBQUNBO2FBQ05BO1FBQ0xBLENBQUNBLENBQUNBLENBQUNBO1FBQ0hBLElBQUlBLEtBQUtBLEdBQUdBLFlBQVlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUE7WUFDcERBLEtBQUtBLEVBQUVBLHlDQUF5Q0E7WUFDaERBLFNBQVNBLEVBQUVBLGVBQWVBO1NBQzdCQSxDQUFDQSxDQUFDQTtRQUNIQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxLQUFLQTtZQUNsREEsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDUkEsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDcENBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBOUpNVCwrQkFBT0EsR0FBa0JBO1FBQzVCQSxjQUFjQTtRQUNkQSxXQUFXQTtRQUNYQSxNQUFNQTtRQUNOQSxJQUFJQTtRQUNKQSxRQUFRQTtRQUNSQSxnQkFBZ0JBO1FBQ2hCQSx1QkFBdUJBO1FBQ3ZCQSxnQkFBZ0JBO1FBQ2hCQSx3QkFBd0JBO1FBQ3hCQSxnQkFBZ0JBO0tBQ25CQSxDQUFDQTtJQW9KTkEsOEJBQUNBO0FBQURBLENBdkxBLEFBdUxDQSxJQUFBO0FBdkxZLCtCQUF1QiwwQkF1TG5DLENBQUEiLCJmaWxlIjoibW9kdWxlcy9zdG9yYWdlL29iamVjdC9vYmplY3RzdG9yYWdlLW5ldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5pbXBvcnQge0NsdXN0ZXJ9IGZyb20gJy4uLy4uL3Jlc3QvY2x1c3RlcnMnO1xuaW1wb3J0IHtTdG9yYWdlUHJvZmlsZX0gZnJvbSAnLi4vLi4vcmVzdC9zdG9yYWdlLXByb2ZpbGUnO1xuaW1wb3J0IHtTTFV9IGZyb20gJy4uLy4uL3Jlc3QvY2x1c3RlcnMnO1xuXG5pbXBvcnQge0NsdXN0ZXJTZXJ2aWNlfSBmcm9tICcuLi8uLi9yZXN0L2NsdXN0ZXJzJztcbmltcG9ydCB7U3RvcmFnZVByb2ZpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9yZXN0L3N0b3JhZ2UtcHJvZmlsZSc7XG5pbXBvcnQge1N0b3JhZ2VTZXJ2aWNlfSBmcm9tICcuLi8uLi9yZXN0L3N0b3JhZ2UnO1xuaW1wb3J0IHtSZXF1ZXN0U2VydmljZX0gZnJvbSAnLi4vLi4vcmVzdC9yZXF1ZXN0JztcbmltcG9ydCB7UmVxdWVzdFRyYWNraW5nU2VydmljZX0gZnJvbSAnLi4vLi4vcmVxdWVzdHMvcmVxdWVzdC10cmFja2luZy1zdmMnO1xuaW1wb3J0ICogYXMgTW9kYWxIZWxwZXJzIGZyb20gJy4uLy4uL21vZGFsL21vZGFsLWhlbHBlcnMnO1xuaW1wb3J0IHtHZXRDZXBoUEdzRm9yT1NEfSBmcm9tICcuLi9zdG9yYWdlLXV0aWwnO1xuaW1wb3J0IHtHZXRUd29zUG93TGlzdH0gZnJvbSAnLi4vc3RvcmFnZS11dGlsJztcbmltcG9ydCB7R2V0T3B0aW1hbFNpemVGb3JQR051bX0gZnJvbSAnLi4vc3RvcmFnZS11dGlsJztcbmltcG9ydCB7bnVtZXJhbH0gZnJvbSAnLi4vLi4vYmFzZS9saWJzJztcblxuZXhwb3J0IGNsYXNzIE9iamVjdFN0b3JhZ2VDb250cm9sbGVyIHtcbiAgICBwcml2YXRlIGNsdXN0ZXI6IENsdXN0ZXI7XG4gICAgcHJpdmF0ZSBzbHVzOiBTTFVbXTtcbiAgICBwcml2YXRlIHNsdXNGaWx0ZXJlZDogU0xVW107XG4gICAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjb3VudDogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIHR5cGVzID0gWydTdGFuZGFyZCddO1xuICAgIHByaXZhdGUgdHlwZSA9ICdTdGFuZGFyZCc7XG4gICAgcHJpdmF0ZSByZXBsaWNhczogbnVtYmVyID0gMztcbiAgICBwcml2YXRlIGVjcHJvZmlsZXMgPSBbeyBrOiAyLCBtOiAxLCB0ZXh0OiAnMisxJywgdmFsdWU6ICdkZWZhdWx0JyB9LCB7IGs6IDQsIG06IDIsIHRleHQ6ICc0KzInLCB2YWx1ZTogJ2s0bTInIH0sIHsgazogNiwgbTogMywgdGV4dDogJzYrMycsIHZhbHVlOiAnazZtMycgfSwgeyBrOiA4LCBtOiA0LCB0ZXh0OiAnOCs0JywgdmFsdWU6ICdrOG00JyB9XTtcbiAgICBwcml2YXRlIGVjcHJvZmlsZSA9IHRoaXMuZWNwcm9maWxlc1swXTtcbiAgICBwcml2YXRlIHRhcmdldFNpemUgPSAwO1xuICAgIHByaXZhdGUgcHJvZmlsZXM6IFN0b3JhZ2VQcm9maWxlW107XG4gICAgcHJpdmF0ZSBwcm9maWxlOiBTdG9yYWdlUHJvZmlsZTtcbiAgICBwcml2YXRlIHBnczogbnVtYmVyO1xuICAgIHByaXZhdGUgcXVvdGEgPSB7IGVuYWJsZWQ6IGZhbHNlLCBvYmplY3RzOiB7IGVuYWJsZWQ6IGZhbHNlLCB2YWx1ZTogdW5kZWZpbmVkIH0sIHBlcmNlbnRhZ2U6IHsgZW5hYmxlZDogZmFsc2UsIHZhbHVlOiA3NSB9IH07XG4gICAgcHJpdmF0ZSBwb29scyA9IFtdO1xuICAgIHByaXZhdGUgc3VtbWFyeTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8vdmFyaWFibGVzIHRoYXQgYmluZCBmcm9tIG9iamN0c3RvcmFnZS1uZXctZGlyZWN0aXZlXG4gICAgcHJpdmF0ZSBwcmVwYXJlUmJkU3VtbWFyeTogYW55O1xuICAgIHByaXZhdGUgcG9vbE5hbWU6IHN0cmluZztcbiAgICBwcml2YXRlIHBvb2xXaXRoUmJkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSByYmRMaXN0OiBhbnlbXTtcblxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gW1xuICAgICAgICAnJHJvdXRlUGFyYW1zJyxcbiAgICAgICAgJyRsb2NhdGlvbicsXG4gICAgICAgICckbG9nJyxcbiAgICAgICAgJyRxJyxcbiAgICAgICAgJyRtb2RhbCcsXG4gICAgICAgICdDbHVzdGVyU2VydmljZScsXG4gICAgICAgICdTdG9yYWdlUHJvZmlsZVNlcnZpY2UnLFxuICAgICAgICAnU3RvcmFnZVNlcnZpY2UnLFxuICAgICAgICAnUmVxdWVzdFRyYWNraW5nU2VydmljZScsXG4gICAgICAgICdSZXF1ZXN0U2VydmljZSdcbiAgICBdO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvdXRlUGFyYW1zOiBuZy5yb3V0ZS5JUm91dGVQYXJhbXNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSAkbG9nOiBuZy5JTG9nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSAkcTogbmcuSVFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlICRtb2RhbCxcbiAgICAgICAgcHJpdmF0ZSBjbHVzdGVyU3ZjOiBDbHVzdGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzdG9yYWdlUHJvZmlsZVN2YzogU3RvcmFnZVByb2ZpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHN0b3JhZ2VTdmM6IFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlcXVlc3RUcmFja2luZ1N2YzogUmVxdWVzdFRyYWNraW5nU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZXF1ZXN0U3ZjOiBSZXF1ZXN0U2VydmljZSkge1xuICAgICAgICBpZih0aGlzLnBvb2xXaXRoUmJkICE9PSBcInRydWVcIikge1xuICAgICAgICAgICAgdGhpcy50eXBlcy5wdXNoKCdFcmFzdXJlIENvZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNsdXN0ZXJJZCA9ICRyb3V0ZVBhcmFtc1snY2x1c3RlcmlkJ107XG4gICAgICAgIHRoaXMuY2x1c3RlclN2Yy5nZXQoY2x1c3RlcklkKS50aGVuKGNsdXN0ZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbHVzdGVyID0gY2x1c3RlcjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2x1c3RlclN2Yy5nZXRTbHVzKGNsdXN0ZXJJZCkudGhlbigoc2x1cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbHVzID0gc2x1cztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VQcm9maWxlU3ZjLmdldExpc3QoKTtcbiAgICAgICAgfSkudGhlbigocHJvZmlsZXMpID0+IHtcbiAgICAgICAgICAgIC8vIEhlcmUgdGhlIHN0b3JhZ2UgcHJvZmlsZXMgd2hpY2ggZG9lc24ndCBoYXZlIGFueSBPU0RzIHdpbGwgYmUgaWdub3JlZFxuICAgICAgICAgICAgdmFyIHByb2ZpbGVzV2l0aE9TRHMgPSBfLmdyb3VwQnkodGhpcy5zbHVzLCAnc3RvcmFnZXByb2ZpbGUnKTtcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZXMgPSBfLmZpbHRlcihwcm9maWxlcywgcHJvZmlsZSA9PiBwcm9maWxlc1dpdGhPU0RzW3Byb2ZpbGUubmFtZV0pO1xuICAgICAgICAgICAgdGhpcy5wcm9maWxlID0gdGhpcy5wcm9maWxlc1swXTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyT1NEcyh0aGlzLnByb2ZpbGUubmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaWx0ZXJPU0RzKHN0b3JhZ2Vwcm9maWxlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zbHVzRmlsdGVyZWQgPSBfLmZpbHRlcih0aGlzLnNsdXMsIChvc2Q6IFNMVSkgPT4gb3NkLnN0b3JhZ2Vwcm9maWxlID09PSBzdG9yYWdlcHJvZmlsZSk7XG4gICAgICAgIHRoaXMudGFyZ2V0U2l6ZSA9IEdldE9wdGltYWxTaXplRm9yUEdOdW0odGhpcy5wZ3MsIHRoaXMuc2x1c0ZpbHRlcmVkLCB0aGlzLmdldFJlcGxpY2FDb3VudCgpKTtcbiAgICB9XG4gICAgLy8gUmVwbGljYSBjb3VudCBpcyByZXF1aXJlZCBmb3IgUGxhY2VtZW50IEdyb3VwcyBjYWxjdWxhdGlvbnNcbiAgICAvLyBJbiBjYXNlIG9mIEVDIHBvb2xzLCByZXBsaWNhIHdvdWxkIGJlIHRoZSBzdW0gb2YgayBhbmQgbVxuICAgIHB1YmxpYyBnZXRSZXBsaWNhQ291bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdTdGFuZGFyZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcGxpY2FzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWNwcm9maWxlLmsgKyB0aGlzLmVjcHJvZmlsZS5tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNoYW5nZVN0b3JhZ2VQcm9maWxlKHNlbGVjdGVkUHJvZmlsZTogU3RvcmFnZVByb2ZpbGUpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJPU0RzKHNlbGVjdGVkUHJvZmlsZS5uYW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UXVvdGFQZXJjZW50YWdlU2l6ZShwZXJjZW50OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQocGVyY2VudCkgfHwgMDtcbiAgICAgICAgcmV0dXJuICh2YWwgLyAxMDApICogdGhpcy50YXJnZXRTaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRRdW90YVRvdGFsU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXRTaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVwYXJlU3VtbWFyeSgpOiB2b2lkIHtcbiAgICAgIHZhciBwZ051bSA9IHRoaXMucGdzO1xuICAgICAgICB0aGlzLnRhcmdldFNpemUgPSBHZXRPcHRpbWFsU2l6ZUZvclBHTnVtKHBnTnVtLCB0aGlzLnNsdXNGaWx0ZXJlZCwgdGhpcy5nZXRSZXBsaWNhQ291bnQoKSk7XG4gICAgICAgIGlmICh0aGlzLmNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICBsZXQgcG9vbCA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgICAgICAgIHByb2ZpbGU6IHRoaXMucHJvZmlsZSxcbiAgICAgICAgICAgICAgICByZXBsaWNhczogdGhpcy5yZXBsaWNhcyxcbiAgICAgICAgICAgICAgICBlY3Byb2ZpbGU6IHRoaXMuZWNwcm9maWxlLFxuICAgICAgICAgICAgICAgIGNhcGFjaXR5OiB0aGlzLnRhcmdldFNpemUsXG4gICAgICAgICAgICAgICAgcXVvdGE6IHRoaXMucXVvdGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucG9vbHMucHVzaChhbmd1bGFyLmNvcHkocG9vbCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8PSB0aGlzLmNvdW50OyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvb2wgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSArIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGU6IHRoaXMucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgcmVwbGljYXM6IHRoaXMucmVwbGljYXMsXG4gICAgICAgICAgICAgICAgICAgIGVjcHJvZmlsZTogdGhpcy5lY3Byb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5OiB0aGlzLnRhcmdldFNpemUsXG4gICAgICAgICAgICAgICAgICAgIHF1b3RhOiB0aGlzLnF1b3RhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucG9vbHMucHVzaChhbmd1bGFyLmNvcHkocG9vbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3VtbWFyeSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnBvb2xXaXRoUmJkID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgdGhpcy5wb29sTmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZVJiZFN1bW1hcnkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9zdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN1Ym1pdCgpOiB2b2lkIHtcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcG9vbCBvZiB0aGlzLnBvb2xzKSB7XG4gICAgICAgICAgICBsZXQgc3RvcmFnZSA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwb29sLm5hbWUsXG4gICAgICAgICAgICAgICAgcHJvZmlsZTogcG9vbC5wcm9maWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgc2l6ZTogbnVtZXJhbChwb29sLmNhcGFjaXR5KS5mb3JtYXQoJzBiJyksXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge31cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChwb29sLnR5cGUgPT09ICdTdGFuZGFyZCcpIHtcbiAgICAgICAgICAgICAgICBzdG9yYWdlWyd0eXBlJ10gPSAncmVwbGljYXRlZCc7XG4gICAgICAgICAgICAgICAgc3RvcmFnZVsncmVwbGljYXMnXSA9IHBvb2wucmVwbGljYXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9yYWdlWyd0eXBlJ10gPSAnZXJhc3VyZV9jb2RlZCc7XG4gICAgICAgICAgICAgICAgc3RvcmFnZS5vcHRpb25zWydlY3Byb2ZpbGUnXSA9IHBvb2wuZWNwcm9maWxlLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmFnZS5vcHRpb25zWydwZ251bSddID0gdGhpcy5wZ3MudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmIChwb29sLnF1b3RhLmVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBzdG9yYWdlWydxdW90YV9lbmFibGVkJ10gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0b3JhZ2VbJ3F1b3RhX3BhcmFtcyddID0ge307XG4gICAgICAgICAgICAgICAgaWYgKHBvb2wucXVvdGEub2JqZWN0cy5lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VbJ3F1b3RhX3BhcmFtcyddLnF1b3RhX21heF9vYmplY3RzID0gcG9vbC5xdW90YS5vYmplY3RzLnZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwb29sLnF1b3RhLnBlcmNlbnRhZ2UuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlWydxdW90YV9wYXJhbXMnXS5xdW90YV9tYXhfYnl0ZXMgPSBNYXRoLnJvdW5kKChwb29sLnF1b3RhLnBlcmNlbnRhZ2UudmFsdWUgLyAxMDApICogcG9vbC5jYXBhY2l0eSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wb29sV2l0aFJiZCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgdmFyIHJiZEFycmF5ID0gXy5tYXAodGhpcy5yYmRMaXN0LCAocmJkKSA9PiB7IHJldHVybiB7bmFtZTogcmJkLm5hbWUsIHNpemU6IHJiZC5zaXplLnZhbHVlICsgcmJkLnNpemUudW5pdH19KTtcbiAgICAgICAgICAgICAgICAgc3RvcmFnZVsnYmxvY2tkZXZpY2VzJ10gPSByYmRBcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLnN0b3JhZ2VTdmMuY3JlYXRlKHRoaXMuY2x1c3Rlci5jbHVzdGVyaWQsIHN0b3JhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRxLmFsbChsaXN0KS50aGVuKCh0YXNrcykgPT4ge1xuICAgICAgICAgICAgZm9yICh2YXIgdGFzayBvZiB0YXNrcykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdFN2Yy5nZXQodGFzay5kYXRhLnRhc2tpZCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdFRyYWNraW5nU3ZjLmFkZChyZXN1bHQuaWQsIHJlc3VsdC5uYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBtb2RhbCA9IE1vZGFsSGVscGVycy5TdWNjZXNzZnVsUmVxdWVzdCh0aGlzLiRtb2RhbCwge1xuICAgICAgICAgICAgdGl0bGU6ICdBZGQgT2JqZWN0IFN0b3JhZ2UgUmVxdWVzdCBpcyBTdWJtaXR0ZWQnLFxuICAgICAgICAgICAgY29udGFpbmVyOiAnLnVzbUNsaWVudEFwcCdcbiAgICAgICAgfSk7XG4gICAgICAgIG1vZGFsLiRzY29wZS4kaGlkZSA9IF8ud3JhcChtb2RhbC4kc2NvcGUuJGhpZGUsICgkaGlkZSkgPT4ge1xuICAgICAgICAgICAgJGhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uLnBhdGgoJy9zdG9yYWdlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==