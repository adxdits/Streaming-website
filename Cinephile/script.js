const API_KEY = "api_key=a1532e65c42177e50ebef70fe8a7a6a9";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.querySelector("#main");

function getMovies(url)
{
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    });
}

function showMovies(data)
{
    main.innerHTML = "";

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
        <div>${overview}</div>`

        main.appendChild(movieEl);
    });
}

function getColor(vote)
{
    if(vote >= 8)
    {
        return "green";
    }
    else if(vote >= 5)
    {
        return "orange";
    }
    else
    {
        return "red";
    }
}

getMovies(API_URL);