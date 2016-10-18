// <reference path="../typings/tsd.d.ts" />
var HostConfigController = (function () {
    function HostConfigController(serverService) {
        var _this = this;
        this.serverService = serverService;
        this.serverService.get(this.id).then(function (host) {
            _this.host = host;
        });
    }
    //Services that are used in this class.
    HostConfigController.$inject = [
        'ServerService',
    ];
    return HostConfigController;
})();
exports.HostConfigController = HostConfigController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaG9zdHMvaG9zdC1jb25maWcvaG9zdC1jb25maWcudHMiXSwibmFtZXMiOlsiSG9zdENvbmZpZ0NvbnRyb2xsZXIiLCJIb3N0Q29uZmlnQ29udHJvbGxlci5jb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBSzNDO0lBU0lBLDhCQUFvQkEsYUFBNEJBO1FBVHBEQyxpQkFlQ0E7UUFOdUJBLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFlQTtRQUN4Q0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBQ0EsSUFBU0E7WUFDM0NBLEtBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO1FBQ3JCQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNYQSxDQUFDQTtJQVRERCx1Q0FBdUNBO0lBQ2hDQSw0QkFBT0EsR0FBa0JBO1FBQzVCQSxlQUFlQTtLQUNsQkEsQ0FBQ0E7SUFRTkEsMkJBQUNBO0FBQURBLENBZkEsQUFlQ0EsSUFBQTtBQWZZLDRCQUFvQix1QkFlaEMsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL2hvc3RzL2hvc3QtY29uZmlnL2hvc3QtY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5cbmltcG9ydCB7U2VydmVyU2VydmljZX0gZnJvbSAnLi4vLi4vcmVzdC9zZXJ2ZXInO1xuaW1wb3J0IHtOb2RlfSBmcm9tICcuLi8uLi9yZXN0L3NlcnZlcic7XG5cbmV4cG9ydCBjbGFzcyBIb3N0Q29uZmlnQ29udHJvbGxlciB7XG4gICAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuICAgIHByaXZhdGUgaG9zdDogTm9kZTtcblxuICAgIC8vU2VydmljZXMgdGhhdCBhcmUgdXNlZCBpbiB0aGlzIGNsYXNzLlxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gW1xuICAgICAgICAnU2VydmVyU2VydmljZScsXG4gICAgXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmVyU2VydmljZTogU2VydmVyU2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJTZXJ2aWNlLmdldCh0aGlzLmlkKS50aGVuKChob3N0Ok5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
