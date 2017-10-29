$("nav a").each((index,item)=>{
  $(item).click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($(item).attr('href')).offset().top
    }, 1000);
  });
});
