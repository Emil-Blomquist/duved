var size_scroll_image_placeholders = function (mobile_height)
{
	var window_height, nav_height, max_height, percentage_height, image_containers_height;

	nav_height = 80 + 20;		// 20 added arbitrary
	max_height = 700;			// not for first
	percentage_height = 0.7;	// 

	window_height = $(window).height();

	image_containers_height = max_height;
	if (window_height*percentage_height < max_height)
	{
		image_containers_height = Math.floor(window_height*percentage_height);
	}

	$('.scroll-image-placeholder').height(image_containers_height);

	if (mobile_height)
	{
		// mobile device
		$('.scroll-image-placeholder.first').height(mobile_height);
	}
	else
	{
		$('.scroll-image-placeholder.first').height(window_height - nav_height);
	}
}