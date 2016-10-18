var module_1 = require("./../../modules/requests/module");
var rest_module_1 = require("./../../modules/rest/rest-module");
var host_module_1 = require("./../../modules/hosts/host-module");
var storage_module_1 = require("./../../modules/storage/storage-module");
var event_module_1 = require("./../../modules/events/event-module");
var route_config_1 = require("./../../modules/router/route-config");
var menu_svc_1 = require("./../../modules/base/menu-svc");
var login_1 = require("./../../modules/login/login");
var application_controller_1 = require("./../../modules/base/application-controller");
var menu_controller_1 = require("./../../modules/base/menu-controller");
var accept_hosts_controller_1 = require("./../../modules/clusters/accept-hosts-controller");
var dashboard_controller_1 = require("./../../modules/dashboard/dashboard-controller");
var clusters_controller_1 = require("./../../modules/clusters/clusters-controller");
var cluster_expand_1 = require("./../../modules/clusters/cluster-expand");
var cluster_new_1 = require("./../../modules/clusters/cluster-new");
var import_cluster_1 = require("./../../modules/clusters/import-cluster/import-cluster");
var cluster_detail_1 = require("./../../modules/clusters/cluster-detail");
var user_controller_1 = require("./../../modules/admin/user-controller");
var user_new_1 = require("./../../modules/admin/user-new");
var user_edit_1 = require("./../../modules/admin/user-edit");
var ldap_user_controller_1 = require("./../../modules/admin/ldap-user-controller");
var ldap_config_controller_1 = require("./../../modules/admin/ldap-config-controller");
var task_list_1 = require("./../../modules/tasks/task-list");
var task_detail_controller_1 = require("./../../modules/tasks/task-detail-controller");
var task_detail_1 = require("./../../modules/tasks/task-detail");
var mail_settings_controller_1 = require("./../../modules/admin/mail-settings-controller");
var kt_draggable_1 = require("./../directives/kt-draggable");
var kt_droppable_1 = require("./../directives/kt-droppable");
var pf_donut_pct_chart_fixed_1 = require("./../directives/pf-donut-pct-chart-fixed");
var storage_size_selector_1 = require("./../directives/storage-size-selector");
var osd_detail_directive_1 = require("./../../modules/clusters/osdsdetail/osd-detail-directive");
var host_list_directive_1 = require("./../../modules/clusters/hostdetail/host-list-directive");
var storageprofile_disks_1 = require('./../../modules/clusters/storageprofile/storageprofile-disks');
var config_detail_directive_1 = require("./../../modules/clusters/configdetail/config-detail-directive");
var bytes_1 = require('./../filters/bytes');
/* tslint:disable */
var es6shim = require("es6-shim");
var angular = require("angular");
var ngRoute = require("angular-route");
var ngAnimate = require("angular-animate");
var ngCookies = require("angular-cookies");
var ngResource = require("angular-resource");
var ngSanitize = require("angular-sanitize");
var restangular = require("restangular");
var ngStrap = require("angular-strap");
var ngStrapTpl = require("angular-strap-tpl");
var idbWrapper = require("idb-wrapper");
var c3 = require("c3");
var d3 = require("d3");
var c3Angular = require("c3-angular");
var jquery = $ = require("jquery");
var patternfly = require("patternfly");
var angularPatternfly = require("angular-patternfly");
var dateTimePicker = require("angular-bootstrap-datetimepicker");
/* tslint:enable */
var USMApp = (function () {
    function USMApp() {
    }
    USMApp.prototype.initialize = function () {
        console.log('Initializing...');
        angular.module('usm-client', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'mgcrea.ngStrap',
            'gridshore.c3js.chart',
            'restangular',
            'patternfly.charts',
            'ui.bootstrap.datetimepicker',
            'patternfly.notification',
            'patternfly.form',
            module_1.default,
            rest_module_1.default,
            host_module_1.default,
            storage_module_1.default,
            event_module_1.default
        ])
            .controller('LoginController', login_1.LoginController)
            .controller('ApplicationController', application_controller_1.ApplicationController)
            .controller('MenuController', menu_controller_1.MenuController)
            .controller('DashboardController', dashboard_controller_1.DashboardController)
            .controller('ClusterController', clusters_controller_1.ClustersController)
            .controller('ClusterExpandController', cluster_expand_1.ClusterExpandController)
            .controller('ClusterNewController', cluster_new_1.ClusterNewController)
            .controller('ImportClusterController', import_cluster_1.ImportClusterController)
            .controller('ClusterDetailController', cluster_detail_1.ClusterDetailController)
            .controller('UserController', user_controller_1.UserController)
            .controller('UserNewController', user_new_1.UserNewController)
            .controller('UserEditController', user_edit_1.UserEditController)
            .controller('AcceptHostsController', accept_hosts_controller_1.AcceptHostsController)
            .controller('LdapUserController', ldap_user_controller_1.LdapUserController)
            .directive('ktDraggable', function () { return new kt_draggable_1.KTDraggable(); })
            .directive('ktDroppable', function () { return new kt_droppable_1.KTDroppable(); })
            .directive('pfDonutPctChartFixed', ['$timeout', function ($timeout) { return new pf_donut_pct_chart_fixed_1.PfDonutPctChartFixed($timeout); }])
            .directive('storageSizeSelector', function () { return new storage_size_selector_1.StorageSizeSelector(); })
            .directive('osdDetail', function () { return new osd_detail_directive_1.OsdDetail(); })
            .directive('hostList', function () { return new host_list_directive_1.HostList(); })
            .directive('storageprofileDisks', function () { return new storageprofile_disks_1.StorageProfileDisks(); })
            .directive('clusterConfigDetail', function () { return new config_detail_directive_1.ClusterConfigDetail(); })
            .filter('bytes', bytes_1.BytesFilter)
            .controller('LdapConfigController', ldap_config_controller_1.LdapConfigController)
            .controller('TaskListController', task_list_1.TaskListController)
            .directive("taskDetail", function () { return new task_detail_1.TaskDetail(); })
            .controller('TaskDetailController', task_detail_controller_1.TaskDetailController)
            .controller('EmailController', mail_settings_controller_1.EmailController)
            .service('MenuService', menu_svc_1.MenuService)
            .run(function ($rootScope, $location) {
            $rootScope.$watch(function () {
                return $location.path();
            }, function (a) {
                console.log('url has changed: ' + a);
                $rootScope.currentURI = a;
                // show loading div, etc...
            });
        })
            .config(route_config_1.RouteConfig)
            .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            }])
            .config(['$logProvider', function ($logProvider) {
                $logProvider.debugEnabled(true);
            }])
            .config(['RestangularProvider', function (RestangularProvider) {
                RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                    if (operation === 'getList' && what === 'nodes') {
                        _.each(data, function (node) {
                            node.options1 = node.options;
                        });
                    }
                    else if (operation === 'getList' && what === 'slus') {
                        _.each(data, function (slus) {
                            slus.options1 = slus.options;
                        });
                    }
                    else if (operation === 'getList' && what === 'storages') {
                        _.each(data, function (storage) {
                            storage.options1 = storage.options;
                        });
                    }
                    return data;
                });
            }])
            .config(['$animateProvider', function ($animateProvider) {
                //Fixing fa-spinner issues with ng-show/ng-if
                //http://stackoverflow.com/questions/24617821/stop-angular-animation-from-happening-on-ng-show-ng-hide
                $animateProvider.classNameFilter(/^((?!(fa-spin)).)*$/);
            }]);
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['usm-client']);
        });
    };
    return USMApp;
})();
var app = new USMApp();
app.initialize();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9qcy9pbmRleC50cyJdLCJuYW1lcyI6WyJVU01BcHAiLCJVU01BcHAuY29uc3RydWN0b3IiLCJVU01BcHAuaW5pdGlhbGl6ZSJdLCJtYXBwaW5ncyI6IkFBR0EsdUJBQXdDLGlDQUFpQyxDQUFDLENBQUE7QUFDMUUsNEJBQW9DLGtDQUFrQyxDQUFDLENBQUE7QUFDdkUsNEJBQW9DLG1DQUFtQyxDQUFDLENBQUE7QUFDeEUsK0JBQXVDLHdDQUF3QyxDQUFDLENBQUE7QUFDaEYsNkJBQXFDLHFDQUFxQyxDQUFDLENBQUE7QUFDM0UsNkJBQTBCLHFDQUFxQyxDQUFDLENBQUE7QUFDaEUseUJBQTBCLCtCQUErQixDQUFDLENBQUE7QUFDMUQsc0JBQThCLDZCQUE2QixDQUFDLENBQUE7QUFDNUQsdUNBQW9DLDZDQUE2QyxDQUFDLENBQUE7QUFDbEYsZ0NBQTZCLHNDQUFzQyxDQUFDLENBQUE7QUFDcEUsd0NBQW9DLGtEQUFrRCxDQUFDLENBQUE7QUFDdkYscUNBQWtDLGdEQUFnRCxDQUFDLENBQUE7QUFDbkYsb0NBQWlDLDhDQUE4QyxDQUFDLENBQUE7QUFDaEYsK0JBQXNDLHlDQUF5QyxDQUFDLENBQUE7QUFDaEYsNEJBQW1DLHNDQUFzQyxDQUFDLENBQUE7QUFDMUUsK0JBQXNDLHdEQUF3RCxDQUFDLENBQUE7QUFDL0YsK0JBQXNDLHlDQUF5QyxDQUFDLENBQUE7QUFDaEYsZ0NBQTZCLHVDQUF1QyxDQUFDLENBQUE7QUFDckUseUJBQWdDLGdDQUFnQyxDQUFDLENBQUE7QUFDakUsMEJBQWlDLGlDQUFpQyxDQUFDLENBQUE7QUFDbkUscUNBQWlDLDRDQUE0QyxDQUFDLENBQUE7QUFDOUUsdUNBQW1DLDhDQUE4QyxDQUFDLENBQUE7QUFDbEYsMEJBQWlDLGlDQUFpQyxDQUFDLENBQUE7QUFDbkUsdUNBQW1DLDhDQUE4QyxDQUFDLENBQUE7QUFDbEYsNEJBQXlCLG1DQUFtQyxDQUFDLENBQUE7QUFDN0QseUNBQThCLGdEQUFnRCxDQUFDLENBQUE7QUFD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LEVBQUUsVUFBQyxPQUFZOzRCQUN0QixPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUNBLENBQUNBO2FBQ0ZBLE1BQU1BLENBQUNBLENBQUNBLGtCQUFrQkEsRUFBRUEsVUFBU0EsZ0JBQWdCQTtnQkFDbEQsNkNBQTZDO2dCQUM3QyxzR0FBc0c7Z0JBQ3RHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDUkEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQ0EsQ0FBQ0E7SUFDUEEsQ0FBQ0E7SUFDTEYsYUFBQ0E7QUFBREEsQ0FoR0EsQUFnR0NBLElBQUE7QUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyIsImZpbGUiOiJzaGFyZWQvanMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbmRlY2xhcmUgZnVuY3Rpb24gcmVxdWlyZShuYW1lOiBzdHJpbmcpO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgUmVxdWVzdHNNb2R1bGV9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvcmVxdWVzdHMvbW9kdWxlXCI7XG5pbXBvcnQge2RlZmF1bHQgYXMgUmVzdE1vZHVsZX0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9yZXN0L3Jlc3QtbW9kdWxlXCI7XG5pbXBvcnQge2RlZmF1bHQgYXMgSG9zdE1vZHVsZX0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9ob3N0cy9ob3N0LW1vZHVsZVwiO1xuaW1wb3J0IHtkZWZhdWx0IGFzIFN0b3JhZ2VNb2R1bGV9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvc3RvcmFnZS9zdG9yYWdlLW1vZHVsZVwiO1xuaW1wb3J0IHtkZWZhdWx0IGFzIEV2ZW50TW9kdWxlfSBmcm9tIFwiLi8uLi8uLi9tb2R1bGVzL2V2ZW50cy9ldmVudC1tb2R1bGVcIjtcbmltcG9ydCB7Um91dGVDb25maWd9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvcm91dGVyL3JvdXRlLWNvbmZpZ1wiO1xuaW1wb3J0IHtNZW51U2VydmljZX0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9iYXNlL21lbnUtc3ZjXCI7XG5pbXBvcnQge0xvZ2luQ29udHJvbGxlcn0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9sb2dpbi9sb2dpblwiO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkNvbnRyb2xsZXJ9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvYmFzZS9hcHBsaWNhdGlvbi1jb250cm9sbGVyXCI7XG5pbXBvcnQge01lbnVDb250cm9sbGVyfSBmcm9tIFwiLi8uLi8uLi9tb2R1bGVzL2Jhc2UvbWVudS1jb250cm9sbGVyXCI7XG5pbXBvcnQge0FjY2VwdEhvc3RzQ29udHJvbGxlcn0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9jbHVzdGVycy9hY2NlcHQtaG9zdHMtY29udHJvbGxlclwiO1xuaW1wb3J0IHtEYXNoYm9hcmRDb250cm9sbGVyfSBmcm9tIFwiLi8uLi8uLi9tb2R1bGVzL2Rhc2hib2FyZC9kYXNoYm9hcmQtY29udHJvbGxlclwiO1xuaW1wb3J0IHtDbHVzdGVyc0NvbnRyb2xsZXJ9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvY2x1c3RlcnMvY2x1c3RlcnMtY29udHJvbGxlclwiO1xuaW1wb3J0IHtDbHVzdGVyRXhwYW5kQ29udHJvbGxlcn0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9jbHVzdGVycy9jbHVzdGVyLWV4cGFuZFwiO1xuaW1wb3J0IHtDbHVzdGVyTmV3Q29udHJvbGxlcn0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9jbHVzdGVycy9jbHVzdGVyLW5ld1wiO1xuaW1wb3J0IHtJbXBvcnRDbHVzdGVyQ29udHJvbGxlcn0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9jbHVzdGVycy9pbXBvcnQtY2x1c3Rlci9pbXBvcnQtY2x1c3RlclwiO1xuaW1wb3J0IHtDbHVzdGVyRGV0YWlsQ29udHJvbGxlcn0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9jbHVzdGVycy9jbHVzdGVyLWRldGFpbFwiO1xuaW1wb3J0IHtVc2VyQ29udHJvbGxlcn0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9hZG1pbi91c2VyLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7VXNlck5ld0NvbnRyb2xsZXJ9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvYWRtaW4vdXNlci1uZXdcIjtcbmltcG9ydCB7VXNlckVkaXRDb250cm9sbGVyfSBmcm9tIFwiLi8uLi8uLi9tb2R1bGVzL2FkbWluL3VzZXItZWRpdFwiO1xuaW1wb3J0IHtMZGFwVXNlckNvbnRyb2xsZXJ9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvYWRtaW4vbGRhcC11c2VyLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7TGRhcENvbmZpZ0NvbnRyb2xsZXJ9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvYWRtaW4vbGRhcC1jb25maWctY29udHJvbGxlclwiO1xuaW1wb3J0IHtUYXNrTGlzdENvbnRyb2xsZXJ9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvdGFza3MvdGFzay1saXN0XCI7XG5pbXBvcnQge1Rhc2tEZXRhaWxDb250cm9sbGVyfSBmcm9tIFwiLi8uLi8uLi9tb2R1bGVzL3Rhc2tzL3Rhc2stZGV0YWlsLWNvbnRyb2xsZXJcIjtcbmltcG9ydCB7VGFza0RldGFpbH0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy90YXNrcy90YXNrLWRldGFpbFwiO1xuaW1wb3J0IHtFbWFpbENvbnRyb2xsZXJ9IGZyb20gXCIuLy4uLy4uL21vZHVsZXMvYWRtaW4vbWFpbC1zZXR0aW5ncy1jb250cm9sbGVyXCI7XG5pbXBvcnQge0tURHJhZ2dhYmxlfSBmcm9tIFwiLi8uLi9kaXJlY3RpdmVzL2t0LWRyYWdnYWJsZVwiO1xuaW1wb3J0IHtLVERyb3BwYWJsZX0gZnJvbSBcIi4vLi4vZGlyZWN0aXZlcy9rdC1kcm9wcGFibGVcIjtcbmltcG9ydCB7UGZEb251dFBjdENoYXJ0Rml4ZWR9IGZyb20gXCIuLy4uL2RpcmVjdGl2ZXMvcGYtZG9udXQtcGN0LWNoYXJ0LWZpeGVkXCI7XG5pbXBvcnQge1N0b3JhZ2VTaXplU2VsZWN0b3J9IGZyb20gXCIuLy4uL2RpcmVjdGl2ZXMvc3RvcmFnZS1zaXplLXNlbGVjdG9yXCI7XG5pbXBvcnQge09zZERldGFpbH0gZnJvbSBcIi4vLi4vLi4vbW9kdWxlcy9jbHVzdGVycy9vc2RzZGV0YWlsL29zZC1kZXRhaWwtZGlyZWN0aXZlXCI7XG5pbXBvcnQge0hvc3RMaXN0fSBmcm9tIFwiLi8uLi8uLi9tb2R1bGVzL2NsdXN0ZXJzL2hvc3RkZXRhaWwvaG9zdC1saXN0LWRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtTdG9yYWdlUHJvZmlsZURpc2tzfSBmcm9tICcuLy4uLy4uL21vZHVsZXMvY2x1c3RlcnMvc3RvcmFnZXByb2ZpbGUvc3RvcmFnZXByb2ZpbGUtZGlza3MnO1xuaW1wb3J0IHtDbHVzdGVyQ29uZmlnRGV0YWlsfSBmcm9tIFwiLi8uLi8uLi9tb2R1bGVzL2NsdXN0ZXJzL2NvbmZpZ2RldGFpbC9jb25maWctZGV0YWlsLWRpcmVjdGl2ZVwiO1xuXG5pbXBvcnQge0J5dGVzRmlsdGVyfSBmcm9tICcuLy4uL2ZpbHRlcnMvYnl0ZXMnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xudmFyIGVzNnNoaW0gPSByZXF1aXJlKFwiZXM2LXNoaW1cIik7XG52YXIgYW5ndWxhcjogbmcuSUFuZ3VsYXJTdGF0aWMgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbnZhciBuZ1JvdXRlID0gcmVxdWlyZShcImFuZ3VsYXItcm91dGVcIik7XG52YXIgbmdBbmltYXRlID0gcmVxdWlyZShcImFuZ3VsYXItYW5pbWF0ZVwiKTtcbnZhciBuZ0Nvb2tpZXMgPSByZXF1aXJlKFwiYW5ndWxhci1jb29raWVzXCIpO1xudmFyIG5nUmVzb3VyY2UgPSByZXF1aXJlKFwiYW5ndWxhci1yZXNvdXJjZVwiKTtcbnZhciBuZ1Nhbml0aXplID0gcmVxdWlyZShcImFuZ3VsYXItc2FuaXRpemVcIik7XG52YXIgcmVzdGFuZ3VsYXIgPSByZXF1aXJlKFwicmVzdGFuZ3VsYXJcIik7XG52YXIgbmdTdHJhcCA9IHJlcXVpcmUoXCJhbmd1bGFyLXN0cmFwXCIpO1xudmFyIG5nU3RyYXBUcGwgPSByZXF1aXJlKFwiYW5ndWxhci1zdHJhcC10cGxcIik7XG52YXIgaWRiV3JhcHBlciA9IHJlcXVpcmUoXCJpZGItd3JhcHBlclwiKTtcbnZhciBjMyA9IHJlcXVpcmUoXCJjM1wiKTtcbnZhciBkMyA9IHJlcXVpcmUoXCJkM1wiKTtcbnZhciBjM0FuZ3VsYXIgPSByZXF1aXJlKFwiYzMtYW5ndWxhclwiKTtcbnZhciBqcXVlcnkgPSAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcbnZhciBwYXR0ZXJuZmx5ID0gcmVxdWlyZShcInBhdHRlcm5mbHlcIik7XG52YXIgYW5ndWxhclBhdHRlcm5mbHkgPSByZXF1aXJlKFwiYW5ndWxhci1wYXR0ZXJuZmx5XCIpO1xudmFyIGRhdGVUaW1lUGlja2VyID0gcmVxdWlyZShcImFuZ3VsYXItYm9vdHN0cmFwLWRhdGV0aW1lcGlja2VyXCIpO1xuLyogdHNsaW50OmVuYWJsZSAqL1xuXG5jbGFzcyBVU01BcHAge1xuICAgIHB1YmxpYyBpbml0aWFsaXplKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCd1c20tY2xpZW50JywgW1xuICAgICAgICAgICAgJ25nQW5pbWF0ZScsXG4gICAgICAgICAgICAnbmdDb29raWVzJyxcbiAgICAgICAgICAgICduZ1Jlc291cmNlJyxcbiAgICAgICAgICAgICduZ1Nhbml0aXplJyxcbiAgICAgICAgICAgICduZ1JvdXRlJyxcbiAgICAgICAgICAgICdtZ2NyZWEubmdTdHJhcCcsXG4gICAgICAgICAgICAnZ3JpZHNob3JlLmMzanMuY2hhcnQnLFxuICAgICAgICAgICAgJ3Jlc3Rhbmd1bGFyJyxcbiAgICAgICAgICAgICdwYXR0ZXJuZmx5LmNoYXJ0cycsXG4gICAgICAgICAgICAndWkuYm9vdHN0cmFwLmRhdGV0aW1lcGlja2VyJyxcbiAgICAgICAgICAgICdwYXR0ZXJuZmx5Lm5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAncGF0dGVybmZseS5mb3JtJyxcbiAgICAgICAgICAgIFJlcXVlc3RzTW9kdWxlLFxuICAgICAgICAgICAgUmVzdE1vZHVsZSxcbiAgICAgICAgICAgIEhvc3RNb2R1bGUsXG4gICAgICAgICAgICBTdG9yYWdlTW9kdWxlLFxuICAgICAgICAgICAgRXZlbnRNb2R1bGVcbiAgICAgICAgXSlcbiAgICAgICAgICAgIC5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBMb2dpbkNvbnRyb2xsZXIpXG4gICAgICAgICAgICAuY29udHJvbGxlcignQXBwbGljYXRpb25Db250cm9sbGVyJywgQXBwbGljYXRpb25Db250cm9sbGVyKVxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoJ01lbnVDb250cm9sbGVyJywgTWVudUNvbnRyb2xsZXIpXG4gICAgICAgICAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIERhc2hib2FyZENvbnRyb2xsZXIpXG4gICAgICAgICAgICAuY29udHJvbGxlcignQ2x1c3RlckNvbnRyb2xsZXInLCBDbHVzdGVyc0NvbnRyb2xsZXIpXG4gICAgICAgICAgICAuY29udHJvbGxlcignQ2x1c3RlckV4cGFuZENvbnRyb2xsZXInLCBDbHVzdGVyRXhwYW5kQ29udHJvbGxlcilcbiAgICAgICAgICAgIC5jb250cm9sbGVyKCdDbHVzdGVyTmV3Q29udHJvbGxlcicsIENsdXN0ZXJOZXdDb250cm9sbGVyKVxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoJ0ltcG9ydENsdXN0ZXJDb250cm9sbGVyJywgSW1wb3J0Q2x1c3RlckNvbnRyb2xsZXIpXG4gICAgICAgICAgICAuY29udHJvbGxlcignQ2x1c3RlckRldGFpbENvbnRyb2xsZXInLCBDbHVzdGVyRGV0YWlsQ29udHJvbGxlcilcbiAgICAgICAgICAgIC5jb250cm9sbGVyKCdVc2VyQ29udHJvbGxlcicsVXNlckNvbnRyb2xsZXIpXG4gICAgICAgICAgICAuY29udHJvbGxlcignVXNlck5ld0NvbnRyb2xsZXInLFVzZXJOZXdDb250cm9sbGVyKVxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoJ1VzZXJFZGl0Q29udHJvbGxlcicsVXNlckVkaXRDb250cm9sbGVyKVxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoJ0FjY2VwdEhvc3RzQ29udHJvbGxlcicsQWNjZXB0SG9zdHNDb250cm9sbGVyKVxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoJ0xkYXBVc2VyQ29udHJvbGxlcicsTGRhcFVzZXJDb250cm9sbGVyKVxuICAgICAgICAgICAgLmRpcmVjdGl2ZSgna3REcmFnZ2FibGUnLCAoKSA9PiBuZXcgS1REcmFnZ2FibGUoKSlcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2t0RHJvcHBhYmxlJywgKCkgPT4gbmV3IEtURHJvcHBhYmxlKCkpXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdwZkRvbnV0UGN0Q2hhcnRGaXhlZCcsWyckdGltZW91dCcsKCR0aW1lb3V0Om5nLklUaW1lb3V0U2VydmljZSkgPT4gbmV3IFBmRG9udXRQY3RDaGFydEZpeGVkKCR0aW1lb3V0KV0pXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdzdG9yYWdlU2l6ZVNlbGVjdG9yJywgKCkgPT4gbmV3IFN0b3JhZ2VTaXplU2VsZWN0b3IoKSlcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ29zZERldGFpbCcsICgpID0+IG5ldyBPc2REZXRhaWwoKSlcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2hvc3RMaXN0JywgKCkgPT4gbmV3IEhvc3RMaXN0KCkpXG4gICAgICAgICAgICAuZGlyZWN0aXZlKCdzdG9yYWdlcHJvZmlsZURpc2tzJywgKCkgPT4gbmV3IFN0b3JhZ2VQcm9maWxlRGlza3MoKSlcbiAgICAgICAgICAgIC5kaXJlY3RpdmUoJ2NsdXN0ZXJDb25maWdEZXRhaWwnLCAoKSA9PiBuZXcgQ2x1c3RlckNvbmZpZ0RldGFpbCgpKVxuICAgICAgICAgICAgLmZpbHRlcignYnl0ZXMnLCBCeXRlc0ZpbHRlcilcbiAgICAgICAgICAgIC5jb250cm9sbGVyKCdMZGFwQ29uZmlnQ29udHJvbGxlcicsTGRhcENvbmZpZ0NvbnRyb2xsZXIpXG4gICAgICAgICAgICAuY29udHJvbGxlcignVGFza0xpc3RDb250cm9sbGVyJyxUYXNrTGlzdENvbnRyb2xsZXIpXG4gICAgICAgICAgICAuZGlyZWN0aXZlKFwidGFza0RldGFpbFwiLCAoKSA9PiBuZXcgVGFza0RldGFpbCgpKVxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoJ1Rhc2tEZXRhaWxDb250cm9sbGVyJyxUYXNrRGV0YWlsQ29udHJvbGxlcilcbiAgICAgICAgICAgIC5jb250cm9sbGVyKCdFbWFpbENvbnRyb2xsZXInLEVtYWlsQ29udHJvbGxlcilcbiAgICAgICAgICAgIC5zZXJ2aWNlKCdNZW51U2VydmljZScsIE1lbnVTZXJ2aWNlKVxuICAgICAgICAgICAgLnJ1biggZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAkcm9vdFNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAkbG9jYXRpb24ucGF0aCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXJsIGhhcyBjaGFuZ2VkOiAnICsgYSk7XG4gICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVUkkgPSBhO1xuICAgICAgICAgICAgICAgICAgLy8gc2hvdyBsb2FkaW5nIGRpdiwgZXRjLi4uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNvbmZpZyhSb3V0ZUNvbmZpZylcbiAgICAgICAgICAgIC5jb25maWcoWyckaHR0cFByb3ZpZGVyJywgZnVuY3Rpb24oJGh0dHBQcm92aWRlcikge1xuICAgICAgICAgICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMueHNyZkNvb2tpZU5hbWUgPSAnY3NyZnRva2VuJztcbiAgICAgICAgICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnhzcmZIZWFkZXJOYW1lID0gJ1gtQ1NSRlRva2VuJztcbiAgICAgICAgICAgIH1dKVxuICAgICAgICAgICAgLmNvbmZpZyhbJyRsb2dQcm92aWRlcicsIGZ1bmN0aW9uKCRsb2dQcm92aWRlcikge1xuICAgICAgICAgICAgICAgICRsb2dQcm92aWRlci5kZWJ1Z0VuYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICB9XSlcbiAgICAgICAgICAgIC5jb25maWcoWydSZXN0YW5ndWxhclByb3ZpZGVyJywgZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcikge1xuICAgICAgICAgICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihmdW5jdGlvbihkYXRhLCBvcGVyYXRpb24sIHdoYXQsIHVybCwgcmVzcG9uc2UsIGRlZmVycmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24gPT09ICdnZXRMaXN0JyAmJiB3aGF0ID09PSAnbm9kZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2goZGF0YSwgKG5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUub3B0aW9uczEgPSBub2RlLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJ2dldExpc3QnICYmIHdoYXQgPT09ICdzbHVzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRhdGEsIChzbHVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbHVzLm9wdGlvbnMxID0gc2x1cy5vcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChvcGVyYXRpb24gPT09ICdnZXRMaXN0JyAmJiB3aGF0ID09PSAnc3RvcmFnZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2goZGF0YSwgKHN0b3JhZ2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2Uub3B0aW9uczEgPSBzdG9yYWdlLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1dKVxuICAgICAgICAgICAgLmNvbmZpZyhbJyRhbmltYXRlUHJvdmlkZXInLCBmdW5jdGlvbigkYW5pbWF0ZVByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICAgLy9GaXhpbmcgZmEtc3Bpbm5lciBpc3N1ZXMgd2l0aCBuZy1zaG93L25nLWlmXG4gICAgICAgICAgICAgICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0NjE3ODIxL3N0b3AtYW5ndWxhci1hbmltYXRpb24tZnJvbS1oYXBwZW5pbmctb24tbmctc2hvdy1uZy1oaWRlXG4gICAgICAgICAgICAgICAgJGFuaW1hdGVQcm92aWRlci5jbGFzc05hbWVGaWx0ZXIoL14oKD8hKGZhLXNwaW4pKS4pKiQvKTtcbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ3VzbS1jbGllbnQnXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxudmFyIGFwcCA9IG5ldyBVU01BcHAoKTtcbmFwcC5pbml0aWFsaXplKCk7XG4iXX0=
