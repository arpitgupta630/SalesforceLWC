import { LightningElement } from 'lwc';

export default class DecoratorExampleParent extends LightningElement {
    name = "";
    testFunction(){
        const value = this.template.querySelector(".child")
        this.name = value.childProperty;
    }
}