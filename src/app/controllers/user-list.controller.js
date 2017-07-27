export default class UserListController {
    constructor($state, ApiClientService) {
        this.apiClientService = ApiClientService;
        this.$state = $state;
        this.userList = [];
    }

    $onInit() {
        let promise = this.apiClientService.getUsersList();

        promise.then((response) => {
            return response.data;
        }).then((users) => {
            return this.apiClientService.getUserNames(users);
        }).then((userNames) => {
            return this.apiClientService.getFullUsersData(userNames);
        }).then((userList) => {
            this.setPages(userList);
        });
    }

    goToDetails(user) {
        this.$state.go('details', {username: user.data.login, user: user});
    }

    setPages(userList) {
        this.userList = userList;
        this.firstUserId = this.userList[0].data.id;
        this.lastUserId  = this.userList[this.userList.length - 1].data.id;
    }

    onPageSelected(userList) {
        this.setPages(userList);
    }
}