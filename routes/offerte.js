// Extenties en plugins ed

// Template engine
var express = require('express');
// router engine
var router = express.Router();
// file system engine
var fs = require('fs');

var path = require('path');


// standaard file path
var filesPath = __dirname + "../public";

// variable aanmaken
var siteData = 0;

// functie om offerte data uit JSON te laden
var loadSiteData = function () {

	siteData = require("../public/data/data.json");
	// console.log("test");
}

// data laden
loadSiteData();





// custom link voor bedrijven
router.get('/', function (req, res) {

	var offerte = req.query.offerte;

	var project = {};


	for (var i = 0; i != siteData.length; i++) {
		// console.log(siteData[i].offerteNr);
		if (siteData[i].offerteNr == req.query.offerte) {
			// console.log(siteData[i]);
			project = siteData[i];
		} else { 
			// res.render("./404", {data:data, req:req});
		}
	};


	// console.log(project["image"]);

	var data = {
		id: req.params.index,
		project: project,
		req: req
	}

	res.render("./offerte", {data:data, req:req});
});




router.post('/', function (req, res) {



	var project = {};


	for (var i = 0; i != siteData.length; i++) {
		// console.log(siteData[i].offerteNr);
		if (siteData[i].offerteNr == req.query.offerte) {
			// console.log(siteData[i]);
			project = siteData[i];
		} else { 
			// res.render("./404", {data:data, req:req});
		}
	};





	var newData = project;

	newData.accord = "true";

	console.log(project);


		var w = [];
		var b = 0;
		for(b = 0; b != siteData.length; b++){
			var q = siteData[b];
				if(q) {
				w.push(q.id);
			}
		}
		console.log(w);
		var c = w.indexOf(newData.id);
		console.log(c);
		if(c == -1) {
			siteData.push(newData);
		} else {

			var w = [];
			var b = 0;
			for(b = 0; b != siteData.length; b++){
				var q = siteData[b];
				if(q) {
					if(q.id == newData.id) {

						siteData[b] = newData;

						console.log(b);
					
					}
				}
			}

		}



		fs.writeFile("public/data/data.json", JSON.stringify(siteData, null, '\t'), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		}); 



	var data = {
		id: req.params.index,
		project: project,
		req: req
	}

	res.render("./offerte", {data:data, req:req});

}); 





// export de routers
module.exports = router;

























































































