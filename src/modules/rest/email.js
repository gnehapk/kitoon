/// <reference path="../../../typings/tsd.d.ts" />
var EmailService = (function () {
    function EmailService(rest) {
        this.rest = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
        });
        this.restFull = rest.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('/api/v1/');
            RestangularConfigurer.setFullResponse(true);
        });
    }
    EmailService.prototype.saveMailSettings = function (notifier) {
        return this.restFull.all('mailnotifier').customPUT(notifier);
    };
    EmailService.prototype.testMailSettings = function (notifier) {
        return this.restFull.all('testmailnotifier').post(notifier);
    };
    EmailService.prototype.getMailNotifier = function () {
        return this.rest.one('mailnotifier').get().then(function (notifier) {
            return notifier;
        });
    };
    EmailService.$inject = ['Restangular'];
    return EmailService;
})();
exports.EmailService = EmailService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcmVzdC9lbWFpbC50cyJdLCJuYW1lcyI6WyJFbWFpbFNlcnZpY2UiLCJFbWFpbFNlcnZpY2UuY29uc3RydWN0b3IiLCJFbWFpbFNlcnZpY2Uuc2F2ZU1haWxTZXR0aW5ncyIsIkVtYWlsU2VydmljZS50ZXN0TWFpbFNldHRpbmdzIiwiRW1haWxTZXJ2aWNlLmdldE1haWxOb3RpZmllciJdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBRWxEO0lBSUlBLHNCQUFZQSxJQUE2QkE7UUFDckNDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQUNBLHFCQUFxQkE7WUFDOUNBLHFCQUFxQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFDakRBLENBQUNBLENBQUNBLENBQUNBO1FBQ0hBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQUNBLHFCQUFxQkE7WUFDbERBLHFCQUFxQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLHFCQUFxQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDaERBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBRURELHVDQUFnQkEsR0FBaEJBLFVBQWlCQSxRQUFRQTtRQUNyQkUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDakVBLENBQUNBO0lBQ0RGLHVDQUFnQkEsR0FBaEJBLFVBQWlCQSxRQUFRQTtRQUNyQkcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtJQUNoRUEsQ0FBQ0E7SUFDREgsc0NBQWVBLEdBQWZBO1FBQ0tJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLFVBQVNBLFFBQVFBO1lBQzlELE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUFDQSxDQUFDQTtJQUNQQSxDQUFDQTtJQXJCTUosb0JBQU9BLEdBQWtCQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQXNCcERBLG1CQUFDQTtBQUFEQSxDQXpCQSxBQXlCQ0EsSUFBQTtBQXpCWSxvQkFBWSxlQXlCeEIsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL3Jlc3QvZW1haWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5cbmV4cG9ydCBjbGFzcyBFbWFpbFNlcnZpY2V7XG4gICAgcmVzdDogcmVzdGFuZ3VsYXIuSVNlcnZpY2U7XG4gICAgcmVzdEZ1bGw6IHJlc3Rhbmd1bGFyLklTZXJ2aWNlO1xuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWydSZXN0YW5ndWxhciddO1xuICAgIGNvbnN0cnVjdG9yKHJlc3Q6IHJlc3Rhbmd1bGFyLklDb2xsZWN0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzdCA9IHJlc3Qud2l0aENvbmZpZygoUmVzdGFuZ3VsYXJDb25maWd1cmVyKSA9PiB7XG4gICAgICAgICAgICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIuc2V0QmFzZVVybCgnL2FwaS92MS8nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVzdEZ1bGwgPSByZXN0LndpdGhDb25maWcoKFJlc3Rhbmd1bGFyQ29uZmlndXJlcikgPT4ge1xuICAgICAgICAgICAgUmVzdGFuZ3VsYXJDb25maWd1cmVyLnNldEJhc2VVcmwoJy9hcGkvdjEvJyk7XG4gICAgICAgICAgICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIuc2V0RnVsbFJlc3BvbnNlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlTWFpbFNldHRpbmdzKG5vdGlmaWVyKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdEZ1bGwuYWxsKCdtYWlsbm90aWZpZXInKS5jdXN0b21QVVQobm90aWZpZXIpO1xuICAgIH1cbiAgICB0ZXN0TWFpbFNldHRpbmdzKG5vdGlmaWVyKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdEZ1bGwuYWxsKCd0ZXN0bWFpbG5vdGlmaWVyJykucG9zdChub3RpZmllcik7XG4gICAgfVxuICAgIGdldE1haWxOb3RpZmllcigpe1xuICAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5vbmUoJ21haWxub3RpZmllcicpLmdldCgpLnRoZW4oZnVuY3Rpb24obm90aWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBub3RpZmllcjtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==