import { LightningElement, api } from 'lwc';

export default class LightningRecordEditForm extends LightningElement {

    @api recordId;

    resetValue(){

        let accField = this.template.querySelectorAll(".acc-field");

        accField.forEach(field=>{
            field.reset();
        })
    }

}