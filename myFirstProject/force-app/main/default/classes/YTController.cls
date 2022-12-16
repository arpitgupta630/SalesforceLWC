public class YTController {
    private static final String SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
    private static final String API_KEY = 'AIzaSyDm5Rf299KYprRMaJLqcnw5Uv3TZWOAvws';
    
    @AuraEnabled(cacheable=true)
    public static list<mywrapper> getYTVideos(string searchKey){
        searchKey = searchKey == null ? 'salesforce' : searchKey;
        // YouTube API Callouts
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        Httpresponse res = null;
        String endpoint  = SEARCH_URL +
        '?part=snippet' +
        '&maxResults=100' +
        '&type=video' +
        '&q=' + EncodingUtil.urlEncode(searchKey, 'UTF-8') +
        '&key=' + API_KEY;

        req.setEndPoint(endpoint);
        req.setMethod('GET');
        res = http.send(req);

        //Deserializing json data
        YouTubeResult.Response response = (YouTubeResult.Response)JSON.deserialize(res.getBody(), YouTubeResult.Response.class);
        List<YouTubeResult.Item> items  =  response.items;

        //Filling Wrapper Data for lightning component
        List<MyWrapper> wrp  = new List<MyWrapper>();

        for (YouTubeResult.Item itemObj : items) {
            MyWrapper ytWrap = new MyWrapper();
            ytWrap.videoId = itemObj.id.videoId;
            ytWrap.description = itemObj.Snippet.description;
            ytWrap.thumbnails = itemObj.Snippet.thumbnails.medium.url;
            ytWrap.title = itemObj.Snippet.title;
            ytWrap.channelTitle = itemObj.Snippet.channelTitle;

            wrp.add(ytWrap);
        }
        return wrp;

    }
    public class MyWrapper{
        @AuraEnabled public string videoId {get;set;}
        @AuraEnabled public string description {get;set;}
        @AuraEnabled public String thumbnails {get;set;}
        @AuraEnabled public String title {get;set;}
        @AuraEnabled public String channelTitle {get;set;}
        @AuraEnabled public String publishedAt  {get;set;}
    }
}
