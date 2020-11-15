

function isPalindromo(str){
	str = str+"";
  var re = /[\W_]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join('');

  return reverseStr === lowRegStr;
}

module.exports = {
    isPalindromo
}
