
let images = [{
    url: "./images/slide1.jpg",
    title: "Слайд1"
  }, {
    url: "./images/slide2.jpg",
    title: "Слайд2"
  }, {
    url: "./images/slide3.jpg",
    title: "Слайд3"
  },];


function initSlider(options) {
    if (!images || !images.length) return;
    
    options = options || {
      titles: false,
      dots: true,
      autoplay: false
    };
    
    let sliderImages = document.querySelector(".slider-images");    
    let sliderDots = document.querySelector(".slider-dots");
    
    initImages();
    
    if (options.dots) {
      initDots();
    }
    
    if (options.titles) {
      initTitles();
    }
    
    if (options.autoplay) {
      initAutoplay();
    }
    
    function initImages() {
      images.forEach((image, index) => {
        let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
        sliderImages.innerHTML += imageDiv;
      });
    }
     
    
    function initDots() {
      images.forEach((image, index) => {
        let dot = `<div class="slider-dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
      });
      sliderDots.querySelectorAll(".slider-dots-item").forEach(dot => {
        dot.addEventListener("click", function() {
          moveSlider(this.dataset.index);
        })
      })
    }
    
    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");
      if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
      if (options.titles) changeTitle(num);
    }
    
    function initTitles() {
      let titleDiv = `<div class="slider-images-title">${images[0].title}</div>`;
      sliderImages.innerHTML += cropTitle(titleDiv, 50);
    }
    
    function changeTitle(num) {
      if (!images[num].title) return;
      let sliderTitle = sliderImages.querySelector(".slider-images-title");
      sliderTitle.innerText = cropTitle(images[num].title, 50);
    }
    
    function cropTitle(title, size) {
      if (title.length <= size) {
        return title;
      } else {
        return title.substr(0, size) + "...";
      }
    }
    
    function initAutoplay() {
      setInterval(() => {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }, options.autoplayInterval);
    }
  }
  
  let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: false,
    autoplayInterval: 5000
  };
  

document.addEventListener("DOMContentLoaded", function() {  
    initSlider(sliderOptions);
  });
  