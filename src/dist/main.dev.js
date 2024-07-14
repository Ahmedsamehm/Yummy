"use strict";

var btnMenu = $("#openMenu");
btnMenu.click(function () {
  var linkHolder = $(".linkHolder");
  var cardHolder = $(".cardHolder");
  var leftMenuWidth = linkHolder.outerWidth(true); //calculates width of this div

  var currentLeft = parseInt(linkHolder.css("left")); //this give me the width hwa d5l fe al 4a4a kam px 3la4n y5tafiee

  var targetLeft = currentLeft === 0 ? "-".concat(leftMenuWidth, "px") : "0px";
  var cardHolderTargetLeft = currentLeft === 0 ? "0px" : "".concat(leftMenuWidth, "px");
  linkHolder.animate({
    left: targetLeft
  }, 300);
  cardHolder.animate({
    left: cardHolderTargetLeft
  }, 300);

  if (currentLeft == 0) {
    //close
    $(".openMenuIcon").removeClass("fa-solid fa-xmark");
    $(".openMenuIcon").addClass("fa-solid fa-bars");

    for (var i = 0; i < 5; i++) {
      $(".links li ").eq(i).animate({
        top: 50
      }, (i + 5) * 100);
    }
  } else {
    //open
    $(".openMenuIcon").removeClass("fa-solid fa-bars");
    $(".openMenuIcon").addClass("fa-solid fa-xmark");

    for (var _i = 0; _i < 5; _i++) {
      $(".links li ").eq(_i).animate({
        top: -30
      }, (_i + 5) * 100);
    }
  }
});
var arr = [];

function displayMeals(arr) {
  var cartoona = "";

  for (var i = 0; i < arr.length; i++) {
    cartoona += "\n            <div class=\"col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md  \">\n            <div onclick=\"getMealDetailsById('".concat(arr[i].idMeal, "')\" class=\"cardBody cursor-pointer relative overflow-hidden \">\n                <img src=\"").concat(arr[i].strMealThumb, "\" alt=\"\">\n                <div class=\"absolute layer w-full flex  items-center font-semibold overflow-hidden p-2 \">\n                <h1 class=\"text-xl font-bold\">").concat(arr[i].strMeal, "</h1>\n                </div>\n            </div>\n            </div>\n            \n            ");
  }

  document.getElementById("HomeBody").innerHTML = cartoona;
}

function getCategories() {
  var response;
  return regeneratorRuntime.async(function getCategories$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.getElementById("HomePage").classList.add("hidden");
          document.getElementById("categoriesSection").classList.remove("hidden");
          document.getElementById("HomeBody").innerHTML = "";
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/categories.php"));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          response = _context.sent;
          displayCategories(response.categories);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          console.error("Error fetching categories:", _context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13]]);
}

function displayCategories(arr) {
  var cartoona = "";

  for (var i = 0; i < arr.length; i++) {
    cartoona += "\n        <div class=\"col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md block\">\n            <div onclick=\"getCategoryMeals('".concat(arr[i].strCategory, "')\" class=\"cardBody cursor-pointer relative overflow-hidden\">\n            <img src=\"").concat(arr[i].strCategoryThumb, "\" alt=\"\">\n            <div class=\"absolute layer w-full text-center items-center font-semibold overflow-hidden p-2\">\n                <h1 class=\"text-xl font-bold\">").concat(arr[i].strCategory, "</h1>\n                <p class=\"py-1 text-sm\">").concat(arr[i].strCategoryDescription, "</p>\n            </div>\n            </div>\n        </div>\n        ");
  }

  document.getElementById("HomeBody").innerHTML = cartoona;
}

function getArea() {
  var response;
  return regeneratorRuntime.async(function getArea$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          document.getElementById("HomePage").classList.add("hidden");
          document.getElementById("area").classList.remove("hidden");
          document.getElementById("HomeBody").innerHTML = "";
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list"));

        case 6:
          response = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          response = _context2.sent;
          displayArea(response.meals);
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](3);
          console.error("Error fetching areas:", _context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 13]]);
}

