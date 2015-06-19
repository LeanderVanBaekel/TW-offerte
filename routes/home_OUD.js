var express = require('express');
var router = express.Router();
var fs = require('fs');


var filesPath = __dirname + "../public/data/portfolio";

var siteData = 0;

var loadSiteData = function () {
	siteData = require("../public/data/data.json");
	console.log("test");
}
loadSiteData();

router.get('/', function (req, res, next) {

	var data = {
		req: req,
		projects: siteData
	}
	res.render("./index", {data:data, req:req});
});

router.get('/home_edit', function (req, res, next) {

	var data = {
		req: req,
		projects: siteData
	}
	res.render("./home_edit", {data:data, req:req});
});

router.get('/project/:index', function (req, res, next) {

	var i = 0;
	var y = false;
	while (y === false) {
		if (siteData[i]) {
			if (siteData[i].id == req.params.index) {
				console.log(siteData[i]);
				var project = siteData[i];
				y = true;
			} else { i++; }
		} else { y = true; }
	}

	var data = {
		id: req.params.index,
		project: project,
		req: req
	}

	res.render("./project", {data:data, req:req});
});

router.get('/project/:index/remove', function (req, res, next) {

	var i = 0;
	var y = false;
	while (y === false) {
		if (siteData[i]) {
			if (siteData[i].offerteNr == req.params.index) {
				console.log(siteData[i]);
				var offerte = siteData[i];
				y = true;
			} else { i++; }
		} else { y = true; }
	}

	var data = {
		id: req.params.index,
		offerte: offerte,
		req: req
	}

	res.render("./index", {data:data, req:req});
});


router.get('/add', function (req, res) {
	if (req.session.username) {
		var last = siteData.length + 1;
		var data = {
			req: req,
			projectId: last
		}

		res.render("./add", {data:data, req:req});
	} else {
		res.redirect(req.baseUrl + "/login");
	}
});

router.post('/add', function (req, res) {

	var tumb = req.files.tumbImg;
	var workImg1 = req.files.workImg1;
	var workImg2 = req.files.workImg2;
	var workImg3 = req.files.workImg3;
	var workImg4 = req.files.workImg4;
	var workImg5 = req.files.workImg5;

	//workImg+a

	var skill1 = req.body.skill1;
	var skill2 = req.body.skill2;
	var skill3 = req.body.skill3;
	var skill4 = req.body.skill4;
	var skill5 = req.body.skill5;




	// fs.mkdir(filesPath + req.body.projectName, function (err) {
	// 	if(err){ console.log("kut"); }
	// });
	if (fs.existsSync("public/data/portfolio" + "/" + req.body.projectName)) {
		console.log("pad bestaat al");
	} else {
		fs.mkdirSync("public/data/portfolio" + "/" + req.body.projectName);
	
	}

	var fp = "public/data/portfolio" + "/" + req.body.projectName;
	console.log(fp);

	if(tumb) {
		fs.	rename(tumb.path, fp + "/" + tumb.originalname, function (err) {
			if(err){ console.log("ojee"); }
		});	
	}


	if(workImg1) {
		fs.rename(tumb.path, fp + "/" + workImg1.originalname, function (err) {
			if(err){ console.log("ojee"); }
		});
	}

	if(workImg2) {
		fs.rename(tumb.path, fp + "/" + workImg2.originalname, function (err) {
			if(err){ console.log("ojee"); }
		});
	}

	if(workImg3) {
		fs.rename(tumb.path, fp + "/" + workImg3.originalname, function (err) {
			if(err){ console.log("ojee"); }
		});
	}

	if(workImg4) {
		fs.rename(tumb.path, fp + "/" + workImg4.originalname, function (err) {
			if(err){ console.log("ojee"); }
		});
	}

	if(workImg5) {
		fs.rename(tumb.path, fp + "/" + workImg5.originalname, function (err) {
			if(err){ console.log("ojee"); }
		});
	}

	var newData = {
		"id": req.body.id,
		"projectName": req.body.projectName,
		"projectTitle": req.body.projectTitle,
		"mission": req.body.mission,
		"client": req.body.client,
		"skills": [],
		"tumbImg": null,
		"introtext": req.body.introtext,
		"text": req.body.text,
		"workImg": [],
		"url": req.body.url
	}

	if(tumb) {
		newData.tumbImg = tumb.originalname;
	}

	if (skill1){
		newData.skills.push(skill1);
	}

	if (skill2){
		newData.skills.push(skill2);
	}

	if (skill3){
		newData.skills.push(skill3);
	}

	if (skill4){
		newData.skills.push(skill4);
	}

	if (skill5){
		newData.skills.push(skill5);
	}






	if (workImg1){
		newData.workImg.push(workImg1.originalname);
	}

	if (workImg2){
		newData.workImg.push(workImg2.originalname);
	}

	if (workImg3){
		newData.workImg.push(workImg3.originalname);
	}

	if (workImg4){
		newData.workImg.push(workImg4.originalname);
	}

	if (workImg5){
		newData.workImg.push(workImg5.originalname);
	}



	var w = [];
	var b = 0;
	for(b = 0; b < 100; b++){
		var q = siteData[b];
			if(q) {
			w.push(q.id);
			console.log(w);
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
		for(b = 0; b < 100; b++){
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



  res.redirect(req.baseUrl + "/project/" + req.body.id);
});



router.get("/login", function (req, res, next) {

	var data = {
		req: req
	}

	res.render("./login", {data:data, req:req});
});

router.post("/login", function (req, res, next) {

	
	if (req.body.username == 'leander' && req.body.password == '123') {

		req.session.username = req.body.username;
		req.session.password = req.body.password;

		res.redirect(req.baseUrl + '/add');
	} else {
		res.redirect(req.baseUrl + '/login');
	}	
});

router.get('/logout', function (req, res) {
	 req.session.destroy(function (err) {
	 	console.log(err);
	 });
	 res.redirect(req.baseUrl + '/');
})

router.get('/cv', function (req, res) {
	res.render('./cv');
});



module.exports = router;








