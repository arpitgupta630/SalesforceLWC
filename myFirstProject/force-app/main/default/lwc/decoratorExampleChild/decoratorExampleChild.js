import { LightningElement, api } from 'lwc';

export default class DecoratorExampleChild extends LightningElement {

    @api childProperty;
    handleClick(event){
        this.childProperty  = event.target.value;
    }
}