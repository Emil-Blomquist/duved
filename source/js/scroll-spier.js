var scroll_spier = function ()
{
	var scrollTop, at;

	scrollTop = $(window).scrollTop()

	// if no elements match
	at = $('.wrapper section[id]:first').attr('id');

	$('.wrapper').find('section').each(function()
	{
		var offset, height;

		offset = $(this).offset();
		height = $(this).outerHeight();

		if(scrollTop >= offset.top + height)
		{
			at = $(this).nextAll('section[id]').first().attr('id');
		}
		else
		{
			// is below, stop searching elements eaven further down
			return;
		}
	});

	// reset all
	$('nav li').removeClass('active');

	$('nav').find('a').each(function()
	{
		if($(this).attr('href') == '#' + at)
		{
			if( ! $(this).parent().is('.active'))
			{
				$(this).parent().addClass('active');
			}
		}
	});
}