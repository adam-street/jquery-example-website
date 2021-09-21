// we want to wait until the page is fully loaded before we are executing our javascript
$(document).ready(() => {
    const serviceUrl = 'http://3.21.225.172:8080/api/';
    let houseList = [];
    let minPrice = NaN;
    let maxPrice = NaN;

    // get the house data from the server
    $.getJSON(serviceUrl + 'realestate/all', (data) => {
        // store the returned data in a variable
        houseList = data;

        // run my update listing function to display the houses
        updateListings();
    })

    // this runs when someone submits the search form (clicks search or hits enter)
    $("#search-form").submit((event) => {
        // the default action of a form is to navigate to a new page
        // this just stops that from happening
        event.preventDefault();

        // i need to get search values minPrice and maxPrice
        // i am using jQuery to extract the typed values -- $('#min-price-input').val()
        // i wrapped this with a parseInt() because the html val from the input element is going to return a string
        minPrice = parseInt($('#min-price-input').val());
        maxPrice = parseInt($('#max-price-input').val());

        // run my update listing function to display the new set of houses
        updateListings();
    });

    // this function runs when a user submit the search form
    function updateListings() {
        // scroll page to top
        $(window).scrollTop(0);

        // empty out the container of previous house cards
        $("#house-container").empty();

        // filter the house list and store the results in displayList
        const displayList = houseList.filter((house) => {

            // check if both min and max price are NaN (not a number) values
            if (isNaN(minPrice) && isNaN(maxPrice)) {
                // if both values are NaN the form is empty and all houses should be displayed
                return true;
            }

            // if both values are not NaN we need to check each individually
            if (isNaN(maxPrice)) {
                // if max price is NaN then we only need to filter by the minPrice
                return house.price >= minPrice;
            }
            if (isNaN(minPrice)) {
                // if min price is NaN then we only need to filter by the maxPrice
                return house.price <= maxPrice;
            }

            // if both values are a number we need to filter by both min price and max price
            return house.price >= minPrice && house.price <= maxPrice
        });

        // update our counter to show how many houses are displayed
        $("#house-count").html(`${displayList.length} Results Found`);

        // loop over each house in the display list
        for (const house of displayList) {

            // create a card string to store our html
            const card = `
<!--            i wrapped the card in a <a> tag so i can use a href to navigate to my detials page-->
<!--            inside the href for the <a> tag notice i am using a query parameter to store the id of the house -->
<!--            on the detials page i can read this parameter to know what house to display -->
             <a href="./details?id=${house.id}">
                <div class="card text-right shadow-lg m-3" style="width: 25em;">
                  <img class="card-img-top" src="${serviceUrl + house.imageurl}" alt="house image">
                  <div class="card-body">
                    <p class="lead">
<!--                    i am using toLocaleString to format the price so it has commas for readability-->
                        $ ${house.price.toLocaleString()}
                         <span style="float: right">
                            ${house.beds} bd - ${house.baths} ba - ${house.sqft.toLocaleString()} sqft
                         </span>
                    </p>
                    <p class="card-text text-right">${house.street}, ${house.city}, ${house.state} ${house.zip}</p>
                  </div>
                </div>
             </a>
            `

            $("#house-container")
                // here i am appending the card i just created to the house container element
                .append(card)
                // here i am getting the last element in the "house-container" (the one i just added)
                .children(':last')
                // here i am hiding the element
                .hide()
                // here i am fading it in (makes it visible again)
                .fadeIn(1000);
                // i am just doing this to make it look nice when loading in the house cards
                // you can stop after the append and the houses would still display
        }
    }
})