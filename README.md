# liri-node-app

•	Deployment Date 11/07/2018
•	Built With Node.js, Javascript
•	APIs OMDB, Spotify, Bandsintown


Description & Requirements
________________________________________
Liri is a command line application that takes user commands and queries from the command line and returns data from API's. 

The following commands provide the user the capability to look up songs, concerts and movie information:
concert-this:	uses the bandsintown API to take a band name from the user and returns that bands next concert
spotify-this:	uses the spotify API to take a song name from the user and returns the artist, song name, spotify-link and album
movie-this:	uses the OMDB API to take a movie name and returns the name, cast, release year, IMDB and Rotten Tomatoes rating, country of origin, language and plot
do-this:	uses the built in readFile() method to access data from a prepopulated .txt file and return its information as a command/search query.

Required Node Packages:
1.	Dotenv
2.	Request
3.	Moment
4.	Fs
