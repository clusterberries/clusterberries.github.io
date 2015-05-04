$(document).ready(function(){    
	// получаем нормальный объект Location
	var location = window.history.location || window.location;

    $('.link a').click(function(e) {  
    	//если мы на той же ссылке, ничего не делаем 
    	if (history.location.href === this.href) return;
    	
    	// заносим ссылку в историю
	    history.pushState(null, null, this.href); 
        $.ajax({  
            url: ".." + this.pathname, 
            success: function(html){  
            	$('main').fadeOut(200, function() {
	            	var content = $(html).filter('main').children();
	           		$('main').empty().wrapInner(content).fadeIn(200);
            	});
            }  
        }); 
        e.preventDefault();
    });  

    $(window).on('popstate', function(e) {
      	history.location = location.href;
    });
            
});  

/*$(function() {
        // получаем нормальный объект Location
        var location = window.history.location || window.location;

        // ищем все ссылки и вешаем события на все ссылки в нашем документе
        $('a.ajax').click(function(e){  
          // заносим ссылку в историю
          history.pushState(null, null, this.href);

          $.ajax({  
            url: ".." + this.href,  
            success: function(html){  
                $("main").html($(e).find('main').html());    
            } 
          }); 
          // тут можете вызвать подгрузку данных и т.п.

          // не даем выполнить действие по умолчанию
          return false;
        });

        // вешаем событие на popstate которое срабатывает при нажатии back/forward в браузере
        $(window).on('popstate', function(e) {

          // тут можете вызвать подгрузку данных и т.п.

          // просто сообщение
          alert("Мы вернулись на страницу со ссылкой: " + location.href);
        });
      });*/