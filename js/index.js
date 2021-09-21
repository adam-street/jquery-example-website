// we want to wait until the page is fully loaded before we are executing our javascript
$(document).ready(() => {
    const serviceUrl = 'http://3.21.225.172:8080/api/';

    // get the house data from the server
    $.getJSON(serviceUrl + 'realestate/all', (data) => {

        // because we only want to display the most expensive house we are just going to sort the list by price descending
        const sortedHouseList = data.sort((a, b) => b.price - a.price);

        // now that we have a soreted list we can store the most expensive house to feature
        const house = sortedHouseList[0];

        // we are also going to store a list of house images to cycle between
        const imgList = [sortedHouseList[0].imageurl, sortedHouseList[1].imageurl, sortedHouseList[2].imageurl];

        // create the featured house card's html
        const card = `
        <div class="d-flex m-3 p-3">
            <div>
                <img id="house-img" class='rounded' src='${serviceUrl + imgList[0]}' alt="Picture of the house" />
            </div>
            <div class="m-3 w-100">
                <div class="jumbotron">
<!--                im am using toLocaleString to format the price so it has commas for readability -->
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
        `
        // add the card we created to the house container
        $('#house-container').append(card);

        // animate our truck icon (moves it from the left to right by adding padding the the left side)
        $('#truck-icon').animate(
            {
                paddingLeft: "93%"
            },
            2000 // this is the duration of the animation is ms (so the animation lasts 2 seconds)
        );

        /*
            here we are going to use some very basic recursion to create a looping picture display
            recursion just mean we are going to have a function call itself!
         */

        // store a index to so we know when we are at the end of the imgList
        let imgIndex = 0;
        function updateImg() {
            // fade out the current image
            $('#house-img').fadeOut(1000, () => {

                // add 1 to the imgIndex
                imgIndex += 1;

                // here we are checking if we are on the last index of the imgList
                if (imgIndex > imgList.length - 1) {
                    // if we are restart at the beginning of the list
                    imgIndex = 0;
                }

                // update the img src so we display the new image
                // we are getting the image from the list with out imgIndex ( imglist[imgIndex])
                $('#house-img').attr('src', serviceUrl + imgList[imgIndex]);

                // hide the image so it fades in smoothly
                $('#house-img').hide();

                // fade in the new image
                $('#house-img').fadeIn(1000, () => {

                    /*
                        here we are calling the updateImg function from within itself!
                        we are using a setTimeout to delay the next call
                        the timeout is in ms (we are watiing 5 seconds to udate the img)
                     */
                    setTimeout(updateImg, 5000)
                })
            })
        }

        // we need kick off the infinite loop we just created!
        setTimeout(updateImg, 5000);
    });
});