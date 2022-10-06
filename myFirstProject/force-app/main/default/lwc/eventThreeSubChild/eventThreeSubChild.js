import { LightningElement } from 'lwc';

export default class EventThreeSubChild extends LightningElement {

    handleClick(){

        let userName = this.template.querySelector('[data-id="user-name"]').value;
        let userAge = this.template.querySelector('[data-id="user-age"]').value;
        let customEventVar = new CustomEvent('senddata', {
            detail : {
                name : userName,
                age : userAge
            },
            bubbles : true,
            composed : true
        });
        this.dispatchEvent(customEventVar);

    }
}