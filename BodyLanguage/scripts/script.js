$(document).ready(function(){    
	// получаем нормальный объект Location
	var location = window.history.location || window.location;

	// click on navigation items
    $('.link a').click(function(e) {  
    	//если мы на той же ссылке, ничего не делаем 
    	if (history.location.href === this.href) {e.preventDefault(); return;}
    	// write link to history
	    history.pushState(null, null, this.href); 
        $.ajax({  
            url: ".." + this.pathname, 
            success: function(html){  
            	$('main').fadeOut(200, function() {
	            	var content = $(html).filter('main').children();
	           		$('main').empty().wrapInner(content).fadeIn(200);
            	});
            	$('header .link a').removeClass('current');
            	$('header #' + e.target.id).addClass('current');
            }  
        }); 
        e.preventDefault();
    });  

    // при нажатии назад или вперёд
    $(window).on('popstate', function(e) {
      	history.location = location.href;
    });

    // click signin/singup
    $('#signIn').click(function() {
    	$.ajax({  
            url: "../loginForm.html", 
            success: function(html){ 
            	var el = $(html).hide();
            	$('body').append(el);
            	el.fadeIn();
            	// hide when ckick outside the form
            	$(document).on('click', hide);
            }  
        }); 
    });	  


	// open full image
	$('.imageOpen').click(function() {
		var img = '<img src="' + event.target.dataset.url + '" class="upper">';
		// img.classList.add('upper');
		var el = $('<div class="background"></div><div class="containerDiv">' + img + '</div>').hide();
		$('body').append(el);
		event.stopPropagation();
    	el.fadeIn(200, function() {
	    	// hide when ckick outside the form
	    	$(document).on('click', hide);    		
    	});
    });	

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


/* добавить:
динамическая загрузка новостей
открытие изображения
регистрация
несколько страниц новостей
*/
