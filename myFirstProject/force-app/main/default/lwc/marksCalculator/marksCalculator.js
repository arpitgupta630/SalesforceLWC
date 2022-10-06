import { LightningElement } from 'lwc';

export default class MarksCalculator extends LightningElement {
    
    Message = '';
    showDiv = false;

    showResult(event) {
        console.log(event);
        console.log(event.target);
        console.log(event.currentTarget);
        var mathMarks = Number(this.template.querySelector(".math-marks").value);
        var scienceMarks = Number(this.template.querySelector(".science-marks").value);
        var totalMarks = mathMarks + scienceMarks;
        var percentage = (mathMarks + scienceMarks)/2
        console.log(mathMarks);
        console.log(scienceMarks);
        console.log(totalMarks);
        console.log(percentage);
        this.showDiv = true;
        if (percentage > 60){
            this.Message = "Pass";
            console.log("Pass");
        }else{
            this.Message = "Fail";
            console.log("Fail");
        }

    }
}