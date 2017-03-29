$(function(){

	//==========================================
	//Управление отображением меню
	//==========================================
	$("#mobileNavBtn").on('click', function(){
		$(".header__nav-line").toggle(200);
	});

	$(window).on('resize', function() {
		if ($(window).width() > 770) {
				$('.header__nav-line').css('display', 'block');
			}
			else{
				$('.header__nav-line').css('display', 'none');
			}
	});
	//==========================================
	//Плавающий border-bottom в главном меню
	//==========================================
	if($(window).width() > 770){
	    var $el, leftPos, newWidth,
	        $mainNav = $("#mainNavigation");
	    
	    $mainNav.append("<span class='magic-line' id='magicLine'></span>");
	    var $magicLine = $("#magicLine");
	    
	    $magicLine
	        .width($(".current span").width())
	        .css("left", $(".current span").position().left)
	        .data("origLeft", $magicLine.position().left)
	        .data("origWidth", $magicLine.width());
	        
	    $("#mainNavigation li a").hover(function() {
	        $el = $(this);
	        leftPos = $el.position().left+18; //прибавляем размер padding с левой стороны
	        newWidth = $el.parent().width()-36; //вычитаем размер padding с обоих сторон
	        $magicLine.stop().animate({
	            left: leftPos,
	            width: newWidth
	        });
	    }, function() {
	        $magicLine.stop().animate({
	            left: $magicLine.data("origLeft"),
	            width: $magicLine.data("origWidth")
	        });    
	    });
	}
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

	//============================================================
	//Скрытие уведомлений
	//============================================================
	$(".hide-notification").on("click", function(){
		$(this).parent().hide(200);
	});

	//============================================================
	//Отображение дополнительного меню для каждой формы
	//============================================================
	$(".more-vert-ico")
		.on("mouseleave", function(){
			if(!$(this).next(".profile-settings-menu").hasClass("visible")){
				$(this).removeClass("more-vert-ico-mouseover");
			}
		})
		.on("mouseenter", function(){
			$(this).addClass("more-vert-ico-mouseover");
		})
		.on("click", function(){
			$(this).next(".profile-settings-menu").toggle(200);
			$(this).next(".profile-settings-menu").toggleClass("visible");
			$(this).addClass("more-vert-ico-mouseover");
		});

});