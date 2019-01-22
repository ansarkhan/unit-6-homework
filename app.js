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
    remElementValue: '#element-value-rem',
    removeElement: '#remove-element',
    clearScreen: '#clear-screen',
    mainContainer: '#main-container',
    myButton: '.my-button',
}


const key = 'Vlb8ghCOyURWJlLKsnh82oj1tgWNDDY1';
var elementsArr = ['America', 'United Kingdom', 'Canada', 'Mexico', 'Spain', 'Argentina', 'Italy', 'Pakistan'];
var elementsArrRand = ['test1', 'test2', 'test3', 'test4'];
var searchTerm = 'cat';
var limit = 10;

var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchTerm}&limit=${limit}&offset=0&rating=G&lang=en`





// Displays all elements and refreshes when single element is added
var displayElements = function () {
    $(htmlElements.listContainer).empty();
    elementsArr.forEach((element, index) => {
        var elementBtn = $("<button>");
        elementBtn.addClass('btn btn-dark my-button');
        elementBtn.attr('data-name', element);
        // if (index % 2 == 0) {
        //     elementBtn.addClass('btn-dark');
        // } else {
        //     elementBtn.addClass('btn-dark');
        // }
        elementBtn.text(element);
        $(htmlElements.listContainer).append(elementBtn);

    });



};

// Adds single element to array and calls displayElements();
var addElem = function() {
    curElement = $('#element-value').val();
    if (curElement != '') {
        if (elementsArr.indexOf(curElement) == -1) {
            elementsArr.push(curElement); 
        } else {
            console.log("element is already in array!");
        }
    }

}

var addRandElem = function() {
    if (elementsArrRand.length != 0) {
        rand = Math.floor((Math.random() * elementsArrRand.length));
        elementsArr.push(elementsArrRand[rand]);
        elementsArrRand.splice(rand,1);
    } else {
        console.log("Sorry! All out of random elements");
    }

}

var removeElem = function() {
    var elemRemove = $(htmlElements.remElementValue).val();
    if (elemRemove != '') {
        elemIndex = (elementsArr.indexOf(elemRemove));
        elementsArr.splice(elemIndex, 1);
    }
}

var clearScr = function() {
    $(htmlElements.mainContainer).empty();
}

// MAKE THIS WORK FOR ALL FIELDS
var clearFields = function() {
    // $('#element-value').val('');
}

var ajFN = function() {
    $.ajax({
    url: queryURL,
    method:"GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.data[0].bitly_gif_url);
  });

};

var displayGifs = function(searchBy) {
    // https://cors-anywhere.herokuapp.com/
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchBy}&limit=${limit}&offset=0&rating=G&lang=en`;
    
    clearScr();

    $.ajax({
        url: queryURL,
        method:"GET"
      }).then(function(response) {
        console.log(response);
        response.data.forEach((element, index) => {
            var gifContainer = $("<div>");
            gifContainer.addClass('col-3 gif-container d-inline-block');
            
            var gifText = $("<div>");
            gifText.addClass('gif-text');
            gifText.text(`Rating: ${response.data[index].rating}`);

            var gif = $("<img>");
            gif.attr('src', response.data[index].images.fixed_width_still.url);
            // gif.attr('src', response.data[index].images.fixed_width.url); // this is the URL for the GIF
            gif.addClass('gif');
            // gifContainer.text('sample');
    
            $(htmlElements.mainContainer).append(gifContainer);
            $(gifContainer).append(gif);
            $(gifContainer).append(gifText);
        });
        // GIF
        // Rating
      });
};

// Adding an item to the array
$(document).on('click', htmlElements.addElement, function(){
    addElem();
    displayElements();
    // clearField();
});

// Adding a random item to an array
$(document).on('click', htmlElements.addRandElement, function() {
    addRandElem();
    displayElements();
})

// Removing an item from the array
$(document).on('click', htmlElements.removeElement, function() {
    removeElem();
    displayElements();
});

$(document).on('click', htmlElements.clearScreen, function() {
    clearScr();
});

$(document).on('click', htmlElements.myButton, function() {
    var elementName = $(this).attr('data-name');
    console.log(elementName);
    displayGifs(elementName);
});

// Playing and stopping
$('body').on('click', '.gif', function() {
    // grabbing src of clicked element
    var src = $(this).attr("src");
    // console.log(src);
    // replacing src based on regex and whether the GIF is playing or not
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

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