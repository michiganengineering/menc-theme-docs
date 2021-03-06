import $ from 'jquery';

// Navigation slide up
var headroom = new Headroom(document.querySelector("#navigation"), {
    "offset": 0,
    "tolerance": 1,
    "classes": {
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
    }
});
headroom.init();

// Navigation dropdown closes when scrolling
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $(".dropdown-pane").removeClass("is-open");
        $(".menu_controls").removeClass("hover");
        $(".hamburger").removeClass("hover");
    }
});

// Initialize wow.js
if (typeof WOW == 'function') {
    new WOW().init();
}

// scroll-to-top button
var headroom = new Headroom(document.querySelector(".scroll-top-wrapper"), {});
headroom.init();

$(".scroll-top-wrapper").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "swing");
    return false;
});

$(function() {
    $("#video-1, #video-2, #video-3").on("click", function(event) {
        event.preventDefault();
        $(".responsive-embed iframe").prop("src", $(event.currentTarget).attr("href"));
    });
    $(".playlist").on('click', '.video_item', function() {
        // remove classname 'active' from all who already has classname 'active'
        $(".playlist .video_item.active").removeClass("active");
        // adding classname 'active' to current click li
        $(this).addClass("active");
    });
});

// Video category page playlist switcher
$("#video-1, #video-2, #video-3, #video-4, #video-5, #video-6").on("click", function(event) {
    event.preventDefault();
    $(".responsive-embed #main_video").prop("src", $(event.currentTarget).attr("href"));
});
$(".playlist").on('click', '.video_item', function() {
    // remove classname 'active' from all who already has classname 'active'
    $(".playlist .video_item.active").removeClass("active");
    // adding classname 'active' to current click li
    $(this).addClass("active");
});

// Gallery lightbox on index
$(function() {
    var galleryLightbox = document.querySelector('.gallery-lightbox');
    var galleryItems = document.querySelectorAll('.gallery-item');
    var closeButton = document.querySelector('.gallery-button-close');
    var nextButton = document.querySelector('.gallery-button-next');
    var previousButton = document.querySelector('.gallery-button-previous');
    var galleryItemIndex = 0;

    function createGalleryNavigation() {
        var navigationItemHtml = '<li class="gallery-navigation-item"><a class="gallery-navigation-button"></a></li>';
        var navigation = document.querySelector('.gallery-navigation');

        for (var i = 0; i < galleryItems.length; i++) {
            navigation.innerHTML += navigationItemHtml;
        }
    }

    createGalleryNavigation();

    var navItems = document.querySelectorAll('.gallery-navigation-button');

    function showGallery() {
        galleryLightbox.classList.add('active');
    }

    function hideGallery() {
        galleryLightbox.classList.remove('active');
    }

    function updateNavigation() {
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove('active');
        }

        navItems[galleryItemIndex].classList.add('active');
    }

    function showImage() {
        var imageUrl = galleryItems[galleryItemIndex].getAttribute('gallery-full-image');
        var img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'openItem';
        var galleryContent = document.querySelector('.gallery-content');
        var oldImage = galleryContent.querySelector('img');

        if (oldImage) {
            galleryContent.removeChild(oldImage);
        }

        galleryContent.appendChild(img);

        updateNavigation();
    }

    function showCaption() {
        var captionText = galleryItems[galleryItemIndex].getAttribute('gallery-image-caption');
        var galleryContent = document.querySelector('.gallery-content');

        document.getElementById('caption').innerHTML = captionText;
    }

    function getItemIndex(items, item) {
        return Array.from(items).indexOf(item);
    }

    function onGalleryItemClick(event) {
        var clickedGalleryItem = event.currentTarget;

        showGallery();
        galleryItemIndex = getItemIndex(galleryItems, clickedGalleryItem);
        showImage();
        showCaption();
    }

    for (var i = 0; i < galleryItems.length; i++) {
        galleryItems[i].addEventListener('click', onGalleryItemClick);
    }

    function onCloseButtonClick() {
        hideGallery();
    }

    closeButton.addEventListener('click', onCloseButtonClick);

    function onNextButtonClick() {
        galleryItemIndex++;
        if (galleryItemIndex === galleryItems.length) {
            galleryItemIndex = 0;
        }
        showImage();
        showCaption();
    }

    nextButton.addEventListener('click', onNextButtonClick);


    function onPreviousButtonClick() {
        galleryItemIndex--;
        if (galleryItemIndex === -1) {
            galleryItemIndex = galleryItems.length - 1;
        }
        showImage();
        showCaption();
    }

    previousButton.addEventListener('click', onPreviousButtonClick);

    function onNavigationButtonClick(event) {
        var clickedNavigationItem = event.currentTarget;
        galleryItemIndex = getItemIndex(navItems, clickedNavigationItem);
        showImage();
        showCaption();
    }

    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', onNavigationButtonClick);
    }


    function onKeyUp(event) {
        if (event.which === 27) {
            //Escape key up
            hideGallery();

        } else if (event.which === 39) {
            //Arrow right key up
            onNextButtonClick();

        } else if (event.which === 37) {
            //Arrow left key up
            onPreviousButtonClick();

        }

    }

    function onKeyDown(event) {
        if (event.which === 13) {
            showGallery();
            showImage();
            showCaption();
        }
    }

    document.body.addEventListener('keyup', onKeyUp);

});