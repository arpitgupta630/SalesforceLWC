import { LightningElement ,track} from 'lwc';
import getVideos from '@salesforce/apex/YTController.getYTVideos';

export default class YTSearchPlayer extends LightningElement {
    @track finalresult = [];
    @track finalError = '';
    @track searchInput = 'Cyntexa';
    @track videoResults = [];
    @track viewUrl = '';

    connectedCallback(){
        this.handleSubmit();
    }

    handleSearch(event){
        this.searchInput = event.target.value;
        console.log('This is searchInput::'+ this.searchInput);
    }

    handleSubmit(){
        getVideos({searchKey:this.searchInput})
        .then ((results)=>{
            this.videoResults = results;
            console.log('This is final video results ::'+ JSON.stringify(this.videoResults));

            if (this.videoResults.length > 0) {
                this.showVideoInIframe(this.videoResults[0].videoId);
            }
        })
        .catch((error)=>{
            this.finalError = error.body.message;
            console.log('This is final video results ::'+ this.finalError);
        })

    }

    showVideoInIframe(videoId){
        this.viewUrl = 'https://www.youtube.com/embed/'+videoId;
    }
    
    isPlay = false;
    watchVideo(event){
        this.isPlay = true;
        let slt = event.currentTarget.dataset.id;
        console.log('This is selected video:'+ slt);
        this.viewUrl = 'https://www.youtube.com/embed/'+slt;
    }
}