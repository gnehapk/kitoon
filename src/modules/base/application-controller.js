/// <reference path="../../../typings/tsd.d.ts" />
var ApplicationController = (function () {
    function ApplicationController($scope, locationService, userService) {
        $scope.expandedView = true;
        $scope.$on("$routeChangeStart", function (event, next, current) {
            userService.getCurrentUser().catch(function () {
                locationService.path('/');
            });
        });
    }
    ApplicationController.$inject = ['$scope', '$location', 'UserService'];
    return ApplicationController;
})();
exports.ApplicationController = ApplicationController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbIkFwcGxpY2F0aW9uQ29udHJvbGxlciIsIkFwcGxpY2F0aW9uQ29udHJvbGxlci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBSWxEO0lBRUlBLCtCQUFZQSxNQUFXQSxFQUFFQSxlQUFvQ0EsRUFBRUEsV0FBd0JBO1FBQ25GQyxNQUFNQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUUzQkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsbUJBQW1CQSxFQUFFQSxVQUFTQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxPQUFPQTtZQUN0RCxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUMvQixlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDQSxDQUFDQTtJQUNQQSxDQUFDQTtJQVRNRCw2QkFBT0EsR0FBa0JBLENBQUNBLFFBQVFBLEVBQUVBLFdBQVdBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO0lBVTNFQSw0QkFBQ0E7QUFBREEsQ0FYQSxBQVdDQSxJQUFBO0FBWFksNkJBQXFCLHdCQVdqQyxDQUFBIiwiZmlsZSI6Im1vZHVsZXMvYmFzZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5pbXBvcnQge1VzZXJTZXJ2aWNlfSBmcm9tICcuLi9yZXN0L3VzZXInO1xuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25Db250cm9sbGVyIHtcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyRsb2NhdGlvbicsICdVc2VyU2VydmljZSddO1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZTogYW55LCBsb2NhdGlvblNlcnZpY2U6IG5nLklMb2NhdGlvblNlcnZpY2UsIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgICAgICAkc2NvcGUuZXhwYW5kZWRWaWV3ID0gdHJ1ZTtcblxuICAgICAgICAkc2NvcGUuJG9uKCBcIiRyb3V0ZUNoYW5nZVN0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0LCBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdXNlclNlcnZpY2UuZ2V0Q3VycmVudFVzZXIoKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uU2VydmljZS5wYXRoKCcvJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
