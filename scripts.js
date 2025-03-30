// Mock data for the weather dashboard
const mockData = {
    current: {
        location: "Tokyo, Japan",
        date: "Sunday, March 30, 2025",
        time: "15:45",
        temperature: 24,
        feelsLike: 26,
        weatherDescription: "Partly Cloudy",
        weatherIcon: "cloud-sun",
        wind: 12,
        humidity: 65,
        visibility: 10,
        pressure: 1013,
        uvIndex: 6,
        sunrise: "06:12",
        sunset: "18:45",
        precipitation: 4.2,
        airQuality: 42
    },
    forecast: {
        daily: [
            {
                day: "Mon",
                date: "Mar 31",
                icon: "sun",
                tempMax: 26,
                tempMin: 19,
                precipitation: 0
            },
            {
                day: "Tue",
                date: "Apr 1",
                icon: "cloud-sun",
                tempMax: 25,
                tempMin: 18,
                precipitation: 10
            },
            {
                day: "Wed",
                date: "Apr 2",
                icon: "cloud-rain",
                tempMax: 22,
                tempMin: 17,
                precipitation: 60
            },
            {
                day: "Thu",
                date: "Apr 3",
                icon: "cloud-showers-heavy",
                tempMax: 20,
                tempMin: 16,
                precipitation: 80
            },
            {
                day: "Fri",
                date: "Apr 4",
                icon: "cloud",
                tempMax: 23,
                tempMin: 17,
                precipitation: 30
            }
        ],
        hourly: [
            {
                time: "16:00",
                icon: "cloud-sun",
                temp: 24,
                precipitation: 0
            },
            {
                time: "17:00",
                icon: "cloud",
                temp: 23,
                precipitation: 10
            },
            {
                time: "18:00",
                icon: "cloud",
                temp: 22,
                precipitation: 20
            },
            {
                time: "19:00",
                icon: "cloud-moon",
                temp: 21,
                precipitation: 10
            },
            {
                time: "20:00",
                icon: "moon",
                temp: 20,
                precipitation: 0
            }
        ]
    },
    locations: [
        "Tokyo, Japan",
        "New York, USA",
        "London, UK",
        "Sydney, Australia",
        "Paris, France",
        "Berlin, Germany",
        "Moscow, Russia",
        "Beijing, China",
        "Cairo, Egypt",
        "Rio de Janeiro, Brazil"
    ]
};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Set current weather data
    updateCurrentWeather(mockData.current);
    
    // Generate forecast cards
    generateForecastCards('daily');
    
    // Initialize event listeners
    initializeEventListeners();
});

// Update current weather display
function updateCurrentWeather(data) {
    document.getElementById('current-location').textContent = data.location;
    document.getElementById('current-date').textContent = data.date;
    document.getElementById('current-time').textContent = data.time;
    document.getElementById('current-temp').textContent = `${data.temperature}°C`;
    document.getElementById('feels-like').textContent = `${data.feelsLike}°C`;
    document.getElementById('weather-description').textContent = data.weatherDescription;
    document.getElementById('weather-icon-main').className = `fas fa-${data.weatherIcon}`;
    document.getElementById('wind-speed').textContent = `${data.wind} km/h`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('uv-index').textContent = data.uvIndex + ' - ' + getUVIndexCategory(data.uvIndex);
    document.getElementById('sunrise-time').textContent = `${data.sunrise} AM`;
    document.getElementById('sunset-time').textContent = `${data.sunset} PM`;
    document.getElementById('precipitation').textContent = `${data.precipitation} mm in last 24h`;
    document.getElementById('air-quality').textContent = `${getAirQualityCategory(data.airQuality)} - AQI ${data.airQuality}`;
    
    // Update UV meter
    const uvMeter = document.querySelector('.uv-level');
    uvMeter.style.width = `${(data.uvIndex / 11) * 100}%`;
    
    // Update air quality meter
    const aqiMeter = document.querySelector('.air-quality-level');
    aqiMeter.style.width = `${(data.airQuality / 300) * 100}%`;
}

