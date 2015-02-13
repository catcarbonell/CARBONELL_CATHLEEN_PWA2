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

   /* $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('#tabsnav li').click(function(e) {
        //$('#projects').hide();
        e.preventDefault();
        $('#tabs p').hide();

        $('#tabsnav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');

        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current'); */

   /* $('div.info').hide();
   $('li.title').click(function() {
        $('div.info').toggleClass('hide').slideToggle('fast');
    });
    });*/

   $('ul.tabs').each(function(){
       // For each set of tabs, we want to keep track of
       // which tab is active and it's associated content
       var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function(e){
            // Make the old tab inactive.
            $active.removeClass('active');
            $content.hide();

            // Update the variables with the new link and content
            $active = $(this);
            $content = $(this.hash);

            // Make the tab active.
            $active.addClass('active');
            $content.show();

            // Prevent the anchor's default click action
            e.preventDefault();
        });
    });

   /* ======= MODAL POPUP ======= */

   // Adds Modal

    $('#overlay').hide();
    $('a.modalClick').click(function(e) {
        e.preventDefault();
        $('#overlay').toggleClass('hide').fadeToggle('fast');
    });

    // Closes Modal
   $('.close').on('click', function(e){
        e.preventDefault();
        $('#overlay').toggleClass('hide').fadeOut('fast');
   });

	
})(jQuery); // end private scope




