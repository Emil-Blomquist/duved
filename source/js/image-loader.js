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

		img.load(function () 
		{
			var return_obj;

			return_obj = 
			{
				'width': img.width(),
				'height': img.height(),
				'src': src
			}
      
			success(return_obj);

			// remove <img>
			img.remove();
		});
	}
	else
	{
		return false;
	}
}