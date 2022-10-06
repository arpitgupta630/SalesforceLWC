import { LightningElement } from 'lwc';

export default class ConstructorExampleParent extends LightningElement {

    constructor(){
        super();
        console.log('Parent Checking Constructor');        
    }
    connectedCallback(){
        console.log('Parent Checking Connected Callback');
    }
    renderedCallback(){
        console.log('Parent Checking Rendered Callback');
    }
    errorCallback(error, stack){
        console.log('Parent Error Callback');
        console.log(error);
        console.log(stack);
    }

    display = true;
    handleClick(event){
        if(this.display){
            this.display = false;
        }else{
            this.display = true;
        }
    }

}