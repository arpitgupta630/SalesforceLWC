import { LightningElement, api } from 'lwc';

export default class MessageParent extends LightningElement {

    @api parentProperty;
    handleChange(){
        this.parentProperty = this.template.querySelector(".name").value;
    }
}