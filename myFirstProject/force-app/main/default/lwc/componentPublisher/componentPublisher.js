import { LightningElement, wire } from 'lwc';
import lmsExample from '@salesforce/messageChannel/lmsExample__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class ComponentPublisher extends LightningElement {

    @wire(MessageContext) msgContext;

    handleCLick(){

        let jsonMsg = {
            detail : "Hello Sibling \n~ from componentPublisher"
        }
        publish(this.msgContext, lmsExample, jsonMsg)
    }

}