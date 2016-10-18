/// <reference path="../../../typings/tsd.d.ts" />

export class RouteConfig {
	static $inject: Array<string> = ['$routeProvider'];
	constructor(private routeProvider: ng.route.IRouteProvider) {
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
}