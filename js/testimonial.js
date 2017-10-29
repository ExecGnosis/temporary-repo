var activeTestimonial = 1,
    isRunning = false;

$("input[type=radio]").each((index, item)=>{
  $(item).change(()=>{

    if((index+1)>activeTestimonial && !isRunning){
      isRunning = true;
      select(`#person${activeTestimonial}`)
        .left(250, '0px', '-100vw', 0, 'ease-in')
        .after( 0, ()=>{

          $(`#person${activeTestimonial}`).toggleClass('hide');
          $(`#person${index+1}`).toggleClass('hide');

          select(`#person${index+1}`)
            .left(250, '100vw', '0px', 0, 'ease-out')
            .after( 0, ()=>{
              activeTestimonial = index+1;
              isRunning = false;
            })
          .animate();

        })
      .animate();
    }else if(!isRunning){
      isRunning = true;
      select(`#person${activeTestimonial}`)
        .left(250, '0px', '100vw', 0, 'ease-in')
        .after( 0, ()=>{

          $(`#person${activeTestimonial}`).toggleClass('hide');
          $(`#person${index+1}`).toggleClass('hide');

          select(`#person${index+1}`)
            .left(250, '-100vw', '0px', 0, 'ease-out')
            .after( 0, ()=>{
              activeTestimonial = index+1;
              isRunning = false;
            })
          .animate();

        })
      .animate();
    }
  });
});
