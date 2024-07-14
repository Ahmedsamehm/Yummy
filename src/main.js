    let btnMenu = $(`#openMenu`);

    btnMenu.click(function () {
        let linkHolder = $(".linkHolder");
        let cardHolder = $(".cardHolder");
        let leftMenuWidth = linkHolder.outerWidth(true); //calculates width of this div
        let currentLeft = parseInt(linkHolder.css("left")); //this give me the width hwa d5l fe al 4a4a kam px 3la4n y5tafiee

        let targetLeft = currentLeft === 0 ? `-${leftMenuWidth}px` : "0px";
        let cardHolderTargetLeft = currentLeft === 0 ? "0px" : `${leftMenuWidth}px`;

        linkHolder.animate({
                left: targetLeft,
            },
            300
        );
        cardHolder.animate({
                left: cardHolderTargetLeft,
            },
            300
        );
        if (currentLeft == 0) {
            //close
            $(".openMenuIcon").removeClass("fa-solid fa-xmark");
            $(".openMenuIcon").addClass("fa-solid fa-bars");

            for (let i = 0; i < 5; i++) {
                $(`.links li `)
                    .eq(i)
                    .animate({
                            top: 50,
                        },
                        (i + 5) * 100
                    );
            }
        } else {
            //open
            $(".openMenuIcon").removeClass("fa-solid fa-bars");
            $(".openMenuIcon").addClass("fa-solid fa-xmark");
            for (let i = 0; i < 5; i++) {
                $(`.links li `)
                    .eq(i)
                    .animate({
                            top: -30,
                        },
                        (i + 5) * 100
                    );
            }
        }
    });


    let arr = [];

    function displayMeals(arr) {
        let cartoona = ``;
        for (let i = 0; i < arr.length; i++) {
            cartoona += `
            <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md mx-auto my-auto  ">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="cardBody cursor-pointer relative overflow-hidden ">
                <img src="${arr[i].strMealThumb}" class="w-fit" alt="">
                <div class="absolute layer w-fit flex  items-center font-semibold overflow-hidden p-2 ">
                <h1 class="text-xl font-bold">${arr[i].strMeal}</h1>
                </div>
            </div>
            </div>
            
            `;
        }
        document.getElementById("HomeBody").innerHTML = cartoona;
    }
    async function getCategories() {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        response = await response.json();

        displayCategories(response.categories);
    }

    function displayCategories(arr) {
        let cartoona = "";
        for (let i = 0; i < arr.length; i++) {
            cartoona += `
        <div class="col-span-12  sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md   mx-auto my-auto">
            <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="cardBody mx-auto cursor-pointer relative overflow-hidden">
            <img src="${arr[i].strCategoryThumb}" class="w-fit" alt="">
            <div class="absolute layer w-fit text-center items-center font-semibold overflow-hidden p-2">
                <h1 class="text-xl font-bold">${arr[i].strCategory}</h1>
                <p class="py-1 text-sm">${arr[i].strCategoryDescription}</p>
            </div>
            </div>
        </div>
        `;
        }
        document.getElementById("HomeBody").innerHTML = cartoona;
    }
    async function getArea() {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        response = await response.json();

        displayArea(response.meals);
    }
    async function getMealsByArea(area) {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        response = await response.json();
        displayMeals(response.meals);
    }

    function displayArea(arr) {
        let cartoona = "";
        for (let i = 0; i < arr.length; i++) {
            cartoona += `
            <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md mx-auto my-auto">
            <div onclick="getMealsByArea('${arr[i].strArea}')" class="flex flex-col items-center justify-center h-full p-4 text-xl text-white cursor-pointer">
                <i class="fa-solid fa-house-laptop text-2xl"></i>
                <h1>${arr[i].strArea}</h1>
            </div>
            </div>
        `;
        }
        document.getElementById("HomeBody").innerHTML = cartoona;
    }

    async function getIngredients() {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
        );
        response = await response.json();
        console.log(response);
        displayIngredients(response.meals.slice(0, 20));
    }

    function displayIngredients(arr) {
        let cartoona = ``;
        for (let i = 0; i < arr.length; i++) {
            cartoona += `
                <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 shadow-md mx-auto " >
                        <div onclick="getIngredientsMeals('${
                        arr[i].strIngredient
                        }')"  class="flex flex-col items-center justify-center h-full p-4 text-xl text-white cursor-pointer">
                            <i class="fa-solid fa-drumstick-bite fa-3x"></i>
                                <h1 class="font-bold text-xl">${
                                arr[i].strIngredient
                                }</h1>
                                <p class="font-semibold">${arr[i].strDescription
                                .split(" ")
                                .slice(0, 20)
                                .join(" ")}</p>
                        </div>
                    </div>`;
        }
        document.getElementById("HomeBody").innerHTML = cartoona;
    }

    async function getCategoryMeals(category) {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        response = await response.json();
        console.log(response);
        displayMeals(response.meals.slice(0, 20));
    }
    async function getMealDetails(area) {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        response = await response.json();
        displayMeals(response.meals);
    }

    async function getIngredientsMeals(ingredients) {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
        );
        response = await response.json();
        displayMeals(response.meals.slice(0, 20));
    }

    async function getMealDetails(id) {
        let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        response = await response.json();

        meal = response.meals[0];
        document.getElementById("HomeBody").style.display = "none";
        document.getElementById("DetailsPage").style.display = "block";
        displayMealDetails(meal);
    }

    function displayMealDetails(meal) {
        let cartoona = `
                <div class="lg:col-span-4 col-span-12   ">
                        <div id="leftSection" class="LeftSide  gap-x-4  pl-10  ">
                            <img src="${meal.strMealThumb}" class="w-full" alt="">
                            <h1 class="font-bold text-2xl">${meal.strMeal}</h1>
                        </div>
                        </div>
                        <div class="lg:col-span-8 col-span-12 ">
                        <div id="RightSection" class="rightContent flex flex-col px-10 ">
                            <div class="flex justify-between ">
                                <h1 class="text-2xl font-bold">Instructions</h1>
                                <i id="closeMenu" class="fa-solid fa-x cursor-pointer fa-2xl"></i>
                            </div>
                            
                            <p class="py-5 text-2xl">${meal.strInstructions}</p>
                            <span class="font-bold text-xl">Area: <span>${
                            meal.strArea
                            }</span></span>
                            <span class="font-bold text-xl">Category : <span>${
                            meal.strCategory
                            }</span></span>
                            <span class="font-bold text-xl">Recipes :</span>
                            <div class="flex flex-wrap gap-3 py-5">
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient1 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient2 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient3 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient4 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient5 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient6 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient7 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient8 || ""
                                }</p>
                            </div>
                            <div class="card bg-sky-400 rounded border-solid p-1">
                                <p class="px-1 text-white">${
                                meal.strIngredient9 || ""
                                }</p>
                            </div>
                            </div>
                            <span class="font-bold">Tags  :</span>
                            <div class="card bg-red-300 rounded border-solid w-fit p-1">
                            <p class="px-1 text-red-500">${meal.strTags}</p>
                            </div>
                            <div class="flex my-5 gap-2">
                            <button class="border border-slate-600 rounded p-1 hover:bg-green-500 bg-green-700"><a href="${
                                meal.strSource
                            }" target="_blank">Source</a></button>
                            <button class="border border-slate-600 rounded p-1 hover:bg-red-700 bg-red-500">
                                <a href="${
                                meal.strYoutube
                                }" target="_blank">YouTube</a>
                            </button>
                            </div>
                        </div>
                        </div>
        `;

        document.getElementById("detailsBody").innerHTML = cartoona;


        let closeMenuBtn = document.getElementById("closeMenu");


        closeMenuBtn.addEventListener("click", () => {
            document.getElementById("DetailsPage").style.display = "none";
            document.getElementById("HomeBody").style.display = "";
        });
    }


    async function searchByName(name) {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        response = await response.json();
        displayMeals(response.meals.slice(0, 20));
    }
    async function searchByFLetter(latter) {
        document.getElementById("HomeBody").innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${latter}`)
        response = await response.json();
        displayMeals(response.meals.slice(0, 20));
    }


    function showSearchPage() {
        let cartoona = ``
        cartoona += `
    <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 shadow-md ">
      <div>
        <div class=" flex w-full ">
          <input onkeyup="searchByName(this.value)" type="text" class=" m-0 block flex-auto rounded-s px-4 py-3 " placeholder="search By Name"/>
        </div>
      </div>
    </div>
    <div class="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 shadow-md bg-">
      <div>
        <div class=" flex w-full ">
          <input onkeyup="searchByFLetter(this.value)" type="text" class=" m-0 block flex-auto rounded-s px-4 py-3 " placeholder="search By First Latter"/>
        </div>
      </div>
    </div> 
    `
        document.getElementById("HomeBody").innerHTML = cartoona;
    }



    getCategories();