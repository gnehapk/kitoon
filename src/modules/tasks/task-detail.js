// <reference path="../../../typings/tsd.d.ts" />
/**
 * @ngdoc directive
 * @name kitoon.tasks.taskDetail
 * @scope
 * $restrict E
 *
 * @description
 * An AngularJS Directive for showing details of Task
 *
 * @example
 * <task-detail task-id="tasks.taskId"></task-detail>
 */
var task_detail_controller_1 = require("./task-detail-controller");
var TaskDetail = (function () {
    function TaskDetail() {
        this.restrict = 'E';
        this.scope = {
            taskId: '=taskId'
        };
        this.controller = task_detail_controller_1.TaskDetailController;
        this.controllerAs = 'task';
        this.bindToController = true;
        this.templateUrl = 'views/tasks/task-details.html';
    }
    return TaskDetail;
})();
exports.TaskDetail = TaskDetail;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvdGFza3MvdGFzay1kZXRhaWwudHMiXSwibmFtZXMiOlsiVGFza0RldGFpbCIsIlRhc2tEZXRhaWwuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLGlEQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7R0FXRztBQUVILHVDQUFtQywwQkFBMEIsQ0FBQyxDQUFBO0FBRTlEO0lBQUFBO1FBQ0lDLGFBQVFBLEdBQUdBLEdBQUdBLENBQUNBO1FBQ2ZBLFVBQUtBLEdBQUdBO1lBQ0pBLE1BQU1BLEVBQUVBLFNBQVNBO1NBQ3BCQSxDQUFDQTtRQUNGQSxlQUFVQSxHQUFHQSw2Q0FBb0JBLENBQUNBO1FBQ2xDQSxpQkFBWUEsR0FBR0EsTUFBTUEsQ0FBQ0E7UUFDdEJBLHFCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDeEJBLGdCQUFXQSxHQUFHQSwrQkFBK0JBLENBQUNBO0lBQ2xEQSxDQUFDQTtJQUFERCxpQkFBQ0E7QUFBREEsQ0FUQSxBQVNDQSxJQUFBO0FBVFksa0JBQVUsYUFTdEIsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL3Rhc2tzL3Rhc2stZGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUga2l0b29uLnRhc2tzLnRhc2tEZXRhaWxcbiAqIEBzY29wZVxuICogJHJlc3RyaWN0IEVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIEFuZ3VsYXJKUyBEaXJlY3RpdmUgZm9yIHNob3dpbmcgZGV0YWlscyBvZiBUYXNrXG4gKlxuICogQGV4YW1wbGVcbiAqIDx0YXNrLWRldGFpbCB0YXNrLWlkPVwidGFza3MudGFza0lkXCI+PC90YXNrLWRldGFpbD5cbiAqL1xuXG5pbXBvcnQge1Rhc2tEZXRhaWxDb250cm9sbGVyfSBmcm9tIFwiLi90YXNrLWRldGFpbC1jb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrRGV0YWlsIGltcGxlbWVudHMgbmcuSURpcmVjdGl2ZSB7XG4gICAgcmVzdHJpY3QgPSAnRSc7XG4gICAgc2NvcGUgPSB7XG4gICAgICAgIHRhc2tJZDogJz10YXNrSWQnXG4gICAgfTtcbiAgICBjb250cm9sbGVyID0gVGFza0RldGFpbENvbnRyb2xsZXI7XG4gICAgY29udHJvbGxlckFzID0gJ3Rhc2snO1xuICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xuICAgIHRlbXBsYXRlVXJsID0gJ3ZpZXdzL3Rhc2tzL3Rhc2stZGV0YWlscy5odG1sJztcbn0iXX0=
