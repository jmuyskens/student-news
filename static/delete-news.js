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
	$(".message." + key +" .approvebutton").hide();
    });
    return false;
}

function testPost() {
    $("[name=sender]").val("Dennis Ritchie");
    $("[name=email]").val("dmr@plan9.research.att.com");
    $("[name=title]").val("test post please ignore");
    $("[name=body]").val("Here is my metaphor: your book is a pudding stuffed with apposite observations, many well-conceived. Like excrement, it contains enough undigested nuggets of nutrition to sustain life for some. But it is not a tasty pie: it reeks too much of contempt and of envy<br><br>Bon appetit!");
    $("#entryForm").submit();
}
