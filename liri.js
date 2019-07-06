// .env File
require("dotenv").config();

// Variables
var fs = require("fs");

var keys = require("./keys.js"); 

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var moment = require('moment');

var request = require("request");

var bandsintown = (keys.bandsintown);


// Data Input Variables
var dataInput = process.argv[2];
var dataQuery = process.argv.slice(3).join(" ");


// APP Function
function commandsInput(dataInput, dataQuery) {
    // make a decision based on the command
    switch (dataInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doThis(dataQuery);
            break;
        default:
            console.log("I don't understand");
            break;
    }
}
commandsInput(dataInput, dataQuery);

function concertThis() {
    console.log(`\n${dataQuery.toLocaleUpperCase()}'s Next Concert:`);
    // Bands in town query
    request("https://rest.bandsintown.com/artists/" + dataQuery + "/events?app_id=" + bandsintown, function (error, response, body) {
        // If no error - StatusCode is good
        if (!error && response.statusCode === 200) {
            var userBand = JSON.parse(body);
            // Results
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {

                    // Console.log information
                    console.log(`\nArtist: ${userBand[i].lineup[0]}
                    \nVenue: ${userBand[i].venue.name}
                    \nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}\n`)

                    // Moment.js: Date Format = MM/DD/YYYY
                    let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log(`Date and Time: ${concertDate}\n`);
                };
            } else {
                console.log('Not Found!');
            };
        };
    });
};

function spotifyThisSong() {
    console.log(`\nSong Title Search: "${dataQuery.toLocaleUpperCase()}"`);

    // If request not found, "The Sign by Ace of Base" 
    if (!dataQuery) {
        dataQuery = "The Sign by Ace of Base"
    };

    // Spotify search format
    spotify.search({
        type: 'track',
        query: dataQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error Occurred!: ' + error);
        }
        // Store data in an array
        var spotifyArray = data.tracks.items;

        for (i = 0; i < spotifyArray.length; i++) {
            console.log(`\nArtist: ${data.tracks.items[i].album.artists[0].name} 
            \nSong: ${data.tracks.items[i].name}
            \nAlbum: ${data.tracks.items[i].album.name}
            \nSpotify Link: ${data.tracks.items[i].external_urls.spotify}\n`)
        };
    });
}

function movieThis() {
    console.log(`\nMovie Title Search: "${dataQuery.toLocaleUpperCase()}"`);
    if (!dataQuery) {
        dataQuery = "Mr Nobody";
    };
    // OMDB Query
    request("http://www.omdbapi.com/?t=" + dataQuery + "&apikey=trilogy", function (error, response, body) {
        var userMovie = JSON.parse(body);

        // Store Rotten Tomatoes Rating
        var ratingsArray = userMovie.Ratings;
        if (ratingsArray.length > 2) {}

        if (!error && response.statusCode === 200) {
            console.log(`\nTitle: ${userMovie.Title}
            \nCast: ${userMovie.Actors}
            \nReleased: ${userMovie.Year}
            \nIMDb Rating: ${userMovie.imdbRating}
            \nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}
            \nCountry: ${userMovie.Country}
            \nLanguage: ${userMovie.Language}
            \nPlot: ${userMovie.Plot}\n`)
        } else {
            return console.log("Error:" + error)
        };
    })
};

function doThis() {
    // Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // Store data in array
        var dataArray = data.split(",");

        // File, random.txt data passed into arrays
        dataInput = dataArray[0];
        dataQuery = dataArray[1];

        // Call commandsInput function
        commandsInput(dataInput, dataQuery);
    });
};