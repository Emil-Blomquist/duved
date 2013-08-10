var scroll_images, is_mobile;

is_mobile = function ()
{
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
}

$(window).ready(function ()
{
	fix_header();
	
	// initiate image viwer
	new Image_viewer(
	{
		'viewer': $('#stugan .image-viewer'),
		'thumbnails':
			[
				'img/thumbs/color/indoors/1.jpg',
				'img/thumbs/color/indoors/5.jpg',
				'img/thumbs/color/indoors/6.jpg',
				'img/thumbs/color/indoors/8.jpg',
				'img/thumbs/color/indoors/9.jpg'
			],
		'images':
			[
				'img/color/indoors/1.jpg',
				'img/color/indoors/5.jpg',
				'img/color/indoors/6.jpg',
				'img/color/indoors/8.jpg',
				'img/color/indoors/9.jpg'
			]
	});
	new Image_viewer(
	{
		'viewer': $('#duved .image-viewer'),
		'thumbnails':
			[
				'img/thumbs/color/4.jpg',
				'img/thumbs/color/5.jpg',
				'img/thumbs/color/6.jpg',
				'img/thumbs/color/7.jpg'
			],
		'images':
			[
				'img/color/4.jpg',
				'img/color/5.jpg',
				'img/color/6.jpg',
				'img/color/7.jpg'
			]
	});

	scroll_spier();

	if (is_mobile())
	{
		// devices

		// different first height
		size_scroll_image_placeholders($(window).height());

		new Image_carusel(
		{
			'container': $('.scroll-image-placeholder.first'),
			'images': 
				[
					'img/gray/2.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
		new Image_carusel(
		{
			'container': $('.scroll-image-placeholder.second'),
			'images': 
				[
					'img/color/indoors/1.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
		new Image_carusel(
		{
			'container': $('.scroll-image-placeholder.third'),
			'images': 
				[
					'img/color/1.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
		new Image_carusel(
		{
			'container': $('.scroll-image-placeholder.fourth'),
			'images': 
				[
					'img/color/3.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
	}
	else
	{
		// computer

		// different first height
		size_scroll_image_placeholders();

		// create scroll images
		scroll_images = new Scroll_images(
		{
			'placeholders':
				[
					$('.scroll-image-placeholder.first'),
					$('.scroll-image-placeholder.second'),
					$('.scroll-image-placeholder.third'),
					$('.scroll-image-placeholder.fourth')
				],
			'scroll_ratio': 0.3
		});
		scroll_images.scroll();

		new Image_carusel(
		{
			'container': $('.scroll-image.first'),
			'images': 
				[
					'img/gray/2.jpg',
					'img/gray/3.jpg',
					'img/gray/4.jpg',
					'img/gray/5.jpg',
					'img/gray/6.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
		new Image_carusel(
		{
			'container': $('.scroll-image.second'),
			'images': 
				[
					'img/color/indoors/1.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
		new Image_carusel(
		{
			'container': $('.scroll-image.third'),
			'images': 
				[
					'img/color/1.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
		new Image_carusel(
		{
			'container': $('.scroll-image.fourth'),
			'images': 
				[
					'img/color/3.jpg'
				],
			'active': 0,
			'in_focus': 5,
			'fade': 3
		});
	}
});

$(window).scroll(function (event) 
{
	fix_header();
	scroll_spier();

	if (is_mobile())
	{
		// mobile device
	}
	else if (/iPad/i.test(navigator.userAgent))
	{
		// Ipad
		// scroll_images.scroll();
	}
	else
	{
		// computer
		scroll_images.scroll();
	}
});