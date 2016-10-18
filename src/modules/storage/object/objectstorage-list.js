/// <reference path="../../../../typings/tsd.d.ts" />
var objectstorage_list_controller_1 = require('./objectstorage-list-controller');
/*
 * @ngdoc directive
 * @name kitoon.storage:objectstorageList
 * @scope
 * @restrict E
 *
 * @param clusterId. The pools from the cluster which needs to be shown.
 *
 * @description
 * An AngularJS directive for showing list of pools.
 *
 * @example
 * <objectstorage-list cluster-id="clusterId"></objectstorage-list>
 *
*/
var ObjectStorageList = (function () {
    function ObjectStorageList() {
        this.restrict = 'E';
        this.scope = {
            clusterId: '=clusterId'
        };
        this.controller = objectstorage_list_controller_1.ObjectStorageListController;
        this.controllerAs = 'storages';
        this.bindToController = true;
        this.templateUrl = 'views/storage/object/objectstorage-list.html';
    }
    return ObjectStorageList;
})();
exports.ObjectStorageList = ObjectStorageList;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc3RvcmFnZS9vYmplY3Qvb2JqZWN0c3RvcmFnZS1saXN0LnRzIl0sIm5hbWVzIjpbIk9iamVjdFN0b3JhZ2VMaXN0IiwiT2JqZWN0U3RvcmFnZUxpc3QuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUVyRCw4Q0FBMEMsaUNBQWlDLENBQUMsQ0FBQTtBQUU1RTs7Ozs7Ozs7Ozs7Ozs7RUFjRTtBQUVGO0lBQUFBO1FBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLFVBQUtBLEdBQUdBO1lBQ0pBLFNBQVNBLEVBQUVBLFlBQVlBO1NBQzFCQSxDQUFDQTtRQUNGQSxlQUFVQSxHQUFHQSwyREFBMkJBLENBQUNBO1FBQ3pDQSxpQkFBWUEsR0FBR0EsVUFBVUEsQ0FBQ0E7UUFDMUJBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDeEJBLGdCQUFXQSxHQUFHQSw4Q0FBOENBLENBQUNBO0lBQ2pFQSxDQUFDQTtJQUFERCx3QkFBQ0E7QUFBREEsQ0FUQSxBQVNDQSxJQUFBO0FBVFkseUJBQWlCLG9CQVM3QixDQUFBIiwiZmlsZSI6Im1vZHVsZXMvc3RvcmFnZS9vYmplY3Qvb2JqZWN0c3RvcmFnZS1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5pbXBvcnQge09iamVjdFN0b3JhZ2VMaXN0Q29udHJvbGxlcn0gZnJvbSAnLi9vYmplY3RzdG9yYWdlLWxpc3QtY29udHJvbGxlcic7XG5cbi8qXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBraXRvb24uc3RvcmFnZTpvYmplY3RzdG9yYWdlTGlzdFxuICogQHNjb3BlXG4gKiBAcmVzdHJpY3QgRVxuICpcbiAqIEBwYXJhbSBjbHVzdGVySWQuIFRoZSBwb29scyBmcm9tIHRoZSBjbHVzdGVyIHdoaWNoIG5lZWRzIHRvIGJlIHNob3duLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gQW5ndWxhckpTIGRpcmVjdGl2ZSBmb3Igc2hvd2luZyBsaXN0IG9mIHBvb2xzLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8b2JqZWN0c3RvcmFnZS1saXN0IGNsdXN0ZXItaWQ9XCJjbHVzdGVySWRcIj48L29iamVjdHN0b3JhZ2UtbGlzdD5cbiAqXG4qL1xuXG5leHBvcnQgY2xhc3MgT2JqZWN0U3RvcmFnZUxpc3QgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICByZXN0cmljdCA9ICdFJztcbiAgICBzY29wZSA9IHtcbiAgICAgICAgY2x1c3RlcklkOiAnPWNsdXN0ZXJJZCdcbiAgICB9O1xuICAgIGNvbnRyb2xsZXIgPSBPYmplY3RTdG9yYWdlTGlzdENvbnRyb2xsZXI7XG4gICAgY29udHJvbGxlckFzID0gJ3N0b3JhZ2VzJztcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcbiAgICB0ZW1wbGF0ZVVybCA9ICd2aWV3cy9zdG9yYWdlL29iamVjdC9vYmplY3RzdG9yYWdlLWxpc3QuaHRtbCc7XG59XG4iXX0=
