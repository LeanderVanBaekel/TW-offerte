// Load Modules
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// standaard file path
var filesPath = __dirname + "../public";

// variable aanmaken
var siteData = 0;
var siteData2 = 0;
// functie om offerte data uit JSON te laden
var loadSiteData = function () {siteData = require("../public/data/data.json");}
var loadSiteData2 = function () {siteData2 = require("../public/data/data2.json");}
// data laden
loadSiteData();
loadSiteData2();

// url/ = url/login
router.get('/', function (req, res, next) {
	res.redirect(req.baseUrl + "/login");
});

router.get("/login", function (req, res, next) {
	if (req.session.username) {
		res.redirect("/offertes");
	} else {
		var data = {
			req: req
		}
		res.render("./login", {data:data});
	}
});

router.post("/login", function (req, res, next) {	
	var username = req.body.username,
		password = req.body.password;

	for (var i = 0; i != siteData2.length; i++) {
		if (siteData2[i].u == username && siteData2[i].p == password) {
			req.session.username = username;
			res.redirect(req.baseUrl + '/offertes');
		}
	}
	if (!req.session.username) {
		res.redirect(req.baseUrl + '/login');
	}
});

router.get('/logout', function (req, res, next) {
	 req.session.destroy(function (err) {
	 	console.log(err);
	 });
	 res.redirect(req.baseUrl + '/');
})

// export de routers
module.exports = router;




