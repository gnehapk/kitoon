/// <reference path="../../../typings/tsd.d.ts" />
var libs_1 = require('../../modules/base/libs');
/*
 * @ngdoc filter
 * @name kitoon.shared:bytes
 *
 * This can be used like following
 *
 * {{ someexpresssion | bytes }}
*/
function BytesFilter() {
    return function (bytes) {
        return libs_1.numeral(bytes).format('0.0 b');
    };
}
exports.BytesFilter = BytesFilter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9maWx0ZXJzL2J5dGVzLnRzIl0sIm5hbWVzIjpbIkJ5dGVzRmlsdGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFFbEQscUJBQXNCLHlCQUF5QixDQUFDLENBQUE7QUFFaEQ7Ozs7Ozs7RUFPRTtBQUVGO0lBQ0lBLE1BQU1BLENBQUNBLFVBQVNBLEtBQUtBO1FBQ2pCLE1BQU0sQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQ0E7QUFDTkEsQ0FBQ0E7QUFKZSxtQkFBVyxjQUkxQixDQUFBIiwiZmlsZSI6InNoYXJlZC9maWx0ZXJzL2J5dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5pbXBvcnQge251bWVyYWx9IGZyb20gJy4uLy4uL21vZHVsZXMvYmFzZS9saWJzJztcblxuLypcbiAqIEBuZ2RvYyBmaWx0ZXJcbiAqIEBuYW1lIGtpdG9vbi5zaGFyZWQ6Ynl0ZXNcbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIGxpa2UgZm9sbG93aW5nXG4gKlxuICoge3sgc29tZWV4cHJlc3NzaW9uIHwgYnl0ZXMgfX1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBCeXRlc0ZpbHRlcigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgICAgcmV0dXJuIG51bWVyYWwoYnl0ZXMpLmZvcm1hdCgnMC4wIGInKTtcbiAgICB9O1xufVxuIl19
