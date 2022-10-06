import { LightningElement } from 'lwc';
import createAccount from '@salesforce/apex/createAccountRecordLWC.createAccount'

export default class CreateAccountRecord extends LightningElement {

    nameField;
    noeField;
    createAcc(){
        this.nameField = this.template.querySelector('[data-id="acc-name"]').value;
        this.noeField = this.template.querySelector('[data-id="acc-employees"]').value;

        createAccount({
            accountName : this.nameField,
            accountNOE : this.noeField
        }).then(result=>{

            //* code for success
            console.log('Record Inserted Successfully');
            console.log(result);

        }).catch(error=>{

            //* code for error
            console.log('ERROR');
            console.log(error);

        })
    }
}