var isRunning = false,
    idRunning = -1;
function runAnimation(index, status){
  if(parseInt($('.slider__inner').css('left')) > - $(window).width() && status == 0){
    $('.slider__inner').css('left', ( parseInt($('.slider__inner').css('left')) - 45 ) + 'px');

    console.log($('.slider__inner').css('left'));

    setTimeout(()=>runAnimation(index,0),0);

  }else if(parseInt($('.slider__inner').css('left')) < - $(window).width()){
    $('.slider__inner').css('left', $(window).width());


    $('.slider__inner > div').each((personIndex,item)=>{
      if(personIndex == index)$(item).removeClass('hide');
      else $(item).addClass('hide');
    });

    setTimeout(()=>runAnimation(index,1),0);
  } else if(parseInt($('.slider__inner').css('left')) > 0 && status == 1){
    $('.slider__inner').css('left', (parseInt($('.slider__inner').css('left')) - 45 ) + 'px') ;
    console.log($('.slider__inner').css('left'));
    setTimeout(()=>runAnimation(index,1),0);
  } else if(status == 1){
    isRunning = false;
  }
}

$("input[type=radio]").each((index, item)=>{
  $(item).change(()=>{
    if(!isRunning){
      setTimeout(()=>runAnimation(index,0),0);
      isRunning = true;
      idRunning = index;
    }else {
      $("input[type=radio]:nth-child("+(idRunning+1)+")").click();
    }

  });
});
