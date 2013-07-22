var height, nav_height;

nav_height = 80 + 20;

height = $(window).height();
height -= nav_height;

$('.section-image.first').height(height);
$('.section-image.first').attr('data-height', height);