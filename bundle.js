(function () {
  'use strict';

  var output = document.getElementById('output');
  var upload = document.getElementById('upload');
  var tokens = document.getElementById('tokens');
  var result = '';
  var TOKENS_PATTERN = /\*\|\w+\|\*/gi;
  var suggestions = {
    '*|MC:SUBJECT|*': '',
    '*|MC_PREVIEW_TEXT|*': '',
    '*|EMAIL|*': '{EMAIL}',
    '*|NAME|*': '{NAME}',
    '*|ARCHIVE|*': '[ARCHIVE]',
    '*|UPDATE_PROFILE|*': '[]',
    '*|UNSUB|*': '[UNSUBSCRIBE]'
  };

  upload.addEventListener('change', function () {

    // generate a new FileReader object
    var reader = new FileReader();

    reader.onloadend = function () {
      // Reset the file input
      upload.value = null;
      // Copy file contents to textarea
      output.value = result = reader.result;

      var matches = result.match(TOKENS_PATTERN);
      matches = matches.map(function (match) {
        if (suggestions[match]) {
          output.value = output.value.replace(match, suggestions[match]);
          return '<li>' + match + ' => ' + suggestions[match];
        } else {
          return '<li>' + match;
        }
      });
      tokens.innerHTML = matches.join('');
    };

    // when the file is read it triggers the onloadend event above
    reader.readAsText(upload.files[0]);
  });

}());
