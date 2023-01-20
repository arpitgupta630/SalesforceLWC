import { LightningElement } from 'lwc';

export default class ExampleOfChildComponent extends LightningElement {

    accountList = ['Acc1', 'Acc2', 'Acc3', 'Acc4', 'Acc5', 'Acc6']
    accountMsg = 'Nothing';
    renderedCallback(){
        console.log('Child Renderd');
    }

    click(){
        if(this.accountMsg == 'Hello')
            this.accountMsg = 'World'
        else
            this.accountMsg = 'Hello'

        //console.log('Msg : ',this.accountMsg);
    }

}