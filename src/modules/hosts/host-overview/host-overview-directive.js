/// <reference path="../../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name host:host-overview
 * @scope
 * @restrict E
 *
 * @description
 * An AngularJS directive for showing the overview of host.
 *
 * @example
 * <host-overview host-id="hostdetail.id"></host-overview>
 *
*/
var host_overview_1 = require('./host-overview');
var HostOverview = (function () {
    function HostOverview() {
        this.restrict = "E";
        this.scope = {
            id: '=hostId'
        };
        this.controllerAs = 'hostoverview';
        this.bindToController = true;
        this.controller = host_overview_1.HostOverviewController;
        this.templateUrl = 'views/hosts/host-overview/host-overview.html';
    }
    return HostOverview;
})();
exports.HostOverview = HostOverview;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaG9zdHMvaG9zdC1vdmVydmlldy9ob3N0LW92ZXJ2aWV3LWRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6WyJIb3N0T3ZlcnZpZXciLCJIb3N0T3ZlcnZpZXcuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7O0VBWUU7QUFFRiw4QkFBcUMsaUJBQWlCLENBQUMsQ0FBQTtBQUV2RDtJQUFBQTtRQUNJQyxhQUFRQSxHQUFXQSxHQUFHQSxDQUFDQTtRQUN2QkEsVUFBS0EsR0FBR0E7WUFDSkEsRUFBRUEsRUFBRUEsU0FBU0E7U0FDaEJBLENBQUNBO1FBQ0ZBLGlCQUFZQSxHQUFXQSxjQUFjQSxDQUFDQTtRQUN0Q0EscUJBQWdCQSxHQUFZQSxJQUFJQSxDQUFDQTtRQUNqQ0EsZUFBVUEsR0FBR0Esc0NBQXNCQSxDQUFDQTtRQUNwQ0EsZ0JBQVdBLEdBQUdBLDhDQUE4Q0EsQ0FBQ0E7SUFDakVBLENBQUNBO0lBQURELG1CQUFDQTtBQUFEQSxDQVRBLEFBU0NBLElBQUE7QUFUWSxvQkFBWSxlQVN4QixDQUFBIiwiZmlsZSI6Im1vZHVsZXMvaG9zdHMvaG9zdC1vdmVydmlldy9ob3N0LW92ZXJ2aWV3LWRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuLypcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGhvc3Q6aG9zdC1vdmVydmlld1xuICogQHNjb3BlXG4gKiBAcmVzdHJpY3QgRVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gQW5ndWxhckpTIGRpcmVjdGl2ZSBmb3Igc2hvd2luZyB0aGUgb3ZlcnZpZXcgb2YgaG9zdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGhvc3Qtb3ZlcnZpZXcgaG9zdC1pZD1cImhvc3RkZXRhaWwuaWRcIj48L2hvc3Qtb3ZlcnZpZXc+XG4gKlxuKi9cblxuaW1wb3J0IHtIb3N0T3ZlcnZpZXdDb250cm9sbGVyfSBmcm9tICcuL2hvc3Qtb3ZlcnZpZXcnO1xuXG5leHBvcnQgY2xhc3MgSG9zdE92ZXJ2aWV3IGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9IFwiRVwiO1xuICAgIHNjb3BlID0ge1xuICAgICAgICBpZDogJz1ob3N0SWQnXG4gICAgfTtcbiAgICBjb250cm9sbGVyQXM6IHN0cmluZyA9ICdob3N0b3ZlcnZpZXcnO1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbnRyb2xsZXIgPSBIb3N0T3ZlcnZpZXdDb250cm9sbGVyO1xuICAgIHRlbXBsYXRlVXJsID0gJ3ZpZXdzL2hvc3RzL2hvc3Qtb3ZlcnZpZXcvaG9zdC1vdmVydmlldy5odG1sJztcbn1cbiJdfQ==
