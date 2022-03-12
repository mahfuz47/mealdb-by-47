const searchButton = document.getElementById("button-search");
const searchInput = document.getElementById("search-field");

searchInput.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key == "Enter") {
        searchButton.click();
    }
});

const searchFood = () => {
    const searchField = document.getElementById("search-field");

    const searchText = searchField.value;
    // console.log(searchText);
    // clear input field
    searchField.value = "";
    if (searchText == "") {
        alert("pleas write a positive number");
    } else {
        const url = `
        https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
        `;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data.meals));
    }
    // load data
};

const displaySearchResult = (meals) => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    if (meals.length == 0) {
        alert("could not found the item");
    } else {
        meals.forEach((meal) => {
            // console.log(meal);
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${
                  meal.strMealThumb
                }" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">
                        ${meal.strInstructions.slice(0, 170)}
                    </p>
                </div>
            </div>
        `;

            searchResult.appendChild(div);
        });
    }
};

const loadMealDetail = (mealId) => {
    console.log(mealId);
    const url = `
    https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}
    `;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
    // console.log(meal);
    let mealDetails = document.getElementById("meal-details");
    mealDetails.textContent = "";
    const div = document.createElement("div");

    div.classList.add("card");
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">
                        ${meal.strInstructions.slice(0, 150)}
                    </p>
                <a href="${
                  meal.strYoutube
                }" class="btn btn-primary">Go somewhere</a>
            </div>
    `;
    mealDetails.appendChild(div);
};