var $image = $("<img>");
var imageIndex;

$("body").prepend($overlay);

$(".pictures a").click( function(){
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	$image.attr("src", imageLocation);
	$("#overlay").show();
	var captionText = $(this).children("img").attr("alt");
	$caption.text(captionText);
	imageIndex = $(this).parent().index();
});

$(".col-prev a").click( function(){
	event.preventDefault();
	$replacementImage = $( $(".pictures li").get(imageIndex-1) );
	$replacementImage = $replacementImage.children("a").attr("href");
	$image.attr("src", $replacementImage);
});