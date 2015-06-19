

//smooth scroll
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
		|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
				scrollTop: target.offset().top
			}, 1000);
			return false;
			}
		}
	});
});




//menu script


var menuToggle = document.querySelector(".menu-button"),
	menu = document.querySelector(".list"),
	icon = document.querySelector(".menu-icon"),
	iconState1 = "☰",
	iconState2 = "x";


function menuFunction() {

	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight|| e.clientHeight|| g.clientHeight;


	console.log(x);
	if (x <= 1000) {
		menuToggle.classList.remove("hide");
		menu.classList.add("hide");

		menuToggle.onclick = function(event) {
			menu.classList.toggle("hide");

			if (icon.innerHTML == iconState1) {
				icon.innerHTML = iconState2;
			} else {
				icon.innerHTML = iconState1;
			}

		};

		var link = document.querySelectorAll("a");

		for (var i = link.length - 1; i >= 0; i--) {

			link[i].onclick = function(event) {
				menu.classList.toggle("hide");
				if (icon.innerHTML == iconState1) {
					icon.innerHTML = iconState2;
				} else {
					icon.innerHTML = iconState1;
				}
			}

	

		};
	} else {
		menu.classList.remove("hide");
		menuToggle.classList.add("hide");
	}
}

window.onload = menuFunction;
window.onresize = menuFunction;




