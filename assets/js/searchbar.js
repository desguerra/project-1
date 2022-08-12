/** SEARCH BAR SECTION **/

var searchBarFormEl = document.querySelector("#search-bar-form"); // <form> ID
var animeInputEl = document.querySelector("#anime-title"); // form <input> id
var searchBarResEl = document.querySelector("#search-bar-results"); // search results <div> id

var getFranchiseData = function(title) {
    var franNewsUrl = "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=~" + title;

    fetch(franNewsUrl).then(function(res) {
        if (res.ok) {
            // parse XML data
            res.text().then(function(data) {
                var parser = new DOMParser();
                var xml = parser.parseFromString(data, "text/xml");

                // testing XML data output //
                console.log(xml);

                displayTitleData(xml);

            });
        } 
        else {
            console.log("Anime data Not Found");
        }
    })
    
    .catch(function(error) {
        console.log("Unable to connect to Anime News Network");
    });

};

var displayTitleData = function(data) {

    // if anime exists in data
    if (data.getElementsByTagName("anime").length > 0) {

        // get titles of anime that correspond to the search result
        var animeTag = data.getElementsByTagName("anime");
        for (var i = 0; i < animeTag.length; i++) { 
            var animeTVType = animeTag[i].getAttribute("type");
            if (animeTVType == "TV") {
                var animeTitleInfo = animeTag[i].getAttribute("name");
                console.log(animeTitleInfo);
            }
        };

        // TODO: for every title, append to the page
        
    }
    // if anime was not found in data
    else {
        console.log("Anime not found...");
    }
    


};

var formSubmitHandler = function(event) {
    event.preventDefault();

    var animeTitle = animeInputEl.value.trim();

    if (animeTitle) {
        getFranchiseData(animeTitle);

        // reset form
        animeInputEl.value = "";
    }
    else {
        // TODO: TURN THIS PLACEHOLDER INTO A MODAL!!!!!!!!!!!!
        console.log("please enter an anime title!!!!!!");
    }

};

searchBarFormEl.addEventListener("submit", formSubmitHandler);
