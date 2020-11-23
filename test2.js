var unirest = require("unirest");

var req = unirest("POST", "https://ticketmasterstefan-skliarovv1.p.rapidapi.com/searchEvents");

req.headers({
	"content-type": "application/x-www-form-urlencoded",
	"x-rapidapi-key": "c188f25228msh18229ed396f6845p1a37bcjsn8929e9d437bd",
	"x-rapidapi-host": "Ticketmasterstefan-skliarovV1.p.rapidapi.com",
	"useQueryString": true
});

req.form({
	"apiKey": "undefined"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});