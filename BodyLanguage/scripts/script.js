$(document).ready(function(){ 
    // set nicescroll for document   
    var scrollObj = $("html").niceScroll({
        cursorwidth: '8px', 
        cursorcolor: '#555', 
        cursorborder: '1px solid #aaa', 
    });

	// get object Location
	var location = window.history.location || window.location;

    // if the height of the page is small fix the footer to bottom
    if ($(document.body).height() < $(window).height()) {
        $('footer').addClass('down');
    }

	// click on navigation items
    $('.link a').click(function(e) {  
    	// if click on the same link do nothing
    	if (history.location.href === this.href) {e.preventDefault(); return;}

        setLoadingAnimation();

    	// write link to history
        history.pushState(null, null, this.href); 

        $.ajax({  
            url: ".." + this.pathname, 
            success: function(html) {  

            	closeLoadingAnimation();

                // hide content
            	$('main').fadeOut(200, function() {
                    // find content
	            	var content = $(html).filter('main').children();
	           		$('main').empty().wrapInner(content);

                    // if the height of the page is small fix the footer to bottom
                    if ($(document.body).height() + $('main').height() < $(window).height()) {
                        $('footer').addClass('down');
                    }
                    else {
                        $('footer').removeClass('down');
                    }

                    // show page
                    $('main').fadeIn(200, function() {
                        // ckeck scrollbar
                        $("html").getNiceScroll().resize();
                    });
	           		// set handlers on images again, because content is changed
	           		$('.imageOpen').on('click', imageOpenHandler);	
            	});
            	// change highlighted menu item
            	$('header .link a').removeClass('current');
            	$('header #' + e.target.id).addClass('current');

                // hide burger if it is still open
                if ($('.upperHeader .fa-bars').css('display') === 'block') {
                    $('header nav').hide(500, function() {
                        // to avoid bugs
                        $('header nav').removeAttr('style');
                    });
                }
            }  
        }); 

        // don't update the page
        e.preventDefault();
    });  

    // click back or forward on browzer
    $(window).on('popstate', function() {
      	history.location = location.href;
    });

    // click signin/singup button
    $('.signIn').click(function() {
    	setLoadingAnimation();

    	$.ajax({  
            // get html with form
            url: "templates/loginForm.html", 
            success: function(html) { 
            	closeLoadingAnimation();

            	var el = $(html).hide();
            	$('footer').after(el);
            	el.fadeIn();

            	// hide when ckick outside the form
            	$(document).on('click', hide);

            	// handler for registration
            	$('.registration').click(registrationClickHandler); 
            }  
        }); 
    });	 

	// hundler for opening full image
	$('.imageOpen').on('click', imageOpenHandler);	

    // open or close navigation when click on burger
    $('.upperHeader .fa-bars').click(function() {
        $('header nav').toggle(500, function() {
            if ($('header nav').css('display') === 'none')
                // to avoid bugs
                $('header nav').removeAttr('style');
        });
    });

    // 
    $('.comments form textarea').on('focus', function() {
        $('.comments form textarea').attr('rows', 5);
        $('.comments .form .button').css('display', 'block');
    });
    $('.comments form textarea').on('focusout', function() {
        $('.comments form textarea').attr('rows', 1);
        $('.comments .form .button').css('display', 'none');
    });
            
});  


// hide upper layout with form or image
function hide(event) {
    // when click on the the form or image do nothing
	if ($(event.target).closest('.upper').length !== 0) return;
	else {
        // fade out and remove elements
		$('.background').fadeOut(200, function() {
			this.remove();
		});
		$('.containerDiv').fadeOut(200, function() {
			this.remove();
		});

        // remove handrels for resizing and closing
		$(document).off('click', hide);
        $(window).off('resize', moveX);  
	}
}

// create and show animation
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
	balls.fadeIn(200);
}

// remove animation
function closeLoadingAnimation() {
	$('.containerDiv').remove();
}

// open full image
function imageOpenHandler(event) {
    var img, url, el;

    setLoadingAnimation();

    // take out the url to the image from the style
    url = getComputedStyle(event.target).backgroundImage;
    url = url.slice(url.indexOf('(') + 1, url.lastIndexOf(')'));
    
    // get url of the image and create the html
	img = '<img src="' + url + '" class="upper">';
    // create element with background and img
	el = $('<div class="background"></div><div class="containerDiv">' + img + '</div>').hide();

    closeLoadingAnimation();

    // append and show image
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
}

// calculate position of the closing 'x' for image
function calculateX() {
    // get top and right sides of the image and set it to the 'x'
    var top = document.querySelector('img.upper').offsetTop;
    var right = $(window).width() / 2 - $('img.upper').width() / 2;
    return '<span class="closeImg" style="top: ' + top + 'px; right: ' + right + 'px"><i class="fa fa-times"></i></span>';        
}

// handle for window resizing
function moveX() {
    // remove old 'x'
    $('.closeImg').remove();
    // calculate new values
    $('.containerDiv img').after(calculateX()); 
    // set new handler
    $('.closeImg').on('click', hide);
}

// handler for loading the form for registration
function registrationClickHandler() {
	$.ajax({  
        url: "templates/registrationForm.html", 
        success: function(html){ 
        	var el = $(html).hide();
        	$('.containerDiv').fadeOut(200, function() {
                // remove old container with form for sign in
        		$('.containerDiv').remove();
                // set new form
        		$('.background').after(el);
        		el.fadeIn();
        	});  	
        	// hide when ckick outside the form
        	$(document).on('click', hide);
        }  
    }); 
}
