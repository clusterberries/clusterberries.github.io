var newsCount, pagesCount;

// main function to load news
function loadNews() {
	console.log('мы в loadNews, ща будем грузить');

	$.ajax({  
        url: 'getNewsLength' 
	})
	.done(function(data) {
	    // parse response
	    newsCount = parseInt(data.count);
	    console.log('загрузили количество новостей: ' + newsCount);

	    pagesCount = Math.ceil(newsCount / 5);

	    // set pagination if the count of news is more than 5
	    if (newsCount > 5) {
	    	console.log('Ща будем гурзить пагинацию, если новостей больше 5');
		    $('.content').after(setPagination(newsCount));
		    setHandlersOnPagination();
		}
		// first load the first 5 news (or less)
		console.log('сейчас будет первая загрузка новостей');
		loadNewsByPage(1);
	})
	.fail(function() {
	    console.log("error in loadNews");
	});

}

// set pagination if necessary
function setPagination(newsCount) {
    var numbers, number;
    if (newsCount > 5) {
        numbers = $('<div class="pagination"><ul>\
                <li id="prev" class="prevnext current">«</li>\
                <li class="pageNumber current" id="page1">1<li>\
                <li class="pageNumber" id="page2">2<li>\
                <li id="next" class="prevnext">»</li>\
            </ul></div>');
        if (newsCount > 10) {
            for (var i = 3; i <= pagesCount; ++i) {
                number = '<li class="pageNumber" id="page' + i + '">' + i + '<li>';
                numbers.find('#next').before(number);
            }
        }
    }
    return numbers;
}

// load new news
function loadNewsByPage(page) {
	var first,	// the first new that will be loaded
		lim, 	// the count of news that will be loaded
		news;	// array of news
	// calculate what news will be loaded
	first = newsCount - page * 5;
	lim = 5;
	if (first < 0) {
		lim += first;
		first = 0;
	}
	console.log('Всё посчитали: offset ' + first + ', limit ' + lim);


	$.ajax({
		url: 'getNews', 
		data: { offset: first, limit: lim},
		dataType: 'json'
	})
	.done(function(data) {
		console.log('Грузим новости!');
		// parse response with data
		//news = JSON.parse(data);

		// remove old blocks with news
		$('.block').fadeOut(200, function () {
			this.remove();
		});

		// create news and append it to the content div
		for (var i = 0; i < data.length; ++i) {
			console.log('сейчас создадим новость ' + i);
			$('.content').append(createNew(data[i]));
		}	    
	})
	.fail(function() {
		console.log('error in loadNewsByPage');
	});

}

// create a piace of news
function createNew(newObj) {
	console.log('мы в createNew');
	// convert data to day.month.year format
	var date = new Date(newObj.date_create).toLocaleDateString();
	var imgPath = newObj.image || 'img/stub_img.jpg';
	var newNew = $('<div class="block">\
	 		<div class="imageDiv" style="background-image: url(' + imgPath + ')"></div>\
			<article>\
				<h3 class="link"><a href="news/' + newObj.id + '">' + newObj.title + '</a></h3>\
				<p class="shortText">' + newObj.description+ '</p>\
				<p class="date">' + date + '</p>\
			</article></div>');
	return newNew;
}

// set handlers to numbers, prev and next
function setHandlersOnPagination() {
	$('.pageNumber').on('click', function(event) {
		var num = parseInt(event.target.id.slice(4));
		loadNewsByPage(num);
		setCurrents(num);
		// add class to really current element
		$(event.target).addClass('current');	
	});

	$('#prev').on('click', function(event) {
		// get current number of page
		var currentNum = parseInt($('.pageNumber.current').attr('id').slice(4));
		var newNum = currentNum - 1;
		// when we are on the first page do nothing
		if (currentNum === 1) return;

		loadNewsByPage(newNum);
		setCurrents(newNum);
		$('#page' + newNum).addClass('current');
	});

	$('#next').on('click', function(event) {
		// get current number of page
		var currentNum = parseInt($('.pageNumber.current').attr('id').slice(4));
		var newNum = currentNum + 1;
		// when we are on the first page do nothing
		if (currentNum === pagesCount) return;

		loadNewsByPage(newNum);
		setCurrents(newNum);
		$('#page' + newNum).addClass('current');
	});
}

// reset class 'current' to pagination items
function setCurrents(num) {
	// remove classes 'current'
	$('.pagination li').removeClass('current');
	// if this page is the first or the last set class current to prev or next
	if (num === 1) {
		$('#prev').addClass('current');
	}
	else if (num === pagesCount) {
		$('#next').addClass('current');
	}
}

