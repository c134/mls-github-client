import PaginationSimpleController from '../controllers/pagination-simple.controller';

export const paginationSimpleComponent = {
    selector: 'paginationSimpleComponent',
    templateUrl: '/templates/pagination-simple.tpl.html',
    bindings: {
        lastPage: '<',
        nextPage: '<',
        pageSelected: '&'
    },
    controller: PaginationSimpleController
};
