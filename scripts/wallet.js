$(".pocket").click(function(){
  switch(this.id){
    case "vaccine-card":
      $(".modal-title").text("BC Vaccine Passport");
      $(".modal-body").html("<img src='/images/QRcode.png' class='w-75 m-5'></img>");
      break;
    case "id-card":
      $(".modal-title").text("Personal ID");
      $(".modal-body").html("<img src='/images/id-card.jpg' class='w-75 m-5'></img>");
      break;
    case "ticket-card":
      $(".modal-title").text("Your Ticket");
      $(".modal-body").html("<img src='/images/barcode.png' class='w-100 m-5'></img>");
      break;
  }
})
