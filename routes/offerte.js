// Load Modules
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// standaard file path
var filesPath = __dirname + "../public";

// variable aanmaken
var siteData = 0;
var project = {};
// functie om offerte data uit JSON te laden
var loadSiteData = function () {siteData = require("../public/data/data.json");}
// data laden
loadSiteData();

// custom link voor bedrijven
router.get('/', function (req, res, next) {
	var offerte = req.query.offerte;

	for (var i = 0; i != siteData.length; i++) {
		if (siteData[i].offerteNr == req.query.offerte) {
			project = siteData[i];
		}
	};

	if (!project) { 
		res.send("Sorry, we hebben uw offerte niet kunnen vinden :(");
	}

	var data = {
		id: req.params.index,
		project: project,
		req: req
	}

	res.render("./offerte", {data:data});
});

router.post('/', function (req, res, next) {

	for (var i = 0; i != siteData.length; i++) {
		if (siteData[i].offerteNr == req.query.offerte) {
			project = siteData[i];
		} 
	};

	if (!project) { 
		res.send("Sorry, we hebben uw offerte niet kunnen vinden :(");
	}

	var newData = project;
	newData.accord = "true";

	var w = [];
	for(var b = 0; b != siteData.length; b++){
		w.push(siteData[b].id);
	}

	if(w.indexOf(newData.id) == -1) {
		siteData.push(newData);
	} else {
		var w = [];
		for(var b = 0; b != siteData.length; b++){
			if(siteData[b].id == newData.id) {
				siteData[b] = newData;				
			}
		}
	}

	fs.writeFile("public/data/data.json", JSON.stringify(siteData, null, '\t'), function(err) {
	    if(err) {console.log(err);}
	}); 

	var data = {
		id: req.params.index,
		project: project,
		req: req
	}

	res.render("./offerte", {data:data});
}); 

// export de routers
module.exports = router;

