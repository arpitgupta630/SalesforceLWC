import { LightningElement, api } from 'lwc';
import createAccount from '@salesforce/apex/createAccountRecordLWC_UI.createAccount';

export default class OuterComponent extends LightningElement {
    
    @api recordId;

    createAcc(){
        let accName = this.template.querySelector('[data-id="acc-name"]').value;
        let accNOE = this.template.querySelector('[data-id="acc-noe"]').value;
        let accRevenue = this.template.querySelector('[data-id="acc-revenue"]').value;
        let accRating = this.template.querySelector('[data-id="acc-rating"]').value;
        
        let jasonVar = {
            accountName: accName,
            accountNOE: accNOE,
            accountRevenue: accRevenue,
            accountRating: accRating
        };
        
        createAccount({
            recivedMap : jasonVar
        }).then(result=>{
            console.log("Record Created Successfully");
            this.template.querySelector("c-inner-component").displayRecordOnChild();
        }).catch(error=>{
            console.log("ERROR in Record Creation");
            console.log(error);
        })
    }

}