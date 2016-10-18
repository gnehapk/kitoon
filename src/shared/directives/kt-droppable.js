/// <reference path="../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name kitoon.dragdrop:ktDroppable
 * @scope
 * @restrict E
 *
 * @param {function} ktDroppable. The function which needs to be called when an item is dropped in to it.
 *
 * @description
 * An AngularJS directive for making an element acts a dropping target.
 *
 * @example
 * <div id='collection' kt-droppable="vm.itemDroppedIn(someCustomeData?, data)"></div>
 *
 * Here the 'data' will be replaced with whatever content is available with item being dropped.
*/
var KTDroppable = (function () {
    function KTDroppable() {
        this.restrict = 'A';
        this.scope = {
            ktDroppable: '&ktDroppable'
        };
    }
    KTDroppable.prototype.link = function ($scope, element, attributes) {
        var elem = element[0];
        elem.addEventListener('drop', function (e) {
            e.preventDefault();
            var data = e.dataTransfer.getData("Text");
            $scope['ktDroppable']({ data: JSON.parse(data) });
        }, false);
        // Event to drag over action on droppable element
        elem.addEventListener('dragover', function (e) {
            e.preventDefault();
        }, false);
        elem.addEventListener('dragenter', function (e) {
        }, false);
        elem.addEventListener('dragenter', function (e) {
        }, false);
    };
    return KTDroppable;
})();
exports.KTDroppable = KTDroppable;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kaXJlY3RpdmVzL2t0LWRyb3BwYWJsZS50cyJdLCJuYW1lcyI6WyJLVERyb3BwYWJsZSIsIktURHJvcHBhYmxlLmNvbnN0cnVjdG9yIiwiS1REcm9wcGFibGUubGluayJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTtBQUVGO0lBS0lBO1FBSk9DLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLFVBQUtBLEdBQUdBO1lBQ1hBLFdBQVdBLEVBQUVBLGNBQWNBO1NBQzlCQSxDQUFBQTtJQUVEQSxDQUFDQTtJQUVNRCwwQkFBSUEsR0FBWEEsVUFBWUEsTUFBaUJBLEVBQUVBLE9BQWVBLEVBQUVBLFVBQTBCQTtRQUN0RUUsSUFBSUEsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsRUFBRUEsVUFBQ0EsQ0FBQ0E7WUFDNUJBLENBQUNBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ25CQSxJQUFJQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUMxQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDdERBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO1FBQ1ZBLGlEQUFpREE7UUFDakRBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsVUFBVUEsRUFBRUEsVUFBU0EsQ0FBQ0E7WUFDeEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxFQUFFQSxVQUFDQSxDQUFDQTtRQUNyQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDVkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxFQUFFQSxVQUFDQSxDQUFDQTtRQUNyQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDZEEsQ0FBQ0E7SUFDTEYsa0JBQUNBO0FBQURBLENBeEJBLEFBd0JDQSxJQUFBO0FBeEJZLG1CQUFXLGNBd0J2QixDQUFBIiwiZmlsZSI6InNoYXJlZC9kaXJlY3RpdmVzL2t0LWRyb3BwYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuLypcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGtpdG9vbi5kcmFnZHJvcDprdERyb3BwYWJsZVxuICogQHNjb3BlXG4gKiBAcmVzdHJpY3QgRVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGt0RHJvcHBhYmxlLiBUaGUgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gYmUgY2FsbGVkIHdoZW4gYW4gaXRlbSBpcyBkcm9wcGVkIGluIHRvIGl0LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gQW5ndWxhckpTIGRpcmVjdGl2ZSBmb3IgbWFraW5nIGFuIGVsZW1lbnQgYWN0cyBhIGRyb3BwaW5nIHRhcmdldC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGRpdiBpZD0nY29sbGVjdGlvbicga3QtZHJvcHBhYmxlPVwidm0uaXRlbURyb3BwZWRJbihzb21lQ3VzdG9tZURhdGE/LCBkYXRhKVwiPjwvZGl2PlxuICpcbiAqIEhlcmUgdGhlICdkYXRhJyB3aWxsIGJlIHJlcGxhY2VkIHdpdGggd2hhdGV2ZXIgY29udGVudCBpcyBhdmFpbGFibGUgd2l0aCBpdGVtIGJlaW5nIGRyb3BwZWQuXG4qL1xuXG5leHBvcnQgY2xhc3MgS1REcm9wcGFibGUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICBwdWJsaWMgcmVzdHJpY3QgPSAnQSc7XG4gICAgcHVibGljIHNjb3BlID0ge1xuICAgICAgICBrdERyb3BwYWJsZTogJyZrdERyb3BwYWJsZSdcbiAgICB9XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGxpbmsoJHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IEpRdWVyeSwgYXR0cmlidXRlczogbmcuSUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBlbGVtZW50WzBdO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwiVGV4dFwiKTtcbiAgICAgICAgICAgICRzY29wZVsna3REcm9wcGFibGUnXSh7IGRhdGE6IEpTT04ucGFyc2UoZGF0YSkgfSk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgLy8gRXZlbnQgdG8gZHJhZyBvdmVyIGFjdGlvbiBvbiBkcm9wcGFibGUgZWxlbWVudFxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIChlKSA9PiB7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG59XG4iXX0=
