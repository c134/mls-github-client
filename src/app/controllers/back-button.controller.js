export default class RepositoryController {
    constructor($state) {
        this.$state = $state;
    }

    goBack() {
        switch (this.$state.current.name) {
            case 'repository':
                this.$state.go('details', {username: this.$state.params.username});
                break;
            case 'details':
                this.$state.go('userlist');
                break;
        }
    }
}
