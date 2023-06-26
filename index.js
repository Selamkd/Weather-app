
window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temprature-degree');
    let temperatureDescription = document.querySelector('.temprature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temprature");
    let temperatureSpan= document.querySelector(".temprature span");
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long= position.coords.longitude;
            lat = position.coords.latitude;
          
           const api =  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=FTN4PASV7KB9RBQ5UZR4HV3SP`;
            
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data=>{
            console.log(data);
            const { temp , conditions,icon }=data.currentConditions;

            temperatureDegree.textContent = temp;
            temperatureDescription.textContent = conditions;
            locationTimezone.textContent=data.timezone;  
            setIcons(icon,document.querySelector(".icon")); 

            temperatureSection.addEventListener("click",()=>{
                if (temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                }else{
                    temperatureSpan.textContent = "F";
                }
            })

            
});


      
        });

    }
    function setIcons(icon, iconID) {
        const skycons= new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);


    }
});

