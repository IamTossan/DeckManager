

document.addEventListener("scroll", function(e){

  if (document.getElementById("cardFilter") != null) {

    var cardFilter = document.getElementById("cardFilter");
    var height = document.getElementsByTagName("header")[0].offsetHeight + 5;
    var cards = document.querySelector("#cards ul");
    var marginFix = (cardFilter.clientHeight + 5).toString();

    var FIREFOX = /Firefox/i.test(navigator.userAgent);

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

    if (FIREFOX || msie) {
      if (document.documentElement.scrollTop > height && !cardFilter.classList.contains("fixIt")) {
        cardFilter.setAttribute("class", "fixIt");
        cards.style.marginTop = marginFix + "px";
      } else if ((document.documentElement.scrollTop <= height && cardFilter.classList.contains("fixIt"))) {
        cardFilter.removeAttribute("class");
        cards.style.marginTop = "0";
      }
    } else {
      if (document.body.scrollTop > height && !cardFilter.classList.contains("fixIt")) {
        cardFilter.setAttribute("class", "fixIt");
        cards.style.marginTop = marginFix + "px";
      } else if (document.body.scrollTop <= height && cardFilter.classList.contains("fixIt")) {
        cardFilter.removeAttribute("class");
        cards.style.marginTop = "0";
      }
    }


  }
});
