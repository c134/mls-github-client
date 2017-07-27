export default class ApiClientService {
    constructor($http, $q) {
        this.rootEndpoint = 'https://api.github.com';
        this.userEndpoint = `${this.rootEndpoint}/users/`;
        this.userListEndpoint = `${this.rootEndpoint}/users`;
        this.baseReposEndpoint = `${this.userListEndpoint}/repos/`;
        this.$http = $http;
        this.$q = $q;
        this.basicConfig = {
            headers: {
                'Authorization': `Basic  ${btoa(`c134:61ab47df7e17dd37e4fcb11cbd581ee330b93cc2`)}`,
            }
        };
    }

    /**
     * Get single user
     *
     * @param userName
     *
     * @return {Promise}
     */
    getUser(userName) {
        return this.$http.get(`${this.userEndpoint}${userName}`, this.basicConfig);
    }


    /**
     * Get list of users.
     * If lastUserId is specified it will return next 5 users a after this id.
     *
     * @param lastUserId
     *
     * @return {Promise}
     */
    getUsersList(lastUserId) {
        this.basicConfig.params = {per_page: 5};
        if (lastUserId !== undefined) {
            this.basicConfig.params.since = lastUserId;
            return this.$http.get(`${this.userListEndpoint}`, this.basicConfig);
        } else {
            return this.$http.get(this.userListEndpoint, this.basicConfig);
        }
    }

    /**
     * Get list of public user repositories
     *
     * @param userName
     * @param page
     *
     * @return {Promise}
     */
    getUserRepos(userName, page) {
        this.basicConfig.params = {type: 'public', page: page, per_page: 5};
        return this.$http.get(`${this.userListEndpoint}/${userName}/repos`, this.basicConfig);
    }

    /**
     * Get single repository of user
     *
     * @param userName
     * @param repoName
     *
     * @return {Promise}
     */
    getRepo(userName, repoName) {
        this.basicConfig.params = {};
        return this.$http.get(`${this.baseReposEndpoint}${userName}/${repoName}`, this.basicConfig);
    }

    /**
     * Get list of branches of specific repository
     *
     * @param userName
     * @param repoName
     *
     * @return {Promise}
     */
    getBranches(userName, repoName) {
        this.basicConfig.params = {};
        return this.$http.get(`${this.rootEndpoint}/repos/${userName}/${repoName}/branches`, this.basicConfig);
    }

    /**
     * Get single branch
     *
     * @param userName
     * @param repoName
     * @param branchName
     *
     * @return {Promise}
     */
    getBranch(userName, repoName, branchName) {
        this.basicConfig.params = {};
        return this.$http.get(`${this.rootEndpoint}/repos/${userName}/${repoName}/branches/${branchName}`, this.basicConfig);
    }

    /**
     * Get list of branch commits
     *
     * @param userName
     * @param repoName
     * @param branchName
     *
     * @return {Promise}
     */
    getBranchCommits(userName, repoName, branchName) {
        this.basicConfig.params = {sha: branchName};
        return this.$http.get(`${this.rootEndpoint}/repos/${userName}/${repoName}/commits`, this.basicConfig);
    }

    /**
     * Receives array of user names and sends request for each user individually
     * This method exists because GitHub does not return emails for users if you send request to their user list endpoint
     *
     * @param userNames
     * @returns {Spy.callData[]|Promise.<*>|*|{configFile}|Promise}
     */
    getFullUsersData(userNames) {
        let promises = [];
        userNames.forEach((userName, index) => {
            promises.push(this.getUser(userName));
        });

        return this.$q.all(promises);
    }

    /**
     *
     * @param {Array} users
     * @returns {Array}
     */
    getUserNames(users) {
        let userNames = [];
        users.forEach((user) => {
            userNames.push(user.login)
        });

        return userNames;
    }
}