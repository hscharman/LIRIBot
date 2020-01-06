require("dotenv").config();
var Spotify = require("node-spotify-api");
//Require the keys file which has my Spotify credentials. 
var keys = require("./keys");
//Create a var to hold the creds (must go AFTER requiriing keys file.)
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//getSpotify
var getArtistNames = function(artist) {
  return artist.name;
};

var getSpotify = function(songName) {
  if (songName === undefined) {
      //If no song name is specified, this is the default. 
    songName = "Rolling in the Deep";
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        //Log any errors that pop up. 
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;

      //Loop through the songs Spotify gives us and log the info we want. 
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};

//getMovie
var getMovie = function(movieName) {
  if (movieName === undefined) {
    //If no movie is specified, this is the default. 
    movieName = "Mr Nobody";
  }

  var movieURL =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(movieURL).then(
    function(response) {
      var jsonData = response.data;

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  );
};

//getConcerts
var getConcerts = function(artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      var jsonData = response.data;

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }

      console.log("Upcoming concerts for " + artist + ":");

      for (var i = 0; i < jsonData.length; i++) {
        var show = jsonData[i];

        // Print data for the concert.
        // Use Moment to format the show date. 
        console.log(
          show.venue.city +
            "," +
            (show.venue.region || show.venue.country) +
            " at " +
            show.venue.name +
            " " +
            moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};

//doWhatItSays - reads whatever is in random.txt and runs a case accordingly.
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      chooseCase(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      chooseCase(dataArr[0]);
    }
  });
};


//----------------------------------------------------------------------------------

//Runs the right case depending on user's input. 
var chooseCase = function(myCase, myQuery) {
  switch (myCase) {

  case "spotify-this-song":
    getSpotify(myQuery);
    break;
  case "movie-this":
    getMovie(myQuery);
    break;
  case "concert-this":
    getConcerts(myQuery);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("No results found. Try again!");
  }
};


//Takes in user's node inputs and runs the correlating function above. 
var runTheApp = function(inputOne, inputTwo) {
  chooseCase(inputOne, inputTwo);
};

//Finally, call the function to run the app after the user puts in a command. 
runTheApp(process.argv[2], process.argv[3]); 
  
