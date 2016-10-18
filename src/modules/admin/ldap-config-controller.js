var LdapConfigController = (function () {
    function LdapConfigController($location, LdapService) {
        this.$location = $location;
        this.LdapService = LdapService;
        this.getConfig();
    }
    LdapConfigController.prototype.save = function () {
        var _this = this;
        var config = {
            ldaptype: this.ldapType,
            ldapserver: this.ldapServer,
            port: parseInt(this.port),
            base: this.base,
            domainadmin: this.domainAdmin,
            password: this.password
        };
        this.LdapService.saveLdapConfig(config).then(function (result) {
            if (result.status === 200) {
                _this.errorMsg = false;
            }
            else {
                _this.errorMsg = true;
            }
        });
    };
    LdapConfigController.prototype.getConfig = function () {
        var _this = this;
        this.LdapService.getLdapConfig().then(function (config) {
            _this.ldapType = config.ldaptype,
                _this.ldapServer = config.ldapserver,
                _this.port = config.port,
                _this.base = config.base,
                _this.domainAdmin = config.domainadmin;
        });
    };
    LdapConfigController.$inject = [
        '$location',
        'LdapService',
    ];
    return LdapConfigController;
})();
exports.LdapConfigController = LdapConfigController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYWRtaW4vbGRhcC1jb25maWctY29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJMZGFwQ29uZmlnQ29udHJvbGxlciIsIkxkYXBDb25maWdDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTGRhcENvbmZpZ0NvbnRyb2xsZXIuc2F2ZSIsIkxkYXBDb25maWdDb250cm9sbGVyLmdldENvbmZpZyJdLCJtYXBwaW5ncyI6IkFBRUE7SUFjSUEsOEJBQ1lBLFNBQThCQSxFQUM5QkEsV0FBd0JBO1FBRHhCQyxjQUFTQSxHQUFUQSxTQUFTQSxDQUFxQkE7UUFDOUJBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFhQTtRQUM1QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7SUFDekJBLENBQUNBO0lBRU1ELG1DQUFJQSxHQUFYQTtRQUFBRSxpQkFpQkVBO1FBaEJFQSxJQUFJQSxNQUFNQSxHQUFHQTtZQUNUQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQTtZQUN2QkEsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUE7WUFDM0JBLElBQUlBLEVBQUVBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBQ3pCQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQTtZQUNmQSxXQUFXQSxFQUFFQSxJQUFJQSxDQUFDQSxXQUFXQTtZQUM3QkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7U0FDMUJBLENBQUNBO1FBRUZBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLE1BQU1BO1lBQ2hEQSxFQUFFQSxDQUFBQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkJBLEtBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1lBQzFCQSxDQUFDQTtZQUFBQSxJQUFJQSxDQUFBQSxDQUFDQTtnQkFDRkEsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDekJBLENBQUNBO1FBQ0xBLENBQUNBLENBQUNBLENBQUNBO0lBQ05BLENBQUNBO0lBRU1GLHdDQUFTQSxHQUFoQkE7UUFBQUcsaUJBUUNBO1FBUEdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLE1BQU1BO1lBQzFDQSxLQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQTtnQkFDL0JBLEtBQUlBLENBQUNBLFVBQVVBLEdBQUdBLE1BQU1BLENBQUNBLFVBQVVBO2dCQUNuQ0EsS0FBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUE7Z0JBQ3ZCQSxLQUFJQSxDQUFDQSxJQUFJQSxHQUFJQSxNQUFNQSxDQUFDQSxJQUFJQTtnQkFDeEJBLEtBQUlBLENBQUNBLFdBQVdBLEdBQUdBLE1BQU1BLENBQUNBLFdBQVdBLENBQUFBO1FBQ3pDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNOQSxDQUFDQTtJQXRDS0gsNEJBQU9BLEdBQWtCQTtRQUM1QkEsV0FBV0E7UUFDWEEsYUFBYUE7S0FDaEJBLENBQUNBO0lBcUNOQSwyQkFBQ0E7QUFBREEsQ0FqREEsQUFpRENBLElBQUE7QUFqRFksNEJBQW9CLHVCQWlEaEMsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL2FkbWluL2xkYXAtY29uZmlnLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xkYXBTZXJ2aWNlfSBmcm9tICcuLi9yZXN0L2xkYXAnO1xuXG5leHBvcnQgY2xhc3MgTGRhcENvbmZpZ0NvbnRyb2xsZXIge1xuICAgIHByaXZhdGUgZXJyb3JNc2c6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBsZGFwVHlwZTogc3RyaW5nO1xuICAgIHByaXZhdGUgbGRhcFNlcnZlciA6IHN0cmluZztcbiAgICBwcml2YXRlIHBvcnQ6IHN0cmluZztcbiAgICBwcml2YXRlIGJhc2U6IHN0cmluZztcbiAgICBwcml2YXRlIGRvbWFpbkFkbWluOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmc7XG5cbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAgICAgJyRsb2NhdGlvbicsXG4gICAgICAgICdMZGFwU2VydmljZScsXG4gICAgXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlICRsb2NhdGlvbjogbmcuSUxvY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBMZGFwU2VydmljZTogTGRhcFNlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29uZmlnKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmUoKTp2b2lkIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGxkYXB0eXBlOiB0aGlzLmxkYXBUeXBlLFxuICAgICAgICAgICAgbGRhcHNlcnZlcjogdGhpcy5sZGFwU2VydmVyLFxuICAgICAgICAgICAgcG9ydDogcGFyc2VJbnQodGhpcy5wb3J0KSxcbiAgICAgICAgICAgIGJhc2U6IHRoaXMuYmFzZSxcbiAgICAgICAgICAgIGRvbWFpbmFkbWluOiB0aGlzLmRvbWFpbkFkbWluLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLkxkYXBTZXJ2aWNlLnNhdmVMZGFwQ29uZmlnKGNvbmZpZykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHQuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZmFsc2U7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgIH1cblxuICAgICBwdWJsaWMgZ2V0Q29uZmlnKCl7XG4gICAgICAgICB0aGlzLkxkYXBTZXJ2aWNlLmdldExkYXBDb25maWcoKS50aGVuKChjb25maWcpPT57XG4gICAgICAgICAgICB0aGlzLmxkYXBUeXBlID0gY29uZmlnLmxkYXB0eXBlLFxuICAgICAgICAgICAgdGhpcy5sZGFwU2VydmVyID0gY29uZmlnLmxkYXBzZXJ2ZXIsXG4gICAgICAgICAgICB0aGlzLnBvcnQgPSBjb25maWcucG9ydCxcbiAgICAgICAgICAgIHRoaXMuYmFzZSA9ICBjb25maWcuYmFzZSxcbiAgICAgICAgICAgIHRoaXMuZG9tYWluQWRtaW4gPSBjb25maWcuZG9tYWluYWRtaW5cbiAgICAgICAgfSk7XG4gICAgIH1cblxufVxuIl19