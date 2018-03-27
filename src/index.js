// ...
// This is the main module (entry point) for the application.
//
// It implements "Youtube Instant Search", providing search results while a title is entered by the user.
//
// NOTE: You must first create a project and API key @ console.developers.google.com and enable YouTube Data API v3.
//
// NOTE 2: This application currently doesn't work in Chrome! Use another browser to test.

// ...
// TODO: Import lodash and jquery.

// ...
// TODO: Require youtube-api-v3-search.

// ...
// TODO: 
//
// Implement a function that takes a video title entered by the user and performs a Youtube Search of type video,
// using the youtube-api-v3-search package.

//
// Read the documentation for youtube-api-v3-search for how such a search is performed. Set an extra option of 
// maxResults: 10.
//
// Inspect the results from YouTube Data API v3 to see what it returns; the goal is to fetch the videoId of 
// each video that was found (tip: use Array.map).
//
// Finally append the following HTML under #videos for each video:
//
// <iframe src="https://www.youtube.com/embed/${videoId}" />

// ...
// TODO: 
//
// Use debounce in lodash to "throttle" the execution of multiple calls to the search function if they occur
// too frequently, which will happen as the user enters the title to search for. 

// ...
// API_KEY: AIzaSyBJToz8rLZV26korxQsfEPV3u6uUPNhP1Q

const $YOUTUBE_KEY = "AIzaSyBJToz8rLZV26korxQsfEPV3u6uUPNhP1Q";
const youtubeSearch = require('youtube-api-v3-search');

var _ = require('lodash');
var $ = require("jquery");

var headers = {
    'Accept': 'application/json',
    'Authorization': `bearer ${$YOUTUBE_KEY}`
}

$('#videoTitle').on('keyup', _.debounce(search, 300));

function search (e){
    $("#videos").html("");
    const titleToSearch = e.target.value;
    const $options = {
        maxResults: '10',
        q: titleToSearch,
        part: 'snippet',
        type: 'video'
    }
    youtubeSearch($YOUTUBE_KEY, $options)
        .then(function(data){
            let searchRes = data.items;
            let result = searchRes.map(m => {
                return m.id.videoId
            })            
            for (var i = 0; i < result.length; i++){
                let video = result[i];
                $("#videos").append(`<iframe src="https://www.youtube.com/embed/${video}">`)
            }
        })
}