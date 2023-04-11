import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';

export default class ShowAlert extends LightningElement {

    async handleAlertClick() {
        await LightningAlert.open({
            message: 'this is the alert message',
            theme: 'inverse', // a red theme intended for error states
            label: 'Error!', // this is the header text
        });
        //Alert has been closed
    }
}