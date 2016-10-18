/// <reference path="../../../typings/tsd.d.ts" />
var RouteConfig = (function () {
    function RouteConfig(routeProvider) {
        this.routeProvider = routeProvider;
        routeProvider.when('/', {
            templateUrl: 'views/login/login.html',
            name: '',
            controller: 'LoginController',
            controllerAs: 'login'
        }).when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            name: 'dashboard',
            controller: 'DashboardController',
            controllerAs: 'dash'
        }).when('/first', {
            templateUrl: 'views/first/first.html',
            name: '',
            controller: 'FirstController',
            controllerAs: 'first'
        }).when('/clusters', {
            templateUrl: 'views/clusters/clusters.html',
            name: 'clusters',
            controller: 'ClusterController',
            controllerAs: 'clusters'
        }).when('/clusters/new', {
            templateUrl: 'views/clusters/clusters-new.html',
            name: 'clusters',
            controller: 'ClusterNewController',
            controllerAs: 'cluster'
        }).when('/clusters/new/accept-hosts', {
            templateUrl: 'views/clusters/accept-hosts.html',
            controller: 'AcceptHostsController',
            controllerAs: 'hosts'
        }).when('/clusters/expand/:id', {
            templateUrl: 'views/clusters/clusters-expand.html',
            name: 'clusters',
            controller: 'ClusterExpandController',
            controllerAs: 'cluster'
        }).when('/clusters/import', {
            templateUrl: 'views/clusters/import-cluster/import-cluster.html',
            name: 'clusters',
            controller: 'ImportClusterController',
            controllerAs: 'cluster'
        }).when('/clusters/:id', {
            templateUrl: 'views/clusters/clusters-detail.html',
            name: 'clusters',
            controller: 'ClusterDetailController',
            controllerAs: 'clusterdetail'
        }).when('/hosts', {
            templateUrl: 'views/hosts/host-list.html',
            name: 'hosts',
            controller: 'HostListController',
            controllerAs: 'hosts'
        }).when('/hosts/:id', {
            templateUrl: 'views/hosts/host-details/hosts-detail.html',
            name: 'hosts',
            controller: 'HostDetailController',
            controllerAs: 'hostdetail'
        }).when('/storage', {
            templateUrl: 'views/storage/object/pools.html',
            name: 'storage'
        }).when('/storage/new', {
            templateUrl: 'views/storage/storage-new.html',
            name: 'storage',
            controller: 'StorageNewController',
            controllerAs: 'storages'
        }).when('/storage/new/object/:clusterid', {
            templateUrl: 'views/storage/object/objectstorage-new.html',
            name: 'storage',
            controller: 'ObjectStorageController',
            controllerAs: 'storage'
        }).when('/rbds', {
            templateUrl: 'views/storage/blockdevice/blockdevices.html',
            name: 'storage'
        }).when('/storage/new/block/:clusterid', {
            templateUrl: 'views/storage/blockdevice/blockdevice-new.html',
            name: 'storage',
            controller: 'BlockDeviceController',
            controllerAs: 'storage'
        }).when('/pools', {
            templateUrl: 'views/pools/pools.html',
            name: 'storage',
            controller: 'PoolController',
            controllerAs: 'pools'
        }).when('/pools/new', {
            templateUrl: 'views/pools/pools-new.html',
            name: 'pools',
            controller: 'PoolNewController',
            controllerAs: 'pool'
        }).when('/admin', {
            templateUrl: 'views/admin/admin.html',
            controller: 'UserController',
            controllerAs: 'users',
            name: 'admin'
        }).when('/admin/new', {
            templateUrl: 'views/admin/add-user.html',
            controller: 'UserNewController',
            controllerAs: 'user',
        }).when('/admin/edit/:userid', {
            templateUrl: 'views/admin/edit-user.html',
            controller: 'UserEditController',
            controllerAs: 'userEdit',
        }).when('/admin/newLdap', {
            templateUrl: 'views/admin/add-ldap-user.html',
            controller: 'LdapUserController',
            controllerAs: 'ldapUsers',
        }).when('/admin/ldap', {
            templateUrl: 'views/admin/ldap-settings.html',
            controller: 'LdapConfigController',
            controllerAs: 'ldap',
            name: 'admin'
        }).when('/admin/email', {
            templateUrl: 'views/admin/mail-settings.html',
            controller: 'EmailController',
            controllerAs: 'mail',
            name: 'admin'
        }).when('/events', {
            templateUrl: 'views/events/event-list.html',
            controller: 'EventListController',
            controllerAs: 'events',
            name: 'admin'
        }).when('/events/:eventId', {
            templateUrl: 'views/events/event-details.html',
            controller: 'EventDetailController',
            controllerAs: 'event'
        }).when('/tasks', {
            templateUrl: 'views/tasks/task-list.html',
            controller: 'TaskListController',
            controllerAs: 'tasks',
            name: 'admin'
        }).when('/tasks/:taskId', {
            templateUrl: 'views/tasks/task-details.html',
            controller: 'TaskDetailController',
            controllerAs: 'task'
        }).otherwise({
            redirectTo: '/'
        });
    }
    RouteConfig.$inject = ['$routeProvider'];
    return RouteConfig;
})();
exports.RouteConfig = RouteConfig;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcm91dGVyL3JvdXRlLWNvbmZpZy50cyJdLCJuYW1lcyI6WyJSb3V0ZUNvbmZpZyIsIlJvdXRlQ29uZmlnLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSxrREFBa0Q7QUFFbEQ7SUFFQ0EscUJBQW9CQSxhQUFzQ0E7UUFBdENDLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUF5QkE7UUFDekRBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBO1lBQ3ZCQSxXQUFXQSxFQUFFQSx3QkFBd0JBO1lBQ3JDQSxJQUFJQSxFQUFFQSxFQUFFQTtZQUNSQSxVQUFVQSxFQUFFQSxpQkFBaUJBO1lBQzdCQSxZQUFZQSxFQUFFQSxPQUFPQTtTQUNyQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUE7WUFDckJBLFdBQVdBLEVBQUVBLGdDQUFnQ0E7WUFDN0NBLElBQUlBLEVBQUVBLFdBQVdBO1lBQ2pCQSxVQUFVQSxFQUFFQSxxQkFBcUJBO1lBQ2pDQSxZQUFZQSxFQUFFQSxNQUFNQTtTQUNwQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUE7WUFDakJBLFdBQVdBLEVBQUVBLHdCQUF3QkE7WUFDckNBLElBQUlBLEVBQUVBLEVBQUVBO1lBQ1JBLFVBQVVBLEVBQUVBLGlCQUFpQkE7WUFDN0JBLFlBQVlBLEVBQUVBLE9BQU9BO1NBQ3JCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQTtZQUNwQkEsV0FBV0EsRUFBRUEsOEJBQThCQTtZQUMzQ0EsSUFBSUEsRUFBRUEsVUFBVUE7WUFDaEJBLFVBQVVBLEVBQUVBLG1CQUFtQkE7WUFDdEJBLFlBQVlBLEVBQUVBLFVBQVVBO1NBQ2pDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxFQUFFQTtZQUN4QkEsV0FBV0EsRUFBRUEsa0NBQWtDQTtZQUMvQ0EsSUFBSUEsRUFBRUEsVUFBVUE7WUFDaEJBLFVBQVVBLEVBQUVBLHNCQUFzQkE7WUFDbENBLFlBQVlBLEVBQUVBLFNBQVNBO1NBQ3ZCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSw0QkFBNEJBLEVBQUVBO1lBQzVCQSxXQUFXQSxFQUFFQSxrQ0FBa0NBO1lBQy9DQSxVQUFVQSxFQUFFQSx1QkFBdUJBO1lBQ25DQSxZQUFZQSxFQUFFQSxPQUFPQTtTQUN4QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxFQUFFQTtZQUNyQ0EsV0FBV0EsRUFBRUEscUNBQXFDQTtZQUNsREEsSUFBSUEsRUFBRUEsVUFBVUE7WUFDaEJBLFVBQVVBLEVBQUVBLHlCQUF5QkE7WUFDckNBLFlBQVlBLEVBQUVBLFNBQVNBO1NBQ3ZCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEVBQUVBO1lBQzNCQSxXQUFXQSxFQUFFQSxtREFBbURBO1lBQ2hFQSxJQUFJQSxFQUFFQSxVQUFVQTtZQUNoQkEsVUFBVUEsRUFBRUEseUJBQXlCQTtZQUNyQ0EsWUFBWUEsRUFBRUEsU0FBU0E7U0FDdkJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLEVBQUVBO1lBQ3hCQSxXQUFXQSxFQUFFQSxxQ0FBcUNBO1lBQ2xEQSxJQUFJQSxFQUFFQSxVQUFVQTtZQUNoQkEsVUFBVUEsRUFBRUEseUJBQXlCQTtZQUNyQ0EsWUFBWUEsRUFBRUEsZUFBZUE7U0FDN0JBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBO1lBQ2pCQSxXQUFXQSxFQUFFQSw0QkFBNEJBO1lBQ3pDQSxJQUFJQSxFQUFFQSxPQUFPQTtZQUNiQSxVQUFVQSxFQUFFQSxvQkFBb0JBO1lBQ2hDQSxZQUFZQSxFQUFFQSxPQUFPQTtTQUNyQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUE7WUFDckJBLFdBQVdBLEVBQUVBLDRDQUE0Q0E7WUFDekRBLElBQUlBLEVBQUVBLE9BQU9BO1lBQ2JBLFVBQVVBLEVBQUVBLHNCQUFzQkE7WUFDbENBLFlBQVlBLEVBQUVBLFlBQVlBO1NBQzFCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQTtZQUNuQkEsV0FBV0EsRUFBRUEsaUNBQWlDQTtZQUM5Q0EsSUFBSUEsRUFBRUEsU0FBU0E7U0FDZkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUE7WUFDdkJBLFdBQVdBLEVBQUVBLGdDQUFnQ0E7WUFDN0NBLElBQUlBLEVBQUVBLFNBQVNBO1lBQ2ZBLFVBQVVBLEVBQUVBLHNCQUFzQkE7WUFDbENBLFlBQVlBLEVBQUVBLFVBQVVBO1NBQ3hCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQ0FBZ0NBLEVBQUVBO1lBQ3pDQSxXQUFXQSxFQUFFQSw2Q0FBNkNBO1lBQzFEQSxJQUFJQSxFQUFFQSxTQUFTQTtZQUNmQSxVQUFVQSxFQUFFQSx5QkFBeUJBO1lBQ3JDQSxZQUFZQSxFQUFFQSxTQUFTQTtTQUN2QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUE7WUFDaEJBLFdBQVdBLEVBQUVBLDZDQUE2Q0E7WUFDMURBLElBQUlBLEVBQUVBLFNBQVNBO1NBQ2ZBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLCtCQUErQkEsRUFBRUE7WUFDeENBLFdBQVdBLEVBQUVBLGdEQUFnREE7WUFDN0RBLElBQUlBLEVBQUVBLFNBQVNBO1lBQ2ZBLFVBQVVBLEVBQUVBLHVCQUF1QkE7WUFDbkNBLFlBQVlBLEVBQUVBLFNBQVNBO1NBQ3ZCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQTtZQUNqQkEsV0FBV0EsRUFBRUEsd0JBQXdCQTtZQUNyQ0EsSUFBSUEsRUFBRUEsU0FBU0E7WUFDZkEsVUFBVUEsRUFBRUEsZ0JBQWdCQTtZQUM1QkEsWUFBWUEsRUFBRUEsT0FBT0E7U0FDckJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBO1lBQ3JCQSxXQUFXQSxFQUFFQSw0QkFBNEJBO1lBQ3pDQSxJQUFJQSxFQUFFQSxPQUFPQTtZQUNiQSxVQUFVQSxFQUFFQSxtQkFBbUJBO1lBQy9CQSxZQUFZQSxFQUFFQSxNQUFNQTtTQUNwQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsRUFBRUE7WUFDakJBLFdBQVdBLEVBQUVBLHdCQUF3QkE7WUFDckNBLFVBQVVBLEVBQUVBLGdCQUFnQkE7WUFDNUJBLFlBQVlBLEVBQUVBLE9BQU9BO1lBQ3JCQSxJQUFJQSxFQUFFQSxPQUFPQTtTQUNiQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQTtZQUNyQkEsV0FBV0EsRUFBRUEsMkJBQTJCQTtZQUN4Q0EsVUFBVUEsRUFBRUEsbUJBQW1CQTtZQUMvQkEsWUFBWUEsRUFBRUEsTUFBTUE7U0FDcEJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsRUFBRUE7WUFDOUJBLFdBQVdBLEVBQUVBLDRCQUE0QkE7WUFDekNBLFVBQVVBLEVBQUVBLG9CQUFvQkE7WUFDaENBLFlBQVlBLEVBQUVBLFVBQVVBO1NBQ3hCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBO1lBQ3pCQSxXQUFXQSxFQUFFQSxnQ0FBZ0NBO1lBQzdDQSxVQUFVQSxFQUFFQSxvQkFBb0JBO1lBQ2hDQSxZQUFZQSxFQUFFQSxXQUFXQTtTQUN6QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUE7WUFDdEJBLFdBQVdBLEVBQUVBLGdDQUFnQ0E7WUFDN0NBLFVBQVVBLEVBQUVBLHNCQUFzQkE7WUFDbENBLFlBQVlBLEVBQUVBLE1BQU1BO1lBQ3BCQSxJQUFJQSxFQUFFQSxPQUFPQTtTQUNiQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQTtZQUNkQSxXQUFXQSxFQUFFQSxnQ0FBZ0NBO1lBQzdDQSxVQUFVQSxFQUFFQSxpQkFBaUJBO1lBQzdCQSxZQUFZQSxFQUFFQSxNQUFNQTtZQUNwQkEsSUFBSUEsRUFBRUEsT0FBT0E7U0FDaEJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBO1lBQ3hCQSxXQUFXQSxFQUFFQSw4QkFBOEJBO1lBQzNDQSxVQUFVQSxFQUFFQSxxQkFBcUJBO1lBQ2pDQSxZQUFZQSxFQUFFQSxRQUFRQTtZQUN0QkEsSUFBSUEsRUFBRUEsT0FBT0E7U0FDYkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQTtZQUMzQkEsV0FBV0EsRUFBRUEsaUNBQWlDQTtZQUM5Q0EsVUFBVUEsRUFBRUEsdUJBQXVCQTtZQUNuQ0EsWUFBWUEsRUFBRUEsT0FBT0E7U0FDckJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBO1lBQ2pCQSxXQUFXQSxFQUFFQSw0QkFBNEJBO1lBQ3pDQSxVQUFVQSxFQUFFQSxvQkFBb0JBO1lBQ2hDQSxZQUFZQSxFQUFFQSxPQUFPQTtZQUNyQkEsSUFBSUEsRUFBRUEsT0FBT0E7U0FDYkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQTtZQUN6QkEsV0FBV0EsRUFBRUEsK0JBQStCQTtZQUM1Q0EsVUFBVUEsRUFBRUEsc0JBQXNCQTtZQUNsQ0EsWUFBWUEsRUFBRUEsTUFBTUE7U0FDcEJBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBO1lBQ1pBLFVBQVVBLEVBQUVBLEdBQUdBO1NBQ2ZBLENBQUNBLENBQUNBO0lBQ0pBLENBQUNBO0lBdklNRCxtQkFBT0EsR0FBa0JBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7SUF3SXBEQSxrQkFBQ0E7QUFBREEsQ0F6SUEsQUF5SUNBLElBQUE7QUF6SVksbUJBQVcsY0F5SXZCLENBQUEiLCJmaWxlIjoibW9kdWxlcy9yb3V0ZXIvcm91dGUtY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5leHBvcnQgY2xhc3MgUm91dGVDb25maWcge1xuXHRzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHJvdXRlUHJvdmlkZXInXTtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZVByb3ZpZGVyOiBuZy5yb3V0ZS5JUm91dGVQcm92aWRlcikge1xuXHRcdHJvdXRlUHJvdmlkZXIud2hlbignLycsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0XHRuYW1lOiAnJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAnbG9naW4nXG5cdFx0fSkud2hlbignL2Rhc2hib2FyZCcsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvZGFzaGJvYXJkL2Rhc2hib2FyZC5odG1sJyxcblx0XHRcdG5hbWU6ICdkYXNoYm9hcmQnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAnZGFzaCdcblx0XHR9KS53aGVuKCcvZmlyc3QnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2ZpcnN0L2ZpcnN0Lmh0bWwnLFxuXHRcdFx0bmFtZTogJycsXG5cdFx0XHRjb250cm9sbGVyOiAnRmlyc3RDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ2ZpcnN0J1xuXHRcdH0pLndoZW4oJy9jbHVzdGVycycsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvY2x1c3RlcnMvY2x1c3RlcnMuaHRtbCcsXG5cdFx0XHRuYW1lOiAnY2x1c3RlcnMnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0NsdXN0ZXJDb250cm9sbGVyJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2NsdXN0ZXJzJ1xuXHRcdH0pLndoZW4oJy9jbHVzdGVycy9uZXcnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NsdXN0ZXJzL2NsdXN0ZXJzLW5ldy5odG1sJyxcblx0XHRcdG5hbWU6ICdjbHVzdGVycycsXG5cdFx0XHRjb250cm9sbGVyOiAnQ2x1c3Rlck5ld0NvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAnY2x1c3Rlcidcblx0XHR9KS53aGVuKCcvY2x1c3RlcnMvbmV3L2FjY2VwdC1ob3N0cycsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvY2x1c3RlcnMvYWNjZXB0LWhvc3RzLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0FjY2VwdEhvc3RzQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdob3N0cydcbiAgICAgICAgfSkud2hlbignL2NsdXN0ZXJzL2V4cGFuZC86aWQnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2NsdXN0ZXJzL2NsdXN0ZXJzLWV4cGFuZC5odG1sJyxcblx0XHRcdG5hbWU6ICdjbHVzdGVycycsXG5cdFx0XHRjb250cm9sbGVyOiAnQ2x1c3RlckV4cGFuZENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAnY2x1c3Rlcidcblx0XHR9KS53aGVuKCcvY2x1c3RlcnMvaW1wb3J0Jywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9jbHVzdGVycy9pbXBvcnQtY2x1c3Rlci9pbXBvcnQtY2x1c3Rlci5odG1sJyxcblx0XHRcdG5hbWU6ICdjbHVzdGVycycsXG5cdFx0XHRjb250cm9sbGVyOiAnSW1wb3J0Q2x1c3RlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAnY2x1c3Rlcidcblx0XHR9KS53aGVuKCcvY2x1c3RlcnMvOmlkJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9jbHVzdGVycy9jbHVzdGVycy1kZXRhaWwuaHRtbCcsXG5cdFx0XHRuYW1lOiAnY2x1c3RlcnMnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0NsdXN0ZXJEZXRhaWxDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ2NsdXN0ZXJkZXRhaWwnXG5cdFx0fSkud2hlbignL2hvc3RzJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9ob3N0cy9ob3N0LWxpc3QuaHRtbCcsXG5cdFx0XHRuYW1lOiAnaG9zdHMnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0hvc3RMaXN0Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdob3N0cydcblx0XHR9KS53aGVuKCcvaG9zdHMvOmlkJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9ob3N0cy9ob3N0LWRldGFpbHMvaG9zdHMtZGV0YWlsLmh0bWwnLFxuXHRcdFx0bmFtZTogJ2hvc3RzJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdIb3N0RGV0YWlsQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdob3N0ZGV0YWlsJ1xuXHRcdH0pLndoZW4oJy9zdG9yYWdlJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9zdG9yYWdlL29iamVjdC9wb29scy5odG1sJyxcblx0XHRcdG5hbWU6ICdzdG9yYWdlJ1xuXHRcdH0pLndoZW4oJy9zdG9yYWdlL25ldycsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3Mvc3RvcmFnZS9zdG9yYWdlLW5ldy5odG1sJyxcblx0XHRcdG5hbWU6ICdzdG9yYWdlJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdTdG9yYWdlTmV3Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdzdG9yYWdlcydcblx0XHR9KS53aGVuKCcvc3RvcmFnZS9uZXcvb2JqZWN0LzpjbHVzdGVyaWQnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3N0b3JhZ2Uvb2JqZWN0L29iamVjdHN0b3JhZ2UtbmV3Lmh0bWwnLFxuXHRcdFx0bmFtZTogJ3N0b3JhZ2UnLFxuXHRcdFx0Y29udHJvbGxlcjogJ09iamVjdFN0b3JhZ2VDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3N0b3JhZ2UnXG5cdFx0fSkud2hlbignL3JiZHMnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3N0b3JhZ2UvYmxvY2tkZXZpY2UvYmxvY2tkZXZpY2VzLmh0bWwnLFxuXHRcdFx0bmFtZTogJ3N0b3JhZ2UnXG5cdFx0fSkud2hlbignL3N0b3JhZ2UvbmV3L2Jsb2NrLzpjbHVzdGVyaWQnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL3N0b3JhZ2UvYmxvY2tkZXZpY2UvYmxvY2tkZXZpY2UtbmV3Lmh0bWwnLFxuXHRcdFx0bmFtZTogJ3N0b3JhZ2UnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0Jsb2NrRGV2aWNlQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdzdG9yYWdlJ1xuXHRcdH0pLndoZW4oJy9wb29scycsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvcG9vbHMvcG9vbHMuaHRtbCcsXG5cdFx0XHRuYW1lOiAnc3RvcmFnZScsXG5cdFx0XHRjb250cm9sbGVyOiAnUG9vbENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAncG9vbHMnXG5cdFx0fSkud2hlbignL3Bvb2xzL25ldycsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvcG9vbHMvcG9vbHMtbmV3Lmh0bWwnLFxuXHRcdFx0bmFtZTogJ3Bvb2xzJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdQb29sTmV3Q29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdwb29sJ1xuXHRcdH0pLndoZW4oJy9hZG1pbicsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvYWRtaW4vYWRtaW4uaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnVXNlckNvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndXNlcnMnLFxuXHRcdFx0bmFtZTogJ2FkbWluJ1xuXHRcdH0pLndoZW4oJy9hZG1pbi9uZXcnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FkbWluL2FkZC11c2VyLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1VzZXJOZXdDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3VzZXInLFxuXHRcdH0pLndoZW4oJy9hZG1pbi9lZGl0Lzp1c2VyaWQnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2FkbWluL2VkaXQtdXNlci5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdVc2VyRWRpdENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAndXNlckVkaXQnLFxuXHRcdH0pLndoZW4oJy9hZG1pbi9uZXdMZGFwJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9hZG1pbi9hZGQtbGRhcC11c2VyLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0xkYXBVc2VyQ29udHJvbGxlcicsXG5cdFx0XHRjb250cm9sbGVyQXM6ICdsZGFwVXNlcnMnLFxuXHRcdH0pLndoZW4oJy9hZG1pbi9sZGFwJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9hZG1pbi9sZGFwLXNldHRpbmdzLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0xkYXBDb25maWdDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ2xkYXAnLFxuXHRcdFx0bmFtZTogJ2FkbWluJ1xuXHRcdH0pLndoZW4oJy9hZG1pbi9lbWFpbCcsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvYWRtaW4vbWFpbC1zZXR0aW5ncy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFbWFpbENvbnRyb2xsZXInLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnbWFpbCcsXG4gICAgICAgICAgICBuYW1lOiAnYWRtaW4nXG4gICAgICAgIH0pLndoZW4oJy9ldmVudHMnLCB7XG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3ZpZXdzL2V2ZW50cy9ldmVudC1saXN0Lmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0V2ZW50TGlzdENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAnZXZlbnRzJyxcblx0XHRcdG5hbWU6ICdhZG1pbidcblx0XHR9KS53aGVuKCcvZXZlbnRzLzpldmVudElkJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy9ldmVudHMvZXZlbnQtZGV0YWlscy5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdFdmVudERldGFpbENvbnRyb2xsZXInLFxuXHRcdFx0Y29udHJvbGxlckFzOiAnZXZlbnQnXG5cdFx0fSkud2hlbignL3Rhc2tzJywge1xuXHRcdFx0dGVtcGxhdGVVcmw6ICd2aWV3cy90YXNrcy90YXNrLWxpc3QuaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiAnVGFza0xpc3RDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3Rhc2tzJyxcblx0XHRcdG5hbWU6ICdhZG1pbidcblx0XHR9KS53aGVuKCcvdGFza3MvOnRhc2tJZCcsIHtcblx0XHRcdHRlbXBsYXRlVXJsOiAndmlld3MvdGFza3MvdGFzay1kZXRhaWxzLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ1Rhc2tEZXRhaWxDb250cm9sbGVyJyxcblx0XHRcdGNvbnRyb2xsZXJBczogJ3Rhc2snXG5cdFx0fSkub3RoZXJ3aXNlKHtcblx0XHRcdHJlZGlyZWN0VG86ICcvJ1xuXHRcdH0pO1xuXHR9XG59XG4iXX0=
