import BackButtonController from '../controllers/back-button.controller';

export const backButtonComponent = {
    selector: 'backButtonComponent',
    templateUrl: '/templates/back-button.tpl.html',
    controller: BackButtonController,
    bindings: {
        detailsState: '<',
        onStateChange: '&'
    }
};