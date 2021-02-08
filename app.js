var express = require("express");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let artistArray = [
	{
		id: 1,
		name: "Kanye",
		albumsArray: [
			{
				id: 1,
				name: "The coding dropout",
			},
		],
		topSongs: [
			{
				id: 1,
				name: "The Javascript State of Mind",
			},
		],
	},
	{
		id: 2,
		name: "Chris Brown",
		albumsArray: [
			{
				id: 1,
				name: "The Greatest Algorithm",
			},
		],
		topSongs: [
			{
				id: 1,
				name: "Wheel on the bus",
			},
		],
	},
];

/*
app.METHOD(PATH, HANDLER)

app is an instance of express.
METHOD is an HTTP request method, in lowercase.
PATH is a path on the server.
HANDLER is the function executed when the route is matched.
*/

app.get("/", function (req, res) {
	res.send("Express Intro Test");
});

// GET Problems //

// #1 All artists
app.get("/artists", function (req, res) {
	res.status(200).json({
		artistArray,
	});
});

// #2 Artist names
app.get("/artists/names", function (req, res) {
	let artistNames = [];

	artistArray.forEach(function (obj) {
		artistNames.push(obj.name);
	});
	console.log(artistNames);

	res.status(200).json({
		artistNames,
	});
});

// #3 Artist by ID
app.get("/artist/:id", function (req, res) {
	let artist = artistArray.filter((x) => {
		if (x.id === parseInt([req.params.id])) {
			return x;
		}
	});

	res.status(200).json(artist);
});

// #4 Artist album by ID
app.get("/artist/:id/album/:albumID", function (req, res) {
	let artist = artistArray.filter((x) => {
		if (x.id === parseInt([req.params.id])) {
			return x;
		}
	});

	let album = artist[0].albumsArray.filter((x) => {
		if (x.id === parseInt([req.params.albumID])) {
			return x;
		}
	});

	res.status(200).json(album);
});

// #5 Artist's top songs by ID
app.get("/artist/:id/top-songs/", function (req, res) {
	let artist = artistArray.filter((x) => {
		if (x.id === parseInt([req.params.id])) {
			return x;
		}
	});

	let songs = artist[0].topSongs;

	res.status(200).json({
		songs,
	});
});

// #6 Artist or song or album doesn't exist
app.get("/artist/:id", function (req, res) {
	let artist = artistArray.filter((x) => {
		if (x.id === parseInt([req.params.id])) {
			return x;
		}
	});

	if (artist.length === 0) {
		artist = "Sorry, the artist you are looking for does not exist.";
	}

	res.status(200).json(artist);
});

// POST Problems //

// #7
app.post("new-album/:id", function (req, res) {
	artistArray.forEach((artist) => {
		if (artist.id == req.params.artistID) {
			artist.albumsArray.push(req.body);
		}
	});
	res.status(200).json({
		artistArray,
	});
});

// #8
app.post("/new-song/:id", function (req, res) {
	artistArray.forEach((artist) => {
		if (artist.id == req.params.artistID) {
			artist.topSongs.push(req.body);
		}
	});
	res.status(200).json({
		artistArray,
	});
});

// PUT Problems //

// #10
app.put("/update-name/:id", function (req, res) {
	artistArray.forEach((artist) => {
		if (artist.id == req.params.artistID) {
			artist.name = Object.values(req.query).toString();
		}
	});
	res.status(200).json({
		artistArray,
	});
});

// #11
app.put("update-album/:id", function (req, res) {
	artistArray.forEach((artist) => {
		if (artist.id == req.params.artistID) {
			artist.albumsArray.forEach((album) => {
				if (album.id == req.params.albumID) {
					album.name = Object.values(req.query).toString();
				}
			});
		}
	});
	res.status(200).json({
		artistArray,
	});
});

// #12
app.put("update-song/:id", function (req, res) {
	artistArray.forEach((artist) => {
		if (artist.id == req.params.artistID) {
			artist.topSongs.forEach((song) => {
				if (song.id == req.params.songID) {
					song.name = Object.values(req.query).toString();
				}
			});
		}
	});

	res.status(200).json({
		artistArray,
	});
});

// DELETE Problems //

// #14
app.delete("/delete-artist/:id", function (req, res) {
	artistArray.forEach((artist) => {
		if (artist.id == req.params.artistID) {
			delete artist.name;
			delete artist.id;
			delete artist.albumsArray;
			delete artist.topSongs;
		}
	});
	res.status(200).json({
		artistArray,
	});
});

// #15
app.delete("/delete-album/:id/", function (req, res) {
	artistArray.forEach((artist) => {
		if (artist.id == req.params.artistID) {
			artist.albumsArray.forEach((album) => {
				if (album.id == req.params.albumID) {
					delete album.id;
					delete album.name;
				}
			});
		}
	});
	res.status(200).json({
		artistArray,
	});
});

// #16

/* PORT NUMBER */

app.listen(3001, () => {
	console.log("STARTED");
});

/*
function checkIfExists(req, res) {}
app.get("/artist/:artistID", function (req, res) {
  let found = false;
  artistArray.forEach((item) => {
    if (item.id === Number(req.params.artistID)) {
      found = true;
    }
  });
  if (found) {
    res.status(200).send(`found`);
  } else {
    res.status(404).send(`Sorry the artist you are looking for does not exist`);
  }
});
*/
