$(document).ready(function() {
	$('.js_modalopen').click(function() {
		$(this).next('.recruitmodal').show();
		$('body').addClass('no_scroll');
	});

	$('.js_closemodal, .recruitmodal').click(function() {
		$('.recruitmodal').hide();
		$('body').removeClass('no_scroll');
	});

	$('.recruitmodal_inner').click(function(e) {
		e.stopPropagation();
	});

	$('.requirements_contents_tabs_item').click(function() {
		const index = $(this).index();

		$('.requirements_contents_tabs_item').removeClass('is_active');
		$(this).addClass('is_active');

		$('.requirementitem').removeClass('is_show');
		$('.requirementitem').eq(index).addClass('is_show');
	});
});