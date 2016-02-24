// var to hold user input
var searchTerm;
// array to hold searched for pics
var picturesHolder = [];

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

/*
 *	Takes an array of pictures, builds html to display them and displays them on screen.
 *	If no images are passed then displays message
 *	@PARAM picturesHolder {array} An array of picture objects to display
 */

function displayPictures(picturesHolder) {
	var html = "<ul>";
	for (var index in picturesHolder) {
		html += "<li style='display:none'>";
		html += "	<a href='img/" + picturesHolder[index].fileurl + "'>";
		html += "		<img src='img/Thumbnails/" + picturesHolder[index].fileurl + "'";
		html += "			 alt='" + picturesHolder[index].alttext + "'";
		html += "		>";
		html += "	</a>";
		html += "</li>";
	}

	if (picturesHolder.length === 0) {
		html += "<h2>Sorry no images found for " + searchTerm + "</h2>";
	} 
	if (picturesHolder.length === 1) {
		$($instructions).hide();
		$(".col-prev a").hide();
		$(".col-next a").hide();
	} else {
		$($instructions).show();
		$(".col-prev a").show();
		$(".col-next a").show();
	}
	
	html += "</ul>";
	$(".pictures")
		.html( html );
	$(".pictures li").fadeIn("slow");
}

// Bind keypress to search box
function createSearch() {
	$(".search__form__input").keyup( function() {
		searchTerm = $(".search__form__input").val();
		displayPictures( getPictures(searchTerm) );
		assignClickFunctions();
	});
}

createSearch();
// Initialise pictures
displayPictures( getPictures() );
assignClickFunctions();