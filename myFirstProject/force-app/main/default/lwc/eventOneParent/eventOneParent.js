import { LightningElement } from 'lwc';

export default class EventOneParent extends LightningElement {

    reciveDataParent(event){
        console.log("ALERT from eventOneParent ");
    }
}