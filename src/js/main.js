'use strict';

// Declaring variables
var key = 'bookmarks',
    i = 0,
    text = '',
    myForm = document.getElementById('myForm'),
    msg = document.getElementById('msg'),
    resultsContainer = document.querySelector('.bookmarks-results-wrap');


// Delete all bookmarks from array/localStorage
function deleteAllBookmarks() {

    //var card = document.querySelectorAll('.bookmarks-results');
    //var cardCont = document.getElementById('results-container');
    //console.log(card);

   /* while (card[0]) {
        card[0].parentNode.removeChild(card[0]);
    }*/

    // Delete from localStorage
    //window.localStorage.clear(key);
    //return false;
    
}

//#region Get bookmarks from localStorage    
function getBookmarks() {
    
    // Get bookmarks from  localStorage
    var books = JSON.parse(window.localStorage.getItem(key));
    var resultsContainer = document.querySelector('.bookmarks-results-wrap');

    //resultsContainer.innerHTML = '';

    for (; i < books.length; i++) {
        var name = books[i].name;
        var url = books[i].url;
        var card = '<div class="bookmarks-results">' + 
                    '<div class="left-cloumn">' +
                    '<h2 class="second-header">' + name + '</h2>' +
                    '<a href="'+ url +'" class="btn btn-link" target="_blank">Visit site</a>' +
                    '</div>' +
                    // Right Column
                    '<div class="right-column">' +
                    '<a onclick="deleteBookmarks(\''+ url +'\')" class="btn btn-delete" href="#">delete</a>' +
                    '</div>' + 
                    '</div>';
        resultsContainer.innerHTML += card;
        var results = document.querySelectorAll('.bookmarks-results');
        for (var j = 0; j < results.length; j++) {
                results[j].style.opacity = 1;
        }
    }       

}

//#region Delete books
function deleteBookmarks(url) {

    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(window.localStorage.getItem(key));

    // Loop throught bookmarks
    for (var j = 0; j< bookmarks.length; j++) {
            if (bookmarks[j].url === url) {
                // Remove bookmarks from the array
                bookmarks.splice(j, 1);
            }
    }

    // Update/Re-set localStorage
    window.localStorage.setItem(key, JSON.stringify(bookmarks));

    getBookmarks();
    location.reload();// Reload the page
    return false;
}


//#region Check if Web Storage is compatible with user browser
function checkWebStorage() {

    // Check if Storage is compatible
    if (typeof(Storage) === null) {
        msg += 'Please upgrade your browser';
        window.alert(msg);
    } else {
        // Check if the 'key' exist/empty
        if (window.localStorage.getItem(key) !== null) {
            getBookmarks();
        } else {
            text += 'Bookmarks Empty';
            var para = '<p class="bold align-center" id="results-msg">' + text + '</p>';
            resultsContainer.innerHTML = para;
        }
    }
}

// Check form fields 
function formValidation(name, url) {

    // Check if the form is filled in
    if (name === '' || url === '') {
        text += 'The form must be filled in';
        msg.style.display = 'block';
        msg.className = 'msg-warning';
        msg.innerHTML = text;
        return false;
    }

    return true;

}

// Check if bookmarks exist
function bookmarksExist(name, url) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(window.localStorage.getItem(key));

    // Loop throught bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].name === name || bookmarks[i].url === url) {
                    text += 'Bookmarks already exist';
                    msg.style.display = 'block';
                    msg.className = 'msg-warning';
                    msg.innerHTML = text;
                    return false;
            }
    }

    return true;
}

//#region Store bookmarks in localStorage
function saveBookmarks(e) {
    
    // Get the value
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    // Stops storing empty fields into the array/localStorage
    if (!formValidation(siteName, siteURL) || !bookmarksExist(siteName, siteURL)) {
        return false;
    }

    // Store values in JSON format
    var bookmark = {
        name : siteName,
        url : siteURL
    };

    var bookmarks = [];// Empty array
    
    myForm.reset();

    // Store in localStorgae
    if (window.localStorage.getItem(key) === null) {
        bookmarks.push(bookmark);// Add store values into the array
        window.localStorage.setItem(key, JSON.stringify(bookmarks));// Store array into localStorage.
        //displayDeleteButton();
    } else {
        var bookmarks = JSON.parse(window.localStorage.getItem(key));// Get bookmarks from storage in JSON format
        // Add new values into the array
        bookmarks.push(bookmark);
        // Update/Re-set localStorage
        window.localStorage.setItem(key, JSON.stringify(bookmarks));
    }
    
    // Get results 'msg/text' 
    var resultsMsg = document.getElementById('results-msg');
    // Check if results 'msg' exist
    if (resultsMsg) {
        // Delete the msg from results container
        resultsContainer.innerHTML = '';
    }

    // Display bookmarks
    getBookmarks();

    //myForm.reset(); // Reset form  
    e.preventDefault();
}

// Get the form element
myForm.addEventListener('submit', saveBookmarks);

window.onload = checkWebStorage;