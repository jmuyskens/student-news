function delnews(key) {
    $.getJSON($SCRIPT_ROOT + '/del', {
	id: key
    }, function(data) {
	$(".message." + key).slideUp();
    });
    return false;
}


