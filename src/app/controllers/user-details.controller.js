export default class UserDetailsController {
    constructor($state, PaginationService, ApiClientService) {
        this.$state = $state;
        this.apiClientService = ApiClientService;
        this.paginationService = PaginationService;
        this.user = {};
    }

    $onInit() {
        if (this.$state.params.user !== null) {
            this.user = this.$state.params.user.data;
            this.loadRepos(this.user.login);
        } else {
            this.loadRepos(this.$state.params.username);
        }
    }

    loadRepos(userName) {
        let promise = this.apiClientService.getUser(userName);
        promise.then((response) => {
            this.user = response.data;
        }).then(() => {
            return this.apiClientService.getUserRepos(this.user.login, 1);
        }).then((response) => {
            this.repos = response.data;
            this.lastPage = this.paginationService.parsePageHeader(response);
        })
    }

    onPageSelected(page) {
        if (page !== 0) {
            let promise = this.apiClientService.getUserRepos(this.user.login, page);
            promise.then((response) => {
                this.repos = response.data;
                this.lastPage = this.paginationService.parsePageHeader(response);
            })
        }
    }

    goToRepository(repo) {
        this.$state.go('repository', {username: this.user.login, reponame: repo.name});
    }

}