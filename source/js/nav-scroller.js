$('nav a').click(function (event)
{
  var href, section, offset_top;
  event.preventDefault();
  
  href = $(this).attr('href');
  section = $('section' + href );
  offset_top = section.offset().top;
    
  $("html, body").animate(
    {scrollTop: offset_top},
    1000,
    function ()
    {
      // set hash to accurate one, remove '#' in case
      window.location.hash = href.substring(1);
      // can't do this earlier beacus the page will jump
    }
  );
});