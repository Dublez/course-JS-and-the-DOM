/**********************Testing Performance */
// Main Function
performance.now();

// A piece of code
start = performance.now();
for(var i = 0; i <100; i++){
    for(var j = 0; j <100;j++){
    }
};
end = performance.now();
console.log(end-start);

//Version 1 - Slow version
start = performance.now();
for (let i = 1; i <= 200; i++) {
  const newElement = document.createElement('p');
  newElement.innerText = 'This is paragraph number ' + i;
  document.body.appendChild(newElement);
}
end = performance.now();
console.log(end-start + " milliseconds");

//Version 2 - Faster version
start = performance.now();
const myCustomDiv = document.createElement('div');
for (let i = 1; i <= 200; i++) {
  const newElement = document.createElement('p');
  newElement.innerText = 'This is paragraph number ' + i;
  myCustomDiv.appendChild(newElement);
}
document.body.appendChild(myCustomDiv);
end = performance.now();
console.log(end-start + " milliseconds");

//Version 3 - Standard approach using DocumentFragment
const myDocFrag = document.createDocumentFragment();
for (let i = 0; i < 200; i++) {
    const newElement = document.createElement('p');
    newElement.innerText = 'This is paragraph number ' + i;
    fragment.appendChild(newElement);
}
document.body.appendChild(fragment);

//Version 4 - Hide, change all, repaint
/*
<div id="comments">
  <div class="comment"> <!-- some content --> </div>
  <div class="comment"> <!-- some content --> </div>
  <div class="comment"> <!-- some content --> </div>
</div>
*/
// hide #comments
document.getElementById("comments").style.display = "none";
// delete spam comments
// show #comments
document.getElementById("comments").style.display = "block";

//Set timeout
setTimeout(function sayHi() {
    console.log('Howdy');
}, 1000);

//Running code asynchronously
let count = 1
function generateParagraphs() {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= 500; i++) {
        const newElement = document.createElement('p');
        newElement.textContent = 'This is paragraph number ' + count;
        count = count + 1;
        fragment.appendChild(newElement);
    }
    document.body.appendChild(fragment);
    if (count < 20000) {
        setTimeout(generateParagraphs, 0);  //This is the main thing
    }
}
generateParagraphs();

/**********************Events */
//JS Events
Chrome: monitorEvents(document);
Chrome: unmonitorEvents(document);
monitorEvents(document.body, 'click');
Chrome: getEventListeners(document);
const mainHeading = document.querySelector('.text-center');

//Adding and removing Event Listeners
//Example 1
mainHeading.addEventListener('click', function(){
    console.log('The heading was clicked');
});

//Example 2
document.addEventListener('click', function(){
    const mainHeading = document.getElementsByTagName('h1');
    mainHeading[0].setAttribute('style', 'background-color: red; font-size: 2em');
});

//Example 3
function myEventListeningFunction(){
    console.log('howdy');
}

document.addEventListener('click', myEventListeningFunction);
document.removeEventListener('click', myEventListeningFunction);

//Example 4
document.body.addEventListener('keypress', function(){
    console.log('removing first child');
    document.querySelector('#contain-all').firstElementChild.remove();
});

//Phases of event handling
/*
<html>
    <body>  --addEventListener('click', func(){...})    3
        <div>
            <p>     --addEventListener('click', func(){...}, true)  1
                <button>Dare to click me?</button>  --addEventListener('click', func(){...})    2
            </p>
        </div>
    </body>
</html>
*/

//Events
document.addEventListener('click', function(event){
    console.log('The document was clicked');
});

document.addEventListener('click', function(event){
    console.log(event);
});

//Prevent defaults
const links = document.querySelector('a');
const thirdLink = links[2];
thirdLink.addEventListener('click', function(event){
    event.preventDefault();
    console.log("Look, ma! We didn't navigate to a new page!");
});

//Refactoring event listeners
//Version 1 (original)
const myCustomDiv = document.createElement('div');
for (let i = 1; i <= 200; i++) {
    const newElement = document.createElement('p');
    newElement.textContent = 'This is paragraph number ' + i;
    newElement.addEventListener('click', function respondToTheClick(evt) {
        console.log('A paragraph was clicked.');
    });
    myCustomDiv.appendChild(newElement);
}
document.body.appendChild(myCustomDiv);

