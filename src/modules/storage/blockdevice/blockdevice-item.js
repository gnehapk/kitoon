/// <reference path="../../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name kitoon.storage:blockDeviceItem
 * @scope
 * @restrict E
 *
 * @param {function} resive. The function which needs to be called when an item needs to resized.
 * @param {function} remove. The function which needs to be called when an item needs to be removed.
 *
 * @description
 * An AngularJS directive for showing the details of a block device.
 *
 * @example
 * <blockdevice-item details="blockdevice" remove="remove(blockdevice)" resize="resize(blockdevice)"></blockdevice-item>
 *
*/
var BlockDeviceItem = (function () {
    function BlockDeviceItem() {
        this.restrict = 'E';
        this.scope = {
            blockdevice: '=details',
            remove: '&',
            resize: '&'
        };
        this.controller = function () {
            this.onRemove = function () {
                this.remove();
            };
            this.onResize = function () {
                this.resize();
            };
        };
        this.controllerAs = 'vm';
        this.bindToController = true;
        this.templateUrl = 'views/storage/blockdevice/blockdevice-item.html';
    }
    return BlockDeviceItem;
})();
exports.BlockDeviceItem = BlockDeviceItem;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvc3RvcmFnZS9ibG9ja2RldmljZS9ibG9ja2RldmljZS1pdGVtLnRzIl0sIm5hbWVzIjpbIkJsb2NrRGV2aWNlSXRlbSIsIkJsb2NrRGV2aWNlSXRlbS5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTtBQUVGO0lBQUFBO1FBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLFVBQUtBLEdBQUdBO1lBQ0pBLFdBQVdBLEVBQUVBLFVBQVVBO1lBQ3ZCQSxNQUFNQSxFQUFFQSxHQUFHQTtZQUNYQSxNQUFNQSxFQUFFQSxHQUFHQTtTQUNkQSxDQUFDQTtRQUNGQSxlQUFVQSxHQUFHQTtZQUNULElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQTtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQ0E7UUFDRkEsaUJBQVlBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3BCQSxxQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3hCQSxnQkFBV0EsR0FBR0EsaURBQWlEQSxDQUFDQTtJQUNwRUEsQ0FBQ0E7SUFBREQsc0JBQUNBO0FBQURBLENBbEJBLEFBa0JDQSxJQUFBO0FBbEJZLHVCQUFlLGtCQWtCM0IsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL3N0b3JhZ2UvYmxvY2tkZXZpY2UvYmxvY2tkZXZpY2UtaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuLypcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGtpdG9vbi5zdG9yYWdlOmJsb2NrRGV2aWNlSXRlbVxuICogQHNjb3BlXG4gKiBAcmVzdHJpY3QgRVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlc2l2ZS4gVGhlIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGJlIGNhbGxlZCB3aGVuIGFuIGl0ZW0gbmVlZHMgdG8gcmVzaXplZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlbW92ZS4gVGhlIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGJlIGNhbGxlZCB3aGVuIGFuIGl0ZW0gbmVlZHMgdG8gYmUgcmVtb3ZlZC5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIEFuZ3VsYXJKUyBkaXJlY3RpdmUgZm9yIHNob3dpbmcgdGhlIGRldGFpbHMgb2YgYSBibG9jayBkZXZpY2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxibG9ja2RldmljZS1pdGVtIGRldGFpbHM9XCJibG9ja2RldmljZVwiIHJlbW92ZT1cInJlbW92ZShibG9ja2RldmljZSlcIiByZXNpemU9XCJyZXNpemUoYmxvY2tkZXZpY2UpXCI+PC9ibG9ja2RldmljZS1pdGVtPlxuICpcbiovXG5cbmV4cG9ydCBjbGFzcyBCbG9ja0RldmljZUl0ZW0gaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICByZXN0cmljdCA9ICdFJztcbiAgICBzY29wZSA9IHtcbiAgICAgICAgYmxvY2tkZXZpY2U6ICc9ZGV0YWlscycsXG4gICAgICAgIHJlbW92ZTogJyYnLFxuICAgICAgICByZXNpemU6ICcmJ1xuICAgIH07XG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm9uUmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25SZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBjb250cm9sbGVyQXMgPSAndm0nO1xuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xuICAgIHRlbXBsYXRlVXJsID0gJ3ZpZXdzL3N0b3JhZ2UvYmxvY2tkZXZpY2UvYmxvY2tkZXZpY2UtaXRlbS5odG1sJztcbn1cbiJdfQ==
