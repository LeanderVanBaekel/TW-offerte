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


var siteData2 = 0;

var loadSiteData2 = function () {

	siteData2 = require("../public/data/data2.json");
	// console.log("test");
}

// data laden
loadSiteData2();






// pagina om offertes toe tevoegen
router.get('/addAccount', function (req, res) {

	// inlog check
	if (req.session.username) {


		var data = {
			req: req
		}

		res.render("./addAccount", {data:data, req:req});
	} else {
		res.redirect(req.baseUrl + "/login");
	}
});

router.post('/addAccount', function (req, res) {


	var fp = "public/images";
	console.log(fp);


	var image = req.files.image;

	if(image) {
		var format = path.extname(image);
		console.log(image);
		console.log(format);
		fs.	rename(image.path, fp + "/" + req.body.name + "." + image.extension, function (err) {
			if(err){ console.log("ojee"); }
		});	
	}

	var newData = {
		"u": req.body.name,
		"p": req.body.password
	}


	var w = [];
	var b = 0;
	for(b = 0; b != siteData2.length; b++){
		var q = siteData2[b];
			if(q) {
			w.push(q.u);
		}
	}
	console.log(w);
	var c = w.indexOf(newData.u);
	console.log(c);
	if(c == -1) {
		siteData2.push(newData);
	} else {

		var w = [];
		var b = 0;
		for(b = 0; b != siteData2.length; b++){
			var q = siteData2[b];
			if(q) {
				if(q.u == newData.u) {

					siteData2[b] = newData;

					console.log(b);
				
				}
			}
		}

	}



	fs.writeFile("public/data/data2.json", JSON.stringify(siteData2, null, '\t'), function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	}); 


	res.redirect(req.baseUrl);
});











// export de routers
module.exports = router;

























































