//Version 2 (refactored)
const myCustomDiv = document.createElement('div');
function respondToTheClick() {
    console.log('A paragraph was clicked.');
}
for (let i = 1; i <= 200; i++) {
    const newElement = document.createElement('p');
    newElement.textContent = 'This is paragraph number ' + i;
    myCustomDiv.appendChild(newElement);
}
myCustomDiv.addEventListener('click', respondToTheClick);
document.body.appendChild(myCustomDiv);

//Version 3 - getting information about target element from an event entity
const myCustomDiv = document.createElement('div');
function respondToTheClick(evt) {
    console.log('A paragraph was clicked: ' + evt.target.textContent);
}
for (let i = 1; i <= 200; i++) {
    const newElement = document.createElement('p');
    newElement.textContent = 'This is paragraph number ' + i;

    myCustomDiv.appendChild(newElement);
}
document.body.appendChild(myCustomDiv);
myCustomDiv.addEventListener('click', respondToTheClick); 

//Checking the Node type

/*
<article id = "content">
    <p>Brownie lollipop <span>carrot cake</span> gummies lemon drops sweet roll dessert tiramisu. Pudding muffin <span>cotton candy</span> croissant fruitcake tootsie roll. Jelly jujubes brownie. Marshmallow jujubes topping sugar plum jelly jujubes chocolate.</p>
    <p>Tart bonbon souffle gummies bear. Donut marshmellow <span>gingerbread cupcake</span> macaroon jujubes muffin. Souffle candy caramels tootsie roll powder sweet roll brownie <span>apple pie</span> gummies. Fruitcake danish chocolate tootsie roll macaroon.</p>
</article>
*/

//Version 1 - without check
document.querySelector('#content').addEventListener('click', function(evt){
    console.log('A span was clicked with text '+evt.target.textContent);
})

//Version 2 - filtering by target.nodeName
document.querySelector('#content').addEventListener('click', function(evt){
    if(evt.target.nodeName === 'SPAN'){
        console.log('A span was clicked with text ' + evt.target.textContent);
    }
})

//Listening for DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', function(){
    console.log('the DOM is ready to be interacted with');
})

//Moving script to the top of the page
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="/css/styles.css" />
    <script>
      document.addEventListener('DOMContentLoaded', function () {
          document.querySelector('footer').style.backgroundColor = 'purple';
      });
    </script>
*/

/***************************Event Loops */

/**************************JS DOM Manipulation */
document.getElementById('content');
document.getElementsByClassName('header');
document.getElementsByTagName('p');
document.querySelector('#header');
document.querySelector('.header');
document.querySelector('header');
document.querySelectorAll('.header');
document.querySelectorAll('header');
document.querySelectorAll('.articles p');
const nanodegreeCard = document.querySelector('.card');
const element1 = nanodegreeCard.innerHTML;
const element2 = nanodegreeCard.outerHTML;
const element3 = nanodegreeCard.textContent;
nanodegreeCard.textContent = "The <strong>Greatest</strong> Ice Cream Flavors"; //Returns all inner text of the element
nanodegreeCard.innerHTML = "The <strong>Greatest</strong> Ice Cream Flavors";
nanodegreeCard.innerText = "The Greatest Ice Cream Flavors";//Returns only text that is seen on the screen (and how it is seen, for example, capitalizes some text)

const listOfElements = document.getSelectorAll('h2');
for(let i = 0; i < listOfElements.length; i++){
    console.log('i is '+i);
    console.log(listOfElements[i]);
}

const newSpan = document.createElement('span');
newSpan.textContent = ', right now!';
const mainHeading = document.querySelector('h1');
mainHeading.appendChild(newSpan);

const myPara = document.createElement ('p');
const textOfParagraph = document.createTextNode('I am the text for the paragraph!');
myPara.appendChild(textOfParagraph);
document.body.appendChild(myPara);

