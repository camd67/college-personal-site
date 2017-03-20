"use strict";

$(function(){
    // timeout for notification banner
    setTimeout(function(){
        $(".notification-banner").slideUp();
    }, 5000);

    $("#topLink").click(function() {
        $('html, body').animate({
            scrollTop: $("#top").offset().top
        }, 1000);
    });
    $("#projectsLink").click(function() {
        $('html, body').animate({
            scrollTop: $("#projects").offset().top - 25
        }, 1000);
    });
    $("#schoolLink").click(function() {
        $('html, body').animate({
            scrollTop: $("#school").offset().top - 25
        }, 1000);
    });
    $("#linksLink").click(function() {
        $('html, body').animate({
            scrollTop: $("#links").offset().top - 25
        }, 1000);
    });

    function initCarousels(){
        var allCarousels = $(".carousel");
        for(var i = 0; i < allCarousels.length; i++){
            (function(){
                var currCarousel = allCarousels.eq(i);
                currCarousel.hover(
                    function(){
                        currCarousel.children("span").show();
                }, function(){
                    currCarousel.children("span").hide();
                });
                var totalImages = currCarousel.children("img").length;
                displayCarousel(currCarousel);
                currCarousel.click(function() {
                    var last = currCarousel.data("carouselCurrent");
                    var next = ++last >= totalImages ? 0 : last;
                    currCarousel.data("carouselCurrent", next);
                    displayCarousel(currCarousel);
                });
            })();
        }
    }

    function displayCarousel(carousel){
        var currentImage = carousel.data("carouselCurrent");
        var children = carousel.children("img");        
        for(var i = 0; i < children.length; i++){
            if(i === currentImage){
                children.eq(i).show();
            } else {
                children.eq(i).hide();
            }
        }
    }
    initCarousels();

    setTimeout(function(){
        // really just an obtuse way to fool/annoy web scrapers going through both HTML and JS
        var first = "Om90bGlhbQ==";
        var second = "bm9yZW1hYw==";
        var third = "ZW5hb2Q=";
        var fourth = "bW9jLmxpYW1nQA==";

        function r(s){return atob(s).split("").reverse().join("");}

        $("#linkToInsert > span").text(r(second) + r(third) + r(fourth));
        $("#linkToInsert").attr("href", r(first) + r(second) + r(third) + r(fourth));
    }, 3000);
});