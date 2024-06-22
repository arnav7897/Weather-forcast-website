const button = document.getElementById("search");
const cityname = document.getElementById("input");
const current = document.getElementById("active");

// Elements to be changed
const s_city = document.getElementsByClassName('s_city')[0];
const s_region = document.getElementsByClassName('s_region')[0];
const s_time = document.getElementsByClassName('s_time')[0];
const img = document.getElementById('img');
const condition = document.getElementById('condition');
const temp = document.getElementById('temp');
const feel = document.getElementById('feel');
const pressure = document.getElementById('pressure');
const wind = document.getElementById('wind');
const uv = document.getElementById('uv');
const co = document.getElementById('co');
const no2 = document.getElementById('no2');
const so2 = document.getElementById('so2');

// Function to fetch data from the weather API
async function getdata(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=47df694ac83b441b8fd101643241606&q=${city}&aqi=yes`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to fetch data. Please check the city name and try again.');
    }
}

// for current locations
async function getdata2(lati,longi) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=47df694ac83b441b8fd101643241606&q=${lati},${longi}&aqi=yes`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to fetch data. Please check the city name and try again.');
    }
}


button.addEventListener('click', async () => {
    const city = cityname.value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    console.log('Fetching data for city:', city);

    // loading 
    button.disabled = true;
    button.innerHTML = 'Loading...';

    const result = await getdata(city);

    button.disabled = false;
    button.innerHTML = 'Search';

    if (result) {
        console.log('Data fetched:', result);

        s_city.innerHTML = result.location.name;
        s_region.innerHTML = `${result.location.region}, ${result.location.country}`;
        s_time.innerHTML = result.location.localtime;
        img.src = result.current.condition.icon;
        img.alt = result.current.condition.text;
        condition.innerHTML = result.current.condition.text;
        temp.innerHTML = `${result.current.temp_c} degree celcius`;
        feel.innerHTML = `${result.current.feelslike_c} degree celcius`;
        pressure.innerHTML = `${result.current.pressure_mb} mb`;
        wind.innerHTML = `${result.current.wind_kph} kph`;
        uv.innerHTML = result.current.uv;
        co.innerHTML = ` CO = ${result.current.air_quality.co.toFixed(2)}`;
        no2.innerHTML = `NO2 = ${result.current.air_quality.no2.toFixed(2)}`;
        so2.innerHTML = `SO2 = ${result.current.air_quality.so2.toFixed(2)}`;
    }
});

async function Failed(){
    alert("Unable to fetch your current location kindly use search bar ");
}
current.addEventListener('click',async ()=>{
    navigator.geolocation.getCurrentPosition(async (position)=>{
        const lat = position.coords.latitude;
        const longi = position.coords.longitude;
        const result = await getdata2(lat,longi);
        if (result) {
            console.log('Data fetched:', result);
    
            s_city.innerHTML = result.location.name;
            s_region.innerHTML = `${result.location.region}, ${result.location.country}`;
            s_time.innerHTML = result.location.localtime;
            img.src = result.current.condition.icon;
            img.alt = result.current.condition.text;
            condition.innerHTML = result.current.condition.text;
            temp.innerHTML = `${result.current.temp_c} degree celcius`;
            feel.innerHTML = `${result.current.feelslike_c} degree celcius`;
            pressure.innerHTML = `${result.current.pressure_mb} mb`;
            wind.innerHTML = `${result.current.wind_kph} kph`;
            uv.innerHTML = result.current.uv;
            co.innerHTML = ` CO = ${result.current.air_quality.co.toFixed(2)}`;
            no2.innerHTML = `NO2 = ${result.current.air_quality.no2.toFixed(2)}`;
            so2.innerHTML = `SO2 = ${result.current.air_quality.so2.toFixed(2)}`;
        }
    },Failed);
    
})