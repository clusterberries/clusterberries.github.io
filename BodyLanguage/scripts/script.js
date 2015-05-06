$(document).ready(function(){    
	// получаем нормальный объект Location
	var location = window.history.location || window.location;

	// click on navigation items
    $('.link a').click(function(e) {  
    	//если мы на той же ссылке, ничего не делаем 
    	if (history.location.href === this.href) {e.preventDefault(); return;}
    	// write link to history
	    history.pushState(null, null, this.href); 
	    setLoadingAnimation();
        $.ajax({  
            url: ".." + this.pathname, 
            success: function(html){  
            	closeLoadingAnimation();
            	$('main').fadeOut(200, function() {
	            	var content = $(html).filter('main').children();
	           		$('main').empty().wrapInner(content).fadeIn(200);
	           		// set handlers again because content is changed
	           		$('.imageOpen').on('click', imageOpenHandler);	
            	});
            	// change highlighted menu item
            	$('header .link a').removeClass('current');
            	$('header #' + e.target.id).addClass('current');
            }  
        }); 
        e.preventDefault();
    });  

    // click back or forward
    $(window).on('popstate', function(e) {
      	history.location = location.href;
      	console.log('change!');
    });

    // click signin/singup
    $('#signIn').click(function() {
    	setLoadingAnimation();
    	$.ajax({  
            url: "loginForm.html", 
            success: function(html){ 
            	closeLoadingAnimation();
            	var el = $(html).hide();
            	$('body').append(el);
            	el.fadeIn();
            	// hide when ckick outside the form
            	$(document).on('click', hide);
            }  
        }); 
    });	  

	// open full image
	//document.querySelectorAll('.imageOpen')
	$('.imageOpen').on('click', imageOpenHandler);	
//	$(document).click(function() {console.log(event.target)});

    $('.fa-bars').click(function() {

    });
            
});  

// hide upper layout
function hide() {
	if ($(event.target).closest('.upper').length !== 0) return;
	else {
		$('.background').fadeOut(200, function() {
			$('.background').remove();
		});
		$('.containerDiv').fadeOut(200, function() {
			$('.containerDiv').remove();
		});
		$(document).off('click', hide);
	}
}

function setLoadingAnimation() {
	var balls = $('\
		<div class="containerDiv"><div id="ballsWave">\
			<div id="ballsWave_1" class="ballsWave"></div>\
			<div id="ballsWave_2" class="ballsWave"></div>\
			<div id="ballsWave_3" class="ballsWave"></div>\
			<div id="ballsWave_4" class="ballsWave"></div>\
			<div id="ballsWave_5" class="ballsWave"></div>\
			<div id="ballsWave_6" class="ballsWave"></div>\
			<div id="ballsWave_7" class="ballsWave"></div>\
			<div id="ballsWave_8" class="ballsWave"></div>\
		</div></div>').hide();
	$('body').append(balls);
	balls.fadeIn();
}

function closeLoadingAnimation() {
	$('.containerDiv').remove();
}

// open full image
function imageOpenHandler() {
	setLoadingAnimation();
	var img = '<img src="' + event.target.dataset.url + '" class="upper">';
	var el = $('<div class="background"></div><div class="containerDiv">' + img + '</div>').hide();
	closeLoadingAnimation();
	$('body').append(el);
	event.stopPropagation();
	el.fadeIn(200, function() {
    	// hide when ckick outside the form
    	$(document).on('click', hide);    		
	});
}


/* добавить:
динамическая загрузка новостей
открытие изображения
регистрация
несколько страниц новостей
*/



/*
подсветка изображения, которое можно открыть
шевелящиеся иконки
крестик для изображения
*/