var $overlay = $("<div id='overlay' class='clearfix'></div>");
var $previousBtn = $("<div class='col-prev clearfix'><a href='#'><img src='img/previousBtn.png' class='nav-btn'></a></div>");
var $contentDiv = $("<div class='col-main clearfix'></div>");
var $nextBtn = $("<div class='col-next clearfix'><a href='#'><img src='img/nextBtn.png' class='nav-btn'></a></div>");
var $instructions =$("<p>Use arrow keys or buttons to cycle images</p>");
var $mediaContainer = $("<div class='media-container'>");
var $caption = $("<p></p>");
var imageIndex;
var $imageData;
var $replacementImage;
var $replacementAltText;
var fullHeight;

function getMedia(media) {
	html = "";
	switch (media.type) {
		case "picture":
			html = "<img src='img/" + media.fileurl + "'>";
			break;
		case "youtube":
			html  = "<iframe width='100%' height='100%'";
			// html += "src='" + media.fileurl + "'>";
			html += "src='" + media.embed + "'>";
			html += "</iframe>";
			break;
		case "mixcloud":
			html  = "<iframe width='100%' height='100%'";
			// html += "src='" + media.fileurl + "'>";
			html += "src='" + media.embed + "'>";
			html += "</iframe>";
			break;
		default:
			html = "<p>Filetype: " + media.type + " is not recognised</p>";
			break;
	}
	return html;
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
	$mediaContainer.html( getMedia(pictures[imageIndex]) );
	$caption.html( '<p>' + pictures[imageIndex].alttext + '</p>' )
}

function addElements(){
	$contentDiv.append($instructions);
	$contentDiv.append($mediaContainer);
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
		//Next line needs to be altered to get correct index!
		//perhaps could assign image numbers to images when search generates them?
		//Problem with using object is that we cannot get image number from generated image
		//perhaps get index from title?


		imageIndex = $(this).parent().index();
		$mediaContainer.html( getMedia(pictures[imageIndex]) );
		$("#overlay").show();
		$(document).scrollTop( 0 );
		// Bind keynav to document when overlay shown
		bindKeyNav();
		var captionText = pictures[imageIndex].alttext;
		$caption.html(captionText);
		//Get image index (location of image in list) for use in prev / next buttons
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



