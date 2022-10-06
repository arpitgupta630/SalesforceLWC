import { LightningElement } from 'lwc';

export default class EventParent extends LightningElement {

    userName;
    userAge;

    reciveData(event){

        this.userName = event.detail.name;
        this.userAge = event.detail.age;
    }
    randomTest(){
        console.log('ALERT!!! Bubble is TRUE');
    }
}