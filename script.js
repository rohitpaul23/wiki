const img = document.querySelector('img');
const content = document.querySelector('.content');
const body = document.querySelector('body');

const header = document.createElement('div');
header.classList.add('header');
header.textContent = 'Search Your Way Out !!';

content.appendChild(header);

const searchArea = document.createElement('div');
searchArea.classList.add('search');
const inputSearch = document.createElement('input');
inputSearch.classList.add('input');
searchArea.appendChild(inputSearch);

content.appendChild(searchArea);

const searchResult = document.createElement('div');
searchResult.classList.add('result');

const imgArea = document.createElement('img');
imgArea.classList.add('image');
const descArea = document.createElement('div');
descArea.classList.add('desc');

searchResult.appendChild(imgArea);
searchResult.appendChild(descArea);

content.appendChild(searchResult);

const footer = document.createElement('div');
footer.classList.add('footer');
footer.textContent = '@rohitpaul97';

content.appendChild(footer);


const load = document.createElement('img');
load.src = 'loading.gif';
load.id = 'loading';
body.appendChild(load);

const weather_url = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ea8e078bca587f432278bfcb5b742c54';
const api = 'vKm9LIZOAvgwmGd5HVRwnW8I7dJ0g9YW';
const giphy_url = 'https://api.giphy.com/v1/gifs/translate?api_key='+ api +'&s=';
const wiki_url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=10&gsrsearch=';

function loadingfunc(){
    load.style.display = 'block';
    content.style.opacity = 0.01;
}

function getBody(){
    content.style.opacity = 1;
    load.style.display = 'none';
}

async function getGif(searchValue){
    const response = await fetch(giphy_url+searchValue, {mode: 'cors'});
    const searchData = await response.json();
    imgArea.src = searchData.data.images.original.url;
}

async function getWiki(searchValue){
    const response = await fetch(wiki_url+searchValue, {mode: 'cors'});
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const searchData = await response.json();
    for (var i in searchData.query.pages) {
        console.log(searchData.query.pages[i].title);
        let item = document.createElement('a');
        item.classList.add('item');
        item.target = '_blank';
        item.href = "https://en.wikipedia.org/wiki/" + searchData.query.pages[i].title;
        item.textContent = searchData.query.pages[i].title;
        descArea.appendChild(item);
    }
    console.log(searchData.query);
}

inputSearch.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        loadingfunc();
        const search = inputSearch.value;
        getGif(search);  
        getWiki(search);  
        setTimeout(getBody, 1000);
    }
})

