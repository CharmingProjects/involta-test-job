$(function(){
	
	//Смена темы блока формы
	$(".theme-picker .dark").on('click', function(){
		$(".login-form-wrapper").addClass("theme-dark");
	})

	$(".theme-picker .light").on('click', function(){
		$(".login-form-wrapper").removeClass("theme-dark");
	});

	//Удаление данных полей
	$('.login-form, .ticket-form__input-name').find('input').on('input', function (e) {
	  $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
	  $(e.currentTarget).prev().attr('data-empty', !e.currentTarget.value);
	});
	$('.login-form, .ticket-form__input-name').find('.cross-ico').on('click', function (e) {
		$(e.currentTarget).attr('data-empty', !e.currentTarget.value);
		var inputItem = $(e.currentTarget).next()
		inputItem.val("");
		inputItem.attr('data-empty', !e.currentTarget.value)
	});

	//==============================
	//Google ripple effect handler
	//==============================
	$(".ripple").on('click', function(e) {

		if ($(this).find('span.rippleElem').length === 0) {

			$(this).append('<span class="rippleElem"></span>');

			var ripple = $(this).find('span.rippleElem'),
				size = ( $(this).innerWidth() > $(this).innerHeight() ) ? $(this).innerWidth()*2 : $(this).innerHeight()*2,
				clickY = $(this).offset().top,
				clickX = $(this).offset().left,
				x = e.pageX - clickX,
				y = e.pageY - clickY;

			ripple.css({
				'top': y +'px',
				'left': x +'px',
			});

			ripple.animate({
				'width': size +'px',
				'height': size +'px',
				'margin-top': -size/2 +'px',
				'margin-left': -size/2 +'px',
				'opacity': 0,
			}, 600, function() {
				$(this).remove();
			});

		}
	});	
});