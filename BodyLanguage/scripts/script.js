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

                if ($('.upperHeader .fa-bars').css('display') === 'block') {
                    $('header nav').hide(500, function() {
                        $('header nav').removeAttr('style');
                    });
                }
            }  
        }); 
        e.preventDefault();
    });  

    // click back or forward
    $(window).on('popstate', function(e) {
      	history.location = location.href;
    });

    // click signin/singup
    $('.signIn').click(function() {
    	setLoadingAnimation();
    	$.ajax({  
            url: "loginForm.html", 
            success: function(html){ 
            	closeLoadingAnimation();
            	var el = $(html).hide();
            	$('footer').after(el);
            	el.fadeIn();
            	// hide when ckick outside the form
            	$(document).on('click', hide);
            	// holder for registration
            	$('.registration').click(registrationClickHolder); 
            }  
        }); 
    });	 

	// open full image
	$('.imageOpen').on('click', imageOpenHandler);	

    // open or close navigation
    $('.upperHeader .fa-bars').click(function() {
        $('header nav').toggle(500, function() {
            if ($('header nav').css('display') === 'none')
                $('header nav').removeAttr('style');
        });
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
        $(window).off('resize', moveX);  
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
	$('footer').after(balls);
	balls.fadeIn();
}

function closeLoadingAnimation() {
	$('.containerDiv').remove();
}

// open full image
function imageOpenHandler() {
    var img, el, x, top, right;
    setLoadingAnimation();
	img = '<img src="' + event.target.dataset.url + '" class="upper">';
	el = $('<div class="background"></div><div class="containerDiv">' + 
        img + '</div>').hide();
    closeLoadingAnimation();
    $('footer').after(el);
    $(el[0]).fadeIn(200);
    $(el[1]).fadeIn(200, function() {
        $('.containerDiv img').after(calculateX()); 
        // hide when ckick outside the form
        $(document).on('click', hide); 
        // hide when ckick on 'x'
        $('.closeImg').on('click', hide);  
        // when the window size is changing move closing 'x' 
        $(window).on('resize', moveX);       
    });   
    // event.stopPropagation();
}

// calculate closing 'x' for image
function calculateX() {
    var top = document.querySelector('img.upper').offsetTop;
    var right = $(window).width() / 2 - $('img.upper').width() / 2;
    return '<span class="closeImg" style="top: ' + top + 'px; right: ' + right + 'px"><i class="fa fa-times"></i></span>';        
}

// handle for window resizing
function moveX() {
    $('.closeImg').remove();
    $('.containerDiv img').after(calculateX()); 
    $('.closeImg').on('click', hide);
}

function registrationClickHolder() {
	$.ajax({  
        url: "registrationForm.html", 
        success: function(html){ 
        	var el = $(html).hide();
        	$('.containerDiv').fadeOut(200, function() {
        		$('.containerDiv').remove();
        		$('.background').after(el);
        		el.fadeIn();
        	});  	
        	// hide when ckick outside the form
        	$(document).on('click', hide);
        }  
    }); 
}


/* добавить:
динамическая загрузка новостей
регистрация и вход
несколько страниц новостей

установить максимум воодимых символов. Мб ещё что такое надо?
доделать media queries
шаблон страницы новости
*/
