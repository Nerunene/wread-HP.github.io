$(document).ready(function() {
	$("header").load("../module/_header.html", function() {
		$('.js_navbtn').on('click', function() {
			$('.js_navbtn').toggleClass('is_show');
			$('.js_nav').toggleClass('is_show');
			$('.js_nav').slideToggle();
		});
	});

	$("footer").load("../module/_footer.html");

	$('.js_scroll').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const targetPosition = $(target).offset().top;

        $('html, body').animate({
            scrollTop: targetPosition
        }, 600);
    });
});

