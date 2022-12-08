import { LightningElement } from 'lwc';
import IMAGES from "@salesforce/resourceUrl/static_images";
import getAllHorses from "@salesforce/apex/TetDecemberData.getAllHorses";

export default class TetDecember extends LightningElement {

    greenPointImage = IMAGES + '/static_images/images/Green-Point.png';
    redPointImage = IMAGES + '/static_images/images/Red-Point.png';

    horses;    
    connectedCallback(){
        getAllHorses().then(result=>{
            this.horses = result;
            console.log("Horse Data Entered");
            console.log(this.horses);
        }).catch(error=>{
            console.log("ERROR!!! Failed to Fetch Record");
            console.log(error);
        })
        this.objectName = "";
        this.fields = [];
        
    }

    isCreate = false;
    objectName;
    fields = [];
    createRace(){
        this.objectName = "Race__c";
        this.fields = ['Name', 'Race_Date__c']
        this.isCreate = true;
    }
    createHorse(){
        this.objectName = "Horse__c";
        this.fields = ['Name']
        this.isCreate = true;
    }
    horseToRace(){
        this.objectName = "Horse_in_Race__c";
        this.fields = ['Horse__c', 'Race__c']
        this.isCreate = true;
    }
    handleDialogClose(){
        this.isCreate=false;
    }
    handleSuccess(){
        this.isCreate=false;
        this.connectedCallback();
    }
}