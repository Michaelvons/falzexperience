$( document ).ready(function() {
  //VIDEO POPUP
  $('#btn_play').magnificPopup({
    type: 'iframe',

    iframe: {
      markup: '<div class="mfp-iframe-scaler">'+
      '<div class="mfp-close"></div>'+
      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
      '<div class="mfp-title">Some caption</div>'+
      '</div>'
    },
    callbacks: {
      markupParse: function(template, values, item) {
        values.title = item.el.attr('title');
      }
    }


  });


  // IMAGE GALLERY
  $('.thumbnail_1').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.thumbnail_2').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.thumbnail_3').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.thumbnail_4').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.thumbnail_5').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.thumbnail_6').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  //TICKET CLASS BUTTON TO OPEN MODAL
  $('.ticket_class').magnificPopup({
    type: 'inline',
    items: {src: '#modal'},
    preloader: false,
    modal: true
  });

  $('.btn_ticket').magnificPopup({
    type: 'inline',
    items: {src: '#modal'},
    preloader: false,
    modal: true
  });

  //BUTTON TO CLOSE MODAL
  $( "#modal_close" ).click(function(evt) {
    evt.preventDefault();
    $.magnificPopup.close();
  });

  //COUNTDOWN TIMER TO EVENT
  setInterval(timer,1000);
  function timer(){
    //console.log("log time here");

    var timeDifference = countdown(null, new Date("2017-12-28"), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
    //console.log(timeDifference);
    var days = timeDifference.days < 10 ? "0" + timeDifference.days : timeDifference.days;
    var hours = timeDifference.hours < 10 ? "0" + timeDifference.hours : timeDifference.hours;
    var minutes = timeDifference.minutes < 10 ? "0" + timeDifference.minutes : timeDifference.minutes;
    var seconds = timeDifference.seconds < 10 ? "0" + timeDifference.seconds : timeDifference.seconds;

    $('#hero_countdown_day').html(days);
    $('#hero_countdown_hour').html(hours);
    $('#hero_countdown_minute').html(minutes);
    $('#hero_countdown_second').html(seconds);
  }
});
