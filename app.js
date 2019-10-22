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

BusMall.roundCtr = 0;
BusMall.roundLimit = 25;

BusMall.all = [];

// console.log('cliq',BusMall.all);
BusMall.container = document.getElementById('container');
BusMall.leftImage = document.getElementById('left-busmall-image');
BusMall.centerImage = document.getElementById('center-busmall-image');
BusMall.rightImage = document.getElementById('right-busmall-image');



BusMall.leftTitle = document.getElementById('left-busmall-title');
BusMall.centerTitle = document.getElementById('center-busmall-title');
BusMall.rightTitle = document.getElementById('right-busmall-title');

BusMall.leftObject = null;
BusMall.centerObject = null;
BusMall.rightObject = null;


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




//   Create an algorithm that will randomly generate three unique product images from 
//   the images directory and display them side-by-side-by-side in the browser window.
function renderNewBusMall() {

  // ensure that previous goats not shown on next round
  var forbidden = [BusMall.leftObject, BusMall.centerObject, BusMall.rightObject];

  do {

    BusMall.leftObject = getRandomBusMall();

  } while (forbidden.includes(BusMall.leftObject))

  // add left  to forbidden list so we don't double up
  forbidden.push(BusMall.leftObject);

  do {

    BusMall.rightObject = getRandomBusMall();

  } while (forbidden.includes(BusMall.rightObject));

  do {

    BusMall.centerObject = getRandomBusMall();

  } while (forbidden.includes(BusMall.centerObject));



  BusMall.leftObject.shownCtr++;
  BusMall.rightObject.shownCtr++;
  BusMall.centerObject.shownCtr++;

  var leftImageElement = BusMall.leftImage;
  // console.log('leftImageElement',leftImageElement);
  var rightImageElement = BusMall.rightImage;
  var centerImageElement = BusMall.centerImage;

  leftImageElement.setAttribute('src', BusMall.leftObject.src);
  leftImageElement.setAttribute('alt', BusMall.leftObject.title);
  centerImageElement.setAttribute('src', BusMall.centerObject.src);
  centerImageElement.setAttribute('alt', BusMall.centerObject.title);
  rightImageElement.setAttribute('src', BusMall.rightObject.src);
  rightImageElement.setAttribute('alt', BusMall.rightObject.title);

  BusMall.leftTitle.textContent = BusMall.leftObject.title;
  BusMall.centerTitle.textContent = BusMall.centerObject.title;
  BusMall.rightTitle.textContent = BusMall.rightObject.title;

}

function getRandomBusMall() {
  var index = Math.floor(Math.random() * BusMall.all.length);

  return BusMall.all[index];
}



// function randomInRange(min, max) {
//   var range = max - min + 1;
//   var rand = Math.floor(Math.random() * range) + min
//   return rand;
// }




function updateTotals() {

  var tableBody = document.getElementById('report');

  tableBody.innerHTML = '';

  for (var i = 0; i < BusMall.all.length; i++) {
    var mall = BusMall.all[i];
    var row = addElement('tr', tableBody);
    addElement('td', row, mall.title);
    addElement('td', row, '' + mall.clickCtr);
    addElement('td', row, '' + mall.shownCtr);

  
  }
}

function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
}
// console.log('busMallbefor.roundCtr++',BusMall.roundCtr);

function clickHandler(event) {

  var clickedId = event.target.id;
  var busMallClicked;

  if (clickedId === 'left-busmall-image') {
    busMallClicked = BusMall.leftObject;
    var busMallNew=BusMall.leftObject;

  } else if (clickedId === 'right-busmall-image') {
    busMallClicked = BusMall.rightObject;
    var busMallNew=BusMall.rightObject;

  } else if (clickedId === 'center-busmall-image') {
    busMallClicked = BusMall.centerObject;
    var busMallNew=BusMall.centerObject;
  }
  else {
    alert(' what was clicked on?', clickedId);
  }

  if (busMallClicked) {
    busMallClicked.clickCtr++;
    
// console.log('cli',BusMall.clickCtr);
    BusMall.roundCtr++;

    updateTotals();
    // console.log('busMallClicked.roundCtr++',BusMall.roundCtr)

    if (BusMall.roundCtr === BusMall.roundLimit) {

      alert ('No more clicking ');
      typeChart();


      BusMall.container.removeEventListener('click', clickHandler);

    } else {

      renderNewBusMall();
    }
  }
}





////////////chart/////////////

var tittleArray = [];
var clickedArray =[];
var shownArray =[];
function typeChart(){

  for(var i = 0; i < BusMall.all.length; i++){
    var titlei =BusMall.all[i].title;
    tittleArray.push(titlei);

    var clickedi = BusMall.all[i].clickCtr;
    clickedArray.push(clickedi);

    var showni = BusMall.all[i].shownCtr;
    shownArray.push(showni);

  }
// console.log('clickedi',clickedi);

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: tittleArray,
      datasets: [{
        label: 'Bus Mall Products click',
        backgroundColor: '#FFC14F',
        borderColor: '#E89D48',
        data: clickedArray
      },{
        label: 'Bus Mall Products shown',
        backgroundColor: '#E86E48',
        borderColor: '#FF9A5C',
        data: shownArray
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


BusMall.container.addEventListener('click', clickHandler);


updateTotals();

renderNewBusMall();


typeChart();

