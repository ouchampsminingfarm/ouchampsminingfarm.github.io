// Get the data from the google sheet
var spData = null;
function doData(json) {
    spData = json.feed.entry;
}

//Here we sort the data by row and columns
function readData(parent) {
    var data = spData;
    var rowData = [];
    for (var r = 0; r < data.length; r++) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        if (cell.col == 0) {
            rowData = [];
        }
        // Adding all data to the array rowData
        rowData.push(val);
    }
    // remove the columns name from our data since not necessary
    rowData.splice(0, 4);

    // Function that splits our array rowData every 4 entries (date, title, description, image)
    var i;
    var postArray = []
    var splitElements = [],
        delimiter = 4; // Change this to whatever you need it to be.
    // parameters: array, number of elements to split the array by
    if (rowData.length > delimiter) {
        splitElements = splitArray(rowData, delimiter);
    }
    else {
        // No need to do anything if the array's length is less than the delimiter
        splitElements = rowData;
    }
    function splitArray(rowData, delimiter) {
        var elements_length = rowData.length;
        if (elements_length > delimiter) {
            var myArrays = [], // parent array for each sub array
                first = 0, // used to capture the first element in each sub array
                index = 0; // used to capture the index for each sub array
            for (var i = 0; i < elements_length; ++i) {
                if (i % delimiter === 0) {
                    // Capture the first element of each sub array from the original array, when i is a modulus factor of the delimiter.
                    first = i;
                } else if (delimiter - (i % delimiter) === 1) {
                    // Build each sub array, from the original array, sliced every time the i one minus the modulus factor of the delimiter.
                    index = (i + 1) / delimiter - 1;
                    myArrays[index] = rowData.slice(first, i + 1);
                }
                else if (i + 1 === elements_length) {
                    // Build the last sub array which contain delimiter number or less elements
                    myArrays[index + 1] = rowData.slice(first, i + 1);
                }
            }
            // Returned is an array of arrays
            return myArrays;
        }
    }

    // Find out how many array of 4 we created
    for (i = 0; i < splitElements.length; i++) {
        var date = splitElements[i][0] //
        var title = splitElements[i][1]
        var description = splitElements[i][2]
        var image = splitElements[i][3]
        var imageType = image.substr(image.length - 4);
        if (imageType == '.mp4' || imageType == 'mpeg' || imageType == '.avi'){
            var media = '<video width="100%" height="240" autoplay muted controls ><source src="'+image+'" type="video/mp4"></video>'
        } else {
            var media = '<div class="photo" style="background-image: url(' + image + ')"></div>'
        }

        //if array's index is an even number add class alt (changes image side from left to right)
        function isEven(value) {
            if (value % 2 == 0)
                return true;
            else
                return false;
        }

        //Start of article structure
        //Array's index is even => Do nothing
        if (isEven(i) == true) {
            var articleStructureOpening = '<div class="blog-card"><div class="meta">'
        } else {
            // Array's index is odd => add class alt
            var articleStructureOpening = '<div class="blog-card alt"><div class="meta">'
        }
        
        var details = '</div><div class="description">'
        var showTitle = '<h1>' + title + '</h1>'
        var showDate = '<p>'+date+'</p>'
        var showDescription = '<p>' + description + '</p>'
        articleStructureClosing = '</div>' + '</div>'
        articleStructureOpening += media += details += showTitle += showDate += showDescription += articleStructureClosing
        //End of article's structure

        //We add every article to the postArray
        postArray.push(articleStructureOpening)
    }
    // Reverse postArray to get last article first
    postArray.reverse()

    //Sort through the array and add every post to the div with class .posts
    for (i = 0; i < postArray.length; i++) {
        var fiveArticles = 5


/**
 * Returns an array with arrays of the given size.
 *
 * @param postArray {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function chunkArray(postArray, chunk_size){
    var index = 0;
    var arrayLength = postArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = postArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}
// Split in group of 3 items
var result = chunkArray(postArray, 5);
// Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]




        var article = postArray[i]
        var content = $('.posts')
        $(content).append(article)
    }
}

$(document).ready(function () {
    readData(); // Get the data from the google sheet

    // //when mouse hover image
    // $(".meta").mouseover(function () {
    //     $(this).addClass('active') /// if class active => width : 100%
    //     let descriptionActive = $(this).parent().children();
    //     let first = descriptionActive[1]
    //     $(first).addClass('active') // if image hover => text is small
    // });

    // // when image is NOT hover anymore => remove class active and back to normal
    // $(".meta").mouseleave(function () {
    //     $(this).removeClass('active')
    //     let descriptionActive = $('.description.active');
    //     descriptionActive.removeClass('active')
    // });
});
