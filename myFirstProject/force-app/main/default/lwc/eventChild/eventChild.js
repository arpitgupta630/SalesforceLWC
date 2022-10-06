import { LightningElement } from 'lwc';

export default class EventChild extends LightningElement {

    handleClick(){

        let userName = this.template.querySelector('[data-id="user-name"]').value;
        let userAge = this.template.querySelector('[data-id="user-age"]').value;
        let customEventVar = new CustomEvent('senddata', {
            detail : {
                name : userName,
                age : userAge
            },
            bubbles : false
        });
        this.dispatchEvent(customEventVar);

    }

}