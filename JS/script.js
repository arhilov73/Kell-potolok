
// TOGGLE-MENU:
$('.menu-toggle').on('click', menuMobile);
$('.menu-toggle').on('click', getOpacity);
$('.nav-item').on('click', menuOff);

$(document).ready(function() {
    if($(document).width() <= 970) {
        $('.navbar').slideToggle(100);
    }
})

function menuMobile() {
    $('.navbar').slideToggle(500);
}

function getOpacity() {
    $('#main').toggleClass('opacity-5');
    $('#footer').toggleClass('opacity-5');
    $('.header-banner').toggleClass('opacity-5');
    $('#nav').toggleClass('bg-color-1');
    $('.navbar').toggleClass('bg-color-1');
    $('#menu-toggle--line-1').toggleClass('toggle-line-1--active');
    $('#menu-toggle--line-2').toggleClass('toggle-line-2--active');
    $('#menu-toggle--line-3').toggleClass('toggle-line-3--active');
}

function menuOff() {
    if($(document).width() <= 970) {
        $('#main').toggleClass('opacity-5');
        $('#footer').toggleClass('opacity-5');
        $('.header-banner').toggleClass('opacity-5');
        $('#nav').toggleClass('bg-color-1');
        $('.navbar').toggleClass('bg-color-1');
        $('#menu-toggle--line-1').toggleClass('toggle-line-1--active');
        $('#menu-toggle--line-2').toggleClass('toggle-line-2--active');
        $('#menu-toggle--line-3').toggleClass('toggle-line-3--active');
        $('.navbar').slideToggle(500);
    }
}

// Menu-item-click:
// if ($('body').width() <= 320) {
//     $($('.menu-item')[0]).click(function() {
//         $('html').scrollTop(0);
//     })
//     $($('.menu-item')[1]).click(function() {
//         $('html').scrollTop(570);
//     })
//     $($('.menu-item')[2]).click(function() {
//         $('html').scrollTop(3372);
//     })
//     $($('.menu-item')[3]).click(function() {
//         $('html').scrollTop(4705);
//     })
//     $($('.menu-item')[4]).click(function() {
//         $('html').scrollTop(5482);
//     })
// }


// REVIEWS SLIDER
let slideNow = 1;
let slideCount = $('#slidewrapper').children().length;
let slideInterval = 10000;
let navBtnId = 0;
let translateWidth = 0;

$(document).ready(function() {
    var switchInterval = setInterval(nextSlide, slideInterval);

    $('#viewport').hover(function() {
        clearInterval(switchInterval);
    }, function() {
        switchInterval = setInterval(nextSlide, slideInterval);
    });

    $('#next-btn').click(function() {
        nextSlide();
    });

    $('#prev-btn').click(function() {
        prevSlide();
    });

    $('.slide-nav-btn').click(function() {
        navBtnId = $(this).index();

        if (navBtnId + 1 != slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = navBtnId + 1;
        }
    });
});


function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}


// CALCULATOR
$('.current-s').val($('.range-s').val());

$('.range-s').on('input', function() {
    $('.current-s').val($('.range-s').val());
})

$('.current-s').on('input', function() {
    $('.range-s').val($('.current-s').val());
    if($('.current-s').val() > 100) {
        $('.current-s').val(100)
    }
    if($('.current-s').val() < 1) {
        $('.current-s').val(1)
    }
})

function calc() {
    let roofTypeCost;
    let lights = $('#option-select').val();
    let corners = $('#corner-select').val();
    let result;

    if($('.type-item:nth-child(1) .type-radio').prop('checked') || $('.type-item:nth-child(2) .type-radio').prop('checked') || $('.type-item:nth-child(3) .type-radio').prop('checked')) {
        roofTypeCost = 290; 
    }
    if($('.type-item:nth-child(4) .type-radio').prop('checked')) {
        roofTypeCost = 590; 
    }
    if($('.type-item:nth-child(5) .type-radio').prop('checked')) {
        roofTypeCost = 1380; 
    }

    result = $('.current-s').val() * roofTypeCost + lights * 240 + corners * 60;
    $('.cost-text').html(result)
}
$(window).on('change', calc)


// FAQ
$(document).ready(function() {
	$('.answer').slideToggle(500);
})

$('.quest-header').click(function() {
	$(this).next().slideToggle(500);
});

$('.quest-header').click(function() {
	$(this).toggleClass('span-rotate');
});


// Links to Contacts form
$('.header-banner-btn').on('click', function(e) {
    $('html,body').stop().animate({ scrollTop: $('#contacts').offset().top }, 800);
    e.preventDefault();
});


// BANNER TIME:
function writeTime() {
    const currentDate = new Date();
    const futureMonth = currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1;
    const futureDate = new Date(2021, futureMonth, 1, 0, 0, 0, 0);

    const currentDateMS = currentDate.getTime();
    const futureDateMS = futureDate.getTime();
    const dateDiff = futureDateMS - currentDateMS;

    const days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
    const hours = Math.floor((dateDiff / 1000 / 60 / 60) - days * 24);
    const minutes = Math.floor((dateDiff / 1000 / 60) - days * 24 * 60 - hours * 60);
    const seconds = Math.floor((dateDiff / 1000) - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60);

    days.toString().length < 2 ? $('#days').html('0' + days) : $('#days').html(days);
    hours.toString().length < 2 ? $('#hours').html('0' + hours) : $('#hours').html(hours);
    minutes.toString().length < 2 ? $('#min').html('0' + minutes) : $('#min').html(minutes);
    seconds.toString().length < 2 ? $('#sec').html('0' + seconds) : $('#sec').html(seconds);
}
writeTime();
setInterval(writeTime, 1000);




// Modals after type-buttons click:

// CLOSE MODAL
$('.modal-close').click(function() {
    $('.modal-window').removeClass('modal-window--active')
})
$('.modal-cost-link').click(function() {
    $('.modal-window').removeClass('modal-window--active')
})

// OPEN MODALS
$('.type-btn-1-1').click(function() {
    $('#modal-1-1').addClass('modal-window--active')
})
$('.type-btn-1-2').click(function() {
    $('#modal-1-2').addClass('modal-window--active')
})
$('.type-btn-1-3').click(function() {
    $('#modal-1-3').addClass('modal-window--active')
})
$('.type-btn-1-4').click(function() {
    $('#modal-1-4').addClass('modal-window--active')
})
$('.type-btn-2-1').click(function() {
    $('#modal-2-1').addClass('modal-window--active')
})
$('.type-btn-2-2').click(function() {
    $('#modal-2-2').addClass('modal-window--active')
})
$('.type-btn-2-3').click(function() {
    $('#modal-2-3').addClass('modal-window--active')
})
$('.type-btn-2-4').click(function() {
    $('#modal-2-4').addClass('modal-window--active')
})
$('.type-btn-2-5').click(function() {
    $('#modal-2-5').addClass('modal-window--active')
})
$('.type-btn-2-6').click(function() {
    $('#modal-2-6').addClass('modal-window--active')
})