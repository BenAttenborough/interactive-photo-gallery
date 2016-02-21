var $overlay = $("<div id='overlay' class='clearfix'></div>");
var $previousBtn = $("<div class='col-prev clearfix'><a href='#'><img src='img/previousBtn.png' class='nav-btn'></a></div>");
var $contentDiv = $("<div class='col-main clearfix'></div>");
var $nextBtn = $("<div class='col-next clearfix'><a href='#'><img src='img/nextBtn.png' class='nav-btn'></a></div>");
var $instructions =$("<p>Use arrow keys or buttons to cycle images</p>");
// var $image = $("<img>");
var $image = $("<div class='media-container'>");
var $caption = $("<p></p>");
var imageIndex;
var $imageData;
var $replacementImage;
var $replacementAltText;
var fullHeight;

function getFileType(fileName) {
	return fileName.substr(fileName.lastIndexOf('.') + 1);
}

function appendFileContainer(fileName) {
	var fileType = getFileType(fileName);
	var html = "";
	console.log(fileType);
	switch (fileType) {
		case "jpg":
			console.log("Jpeg");
			html = "<img src='" + fileName + "'>"
			$(".media-container").append(html);
			break;
	}
}

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
}

function addElements(){
	$contentDiv.append($instructions);
	$contentDiv.append($image);
	$contentDiv.append($caption);
	$overlay.append($previousBtn);
	$overlay.append($contentDiv);
	$overlay.append($nextBtn);
	$("body").prepend($overlay);
	fullHeight = $( "body" ).height();
	$overlay.height( fullHeight );
}

function bindKeyNav() {
	$(document).bind( "keydown", function(event) {
		switch (event.which) {
			case 37:
				changeImage('backwards');
				break;
			case 39:
				changeImage('fowards');
				break;
			case 27:
			case 81:
				unbindKeyNav();
				$("#overlay").hide();
				break;
		}
	}); 
}

function unbindKeyNav() {
	$(document).unbind( "keydown" );
}

function assignClickFunctions() {
	$(".pictures a").click( function(){
		event.preventDefault();
		var imageLocation = $(this).attr("href");
		appendFileContainer(imageLocation);
		//
		// $image.attr("src", imageLocation);

		$("#overlay").show();
		// Bind keynav to document when overlay shown
		bindKeyNav();
		var captionText = $(this).children("img").attr("alt");
		$caption.text(captionText);
		//Get image index (location of image in list) for use in prev / next buttons
		imageIndex = $(this).parent().index();
	});

	$("#overlay").click( function(){
		// Unbind keynav when overlay closed
		unbindKeyNav();
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

}

addElements();
assignClickFunctions();



