/*
API Key: Vlb8ghCOyURWJlLKsnh82oj1tgWNDDY1

SAMPLE API CALLS W/ DESCRIPTORS

#1
Paramaters:
endpoint = search;
q = obama;
limit = 25;
offset = 5; (optional)
rating = G;
lang = eng;

https://api.giphy.com/v1/gifs/search?api_key=Vlb8ghCOyURWJlLKsnh82oj1tgWNDDY1&q=obama&limit=25&offset=5&rating=G&lang=en


#2
Parameters:
endpoint = translate;
s = happy;

https://api.giphy.com/v1/gifs/translate?api_key=Vlb8ghCOyURWJlLKsnh82oj1tgWNDDY1&q&s=happy

#3
Parameters
endpoint = trending
limit = 25
rating = G

https://api.giphy.com/v1/gifs/trending?api_key=Vlb8ghCOyURWJlLKsnh82oj1tgWNDDY1&limit=25&rating=G

other endpoints: Random, Get by ID, Get by IDs

*/

var htmlElements = {
    listContainer: '.list-container',
    addElement: '#add-element',
    addRandElement: '#add-rand-element',
}


const key = 'Vlb8ghCOyURWJlLKsnh82oj1tgWNDDY1';
let elementsArr = ['dog', 'cat'];
let elementsArrRand = ['test1', 'test2', 'test3', 'test4'];
let searchTerm = 'cat';
let limit = 10;

let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchTerm}&limit=${limit}&offset=0&rating=G&lang=en`



var ajFN = function() {
    $.ajax({
    url: queryURL,
    method:"GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.data[0].bitly_gif_url);
  });

};

// Displays all elements and refreshes when single element is added
var displayElements = function () {
    $(htmlElements.listContainer).empty();
    elementsArr.forEach(element => {
        var elementBtn = $("<button>");
        elementBtn.addClass('btn btn-info my-button');
        elementBtn.text(element);
        $(htmlElements.listContainer).append(elementBtn);

    });



};

// Adds single element to array and calls displayElements();
var addElem = function() {
    curElement = $('#element-value').val();
    if (elementsArr.indexOf(curElement) == -1) {
        elementsArr.push(curElement); 
    } else {
        console.log("element is already in array!");
    }
    displayElements();

}

var addRandElem = function() {
    rand = Math.floor((Math.random() * elementsArrRand.length));
    elementsArr.push(elementsArrRand[rand]);
    //remove specific item in array;
    displayElements();
}
// addRandElem();

// MAKE THIS GENERIC
var clearAddField = function() {
    $('#element-value').val('');
}

// Adding an item to the array
$(document).on('click', htmlElements.addElement, function(){
    addElem();
    clearAddField();
});

// Adding a random item to an array
$(document).on('click', htmlElements.addRandElem, function() {
    addRandElem();
})

displayElements();
ajFN();

// var title = "space+jam";
// var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
//   console.log(response.Runtime);
// });
// // ---------------------------------------------------------

// console.log("This console.log will probably happen first because of asynchronicity.");
// var x = 2;
// var y = 10;
// var z = 13;
// console.log("We can also assign some variables and do some arithmetic while we wait too: 2 + 10 + 13 = ", x + y + z);


// var user = {
// 	name: 'Gabe',
// 	//arrow functions do not bind "this". This points to global object
// 	// Does not bind arguments array to the function, End up getting the Global Arguments Variable
// 	//Makes sense because in a arrow function "This" points to the Global object
// 	sayHi: () => {
// 		console.log('Hi');
// 		console.log(`Hi. I'm ${this.name}`); // Will not work. Points to Global Object
// 		console.log(arguments);
// 	},
// 	//regular function.  Binds "this".  This will work
// 	//Binds arguments array to the function
// 	sayHiAlt: function() {
// 		console.log(`Hi. I'm ${this.name}`);
// 		console.log(arguments);
// 	},

// 	//es6 function syntax.  Just another way to write a method in a object. Binds "this". This will work
// 	//Binds arguments array to the function
// 	sayHiAlt2() {
// 		console.log(`Hi. I'm ${this.name}`);
// 		console.log(arguments);
// 	}
// };

// user.sayHi(1, 2);
// user.sayHiAlt(3, 4);
// user.sayHiAlt2(5, 6);