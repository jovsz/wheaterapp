module.exports = {
    key: 'f4b1bc3b02fbcd69291f6248e78d31ff',
    base: "https://api.openweathermap.org/data/2.5/",
};

const GetWheater = (Apikey, location) => {
    const url = `${Apikey.base}weather?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&units=metric&APPID=${Apikey.key}`  
    fetch(url)
    .then(res => res.json())
    .then((data) => console.log(data))
} 