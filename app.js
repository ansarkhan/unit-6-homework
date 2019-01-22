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

// https://ansarkhan.github.io/unit-6-homework/

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
var elementsArr = ['America', 'United Kingdom', 'Canada', 'Mexico', 'Spain', 'Argentina', 'Italy', 'Pakistan', 'Germany', 'Ethiopia'];
var elementsArrRand = ['Armenia', 'Austria', 'Barbados', 'Benin', 'Botswana', 'Brunei', 'Burundi', 'Chad', 'Croatia', 'Cyprus', 'Denmark', 'Fiji', 'Finland'];
var searchTerm = 'cat';
var limit = 10;
var offset = 0;

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
        if (elemIndex != -1) {
            elementsArr.splice(elemIndex, 1);
        } else {
            console.log("That element does not exist");
        }
    }
}

var clearScr = function() {
    $(htmlElements.mainContainer).empty();
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
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchBy}&limit=${limit}&offset=${offset}&rating=G&lang=en`;

    offset += 10;

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
            var title = response.data[index].title;
            var shortTitle = title.substring(0, title.indexOf("GIF"));

            var rating = response.data[index].rating;
            gifText.html(`<b>Title:</b> ${shortTitle}
            <br>
            <b>Rating:</b> ${rating}`);

            var gif = $("<img>");
            gif.attr('src', response.data[index].images.fixed_width_still.url);
            // gif.attr('src', response.data[index].images.fixed_width.url); // this is the URL for the GIF
            gif.addClass('gif');

            var downloadBtn = $("<span>");
            downloadBtn.html("<span class='glyphicon glyphicon-download' aria-hidden='true'></span>");


    
            $(htmlElements.mainContainer).append(gifContainer);
            $(gifContainer).append(gif);
            $(gifContainer).append(gifText);
            $(gifContainer).append(downloadBtn);
        });
        // GIF
        // Rating
      });
};

// Adding an item to the array
$(document).on('click', htmlElements.addElement, function(){
    var thisBtn = $(this).attr('id');
    addElem();
    displayElements();
    clearFields(thisBtn);
    // clearField();
});

// Adding a random item to an array
$(document).on('click', htmlElements.addRandElement, function() {
    addRandElem();
    displayElements();
})

// Removing an item from the array
$(document).on('click', htmlElements.removeElement, function() {
    var thisBtn = $(this).attr('id');
    removeElem();
    displayElements();
    clearFields(thisBtn);
});

$(document).on('click', htmlElements.clearScreen, function() {
    clearScr();
    clearFields();
});

// Getting GIFs
$(document).on('click', htmlElements.myButton, function() {
    var elementName = $(this).attr('data-name');
    console.log(elementName);
    var containerElement = $(htmlElements.mainContainer).attr('data-name');

    if(containerElement == elementName) {
        displayGifs(elementName);
    } else {
        offset = 0;
        clearScr();
        displayGifs(elementName);
    }

    $(htmlElements.mainContainer).attr('data-name', elementName);


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


var clearFields = function(buttonName) {
    if (buttonName == 'add-element') {
        $('#element-value').val('');
    } else if (buttonName == 'remove-element') {
        $('#element-value-rem').val('');
    }
}

displayElements();
// ajFN();
