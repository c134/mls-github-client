import PaginationController from '../controllers/pagination.controller';

export const paginationComponent = {
    selector: 'paginationComponent',
    templateUrl: '/templates/pagination.tpl.html',
    bindings: {
        page: '<',
        pagesTotal: '<',
        pageSelected: '&'
    },
    controller: PaginationController
};
