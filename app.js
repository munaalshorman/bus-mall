'use strict';
//create an array

//Create a constructor function that creates an object associated with each product, 
// and has the following properties:Name of the product/File path of image

function BusMall(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    BusMall.all.push(this);
}
BusMall.all = [];
new BusMall('bag', 'img/bag.jpg');
new BusMall('banana', 'img/banana.jpg');
new BusMall('bathroom', 'img/bathroom.jpg');
new BusMall('boots', 'img/boots.jpg');
new BusMall('breakfast', 'img/breakfast.jpg');
new BusMall('bubblegum', 'img/bubblegum.jpg');
new BusMall('chair', 'img/chair.jpg');
new BusMall('cthulhu', 'img/cthulhu.jpg');
new BusMall('dog-duck', 'img/dog-duck.jpg');
new BusMall('dragon', 'img/dragon.jpg');
new BusMall('pen', 'img/pen.jpg');
new BusMall('pet-sweep', 'img/pet-sweep.jpg');
new BusMall('scissors', 'img/scissors.jpg');
new BusMall('shark', 'img/shark.jpg');
new BusMall('sweep', 'img/sweep.png');
new BusMall('tauntaun', 'img/tauntaun.jpg');
new BusMall('unicorn', 'img/unicorn.jpg');
new BusMall('usb', 'img/usb.gif');
new BusMall('water-can', 'img/water-can.jpg');
new BusMall('wine-glass', 'img/wine-glass.jpg');

BusMall.leftObject = null;
BusMall.centerObject = null;
BusMall.rightObject = null;

BusMall.roundCtr = 0;
BusMall.roundLimit =25;
//   Create an algorithm that will randomly generate three unique product images from 
//   the images directory and display them side-by-side-by-side in the browser window.

function getRandomBusMall() {
    var index = Math.floor(Math.random() * BusMall.all.length);
    return BusMall.all[index];
}

BusMall.container = document.getElementById('container');
BusMall.leftImage = document.getElementById('left-busmall-image');
BusMall.rightImage = document.getElementById('right-busmall-image');
BusMall.centerImage = document.getElementById('center-busmall-image');


BusMall.leftTitle = document.getElementById('left-busmall-title');
BusMall.rightTitle = document.getElementById('right-busmall-title');
BusMall.centerTitle= document.getElementById('ceneter-busmall-title');

    
function renderNewBusMall() {

    // ensure that previous goats not shown on next round
    var forbidden = [BusMall.leftObject,BusMall.centerObject,BusMall.rightObject];
  
    do {
  
      BusMall.leftObject = getRandomBusMall();
  
    } while (forbidden.includes(BusMall.leftObject))
  
    // add left  to forbidden list so we don't double up
    forbidden.push(BusMall.leftObject);
  
    do {
  
     BusMall.rightObject = getRandomBusMall();
  
    } while(forbidden.includes(BusMall.rightObject));

    do {
  
        BusMall.centerObject = getRandomBusMall();
     
       } while(forbidden.includes(BusMall.centerObject));
  
    // WARNING: if you got really unlucky the above code would result in infinite loop
    // Can you think of safer ways?
    
   BusMall.leftObject.shownCtr++;
   BusMall.rightObject.shownCtr++;
   BusMall.centerObject.shownCtr++;
  
    var leftImageElement = BusMall.leftImage;
    var rightImageElement = BusMall.rightImage;
    var centerImageElement=BusMall.centerImage;
  
    leftImageElement.setAttribute('src', BusMall.leftObject.src);
    leftImageElement.setAttribute('alt', BusMall.leftObject.title);
    centerImageElement.setAttribute('src', BusMall.centerObject.src);
    centerImageElement.setAttribute('alt', BusMall.centerObject.title);
    rightImageElement.setAttribute('src', BusMall.rightObject.src);
    rightImageElement.setAttribute('alt', BusMall.rightObject.title);
    
    BusMall.leftTitle.textContent = BusMall.leftObject.title;
    BusMall.centertTitle.textContent = BusMall.centerObject.title;
    BusMall.rightTitle.textContent = BusMall.rightObject.title;

  }
  
  
  // not using this, just showing the better way vs. ceil
  function randomInRange(min, max) {
    var range = max - min + 1; // add one since we will be flooring
    var rand = Math.floor(Math.random() * range) + min
    return rand;
  }

function updateTotals() {

    var tableBody = document.getElementById('report');
  
    // Remove all children so that content doesn't get duplicated
    // easiest way is to set innerHTML
    // WARNING: will not remove event listeners, so be careful with that
    tableBody.innerHTML = '';
  
    for (var i = 0; i < BusMall.all.length; i++) {
      var mall = BusMall.all[i];
      var row = addElement('tr', tableBody);
      addElement('td', row, mall.title);
    //   addElement('td', row, '' + mall.clickCtr);
      addElement('td', row, '' + mall.shownCtr);
    }
  }

  function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if(text) {
      element.textContent = text;
    }
    return element;
  }
  
  
function clickHandler(event) {

    var clickedId = event.target.id;
    var busMallClicked;

    if (clickedId === 'left-busmall-image') {
        busMallClicked = BusMall.leftObject;
        console.log('Um, what was clicked on???', clickedId);
    } else if (clickedId === 'right-busmall-image') {
        busMallClicked = BusMall.rightObject;
        console.log('Um, what was clicked on???', clickedId);
    } else if (clickedId === 'center-busmall-image') {
        busMallClicked = BusMall.centerObject;
    }
    else {
        console.log('Um, what was clicked on???', clickedId);
    }

    if (busMallClicked) {
        BusMall.clickCtr++;
        BusMall.roundCtr++;

        updateTotals();

        if (BusMall.roundCtr === BusMall.roundLimit) {

            alert('No more clicking for you!');

            BusMall.container.removeEventListener('click', clickHandler);

        } else {

            renderNewBusMall();
        }
    }
}

// Notice that we're attaching event listener to the container, 
// but event.target will allow us to which child element was actually clicked
BusMall.container.addEventListener('click', clickHandler);


updateTotals();

renderNewBusMall();