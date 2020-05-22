window.addEventListener('load', ()=>{
    let long;
    let latitud;
    let temperatureDescription = document.querySelector('.temperatura-descripcion');
    let temperatureGrados = document.querySelector('.temperatura-grados');
    let locationTimezone = document.querySelector('.location-timezone');
    let iconUse;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            latitud = position.coords.latitude;
            //console.log(position);
            
            const proxy = "https://cors-anywhere.herokuapp.com/"; 
            const api = `${proxy}http://api.weatherstack.com/current?access_key=fe277ab3f7809f615e9582a0cdd9dbcc&query=mexico`;
            /*
            //const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad/${latitud},${long}`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${latitud}&lon=${long}&appid={9fba32284ad39ff767ac678913f4d0e2}`;
            */
            fetch(api)
                .then(response => {
                    return response.json();   
                })
                .then(data => {
                    console.log(data); 
                    const {temperature,weather_descriptions} = data.current;
                    //Colocando los elementos DOM de la API
                    temperatureGrados.textContent = temperature;
                    if(weather_descriptions == 'Patchy rain possible'){
                        temperatureDescription.textContent = 'Posibles chubascos';
                    }
                    //temperatureDescription.textContent = weather_descriptions;
                    locationTimezone.textContent = data.location.name; 
                    //SetIcons
                    iconUse = JSON.stringify(weather_descriptions);
                    setIcon(iconUse,document.querySelector('.icon '));
                });
        });
    }

    function setIcon(icon, iconID){
        const skycons = new Skycons({color: "white"});
        //var str = "Visit Microsoft!";
        //var res = str.replace("Microsoft", "W3Schools");
        //const currentIcon = icon.replace("\\s", "_").toUpperCase();
        //alert(currentIcon);
        skycons.play();
        //alert(currentIcon);
        const currentIcon = "partly_cloudy_day".toUpperCase();
        return skycons.set(iconID,Skycons[currentIcon]); 
    }
});