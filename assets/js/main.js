const API_KEY = 'e2ed82358911474ab0e160427242002';
const app = document.querySelector('.app')
const input = document.querySelector('input')
const imgWeather = document.querySelector('.weather-img img')
const temperature = document.querySelector('.temperature')
const condition = document.querySelector('.condition')
const time = document.querySelector('.time')
const address = document.querySelector('.address')
const windValue = document.querySelector('.section-value.wind')
const windSubValue = document.querySelector('.section-sub-value.wind')
const uvValue = document.querySelector('.section-value.uv')
const uvSubValue = document.querySelector('.section-sub-value.uv')
const cloudValue = document.querySelector('.section-value.cloud')
const cloudSubValue = document.querySelector('.section-sub-value.cloud')
const humidityValue = document.querySelector('.section-value.humidity')
const humiditySubValue = document.querySelector('.section-sub-value.humidity')
const realFeelValue = document.querySelector('.section-value.real-feel')
const realFeelSubValue = document.querySelector('.section-sub-value.real-feel')
const pressureSubValue = document.querySelector('.section-sub-value.pressure')
const pressureValue = document.querySelector('.section-value.pressure')
const gustValue = document.querySelector('.section-value.gust')
const gustSubValue = document.querySelector('.section-sub-value.gust')
const visValue = document.querySelector('.section-value.vis')
const visSubValue = document.querySelector('.section-sub-value.vis')
const countryValue = document.querySelector('.section-value.country')
const showMoreBtn = document.querySelector('.show-more')
const closeBtn = document.querySelector('.close')
const pageRight = document.querySelector('.page-right')

