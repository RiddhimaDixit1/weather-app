const SearchCity = document.getElementById("searchcity");
const SearchButton = document.querySelector("button");
const cityName = document.querySelector(".cityname");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity h1");
const windspeed = document.querySelector(".windspeed h1");
const pressure = document.querySelector(".pressure h1");
async function getData(city) {
  try {
    let x = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=959f255e4359ed72c1303b6a9edd46de`,
    );
    if (!x.ok) {
      
      throw new Error("City not found");
    }
    const data = await x.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}
SearchButton.addEventListener("click", async () => {
  const city = SearchCity.value.trim();
  if (city.value != "") {
    SearchButton.textContent = "Searching...";
  }

  const data = await getData(city);
  if (data) {
    cityName.textContent = data.name + "," + data.sys.country;
    temp.textContent = Math.round(data.main.temp) + "°C";
    humidity.textContent = data.main.humidity + "%  ";
    windspeed.textContent = data.wind.speed + "m/s  ";
    pressure.textContent = data.main.pressure + " hPa";
  
  }
  SearchButton.textContent = "Search";
});
