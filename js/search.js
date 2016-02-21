var searchTerm;

function getPictures(searchTerm) {
	var html = "<ul>";
	var imageCount = 0;
	for (var index in pictures) {
		if ( pictures[index].alttext.indexOf( searchTerm ) > 0 || searchTerm === "" ) {
			
			if ( pictures[index].type === "picture" ) {
				html += "<li style='display:none'>";
				html += "	<a href='img/" + pictures[index].fileurl + "'>";
				html += "		<img src='img/Thumbnails/" + pictures[index].fileurl + "'";
				html += "			 alt='" + pictures[index].alttext + "'";
				html += "		>";
				html += "	</a>";
				html += "</li>";
			}

			if ( pictures[index].type === "youtube" ) {
				html += "<li style='display:none'>";
				html += "	<a href='" + pictures[index].fileurl + "'>";
				html += "		<img src='" + pictures[index].fileurl + "'";
				html += "			 alt='" + pictures[index].alttext + "'";
				html += "		>";
				html += "	</a>";
				html += "</li>";
			}

			imageCount ++;
		}
	}
	if (imageCount === 0) {
		html += "<h2>Sorry no images found for " + searchTerm + "</h2>";
	} 
	if (imageCount === 1) {
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

$(".search__form__input").keyup( function() {
	searchTerm = $(".search__form__input").val();
	getPictures(searchTerm);
	assignClickFunctions();
});