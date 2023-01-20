import { LightningElement ,track} from 'lwc';
import getVideos from '@salesforce/apex/YTController.getYTVideos';

export default class YTSearchPlayer extends LightningElement {
    @track finalresult = [];
    @track finalError = '';
    @track searchInput = 'Cyntexa';
    @track videoResults = [];
    @track allVideos = [];
    @track currentPage = 0;
    @track currentDisplayPage = 1;
    @track totalPage = 0;
    @track viewUrl = '';

    connectedCallback(){
        this.handleSubmit();
    }

    handleSearch(event){
        this.searchInput = event.target.value;
        console.log('This is searchInput::'+ this.searchInput);
    }

    handleSubmit(){
        this.currentPage = 0;
        this.currentDisplayPage = 1;
        getVideos({searchKey:this.searchInput})
        .then ((results)=>{
            let videos = results;
            let tempList = [[]];
            let index = 0;
            for(let i=0; i<videos.length; i++){
                if(i%5==0 && i!=0){
                    tempList.push([]);
                    index++
                }else{
                    tempList[index].push(videos[i])
                }
            }
            this.allVideos = [...tempList];
            this.videoResults = this.allVideos[0];
            this.totalPage = this.allVideos.length;
            console.log(tempList);

            for(let i=0; i<this.allVideos.length; i++){
                this.allVideos[i]['index'] = i+1;
            }

            if (this.videoResults[0].length > 0) {
                this.showVideoInIframe(this.videoResults[0][0].videoId);
            }
        })
        .catch((error)=>{
            this.finalError = error.body.message;
            console.log('This is final video results ::'+ this.finalError);
        })
        this.isPlay = false;
    }
    handleEnter(event){
        if(event.keyCode === 13){
          this.handleSubmit();
        }
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

    videoList = true;
    handleNext(){
        this.videoList = false;
        if(this.currentPage + 1 < this.allVideos.length){
            this.currentPage = this.currentPage + 1;
            this.videoResults = [...this.allVideos[this.currentPage]];
        }
        this.videoList = true;
        this.currentDisplayPage = this.currentPage + 1;
        console.log(this.currentPage);
        console.log(this.videoResults);
    }
    get disableNextBtn(){
        return this.allVideos.length == this.currentPage+1;
    }

    handlePrevious(){
        this.videoList = false;
        if(this.currentPage-1 > -1){
            this.currentPage = this.currentPage - 1;
            this.videoResults = [...this.allVideos[this.currentPage]];
        }
        this.videoList = true;
        this.currentDisplayPage = this.currentPage + 1;
        console.log(this.currentPage);
        console.log(this.videoResults);
    }
    get disablePreviousBtn(){
        return this.currentPage == 0
    }

    handleChange(event){
        let allBtn = JSON.parse(JSON.stringify(this.template.querySelectorAll('.slds-button')));
        console.log(allBtn);
        this.videoList = false;
        this.currentPage = Number(event.currentTarget.dataset.id);
        this.videoResults = [...this.allVideos[this.currentPage]];
        this.currentDisplayPage = this.currentPage + 1;
        this.videoList = true;
    }

}