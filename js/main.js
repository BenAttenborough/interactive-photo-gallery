console.log('main.js working');

// Plan of action
//
// 0. Setup
//  0.1 Create an overlay for the lightbox
//  0.2 Setup variable for image
//  0.3 Setup variable for caption
// 1. Detect when user clicks on an image 
// 	1.1 Select the image
//  1.2 Add a click event
// 2. Prevent default action and add new functionality
//  2.1 Prevent default
//	2.2 Add new functionality
// 3. Create an overlay for image and show image on it
//	3.1 Create overlay
//  3.2 Select the overlay
//	3.3 Display the overlay
//  3.4 Select the image
//  3.5 Display the image
// 4. Show caption below the image
//  4.1 Select the alt text
//	4.2 Display the alt text
// 5. Close image overlay on click

var $overlay = $("<div id='overlay'></div>");
var $previousBtn = $("<div class='col-prev clearfix'><a href='#'><img src='img/previousBtn.png' class='nav-btn'></a></div>");
var $contentDiv = $("<div class='col-main clearfix'></div>");
var $nextBtn = $("<div class='col-next clearfix'><a href='#'><img src='img/nextBtn.png' class='nav-btn'></a></div>");
var $image = $("<img>");
var $caption = $("<p></p>");

$contentDiv.append($image);

$contentDiv.append($caption);

$overlay.append($previousBtn);

$overlay.append($contentDiv);

$overlay.append($nextBtn);

$("body").prepend($overlay);

// 1. Detect when user clicks on an image
// 	1.1 Select the image

//  1.2 Add a click event
$(".pictures a").click( function(){
	// 2. Prevent default action and add new functionality
	//  2.1 Prevent default
	//	2.2 Add new functionality
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	
	$image.attr("src", imageLocation);

	$("#overlay").show();

	var captionText = $(this).children("img").attr("alt");
	$caption.text(captionText);
});

$("#overlay").click( function(){
	$(this).hide();
});

