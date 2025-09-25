const BASE_URL = 'https://v3.football.api-sports.io';
const LEAGUE_ID = 39; // Premier League
const SEASON = 2023;

// selector del DOM

const fixturesList = document.getElementById('fixtures');
const standingsList = document.getElementById('standings');

async function getFixtures() {
    const url = `${BASE_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}`;
    

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
        }
    });
    const data = await response.json();


    // limpiar lista 
    fixturesList.innerHTML = '';

    //recorrer  los partidos y agregarlos al html 
    data.response.forEach(fixture => {
        const li = document.createElement('li');
        const date = new Date(fixturesList.fixture.date);
        li.textContent = `${fixture.teams.home.name} vs ${fixture.teams.away.name} - ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        fixturesList.appendChild(li);
    });
}

async function getStandings() {
    const url = `${BASE_URL}/standings?league=${LEAGUE_ID}&season=${SEASON}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': api_key,
        }
    });

    const data = await response.json();

    // limpiar lista
    standingsList.innerHTML = '';

    // recorrer las clasificaciones y agregarlas al html
    data.response[0].league.standings[0].forEach(team => {
        const li = document.createElement('li');
        li.textContent = `${team.rank}. ${team.team.name} - Puntos: ${team.points}`;
        standingsList.appendChild(li);
    });
}   

// cargar datos al iniciar la pagina
window.addEventListener('DOMContentLoaded', () => {
    getFixtures();
    getStandings();
});