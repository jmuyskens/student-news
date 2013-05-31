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
    $("input:checked").each( function() {
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
    $("[name=sender]").val("Dennis Ritchie");
    $("[name=email]").val("dmr@plan9.research.att.com");
    $("[name=title]").val("test post please ignore");
    $("[name=body]").val("Here is my metaphor: your book is a pudding stuffed with apposite observations, many well-conceived. Like excrement, it contains enough undigested nuggets of nutrition to sustain life for some. But it is not a tasty pie: it reeks too much of contempt and of envy<br><br>Bon appetit!");
    submitEntry();
}
