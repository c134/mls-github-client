export default class RepositoryController {
    constructor($state, ApiClientService) {
        this.apiClientService = ApiClientService;
        this.$state = $state;
    }

    $onInit() {
        this.userName = this.$state.params.username;
        this.repoName = this.$state.params.reponame;
        console.log(this.userName, this.repoName);
        let promise = this.apiClientService.getUser(this.userName);
        promise.then((user) => {
            this.user = user.data;
            console.log(this.userName, this.repoName);
            return this.apiClientService.getBranches(this.userName, this.repoName);
        }).then((branches) => {
            console.log(branches.data);
            this.branches = branches.data;
            this.selectedBranch = this.branches[0];
            return this.apiClientService.getBranchCommits(this.userName, this.repoName, this.branches[0].name);
        }).then((commits) => {
            this.commits = commits.data;
        })
    }

    getCommits(branch) {
        this.selectedBranch = branch;
        let promise = this.apiClientService.getBranchCommits(this.userName, this.repoName, branch.name);
        promise.then((commits) => {
            this.commits = commits.data;
        })
    }

}