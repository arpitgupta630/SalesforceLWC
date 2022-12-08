import { LightningElement, api,wire, track} from 'lwc';
import getAllObjects from '@salesforce/apex/getAllObjectsAndFields.getAllObjects';
import getAllFields from '@salesforce/apex/getAllObjectsAndFields.getAllFields';
import getCSVobject from '@salesforce/apex/getCSVheaderAndBody.getCSVobject';
import createRecord from '@salesforce/apex/createRecordOfAnyObject.createRecord'

export default class CustomDataImportWizard extends LightningElement {
    
    fileData;
    option;

    @wire (getAllObjects) allObject(result){
        let objectList = result.data;
        let temp=[];
        if(objectList != undefined){
            for(let object of objectList){
                temp.push({ label: object, value: object });
            }
            this.option=[...temp]
        }
    };

    get options(){
        return this.option;
    }

    
    value;
    allFields;
    handleChange(event){
        this.value = event.detail.value;
        getAllFields({
            requestedObject : this.value
        }).then(result=>{
            console.log(result);
            this.allFields = JSON.parse(JSON.stringify(result));
        })
    }

    selectedFields=[];
    handleDragStart(event) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData("text/plain", event.target.innerHTML);
    }
    handleDrop(event) {
        event.target.innerHTML = event.dataTransfer.getData("text");
        console.log(event.dataTransfer.getData("text"));
        this.selectedFields.push(event.dataTransfer.getData("text"));
    }
    handleDragover(event) {
        event.preventDefault();
    }

    columnHeader;
    @track showTable = false;
    @track csvString;
    @track csvFile;
    lines;
    handleUploadFinished(event) {
        let csvFile = event.detail.files[0];

        let newPromise = new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.readAsText(csvFile);
        }).then(result => {
                this.csvString = result;
                console.log(this.csvString);
                getCSVobject({ 
                    stringFile: this.csvString 
                }).then(response => {
                        console.log(response);

                        this.columnHeader = response.headers[0];
                        console.log(this.columnHeader);

                        this.lines = JSON.parse(JSON.stringify(response.bodies));
                        console.log(this.lines);
                        this.showTable = true;
                }).catch(error => {
                        console.log("Error : " + error.body.message);
            });
        }).catch(error => {
                console.log(error.message.body);
        });
    }
    @track btnFlag = false;
    insertedRecords;
    insertRecord(){
        this.btnFlag = true;
        console.log(this.selectedFields);
        createRecord({
            objectName : this.value,
            fieldList : this.selectedFields,
            csvRecords : this.lines
        }).then(result=>{
            console.log(result);
            this.insertedRecords = result;
            console.log(this.insertedRecords);
        }).catch(error=>{
            console.log(error);
        })
    }
}