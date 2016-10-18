// <reference path="../../../typings/tsd.d.ts" />
var EventDetailController = (function () {
    function EventDetailController($scope, $interval, routeParamsSvc, eventSvc, growl) {
        this.$scope = $scope;
        this.$interval = $interval;
        this.routeParamsSvc = routeParamsSvc;
        this.eventSvc = eventSvc;
        this.growl = growl;
        this.eventId = this.routeParamsSvc['eventId'];
        this.refresh();
    }
    EventDetailController.prototype.refresh = function () {
        var _this = this;
        this.eventSvc.get(this.eventId).then(function (event) {
            _this.detail = event;
        });
    };
    EventDetailController.prototype.dismiss = function () {
        var _this = this;
        this.eventSvc.dismiss(this.eventId, this.dismissMessage).then(function (status) {
            _this.growl.success("Event Dismissed");
            _this.refresh();
        }).catch(function (status) {
            _this.errorMessage = status.data;
            _this.growl.error(status.data);
        });
    };
    EventDetailController.$inject = [
        '$scope',
        '$interval',
        '$routeParams',
        'EventService',
        'growl'
    ];
    return EventDetailController;
})();
exports.EventDetailController = EventDetailController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvZXZlbnRzL2V2ZW50LWRldGFpbC1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbIkV2ZW50RGV0YWlsQ29udHJvbGxlciIsIkV2ZW50RGV0YWlsQ29udHJvbGxlci5jb25zdHJ1Y3RvciIsIkV2ZW50RGV0YWlsQ29udHJvbGxlci5yZWZyZXNoIiwiRXZlbnREZXRhaWxDb250cm9sbGVyLmRpc21pc3MiXSwibWFwcGluZ3MiOiJBQUFBLGlEQUFpRDtBQUlqRDtJQVlJQSwrQkFDWUEsTUFBaUJBLEVBQ2pCQSxTQUE4QkEsRUFDOUJBLGNBQTRDQSxFQUM1Q0EsUUFBc0JBLEVBQ3RCQSxLQUFVQTtRQUpWQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUFXQTtRQUNqQkEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1FBQzlCQSxtQkFBY0EsR0FBZEEsY0FBY0EsQ0FBOEJBO1FBQzVDQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFjQTtRQUN0QkEsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBS0E7UUFDbEJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1FBQzlDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtJQUNuQkEsQ0FBQ0E7SUFFTUQsdUNBQU9BLEdBQWRBO1FBQUFFLGlCQUlDQTtRQUhHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFBQSxLQUFLQTtZQUN0Q0EsS0FBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDeEJBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBRU1GLHVDQUFPQSxHQUFkQTtRQUFBRyxpQkFRQ0E7UUFQR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQUEsTUFBTUE7WUFDaEVBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7WUFDdENBLEtBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQ25CQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxVQUFBQSxNQUFNQTtZQUNYQSxLQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNoQ0EsS0FBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDbENBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBL0JNSCw2QkFBT0EsR0FBa0JBO1FBQzVCQSxRQUFRQTtRQUNSQSxXQUFXQTtRQUNYQSxjQUFjQTtRQUNkQSxjQUFjQTtRQUNkQSxPQUFPQTtLQUNWQSxDQUFDQTtJQTBCTkEsNEJBQUNBO0FBQURBLENBckNBLEFBcUNDQSxJQUFBO0FBckNZLDZCQUFxQix3QkFxQ2pDLENBQUEiLCJmaWxlIjoibW9kdWxlcy9ldmVudHMvZXZlbnQtZGV0YWlsLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cblxuaW1wb3J0IHtFdmVudFNlcnZpY2V9IGZyb20gJy4uL3Jlc3QvZXZlbnRzJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50RGV0YWlsQ29udHJvbGxlciB7XG4gICAgcHJpdmF0ZSBldmVudElkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBkZXRhaWw6IGFueTtcbiAgICBwcml2YXRlIGRpc21pc3NNZXNzYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBlcnJvck1lc3NhZ2U6IHN0cmluZztcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAgICAgJyRzY29wZScsXG4gICAgICAgICckaW50ZXJ2YWwnLFxuICAgICAgICAnJHJvdXRlUGFyYW1zJyxcbiAgICAgICAgJ0V2ZW50U2VydmljZScsXG4gICAgICAgICdncm93bCdcbiAgICBdO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlICRzY29wZTogbmcuSVNjb3BlLFxuICAgICAgICBwcml2YXRlICRpbnRlcnZhbDogbmcuSUludGVydmFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZVBhcmFtc1N2Yzogbmcucm91dGUuSVJvdXRlUGFyYW1zU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBldmVudFN2YzogRXZlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGdyb3dsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5ldmVudElkID0gdGhpcy5yb3V0ZVBhcmFtc1N2Y1snZXZlbnRJZCddO1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5ldmVudFN2Yy5nZXQodGhpcy5ldmVudElkKS50aGVuKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsID0gZXZlbnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNtaXNzKCkge1xuICAgICAgICB0aGlzLmV2ZW50U3ZjLmRpc21pc3ModGhpcy5ldmVudElkLCB0aGlzLmRpc21pc3NNZXNzYWdlKS50aGVuKHN0YXR1cyA9PiB7XG4gICAgICAgICAgICB0aGlzLmdyb3dsLnN1Y2Nlc3MoXCJFdmVudCBEaXNtaXNzZWRcIik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfSkuY2F0Y2goc3RhdHVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gc3RhdHVzLmRhdGE7XG4gICAgICAgICAgICB0aGlzLmdyb3dsLmVycm9yKHN0YXR1cy5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19