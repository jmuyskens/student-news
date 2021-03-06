/*****************************
 *   filters posts by tag    *
 *****************************/
function selectviews() {
    taglist = [];
    $("html, body").animate({ scrollTop: $("#selectForm").offset().top }, "slow");
    // form a list of the selected tags
    $("#selectForm input:checked").each( function() {
	taglist.push($(this).val());
    });
    if (taglist.length > 0) {
	// show all the posts that match the tags
	$(".message." + taglist.join(", .message.") ).slideDown();
	// hide all those that don't
	$(".message:not(." + taglist.join(", .") + ")").slideUp();
    } else {
	// if no tags selected, show all posts
	$(".message").slideDown();
    }
}


function delnews(key) {
    $.getJSON($SCRIPT_ROOT + '/del', {
	id: key
    }, function(data) {
	$(".message." + key).slideUp(function() { (this).remove(); });
    });
    return false;
}

function appnews(key) {
    $.getJSON($SCRIPT_ROOT + '/app', {
	id: key
    }, function(data) {
	$(".message." + key + " .messageheader dd .approvebutton").hide(function() {
	    (this).remove();
	});
	$(".message." + key + " .messageheader").removeClass("unapproved", 1000);
    });
    return false;
}

function submitEntry() {
    var taglist = [];
    $("#entryForm input:checked").each( function() {
	taglist.push($(this).val());
    });
    var thedata = {
	    title:  $("[name=title]").val(),
	    body:   $("[name=body]").val(),
	    sender: $("[name=sender]").val(),
	    email:  $("[name=email]").val(),
	    tags: taglist 
    };
    console.log(taglist)
    $.ajax({
	type: "POST",
	contentType: "application/json; charset=utf-8",
	url: "/add", 
	data: JSON.stringify(thedata),
	success: function(msg) {
	    console.log(msg);
	    location.reload(); // this will do until we add a dynamic method so we can 
	    // see the new post
	},
	error: function(errormessage) {
	    console.log(errormessage);
	},
	dataType: "json"
    });
}

function testPost() {
    $("[name=sender]").val("Lorem Ipsum");
    $("[name=email]").val("lorem@ipsum.com");
    $("[name=title]").val("Lorem ipsum dolor sit amet");
    $("[name=body]").val("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fermentum pharetra euismod. Cras congue posuere scelerisque. Pellentesque lacus turpis, aliquet ac placerat ac, dapibus sed tortor. Mauris elementum ultrices odio vitae volutpat. Suspendisse interdum justo id velit lacinia nec dictum nibh varius. Morbi non erat sit amet risus elementum placerat et nec ipsum. Nam volutpat porta odio, eu gravida orci volutpat a. Etiam cursus, mauris non mattis euismod, ipsum tellus ullamcorper nunc, molestie pretium sapien libero sodales mi. Cras vel elit ipsum, et euismod erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis enim mauris, interdum eu dictum eget, tincidunt sed quam.");
    submitEntry();
}














