import { LightningElement } from 'lwc';

export default class ExampleOfParentComponent extends LightningElement {

    renderedCallback(){
        console.log("Parent Rendered");
    }
}