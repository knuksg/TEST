var Slider = function(id, _web, _tab, _mobile, spacing){
  var containerWidth = 0;
  var sliderItemWidth = 0;
  var totalCount = 0;
  var spacing = spacing || 10;
  var display = _web;
  var left = 0;
  var interval;

  var DOM = {
    container: function(id){
      var dom = document.querySelector('#'+id);
      dom.className = 's-container';
      dom.style.position = 'relative';
      dom.style.overflow = 'hidden';
      return dom;
    },
    slider: function(container){
      totalCount = container.children.length;

      var dom = document.createElement('div');
      dom.className = 'slider'
      dom.style.position = 'relative';
      dom.style.overflow = 'hidden';
      dom.style.height = '100%';
      dom.style.left = 0;
      dom.style.transition = 'left .5s';
      return dom;
    }
  }

  // DOM 만들기
  var container = DOM.container(id);
  var slider = DOM.slider(container);
  var temp = container.innerHTML;
  container.innerHTML = '';
  slider.innerHTML = temp;
  container.appendChild(slider);
  var items = document.querySelector('#'+ id + ' .slider').children;
  for(var i=0; i<items.length; i++){
    items[i].style.float = 'left';
    items[i].style.height = '100%';
    items[i].style.width = (sliderItemWidth-spacing)+ 'px';
    items[i].style['margin-right'] = spacing+'px'; // 간격
  }

  // 화면 사이즈 수정시 발생하는 이벤트
  function resize(){
    left = 0;
    document.querySelector('#'+ id + ' .slider').style.left = left + 'px';

    var innerWidth = window.innerWidth;
    if(innerWidth >= 1000){
      setDisplayCount(_web);
    }else if(innerWidth < 1000 && innerWidth >= 768) {
      setDisplayCount(_tab);
    }else if (innerWidth < 768) {
      setDisplayCount(_mobile);
    }
    
    if(display === 1){
      spacing = 0;
      var items = document.querySelector('#'+ id + ' .slider').children;
      for(var i=0; i<items.length; i++){
        items[i].style.width = sliderItemWidth + 'px';
        items[i].style['margin-right'] = 0 + 'px'; // 간격
      }
    }
  }

  // 디스플레이 갯수 설정 함수
  function setDisplayCount(count) {
    display = count;

    containerWidth = container.offsetWidth + spacing;
    sliderItemWidth = containerWidth / display;

    document.querySelector('#'+ id + ' .slider').style.width = totalCount * sliderItemWidth + spacing * totalCount + 'px';
    var items = document.querySelector('#'+ id + ' .slider').children;
    for(var i=0; i<items.length; i++){
      items[i].style.width = (sliderItemWidth-spacing)+ 'px';
    }
  }

  // 반응형 디스플레이 갯수 조절
  var isResponsive = _tab != undefined && _mobile != undefined;
  if(isResponsive){
    window.onresize = resize;
  }
  resize();


  return {
    setDisplayCount: setDisplayCount,
    move: function(index){
      left = (-1) * sliderItemWidth * index;
      document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
    },
    prev: function(){
      left += sliderItemWidth;
      var limit = 0;
      if(left > limit){
        left = limit;
      }
      document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
    },
    next: function(){
      left -= sliderItemWidth;
      var limit = (-1) * sliderItemWidth * (totalCount - display);
      if(left < limit){
        left = limit;
      }
      document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
    },
    auto: function(){
      clearInterval(interval);
      interval = setInterval(function(){
        left -= sliderItemWidth;
        var limit = (-1) * sliderItemWidth * (totalCount - display);
        if(left < limit){
          left = 0;
        }
        document.querySelector('#'+ id + ' .slider').style.left = left + 'px';
      }, 2000)
    },
    stop: function(){
      clearInterval(interval);
    }
  }
}

var slider = new Slider('slide', 0, 1, 1, 20);
const slide = document.querySelector("#slide")
slide.addEventListener('touchstart', handleTouchStart, false);        
slide.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {

const characterImgMobile = document.querySelectorAll(".character_img_mobile")
const explainCardMobile = document.querySelectorAll(".explain_card_mobile") 
for (let i = 0; i < 3; i++) {

if(evt.target === characterImgMobile[i]){
       characterImgMobile[i].style.zIndex = 11; 
       explainCardMobile[i].style.zIndex = 10;
}else if(evt.target === explainCardMobile[i]){
       characterImgMobile[i].style.zIndex = 10; 
       explainCardMobile[i].style.zIndex = 11;
}
}


  console.log(evt.target);
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            slider.next()
        } else {
            /* left swipe */
            slider.prev()
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};