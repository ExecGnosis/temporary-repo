$('nav .responsive-menu-button').on('click', ()=>{
  $('nav .responsive-dropdown').toggleClass('hide');
});

$('nav .responsive-dropdown a').each( (index,item)=>{
  console.log(item);
  $(item).on('click', ()=>{
    $('nav .responsive-dropdown').toggleClass('hide');
  });
});