function getMealsByArea(area) {
  var response;
  return regeneratorRuntime.async(function getMealsByArea$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          document.getElementById("HomeBody").innerHTML = "";
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=".concat(area)));

        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          response = _context3.sent;
          displayMeals(response.meals);
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](1);
          console.error("Error fetching meals by area:", _context3.t0);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 11]]);
}

function displayArea(arr) {
  var cartoona = "";

  for (var i = 0; i < arr.length; i++) {
    cartoona += "\n            <div class=\"col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md\">\n            <div onclick=\"getMealsByArea('".concat(arr[i].strArea, "')\" class=\"flex flex-col items-center justify-center h-full p-4 text-xl text-white cursor-pointer\">\n                <i class=\"fa-solid fa-house-laptop text-2xl\"></i>\n                <h1>").concat(arr[i].strArea, "</h1>\n            </div>\n            </div>\n        ");
  }

  document.getElementById("HomeBody").innerHTML = cartoona;
}

function getIngredients() {
  var response;
  return regeneratorRuntime.async(function getIngredients$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          document.getElementById("HomePage").classList.add("hidden");
          document.getElementById("ingredientsSection").classList.remove("hidden");
          document.getElementById("HomeBody").innerHTML = "";
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list"));

        case 6:
          response = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          response = _context4.sent;
          displayIngredients(response.meals.slice(0, 20));
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](3);
          console.error("Error fetching ingredients:", _context4.t0);

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 13]]);
}

function displayIngredients(arr) {
  var cartoona = "";

  for (var i = 0; i < arr.length; i++) {
    cartoona += "\n                <div class=\"col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md \" >\n                        <div onclick=\"getIngredientsMeals('".concat(arr[i].strIngredient, "')\"  class=\"flex flex-col items-center justify-center h-full p-4 text-xl text-white cursor-pointer\">\n                            <i class=\"fa-solid fa-drumstick-bite fa-3x\"></i>\n                                <h1 class=\"font-bold text-xl\">").concat(arr[i].strIngredient, "</h1>\n                                <p class=\"font-semibold\">").concat(arr[i].strDescription.split(" ").slice(0, 20).join(" "), "</p>\n                        </div>\n                    </div>");
  }

  document.getElementById("HomeBody").innerHTML = cartoona;
}

function getCategoryMeals(category) {
  var response;
  return regeneratorRuntime.async(function getCategoryMeals$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          document.getElementById("HomeBody").innerHTML = "";
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=".concat(category)));

        case 4:
          response = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          response = _context5.sent;
          displayMeals(response.meals.slice(0, 20));
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          console.error("Error fetching category meals:", _context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 11]]);
}

