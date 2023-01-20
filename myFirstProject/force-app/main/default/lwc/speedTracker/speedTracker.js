import { LightningElement } from 'lwc';

export default class SpeedTracker extends LightningElement {
    
    Message = '';
    showDiv = false;
    showResult(event){
        
        this.showDiv = true;
        let speed = Number(this.template.querySelector(".speed").value);
        let speedDiv = this.template.querySelector(".speedDiv");
        if(speed>0 && speed<40){
            this.Message = "Normal";
            speedDiv.style.backgroundColor = "green";
        }else if(speed>40 && speed<60){
            this.Message = "Fast";
            speedDiv.style.backgroundColor = "yellow";
        }else if(speed>70){
            this.Message = "Very Fast";
            speedDiv.style.backgroundColor = "red";
        }
        
    }
}