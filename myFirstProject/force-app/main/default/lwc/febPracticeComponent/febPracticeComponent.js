import { LightningElement } from 'lwc';

export default class FebPracticeComponent extends LightningElement {

    myVar = false;
    count = 2;
    myFirstFunc(){
        let my = 10;
        my++;
        console.log(my);
        console.log(this.count);
        if(this.count%2 == 0){
            this.myVar = true;
            this.count++
        }else{
            this.myVar = false;
            this.count++
        }

        
        //this.myVar = this.template.querySelector(".hello").value;
    }
}