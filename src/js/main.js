'use strict';

var key = 'bookmarks';
var text = '';

function checkWebStorage() {

      if (typeof(Storage) === null) {
            text += 'Please upgrade your browser.';
            window.alert(text);
      } else {

            if (window.localStorage.getItem(key)) {
                  getBookmarks();
            } else {
                  console.log('empty');
            }
      }
}

// Save bookmarks to localStorage
function saveBookmarks(e) {

      // Get values 
      var siteName = document.getElementById('siteName').value;
      var siteURL = document.getElementById('siteURL').value;

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

function getBookmarks() {

      // Get bookmarks from localStorage
      var bookmarks = JSON.parse(window.localStorage.getItem(key));

      // Loop through # bookmarks
      
      /*for (var i = 0; i < bookmarks.length; i++) {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
            console.log(name);
            
      }*/

}
getBookmarks();

// Add submit event to the form ele
document.getElementById('myForm').addEventListener('submit', saveBookmarks);

window.onload = checkWebStorage;