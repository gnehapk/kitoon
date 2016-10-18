/// <reference path="../../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name cluster:HostListDirective
 * @scope
 * @restrict E
 *
 * @description
 * An AngularJS directive for showing the list of hosts in cluster.
 *
 * @example
 * <host-list cluster-id="clusterid"></host-list>
 *
*/
var host_1 = require('../../hosts/host');
var HostList = (function () {
    function HostList() {
        this.restrict = "E";
        this.scope = {
            clusterId: '=clusterId'
        };
        this.controllerAs = 'hosts';
        this.bindToController = true;
        this.controller = host_1.HostListController;
        this.templateUrl = 'views/hosts/host-list.html';
    }
    return HostList;
})();
exports.HostList = HostList;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2x1c3RlcnMvaG9zdGRldGFpbC9ob3N0LWxpc3QtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbIkhvc3RMaXN0IiwiSG9zdExpc3QuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7O0VBWUU7QUFFRixxQkFBaUMsa0JBQWtCLENBQUMsQ0FBQTtBQUVwRDtJQUFBQTtRQUNJQyxhQUFRQSxHQUFXQSxHQUFHQSxDQUFDQTtRQUN2QkEsVUFBS0EsR0FBR0E7WUFDSkEsU0FBU0EsRUFBRUEsWUFBWUE7U0FDMUJBLENBQUNBO1FBQ0ZBLGlCQUFZQSxHQUFXQSxPQUFPQSxDQUFDQTtRQUMvQkEscUJBQWdCQSxHQUFZQSxJQUFJQSxDQUFDQTtRQUNqQ0EsZUFBVUEsR0FBR0EseUJBQWtCQSxDQUFDQTtRQUNoQ0EsZ0JBQVdBLEdBQUdBLDRCQUE0QkEsQ0FBQ0E7SUFDL0NBLENBQUNBO0lBQURELGVBQUNBO0FBQURBLENBVEEsQUFTQ0EsSUFBQTtBQVRZLGdCQUFRLFdBU3BCLENBQUEiLCJmaWxlIjoibW9kdWxlcy9jbHVzdGVycy9ob3N0ZGV0YWlsL2hvc3QtbGlzdC1kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5cbi8qXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBjbHVzdGVyOkhvc3RMaXN0RGlyZWN0aXZlXG4gKiBAc2NvcGVcbiAqIEByZXN0cmljdCBFXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBBbmd1bGFySlMgZGlyZWN0aXZlIGZvciBzaG93aW5nIHRoZSBsaXN0IG9mIGhvc3RzIGluIGNsdXN0ZXIuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxob3N0LWxpc3QgY2x1c3Rlci1pZD1cImNsdXN0ZXJpZFwiPjwvaG9zdC1saXN0PlxuICpcbiovXG5cbmltcG9ydCB7SG9zdExpc3RDb250cm9sbGVyfSBmcm9tICcuLi8uLi9ob3N0cy9ob3N0JztcblxuZXhwb3J0IGNsYXNzIEhvc3RMaXN0IGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9IFwiRVwiO1xuICAgIHNjb3BlID0ge1xuICAgICAgICBjbHVzdGVySWQ6ICc9Y2x1c3RlcklkJ1xuICAgIH07XG4gICAgY29udHJvbGxlckFzOiBzdHJpbmcgPSAnaG9zdHMnO1xuICAgIGJpbmRUb0NvbnRyb2xsZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGNvbnRyb2xsZXIgPSBIb3N0TGlzdENvbnRyb2xsZXI7XG4gICAgdGVtcGxhdGVVcmwgPSAndmlld3MvaG9zdHMvaG9zdC1saXN0Lmh0bWwnO1xufVxuIl19
