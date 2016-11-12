var fs = require('fs');
var lines = [''];
function readLines(input, func, eofFunc) {
  var remaining = '';
 
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }
 
    remaining = remaining.substring(last);
  });
 
  input.on('end', function() {
                eofFunc(process.argv[3])
  });
}
 
function func(data) {
                lines.push(data);
}
 
function checkLines(matching){
  console.log(lines.length);
  for(var i = matching; i < lines.length; i++){
    for(var j = i+1; j < lines.length; j++){
      matched = true;
      for(var x = i - matching, r = 0; x < i ; x++, r++){
        if(!matched || lines[x] !== lines[j-matching + r] || lines[x].trim() < 6){
          matched = false;
          break;
        }
      }
      if(matched){
        console.log([i-matching, j-matching].join(','));
      }
    }                                             
  }
}
 
var input = fs.createReadStream(process.argv[2]);
readLines(input, func, checkLines);