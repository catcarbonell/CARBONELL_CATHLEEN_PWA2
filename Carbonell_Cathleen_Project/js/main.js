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
        $('.tooltip').css({ top: mousey, left: mousex})
   });

   /* ======= TABBED ACCORDION ======= */

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
        $('#overlay').toggleClass('hide').fadeIn('fast');
    });

    // Closes Modal
   $('.close').on('click', function(e){
        e.preventDefault();
        $('#overlay').toggleClass('hide').fadeOut('slow');
   });

    // Status Fades
    $('.myStatus').mouseover(function(e){
        e.preventDefault();
        $(this).fadeTo(100, 1);

        $(this).mouseout(function(e){
            e.preventDefault();
            $(this).fadeTo(100, 0.5);

        });
    });

    /* ======= ADD PROJECT ======= */

    $("#addButton").click(function(){
       var projName = $('#projectName').val(),
           projDesc = $('#projectDescription').val(),
           projDue = $('#projectDueDate').val(),
           status = $('input[name = "status"]:checked').prop("id");

       $.ajax({
            url : "xhr/new_project.php",
            type : "post",
            dataType : "json",
            data : {
                projectName : projName,
                projectDescription : projDesc,
                dueDate : projDue,
                status : status
            },

            success : function(response){
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign("projects.html");
                }
            }
        })
    });

     //projects();

    //if(/.+projects.htm.*/i.test(window.location.valueOf())){projects();}



    /* ======= NOTES SLIDESHOW ======= */

    $("#notes > div:gt(0)").hide();

    setInterval(function() {
        $('#notes > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
    },  3000);


    /* ======= LOGIN (AJAX/JSON) ======= */

    $('#signinButton').on('click', function(e){
        // alert('testing');

        e.preventDefault();

        var user = $('#user').val();
        var pass = $('#pass').val();

        $.ajax({

            url : 'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data : {
                username: user,
                password: pass
            },

            success : function(response) {

                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('dashboard.html');
                }
            }
        });
    });

    /* ======= LOGOUT ======= */

    $('#logout').click(function(e){
        e.preventDefault();
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })
    });

    /* ======= DYNAMIC NAME DISPLAY ======= */

    $.getJSON("xhr/check_login.php" , function(data){

        $.each(data, function(key, val){
            $(".userid").html('Welcome, ' + val.first_name);
        })
    });

    /* ======= REGISTRATION ======= */

    $('#register').click(function(e){
        e.preventDefault();

        var email = $('#email').val(),
            firstname = $('#first').val(),
            lastname = $('#last').val(),
            username = $('#username').val(),
            password = $('#password').val();

            console.log(email + ' ' + firstname + ' ' + lastname + ' ' + username + ' ' + password);

        $.ajax({
            url : 'xhr/register.php',
            type : 'post',
            dataType : 'json',
            data : {
                email : email,
                firstname : firstname,
                lastname : lastname,
                username : username,
                password : password
            },

            success:function(response){

                if(response.error){
                    alert(response.error);
                }else{
                    console.log('hooray');
                    window.location.assign('projects.html');
                }

            }

        });

    });

})(jQuery); // end private scope



/* ======= DISPLAY PROJECT ====== */

var projects = function(){

    $.ajax({
        url : "xhr/get_projects.php",
        type : "get",
        dataType : "json",
        success : function(response){
            if(response.error){
                alert(response.error);
            }else{
                for(var i= 0, j=response.projects.length; i<j; i++){
                    var result = response.projects[i];

                    $('.projects').append(
                            '<div class="projectbox">' + '<input class="projectid" name="projectid" id="projectid" type="hidden" value="' + result.id + '">'
                            + "Project Name: " + result.projectName + '<br />' +
                            "Project Description: " + result.projectDescription + '<br />' +
                            "Project Status: " + result.status + '<p />' +

                            '<button class="menubtn deletebtn">Delete</button>' + ' ' +
                            '<button class="menubtn editbtn">Edit</button>' +
                            '</div>' + '<br />'
                    ); //Close append
                } //Close If/Else

                // DELETE BTN

                $('.deletebtn').on('click', function(e){

                    e.preventDefault();
                    var projectid = $("#projectid").val();

                    console.log('deleted.');

                    $.ajax({
                        url : "xhr/delete_project.php",
                        data : {
                            projectID: projectid //calls individual project id rather than last
                        },
                        type : "post",
                        dataType: "json",
                        success : function(response){
                            if(response.error){
                                alert(response.error);
                            }else{
                                window.location.assign("projects.html")
                            } // Close Else
                        } // Close success
                    }); // Close ajax
                }); // Close .deletebtn

            } // Close projects for loop
        } // Close response
    }); // Close AJAX
    return false
}; //Close projects fn
