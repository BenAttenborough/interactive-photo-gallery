// var to hold user input
var searchTerm;
// array to hold searched for pics
var picturesHolder = [];

/*
 * 
 *
 *
 *
 */
function getPictures(searchTerm) {

	picturesHolder = []

	for (var index in pictures) {
		if ( pictures[index].alttext.indexOf( searchTerm ) > 0 || searchTerm === "" ) {
			picturesHolder.push(pictures[index]);
		}
	}
	return picturesHolder;
}

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
$(".search__form__input").keyup( function() {
	searchTerm = $(".search__form__input").val();
	displayPictures( getPictures(searchTerm) );
	assignClickFunctions();
});

// Initialise pictures
displayPictures( getPictures("") );
assignClickFunctions();