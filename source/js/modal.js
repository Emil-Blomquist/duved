var Modal = function ()
{
}

Modal.prototype.create = function ()
{
	var modal, backdrop, loading, gear, content_holder, that;

	modal = jQuery('<div/>');
	modal.addClass('modal hide');

	backdrop = jQuery('<div/>');
	backdrop.addClass('backdrop');

	that = this;

	backdrop.bind('click', function ()
	{
		that.hide();
	});

	loading = jQuery('<div/>');
	loading.addClass('loading hide');

	loading.append('<div class="ball desktop-only"></div>')
		   .append('<div></div>');


	content_holder = jQuery('<div/>');
	content_holder.addClass('content-holder hide');


	modal.append(backdrop)
		 .append(loading)
		 .append(content_holder);


	modal.prependTo($('body'));

	return modal;
}

Modal.prototype.get_modal = function ()
{
	var modal = $('body > .modal')

	// if does not exist, create one
	if (modal.length === 0)
	{
		modal = this.create();
	}

	return modal
}


Modal.prototype.show = function (content)
{
	var modal, content_holder, loading;

	modal = this.get_modal();

	content_holder = modal.children('.content-holder');
	loading = modal.children('.loading');

	content_holder.html(content);

	loading.addClass('hide');
	content_holder.removeClass('hide');
	modal.removeClass('hide');
}

Modal.prototype.hide = function ()
{
	var modal, content_holder, loading;

	modal = this.get_modal();
	content_holder = modal.children('.content-holder');
	loading = modal.children('.loading');

	loading.addClass('hide');
	content_holder.addClass('hide');
	modal.addClass('hide');
}

Modal.prototype.loading = function (text)
{
	var modal, content_holder, loading, loading_top;

	modal = this.get_modal();
	content_holder = modal.children('.content-holder');
	loading = modal.children('.loading');

	loading_top = ($(window).height() - loading.height())/2;
	loading.css('top', loading_top + 'px');

	loading.children(':last-child').html(text);

	loading.removeClass('hide');
	content_holder.addClass('hide');
	modal.removeClass('hide');
}
