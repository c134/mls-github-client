export default function routes($stateProvider, $urlServiceProvider) {
    $urlServiceProvider.rules.otherwise('/users');

    $stateProvider.state('userlist', {
        url: '/users',
        component: 'userListComponent',
    }).state('details', {
        url: '/details/:username',
        params: {user: null},
        component: 'userDetailsComponent',
    }).state('repository', {
        url: '/repository/:username/:reponame',
        component: 'repositoryComponent',
    });

}