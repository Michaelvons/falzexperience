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
});
