const FUNCTION_LIST = ['left','opacity', 'after'];

var animationSheet = [].slice.call(document.styleSheets).filter( value => value.ownerNode.id === 'Animations' )[0];
var animationsRunning = [];
var animatedElementID = 0;

var queueAnimationsCleaning = function(self){
  let time = self.animation.reduce((anterior, atual, index)=>{return ((index==1)?(anterior.duration+atual.duration):(anterior+atual.duration))});

  if (typeof time == 'object' )
    time = time.duration;

  setTimeout( ()=>{
    let i = 0;

    while ( i != -1 ){
      if(i > (animationSheet.cssRules.length-1)){
        i = -1;
      }else {
        if(animationSheet.cssRules[i].name.split('-')[2] == self.elementID){
          animationSheet.deleteRule(i);
        }
        else
          i++;
      }
    }

    // console.log(animationSheet.cssRules);

    self.style.animation = '';
    self.animation = null;
    animationsRunning.splice(animationsRunning.indexOf(self),1);
  }, time);

}

var select = selector => document.querySelector(selector);

var animate = function(){

  if(this instanceof HTMLElement && this.animation && !animationsRunning.includes(this) ){

    let handleAnimation = function(animation, index){
      this.style.animation = `${animation.duration/1000}s ${animation.function} ${animation.delay/1000}s 1 ${animation.name}-${index}-${this.elementID}`;
      this.style[animation.name] = animation.values[1];
    }, time = 0;

    if(!this.elementID) this.elementID = animatedElementID++;

    animationsRunning.push(this);

    this.style.position = "relative";

    this.animation.forEach ( (animation, index)=> {

      switch (animation.name) {

        case 'opacity':
        case 'left':
          animationSheet.insertRule(
            `
            @keyframes ${animation.name}-${index}-${this.elementID} {
              0% {
                ${animation.name}: ${animation.values[0]};
              }

              100% {
                ${animation.name}: ${animation.values[1]};
              }
            }
            `);

          if(index==0)
            handleAnimation.call(this, animation, index);
          else if (index > 0 ) {
            time = this.animation.reduce( (anterior,atual,ind)=>{
              if(ind == 1 && index == 1)
                return anterior.duration;
              else if(ind == 1 && index > 1 && ind < index)
                return anterior.duration + atual.duration;
              else if(ind > 1 && index > 1 && ind < index)
                return (anterior + atual.duration);
              else if (index <= ind)
                return anterior;
            });

            setTimeout( ()=>handleAnimation.call(this, animation, index), time);
          }
        break;

        case 'after':
          let time = this.animation.reduce( (anterior,atual,ind)=>{
            if(ind == 1 && index == 1)
              return anterior.duration;
            else if(ind == 1 && index > 1 && ind < index)
              return anterior.duration + atual.duration;
            else if(ind > 1 && index > 1 && ind < index)
              return (anterior + atual.duration);
            else if (index <= ind)
              return anterior;
          });

          setTimeout( ()=>animation.values[0](), time);
        break;

        case 'custom':
          let startConfig =
          animationSheet.insertRule(
            `
            @keyframes ${animation.name}-${index}-${this.elementID} {
              0% {
                ${animation.name}: ${animation.values[0]};
              }

              100% {
                ${animation.name}: ${animation.values[1]};
              }
            }
          `);

        break;
      }

    });

    queueAnimationsCleaning(this);

    return this;
  }
}

HTMLElement.prototype.animate = animate;

FUNCTION_LIST.forEach( (item,index)=>{
  HTMLElement.prototype[item] = function(time, v1, v2, delay, func){
    if(this instanceof HTMLElement){

      if(this.animation){

        this.animation.push({
          name: item,
          duration: time,
          delay: delay,
          function: func,
          values: [v1,v2]
        });

      }else {

        this.animation = [{
          name: item,
          duration: time,
          delay: delay,
          function: func,
          values: [v1,v2]
        }];

      }

      return this;
    }
  };
});
