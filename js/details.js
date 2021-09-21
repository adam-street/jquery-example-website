$(document).ready(() => {
    const serviceUrl = 'http://3.21.225.172:8080/api/';

    $.getJSON(serviceUrl + 'realestate/all', (data) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const id = urlParams.get('id');
        if (!id) {
            document.location.href = "/";
            return;
        }

        const house = data.find(h => h.id == id);
        if (!house) {
            document.location.href = "/";
            return;
        }

        $('#house-container').append(`
            <div class="d-flex m-3 p-3">
                <div>
                    <img id="house-img" class='rounded' src='${serviceUrl + house.imageurl}' alt="Picture of the house" />
                </div>
                <div class="m-3 w-100">
                    <div class="jumbotron">
                      <h1 class="display-4">$${house.price.toLocaleString()}</h1>
                      <p class="lead">${house.beds} bd - ${house.baths} ba - ${house.sqft.toLocaleString()} sqft</p>
                      <p class="card-text text-right">${house.street}, ${house.city}, ${house.state} ${house.zip}</p>
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