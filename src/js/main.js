var myForm = document.getElementById('myForm'),
      siteName = document.getElementById('siteName'),
      siteURL = document.getElementById('siteURL');

myForm.addEventListener('submit', saveBookmark);

function saveBookmark(e) {

    var nameVal = siteName.value;
    var urlVal = siteURL.value;

      console.log(nameVal);

      e.preventDefault();
}
