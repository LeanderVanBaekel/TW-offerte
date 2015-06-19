var	amount1 = document.getElementById("offerteProductAmount1"),
	amount2 = document.getElementById("offerteProductAmount2"),
	amount3 = document.getElementById("offerteProductAmount3"),
	amount4 = document.getElementById("offerteProductAmount4"),
	unitpr1 = document.getElementById("offerteProductUnitPrice1"),
	unitpr2 = document.getElementById("offerteProductUnitPrice2"),
	unitpr3 = document.getElementById("offerteProductUnitPrice3"),
	unitpr4 = document.getElementById("offerteProductUnitPrice4"),
	totalp1 = document.getElementById("offerteProductTotalPrice1"),
	totalp2 = document.getElementById("offerteProductTotalPrice2"),
	totalp3 = document.getElementById("offerteProductTotalPrice3"),
	totalp4 = document.getElementById("offerteProductTotalPrice4"),
	subtotal = document.getElementById("offerteSubTotal"),
	kortingEuro = document.getElementById("offerteKortingEuro"),
	kortingPercent = document.getElementById("offerteKortingPercent"),
	total = document.getElementById("offerteTotal");
var tot1 = 0,
	tot2 = 0,
	tot3 = 0,
	tot4 = 0;

totalp1.onfocus = function(event) {
	tot1 = (amount1.value * unitpr1.value).toFixed(2);
	if ( tot1 != 0.00) {
		totalp1.value = tot1;
	}
};

totalp2.onfocus = function(event) {
	tot2 = (amount2.value * unitpr2.value).toFixed(2);
	if ( tot2 != 0.00) {	
		totalp2.value = tot2;
	}
};

totalp3.onfocus = function(event) {
	//totalp3.value = (amount3.value * unitpr3.value).toFixed(2);
	//console.log(totalp3.value);
	tot3 = (amount3.value * unitpr3.value).toFixed(2);
	if ( tot3 != 0.00) {
		totalp3.value = tot3;
	}
};

totalp4.onfocus = function(event) {
	tot4 = (amount4.value * unitpr4.value).toFixed(2);
	if ( tot4 != 0.00) {
		totalp4.value = tot4;
	}
};


var sub;

subtotal.onfocus = function(event) {
	sub = 0.00;
	sub = (parseFloat(sub) + parseFloat(tot1) + parseFloat(tot2) + parseFloat(tot3) + parseFloat(tot4)).toFixed(2);
	subtotal.value = sub;

};

var tot;

total.onfocus = function(event) {
	tot = 0.00 + sub;
	console.log(kortingEuro.value);
	if (kortingEuro.value) {
		tot = (parseFloat(tot) - parseFloat(kortingEuro.value)).toFixed(2);
	} else if ( kortingPercent.value) {
		var korting = (sub / 100 * parseFloat(kortingPercent.value)).toFixed(2);
		tot = (sub - korting).toFixed(2);
	} else {
		tot = sub;
	}
	
	total.value = tot;

};























