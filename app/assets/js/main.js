/*!
 * bookmarks
 * 
 * 
 * @author Cedric Tientcheu
 * @version 1.0.0
 * Copyright 2017. MIT licensed.
 */
'use strict';

var key = 'bookmarks';
var text = '';
var i = 0;

function validateForm(name, url) {

      var warning = document.querySelector('.warning');

      if (name === '' || url === '') {
            warning.style.display = 'block';
            warning.innerHTML = 'Please fill the missing form.';
            return false;
      } else {
            
      }

      return false;
}

function displayButton() {

      var displayBtn = document.getElementById('btn-display');
      displayBtn.style.display = 'block';
      
      displayBtn.addEventListener('click', getBookmarks);
}

// Save bookmarks to localStorage
function saveBookmarks(e) {

      // Get values 
      var siteName = document.getElementById('siteName').value;
      var siteURL = document.getElementById('siteURL').value;

      //validateForm(siteName, siteURL);

      // Store values to JSON format
      var bookmark = {
            name : siteName,
            url : siteURL
      };

      // Empty array
      var bookmarks = [];

      // localStorage exist/empty
      if (window.localStorage.getItem(key) === null) {
            // Add values to the empty array
            bookmarks.push(bookmark);
            // Store array to the localStorage
            window.localStorage.setItem(key, JSON.stringify(bookmarks));// Convert to string
            displayButton();
      } else {
            // Get bookmarks from localStorage
            var bookmarks = JSON.parse(window.localStorage.getItem(key));// Convert to JSON
            // Add new bookbmarks to the array
            bookmarks.push(bookmark);
            // Re-set localStorage with new values
            window.localStorage.setItem(key, JSON.stringify(bookmarks));// Convert to string
      } 

      this.reset();// Reset the form
      e.preventDefault();
}

function deleteBookmarks(url) {
      
      // Get bookmarks from localStorage
      var bookbmarks = JSON.parse(window.localStorage.getItem(key));

      // Loop throught bookmarks URL
      for (; i < bookbmarks.length; i++) {
            var link = bookbmarks[i].url;
            console.log(link);
      }
      
      //console.log(url);
}

function getBookmarks() {

      // Get bookmarks from localStorage
      var bookmarks = JSON.parse(window.localStorage.getItem(key));

      // Get the results UI
      var resultsWrap = document.getElementById('results-wrap');
      
      //resultsWrap.innerHTML = '';

      // Loop through # bookmarks
      if (bookmarks !== null) {
            for (; i < bookmarks.length; i++) {
                  var name = bookmarks[i].name;
                  var url = bookmarks[i].url;
                  text = 'delete';
                  // Build Output UI
                  var card = '<div class="bookmarks-results">' + 
                              // Left Column 
                              '<div class="left-column">' + 
                              '<h2>' + name + '</h2>' + 
                              '<a href="'+ url +'" target="_blank">Visit</a>' + 
                              '</div>' + 
                              // Second Column 
                              '<div class="right-column">' + 
                              '<a href="#" class="btn btn-red delete-bookmarks" onclick="deleteBookmarks(\''+ url +'\')">' + text + '</a>' +
                              '</div>' + 
                              '</div>'; 
                  resultsWrap.innerHTML += card;
            }
      }
      
}

// Check if browser support Web Storage (localStorage)
function checkWebStorage() {
      
      if (typeof(Storage) === null) {
            text += 'Please upgrade your browser.';
            window.alert(text);
      } else {
            // Check if the key exist/empty
            if (window.localStorage.getItem(key)) {
                  displayButton();
            } else {
                  console.log('localStorage empty');
            }
      }
}

// Add submit event to the form ele
document.getElementById('myForm').addEventListener('submit', saveBookmarks);

window.onload = checkWebStorage;