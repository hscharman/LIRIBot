# LIRI Bot
This application is copycat of iPhone's SIRI. The difference is that, while SIRI interpret's speech, LIRI interprets written language. 

LIRI Bot is a command line Node application that takes in a user's parameters and returns data. LIRI Bot works with three different API's...

* Spotify API
* OMDB API
* Bands in Town API

...in order to fetch information on upcoming concerts, songs, and movies. 

## npm Dependencies
This application requires the following dependencies to work. 
1. Axios
2. Dotenv
3. Moment
4. Node Spotify API 

## How to Use LIRI Bot
Each command should be run in node. 
1. To search for a song and see its data, as well as 19 other similar song titles:

node liri.js spotify-this-song <song name>

<img width="746" alt="spotify_demo" src="https://user-images.githubusercontent.com/53710485/71858041-edc47100-30a6-11ea-8748-6b7918ec9cb7.PNG">


2. To search for a movie: 

node liri.js movie-this <movie title>

<img width="713" alt="omdb_demo" src="https://user-images.githubusercontent.com/53710485/71858133-59a6d980-30a7-11ea-968a-d862b18feea9.PNG">


3. To look up a band and see upcoming concert dates: 

node liri.js concert-this <band or artist name>

![Concert Demo](bands_demo.png)

4. To use data from an external text document for any of the above commands. This will pull text from the random.txt file in the project. Feel free to edit its contents to change what will be displayed when you run the command in node. 

node liri.js do-what-it-says 

![Do What it Says Demo](dowhat_demo.png)

5. To see a deployed version of the app, please visit [GitHub](https://hscharman.github.io/LIRIBot/) . 



## Technologies Used
* Axios 
* Dotenv
* Moment
* Node JS
* Spotify API
* OMDB API 
* Bands in Town API

### Author
Hannah Scharman 
