const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = $('.app')
const input = $('input')
const imgWeather = $('.weather-img img')
const temperature = $('.temperature')
const condition = $('.condition')
const time = $('.time')
const address = $('.address')
const windValue = $('.section-value.wind')
const windSubValue = $('.section-sub-value.wind')
const uvValue = $('.section-value.uv')
const uvSubValue = $('.section-sub-value.uv')
const cloudValue = $('.section-value.cloud')
const cloudSubValue = $('.section-sub-value.cloud')
const humidityValue = $('.section-value.humidity')
const humiditySubValue = $('.section-sub-value.humidity')
const realFeelValue = $('.section-value.real-feel')
const realFeelSubValue = $('.section-sub-value.real-feel')
const pressureSubValue = $('.section-sub-value.pressure')
const pressureValue = $('.section-value.pressure')
const gustValue = $('.section-value.gust')
const gustSubValue = $('.section-sub-value.gust')
const visValue = $('.section-value.vis')
const visSubValue = $('.section-sub-value.vis')
const countryValue = $('.section-value.country')
const showMoreBtn = $('.show-more')
const closeBtn = $('.close')
const pageRight = $('.page-right')
const searchHistory = $('.search-history')

const weatherApp = (() => {
    const currentDate = new Date()
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
    const currentDateIndex = currentDate.getDay()
    const currentDateName = daysOfWeek[currentDateIndex]
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    const arrSearchHistory = []

    return {
        handleEvent() {
            const API_KEY = 'e2ed82358911474ab0e160427242002'

            input.addEventListener('blur', (e) => {
                if (e.target.value !== '') {
                    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${e.target.value}&lang=vi`)
                        .then(async res => {
                            // res.ok là một thuộc tính của đối tượng phản hồi từ yêu cầu mạng, 
                            // mà nó trả về giá trị true nếu mã trạng thái HTTP là trong phạm vi từ 200 đến 299 
                            // (tức là yêu cầu mạng thành công), và false trong trường hợp khác.
                            if (!res.ok) {
                                alert('Không tìm thấy vị trí này!')
                                return
                            } else {
                                const data = await res.json()
                                console.log(data)
                                this.addValueSearch(e.target.value)
                                this.changeWeatherInfomation(data)
                                input.value = ''
                                input.blur()
                            }
                        })
                        .catch(error => {
                            console.error('Lỗi:', error.message);
                        })
                }
                input.style.borderRadius = '20px'
            })

            input.addEventListener('focus', () => {
                const dataSearch = arrSearchHistory
                if (arrSearchHistory.length !== 0) {
                    this.renderSearch(dataSearch)
                    input.style.borderRadius = '20px 20px 0 0'
                    searchHistory.style.maxHeight = '50vh'
                }
            })

            showMoreBtn.addEventListener('click', () => {
                app.classList.add('show')
            })

            closeBtn.addEventListener('click', () => {
                app.classList.remove('show')
            })

            searchHistory.addEventListener('mousedown', (e) => {
                e.preventDefault()
            })

            searchHistory.addEventListener('click', (e) => {
                const item = e.target.closest('.item')

                if (item) {
                    const valueItem = item.querySelector('.name-history').innerText.trim()
                    console.log(item, valueItem)
                    input.value = valueItem
                    input.blur()
                }
            })
        },
        addValueSearch(value) {
            if (!arrSearchHistory.includes(value)) {
                arrSearchHistory.push(value)
                console.log(arrSearchHistory)
            }
        },
        changeWeatherInfomation(data) {
            imgWeather.setAttribute('src', `https:${data.current.condition.icon}`)
            temperature.innerHTML = `${data.current.temp_c}°C`
            condition.innerHTML = `${data.current.condition.text}`
            time.innerHTML = `${currentDateName}, ${day}/${month}/${year}`
            address.innerHTML = `<i class="fa-light fa-location-dot"></i>${data.location.name}`
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

            this.renderSubValueUv(data)
            this.renderSubValueCloud(data)
            this.renderSubValuePressure(data)
            this.renderSubValueTemperature(data)
            this.renderSubValueGust(data)
            this.renderSubValueCloud(data)
            this.renderSubValueHumidity(data)
            this.renderSubValueVis(data)
        },
        renderSearch(data) {
            const htmls = data.map(childData => {
                return `
                <div class="item">
                    <div class="icon-history">
                        <i class="fa-light fa-clock-rotate-left"></i>
                    </div>
                    <span class="name-history">${childData}</span>
                </div>
                `
            }).join('')
            searchHistory.innerHTML = htmls
        },
        renderSubValueUv(data) {
            const uvLevel = data.current.uv
            switch (uvLevel) {
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
        },
        renderSubValueHumidity(data) {
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
            humiditySubValue.innerHTML = humidityLevels[humidityLevel]
        },
        renderSubValueGust(data) {
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
        },
        renderSubValueTemperature(data) {
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
            } else if (temperatureLevel <= 30) {
                realFeelSubValue.innerHTML = 'Nóng'
            } else if (temperatureLevel <= 40) {
                realFeelSubValue.innerHTML = 'Rất nóng'
            } else {
                realFeelSubValue.innerHTML = 'Cực nóng'
            }
        },
        renderSubValueCloud(data) {
            const cloudLevel = data.current.cloud
            if (cloudLevel === 0) {
                cloudSubValue.innerHTML = 'Trời hoàn toàn quang đãng'
            } else if (cloudLevel <= 10) {
                cloudSubValue.innerHTML = 'Gần như quang đãng'
            } else if (cloudLevel <= 25) {
                cloudSubValue.innerHTML = 'Ít mây'
            } else if (cloudLevel <= 50) {
                cloudSubValue.innerHTML = 'Trời phần mây'
            } else if (cloudLevel <= 70) {
                cloudSubValue.innerHTML = 'Mây vừa'
            } else if (cloudLevel <= 90) {
                cloudSubValue.innerHTML = 'Nhiều mây'
            } else {
                cloudSubValue.innerHTML = 'U ám'
            }
        },
        renderSubValuePressure(data) {
            const pressureLevel = data.current.pressure_mb
            if (pressureLevel < 1000) {
                pressureSubValue.innerHTML = 'Thấp'
            } else if (pressureLevel <= 1013.25) {
                pressureSubValue.innerHTML = 'Trung bình'
            } else {
                pressureSubValue.innerHTML = 'Cao'
            }
        },
        renderSubValueVis(data) {
            const visLevel = data.current.vis_km
            console.log(visLevel)
            if (visLevel < 1) {
                visSubValue.innerHTML = 'Rất hạn chế'
            } else if (visLevel <= 5) {
                visSubValue.innerHTML = 'Hạn chế'
            } else if (visLevel <= 10) {
                visSubValue.innerHTML = 'Trung bình'
            } else {
                visSubValue.innerHTML = 'Tốt'
            }
        },
        start() {
            this.handleEvent()
        }
    }
})()

weatherApp.start()