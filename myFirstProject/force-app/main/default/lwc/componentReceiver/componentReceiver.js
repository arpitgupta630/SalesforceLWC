import { LightningElement, wire } from 'lwc';
import lmsExample from '@salesforce/messageChannel/lmsExample__c';
import { subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';

export default class ComponentReceiver extends LightningElement {

    @wire(MessageContext) msgContext;
    subscription;

    listenFunction(message){
        console.log(message);
        console.log('I am able to Listen \n~ from componentReceiver');
    }

    subscribeToChannel(){
        this.subscription = subscribe(this.msgContext, lmsExample,(msg)=>this.listenFunction(msg), {scope:APPLICATION_SCOPE});
    }

    connectedCallback(){
        this.subscribeToChannel();
    }

}