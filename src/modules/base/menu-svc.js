/// <reference path="../../../typings/tsd.d.ts" />
var MenuService = (function () {
    function MenuService() {
        this.menus = [{
                label: 'Dashboard',
                id: 'dashboard',
                href: '/dashboard',
                icon: 'fa fa-dashboard',
                active: true
            }, {
                label: 'Clusters',
                id: 'clusters',
                href: '/clusters',
                icon: 'pficon pficon-cluster',
                active: false
            }, {
                label: 'Hosts',
                id: 'hosts',
                href: '/hosts',
                icon: 'pficon pficon-container-node',
                active: false
            }, {
                label: 'Storage',
                id: 'storage',
                href: '/storage',
                icon: 'fa fa-database',
                hasSubMenus: true,
                subMenus: [
                    {
                        title: 'Pools',
                        id: 'pools',
                        href: '#/storage',
                        active: true
                    },
                    {
                        title: 'RBDs',
                        id: 'rbds',
                        href: '#/rbds'
                    }
                ],
                active: false
            }, {
                label: 'Admin',
                id: 'admin',
                href: '/events',
                icon: 'fa fa-cog',
                hasSubMenus: true,
                subMenus: [
                    {
                        title: 'Events',
                        id: 'events',
                        href: '#/events',
                        active: true
                    },
                    {
                        title: 'Tasks',
                        id: 'tasks',
                        href: '#/tasks'
                    },
                    {
                        title: 'Users',
                        id: 'users',
                        href: '#/admin'
                    },
                    {
                        title: 'LDAP/AD Settings',
                        id: 'ldap',
                        href: '#/admin/ldap'
                    },
                    {
                        title: 'Mail Settings',
                        id: 'mail',
                        href: '#/admin/email'
                    }
                ],
                active: false
            }];
    }
    MenuService.prototype.setActive = function (menuId) {
        this.menus = _.map(this.menus, function (menu) {
            menu.active = menu.id === menuId;
            return menu;
        });
    };
    MenuService.prototype.getMenus = function () {
        return this.menus;
    };
    return MenuService;
})();
exports.MenuService = MenuService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9tZW51LXN2Yy50cyJdLCJuYW1lcyI6WyJNZW51U2VydmljZSIsIk1lbnVTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiTWVudVNlcnZpY2Uuc2V0QWN0aXZlIiwiTWVudVNlcnZpY2UuZ2V0TWVudXMiXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFrRDtBQUVsRDtJQUVJQTtRQUNJQyxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQTtnQkFDVkEsS0FBS0EsRUFBRUEsV0FBV0E7Z0JBQ2xCQSxFQUFFQSxFQUFFQSxXQUFXQTtnQkFDZkEsSUFBSUEsRUFBRUEsWUFBWUE7Z0JBQ2xCQSxJQUFJQSxFQUFFQSxpQkFBaUJBO2dCQUN2QkEsTUFBTUEsRUFBRUEsSUFBSUE7YUFDZkEsRUFBRUE7Z0JBQ0NBLEtBQUtBLEVBQUVBLFVBQVVBO2dCQUNqQkEsRUFBRUEsRUFBRUEsVUFBVUE7Z0JBQ2RBLElBQUlBLEVBQUVBLFdBQVdBO2dCQUNqQkEsSUFBSUEsRUFBRUEsdUJBQXVCQTtnQkFDN0JBLE1BQU1BLEVBQUVBLEtBQUtBO2FBQ2hCQSxFQUFFQTtnQkFDQ0EsS0FBS0EsRUFBRUEsT0FBT0E7Z0JBQ2RBLEVBQUVBLEVBQUVBLE9BQU9BO2dCQUNYQSxJQUFJQSxFQUFFQSxRQUFRQTtnQkFDZEEsSUFBSUEsRUFBRUEsOEJBQThCQTtnQkFDcENBLE1BQU1BLEVBQUVBLEtBQUtBO2FBQ2hCQSxFQUFDQTtnQkFDRUEsS0FBS0EsRUFBRUEsU0FBU0E7Z0JBQ2hCQSxFQUFFQSxFQUFFQSxTQUFTQTtnQkFDYkEsSUFBSUEsRUFBRUEsVUFBVUE7Z0JBQ2hCQSxJQUFJQSxFQUFFQSxnQkFBZ0JBO2dCQUN0QkEsV0FBV0EsRUFBRUEsSUFBSUE7Z0JBQ2pCQSxRQUFRQSxFQUFFQTtvQkFDTkE7d0JBQ0lBLEtBQUtBLEVBQUVBLE9BQU9BO3dCQUNkQSxFQUFFQSxFQUFFQSxPQUFPQTt3QkFDWEEsSUFBSUEsRUFBRUEsV0FBV0E7d0JBQ2pCQSxNQUFNQSxFQUFFQSxJQUFJQTtxQkFDZkE7b0JBQ0RBO3dCQUNJQSxLQUFLQSxFQUFFQSxNQUFNQTt3QkFDYkEsRUFBRUEsRUFBRUEsTUFBTUE7d0JBQ1ZBLElBQUlBLEVBQUVBLFFBQVFBO3FCQUNqQkE7aUJBQ0pBO2dCQUNEQSxNQUFNQSxFQUFFQSxLQUFLQTthQUNoQkEsRUFBQ0E7Z0JBQ0VBLEtBQUtBLEVBQUVBLE9BQU9BO2dCQUNkQSxFQUFFQSxFQUFFQSxPQUFPQTtnQkFDWEEsSUFBSUEsRUFBRUEsU0FBU0E7Z0JBQ2ZBLElBQUlBLEVBQUVBLFdBQVdBO2dCQUNqQkEsV0FBV0EsRUFBRUEsSUFBSUE7Z0JBQ2pCQSxRQUFRQSxFQUFFQTtvQkFDTkE7d0JBQ0lBLEtBQUtBLEVBQUVBLFFBQVFBO3dCQUNmQSxFQUFFQSxFQUFFQSxRQUFRQTt3QkFDWkEsSUFBSUEsRUFBRUEsVUFBVUE7d0JBQ2hCQSxNQUFNQSxFQUFFQSxJQUFJQTtxQkFDZkE7b0JBQ0RBO3dCQUNJQSxLQUFLQSxFQUFFQSxPQUFPQTt3QkFDZEEsRUFBRUEsRUFBRUEsT0FBT0E7d0JBQ1hBLElBQUlBLEVBQUVBLFNBQVNBO3FCQUNsQkE7b0JBQ0RBO3dCQUNJQSxLQUFLQSxFQUFFQSxPQUFPQTt3QkFDZEEsRUFBRUEsRUFBRUEsT0FBT0E7d0JBQ1hBLElBQUlBLEVBQUVBLFNBQVNBO3FCQUNsQkE7b0JBQ0RBO3dCQUNJQSxLQUFLQSxFQUFFQSxrQkFBa0JBO3dCQUN6QkEsRUFBRUEsRUFBRUEsTUFBTUE7d0JBQ1ZBLElBQUlBLEVBQUVBLGNBQWNBO3FCQUN2QkE7b0JBQ0RBO3dCQUNJQSxLQUFLQSxFQUFFQSxlQUFlQTt3QkFDdEJBLEVBQUVBLEVBQUVBLE1BQU1BO3dCQUNWQSxJQUFJQSxFQUFFQSxlQUFlQTtxQkFDeEJBO2lCQUNBQTtnQkFDTEEsTUFBTUEsRUFBRUEsS0FBS0E7YUFDaEJBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBRU1ELCtCQUFTQSxHQUFoQkEsVUFBaUJBLE1BQWNBO1FBQzNCRSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFDQSxJQUFJQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsS0FBS0EsTUFBTUEsQ0FBQ0E7WUFDakNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNQQSxDQUFDQTtJQUVNRiw4QkFBUUEsR0FBZkE7UUFDSUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7SUFDdEJBLENBQUNBO0lBQ0xILGtCQUFDQTtBQUFEQSxDQXpGQSxBQXlGQ0EsSUFBQTtBQXpGWSxtQkFBVyxjQXlGdkIsQ0FBQSIsImZpbGUiOiJtb2R1bGVzL2Jhc2UvbWVudS1zdmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vdHlwaW5ncy90c2QuZC50c1wiIC8+XG5cbmV4cG9ydCBjbGFzcyBNZW51U2VydmljZSB7XG4gICAgcHJpdmF0ZSBtZW51czogQXJyYXk8YW55PjtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tZW51cyA9IFt7XG4gICAgICAgICAgICBsYWJlbDogJ0Rhc2hib2FyZCcsXG4gICAgICAgICAgICBpZDogJ2Rhc2hib2FyZCcsXG4gICAgICAgICAgICBocmVmOiAnL2Rhc2hib2FyZCcsXG4gICAgICAgICAgICBpY29uOiAnZmEgZmEtZGFzaGJvYXJkJyxcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBsYWJlbDogJ0NsdXN0ZXJzJyxcbiAgICAgICAgICAgIGlkOiAnY2x1c3RlcnMnLFxuICAgICAgICAgICAgaHJlZjogJy9jbHVzdGVycycsXG4gICAgICAgICAgICBpY29uOiAncGZpY29uIHBmaWNvbi1jbHVzdGVyJyxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgbGFiZWw6ICdIb3N0cycsXG4gICAgICAgICAgICBpZDogJ2hvc3RzJyxcbiAgICAgICAgICAgIGhyZWY6ICcvaG9zdHMnLFxuICAgICAgICAgICAgaWNvbjogJ3BmaWNvbiBwZmljb24tY29udGFpbmVyLW5vZGUnLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgICB9LHtcbiAgICAgICAgICAgIGxhYmVsOiAnU3RvcmFnZScsXG4gICAgICAgICAgICBpZDogJ3N0b3JhZ2UnLFxuICAgICAgICAgICAgaHJlZjogJy9zdG9yYWdlJyxcbiAgICAgICAgICAgIGljb246ICdmYSBmYS1kYXRhYmFzZScsXG4gICAgICAgICAgICBoYXNTdWJNZW51czogdHJ1ZSxcbiAgICAgICAgICAgIHN1Yk1lbnVzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1Bvb2xzJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwb29scycsXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjL3N0b3JhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdSQkRzJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdyYmRzJyxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvcmJkcydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZVxuICAgICAgICB9LHtcbiAgICAgICAgICAgIGxhYmVsOiAnQWRtaW4nLFxuICAgICAgICAgICAgaWQ6ICdhZG1pbicsXG4gICAgICAgICAgICBocmVmOiAnL2V2ZW50cycsXG4gICAgICAgICAgICBpY29uOiAnZmEgZmEtY29nJyxcbiAgICAgICAgICAgIGhhc1N1Yk1lbnVzOiB0cnVlLFxuICAgICAgICAgICAgc3ViTWVudXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnRXZlbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdldmVudHMnLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiAnIy9ldmVudHMnLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdUYXNrcycsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAndGFza3MnLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiAnIy90YXNrcydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdVc2VycycsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAndXNlcnMnLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiAnIy9hZG1pbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdMREFQL0FEIFNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdsZGFwJyxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvYWRtaW4vbGRhcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdNYWlsIFNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdtYWlsJyxcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogJyMvYWRtaW4vZW1haWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlXG4gICAgICAgIH1dO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBY3RpdmUobWVudUlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5tZW51cyA9IF8ubWFwKHRoaXMubWVudXMsIChtZW51KSA9PiB7XG4gICAgICAgICAgICBtZW51LmFjdGl2ZSA9IG1lbnUuaWQgPT09IG1lbnVJZDtcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWVudXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lbnVzO1xuICAgIH1cbn1cbiJdfQ==
