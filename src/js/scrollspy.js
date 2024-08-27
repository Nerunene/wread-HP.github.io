$(document).ready(function() {
    $('.scrollspy_nav_item').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const targetPosition = $(target).offset().top;

        $('.scrollspy_nav_item').removeClass("is_current");
        $(this).addClass("is_current");
        
        $('html, body').animate({
            scrollTop: targetPosition
        }, 600);
    });

    $(window).on('scroll', function() {
        const offset = 100; // このオフセット値を調整してください
        const scrollPos = $(document).scrollTop() + offset;
        
        $('.scrollspy_nav_item').each(function() {
            const currentLink = $(this);
            const refElement = $($(this).attr("href"));

            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.scrollspy_nav_item').removeClass("is_current");
                currentLink.addClass("is_current");
            } else {
                currentLink.removeClass("is_current");
            }
        });
    });
});
