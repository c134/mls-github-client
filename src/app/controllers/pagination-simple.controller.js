export default class PaginationSimpleController {
    constructor(PaginationService, ApiClientService) {
        this.paginationService = PaginationService;
        this.apiClientService = ApiClientService;
    }

    toNextPage() {
        this.makeRequest(this.nextPage);

    }

    toPrevious() {
        this.makeRequest(this.firstPage);
    }

    makeRequest(page) {
        let promise = this.apiClientService.getUsersList(page);

        promise.then((response) => {
            return response.data;
        }).then((users) => {
            return this.apiClientService.getUserNames(users);
        }).then((userNames) => {
            return this.apiClientService.getFullUsersData(userNames);
        }).then((userList) => {
            this.pageSelected({userList: userList});
        })
    }

}