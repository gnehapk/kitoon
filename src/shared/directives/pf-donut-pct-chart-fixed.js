/// <reference path="../../../typings/tsd.d.ts" />
/*
 * @ngdoc directive
 * @name kitoon.pf-donut-pct-chart-fixed: PfDonutPctChartFixed
 * @scope
 * @restrict A
 *
 * @description
 * An AngularJS directive for updating donut chart arc.
 *
 * @example
 * <div pf-donut-pct-chart-fixed>
 *      <div pf-donut-pct-chart config="usedConfig" data="usedData" center-
 *       label="usedLabel">
 *      </div>
 * </div>
 *
*/
var jquery = $ = require("jquery");
var PfDonutPctChartFixed = (function () {
    function PfDonutPctChartFixed($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.restrict = 'A';
        this.transclude = true;
        this.template = '<div ng-transclude></div>';
        this.link = function (scope, element) {
            _this.$timeout(function () {
                var pfDonutPctChart = element.find('span')[0];
                var innerScope = angular.element(pfDonutPctChart).isolateScope();
                innerScope.updateAll = function (scope) {
                    scope.updateAvailable();
                    scope.config.data = jquery.extend(scope.config.data, scope.getDonutData(scope));
                    scope.config.color = scope.statusDonutColor(scope);
                    scope.config.data.onclick = scope.config.onClickFn;
                };
            }, 200);
        };
    }
    return PfDonutPctChartFixed;
})();
exports.PfDonutPctChartFixed = PfDonutPctChartFixed;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kaXJlY3RpdmVzL3BmLWRvbnV0LXBjdC1jaGFydC1maXhlZC50cyJdLCJuYW1lcyI6WyJQZkRvbnV0UGN0Q2hhcnRGaXhlZCIsIlBmRG9udXRQY3RDaGFydEZpeGVkLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFHbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7RUFnQkU7QUFFRixJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRW5DO0lBSUlBLDhCQUFvQkEsUUFBNEJBO1FBSnBEQyxpQkFpQkNBO1FBYnVCQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFvQkE7UUFIekNBLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLGVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2xCQSxhQUFRQSxHQUFHQSwyQkFBMkJBLENBQUNBO1FBRXZDQSxTQUFJQSxHQUF1QkEsVUFBQ0EsS0FBZUEsRUFBRUEsT0FBZUE7WUFDakVBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBO2dCQUNSLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksVUFBVSxHQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3RFLFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxLQUFLO29CQUNwQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNqRixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25ELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNUQSxDQUFDQSxDQUFDQTtJQVppREEsQ0FBQ0E7SUFheERELDJCQUFDQTtBQUFEQSxDQWpCQSxBQWlCQ0EsSUFBQTtBQWpCWSw0QkFBb0IsdUJBaUJoQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9kaXJlY3RpdmVzL3BmLWRvbnV0LXBjdC1jaGFydC1maXhlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShuYW1lOiBzdHJpbmcpO1xuXG4vKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUga2l0b29uLnBmLWRvbnV0LXBjdC1jaGFydC1maXhlZDogUGZEb251dFBjdENoYXJ0Rml4ZWRcbiAqIEBzY29wZVxuICogQHJlc3RyaWN0IEFcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIEFuZ3VsYXJKUyBkaXJlY3RpdmUgZm9yIHVwZGF0aW5nIGRvbnV0IGNoYXJ0IGFyYy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGRpdiBwZi1kb251dC1wY3QtY2hhcnQtZml4ZWQ+XG4gKiAgICAgIDxkaXYgcGYtZG9udXQtcGN0LWNoYXJ0IGNvbmZpZz1cInVzZWRDb25maWdcIiBkYXRhPVwidXNlZERhdGFcIiBjZW50ZXItXG4gKiAgICAgICBsYWJlbD1cInVzZWRMYWJlbFwiPlxuICogICAgICA8L2Rpdj5cbiAqIDwvZGl2PlxuICpcbiovXG5cbnZhciBqcXVlcnkgPSAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcblxuZXhwb3J0IGNsYXNzIFBmRG9udXRQY3RDaGFydEZpeGVkIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG4gICAgcHVibGljIHJlc3RyaWN0ID0gJ0EnO1xuICAgIHB1YmxpYyB0cmFuc2NsdWRlID0gdHJ1ZTtcbiAgICBwdWJsaWMgdGVtcGxhdGUgPSAnPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2Pic7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkdGltZW91dDogbmcuSVRpbWVvdXRTZXJ2aWNlKSB7fVxuICAgIHB1YmxpYyBsaW5rOm5nLklEaXJlY3RpdmVMaW5rRm4gPSAoc2NvcGU6bmcuSVNjb3BlLCBlbGVtZW50OiBKUXVlcnkpID0+IHtcbiAgICAgIHRoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBmRG9udXRQY3RDaGFydCA9IGVsZW1lbnQuZmluZCgnc3BhbicpWzBdO1xuICAgICAgICAgICAgdmFyIGlubmVyU2NvcGU6IGFueSA9IGFuZ3VsYXIuZWxlbWVudChwZkRvbnV0UGN0Q2hhcnQpLmlzb2xhdGVTY29wZSgpO1xuICAgICAgICAgICAgaW5uZXJTY29wZS51cGRhdGVBbGwgPSBmdW5jdGlvbiAoc2NvcGUpIHtcbiAgICAgICAgICAgICAgc2NvcGUudXBkYXRlQXZhaWxhYmxlKCk7XG4gICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5kYXRhID0ganF1ZXJ5LmV4dGVuZCggc2NvcGUuY29uZmlnLmRhdGEsIHNjb3BlLmdldERvbnV0RGF0YShzY29wZSkpO1xuICAgICAgICAgICAgICBzY29wZS5jb25maWcuY29sb3IgPSBzY29wZS5zdGF0dXNEb251dENvbG9yKHNjb3BlKTtcbiAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLmRhdGEub25jbGljayA9IHNjb3BlLmNvbmZpZy5vbkNsaWNrRm47XG4gICAgICAgICAgICB9O1xuICAgICAgfSwyMDApO1xuICAgIH07XG59XG5cbiJdfQ==
