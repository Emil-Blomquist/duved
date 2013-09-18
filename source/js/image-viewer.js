var Image_viewer = function (json)
{
	this.viewer = json.viewer;
	this.thumbnails = json.thumbnails;
	this.images = json.images;

	this.thumbnail_width = 0;

	// prevent several scrolls sat same time
	this.scroll_enable = true;


	this.init = function ()
	{
		var wrapper, i, thumbnail, wrapper_width;

		// add class
		this.viewer.addClass('image-previewer');

		// add contents
		this.viewer.append('<div class="scroll-left">&lt;</div>');
		this.viewer.append('<div class="container"><div class="wrapper"></div></div>');
		this.viewer.append('<div class="scroll-right">&gt;</div>');

		// wrapper width
		wrapper = this.viewer.find('.wrapper');

		// append images
		for (i in this.thumbnails)
		{
			// create
			thumbnail = jQuery('<div/>');
			thumbnail.addClass('thumbnail');
			thumbnail.css('backgroundImage', 'url(' + this.thumbnails[i] + ')')

			thumbnail.appendTo(wrapper);
		}

		// mainly for later use
		this.thumbnail_width = thumbnail.width();

		wrapper_width = this.thumbnails.length*this.thumbnail_width + 10;	// + 10 for transition rounding marginal

		wrapper.width(wrapper_width);


		// hide/show scrollers
		this.scrollers();

		this.bind();
	}

	this.scrollers = function ()
	{
		var wrapper, left_scroller, right_scroller;

		wrapper = this.viewer.find('.wrapper');
		left_scroller = this.viewer.children('.scroll-left');
		right_scroller = this.viewer.children('.scroll-right');

		left_scroller.addClass('hide');
		right_scroller.addClass('hide');

		if (wrapper.offset().left < 0)
		{
			left_scroller.removeClass('hide');
		}

		if (wrapper.children('.thumbnail:last-child').offset().left  + this.thumbnail_width > $(window).width())
		{
			right_scroller.removeClass('hide');
		}
	}

	this.bind = function ()
	{
		var that, wrapper, left_scroller, right_scroller;

		wrapper = this.viewer.find('.wrapper');
		left_scroller = this.viewer.children('.scroll-left');
		right_scroller = this.viewer.children('.scroll-right');

		that = this;

		left_scroller.bind('click', function() {
			that.scroll(3*that.thumbnail_width)
		});

		right_scroller.bind('click', function() {
			that.scroll(-3*that.thumbnail_width)
		});


		// what about old browsers?
		wrapper.bind('transitionend webkitTransitionEnd oTransitionEnd otransitionend mozTransitionEnd', function(event) {
			if (event.target == wrapper[0])
			{
				// hide/show scrollers
				that.scrollers();
				that.scroll_enable = true;
			}
		});

		wrapper.children('.thumbnail').each(function (index)
		{
			$(this).bind('click', function ()
			{
				that.view(index);
			})
		});

	}

	this.scroll = function (amount)
	{
		if (this.scroll_enable)
		{
			var wrapper, wrapper_left, container_margin, container_width, wrapper_width;

			// unable to scroll untill transition finished
			this.scroll_enable = false;

			// mobile device?
			if (Math.abs(amount) > $(window).width())
			{
				// set to 2/3 screen width
				amount = 2/3*$(window).width()*amount/Math.abs(amount);
			}

			wrapper = this.viewer.find('.wrapper');

			// some numbers
			container_width = this.viewer.find('.container').width();
			wrapper_width = this.thumbnails.length*this.thumbnail_width;
			container_margin = ($(window).width() - container_width)/2

			wrapper_left = wrapper.offset().left - container_margin + amount;

			if (container_width - wrapper_width > wrapper_left)
			{
				// scroll max right
				wrapper_left = container_width - wrapper_width;
			}
			else if (wrapper_left > 0)
			{
				// 
				wrapper_left = 0;
			}

			wrapper.css('left', wrapper_left + 'px');
		}
	}

	this.view = function (which)
	{
		var that = this;

		Modal.prototype.loading('Laddar bild')

		Image_loader.prototype.load_image(
		{
			src: this.images[which],
			success: function (image)
				{
					that.show(image);
				}
		})
	}

	this.show = function (data)
	{
		var image, window_height, window_width, ratio, percentage, image_height, image_width;

		percentage = 0.9;

		window_width = $(window).width();
		window_height = $(window).height();

		ratio = Math.min(window_width/data.width, window_height/data.height);

		image = jQuery('<img/>');
		image.attr('src', data.src);

		image_width = data.width*ratio*percentage;
		image_height = data.height*ratio*percentage;

		image.attr('width', image_width);
		image.attr('height', image_height);

		image.css(
		{
			position: 'absolute',
			top: (window_height - image_height)/2 + 'px',
			left: (window_width - image_width)/2 + 'px'
		});

		Modal.prototype.show(image);
	}

	this.init();
}

Image_carusel.prototype = new Image_loader();
Image_carusel.prototype = new Modal();