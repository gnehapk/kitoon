/// <reference path="../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name kitoon.common:StorageSizeSelector
 * @scope
 * @restrict EA
 *
 * @param {object} default. The object which holds the default value in the form of {value: , unit: }
 * @param {function} on-change. The function which needs to be called when the size is changed.
 *
 * @description
 * An AngularJS directive for size componenet which includes a size number input and a unit dropdown.
 *
 * @example
 * <storage-size-selector default="defaultVaue" on-change="updateSize(newSize)"></storage-size-selector>
 *
*/
var StorageSizeSelector = (function () {
    function StorageSizeSelector() {
        this.restrict = 'E';
        this.scope = {
            initialSize: '=default',
            onChange: '&'
        };
        this.bindToController = true;
        this.controller = function () {
            this.units = ['GB', 'TB', 'PB'];
            if (this.initialSize) {
                this.value = this.initialSize.value;
                this.unit = this.initialSize.unit;
            }
            else {
                this.value = 1;
                this.unit = 'GB';
            }
            this.update = function () {
                this.onChange({ newSize: { value: this.value, unit: this.unit } });
            };
        };
        this.controllerAs = 'size';
        this.templateUrl = 'views/shared/directives/storage-size-selector.html';
    }
    return StorageSizeSelector;
})();
exports.StorageSizeSelector = StorageSizeSelector;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kaXJlY3RpdmVzL3N0b3JhZ2Utc2l6ZS1zZWxlY3Rvci50cyJdLCJuYW1lcyI6WyJTdG9yYWdlU2l6ZVNlbGVjdG9yIiwiU3RvcmFnZVNpemVTZWxlY3Rvci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTtBQUVGO0lBQUFBO1FBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLFVBQUtBLEdBQUdBO1lBQ0pBLFdBQVdBLEVBQUVBLFVBQVVBO1lBQ3ZCQSxRQUFRQSxFQUFFQSxHQUFHQTtTQUNoQkEsQ0FBQ0E7UUFDRkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsZUFBVUEsR0FBR0E7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN0QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDckIsQ0FBQztZQUNELElBQUksQ0FBQyxNQUFNLEdBQUc7Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQ0E7UUFDRkEsaUJBQVlBLEdBQUdBLE1BQU1BLENBQUNBO1FBQ3RCQSxnQkFBV0EsR0FBR0Esb0RBQW9EQSxDQUFDQTtJQUN2RUEsQ0FBQ0E7SUFBREQsMEJBQUNBO0FBQURBLENBdkJBLEFBdUJDQSxJQUFBO0FBdkJZLDJCQUFtQixzQkF1Qi9CLENBQUEiLCJmaWxlIjoic2hhcmVkL2RpcmVjdGl2ZXMvc3RvcmFnZS1zaXplLXNlbGVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG4vKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUga2l0b29uLmNvbW1vbjpTdG9yYWdlU2l6ZVNlbGVjdG9yXG4gKiBAc2NvcGVcbiAqIEByZXN0cmljdCBFQVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZWZhdWx0LiBUaGUgb2JqZWN0IHdoaWNoIGhvbGRzIHRoZSBkZWZhdWx0IHZhbHVlIGluIHRoZSBmb3JtIG9mIHt2YWx1ZTogLCB1bml0OiB9XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbi1jaGFuZ2UuIFRoZSBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBiZSBjYWxsZWQgd2hlbiB0aGUgc2l6ZSBpcyBjaGFuZ2VkLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gQW5ndWxhckpTIGRpcmVjdGl2ZSBmb3Igc2l6ZSBjb21wb25lbmV0IHdoaWNoIGluY2x1ZGVzIGEgc2l6ZSBudW1iZXIgaW5wdXQgYW5kIGEgdW5pdCBkcm9wZG93bi5cbiAqXG4gKiBAZXhhbXBsZVxuICogPHN0b3JhZ2Utc2l6ZS1zZWxlY3RvciBkZWZhdWx0PVwiZGVmYXVsdFZhdWVcIiBvbi1jaGFuZ2U9XCJ1cGRhdGVTaXplKG5ld1NpemUpXCI+PC9zdG9yYWdlLXNpemUtc2VsZWN0b3I+XG4gKlxuKi9cblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTaXplU2VsZWN0b3IgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICByZXN0cmljdCA9ICdFJztcbiAgICBzY29wZSA9IHtcbiAgICAgICAgaW5pdGlhbFNpemU6ICc9ZGVmYXVsdCcsXG4gICAgICAgIG9uQ2hhbmdlOiAnJidcbiAgICB9O1xuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xuICAgIGNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy51bml0cyA9IFsnR0InLCAnVEInLCAnUEInXTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFNpemUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmluaXRpYWxTaXplLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy51bml0ID0gdGhpcy5pbml0aWFsU2l6ZS51bml0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IDE7XG4gICAgICAgICAgICB0aGlzLnVuaXQgPSAnR0InO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHsgbmV3U2l6ZTogeyB2YWx1ZTogdGhpcy52YWx1ZSwgdW5pdDogdGhpcy51bml0IH0gfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnRyb2xsZXJBcyA9ICdzaXplJztcbiAgICB0ZW1wbGF0ZVVybCA9ICd2aWV3cy9zaGFyZWQvZGlyZWN0aXZlcy9zdG9yYWdlLXNpemUtc2VsZWN0b3IuaHRtbCc7XG59XG4iXX0=
