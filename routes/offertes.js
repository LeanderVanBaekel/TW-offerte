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

router.get('/', function (req, res, next) {
	if (req.session.username) {
		var data = {
			offerteData: siteData,
			req: req
		}
		res.render("./offertes", {data:data});
	} else {
		res.redirect("./../login");
	}
});

router.get('/remove/:index', function (req, res, next) {
	if (req.session.username) {
		var index = req.params.index;
		var w = [];
		for(var b = 0; b != siteData.length; b++){
			w.push(siteData[b].offerteNr);
		}

		var u = w.indexOf(index);
		if (u > -1) {

			var fp = "public/data/afbeeldingen/";
			fs.unlink(fp + index + ".jpg" , function (err) {
				if (err) {
			  		console.log("meh");
			  		fs.unlink(fp + index + ".png" , function (err) {
			  			if (err) {console.log("meh")};
					});
				};
			});

			siteData.splice(u, 1);
		}

		fs.writeFile("public/data/data.json", JSON.stringify(siteData, null, '\t'), function(err) {
		    if(err) {console.log(err);}
		}); 

		res.redirect("/");
	} else {
		res.redirect("./../login");
	}
});

// pagina om offertes toe tevoegen
router.get('/add', function (req, res, next) {

	if (req.session.username) {
		var id = 0;
		for (var i = 0; i != siteData.length; i++) {
			if (siteData[i].id > id) {
				id = siteData[i].id;
			}
		};
		id++;

		var date = new Date();
		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;
		var min  = date.getMinutes();
		min = (min < 10 ? "0" : "") + min;
		var sec  = date.getSeconds();
		sec = (sec < 10 ? "0" : "") + sec;
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		month = (month < 10 ? "0" : "") + month;
		var day  = date.getDate();
		day = (day < 10 ? "0" : "") + day;
		var curDate = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
		var offerteNrGen = year + "-"+ month + id + "-" + req.session.username.substring(0,2);

		var data = {
			req: req,
			projectId: id,
			curDate: curDate,
			name: req.session.username,
			offerteNrGen: offerteNrGen
		}

		res.render("./add", {data:data});
	} else {
		res.redirect("./../login");
	}
});

router.post('/add', function (req, res) {

	var fp = "public/data/afbeeldingen";
	var image = req.files.image;

	if(image) {
		var format = path.extname(image);
		fs.renameSync(image.path, fp + "/" + req.body.offerteNr + "." + image.extension);
	}

	var offerteNrArray = [];
	for (var q = 0; q != siteData.length; q++) {
		offerteNrArray.push(siteData[q].offerteNr);
	}

	var input = req.body.offerteNr;
	var search = offerteNrArray.indexOf(input);
	if (search == 1) {
		res.redirect(req.baseUrl + "/add");
	} else {

		var newData = {
			"id": req.body.id,
			"offerteNr": req.body.offerteNr,
			"date": req.body.date,
			"contactPerson": req.body.contactPerson,
			"company": req.body.company,
			"email": req.body.email,
			"phone": req.body.phone,
			"image": null,
			"personalText": req.body.personalText,
			"employee": req.body.employee,
			"offerte": {
				"product": [],
				"subTotal": req.body.offerteSubTotal,
				"kortingEuro": req.body.offerteKortingEuro,
				"kortingPercent": req.body.offerteKortingPercent,
				"total": req.body.offerteTotal
			},
			"accord": "false"
		}

		if (newData.personalText) {
			var log = newData.personalText.replace(/\r\n/g, "<br>");
			newData.personalText = log;
		}

		if(image) {
			newData.image = req.body.offerteNr + "." + image.extension;
		} else {
			newData.image = req.body.standardImage + ".jpg";
		}

		var product1 = req.body.offerteProductName1,
			product2 = req.body.offerteProductName2,
			product3 = req.body.offerteProductName3,
			product4 = req.body.offerteProductName4;

		if (product1) {
			newData.offerte.product.push({
				"name": req.body.offerteProductName1,
				"extra": req.body.offerteProductExtra1,
				"amount": req.body.offerteProductAmount1,
				"unitPrice": req.body.offerteProductUnitPrice1,
				"totalPrice": req.body.offerteProductTotalPrice1
			});
		}

		if (product2) {
			newData.offerte.product.push({
				"name": req.body.offerteProductName2,
				"extra": req.body.offerteProductExtra2,
				"amount": req.body.offerteProductAmount2,
				"unitPrice": req.body.offerteProductUnitPrice2,
				"totalPrice": req.body.offerteProductTotalPrice2
			});
		}

		if (product3) {
			newData.offerte.product.push({
				"name": req.body.offerteProductName3,
				"extra": req.body.offerteProductExtra3,
				"amount": req.body.offerteProductAmount3,
				"unitPrice": req.body.offerteProductUnitPrice3,
				"totalPrice": req.body.offerteProductTotalPrice3
			});
		}

		if (product4) {
			newData.offerte.product.push({
				"name": req.body.offerteProductName4,
				"extra": req.body.offerteProductExtra4,
				"amount": req.body.offerteProductAmount4,
				"unitPrice": req.body.offerteProductUnitPrice4,
				"totalPrice": req.body.offerteProductTotalPrice4
			});
		}

		var w = [];
		for(var b = 0; b != siteData.length; b++){
			w.push(siteData[b].id);
		}

		var c = w.indexOf(newData.id);

		if(c == -1) {
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

		res.redirect("/offerte/?offerte=" + req.body.offerteNr);
	}
});

// export de routers
module.exports = router;

