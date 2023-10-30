const accessKey = 'pIN32WBtMbFrgtjhSPeon50OFL4zbjkQei6txQ14-k4';

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=12`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${accessKey}`
            }
        });
        const data = await response.json();
        const results = data.results;

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small; // 'src' instead of 'scr'
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });


    } catch (error) {
        console.error("An error occurred:", error);
    }


    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ''; // Clear previous results
    searchImage();
});

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImage();
})
