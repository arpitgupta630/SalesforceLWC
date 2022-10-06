import { LightningElement, api } from 'lwc';

export default class LightningRecordForm extends LightningElement {

    //@api recordId;  //! if we remove record id from here and html this form will work for create record
    @api objectApiName;
    fields = ['Name', 'NumberOfEmployees', 'AnnualRevenue', 'Rating'];

    handleSuccess(){
        console.log('Record Has Been Created');
    }
}