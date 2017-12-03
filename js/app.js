

//VALIDATE EMAIL
function validateEmail(mail){
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){  return true;  }
  return false;
}

//SUCESS MESSAGE
function success(msg, id){
  dur = 5000;
  if(msg.length > 40){
    dur = 10000;
    mmgs = "";
    pts = msg.match(/.{1,40}/g);
    for(i = 0; i < pts.length; i++){
      mmgs += pts[i] + "\r\n";
    }
    msg = mmgs;
  }
  $('#' + id).notify(msg, {position:"top center", className:'success', autoHideDelay: dur});
}

//ERROR MESSAGE
function error(msg, id){
  dur = 5000;
  if(msg.length > 40){
    dur = 10000;
    mmgs = "";
    pts = msg.match(/.{1,40}/g);
    for(i = 0; i < pts.length; i++){
      mmgs += pts[i] + "<br />";
    }
    msg = mmgs;
  }
  $('#' + id).notify(msg, {position:"top center", className:'error', autoHideDelay: dur});
}


// PAYSTACK INTEGRATION
function payWithPaystack(){
  var quantity = $(selector_quantity).find(":selected").data("value").quantity
  var price = $(selector_ticket).find(":selected").data("value").price
  var id = $(selector_ticket).find(":selected").data("value").id
  var ticketName = $(selector_ticket).find(":selected").data("value").ticketClass
  if($('#fname').val() == "" || $('#fphone').val() == "" || $('#femail').val() == "" || quantity == "0" || id == "oo" || validateEmail($('#femail').val()) === false){
  }else {
    document.getElementById("btn_send").innerHTML ="Processing...";
    document.getElementById("btn_send").disabled =true;

  }
  if($('#fname').val() == ""){
    error("Please enter your full name", "fname"); return;
  }
  if($('#fphone').val() == ""){
    error("Please enter your Phone number", "fphone"); return;
  }
  if($('#femail').val() == ""){
    error("Please enter your email address", "femail"); return;
  }

  if(quantity == "0"){
    error("Please select a valid quantity", "selector_quantity"); return;
  }
  if(id == "oo"){
    error("Please select a valid Ticket", "selector_ticket"); return;
  }

  if(validateEmail($('#femail').val()) === false){
    error("Please enter a valid email address", "femail"); return;
  }

  data = {
    userName: $('#fname').val(),
    userPhone: $('#fphone').val(),
    userEmail: $('#femail').val(),
    ticketClass: id,
    ticketCount: quantity,
    amount: quantity * price
  };
  var handler = PaystackPop.setup({
    key: 'pk_live_41ed986b3773595273e995adf63505fa657e6bfc',
    email: data.userEmail,
    amount: data.amount * 100, // 20000
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: data.userName
        },
        {
          display_name: "Customer Phone",
          variable_name: "mobile_number",
          value: data.userPhone,
        },
        {
          display_name: "Ticket Class",
          variable_name: "ticket_class",
          value: ticketName,
        },
        {
          display_name: "Ticket Quantity",
          variable_name: "ticket_quantity",
          value: data.ticketCount,
        }
      ]
    },
    callback: function(response){

      data.transactionID = response.reference;

      $.post("https://www.nairabox.com/webticket/event.php", data, function(ret){
        if(ret.status == 200){
          success(ret.message, "fm_row2");
        }else{
          error(ret.message, "fm_row2");
        }
      });
    },
    onClose: function(){
      //
      document.getElementById("btn_send").disabled =false;
      document.getElementById("btn_send").innerHTML ="<img class='btn_icon' src='image/lock.svg'>  Make Payment";

    }
  });
  handler.openIframe();
}



$( document ).ready(function() {


  //UPDATE DOM ELEMENT WHEN Ticket Class CHANGES.
  $("#selector_ticket").change(function(){
    var id = $(this).find(":selected").data("value").id;
    var ticketClass = $(this).find(":selected").data("value").ticketClass;
    var isAvailable = $(this).find(":selected").data("value").isAvailable;
    var quantity = $(selector_quantity).find(":selected").data("value").quantity;
    var price = $(selector_ticket).find(":selected").data("value").price;

    calc(quantity, price);
    function calc(quantity, price) {
      total = quantity * price;
      $("#total").html( ' '+ total.toLocaleString() );
      $("#ticketClass").html( ' '+ ticketClass );
      $("#quantity").html( ' '+ quantity );
    }

    if(id == "null"){
      //DISABLE FIELDS AND  BUTTON
      $('#btn_send').attr('disabled',true);
      $('#fname').attr('disabled',true);
      $('#femail').attr('disabled',true);
      $('#fphone').attr('disabled',true);
    }else {
      $('#btn_send').attr('disabled',false);
      $('#fname').attr('disabled',false);
      $('#femail').attr('disabled',false);
      $('#fphone').attr('disabled',false);
    }


    if(!isAvailable){
      $('.error_message').show();
    }else {
      $('.error_message').hide();
    }
  });


  //UPDATE DOM ELEMENT WHEN QUANTIY CHANGES
  $("#selector_quantity").change(function(){
    var quantity = $(selector_quantity).find(":selected").data("value").quantity
    var price = $(selector_ticket).find(":selected").data("value").price

    calc(quantity, price);
    function calc(quantity, price) {
      total = quantity * price;
      $("#total").html( ' '+ total.toLocaleString() );
      $("#quantity").html( ' '+ quantity );
    }
  });

  //HIDE ERROR MESSAGE.
  //ERROR MESSAGE SHOWS ONLY WHEN Tables Ticket IS SELECTED.
  $('.error_message').hide();

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

    var timeDifference = countdown(null, new Date("2017-12-28"), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
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
