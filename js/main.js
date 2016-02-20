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
// 5. Show previous and next buttons
//  5.1 Create the buttons
//  5.2 Add click event to the buttons
//  5.3 When button clicked display previous or next image
//   5.3.1 Get the next/previous image using jquery
// 8. Close image overlay on click

var $overlay = $("<div id='overlay'></div>");
var $previousBtn = $("<div class='col-prev clearfix'><a href='#'><img src='img/previousBtn.png' class='nav-btn'></a></div>");
var $contentDiv = $("<div class='col-main clearfix'></div>");
var $nextBtn = $("<div class='col-next clearfix'><a href='#'><img src='img/nextBtn.png' class='nav-btn'></a></div>");
var $image = $("<img>");
var $caption = $("<p></p>");
var imageIndex;

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

	//Get image index (location of image in list) for use in prev / next buttons
	imageIndex = $(this).parent().index();
});

// $("#overlay").click( function(){
// 	$(this).hide();
// });

$(".col-prev a").click( function(){
	//  5.2 Add click event to the buttons
	event.preventDefault();
	console.log("Previous button clicked");
	//We need to get the next image in the list
	// $image.attr("src", "img/12.jpg");


	//  5.3 When button clicked display previous or next image
	//   5.3.1 Get the next/previous image using jquery
	// Need to get the next image. So we can get the current image $(".col-main img").attr("src")
	// Then we have to find that image within the "pictures ul li" div


	currentElement = $(this);
	console.log("Current element is: ");
	console.log(currentElement);
	parentElement = $(this).parent();
	console.log("Parent element is: ");
	console.log(parentElement);
	nextElement = $(this).parent().next();
	console.log("Next element is: ");
	console.log(nextElement);
	console.log("Image index: ");
	console.log(imageIndex);

	$replacementImage = $(".pictures li").get(imageIndex);
	console.log("Replacement picture: ");
	console.log($($replacementImage).children("a").attr("href"));

	$replacementImage = $($(".pictures li")[imageIndex]).children("a").attr("href");
	console.log("Replacement picture: ");
	console.log($replacementImage);

	$replacementImage = $( $(".pictures li").get(imageIndex) );
	$replacementImage = $replacementImage.children("a").attr("href");
	console.log("Replacement picture: ");
	console.log($replacementImage);
});

