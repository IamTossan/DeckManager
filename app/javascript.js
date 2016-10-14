

document.addEventListener("scroll", function(e){

  if (document.getElementById("cardFilter") != null) {

    var cardFilter = document.getElementById("cardFilter");
    var height = document.getElementsByTagName("header")[0].offsetHeight + 5;



    var FIREFOX = /Firefox/i.test(navigator.userAgent);

    if (FIREFOX) {
      if (document.documentElement.scrollTop > height && !cardFilter.classList.contains("fixIt")) {
        cardFilter.setAttribute("class", "fixIt");
      } else if ((document.documentElement.scrollTop <= height && cardFilter.classList.contains("fixIt"))) {
        cardFilter.removeAttribute("class");
      }
    } else {
      if (document.body.scrollTop > height && !cardFilter.classList.contains("fixIt")) {
        cardFilter.setAttribute("class", "fixIt");
      } else if (document.body.scrollTop <= height && cardFilter.classList.contains("fixIt")) {
        cardFilter.removeAttribute("class");
      }
    }


  }
});
