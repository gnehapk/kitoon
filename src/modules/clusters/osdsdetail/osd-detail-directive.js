/// <reference path="../../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name cluster:osdDetail
 * @scope
 * @restrict E
 *
 * @description
 * An AngularJS directive for showing the details of osds in cluster.
 *
 * @example
 * for Cluster's osd detail
 * <osd-detail entity-id="clusterid" entity-type="Cluster"></osd-detail>
 *
 * for Host's osd detail
 * <osd-detail entity-id="hostid" entity-type="Host"></osd-detail>
 *
*/
var osd_detail_1 = require('./osd-detail');
var OsdDetail = (function () {
    function OsdDetail() {
        this.restrict = "E";
        this.scope = {
            id: '=entityId',
            type: '@entityType'
        };
        this.controllerAs = 'osddetail';
        this.bindToController = true;
        this.controller = osd_detail_1.OsdDetailController;
        this.templateUrl = 'views/clusters/osdsdetail/osd-detail.html';
    }
    return OsdDetail;
})();
exports.OsdDetail = OsdDetail;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2x1c3RlcnMvb3Nkc2RldGFpbC9vc2QtZGV0YWlsLWRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6WyJPc2REZXRhaWwiLCJPc2REZXRhaWwuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztFQWdCRTtBQUVGLDJCQUFrQyxjQUFjLENBQUMsQ0FBQTtBQUVqRDtJQUFBQTtRQUNJQyxhQUFRQSxHQUFXQSxHQUFHQSxDQUFDQTtRQUN2QkEsVUFBS0EsR0FBR0E7WUFDSkEsRUFBRUEsRUFBRUEsV0FBV0E7WUFDZkEsSUFBSUEsRUFBRUEsYUFBYUE7U0FDdEJBLENBQUNBO1FBQ0ZBLGlCQUFZQSxHQUFXQSxXQUFXQSxDQUFDQTtRQUNuQ0EscUJBQWdCQSxHQUFZQSxJQUFJQSxDQUFDQTtRQUNqQ0EsZUFBVUEsR0FBR0EsZ0NBQW1CQSxDQUFDQTtRQUNqQ0EsZ0JBQVdBLEdBQUdBLDJDQUEyQ0EsQ0FBQ0E7SUFDOURBLENBQUNBO0lBQURELGdCQUFDQTtBQUFEQSxDQVZBLEFBVUNBLElBQUE7QUFWWSxpQkFBUyxZQVVyQixDQUFBIiwiZmlsZSI6Im1vZHVsZXMvY2x1c3RlcnMvb3Nkc2RldGFpbC9vc2QtZGV0YWlsLWRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuLypcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGNsdXN0ZXI6b3NkRGV0YWlsXG4gKiBAc2NvcGVcbiAqIEByZXN0cmljdCBFXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBBbmd1bGFySlMgZGlyZWN0aXZlIGZvciBzaG93aW5nIHRoZSBkZXRhaWxzIG9mIG9zZHMgaW4gY2x1c3Rlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogZm9yIENsdXN0ZXIncyBvc2QgZGV0YWlsXG4gKiA8b3NkLWRldGFpbCBlbnRpdHktaWQ9XCJjbHVzdGVyaWRcIiBlbnRpdHktdHlwZT1cIkNsdXN0ZXJcIj48L29zZC1kZXRhaWw+XG4gKlxuICogZm9yIEhvc3QncyBvc2QgZGV0YWlsXG4gKiA8b3NkLWRldGFpbCBlbnRpdHktaWQ9XCJob3N0aWRcIiBlbnRpdHktdHlwZT1cIkhvc3RcIj48L29zZC1kZXRhaWw+XG4gKlxuKi9cblxuaW1wb3J0IHtPc2REZXRhaWxDb250cm9sbGVyfSBmcm9tICcuL29zZC1kZXRhaWwnO1xuXG5leHBvcnQgY2xhc3MgT3NkRGV0YWlsIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9IFwiRVwiO1xuICAgIHNjb3BlID0ge1xuICAgICAgICBpZDogJz1lbnRpdHlJZCcsXG4gICAgICAgIHR5cGU6ICdAZW50aXR5VHlwZSdcbiAgICB9O1xuICAgIGNvbnRyb2xsZXJBczogc3RyaW5nID0gJ29zZGRldGFpbCc7XG4gICAgYmluZFRvQ29udHJvbGxlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgY29udHJvbGxlciA9IE9zZERldGFpbENvbnRyb2xsZXI7XG4gICAgdGVtcGxhdGVVcmwgPSAndmlld3MvY2x1c3RlcnMvb3Nkc2RldGFpbC9vc2QtZGV0YWlsLmh0bWwnO1xufVxuIl19
