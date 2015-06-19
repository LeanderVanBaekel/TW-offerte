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


var siteData2 = 0;

var loadSiteData2 = function () {

	siteData2 = require("../public/data/data2.json");
	// console.log("test");
}

// data laden
loadSiteData2();



router.get('/offertes', function (req, res) {
		// inlog check
	if (req.session.username) {

		var data = {
			offerteData: siteData,
			req: req
		}

		res.render("./offertes", {data:data, req:req});
	} else {
		res.redirect(req.baseUrl + "/login");
	}
});



router.get('/accounts', function (req, res) {
		// inlog check
	if (req.session.username) {

		var data = {
			accountData: siteData2,
			req: req
		}

		res.render("./accounts", {data:data, req:req});
	} else {
		res.redirect(req.baseUrl + "/login");
	}
});



router.get('/remove/:index', function (req, res, next) {
	if (req.session.username) {

		var index = req.params.index;
		var w = [];
		var b = 0;
		for(b = 0; b != siteData.length; b++){
			var q = siteData[b];
			if(q) {
				w.push(q.offerteNr);
			}
		}
		var u = w.indexOf(index);
		if (u > -1) {
			siteData.splice(u, 1);
		}

		fs.writeFile("public/data/data.json", JSON.stringify(siteData, null, '\t'), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		}); 

		res.redirect("./../offertes");
	} else {
		res.redirect("./../login");
	}
});




router.get('/remove/account/:index', function (req, res, next) {
	if (req.session.username) {

		var index = req.params.index;
		var w = [];
		var b = 0;
		for(b = 0; b != siteData2.length; b++){
			var q = siteData2[b];
			if(q) {
				w.push(q.u);
			}
		}
		var u = w.indexOf(index);
		if (u > -1) {
			siteData2.splice(u, 1);
		}

		fs.writeFile("public/data/data2.json", JSON.stringify(siteData2, null, '\t'), function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		}); 

		res.redirect("/accounts");
	} else {
		res.redirect("./../login");
	}
});






router.get('/', function (req, res) {
	res.redirect(req.baseUrl + "/login");
});


// pagina om offertes toe tevoegen
router.get('/add', function (req, res) {

	// inlog check
	if (req.session.username) {
		var last = siteData.length + 1;

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

		res.render("./add", {data:data, req:req});
	} else {
		res.redirect(req.baseUrl + "/login");
	}
});

router.post('/add', function (req, res) {


	var fp = "public/data/afbeeldingen";
	console.log(fp);


	var image = req.files.image;

	if(image) {
		var format = path.extname(image);
		console.log(image);
		console.log(format);
		fs.	rename(image.path, fp + "/" + req.body.company + "-" + req.body.offerteNr + "." + image.extension, function (err) {
			if(err){ console.log("ojee"); }
		});	
	}


	var offerteNrArray = [];

	for (var q = 0; q != siteData.length; q++) {
		offerteNrArray.push(siteData[q].offerteNr);
	}

	var input = req.body.offerteNr;
	console.log(offerteNrArray);
	var search = offerteNrArray.indexOf(input);
	console.log(search);
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

		var log = newData.personalText.replace(/\r\n/g, "<br>");
		newData.personalText = log;

		if(image) {
			newData.image = req.body.company + "-" + req.body.offerteNr + "." + image.extension;
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


		res.redirect(req.baseUrl + "/offerte/?offerte=" + req.body.offerteNr);
	}
});






router.get("/login", function (req, res, next) {


	if (req.session.username) {
		res.redirect("/offertes");
	} else {

		var data = {
			req: req
		}

		res.render("./login", {data:data, req:req});
	}
});




router.post("/login", function (req, res, next) {


	var username = req.body.username,
		password = req.body.password;

	for (var i = 0; i != siteData2.length; i++) {
		if (siteData2[i].u == username && siteData2[i].p == password) {
			req.session.username = username;
			req.session.password = password;
			console.log(req.body.username);
			console.log(req.body.password);
			console.log(i);
			res.redirect(req.baseUrl + '/offertes');
		}
	}
	if (!req.session.username) {
		console.log("test "+ username+" "+password);
		res.redirect(req.baseUrl + '/login');
	}


});





// router.post("/login", function (req, res, next) {

	
// 	if (req.body.username == 'leander' && req.body.password == '123') {

// 		req.session.username = req.body.username;
// 		req.session.password = req.body.password;

// 		res.redirect(req.baseUrl + '/add');
// 	} else {
// 		res.redirect(req.baseUrl + '/login');
// 	}	
// });

router.get('/logout', function (req, res) {
	 req.session.destroy(function (err) {
	 	console.log(err);
	 });
	 res.redirect(req.baseUrl + '/');
})






// // custom link voor bedrijven
// router.get('/offerte/:index', function (req, res, next) {

// 	console.log(req.params.index);
// 	//console.log(siteData[0]);
// 	var i = 0;
// 	var y = false;
// 	var project = {};
// 	while (y === false) {
// 		if (siteData[i]) {
// 			if (siteData[i].offerteNr == req.params.index) {
// 				console.log(siteData[i]);
// 				project = siteData[i];
// 				y = true;
// 			} else { i++; }
// 		} else { 
// 			y = true; 
// 			res.render("./404", {data:data, req:req});
// 		}
// 	}
// 	// functie om offerte data uit JSON te laden
// 	var loadSiteData = function () {
// 		siteData = 0;

// 		siteData = require("../public/data/data.json");
// 		// console.log("test");
// 	}

// 	// data laden
// 	loadSiteData();

// 	console.log(project["image"]);

// 	var data = {
// 		id: req.params.index,
// 		project: project,
// 		req: req
// 	}

// 	res.render("./offerte", {data:data, req:req});
// });















// export de routers
module.exports = router;

























































































