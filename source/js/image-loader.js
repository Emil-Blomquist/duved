var Image_loader = function ()
{
}

Image_loader.prototype.load_image = function (json)	// json = src, success
{
	if (json !== 'undefined' && json)
	{
		var img, that, src, success;

		if (
			json.src !== 'undefined' && json.src &&
		 	json.success !== 'undefined' && json.success
		 	)
		{
			src = json.src;
			success = json.success;
		}
		else
		{
			return false;
		}

		img = $('<img />');
		img.attr(
		{
			'id': 'imgage-loader',
			'class': 'hide',
			'src': src
		});
		img.appendTo($('body'));

		that = this;

		img.load(function () 
		{
			var return_obj;

			return_obj = 
			{
				'width': this.width,
				'height': this.height,
				'src': src
			}

			success(return_obj);

			// remove <img>
			$(this).remove();
		});
	}
	else
	{
		return false;
	}
}