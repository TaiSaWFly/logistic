$(function() {
    let intro = $("#intro");
    let header = $("#header");
    let introH = intro.innerHeight();
    let headerH = header.innerHeight();
    let scrollTop = $(window).scrollTop();
    let windowH = $(window).height();

/* Burger-menu
============================================= */

    let burgerNav = $("#burgerNav");
    let nav = $("#nav");

    burgerNav.on("click", function(event) {
        event.preventDefault();

        nav.toggleClass("show");
        $(this).toggleClass("active");
        $("body").toggleClass("show-nav");
    });

     $(window).on("resize", function() {
        nav.removeClass("show");
        burgerNav.removeClass("active");
        $("body").removeClass("show-nav");
    });

//Burger-menu



/* Header scroll
============================================= */

    headerScroll();

    $(window).on("scroll resize", function() {

        headerScroll();
    });

    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();

        let scrollTop = $(this).scrollTop();

        if( scrollTop >= (introH - (headerH + 2)) ) {
            header.addClass("header--dark");

        } else {

            header.removeClass("header--dark");
        }
    };

//Header scroll



/* Section scroll
============================================= */

    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let scrollEl = $(this).data("scroll");
        let scrollElPos = $(scrollEl).offset().top;

        nav.removeClass("show");
        burgerNav.removeClass("active");
        $("body").removeClass("show-nav");

        $("html, body").animate({scrollTop: scrollElPos - headerH
        }, 400);
    });

//Section scroll



/* ScrollSpy
============================================= */

    scrollSpy(scrollTop);

    $(window).on("scroll", function() {
        scrollTop = $(this).scrollTop();

        scrollSpy(scrollTop);
    });

    function scrollSpy(scrollTop) {
        $("[data-scrollspy]").each(function() {

            let sectionId = $(this).data("scrollspy");
            let sectionIdOffset = $(this).offset().top;
            sectionIdOffset = sectionIdOffset - windowH * 0.225;

            if( scrollTop >= sectionIdOffset) {
                $("[data-scroll]").removeClass("active");
                $("[data-scroll='" + sectionId + "']").addClass("active");
            }

            if( scrollTop == 0 ) {
                 $("[data-scroll]").removeClass("active");
            }
        });
    };

//ScrollSpy



/* Modals
============================================= */

    $("[data-modal]").on("click", function(event) {
        event.preventDefault();
        let modal = $(this).data("modal");

        $(modal).addClass("show");
        $("body").addClass("no-scroll").css({
            paddingRight: `${scrollbarWidth()}px`
        });
        header.css({
            paddingRight: `${scrollbarWidth()}px`
        })

        setTimeout( function() {
            $(modal).find(".modal_content").css({
                transform: "scale(1)",
                opacity: "1"
            });
        });
    });

    $("[data-modal-close]").on("click", function(event) {
        event.preventDefault();

        let modal = $(this).parents(".modal");
        closeModal(modal);
    });

    $("[data-otherModal-close]").on("click", function() {
        let modal = $(this).parents(".modal");
        modal.removeClass("show");
    });

    $(".modal").on("click", function() {
        let modal = $(this);
        closeModal(modal);
    });

    $(".modal_content").on("click", function(event) {
        event.stopPropagation();
    });

    function closeModal(modal) {
        modal.find(".modal_content").css({
                transform: "scale(0.5)",
                opacity: "0"
            });

        setTimeout(function() {
            $("body").removeClass("no-scroll").css({
                    paddingRight: "0px"
                });
            header.css({
                    paddingRight: "0px"
                });
            modal.removeClass("show");
        }, 200);
    }

    function scrollbarWidth() {
        let block = $("<div>").css({
                height:'50px',
                width:'50px'
            });
        let scroll = $("<div>").css({
                height:'200px'
            });
        $('body').append(block.append(scroll));

        let windowWithoutScroll = $('div', block).innerWidth();

        block.css('overflow-y', 'scroll');
        let windowWithScroll = $('div', block).innerWidth();

        $(block).remove();
        return (windowWithoutScroll - windowWithScroll);
    }

//Modals


/* Slick_Slider  https://kenwheeler.github.io/slick/
//introSlider
=================================================*/

   let introSlider = $("#introSlider");

   introSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        fade: true,
        speed: 1250
    });

    $("#slickPrev").on("click", function() {
        introSlider.slick("slickPrev");
    });

    $("#slickNext").on("click", function() {
        introSlider.slick("slickNext");
    });

/* Slick_rewiewsSlider  https://kenwheeler.github.io/slick/
=================================================*/

    let rewiewsSlider = $("#rewiewsSlider");

    rewiewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true
    });



// AOS https://github.com/michalsnik/aos

    AOS.init({
      // Global settings:
      disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 105, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

// AOS https://github.com/michalsnik/aos

});
