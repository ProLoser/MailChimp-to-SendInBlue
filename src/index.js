const output = document.getElementById('output');
const upload = document.getElementById('upload');
const tokens = document.getElementById('tokens');
let result = '';
const TOKENS_PATTERN = /\*\|\w+\|\*/gi;
const suggestions = {
  '*|EMAIL|*': '{EMAIL}'
};

upload.addEventListener('change', () => {
  
  // generate a new FileReader object
  var reader = new FileReader();

  reader.onloadend = function() {
    // Reset the file input
    upload.value = null;
    // Copy file contents to textarea
    output.value = result = reader.result;
    
    let matches = result.match(TOKENS_PATTERN);
    matches = matches.map( match => {
      if (suggestions[match]) {
        output.value = output.value.replace(match, suggestions[match]);
        return `<li>${match} => ${suggestions[match]}`;
      } else {
        return `<li>${match}`;
      }
    });
    tokens.innerHTML = matches.join('');
  };

  // when the file is read it triggers the onloadend event above
  reader.readAsText(upload.files[0]);
});


/**
 * Queries MailChimp to use their CSS Inliner tool
 * @TODO Doesn't work due to CORS
 * @param  {string} html Template
 * @return {Promise} request
 */
function inline(html) {
  var data = new FormData();
  data.set( "html", html );

  return fetch("https://templates.mailchimp.com/services/inline-css/?html", {
      method: "POST",
      body: data
  });
}