// we want to wait until the page is fully loaded before we are executing our javascript
$(document).ready(() => {
    const serviceUrl = 'http://3.21.225.172:8080/api/';

    // get the house data from the server
    $.getJSON(serviceUrl + 'realestate/all', (data) => {

        // because the details page needs to know the id of the house to display we need to check the query params for the id
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // we need to check if the urlParams object we just created has the ID property
        const id = urlParams.get('id');

        // if it does not had the id param redirect the user to the homepage
        if (!id) {
            document.location.href = "/";
            return;
        }

        // now we need to find the house with the matching id
        const house = data.find(h => h.id == id);

        // if we cannot find a house with a matching id redirect the user to the homepage
        if (!house) {
            document.location.href = "/";
            return;
        }

        // add the house card to the house card container
        $('#house-container').append(`
            <div class="d-flex m-3 p-3">
                <div>
                    <img id="house-img" class='rounded' src='${serviceUrl + house.imageurl}' alt="Picture of the house" />
                </div>
                <div class="m-3 w-100">
                    <div class="jumbotron">
<!--                    i am using toLocaleString to format the price so it has commas for readability-->
                      <h1 class="display-4">$ ${house.price.toLocaleString()}</h1>
                      <p class="lead">${house.beds} bd - ${house.baths} ba - ${house.sqft.toLocaleString()} sqft</p>
                      <p class="card-text text-right">${house.street}, ${house.city}, ${house.state} ${house.zip}</p>
<!--                    because the houses yrblt param is a date string we need to convert it to a date object -->
<!--                    this will make it alot easier to work with                                        -->
<!--                        now that it is a date object we can use the .getFullYear() to get only the year from the date -->
                      <p>Year Build: ${new Date(house.yrblt).getFullYear()}</p>
                      <hr>
                      <p class="lead">${house.listing}</p>
                      <p class="lead">${house.fname}</p>
                      <p class="lead">${house.phone}</p>
                    </div>
                </div>
            </div>
        `);
    })
})