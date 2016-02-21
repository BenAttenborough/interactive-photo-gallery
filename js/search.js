console.log('search.js working');

// Plan of action
//
// Create an object holding all the pictures and meta data (title, alt text, urls)
// When character typed into search box search image captions for search term
// return all images that match search term

var searchTerm;

function getPictures(searchTerm) {
	var html = "<ul>";
	var imageCount = 0;
	for (var index in pictures) {
		if ( pictures[index].alttext.indexOf( searchTerm ) > 0 || searchTerm === "" ) {
			html += "<li>";
			html += "	<a href='img/" + pictures[index].fileurl + "'>";
			html += "		<img src='img/Thumbnails/" + pictures[index].fileurl + "'";
			html += "			 alt='" + pictures[index].alttext + "'";
			html += "		>";
			html += "	</a>";
			html += "</li>";
			imageCount ++;
		}
	}
	if (imageCount === 0) {
		html += "<h2>Sorry no images found for " + searchTerm + "</h2>";
	}
	html += "</ul>";
	$(".pictures")
		.html( html );
}

$(".search__form__input").keyup( function() {
	searchTerm = $(".search__form__input").val()
	getPictures(searchTerm);
	addElements();
	assignClickFunctions();
});