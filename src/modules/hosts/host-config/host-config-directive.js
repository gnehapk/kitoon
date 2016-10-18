/// <reference path="../../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name host:hostConfig
 * @scope
 * @restrict E
 *
 * @description
 * An AngularJS directive for showing the configuration of host.
 *
 * @example
 * <host-config host-id="hostid"></host-config>
 *
*/
var host_config_1 = require('./host-config');
var HostConfig = (function () {
    function HostConfig() {
        this.restrict = "E";
        this.scope = {
            id: '=hostId'
        };
        this.controllerAs = 'hostconfig';
        this.bindToController = true;
        this.controller = host_config_1.HostConfigController;
        this.templateUrl = 'views/hosts/host-config/host-config.html';
    }
    return HostConfig;
})();
exports.HostConfig = HostConfig;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaG9zdHMvaG9zdC1jb25maWcvaG9zdC1jb25maWctZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbIkhvc3RDb25maWciLCJIb3N0Q29uZmlnLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7OztFQVlFO0FBRUYsNEJBQW1DLGVBQWUsQ0FBQyxDQUFBO0FBRW5EO0lBQUFBO1FBQ0lDLGFBQVFBLEdBQVdBLEdBQUdBLENBQUNBO1FBQ3ZCQSxVQUFLQSxHQUFHQTtZQUNKQSxFQUFFQSxFQUFFQSxTQUFTQTtTQUNoQkEsQ0FBQ0E7UUFDRkEsaUJBQVlBLEdBQVdBLFlBQVlBLENBQUNBO1FBQ3BDQSxxQkFBZ0JBLEdBQVlBLElBQUlBLENBQUNBO1FBQ2pDQSxlQUFVQSxHQUFHQSxrQ0FBb0JBLENBQUNBO1FBQ2xDQSxnQkFBV0EsR0FBR0EsMENBQTBDQSxDQUFDQTtJQUM3REEsQ0FBQ0E7SUFBREQsaUJBQUNBO0FBQURBLENBVEEsQUFTQ0EsSUFBQTtBQVRZLGtCQUFVLGFBU3RCLENBQUEiLCJmaWxlIjoibW9kdWxlcy9ob3N0cy9ob3N0LWNvbmZpZy9ob3N0LWNvbmZpZy1kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5cbi8qXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBob3N0Omhvc3RDb25maWdcbiAqIEBzY29wZVxuICogQHJlc3RyaWN0IEVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIEFuZ3VsYXJKUyBkaXJlY3RpdmUgZm9yIHNob3dpbmcgdGhlIGNvbmZpZ3VyYXRpb24gb2YgaG9zdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGhvc3QtY29uZmlnIGhvc3QtaWQ9XCJob3N0aWRcIj48L2hvc3QtY29uZmlnPlxuICpcbiovXG5cbmltcG9ydCB7SG9zdENvbmZpZ0NvbnRyb2xsZXJ9IGZyb20gJy4vaG9zdC1jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgSG9zdENvbmZpZyBpbXBsZW1lbnRzIG5nLklEaXJlY3RpdmUge1xuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSBcIkVcIjtcbiAgICBzY29wZSA9IHtcbiAgICAgICAgaWQ6ICc9aG9zdElkJ1xuICAgIH07XG4gICAgY29udHJvbGxlckFzOiBzdHJpbmcgPSAnaG9zdGNvbmZpZyc7XG4gICAgYmluZFRvQ29udHJvbGxlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgY29udHJvbGxlciA9IEhvc3RDb25maWdDb250cm9sbGVyO1xuICAgIHRlbXBsYXRlVXJsID0gJ3ZpZXdzL2hvc3RzL2hvc3QtY29uZmlnL2hvc3QtY29uZmlnLmh0bWwnO1xufVxuIl19
