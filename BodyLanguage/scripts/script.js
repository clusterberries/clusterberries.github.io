$(document).ready(function(){  
    $('.newsLink').click(function(){  
        $.ajax({  
            url: "../news.html",  
            success: function(html){  
                $("main").html(html);  
            }  
        });  
    });  
            
});  