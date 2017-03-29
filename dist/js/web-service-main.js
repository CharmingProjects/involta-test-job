$(function(){

	
	//================================
	//Обработчик для поля input
	//================================
	var inputHandler = (function formInput() {
		//Еслии в поле есть данные, то показываем крестик, и наоборот
   		$('.form-field__name').find('input').on('input', function (e) {
			  $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
			  $(e.currentTarget).prev().attr('data-empty', !e.currentTarget.value);
		});

   		//Удаляем данные из поля при нажатии на крестик
		$('.form-field__name').find('.cross-ico').on('click', function (e) {
			$(e.currentTarget).attr('data-empty', !e.currentTarget.value);
			var inputItem = $(e.currentTarget).next();
			inputItem.val("");
			inputItem.attr('data-empty', !e.currentTarget.value)
		});

		//Анимация удаления файлов
		$(".file-item__delete-btn").on("click", function(e){
			$(e.currentTarget).parent().fadeOut( 200, "linear");
		});
	   return formInput;
	})();

	//==============================
	//Google ripple effect handler
	//==============================
	var rippleHandler = (function rippleEffect(){
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
	return rippleEffect;
	}());

	//================================
	//Клонирование нового блока тикета
	//================================
	$(".add-ticket").on('click',function(){
		//Пока идет анимация запрещаем создание новых тикетов
		if(!$('.ticket-wrapper[id^="ticket"]:last').is(':animated')){

			//Изменение идентификатора для блока обертки тикета
			var lastTicket = $('.ticket-wrapper[id^="ticket"]:last');
			var lastTicketNum = parseInt(lastTicket.prop("id").match(/\d+/g), 10 ) + 1;

			var ticketClone = lastTicket.clone();

			//Изменение идентификаторов для label и input поля name
			//Очистка поля input
			ticketClone
				.prop('id', 'ticket-'+lastTicketNum )
				.find('.ticket-form__input-name').prop('id', 'name-'+lastTicketNum ).val("").attr('data-empty', "true");
			ticketClone
				.find('.ticket-form__label-name').prop('for', 'name-'+lastTicketNum );
			//Убираем крестик с поля input
			ticketClone
				.find('.cross-ico').attr('data-empty', "true");
			//Очистка поля textarea
			ticketClone
				.find('#msg').val("");
			ticketClone.appendTo( "#mainContent" ).hide().fadeIn('100', 'linear');

			
		}//=if

		//Вызываем обработчик для поля input, уже для нового тикета
		inputHandler();
		//Вызываем обработчик для ripple effect, уже для нового тикета
		rippleHandler();

		
		//Автоскролл вправо при создании нового тикета 
    	$('#mainContent').animate({
        	scrollLeft: "+=" + 500 * lastTicketNum
    	}, 700);

	});

	//==========================================
	//Анимация появления меню для моб. устройств
	//==========================================
	$('#nav-icon').on('click',function(){
		$(this).toggleClass('open');
		$('#nav-links').toggleClass('visible');

		if($('#nav-links').hasClass('visible'))
			$('#nav-links').show(200).css('display', 'flex');
		else
			$('#nav-links').hide(200);
	});

	$('#sidebarOpen').on('click',function(){
		$('#sidebar').show(200).css('display', 'block');

	});

	$('#sidebarClose').on('click',function(){
		$('#sidebar').hide(200);
	});

	$(window).on('resize', function() {
		if ($(window).width() > 670) {
				$('#nav-links').css('display', 'flex');
				$('#sidebar').css('display', 'block')
			}
		else {
			$('#nav-links').css('display', 'none');
			$('#sidebar').css('display', 'none');
		}
	});
	
});