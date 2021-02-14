const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <div class="card">
              <div class="card-body">
              <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">
              </div>
              <div class="card-footer">
              <span class="d-flex detail">
              <small><i class="fa fa-download"> </i> ${image.downloads}</small>
              <small><i class="fa fa-thumbs-up"> </i> ${image.likes}</small>
              <small><i class="fa fa-comment"> </i> ${image.comments}</small>
            
          </span> 
             <div class="text-center justify-content-center">
             <a class="btn btn-success" href="${image.largeImageURL}" target="_blank" class="button">View</a>
             </div>
              </div>
    </div>
    `;
    gallery.appendChild(div)
  
  })
  loaderSpinner();
}

const getImages = (query) => {
  loaderSpinner()
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)

    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
  // element.classList.remove('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);

  } else {
  //  element.classList.remove('added');

  }
}



/// there i use to a popup
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
      
    alert('you can not select items');
        // document.getElementById('create-slider').addEventListener('click', function(){
        //   document.getElementById('fabShow').style.display = "block"
        // });
    
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  let duration = document.getElementById('doration').value || 1000;
        if(duration < 0){
          duration = 1000;
          sliders.forEach((slide) => {
            let item = document.createElement("div");
            item.className = "slider-item";
            item.innerHTML = `
              <img class = "w-100" src="${slide}">`;
              sliderContainer.appendChild(item);
          });
          changeSlide(0);
          timer = setInterval(
            function(){
              slideIndex++;
              changeSlide(slideIndex);
            }, duration); 
        }else{
            sliders.forEach((slide) => {
              let item =document.createElement("div");
              item.className = "slider-item";
              item.innerHTML = `<img class="w-100" src="${slide}">`
              sliderContainer.appendChild(item);
            });
            changeSlide(0);
            timer = setInterval(function() {
              slideIndex++;
              changeSlide(slideIndex);
            }, duration);
        }
  // sliders.forEach(slide => {
  //   let item = document.createElement('div')
  //   item.className = "slider-item";
  //   item.innerHTML = `<img class="w-100"
  //   src="${slide}"
  //   alt="">`;
  //   sliderContainer.appendChild(item)
  // })
  // changeSlide(0)
  // timer = setInterval(function () {
  //   slideIndex++;
  //   changeSlide(slideIndex);
  // }, duration);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 1) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 1;
})

sliderBtn.addEventListener('click', function () {
  createSlider();
});

////////// keybord controls

document.getElementById("search")
.addEventListener("keypress", function(event){
  // event.preventDefault();
  console.log('keycode', event.key, event.keyCode);
  if(event.key == 'Enter')
  document.getElementById("search-btn").click();
});





const loaderSpinner = () => {
  const spinner = document.getElementById('loader');
   
   spinner.classList.toggle('d-none');
 

}
