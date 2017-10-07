/*!
 * bookmarks
 * 
 * 
 * @author Cedric Tientcheu
 * @version 1.0.0
 * Copyright 2017. MIT licensed.
 */
'use strict';

// Get Form element
var myForm = document.getElementById('myForm');

function saveBookmark(e) {

    // Get input values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    // Storing values in a JSON object
    var bookmarks = {
        name : siteName,
        url : siteURL
    };

    // Storing to localStorage
    if (typeof(Storage) !== 'undefined') { // Check if browser support
        localStorage.setItem('test', 'Hello World!');
    } else {
        console.log('Browser not compatible with Web Storage');
    }

    //console.log(bookmarks);
    e.preventDefault();
}

 myForm.addEventListener('submit', saveBookmark);
