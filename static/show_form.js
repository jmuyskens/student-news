$("#addPost").click(function() {
    if ($("#entryForm").css("display") == "none") {
	$("#entryForm").slideDown();
	// scroll to bottom of document, this is so our form doesn't get cut off
	// if we move the form elsewhere, we'll have to alter/remove this
	$("html, body").animate({ scrollTop: $(document).height()} , "slow" );
	$(this).text("Hide");
    } else {
	$("#entryForm").slideUp();
	$(this).text("Add post");
    }
});