//---------insertAdjacentHTML()
//Добавляем элемент
const mainHeading = document.querySelector('h1.white');
const htmlTextToAdd = '<h2>Skydiving is fun!</h2>';
mainHeading.insertAdjacentHTML('afterend',htmlTextToAdd);
/*
<!-- beforebegin -->
<p>
    <!-- afterbegin -->
    Existing text/HTML content
    <!-- beforeend -->
</p>
<!-- afterend -->
*/

//Удаляем элемент
parentElement = document.querySelector(".video__arkit--content");
let childElement = document.querySelector('h2');
parentElement.removeChild(childElement);

let firstChild = parentElement.firstElementChild;
//Option 1
const mainHeading = document.querySelector('h1');
mainHeading.parentElement.removeChild(mainHeading);
//Option 2
const mainHeading = document.querySelector('h1');
mainHeading.remove();

//Styling the page content using JS
//Option 1
const mainHeading = document.querySelector('h1');
mainHeading.style.color = 'red';
mainHeading.style.fontSize = '2em';
//Option 2
mainHeading.style.cssText = "color:blue; background-color: orange; font-size: 1em";
//Option 3
mainHeading.setAttribute('style','color: blue; background-color: orange; font-size: 1em');

//Setting attributes
mainHeading.setAttribute('id','h1-heading');

//Get next sibling
mainHeading.nextElementSibling.setAttribute('id','heading-sibling');

//Accessing element's classes
let parentNode = document.querySelector('#h1-heading').parentElement;
const stringOfClasses = parentNode.className;
const arrayOfClasses = stringOfClasses.split(' ');
parentNode.className = 'im-the-new-class';
const listOfClasses = parentNode.classList;

//Manipulating the classList
listOfClasses.add('new-class'); //Adds a new class to the list of classes
listOfClasses.remove('new-class');//Removes a class from the list of classes
listOfClasses.toggle('another-class-name');//Adds the class if it doesn't exist or removes it from the list if it does already exist
listOfClasses.contains('another-class-name');//Returns boolean based on if the class exists in the list or not

/*************************Java Script Basics*/
var greeting = "Hello";
console.log(greeting + " World!");

var name = "James";
console.log(name[0]);
console.log("The man whispered, \"please speak to me.\"");

Math.sqrt(-10); //NAN

var x;
console.log(x);//undefined

/*
The list of faulsy values
-the Boolean value false
-the null type
-the undefined type
-the number 0
-the empty string ""
-the odd value NaN 
*/

switch (option) {
    case 1:
      console.log("You selected option 1.");
      break;
    case 2:
      console.log("You selected option 2.");
      break;
    case 3:
      console.log("You selected option 3.");
      break;
}

var start = 0; // when to start
while (start < 10) { // when to stop
  console.log(start);
  start = start + 2; // how to get to the next item
}

for (var i = 0; i < 6; i = i + 1) {
    console.log("Printing out i = " + i);
}

function doubleGreeting(name, otherName) {
    console.log("Greetings " + name + ", hi " +otherName);
    // code to greet two people!
}

var a = 1;
function x() {
  var b = 2;
  function y() {
    var c = 3;
    function z() {
      var d = 4;
    }
    z();
  }
  y();
}
x();

sayHi("Julia");
function sayHi(name) {
  console.log(greeting + " " + name);
  var greeting = "Hello";
}
//undefined Julia

//functions expressions
var catSays = function(max) {
    var catMessage = "";
    for (var i = 0; i < max; i++) {
      catMessage += "meow ";
    }
    return catMessage;
};

// Function expression that assigns the function displayFavorite 
// to the variable favoriteMovie
var favoriteMovie = function displayFavorite(movieName) {
    console.log("My favorite movie is " + movieName);
  };
  
  // Function declaration that has two parameters: a function for displaying
  // a message, along with a name of a movie
  function movies(messageFunction, name) {
    messageFunction(name);
  }
  
  // Call the movies function, pass in the favoriteMovie function and name of movie
  movies(favoriteMovie, "Finding Nemo");

//-------------------
// function declaration that takes in two arguments: a function for displaying
// a message, along with a name of a movie
function movies(messageFunction, name) {
    messageFunction(name);
  }
  
// call the movies function, pass in the function and name of movie
  movies(function displayFavorite(movieName) {
    console.log("My favorite movie is " + movieName);
  }, "Finding Nemo");

