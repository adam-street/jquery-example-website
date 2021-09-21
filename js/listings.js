$(document).ready(() => {
    const serviceUrl = 'http://3.21.225.172:8080/api/';
    let houseList = [];
    let minPrice = NaN;
    let maxPrice = NaN;

    $("#search-form").submit((event) => {
        event.preventDefault();
        minPrice = parseInt($('#min-price-input').val());
        maxPrice = parseInt($('#max-price-input').val());
        updateListings();
    });

    $.getJSON(serviceUrl + 'realestate/all', (data) => {
        houseList = data;
        updateListings();
    })

    function updateListings() {
        $(window).scrollTop(0);
        $("#house-container").empty();

        let displayList = houseList.filter((house) => {
            if (isNaN(minPrice) && isNaN(maxPrice)) {
                return true;
            }

            if (isNaN(maxPrice)) {
                return house.price >= minPrice;
            }

            if (isNaN(minPrice)) {
                return house.price <= maxPrice;
            }

            return house.price >= minPrice && house.price <= maxPrice
        });

        $("#house-count").html(`${displayList.length} Results Found`)
        for (const house of displayList) {
            const card = `
             <a href="./details?id=${house.id}">
                <div class="card text-right shadow-lg m-3" style="width: 25em;">
                  <img class="card-img-top" src="${serviceUrl + house.imageurl}" alt="house image">
                  <div class="card-body">
                    <p class="lead">
                        $${house.price.toLocaleString()}
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
                .append(card)
                .children(':last')
                .hide()
                .fadeIn(1000);
        }
    }
})