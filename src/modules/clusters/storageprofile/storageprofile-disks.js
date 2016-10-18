/// <reference path="../../../../typings/tsd.d.ts" />
var storageprofile_disks_controller_1 = require('./storageprofile-disks-controller');
/*
 * @ngdoc directive
 * @name kitoon.storage:storageprofileDisks
 * @scope
 * @restrict E
 *
 * @param hosts. The disks from the hosts which needs to be shown.
 * @param getHosts function. A function which returns the hosts.
 *
 * @description
 * An AngularJS directive for showing the storage profiles with disks.
 *
 * @example
 * <storageprofile-disks hosts="hosts" get-hosts="vm.getHosts()"></storageprofile-disks>
 *
*/
var StorageProfileDisks = (function () {
    function StorageProfileDisks() {
        this.restrict = 'E';
        this.scope = {
            hosts: '=?hosts',
            hostsCallback: '&?getHosts'
        };
        this.controller = storageprofile_disks_controller_1.StorageProfileDisksController;
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.templateUrl = 'views/clusters/storageprofile/storageprofile-disks.html';
    }
    return StorageProfileDisks;
})();
exports.StorageProfileDisks = StorageProfileDisks;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2x1c3RlcnMvc3RvcmFnZXByb2ZpbGUvc3RvcmFnZXByb2ZpbGUtZGlza3MudHMiXSwibmFtZXMiOlsiU3RvcmFnZVByb2ZpbGVEaXNrcyIsIlN0b3JhZ2VQcm9maWxlRGlza3MuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUVyRCxnREFBNEMsbUNBQW1DLENBQUMsQ0FBQTtBQUNoRjs7Ozs7Ozs7Ozs7Ozs7O0VBZUU7QUFFRjtJQUFBQTtRQUNJQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUNmQSxVQUFLQSxHQUFHQTtZQUNKQSxLQUFLQSxFQUFFQSxTQUFTQTtZQUNoQkEsYUFBYUEsRUFBRUEsWUFBWUE7U0FDOUJBLENBQUNBO1FBQ0ZBLGVBQVVBLEdBQUdBLCtEQUE2QkEsQ0FBQ0E7UUFDM0NBLGlCQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNwQkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsZ0JBQVdBLEdBQUdBLHlEQUF5REEsQ0FBQ0E7SUFDNUVBLENBQUNBO0lBQURELDBCQUFDQTtBQUFEQSxDQVZBLEFBVUNBLElBQUE7QUFWWSwyQkFBbUIsc0JBVS9CLENBQUEiLCJmaWxlIjoibW9kdWxlcy9jbHVzdGVycy9zdG9yYWdlcHJvZmlsZS9zdG9yYWdlcHJvZmlsZS1kaXNrcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuaW1wb3J0IHtTdG9yYWdlUHJvZmlsZURpc2tzQ29udHJvbGxlcn0gZnJvbSAnLi9zdG9yYWdlcHJvZmlsZS1kaXNrcy1jb250cm9sbGVyJztcbi8qXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBraXRvb24uc3RvcmFnZTpzdG9yYWdlcHJvZmlsZURpc2tzXG4gKiBAc2NvcGVcbiAqIEByZXN0cmljdCBFXG4gKlxuICogQHBhcmFtIGhvc3RzLiBUaGUgZGlza3MgZnJvbSB0aGUgaG9zdHMgd2hpY2ggbmVlZHMgdG8gYmUgc2hvd24uXG4gKiBAcGFyYW0gZ2V0SG9zdHMgZnVuY3Rpb24uIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgaG9zdHMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBBbmd1bGFySlMgZGlyZWN0aXZlIGZvciBzaG93aW5nIHRoZSBzdG9yYWdlIHByb2ZpbGVzIHdpdGggZGlza3MuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxzdG9yYWdlcHJvZmlsZS1kaXNrcyBob3N0cz1cImhvc3RzXCIgZ2V0LWhvc3RzPVwidm0uZ2V0SG9zdHMoKVwiPjwvc3RvcmFnZXByb2ZpbGUtZGlza3M+XG4gKlxuKi9cblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VQcm9maWxlRGlza3MgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICByZXN0cmljdCA9ICdFJztcbiAgICBzY29wZSA9IHtcbiAgICAgICAgaG9zdHM6ICc9P2hvc3RzJyxcbiAgICAgICAgaG9zdHNDYWxsYmFjazogJyY/Z2V0SG9zdHMnXG4gICAgfTtcbiAgICBjb250cm9sbGVyID0gU3RvcmFnZVByb2ZpbGVEaXNrc0NvbnRyb2xsZXI7XG4gICAgY29udHJvbGxlckFzID0gJ3ZtJztcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcbiAgICB0ZW1wbGF0ZVVybCA9ICd2aWV3cy9jbHVzdGVycy9zdG9yYWdlcHJvZmlsZS9zdG9yYWdlcHJvZmlsZS1kaXNrcy5odG1sJztcbn1cbiJdfQ==
