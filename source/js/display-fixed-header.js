var fix_header = function ()
{
	var nav_offset, scroll_top, nav_height;

	nav_height = 80 -10;
	
	nav_offset = $('.wrapper nav').offset();
	scroll_top = $(window).scrollTop();

	if (nav_offset.top + nav_height < scroll_top)
	{
		$('header.fixed').removeClass('hide');
	}
	else if ( ! $('header.fixed').is('.hide'))
	{
		$('header.fixed').addClass('hide');
	}
}