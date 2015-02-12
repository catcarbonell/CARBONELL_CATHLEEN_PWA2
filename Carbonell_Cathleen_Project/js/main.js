/*  
	ATK PLAN: A Productivity Application!
	Author: Cathleen Carbonell
*/

(function($){
    //$(document).ready(function(){
	/* ======= TOOL TIP ======= */


        $('.masterToolTip').hover(function(){
        //Hover code
        var title= $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
    }, function() {
        //Hover out
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; //X coordinates
        var mousey = e.pageY + 10; //Y coordinates
        $('.tooltip').css({ top: mousey, left: mousex })
    });

    /* ======= TABBED ACCORDION ======= */

    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('.tabnav li').click(function(e) {
        e.preventDefault();
        $('#tabs p').hide();

    $('.tabnav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');

        $('#tabs ' + clicked).fadeIn('fast');
     }).eq(0).addClass('current');
//});

	
})(jQuery); // end private scope