// Generate forecast cards based on type (daily or hourly)
function generateForecastCards(type) {
    const forecastContainer = document.getElementById('forecast-cards');
    forecastContainer.innerHTML = '';
    
    const forecastData = type === 'daily' ? mockData.forecast.daily : mockData.forecast.hourly;
    const timeProperty = type === 'daily' ? 'day' : 'time';
    
    forecastData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        // Create card content based on forecast type
        if (type === 'daily') {
            card.innerHTML = `
                <div class="forecast-day">${item.day}</div>
                <div class="forecast-date">${item.date}</div>
                <i class="fas fa-${item.icon} forecast-icon"></i>
                <div class="forecast-temp">${item.tempMax}°<span>${item.tempMin}°</span></div>
                <div class="forecast-precip">
                    <i class="fas fa-tint" style="font-size: 0.8rem; color: rgba(122, 186, 255, 0.8);"></i>
                    <span>${item.precipitation}%</span>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="forecast-day">${item.time}</div>
                <i class="fas fa-${item.icon} forecast-icon"></i>
                <div class="forecast-temp">${item.temp}°</div>
                <div class="forecast-precip">
                    <i class="fas fa-tint" style="font-size: 0.8rem; color: rgba(122, 186, 255, 0.8);"></i>
                    <span>${item.precipitation}%</span>
                </div>
            `;
        }
        
        forecastContainer.appendChild(card);
    });
    
    // Add glowing effect to first card
    const firstCard = forecastContainer.querySelector('.forecast-card');
    if (firstCard) {
        firstCard.classList.add('glow-effect');
    }
}

// Initialize all event listeners
function initializeEventListeners() {
    // Toggle filter dropdown
    const filterToggle = document.getElementById('filter-toggle');
    const filterDropdown = document.querySelector('.filter-dropdown');
    
    filterToggle.addEventListener('click', function() {
        filterDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.filter-container')) {
            filterDropdown.classList.remove('active');
        }
    });
    
    // Toggle between hourly and daily forecast
    const hourlyBtn = document.getElementById('hourly-btn');
    const dailyBtn = document.getElementById('daily-btn');
    
    hourlyBtn.addEventListener('click', function() {
        hourlyBtn.classList.add('active');
        dailyBtn.classList.remove('active');
        generateForecastCards('hourly');
    });
    
    dailyBtn.addEventListener('click', function() {
        dailyBtn.classList.add('active');
        hourlyBtn.classList.remove('active');
        generateForecastCards('daily');
    });
    
    // Toggle map display type
    const mapBtns = document.querySelectorAll('.map-btn');
    
    mapBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            mapBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Here we would update the map, but since it's just a placeholder, we'll just show an alert
            const mapType = this.getAttribute('data-type');
            console.log(`Map changed to ${mapType} view`);
        });
    });
    
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('location-search');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchLocation(searchTerm);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                searchLocation(searchTerm);
            }
        }
    });
    
    // Initialize auto-complete for search
    initializeAutocomplete();
    
    // Toggle unit (Celsius/Fahrenheit)
    const unitSelector = document.getElementById('unit-selector');
    
    unitSelector.addEventListener('change', function() {
        updateTemperatureUnits(this.value);
    });
    
    // Toggle time format (12h/24h)
    const timeFormatSelector = document.getElementById('time-format');
    
    timeFormatSelector.addEventListener('change', function() {
        updateTimeFormat(this.value);
    });
}

// Search for a location (using mock data)
function searchLocation(searchTerm) {
    // In a real app, this would call an API. For now, we'll simulate it
    const foundLocation = mockData.locations.find(location => 
        location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (foundLocation) {
        // Update location name
        document.getElementById('current-location').textContent = foundLocation;
        
        // Simulate loading with glow effect
        const currentWeather = document.querySelector('.current-weather');
        currentWeather.classList.add('glow-effect');
        
        setTimeout(() => {
            currentWeather.classList.remove('glow-effect');
            
            // Generate random weather variations
            const randomTemp = Math.floor(Math.random() * 15) + 15; // 15-30°C
            const updatedWeather = {
                ...mockData.current,
                location: foundLocation,
                temperature: randomTemp,
                feelsLike: randomTemp + Math.floor(Math.random() * 4),
                humidity: Math.floor(Math.random() * 30) + 50
            };
            
            // Update display
            updateCurrentWeather(updatedWeather);
        }, 800);
    } else {
        // Show error message (in a real app, use a proper notification)
        alert(`Location "${searchTerm}" not found. Try one of: Tokyo, New York, London, Sydney, Paris`);
    }
}

// Initialize autocomplete for search input
function initializeAutocomplete() {
    const searchInput = document.getElementById('location-search');
    
    // Simple implementation for demo purposes
    searchInput.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase();
        
        if (inputValue.length < 2) return;
        
        // In a real app, you would show a dropdown with suggestions
        // For this demo, we'll just log potential matches
        const matches = mockData.locations.filter(location => 
            location.toLowerCase().includes(inputValue)
        );
        
        console.log('Potential location matches:', matches);
    });
}

