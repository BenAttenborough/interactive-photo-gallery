// Gallery

/*
 * 	Fetches pictures from pictures.js based on searchTerm, if searchTerm is empty or undefined it returns all pictures
 * 	@PARAM searchTerm {string} Text to check each picture's alt-text againt 
 *	@RETURN pictureHolder {array} An array of pictures which match the search term
 *
 */

function getPictures(searchTerm) {
	picturesHolder = []
	if ( searchTerm == undefined ) {
		searchTerm = "";
	}
	searchTerm = searchTerm.toLowerCase()
	for (var index in pictures) {
		picture = pictures[index];
		pictureAltText = pictures[index].alttext.toLowerCase();
		if ( pictureAltText.indexOf( searchTerm ) > 0 || searchTerm === "" ) {
			picturesHolder.push(picture);
		}
	}
	return picturesHolder;
}

function createSearch() {
	$(".search__form__input").keyup( function() {
		searchTerm = $(".search__form__input").val();
		displayPictures( getPictures(searchTerm) );
		assignClickFunctions();
	});
}

// Lightbox

function getMedia(media) {
	html = "";
	switch (media.type) {
		case "picture":
			html = "<img src='img/" + media.fileurl + "'>";
			break;
		case "youtube":
			html  = "<iframe width='100%' height='100%'";
			html += "src='" + media.embed + "'>";
			html += "</iframe>";
			break;
		case "mixcloud":
			html  = "<iframe width='100%' height='100%'";
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
		imageIndex = picturesHolder.length -1;
		}
	} else {
		if (imageIndex < picturesHolder.length -1) {
		imageIndex++;
		} else {
		imageIndex = 0;
		}
	}
	$mediaContainer.html( getMedia(picturesHolder[imageIndex]) );
	$caption.html( '<p>' + picturesHolder[imageIndex].alttext + '</p>' )
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
	console.log("Assigning click functions")
	$(".pictures a").click( function(){
		event.preventDefault();
		imageIndex = $(this).parent().index();
		console.log("imageIndex: " + imageIndex)
		$mediaContainer.html( getMedia(picturesHolder[imageIndex]) );
		$("#overlay").show();
		$(document).scrollTop( 0 );
		bindKeyNav();
		var captionText = picturesHolder[imageIndex].alttext;
		$caption.html(captionText);
	});

	$("#overlay").click( function(){
		// Unbind keynav when overlay closed
		unbindKeyNav();
		$(this).hide();
	});

	// Unbind click functions to stop rebinding of buttons
	$(".col-next a").unbind ("click");
	$(".col-prev a").unbind ("click");

	$(".col-next a").click( function(event){
		event.stopPropagation();
		changeImage('fowards');
		console.log("forwards button pressed");
	});

	$(".col-prev a").click( function(event){
		event.stopPropagation();
		changeImage('backwards');
		console.log("backwards button pressed");
	});

}