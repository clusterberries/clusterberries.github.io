$(document).ready(function() {
	$('.imageOpen').on('click', imageOpenHandler);	
	document.addEventListener("DOMNodeInserted", function() {
		$('.imageOpen').off('click', imageOpenHandler);	
		$('.imageOpen').on('click', imageOpenHandler);	
	});
});


// open full image
function imageOpenHandler(event) {
    var img, url, el;

    // take out the url to the image from the style
    url = getComputedStyle(event.target).backgroundImage;
    url = url.slice(url.indexOf('(') + 1, url.lastIndexOf('.')) + '_full.png';
    if (url[0] === '"') url = url.slice(1);

    // get url of the image and create the html
	img = '<img src="' + url + '" class="upper">';
    // create element with background and img
	el = $('<div class="background"></div><div class="containerDiv">' + img + '</div>').hide();

    // append and show image
    $('.container').after(el);
    $(el[0]).fadeIn(200);
    $(el[1]).fadeIn(200, function() {
        // $('.containerDiv img').after(calculateX()); 
        // hide when ckick outside the form
        $(document).on('click', hide); 
        // hide when ckick on 'x'
        // $('.closeImg').on('click', hide);       
    });   
}

// hide upper layout with form or image
function hide(event) {
    // when click on the the form or image do nothing
	// if ($(event.target).closest('.upper').length !== 0) return;
	// else {
        // fade out and remove elements
		$('.background').fadeOut(200, function() {
			this.remove();
		});
		$('.containerDiv').fadeOut(200, function() {
			this.remove();
		});

        // remove handrels for closing
		$(document).off('click', hide); 
	// }
}

// calculate position of the closing 'x' for image
// function calculateX() {
//     // get top and right sides of the image and set it to the 'x'
//     var top = document.querySelector('img.upper').offsetTop;
//     var right = $(window).width() / 2 - $('img.upper').width() / 2;
//     return '<span class="closeImg" style="top: ' + top + 'px; right: ' + right + 'px"><i class="fa fa-times"></i></span>';        
// }