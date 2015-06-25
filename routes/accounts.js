// Load Modules
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// standaard file path
var filesPath = __dirname + "../public";

// variable aanmaken
var siteData2 = 0;
// functie om offerte data uit JSON te laden
var loadSiteData2 = function () {siteData2 = require("../public/data/data2.json");}
// data laden
loadSiteData2();

router.get('/', function (req, res, next) {
		// inlog check
	if (req.session.username) {
		var data = {
			accountData: siteData2,
			req: req
		}

		res.render("./accounts", {data:data});
	} else {
		res.redirect("./../login");
	}
});

// pagina om account toe tevoegen
router.get('/addAccount', function (req, res, next) {

	// inlog check
	if (req.session.username) {

		var data = {
			req: req
		}

		res.render("./addAccount", {data:data});
	} else {
		res.redirect("./../login");
	}
});

router.post('/addAccount', function (req, res, next) {

	var fp = "public/images";
	var image = req.files.image;

	if(image) {
		var format = path.extname(image);
		fs.	rename(image.path, fp + "/" + req.body.name + "." + image.extension, function (err) {
			if(err){ console.log("ojee"); }
		});	
	}

	var newData = {
		"u": req.body.name,
		"p": req.body.password
	}

	var w = [];
	for(var b = 0; b != siteData2.length; b++){
		w.push(siteData2[b].u);
	}
	var c = w.indexOf(newData.u);
	if(c == -1) {
		siteData2.push(newData);
	} else {
		var w = [];
		for(var b = 0; b != siteData2.length; b++){
			if(siteData2[b].u == newData.u) {
				siteData2[b] = newData;				
			}
		}
	}

	fs.writeFile("public/data/data2.json", JSON.stringify(siteData2, null, '\t'), function(err) {
	    if(err) {console.log(err);}
	}); 
	res.redirect(req.baseUrl);
});

router.get('/remove/account/:index', function (req, res, next) {
	if (req.session.username) {

		var index = req.params.index;
		var w = [];
		for(var b = 0; b != siteData2.length; b++){
			w.push(siteData2[b].u);
		}
		var u = w.indexOf(index);
		if (u > -1) {
			siteData2.splice(u, 1);
		}

		var fp = "public/images";
		fs.unlink(fp + "/" + index + ".png", function (err) {
		  if (err) {console.log("meh")};
		});

		fs.writeFile("public/data/data2.json", JSON.stringify(siteData2, null, '\t'), function(err) {
		    if(err) {console.log(err);}
		}); 

		res.redirect("/accounts");
	} else {
		res.redirect("./../login");
	}
});

// export de routers
module.exports = router;

