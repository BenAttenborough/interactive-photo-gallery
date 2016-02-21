var $overlay = $("<div id='overlay'></div>");
var $previousBtn = $("<div class='col-prev clearfix'><a href='#'><img src='img/previousBtn.png' class='nav-btn'></a></div>");
var $contentDiv = $("<div class='col-main clearfix'></div>");
var $nextBtn = $("<div class='col-next clearfix'><a href='#'><img src='img/nextBtn.png' class='nav-btn'></a></div>");
var $image = $("<img>");
var $caption = $("<p></p>");
var imageIndex;

function changeImage(direction) {
	event.preventDefault();
	if (direction === 'backwards') {
		if (imageIndex>0) {
		imageIndex--;
		} else {
		imageIndex = $(".pictures li").length -1;
		}
	} else {
		if (imageIndex<$(".pictures li").length -1) {
		imageIndex++;
		} else {
		imageIndex = 0;
		}
	}
	$imageData = $( $(".pictures li").get(imageIndex) );
	$replacementImage = $imageData.children("a").attr("href");
	$replacementAltText = $imageData.children("a").children("img").attr("alt");
	$image.attr("src", $replacementImage);
	$caption.html($replacementAltText);
};

$contentDiv.append($image);
$contentDiv.append($caption);
$overlay.append($previousBtn);
$overlay.append($contentDiv);
$overlay.append($nextBtn);
$("body").prepend($overlay);


$(".pictures a").click( function(){
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	$image.attr("src", imageLocation);
	$("#overlay").show();
	var captionText = $(this).children("img").attr("alt");
	$caption.text(captionText);
	//Get image index (location of image in list) for use in prev / next buttons
	imageIndex = $(this).parent().index();
});

$("#overlay").click( function(){
	$(this).hide();
});

$(".col-next a").click( function(event){
	event.stopPropagation();
	changeImage('fowards');
});

$(".col-prev a").click( function(event){
	event.stopPropagation();
	changeImage('backwards');
});

