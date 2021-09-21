$(document).ready(() => {
    const serviceUrl = 'http://3.21.225.172:8080/api/';

    $.getJSON(serviceUrl + 'realestate/all', (data) => {
        const sortedHouseList = data.sort((a, b) => b.price - a.price);
        const imgList = [sortedHouseList[0].imageurl, sortedHouseList[1].imageurl, sortedHouseList[2].imageurl];
        const house = sortedHouseList[0];

        const card = `
        <div class="d-flex m-3 p-3">
            <div>
                <img id="house-img" class='rounded' src='${serviceUrl + imgList[0]}' alt="Picture of the house" />
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
        `
        $('#house-container').append(card);

        $('#truck-icon').animate(
            {
                paddingLeft: "93%"
            },
            2000
        );

        let imgIndex = 0;
        function fadeImg() {
            $('#house-img').fadeOut(1000, () => {
                imgIndex += 1;
                if (imgIndex > imgList.length - 1) {
                    imgIndex = 0;
                }

                $('#house-img').attr('src', serviceUrl + imgList[imgIndex]);
                $('#house-img').fadeIn(1000, () => {
                    setTimeout(fadeImg, 5000)
                })
            })
        }

        setTimeout(fadeImg, 5000);

    });
});