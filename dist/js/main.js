$(function(){
	
	$(".theme-picker .dark").on('click', function(){
		$(".login-form-wrapper").addClass("theme-dark");
	})
	
	$(".theme-picker .light").on('click', function(){
		$(".login-form-wrapper").removeClass("theme-dark");
	});

	$('.login-form').find('input').on('input', function (e) {
	  $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
	  $(e.currentTarget).prev().attr('data-empty', !e.currentTarget.value);
	});
	$('.login-form').find('.cross-ico').on('click', function (e) {
		$(e.currentTarget).attr('data-empty', !e.currentTarget.value);
		var inputItem = $(e.currentTarget).next()
		inputItem.val("");
		inputItem.attr('data-empty', !e.currentTarget.value)
	});
});