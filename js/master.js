//////////////////// START SETTING BOX 
// check if ther's is localstorage option
let mainColor = window.localStorage.getItem('color_option');
if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color' , mainColor);
    // check for active class
    document.querySelectorAll('.colors-list li').forEach(li =>{
        li.classList.remove('active');
    // add active class active on element with data color === localstorage itme
    if(li.dataset.color === mainColor){
        // add active class
        li.classList.add("active");
    }
    });
};
// bacground bacground option
let bacgroundOption = true;
// variable to control intervel
let BackgroundIntervel;
// click on toggle seting gear
document.querySelector(".spin-font i").onclick = function () {
    // add fa-spin class to font for do sping
    this.classList.toggle("fa-spin");
    // add open class to setting box
    document.querySelector(".settings-box").classList.toggle("open")
};
// //  SWITCH COLOR
    // select all my list item 
const colorsli = document.querySelectorAll(".colors-list li");
    // loop all list item
colorsli.forEach(li => {
    // click on evrey list item
    li.addEventListener('click', (e) => {
        // set color on root (cange color by stting)
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        // set color in local storage
        window.localStorage.setItem('color_option' , e.target.dataset.color);
        // handle active class
        handleActive(colorsli,'active');
    });
});
// // CHANGE BACGROUND
    // select all my list item 
    const chosseBtns = document.querySelectorAll(".random-background span");
    // loop all list spans
    chosseBtns.forEach(span => {
    // click on evrey spans item
    handleActive(chosseBtns,'active')
    span.addEventListener('click', (e) => {
        // function to hadle active class
        if(e.target.dataset.background === 'yes'){
            bacgroundOption=true;
            randomizeImgs();
        }else{
            bacgroundOption=false;
            clearInterval(BackgroundIntervel);
        }
    });
});
// reset button
document.querySelector('.reset-options').onclick=function(){
    window.localStorage.removeItem('color_option');
    window.location.reload();
}
///////////////// END SETTING BOX

///////////////// START LADING PAGE
// select landing page element
let landingPage = document.querySelector('.landing-page');
// get array of imgs
let arrOfBgImg = ['img/icon_01.jpg', 'img/icon_02.jpg', 'img/icon_03.jpg', 'img/icon_04.jpg'];
// change bground image
// function to randomize imgs
function randomizeImgs(){
    if(bacgroundOption === true){
        BackgroundIntervel=setInterval(() => {
            // create randpm number
            let randomNumber = Math.floor(Math.random() * arrOfBgImg.length);
            landingPage.style.backgroundImage = 'url("' + arrOfBgImg[randomNumber] + '")';
        }, 3000);
    }
}
///////////////// END LADING PAGE

///////////////// START OUR statistecs
// statistecs selector
let ourstatistecs=document.querySelector('.statistecs');
window.onscroll=function(){
    //statistecs offset top
    let statistecsOfsetTop=ourstatistecs.offsetTop; // all what we hav in top of our statistecs
    // outer heigth
    let statistecsOurHeigth=ourstatistecs.offsetHeigth;
    // window heigth
    let windowHeigth=this.innerHeight;
    // window scroll top
    let windowScroolTop=this.pageYOffset;

    if(windowScroolTop > statistecsOfsetTop - windowHeigth + 130){
        let allstatistecs=document.querySelectorAll('.statistecs-box .statistecs-progress span');
        allstatistecs.forEach(skill => {
            skill.style.width=skill.dataset.progress;
        })
    }
}
///////////////// END OUR statistecs

///////////////// START GALLERY SECTION
// create popup with ithe image
let ourGallery=document.querySelectorAll('.gallarey .images-box img');
// loop for all my images
ourGallery.forEach(function(img){
    img.addEventListener('click' , (e)=>{
        // create overlay elements
        let overlay=document.createElement('div');
        // add class to overlay div
        overlay.className='popup-overlay';
        // append the overlay to body
        document.body.appendChild(overlay);
        // create popup box
        let popupBox=document.createElement('div');
        // add class to popupb
        popupBox.className='popup-box';
        // check if images has alt and if it has it add heading title to imgae
        if(img.alt !== null){
            // create heading
            let imgHeading=document.createElement('h3');
            // add class to h3
            imgHeading.className='img-heading'
            // crete text for heading
            let imgText=document.createTextNode(img.alt);
            // append Text to imgHeading
            imgHeading.appendChild(imgText);
            // append imgheading to popupbox
            popupBox.appendChild(imgHeading);
        }
        // create the image
        let popupImg=document.createElement('img');
        // set image source
        popupImg.src=img.src;
        // add image to popup box
        popupBox.appendChild(popupImg);
        // add popup box to body
        document.body.appendChild(popupBox);
        // create the close button
        let closebutton=document.createElement('span');
        // add class to span close
        closebutton.className='close-button';
        // create text of close spane
        let closeButtonText=document.createTextNode('X');
        // add text to close span
        closebutton.appendChild(closeButtonText);
        // add close span to popup box
        popupBox.appendChild(closebutton);
    });
});
// close popup
document.addEventListener('click' , (e)=>{
    if(e.target.className == 'close-button'){
        // remouve the current popup
        e.target.parentElement.remove();
        // remouve overlay
        document.querySelector('.popup-overlay').remove()
    }
})
///////////////// END GALLERY SECTION
///////////////// START OUR BULLETS 
// select all bullets
const Allbollets=document.querySelectorAll('.my-bolets .bolet');
scrolling(Allbollets);
// select all links in my nav bar and do my scrolling
const links=document.querySelectorAll('nav .nav-link');
scrolling(links)
// show bollets
// document.querySelectorAll('setting-content')
let myOption=document.querySelectorAll('.setting-content .option-box .show-bullets span');
myOption.forEach(option =>{
    option.addEventListener('click',(e)=>{
        // handle active class
        handleActive(myOption , 'active')
        if(e.target.dataset.bullets === 'yes'){
            document.querySelector('.my-bolets').style.display='block';
        }else
        {
            document.querySelector('.my-bolets').style.display='none';
        }
    })
})
///////////////// END OUR BULLETS 
// @@@@@@@@@@@@@@  START ALL MY FUNCTIONS 
//###### start function to do scrolling  in our page
function scrolling(elements){
    elements.forEach(element =>{
        element.addEventListener('click',(e)=>{
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
    })
}
//###### end function to do scrolling  in our page

// start  function to handle active class
function handleActive(elements , nameOfClass){
    elements.forEach((ele) =>{
        ele.addEventListener('click',e=>{
            e.target.parentElement.querySelectorAll("."+nameOfClass).forEach(el =>{
                el.classList.remove(nameOfClass)
            })
            e.target.classList.add(nameOfClass)
        })
    })
}
// end  function to handle active class
// @@@@@@@@@@@@@@  END ALL MY FUNCTIONS 
