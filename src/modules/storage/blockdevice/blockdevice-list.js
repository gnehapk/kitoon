/// <reference path="../../../../typings/tsd.d.ts" />
var blockdevice_list_controller_1 = require('./blockdevice-list-controller');
/*
 * @ngdoc directive
 * @name kitoon.storage:blockDeviceList
 * @scope
 * @restrict E
 *
 * @param clusterId. The rbds from the cluster which needs to be shown. If clusterId is not provided, rbds from all the clusters will be shown
 *
 * @description
 * An AngularJS directive for showing list of rbds.
 *
 * @example
 * <block-device-list cluster-id="clusterId"></block-device-list>
 *
*/
var BlockDeviceList = (function () {
    function BlockDeviceList() {
        this.restrict = 'E';
        this.scope = {
            clusterId: '=clusterId'
        };
        this.controller = blockdevice_list_controller_1.BlockDeviceListController;
        this.controllerAs = 'rbds';
        this.bindToController = true;
        this.templateUrl = 'views/storage/blockdevice/blockdevice-list.html';
    }
    return BlockDeviceList;
})();
exports.BlockDeviceList = BlockDeviceList;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc3RvcmFnZS9ibG9ja2RldmljZS9ibG9ja2RldmljZS1saXN0LnRzIl0sIm5hbWVzIjpbIkJsb2NrRGV2aWNlTGlzdCIsIkJsb2NrRGV2aWNlTGlzdC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBRXJELDRDQUF3QywrQkFBK0IsQ0FBQyxDQUFBO0FBRXhFOzs7Ozs7Ozs7Ozs7OztFQWNFO0FBRUY7SUFBQUE7UUFDSUMsYUFBUUEsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDZkEsVUFBS0EsR0FBR0E7WUFDSkEsU0FBU0EsRUFBRUEsWUFBWUE7U0FDMUJBLENBQUNBO1FBQ0ZBLGVBQVVBLEdBQUdBLHVEQUF5QkEsQ0FBQ0E7UUFDdkNBLGlCQUFZQSxHQUFHQSxNQUFNQSxDQUFDQTtRQUN0QkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsZ0JBQVdBLEdBQUdBLGlEQUFpREEsQ0FBQ0E7SUFDcEVBLENBQUNBO0lBQURELHNCQUFDQTtBQUFEQSxDQVRBLEFBU0NBLElBQUE7QUFUWSx1QkFBZSxrQkFTM0IsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL3N0b3JhZ2UvYmxvY2tkZXZpY2UvYmxvY2tkZXZpY2UtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuaW1wb3J0IHtCbG9ja0RldmljZUxpc3RDb250cm9sbGVyfSBmcm9tICcuL2Jsb2NrZGV2aWNlLWxpc3QtY29udHJvbGxlcic7XG5cbi8qXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBraXRvb24uc3RvcmFnZTpibG9ja0RldmljZUxpc3RcbiAqIEBzY29wZVxuICogQHJlc3RyaWN0IEVcbiAqXG4gKiBAcGFyYW0gY2x1c3RlcklkLiBUaGUgcmJkcyBmcm9tIHRoZSBjbHVzdGVyIHdoaWNoIG5lZWRzIHRvIGJlIHNob3duLiBJZiBjbHVzdGVySWQgaXMgbm90IHByb3ZpZGVkLCByYmRzIGZyb20gYWxsIHRoZSBjbHVzdGVycyB3aWxsIGJlIHNob3duXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBBbmd1bGFySlMgZGlyZWN0aXZlIGZvciBzaG93aW5nIGxpc3Qgb2YgcmJkcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGJsb2NrLWRldmljZS1saXN0IGNsdXN0ZXItaWQ9XCJjbHVzdGVySWRcIj48L2Jsb2NrLWRldmljZS1saXN0PlxuICpcbiovXG5cbmV4cG9ydCBjbGFzcyBCbG9ja0RldmljZUxpc3QgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICByZXN0cmljdCA9ICdFJztcbiAgICBzY29wZSA9IHtcbiAgICAgICAgY2x1c3RlcklkOiAnPWNsdXN0ZXJJZCdcbiAgICB9O1xuICAgIGNvbnRyb2xsZXIgPSBCbG9ja0RldmljZUxpc3RDb250cm9sbGVyO1xuICAgIGNvbnRyb2xsZXJBcyA9ICdyYmRzJztcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcbiAgICB0ZW1wbGF0ZVVybCA9ICd2aWV3cy9zdG9yYWdlL2Jsb2NrZGV2aWNlL2Jsb2NrZGV2aWNlLWxpc3QuaHRtbCc7XG59XG4iXX0=
