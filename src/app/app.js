import angular from 'angular';
import ngAnimate from 'angular-animate';
import uiRouter from '@uirouter/angularjs';
import routes from './app.routes';
import {userListComponent} from './components/user-list.component';
import {userDetailsComponent} from './components/user-details.component';
import {paginationComponent} from './components/pagination.component';
import ApiClientService from './services/api-client.service';
import PaginationService from './services/pagination.service';
import {repositoryComponent} from './components/repository.component';
import {paginationSimpleComponent} from './components/pagination-simlpe.component';
import {backButtonComponent} from './components/back-button.component';

import '../style/project.css';

const MODULE_NAME = 'app';
angular.module(MODULE_NAME, [uiRouter, ngAnimate])
    .service('ApiClientService', ApiClientService)
    .service('PaginationService', PaginationService)
    .component(userListComponent.selector, userListComponent)
    .component(userDetailsComponent.selector, userDetailsComponent)
    .component(paginationComponent.selector, paginationComponent)
    .component(repositoryComponent.selector, repositoryComponent)
    .component(paginationSimpleComponent.selector, paginationSimpleComponent)
    .component(backButtonComponent.selector, backButtonComponent)
    .config(routes);


export default MODULE_NAME;