//Arrays
var mixedData = ["abcd", 1, true, undefined, null, "all the things"];

//Push
var donuts = ["glazed", "chocolate frosted", "Boston creme", "glazed cruller", "cinnamon sugar", "sprinkled"];
donuts.push("powdered"); // pushes "powdered" onto the end of the `donuts` array

//Pop
var donuts = ["glazed", "chocolate frosted", "Boston creme", "glazed cruller", "cinnamon sugar", "sprinkled", "powdered"];
donuts.pop(); // pops "powdered" off the end of the `donuts` array
donuts.pop(); // pops "sprinkled" off the end of the `donuts` array
donuts.pop(); // pops "cinnamon sugar" off the end of the `donuts` array

//Splice
var donuts = ["glazed", "chocolate frosted", "Boston creme", "glazed cruller"];
donuts.splice(1, 1, "chocolate cruller", "creme de leche"); // removes "chocolate frosted" at index 1 and adds "chocolate cruller" and "creme de leche" starting at index 1

//ForEach
var donuts = ["jelly donut", "chocolate donut", "glazed donut"];

donuts.forEach(function(donut) {
  donut += " hole";
  donut = donut.toUpperCase();
  console.log(donut);
});

//Map
var donuts = ["jelly donut", "chocolate donut", "glazed donut"];

var improvedDonuts = donuts.map(function(donut) {
  donut += " hole";
  donut = donut.toUpperCase();
  return donut;
});

//Objects
var umbrella = {
    color: "pink",
    isOpen: true,
    open: function() {
        if (umbrella.isOpen === true) {
            return "The umbrella is already opened!";
        } else {
            umbrella.isOpen = true;
            return "Julia opens the umbrella!";
        }
    },
    close: function(){
        if(umbrella.isOpen === true){
            umbrella.isOpen = false;
            return "Julia clises the umbrella";
        } else{
            return "Umbrella is already closed!";
        }
    }
    // your code goes here
};

console.log(umbrella.open());
console.log(umbrella.close());

/******************************JS SYNTAX */
//Undefined
function getClothing(isCold) {
    if (isCold) {
      var freezing = 'Grab a jacket!';
    } else {
      var hot = 'It’s a shorts kind of day.';
      console.log(freezing);
    }
  }

//Reference error: Freezing is not defined
function getClothing(isCold) {
    if (isCold) {
      const freezing = 'Grab a jacket!';
    } else {
      const hot = 'It’s a shorts kind of day.';
      console.log(freezing);
    }
  }

//Template Literals
const myName = 'Nikita';
const greeting = `Hello, my name is ${myName}`;
console.log(greeting);

//Destructuring
const point = [10, 25, -34];
const [x, y, z] = point;
console.log(x, y, z);

let positions = ['Gabrielle', 'Jarrod', 'Kate', 'Fernando', 'Mike', 'Walter'];
let [first, second, third] = positions;

const gemstone = {
    type: 'quartz',
    color: 'rose',
    carat: 21.29
  };
const {type, color, carat} = gemstone;  
console.log(type, color, carat);

//Object literals
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type,
  color,
  carat,
  calculateWorth: function() {
    // will calculate worth of gemstone based on type, color, and carat
  }
};

//For loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}

//For in loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const index in digits) {
  console.log(digits[index]);
}

Array.prototype.decimalfy = function() {
    for (let i = 0; i < this.length; i++) {
      this[i] = this[i].toFixed(2);
    }
  };
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const index in digits) {
console.log(digits[index]);
}
/*
Prints:
0
1
2
3
4
5
6
7
8
9
function() {
 for (let i = 0; i < this.length; i++) {
  this[i] = this[i].toFixed(2);
 }
}
*/

//For of loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
  console.log(digit);
}

//Spread operator
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);

const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = [fruits, vegetables];
console.log(produce);
//Prints: [Array[3], Array[3]]

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = [...fruits, ...vegetables];
console.log(produce);

//Prints: [ 'apples', 'bananas', 'pears', 'corn', 'potatoes', 'carrots' ]

//Rest parameter
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
//Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]