function changeInfoWeather(data) {
    imgWeather.setAttribute('src', `https:${data.current.condition.icon}`)
    temperature.innerHTML = `${data.current.temp_c}°C`
    condition.innerHTML = `${data.current.condition.text}`
    time.innerHTML = `${data.location.localtime}`
    address.innerHTML = `${data.location.name}`
    windValue.innerHTML = `${data.current.wind_kph} km/h`
    windSubValue.innerHTML = `${data.current.wind_dir}`
    uvValue.innerHTML = `${data.current.uv}`
    cloudValue.innerHTML = `${data.current.cloud}%`
    humidityValue.innerHTML = `${data.current.humidity}%`
    realFeelValue.innerHTML = `${data.current.temp_c}°C`
    pressureValue.innerHTML = `${data.current.pressure_mb} mb`
    gustValue.innerHTML = `${data.current.gust_kph} km/h`
    visValue.innerHTML = `${data.current.vis_km} km`
    countryValue.innerHTML = `${data.location.country}`

    // Uv description
    switch (data.current.uv) {
        case 1: case 2: {
            uvSubValue.innerHTML = 'Thấp'
            break
        }
        case 3: case 4: case 5: {
            uvSubValue.innerHTML = 'Vừa phải'
            break
        }
        case 6: case 7: {
            uvSubValue.innerHTML = 'Cao'
            break
        }
        case 8: case 9: case 10: {
            uvSubValue.innerHTML = 'Rất cao'
            break
        }
        default: {
            uv.uvSubValue.innerHTML = 'Có hại'
        }
    }

    // Humidity dscription
    const humidityLevel = Math.floor(data.current.humidity / 10);

    const humidityLevels = [
        'Cực kì khô hạn',
        'Khô hạn',
        'Cực kỳ thấp',
        'Rất thấp',
        'Thấp',
        'Trung bình',
        'Khá vừa',
        'Vừa',
        'Tương đối cao',
        'Cao'
    ];
    humiditySubValue.innerHTML = humidityLevels[humidityLevel];


    // Gust description
    const gustLevel = data.current.gust_kph
    if (gustLevel < 1) {
        gustSubValue.innerHTML = 'Cấp 0'
    } else if (gustLevel <= 5) {
        gustSubValue.innerHTML = 'Cấp 1'
    } else if (gustLevel <= 11) {
        gustSubValue.innerHTML = 'Cấp 2'
    } else if (gustLevel <= 19) {
        gustSubValue.innerHTML = 'Cấp 3'
    } else if (gustLevel <= 28) {
        gustSubValue.innerHTML = 'Cấp 4'
    } else if (gustLevel <= 38) {
        gustSubValue.innerHTML = 'Cấp 5'
    } else if (gustLevel <= 49) {
        gustSubValue.innerHTML = 'Cấp 6'
    } else if (gustLevel <= 61) {
        gustSubValue.innerHTML = 'Cấp 7'
    } else if (gustLevel <= 74) {
        gustSubValue.innerHTML = 'Cấp 8'
    } else if (gustLevel <= 88) {
        gustSubValue.innerHTML = 'Cấp 9'
    } else if (gustLevel <= 102) {
        gustSubValue.innerHTML = 'Cấp 10'
    } else if (gustLevel <= 117) {
        gustSubValue.innerHTML = 'Cấp 11'
    } else if (gustLevel <= 133) {
        gustSubValue.innerHTML = 'Cấp 12'
    } else if (gustLevel <= 149) {
        gustSubValue.innerHTML = 'Cấp 13'
    } else if (gustLevel <= 166) {
        gustSubValue.innerHTML = 'Cấp 14'
    } else if (gustLevel <= 183) {
        gustSubValue.innerHTML = 'Cấp 15'
    } else if (gustLevel <= 201) {
        gustSubValue.innerHTML = 'Cấp 16'
    } else {
        gustSubValue.innerHTML = 'Cấp 17'
    }

    // Temperature description
    const temperatureLevel = data.current.temp_c
    if (temperatureLevel <= -40) {
        realFeelSubValue.innerHTML = 'Cực lạnh'
    } else if (temperatureLevel <= -20) {
        realFeelSubValue.innerHTML = 'Rất lạnh'
    } else if (temperatureLevel <= 0) {
        realFeelSubValue.innerHTML = 'Lạnh'
    } else if (temperatureLevel <= 10) {
        realFeelSubValue.innerHTML = 'Ôn hòa'
    } else if (temperatureLevel <= 15) {
        realFeelSubValue.innerHTML = 'Hơi lạnh'
    } else if (temperatureLevel <= 20) {
        realFeelSubValue.innerHTML = 'Mát mẻ'
    } else if (temperatureLevel <= 25) {
        realFeelSubValue.innerHTML = 'Ấm áp'
    } else if (temperatureLevel <=30) {
        realFeelSubValue.innerHTML = 'Nóng'
    } else if (temperatureLevel <=40) {
        realFeelSubValue.innerHTML = 'Rất nóng'
    } else {
        realFeelSubValue.innerHTML = 'Cực nóng'
    }

    // Cloud description
    const cloudLevel = data.current.cloud
    if (cloudLevel === 0) {
        cloudSubValue.innerHTML = 'Trời hoàn toàn quang đãng'
    } else if (cloudLevel <= 10){
        cloudSubValue.innerHTML = 'Gần như quang đãng'
    } else if (cloudLevel <= 25){
        cloudSubValue.innerHTML = 'Ít mây'
    } else if (cloudLevel <= 50){
        cloudSubValue.innerHTML = 'Trời phần mây'
    } else if (cloudLevel <= 70){
        cloudSubValue.innerHTML = 'Mây vừa'
    } else if (cloudLevel <= 90){
        cloudSubValue.innerHTML = 'Nhiều mây'
    } else {
        cloudSubValue.innerHTML = 'U ám'
    }

    // Pressure description
    const pressureLevel = data.current.pressure_mb
    if (pressureLevel < 1000) {
        pressureSubValue.innerHTML = 'Thấp'
    } else if (pressureLevel <= 1013.25) {
        pressureSubValue.innerHTML = 'Trung bình'
    } else {
        pressureSubValue.innerHTML = 'Cao'
    }

    // Vis description
    const visLevel = data.current.vis_km
    if (visLevel < 1) {
        visSubValue.innerHTML = 'Rất hạn chế'
    } else if (visLevel <= 5) {
        visSubValue.innerHTML = 'Hạn chế'
    } else if (visLevel <= 10) {
        visSubValue.innerHTML = 'Trung bình'
    } else {
        visSubValue.innerHTML = 'Tốt'
    }
}

input.addEventListener('change', (e) => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${e.target.value}&lang=vi`)
        .then(async res => {
            const data = await res.json()
            console.log(data)
            changeInfoWeather(data)
        })
})

showMoreBtn.addEventListener('click', () => {
    app.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    app.classList.remove('show')
})
