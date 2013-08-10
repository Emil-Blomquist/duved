var Image_carusel = function (json)
{
	this.container = json.container;	// jQuery element
	this.images = json.images;			// urls
	this.active = json.active;			// ehat image in list should start?
	this.in_focus = json.in_focus;		// seconds between fades
	this.fade = json.fade;				// fade duration

	this.init = function ()
	{
		this.container.html('<div class="image top hide transition"></div><div class="image"></div>');

		this.carousel();
	}

	this.carousel = function ()
	{
		var that = this;

		Image_loader.prototype.load_image(
		{
			src: this.images[this.active],
			success: function (image)
				{
					that.set_image(image);
				}
		});
	}

	this.set_image = function (image)
	{
		var placeholder, width_ration, height_ration, ration, width, height, image_active, image_inactive;

		placeholder =
		{
			'width': this.container.width(),
			'height': this.container.height()		// make scrollable
		}

		width_ration = placeholder.width/image.width;
		height_ration = placeholder.height/image.height;

		ration = Math.max(width_ration, height_ration);

		width = image.width*ration;
		height = image.height*ration;

		image_active = this.container.find('.image.top');
		image_inactive = this.container.find('.image:not(.top)');

		// step one
		image_active.removeClass('top transition');
		image_inactive.addClass('top transition');

		// step 2
		image_active.removeClass('hide');
		image_inactive.addClass('hide');

		image_active.css(
		{
			'backgroundImage': 'url(' + image.src + ')',
			'backgroundSize': width + 'px ' + height + 'px'
			// 'webkitTransitionDuration': this.fade*1000 + 'ms',	// sais webkit-transition but not duration
			// '-moz-transition-duration': this.fade*1000 + 'ms',
			// '-ms-transition-duration': this.fade*1000 + 'ms',	
			// '-o-transition-duration': this.fade*1000 + 'ms',
			// 'transition-duration': this.fade*1000 + 'ms'
		});

		this.continue();
	}

	this.continue = function ()
	{
		var that = this;

		// counter
		if (this.images.length - 1 == this.active)
		{
			this.active = 0;
		}
		else
		{
			this.active ++;
		}

		// carusel?
		if (this.images.length > 1)
		{
			setTimeout(
				function ()
					{
						that.carousel();
					},
				(this.in_focus + this.fade)*1000
			)
		}
	}

	this.init();
}

Image_carusel.prototype = new Image_loader();