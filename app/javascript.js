
document.addEventListener("scroll", function(e){
  if (document.getElementById("cardFilter") != null) {
    var cardFilter = document.getElementById("cardFilter");
    var height = document.getElementsByTagName("header")[0].offsetHeight + 5;

    if (document.body.scrollTop > height && !cardFilter.classList.contains("fixIt")) {
      cardFilter.setAttribute("class", "fixIt");
    } else if (document.body.scrollTop <= height && cardFilter.classList.contains("fixIt")) {
      cardFilter.removeAttribute("class");
    }
  }
});