function getMealDetailsById(id) {
  var response, meal;
  return regeneratorRuntime.async(function getMealDetailsById$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=".concat(id)));

        case 3:
          response = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          response = _context6.sent;

          if (response.meals && response.meals.length > 0) {
            meal = response.meals[0];
            document.getElementById("HomePage").classList.add("hidden");
            document.getElementById("DetailsPage").classList.remove("hidden");
            displayMealDetails(meal);
          } else {
            console.error("No meals found for this ID.");
          }

          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error("Error fetching meal details by ID:", _context6.t0);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function displayMealDetails(meal) {
  var cartoona = "\n          <div class=\"lg:col-span-4 col-span-12\">\n                    <div id=\"leftSection\" class=\"LeftSide pl-10\">\n                      <img src=\"".concat(meal.strMealThumb, "\" class=\"w-80\" alt=\"\">\n                      <h1 class=\"font-bold text-2xl\">").concat(meal.strMeal, "</h1>\n                    </div>\n                  </div>\n                  <div class=\"lg:col-span-8 col-span-12\">\n                    <div id=\"RightSection\" class=\"rightContent flex flex-col\">\n                        <div class=\"flex justify-between \">\n                            <h1 class=\"text-2xl font-bold\">Instructions</h1>\n                            <i id=\"closeMenu\" class=\"fa-solid fa-x cursor-pointer fa-2xl\"></i>\n                        </div>\n                      \n                      <p class=\"py-5 text-2xl\">").concat(meal.strInstructions, "</p>\n                      <span class=\"font-bold text-xl\">Area: <span>").concat(meal.strArea, "</span></span>\n                      <span class=\"font-bold text-xl\">Category : <span>").concat(meal.strCategory, "</span></span>\n                      <span class=\"font-bold text-xl\">Recipes :</span>\n                      <div class=\"flex flex-wrap gap-3 py-5\">\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient1 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient2 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient3 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient4 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient5 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient6 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient7 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient8 || "", "</p>\n                        </div>\n                        <div class=\"card bg-sky-400 rounded border-solid p-1\">\n                          <p class=\"px-1 text-white\">").concat(meal.strIngredient9 || "", "</p>\n                        </div>\n                      </div>\n                      <span class=\"font-bold\">Tags  :</span>\n                      <div class=\"card bg-red-300 rounded border-solid w-fit p-1\">\n                        <p class=\"px-1 text-red-500\">").concat(meal.strTags, "</p>\n                      </div>\n                      <div class=\"flex my-5 gap-2\">\n                        <button class=\"border border-slate-600 rounded p-1 hover:bg-green-500 bg-green-700\"><a href=\"").concat(meal.strSource, "\" target=\"_blank\">Source</a></button>\n                        <button class=\"border border-slate-600 rounded p-1 hover:bg-red-700 bg-red-500\">\n                          <a href=\"").concat(meal.strYoutube, "\" target=\"_blank\">YouTube</a>\n                        </button>\n                      </div>\n                    </div>\n                  </div>\n    ");
  document.getElementById("detailsBody").innerHTML = cartoona;
  var closeMenuBtn = document.getElementById("closeMenu");
  closeMenuBtn.addEventListener("click", function () {
    document.getElementById("DetailsPage").style.display = "none";
    document.getElementById("HomeBody").style.display = "block";
  });
}

function searchByName(name) {
  var response;
  return regeneratorRuntime.async(function searchByName$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          document.getElementById("HomeBody").innerHTML = "";
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=".concat(name)));

        case 4:
          response = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          response = _context7.sent;
          displayMeals(response.meals.slice(0, 20));
          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](1);
          console.error("Error searching by name:", _context7.t0);

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 11]]);
}

function searchByFLetter(letter) {
  var response;
  return regeneratorRuntime.async(function searchByFLetter$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          document.getElementById("HomeBody").innerHTML = "";
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=".concat(letter)));

        case 4:
          response = _context8.sent;
          _context8.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          response = _context8.sent;
          displayMeals(response.meals.slice(0, 20));
          _context8.next = 14;
          break;

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](1);
          console.error("Error searching by first letter:", _context8.t0);

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 11]]);
}

function showSearchInputs() {
  var searchBody = document.getElementById("searchBody");
  searchBody.innerHTML = "\n    <div class=\"col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 shadow-md \">\n      <div>\n        <div class=\" flex w-full \">\n          <input onkeyup=\"searchByName(this.value)\" type=\"text\" class=\" m-0 block flex-auto rounded-s px-4 py-3 \" placeholder=\"search By Name\"/>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 shadow-md bg-\">\n      <div>\n        <div class=\" flex w-full \">\n          <input onkeyup=\"searchByFLetter(this.value)\" type=\"text\" class=\" m-0 block flex-auto rounded-s px-4 py-3 \" placeholder=\"search By First Latter\"/>\n        </div>\n      </div>\n    </div> \n    <div class=\"col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 \">\n        <div>\n          <button onclick=\"searchByName(document.getElementById('searchInput').value)\" class=\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\">Search</button>\n        </div>\n    </div>\n  ";
} // Initial display


getCategories();
showSearchInputs();