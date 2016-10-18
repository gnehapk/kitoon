/// <reference path="../../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name time:timeSlot
 * @scope
 * @restrict E
 *
 * @description
 * An AngularJS directive for showing the time slot.
 *
 * @example
 * <time-slot time-slot-changed="changeTimeSlotForUtilization(time)"></time-slot>
 *
*/
var TimeSlot = (function () {
    function TimeSlot() {
        this.restrict = "E";
        this.scope = {
            timeSlotChanged: '&'
        };
        this.bindToController = true;
        this.controller = function () {
            this.duration = {
                timeSlots: [{ name: "Last 1 hour", value: "-1h" },
                    { name: "Last 2 hours", value: "-2h" },
                    { name: "Last 24 hours", value: "" }]
            };
            this.duration.selectedTimeSlot = this.duration.timeSlots[0];
        };
        this.controllerAs = 'timeslot';
        this.template = '<span class="add-cursor-pointer" data-animation="am-flip-x" data-template="views/hosts/time-slot/time-slot.html" bs-dropdown="ellipsis">{{timeslot.duration.selectedTimeSlot.name}}<b class="caret"></b></span>';
    }
    return TimeSlot;
})();
exports.TimeSlot = TimeSlot;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaG9zdHMvdGltZS1zbG90L3RpbWUtc2xvdC1kaXJlY3RpdmUudHMiXSwibmFtZXMiOlsiVGltZVNsb3QiLCJUaW1lU2xvdC5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7RUFZRTtBQUVGO0lBQUFBO1FBQ0lDLGFBQVFBLEdBQVdBLEdBQUdBLENBQUNBO1FBQ3ZCQSxVQUFLQSxHQUFHQTtZQUNKQSxlQUFlQSxFQUFFQSxHQUFHQTtTQUN2QkEsQ0FBQ0E7UUFDRkEscUJBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUN4QkEsZUFBVUEsR0FBR0E7WUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHO2dCQUNSLFNBQVMsRUFBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO29CQUN6QyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtvQkFDdEMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUNyRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUNBO1FBQ0ZBLGlCQUFZQSxHQUFHQSxVQUFVQSxDQUFDQTtRQUMxQkEsYUFBUUEsR0FBR0EsaU5BQWlOQSxDQUFDQTtJQUNqT0EsQ0FBQ0E7SUFBREQsZUFBQ0E7QUFBREEsQ0FoQkEsQUFnQkNBLElBQUE7QUFoQlksZ0JBQVEsV0FnQnBCLENBQUEiLCJmaWxlIjoibW9kdWxlcy9ob3N0cy90aW1lLXNsb3QvdGltZS1zbG90LWRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuLypcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIHRpbWU6dGltZVNsb3RcbiAqIEBzY29wZVxuICogQHJlc3RyaWN0IEVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIEFuZ3VsYXJKUyBkaXJlY3RpdmUgZm9yIHNob3dpbmcgdGhlIHRpbWUgc2xvdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPHRpbWUtc2xvdCB0aW1lLXNsb3QtY2hhbmdlZD1cImNoYW5nZVRpbWVTbG90Rm9yVXRpbGl6YXRpb24odGltZSlcIj48L3RpbWUtc2xvdD5cbiAqXG4qL1xuXG5leHBvcnQgY2xhc3MgVGltZVNsb3QgaW1wbGVtZW50cyBuZy5JRGlyZWN0aXZlIHtcbiAgICByZXN0cmljdDogc3RyaW5nID0gXCJFXCI7XG4gICAgc2NvcGUgPSB7XG4gICAgICAgIHRpbWVTbG90Q2hhbmdlZDogJyYnXG4gICAgfTtcbiAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgdGltZVNsb3RzIDogW3sgbmFtZTogXCJMYXN0IDEgaG91clwiLCB2YWx1ZTogXCItMWhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJMYXN0IDIgaG91cnNcIiwgdmFsdWU6IFwiLTJoXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiTGFzdCAyNCBob3Vyc1wiLCB2YWx1ZTogXCJcIiB9XVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmR1cmF0aW9uLnNlbGVjdGVkVGltZVNsb3QgPSB0aGlzLmR1cmF0aW9uLnRpbWVTbG90c1swXTtcbiAgICB9O1xuICAgIGNvbnRyb2xsZXJBcyA9ICd0aW1lc2xvdCc7XG4gICAgdGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJhZGQtY3Vyc29yLXBvaW50ZXJcIiBkYXRhLWFuaW1hdGlvbj1cImFtLWZsaXAteFwiIGRhdGEtdGVtcGxhdGU9XCJ2aWV3cy9ob3N0cy90aW1lLXNsb3QvdGltZS1zbG90Lmh0bWxcIiBicy1kcm9wZG93bj1cImVsbGlwc2lzXCI+e3t0aW1lc2xvdC5kdXJhdGlvbi5zZWxlY3RlZFRpbWVTbG90Lm5hbWV9fTxiIGNsYXNzPVwiY2FyZXRcIj48L2I+PC9zcGFuPic7XG59XG4iXX0=
