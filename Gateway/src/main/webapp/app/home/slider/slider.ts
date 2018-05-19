import * as $ from 'jquery';

export function init() {
    let sliderWrapper = $(".slider-wrapper");
    let slide = $(".slide");
    let viewWidth = $(window).width();
    let viewHeight = $(window).height();
    let sliderInner = $(".slider-inner");
    let childrenNo = sliderInner.children().length;

    sliderInner.width(viewWidth * childrenNo);

    function setWidth() {
        slide.each(function () {
            $(this).width(viewWidth);
            $(this).css("left", viewWidth * $(this).index());
        });
    }

    function setHeight() {
        sliderInner.height(viewHeight);
        sliderWrapper.height(viewHeight);
        slide.each(function () {
            $(this).height(viewHeight);
        });
    }

    setWidth();

    $(window).resize(function () {
        viewWidth = $(window).width();
        viewHeight = $(window).height();
        setWidth();
        //setHeight();
    });

    $(".slider-nav > div").on("click", function () {
        setActive($(this));
    });

    function setActive(element) {
        console.log(element);
        let clickedIndex = element.index();
        slideIndex = clickedIndex;

        $(".slider-nav .active").removeClass("active");
        element.addClass("active");

        sliderInner.css("transform", "translateX(-" + clickedIndex * viewWidth + "px) translateZ(0)");

        $(".slider-inner .active").removeClass("active");
        $(".slider-inner .slide").eq(clickedIndex).addClass("active");
    }

    let slideIndex = 0;
    carousel();

    function carousel() {
        let slides = document.getElementsByClassName("slide");
        let slidesNav = document.getElementsByClassName("slider");
        let i;
        for (i = 0; i < slide.length; i++) {
            console.log(i + ' ' + slides[i].className);
            slides[i].className = "slide";
            slidesNav[i + 1].className = "slider";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slidesNav[slideIndex].className = "slider active";
        slides[slideIndex - 1].className += " active";
        sliderInner.css("transform", "translateX(-" + (slideIndex - 1) * viewWidth + "px) translateZ(0)");

        setTimeout(carousel, 3000);
    }
}
