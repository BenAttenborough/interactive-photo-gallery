console.log('search.js working');

// Plan of action
//
// Create an object holding all the pictures and meta data (title, alt text, urls)
// When character typed into search box search image captions for search term
// return all images that match search term

var searchTerm;

$(".search__form__input").keyup( function() {
	searchTerm = $(".search__form__input").val()
	console.log("Key pressed: ");
	console.log(searchTerm);
});