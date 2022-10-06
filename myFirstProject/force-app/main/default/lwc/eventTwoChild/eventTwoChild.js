import { LightningElement } from 'lwc';

export default class EventTwoChild extends LightningElement {

    userName;
    userAge;

    reciveData(event){

        this.userName = event.detail.name;
        this.userAge = event.detail.age;
    }
    divFuncn(){
        console.log('ALERT from eventTwoChild!!! Bubble is TRUE');
    }
}