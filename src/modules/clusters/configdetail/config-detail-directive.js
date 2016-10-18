/// <reference path="../../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name cluster:clusterConfigDetail
 * @scope
 * @restrict E
 *
 * @description
 * An AngularJS directive for showing the configuration of cluster.
 *
 * @example
 * <cluster-config-detail id="{{clusterid}}"></cluster-config-detail>
 *
*/
var config_detail_1 = require('./config-detail');
var ClusterConfigDetail = (function () {
    function ClusterConfigDetail() {
        this.restrict = "E";
        this.scope = {
            id: '@'
        };
        this.controllerAs = 'configdetail';
        this.bindToController = true;
        this.controller = config_detail_1.ConfigDetailController;
        this.templateUrl = 'views/clusters/configdetail/config-detail.html';
    }
    return ClusterConfigDetail;
})();
exports.ClusterConfigDetail = ClusterConfigDetail;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2x1c3RlcnMvY29uZmlnZGV0YWlsL2NvbmZpZy1kZXRhaWwtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbIkNsdXN0ZXJDb25maWdEZXRhaWwiLCJDbHVzdGVyQ29uZmlnRGV0YWlsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7OztFQVlFO0FBRUYsOEJBQXFDLGlCQUFpQixDQUFDLENBQUE7QUFFdkQ7SUFBQUE7UUFDSUMsYUFBUUEsR0FBV0EsR0FBR0EsQ0FBQ0E7UUFDdkJBLFVBQUtBLEdBQUdBO1lBQ0pBLEVBQUVBLEVBQUVBLEdBQUdBO1NBQ1ZBLENBQUNBO1FBQ0ZBLGlCQUFZQSxHQUFXQSxjQUFjQSxDQUFDQTtRQUN0Q0EscUJBQWdCQSxHQUFZQSxJQUFJQSxDQUFDQTtRQUNqQ0EsZUFBVUEsR0FBR0Esc0NBQXNCQSxDQUFDQTtRQUNwQ0EsZ0JBQVdBLEdBQUdBLGdEQUFnREEsQ0FBQ0E7SUFDbkVBLENBQUNBO0lBQURELDBCQUFDQTtBQUFEQSxDQVRBLEFBU0NBLElBQUE7QUFUWSwyQkFBbUIsc0JBUy9CLENBQUEiLCJmaWxlIjoibW9kdWxlcy9jbHVzdGVycy9jb25maWdkZXRhaWwvY29uZmlnLWRldGFpbC1kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5cbi8qXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBjbHVzdGVyOmNsdXN0ZXJDb25maWdEZXRhaWxcbiAqIEBzY29wZVxuICogQHJlc3RyaWN0IEVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIEFuZ3VsYXJKUyBkaXJlY3RpdmUgZm9yIHNob3dpbmcgdGhlIGNvbmZpZ3VyYXRpb24gb2YgY2x1c3Rlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGNsdXN0ZXItY29uZmlnLWRldGFpbCBpZD1cInt7Y2x1c3RlcmlkfX1cIj48L2NsdXN0ZXItY29uZmlnLWRldGFpbD5cbiAqXG4qL1xuXG5pbXBvcnQge0NvbmZpZ0RldGFpbENvbnRyb2xsZXJ9IGZyb20gJy4vY29uZmlnLWRldGFpbCc7XG5cbmV4cG9ydCBjbGFzcyBDbHVzdGVyQ29uZmlnRGV0YWlsIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9IFwiRVwiO1xuICAgIHNjb3BlID0ge1xuICAgICAgICBpZDogJ0AnXG4gICAgfTtcbiAgICBjb250cm9sbGVyQXM6IHN0cmluZyA9ICdjb25maWdkZXRhaWwnO1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbnRyb2xsZXIgPSBDb25maWdEZXRhaWxDb250cm9sbGVyO1xuICAgIHRlbXBsYXRlVXJsID0gJ3ZpZXdzL2NsdXN0ZXJzL2NvbmZpZ2RldGFpbC9jb25maWctZGV0YWlsLmh0bWwnO1xufVxuIl19