// Toggle between Celsius and Fahrenheit
function updateTemperatureUnits(unit) {
    const tempElements = [
        { id: 'current-temp', value: mockData.current.temperature },
        { id: 'feels-like', value: mockData.current.feelsLike }
    ];
    
    tempElements.forEach(el => {
        const element = document.getElementById(el.id);
        if (unit === 'fahrenheit') {
            const fahrenheit = Math.round(el.value * 9/5 + 32);
            element.textContent = `${fahrenheit}°F`;
        } else {
            element.textContent = `${el.value}°C`;
        }
    });
    
    // Update forecast cards as well
    const forecastTemp = document.querySelectorAll('.forecast-temp');
    forecastTemp.forEach(el => {
        const text = el.textContent;
        const temps = text.match(/\d+/g);
        
        if (temps && temps.length) {
            if (unit === 'fahrenheit') {
                const mainTemp = Math.round(parseInt(temps[0]) * 9/5 + 32);
                let newText = `${mainTemp}°F`;
                
                if (temps.length > 1) {
                    const minTemp = Math.round(parseInt(temps[1]) * 9/5 + 32);
                    newText += `<span>${minTemp}°F</span>`;
                }
                
                el.innerHTML = newText;
            } else {
                // For demo purposes, we'll just revert to original values by refreshing the forecast
                const activeBtn = document.querySelector('.toggle-btn.active');
                generateForecastCards(activeBtn.id === 'daily-btn' ? 'daily' : 'hourly');
            }
        }
    });
}

// Update time format (12h/24h)
function updateTimeFormat(format) {
    // For demo purposes only - in a real app, this would update all time displays
    const currentTime = document.getElementById('current-time');
    const time = currentTime.textContent;
    const timeParts = time.split(':');
    
    if (format === '12h') {
        let hour = parseInt(timeParts[0]);
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        currentTime.textContent = `${hour}:${timeParts[1]} ${period}`;
    } else {
        // For demo purposes, we'll just revert to the original 24h format
        currentTime.textContent = mockData.current.time;
    }
}

// Helper function to get UV index category
function getUVIndexCategory(index) {
    if (index <= 2) return 'Low';
    if (index <= 5) return 'Moderate';
    if (index <= 7) return 'High';
    if (index <= 10) return 'Very High';
    return 'Extreme';
}

// Helper function to get air quality category
function getAirQualityCategory(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Add animated pulse effect to map
function initMapPulseEffect() {
    const pulseElement = document.querySelector('.pulse-effect');
    if (pulseElement) {
        // Animation is handled by CSS, but we could add additional effects here
    }
}

// Initialize the pulse effect
initMapPulseEffect();

// Add some random visual updates every few seconds to simulate real-time data
function simulateRealTimeUpdates() {
    // Update time every minute
    setInterval(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('current-time').textContent = `${hours}:${minutes}`;
    }, 60000);
    
    // Small temperature fluctuations
    setInterval(() => {
        const tempElement = document.getElementById('current-temp');
        const currentTemp = parseInt(tempElement.textContent);
        const fluctuation = Math.random() > 0.5 ? 0.1 : -0.1;
        const newTemp = (currentTemp + fluctuation).toFixed(1);
        
        // Update with a subtle animation
        tempElement.style.transition = 'transform 0.5s ease';
        tempElement.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            tempElement.textContent = `${newTemp}°C`;
            tempElement.style.transform = 'scale(1)';
        }, 300);
    }, 30000);
}

// Start real-time updates simulation
simulateRealTimeUpdates();