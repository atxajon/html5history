var contentEl = document.getElementById('content');
var photoEl = document.getElementById('photo');
var titleEl = document.getElementById('page-title');
var linkEls = document.getElementsByTagName('a');

// Switcheroo!
function updateContent(data) {
  if (data == null)
    return;

  console.log("data: ",data);
  contentEl.textContent = data.content;
  photoEl.src = data.photo;
  titleEl.textContent = data.title;
}

function clickHandler(event) {
  var page = event.target.getAttribute('href').split('/').pop();

  $.ajax({
      type:"POST",
      url: page,
      success: function(data){
          //Create jQuery object from the response HTML.
          var $response=$(data);

          //Query the jQuery object for the values
          var textContent = $response.filter('#content').text();
          var photoSrc = $response.filter('#photo').attr('src');
          var pageTitle = $response.filter('#page-title').text();
          var dataObj = {
            content : textContent,
            photo : photoSrc,
            title : pageTitle
          };

          var data = dataObj || null;

          updateContent(data);

          // Add an item to the history log
          history.pushState(data, event.target.textContent, event.target.href);
      }//success end

  });//ajax end

  return event.preventDefault();
}//clickHandler

// Attach event listeners
for (var i = 0, l = linkEls.length; i < l; i++) {
  linkEls[i].addEventListener('click', clickHandler, true);
}
