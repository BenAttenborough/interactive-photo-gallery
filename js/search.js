var searchTerm;
// array to hold searched for pics
var picturesHolder = [];

function getPictures(searchTerm) {

	// What I think would be a better approach would be to push the selected objects into a new object
	// This object can then be used to populate the pictures but crucially also track the image id for the next previous
	// buttons
	// So could then hopefully remove the data-id tags

	picturesHolder = []

	for (var index in pictures) {
		if ( pictures[index].alttext.indexOf( searchTerm ) > 0 || searchTerm === "" ) {
			picturesHolder.push(pictures[index]);
			// console.log("pictures[" + index + "]: " + pictures[index]);
		}
	}
	// console.log("picturesHolder: " + picturesHolder);

	var html = "<ul>";
	for (var index in picturesHolder) {
		console.log("Picture title: " + picturesHolder[index].title);

		html += "<li style='display:none'>";
		html += "	<a href='img/" + picturesHolder[index].fileurl + "'>";
		html += "		<img src='img/Thumbnails/" + picturesHolder[index].fileurl + "'";
		html += "			 alt='" + picturesHolder[index].alttext + "'";
		html += "		>";
		html += "	</a>";
		html += "</li>";
	}

	// var html = "<ul>";
	// var imageCount = 0;
	// for (var index in pictures) {
	// 	if ( pictures[index].alttext.indexOf( searchTerm ) > 0 || searchTerm === "" ) {
	// 		html += "<li style='display:none'>";
	// 		html += "	<a href='img/" + pictures[index].fileurl + "'>";
	// 		html += "		<img src='img/Thumbnails/" + pictures[index].fileurl + "'";
	// 		html += "			 alt='" + pictures[index].alttext + "'";
	// 		html += "			 data-id=" + index;
	// 		html += "		>";
	// 		html += "	</a>";
	// 		html += "</li>";
	// 		imageCount ++;
	// 	}
	// }

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
	getPictures(searchTerm);
	assignClickFunctions();
});

// Initialise pictures
getPictures("");
assignClickFunctions();