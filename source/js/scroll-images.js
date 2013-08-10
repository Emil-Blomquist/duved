var Scroll_images = function (json)
{
	this.placeholders = json.placeholders;
	this.scroll_ratio = json.scroll_ratio;

	this.window_height = $(window).height();

	this.init = function ()
	{
		this.create_images();
	}

	this.create_images = function ()
	{
		var i, classes, scroll_image_container, scroll_image, scroll_image_height, placeholder_height;

		// create holder
		$('body').prepend('<div class="scroll-images"></div>');

		for (i in this.placeholders)
		{
			classes = 'scroll-image ' + this.placeholders[i].attr('class')

			// create image container
			scroll_image_container = jQuery('<div/>');
			scroll_image_container.addClass('scroll-image-container');
			scroll_image_container.height(this.placeholders[i].height())

			// create element
			scroll_image = jQuery('<div/>');

			// set classes
			scroll_image.addClass(classes);
			scroll_image.removeClass('scroll-image-placeholder');

			// scroll image height
			placeholder_height = this.placeholders[i].height();
			scroll_image_height = placeholder_height + this.scroll_ratio*(this.window_height - placeholder_height);
			scroll_image.height(scroll_image_height);
			

			// append element
			scroll_image.appendTo(scroll_image_container);
			scroll_image_container.appendTo('.scroll-images');
		}
	}

	this.scroll = function ()
	{
		var scroll_images, scroll_image_containers, window_top, i;

		scroll_image_containers = $('.scroll-images .scroll-image-container');
		window_top = $(window).scrollTop();

		for (i in this.placeholders)
		{
			var placeholder_top, scroll_image_container, scroll_image, scroll_image_top;

			placeholder_top = this.placeholders[i].offset().top;

			// get elements
			scroll_image_container = $(scroll_image_containers[i]);
			scroll_image = scroll_image_container.children();

			// some math, verry nice!
			scroll_image_top = -this.scroll_ratio*(placeholder_top - window_top);

			// apply
			scroll_image_container.css('top', placeholder_top - window_top  + 'px');
			scroll_image.css('top', scroll_image_top + 'px');
		}
	}

	this.init();
}