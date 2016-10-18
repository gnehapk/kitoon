// <reference path="../../../typings/tsd.d.ts" />
/**
 * @ngdoc directive
 * @name kitoon.storage.object.objectstorage-new
 * @scope
 * $restrict E
 *
 * @description
 * An AngularJS Directive for rbd along with pool creation
 *
 * @example
 * <object-storage pool-with-rbd="boolean" prepare-rbd-summary="blockdevice.prepareSummary()" rbd-list="blockdevice.rbdlist[]" pool-name="blockdevice.name"></object-storage>
 * pool-with-rbd    -> boolean to decide simple pool creation or creation with RBD
 * prepare-rbd-summary -> the method used to generate list of RBDs
 * rbd-list -> a shared list of rbds
 */
var objectstorage_new_1 = require("./objectstorage-new");
var ObjectStorage = (function () {
    function ObjectStorage() {
        this.scope = {
            poolWithRbd: "@",
            prepareRbdSummary: "&",
            rbdList: "=",
            poolName: "="
        };
        this.restrict = 'E';
        this.controller = objectstorage_new_1.ObjectStorageController;
        this.controllerAs = 'storage';
        this.bindToController = true;
        this.templateUrl = 'views/storage/object/objectstorage-new-directive.html';
    }
    return ObjectStorage;
})();
exports.ObjectStorage = ObjectStorage;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc3RvcmFnZS9vYmplY3Qvb2JqZWN0c3RvcmFnZS1uZXctZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbIk9iamVjdFN0b3JhZ2UiLCJPYmplY3RTdG9yYWdlLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxpREFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCxrQ0FBc0MscUJBQXFCLENBQUMsQ0FBQTtBQUU1RDtJQUFBQTtRQUNJQyxVQUFLQSxHQUFFQTtZQUNIQSxXQUFXQSxFQUFFQSxHQUFHQTtZQUNoQkEsaUJBQWlCQSxFQUFFQSxHQUFHQTtZQUN0QkEsT0FBT0EsRUFBRUEsR0FBR0E7WUFDWkEsUUFBUUEsRUFBRUEsR0FBR0E7U0FDaEJBLENBQUNBO1FBQ0ZBLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLGVBQVVBLEdBQUdBLDJDQUF1QkEsQ0FBQ0E7UUFDckNBLGlCQUFZQSxHQUFHQSxTQUFTQSxDQUFDQTtRQUN6QkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsZ0JBQVdBLEdBQUdBLHVEQUF1REEsQ0FBQ0E7SUFDMUVBLENBQUNBO0lBQURELG9CQUFDQTtBQUFEQSxDQVpBLEFBWUNBLElBQUE7QUFaWSxxQkFBYSxnQkFZekIsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL3N0b3JhZ2Uvb2JqZWN0L29iamVjdHN0b3JhZ2UtbmV3LWRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGtpdG9vbi5zdG9yYWdlLm9iamVjdC5vYmplY3RzdG9yYWdlLW5ld1xuICogQHNjb3BlXG4gKiAkcmVzdHJpY3QgRVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gQW5ndWxhckpTIERpcmVjdGl2ZSBmb3IgcmJkIGFsb25nIHdpdGggcG9vbCBjcmVhdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiA8b2JqZWN0LXN0b3JhZ2UgcG9vbC13aXRoLXJiZD1cImJvb2xlYW5cIiBwcmVwYXJlLXJiZC1zdW1tYXJ5PVwiYmxvY2tkZXZpY2UucHJlcGFyZVN1bW1hcnkoKVwiIHJiZC1saXN0PVwiYmxvY2tkZXZpY2UucmJkbGlzdFtdXCIgcG9vbC1uYW1lPVwiYmxvY2tkZXZpY2UubmFtZVwiPjwvb2JqZWN0LXN0b3JhZ2U+XG4gKiBwb29sLXdpdGgtcmJkICAgIC0+IGJvb2xlYW4gdG8gZGVjaWRlIHNpbXBsZSBwb29sIGNyZWF0aW9uIG9yIGNyZWF0aW9uIHdpdGggUkJEXG4gKiBwcmVwYXJlLXJiZC1zdW1tYXJ5IC0+IHRoZSBtZXRob2QgdXNlZCB0byBnZW5lcmF0ZSBsaXN0IG9mIFJCRHNcbiAqIHJiZC1saXN0IC0+IGEgc2hhcmVkIGxpc3Qgb2YgcmJkc1xuICovXG5cbmltcG9ydCB7T2JqZWN0U3RvcmFnZUNvbnRyb2xsZXJ9IGZyb20gXCIuL29iamVjdHN0b3JhZ2UtbmV3XCI7XG5cbmV4cG9ydCBjbGFzcyBPYmplY3RTdG9yYWdlIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG4gICAgc2NvcGU9IHtcbiAgICAgICAgcG9vbFdpdGhSYmQ6IFwiQFwiLFxuICAgICAgICBwcmVwYXJlUmJkU3VtbWFyeTogXCImXCIsXG4gICAgICAgIHJiZExpc3Q6IFwiPVwiLFxuICAgICAgICBwb29sTmFtZTogXCI9XCJcbiAgICB9O1xuICAgIHJlc3RyaWN0ID0gJ0UnO1xuICAgIGNvbnRyb2xsZXIgPSBPYmplY3RTdG9yYWdlQ29udHJvbGxlcjtcbiAgICBjb250cm9sbGVyQXMgPSAnc3RvcmFnZSc7XG4gICAgYmluZFRvQ29udHJvbGxlciA9IHRydWU7XG4gICAgdGVtcGxhdGVVcmwgPSAndmlld3Mvc3RvcmFnZS9vYmplY3Qvb2JqZWN0c3RvcmFnZS1uZXctZGlyZWN0aXZlLmh0bWwnO1xufSJdfQ==
