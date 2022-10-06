import { LightningElement } from 'lwc';

export default class GetStudentByEmailChild extends LightningElement {

    handleClick(){

        let emailId = this.template.querySelector('[data-id="email"]').value;
        let customEventVar = new CustomEvent('senddata', {
            detail : emailId,
            bubbles : true
        });
        this.dispatchEvent(customEventVar);

    }
}