// <reference path="../typings/tsd.d.ts" />
declare function require(name: string);

import {default as RequestsModule} from "./../../modules/requests/module";
import {default as RestModule} from "./../../modules/rest/rest-module";
import {default as HostModule} from "./../../modules/hosts/host-module";
import {default as StorageModule} from "./../../modules/storage/storage-module";
import {default as EventModule} from "./../../modules/events/event-module";
import {RouteConfig} from "./../../modules/router/route-config";
import {MenuService} from "./../../modules/base/menu-svc";
import {LoginController} from "./../../modules/login/login";
import {ApplicationController} from "./../../modules/base/application-controller";
import {MenuController} from "./../../modules/base/menu-controller";
import {AcceptHostsController} from "./../../modules/clusters/accept-hosts-controller";
import {DashboardController} from "./../../modules/dashboard/dashboard-controller";
import {ClustersController} from "./../../modules/clusters/clusters-controller";
import {ClusterExpandController} from "./../../modules/clusters/cluster-expand";
import {ClusterNewController} from "./../../modules/clusters/cluster-new";
import {ImportClusterController} from "./../../modules/clusters/import-cluster/import-cluster";
import {ClusterDetailController} from "./../../modules/clusters/cluster-detail";
import {UserController} from "./../../modules/admin/user-controller";
import {UserNewController} from "./../../modules/admin/user-new";
import {UserEditController} from "./../../modules/admin/user-edit";
import {LdapUserController} from "./../../modules/admin/ldap-user-controller";
import {LdapConfigController} from "./../../modules/admin/ldap-config-controller";
import {TaskListController} from "./../../modules/tasks/task-list";
import {TaskDetailController} from "./../../modules/tasks/task-detail-controller";
import {TaskDetail} from "./../../modules/tasks/task-detail";
import {EmailController} from "./../../modules/admin/mail-settings-controller";
import {KTDraggable} from "./../directives/kt-draggable";
import {KTDroppable} from "./../directives/kt-droppable";
import {PfDonutPctChartFixed} from "./../directives/pf-donut-pct-chart-fixed";
import {StorageSizeSelector} from "./../directives/storage-size-selector";
import {OsdDetail} from "./../../modules/clusters/osdsdetail/osd-detail-directive";
import {HostList} from "./../../modules/clusters/hostdetail/host-list-directive";
import {StorageProfileDisks} from './../../modules/clusters/storageprofile/storageprofile-disks';
import {ClusterConfigDetail} from "./../../modules/clusters/configdetail/config-detail-directive";

import {BytesFilter} from './../filters/bytes';

/* tslint:disable */
var es6shim = require("es6-shim");
var angular: ng.IAngularStatic = require("angular");
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

class USMApp {
    public initialize() {
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
            RequestsModule,
            RestModule,
            HostModule,
            StorageModule,
            EventModule
        ])
            .controller('LoginController', LoginController)
            .controller('ApplicationController', ApplicationController)
            .controller('MenuController', MenuController)
            .controller('DashboardController', DashboardController)
            .controller('ClusterController', ClustersController)
            .controller('ClusterExpandController', ClusterExpandController)
            .controller('ClusterNewController', ClusterNewController)
            .controller('ImportClusterController', ImportClusterController)
            .controller('ClusterDetailController', ClusterDetailController)
            .controller('UserController',UserController)
            .controller('UserNewController',UserNewController)
            .controller('UserEditController',UserEditController)
            .controller('AcceptHostsController',AcceptHostsController)
            .controller('LdapUserController',LdapUserController)
            .directive('ktDraggable', () => new KTDraggable())
            .directive('ktDroppable', () => new KTDroppable())
            .directive('pfDonutPctChartFixed',['$timeout',($timeout:ng.ITimeoutService) => new PfDonutPctChartFixed($timeout)])
            .directive('storageSizeSelector', () => new StorageSizeSelector())
            .directive('osdDetail', () => new OsdDetail())
            .directive('hostList', () => new HostList())
            .directive('storageprofileDisks', () => new StorageProfileDisks())
            .directive('clusterConfigDetail', () => new ClusterConfigDetail())
            .filter('bytes', BytesFilter)
            .controller('LdapConfigController',LdapConfigController)
            .controller('TaskListController',TaskListController)
            .directive("taskDetail", () => new TaskDetail())
            .controller('TaskDetailController',TaskDetailController)
            .controller('EmailController',EmailController)
            .service('MenuService', MenuService)
            .run( function($rootScope, $location) {
               $rootScope.$watch(function() {
                  return $location.path();
                },
                function(a){
                  console.log('url has changed: ' + a);
                  $rootScope.currentURI = a;
                  // show loading div, etc...
                });
            })
            .config(RouteConfig)
            .config(['$httpProvider', function($httpProvider) {
                $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            }])
            .config(['$logProvider', function($logProvider) {
                $logProvider.debugEnabled(true);
            }])
            .config(['RestangularProvider', function(RestangularProvider) {
                RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                    if (operation === 'getList' && what === 'nodes') {
                        _.each(data, (node: any) => {
                            node.options1 = node.options;
                        });
                    }else if (operation === 'getList' && what === 'slus') {
                        _.each(data, (slus: any) => {
                            slus.options1 = slus.options;
                        });
                    }else if (operation === 'getList' && what === 'storages') {
                        _.each(data, (storage: any) => {
                            storage.options1 = storage.options;
                        });
                    }
                    return data;
                });
            }])
            .config(['$animateProvider', function($animateProvider) {
                //Fixing fa-spinner issues with ng-show/ng-if
                //http://stackoverflow.com/questions/24617821/stop-angular-animation-from-happening-on-ng-show-ng-hide
                $animateProvider.classNameFilter(/^((?!(fa-spin)).)*$/);
            }]);
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['usm-client']);
        });
    }
}

var app = new USMApp();
app.initialize();
