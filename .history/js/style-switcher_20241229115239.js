$(document).ready(function () {
  //view style switcher
  var displayThemeColors = true;
  $(".style-toggler").on("click", function () {
    if (displayThemeColors === true) {
      $(".style-switcher").css({ transform: "translateX(0px)" });
      displayThemeColors = false;
    } else {
      $(".style-switcher").css({ transform: "translateX(190px)" });
      displayThemeColors = true;
    }
  });
  //hide style switcher on sroll
  $(window).on("scroll", function () {
    $(".style-switcher").css({ transform: "translateX(190px)" });
    displayThemeColors = true;
  });
});

//theme colors
const alternateStyles = $(".alternate-style");
function setActiveStyle(color) {
  var alternateStyle = 0,
    alternateStyleLenght = 5;
  for (; alternateStyle < alternateStyleLenght; alternateStyle++) {
    if (alternateStyles[alternateStyle].title === color) {
      alternateStyles[alternateStyle].disabled = false;
    } else {
      alternateStyles[alternateStyle].disabled = true;
    }
  }
}

//dark or light moood
$(".day-night").on("click", function () {
  $(".day-night i").toggleClass("fa-sun");
  $(".day-night i").toggleClass("fa-moon");
  $("body").toggleClass("dark");
  localStorage.setItem(
    "isDark",
    document.querySelector("body").classList.contains("dark")
  );

//   $(".github")
//     .removeClass("text-white text-dark")
//     .addClass(containsDark ? "text-white" : "text-dark");

    console.log(document.querySelector("body").classList.contains("dark"));
    
});

const isDark = localStorage.getItem("isDark");

if (isDark == "true") {
  $("body").addClass("dark");
}

$(window).on("load", function () {
  const containsDark = $("body").hasClass("dark");

  $(".day-night i")
    .removeClass("fa-sun fa-moon")
    .addClass(containsDark ? "fa-sun" : "fa-moon");
});
