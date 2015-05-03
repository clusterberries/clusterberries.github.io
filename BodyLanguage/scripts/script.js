$(document).ready(function(){    

    $('.mainLink a').click(function(e) {
        e.preventDefault();
        $.ajax({  
            url: "../index.html",  
            success: function(html){  
                $("main").html($(e).find('main').html());    
            } 
        }); 
    });

    $('.newsLink a').click(function(e){  
        $.ajax({  
            url: "../news.html",  
            success: function(html){  
                $("main").html($(e).find('main').html());  
            }  
        });  
    });  
            
});  