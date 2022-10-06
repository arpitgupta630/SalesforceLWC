import { LightningElement, api } from 'lwc';

export default class ConstructorExample extends LightningElement {

    erroPrp = false;
    constructor(){
        super();
        console.log('Child Checking Constructor');
    }
    connectedCallback(){
        //erroPrp = true;
        console.log('Child Checking Connected Callback');
    }
    renderedCallback(){
        console.log('Child Checking Rendered Callback');
    }
    disconnectedCallback(){
        console.log('Child Component Removed');
    }

}