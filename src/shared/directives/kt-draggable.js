/// <reference path="../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name kitoon.dragdrop:ktDraggable
 * @scope
 * @restrict E
 *
 * @param {object&} kTDraggable. The data which needs to be sent with the element being dragged
 *
 * @description
 * An AngularJS directive for making an element draggable.
 *
 * @example
 * <div id='item1' kt-draggable="item.id"></div>
*/
var KTDraggable = (function () {
    function KTDraggable() {
        this.restrict = 'A';
        this.scope = {
            ktDraggable: '&ktDraggable'
        };
    }
    KTDraggable.prototype.link = function ($scope, element, attributes) {
        var elem = element[0];
        elem.draggable = true;
        elem.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('Text', JSON.stringify($scope['ktDraggable']()));
        }, false);
    };
    return KTDraggable;
})();
exports.KTDraggable = KTDraggable;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kaXJlY3RpdmVzL2t0LWRyYWdnYWJsZS50cyJdLCJuYW1lcyI6WyJLVERyYWdnYWJsZSIsIktURHJhZ2dhYmxlLmNvbnN0cnVjdG9yIiwiS1REcmFnZ2FibGUubGluayJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7O0VBYUU7QUFFRjtJQUtJQTtRQUpPQyxhQUFRQSxHQUFHQSxHQUFHQSxDQUFDQTtRQUNmQSxVQUFLQSxHQUFHQTtZQUNYQSxXQUFXQSxFQUFFQSxjQUFjQTtTQUM5QkEsQ0FBQUE7SUFFREEsQ0FBQ0E7SUFFTUQsMEJBQUlBLEdBQVhBLFVBQVlBLE1BQWlCQSxFQUFFQSxPQUFlQSxFQUFFQSxVQUEwQkE7UUFDdEVFLElBQUlBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ3RCQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN0QkEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxFQUFFQSxVQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNUVBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0lBQ2RBLENBQUNBO0lBQ0xGLGtCQUFDQTtBQUFEQSxDQWZBLEFBZUNBLElBQUE7QUFmWSxtQkFBVyxjQWV2QixDQUFBIiwiZmlsZSI6InNoYXJlZC9kaXJlY3RpdmVzL2t0LWRyYWdnYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuLypcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGtpdG9vbi5kcmFnZHJvcDprdERyYWdnYWJsZVxuICogQHNjb3BlXG4gKiBAcmVzdHJpY3QgRVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0Jn0ga1REcmFnZ2FibGUuIFRoZSBkYXRhIHdoaWNoIG5lZWRzIHRvIGJlIHNlbnQgd2l0aCB0aGUgZWxlbWVudCBiZWluZyBkcmFnZ2VkXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBbiBBbmd1bGFySlMgZGlyZWN0aXZlIGZvciBtYWtpbmcgYW4gZWxlbWVudCBkcmFnZ2FibGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxkaXYgaWQ9J2l0ZW0xJyBrdC1kcmFnZ2FibGU9XCJpdGVtLmlkXCI+PC9kaXY+XG4qL1xuXG5leHBvcnQgY2xhc3MgS1REcmFnZ2FibGUgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICBwdWJsaWMgcmVzdHJpY3QgPSAnQSc7XG4gICAgcHVibGljIHNjb3BlID0ge1xuICAgICAgICBrdERyYWdnYWJsZTogJyZrdERyYWdnYWJsZSdcbiAgICB9XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGxpbmsoJHNjb3BlOiBuZy5JU2NvcGUsIGVsZW1lbnQ6IEpRdWVyeSwgYXR0cmlidXRlczogbmcuSUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBlbGVtZW50WzBdO1xuICAgICAgICBlbGVtLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ1RleHQnLCBKU09OLnN0cmluZ2lmeSgkc2NvcGVbJ2t0RHJhZ2dhYmxlJ10oKSkpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxufVxuIl19
