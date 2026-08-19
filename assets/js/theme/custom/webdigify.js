/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */
/* --------------------------- TemplateTrip JS ------------------------------ */

import $ from 'jquery';


export default function () {
	const $ttcmsoffer = $('.ttcmsofferbanner .offerbanner-inner');
	const $subcategory = $('.subcategories-carousel');
	const $ttblog = $('.ttblog-carousel');
	const $footerservices = $('.footerservices-carousel');
	const $productthumbcarousel = $('.wdg-thumb-carousel');
	const $tttestimonial = $('#tttestimonial-carousel');
	
$(document).ready(function(){
	/* Go to Top JS START */
		 $(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	/* Go to Top JS END */
	
	 $('.wdg-thumb-img a').on('click', function () {
		var src = $(this).data("fullsrc");
		if (src != '') {
		  $(this).closest('.card-figure').find('.card-img-container img').first().attr('src', src);
		}
		$(this).addClass('open').siblings(this).removeClass('open');
	});
	
	
	/* ------------------------------- start ttcmsbottombanner --------------------------- */
	$('.topbanner .ttcmsofferbanner').insertBefore('.tt-heroCarousel');
	$('.topbanner .ttcmssubbanner').insertAfter('.tt-featured');
	$('.topbanner .ttcmsbottombanner').insertAfter('.tt-top-seller');
	/* ------------------------------- end ttcmsbottombanner --------------------------- */

/* ----------- Start Page-loader ----------- */

$productthumbcarousel.each(function () {
	$(this).slick({
		arrows: true,
		infinite: false,
		dots: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: 0,
		responsive: [
			{
				breakpoint: 1710,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 544,
				settings: {
					slidesToShow:3,
				},
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	});
});

$ttcmsoffer.each(function () {
	$(this).slick({
		arrows: false,
		infinite: true,
		dots: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: 1,
		responsive: [
			{
				breakpoint: 1710,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 544,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 0,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});
});

$footerservices.each(function () {
	$(this).slick({
		arrows: false,
		infinite: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: 1,
		responsive: [
			{
				breakpoint: 1710,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 544,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 0,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});
});

$subcategory.each(function () {
        $(this).slick({
            arrows: true,
            infinite: false,
            dots: false,
            slidesToShow:6,
            slidesToScroll: 1,
            autoplay: 1,
            responsive: [
                {
                    breakpoint: 1710,
                    settings: {
                        slidesToShow: 6,
                    },
                },
                {
                    breakpoint: 1460,
                    settings: {
                        slidesToShow: 5,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    },
                },
				{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    },
                },
				{
                    breakpoint: 544,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });
    });

$tttestimonial.each(function () {
        $(this).slick({
            arrows: false,
            infinite: true,
            dots: true,
            slidesToShow:1,
            slidesToScroll: 1,
            autoplay: 1,
            responsive: [
                {
                    breakpoint: 1710,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 1460,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                    },
                },
				{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    },
                },
				{
                    breakpoint: 544,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });
    });
	
$ttblog.each(function () {
	$(this).slick({
		arrows: true,
		infinite: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1710,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 1460,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow:3,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 544,
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 0,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});
});
	
	

	
	/* -------------- Start review tab ------------------- */


	if(window.location.hash.substr(1)=='tab-productReviews') {
		$('.productView-description ul.tabs > li a#product-reviews').trigger('click');
		$('html, body').animate({
			scrollTop: $(".productView-description").offset().top
		}, 2000);
	}
	$(".tt-readreview a").click(function() {
		$('html, body').animate({
			scrollTop: $(".productView-description").offset().top
		}, 2000);
	});

 	$('.tt-readreview').click(function() {
        $('.productView-description .tab').removeClass('is-active');
        $('.productView-description .tabs-contents > div').removeClass('is-active');

        $('.productView-description .tab #product-reviews').parent().addClass('is-active');
        $('.productView-description .tabs-contents #tab-productReviews').addClass('is-active');
    });

/* -------------- Start TT - MENU  ------------------- */

	
	
	$('.ttcat-title').on('click', () => {
        $('.cat-Menu-toggle').slideToggle('slow');
    });
	
	if ( $('.navPage-subMenu .navPage-subMenu-list .navPage-subMenu-item .navPage-subMenu-action').hasClass('has-subMenu') ) {
      $('.navPage-subMenu .navPage-subMenu-list .navPage-subMenu-item .has-subMenu').parent().parent().parent().parent().addClass('simple');
    }
	
	if ( $('.navPage-subMenu .navPage-subMenu-list .navPage-subMenu-item .has-subMenu').parent().parent().hasClass('grid-2') ) {
      $('.navPage-subMenu .navPage-subMenu-list  .navPage-subMenu-item .has-subMenu').parent().parent().parent().parent().addClass('simple-2');
    }
	

	/* ---------------- start Templatetrip link more menu ----------------------*/
	
	
	/* ---------------- End Templatetrip link more menu ----------------------*/
	
/* ---------------- start Templatetrip more menu ----------------------*/
	
	
	if ($(document).width() >= 991){
		var max_elem = 10;
	}
	
	var menu = $('.navPages ul.cat-Menu-toggle > li');	
	if ( menu.length > max_elem ) {
		$('.navPages ul.cat-Menu-toggle').append('<li class="more"><div class="more-menu"><span class="categories">More</span></div></li>');
	}
	
	$('.navPages ul.cat-Menu-toggle .more-menu').click(function() {
		if ($(this).hasClass('active')) {
			menu.each(function(j) {
			if ( j >= max_elem ) {
				$(this).slideUp(200);
			}
		});
			
		$(this).removeClass('active');
		$('.more-menu').html('<span class="categories">More</span>');
		} 
		else {
			menu.each(function(j) {
			if ( j >= max_elem  ) {
				$(this).slideDown(200);
			}
		});
		$(this).addClass('active');
		$('.more-menu').html('<span class="categories">Less</span>');
		}
	});
	
	menu.each(function(j) {
		if ( j >= max_elem ) { 
			$(this).css('display', 'none');
		}
	});
	
/* ---------------- End Templatetrip more menu ----------------------*/

 		 /*-------------------------- Progress-Bar js start ------------------------------ */
		 
			$('.productCarousel-slide .card').each(function(){
			var $desc = jQuery(this).find('.card .ttqtyprogress .progress');
			var $qty = jQuery(this).find('.quantity');
			var $pbar = jQuery(this).find('.progress-bar');
			var $progress = $desc;
			var $progressBar = $pbar;
			var $quantity = $qty.html();
			var currentWidth = parseInt($progressBar.css('width'));
			var allowedWidth = parseInt($qty.css('width'));
			var addedWidth = currentWidth + parseInt($quantity);
			if (addedWidth > allowedWidth) {
			addedWidth = allowedWidth;
			}
			var progress = (addedWidth / allowedWidth) * 100;
			$progressBar.animate({width: progress + '%' }, 100);
			});
			
			
			/*-------------------------- Progress-Bar js end ------------------------------ */
	
	/* -------------- Start Myaccount(Header) ------------------- */

	$(".tt-user-info .account-link-title").click(function() {
		$('.navUser-section .account-link-toggle').parent().toggleClass('active');
		$('.navUser-section .account-link-toggle').slideToggle('fast', function() {});
		$('.navUser-item--cart .navUser-action').removeClass('is-open');	
		$('#cart-preview-dropdown').removeClass('is-open');	
	});
	
	$(".navUser-item--cart .navUser-action").click(function() {
 		$('.tt-user-info').removeClass('active');
		$('.tt-user-info .account-link-toggle').css({'display': 'none'});
	});
	
});

}

/* ------------ Start left-column toggle JS --------------- */

	function optionFilter(){
		if ($(window).width() <= 991) {
			$('.filter-box.tt-bottom').after($('.page-sidebar .subcategory'));
			$('.filter-box.tt-bottom').after($('.page-sidebar .tt-left-banners'));
		} else {
			$('.page-content .subcategory').prependTo('.page-sidebar nav');
			$('.page-content .tt-left-banners').appendTo('.page-sidebar nav');
		}
	}
	$(document).ready(function(){ optionFilter(); });
	$(window).resize(function(){ optionFilter(); });

/* ------------ End left-column toggle JS --------------- */


/* --------------- Start Sticky-header JS ---------------*/		 
	function header() {	
	 if ($(window).width() > 1199){
		 if ($(window).scrollTop() > 500){ 
				$('.header .full-header').addClass("fixed");
				$('#menu').prependTo(".full-header.fixed .container");
			}else{
			 $('.header .full-header').removeClass("fixed");
			 $('#menu').insertBefore(".ttquicksearch");
			}
		} 
		else {
		  $('.header, .full-header').removeClass("fixed");
		}
	}
	 
	$(document).ready(function(){header();});
	$(window).resize(function() {header();});
	$(window).scroll(function() {header();});
	
	
	
/* --------------- End Sticky-header JS ---------------*/	

function leftcolumncategorytoggle()
{
	if ($(document).width() <= 991){
       $(".subcategory .sidebarBlock-heading").addClass( "toggle" );
		$(".subcategory .navList").css( 'display', 'none' );
		$(".subcategory .navList.active").css( 'display', 'block' );
		$(".subcategory .sidebarBlock-heading").unbind("click");
		$(".subcategory .sidebarBlock-heading").click(function() {
			$(this).parent().toggleClass('active').find('ul.navList').slideToggle( "fast" );
		});
	} else {
		$(".subcategory .sidebarBlock-heading").removeClass( "toggle" );
		$(".subcategory .navList").css( 'display', 'block' );
		$(".subcategory .sidebarBlock-heading").click(function() {
			$(this).parent().toggleClass('active').find('ul.navList').stop(); 
		});
	}
}
$(window).resize(function(){leftcolumncategorytoggle();});
$(window).ready(function(){leftcolumncategorytoggle();});
/*category filter js end*/


function responsivecolumn()
{
	if ($(window).width() <= 991)
	{
		$('.navUser ul > li.btn-compare').appendTo('.navUser ul > li.tt-user-info ul > li.navUser-item--account');
		$('.navUser ul > li.navUser-item--wishlist').appendTo('.navUser ul > li.tt-user-info ul > li.navUser-item--account');
	}
	else if($(window).width() >= 992)
	{
		$('.navUser ul > li.tt-user-info ul > li.navUser-item--account li.navUser-item--wishlist').prependTo('.navUser > ul.navUser-section');
		$('.navUser ul > li.tt-user-info ul > li.navUser-item--account li.btn-compare').prependTo('.navUser > ul.navUser-section');		
	}
}
$(window).resize(function(){responsivecolumn();});
$(window).ready(function(){responsivecolumn();});
/*category filter js end*/


function footertogglelink()
{
	if ($(window).width() <= 991)
	{
		$(".footer .footer-info-heading").addClass( "toggle" );
		$(".footer-info-list").css( 'display', 'none' );
		$(".footer-info-list.active").css( 'display', 'block' );
		$(".footer .footer-info-heading.toggle").unbind("click");
		$(".footer .footer-info-heading.toggle").click(function() {
			$(this).parent().toggleClass('active').find('ul.footer-info-list').slideToggle( "fast" );
		});
	}
	else if($(window).width() >= 992)
	{
		$(".footer .footer-info-heading").removeClass( "toggle" );
		$(".footer .footer-info-heading.toggle").parent().removeClass('active');
		$(".footer-info-list").css( 'display', 'block' );
	}
}
$(window).resize(function(){footertogglelink();});
$(window).ready(function(){footertogglelink();});
/* -------------- Start Foooter Link ------------------- */

function morelinks(){
	var max_link;
		if($(document).width() <= 1200){
			max_link = 3;
		}  
		else{
			max_link =4;
		}
		var moretext= "More";
		var items = $('.header-center #menu-link div.navPages-item-page');
		var surplus = items.slice(max_link, items.length);
		surplus.wrapAll('<div class="more_menu navPages-item-page"><div class="tt-link-action clearfix">');
		$('.more_menu').prepend('<a href="#" class="link-action">'+moretext+'</a>');
		$('.more_menu').mouseover(function(){
		$(this).children('div').addClass('shown-link');
		})
		$('.more_menu').mouseout(function(){
		$(this).children('div').removeClass('shown-link');
		});
		
		jQuery(".header-center #menu-link div.navPages-item-page").hover(function() {
				jQuery("body").addClass("top_hover");
			}, function() {
				jQuery("body").removeClass("top_hover");
			});
		}
$(window).ready(function(){morelinks();});





