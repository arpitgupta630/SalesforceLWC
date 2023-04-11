import { LightningElement } from 'lwc';
import objFieldSet from '@salesforce/apex/GetFieldSet.objFieldSet';

export default class TetOctober extends LightningElement {

    value;
    fieldSets=[1,2,3,4];
    showLayout = false;

    get objects() {
        return [
            { label: 'Account', value: 'Account' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Opportunity', value: 'Opportunity' },
        ];
    }

    get fields(){
        //return this.fieldSets;
        return [
            { label: 'Account', value: 'Account' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Opportunity', value: 'Opportunity' },
        ];
    }

    get option(){
        return [
            { label: 'Fix', value: 'Fix' },
            { label: 'Random', value: 'Random' }
        ];
    }

    handleChange(event){
        this.value = event.detail.value;
        console.log(this.value);
        let jsonObj = {};
        objFieldSet({
            objectName : this.value
        }).then(result=>{
            this.fieldSets = [...result];
            console.log(this.fieldSets);
            this.showLayout = true;
        }).catch(error=>{
            console.log(error);
        })
        
    }
}