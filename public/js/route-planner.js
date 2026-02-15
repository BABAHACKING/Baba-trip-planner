// Route Planner JavaScript

// State Management
const state = {
    currentStep: 0,
    people: 2,
    vibe: '',
    themes: [],
    duration: 7,
    startingPoint: '',
    route: null
};

// Indian Cities Database
const indianCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai',
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Varanasi', 'Agra', 'Amritsar', 'Goa', 'Kochi',
    'Udaipur', 'Jodhpur', 'Mysore', 'Rishikesh', 'Darjeeling',
    'Shimla', 'Manali', 'Leh', 'Srinagar', 'Gangtok',
    'Prayagraj', 'Mathura', 'Ayodhya', 'Haridwar', 'Pushkar'
];

// Destinations Database with real coordinates
const destinations = {
    mountains: [
        { name: 'Leh-Ladakh', lat: 34.1526, lng: 77.5771, desc: 'Breathtaking Himalayan landscapes' },
        { name: 'Manali', lat: 32.2432, lng: 77.1892, desc: 'Scenic hill station' },
        { name: 'Shimla', lat: 31.1048, lng: 77.1734, desc: 'Queen of Hills' },
        { name: 'Darjeeling', lat: 27.0410, lng: 88.2663, desc: 'Tea gardens and mountain views' },
        { name: 'Rishikesh', lat: 30.0869, lng: 78.2676, desc: 'Yoga capital by Ganges' }
    ],
    beaches: [
        { name: 'Goa', lat: 15.2993, lng: 74.1240, desc: 'Beach paradise' },
        { name: 'Gokarna', lat: 14.5479, lng: 74.3188, desc: 'Serene beaches' },
        { name: 'Andaman Islands', lat: 11.7401, lng: 92.6586, desc: 'Tropical paradise' },
        { name: 'Varkala', lat: 8.7379, lng: 76.7163, desc: 'Cliff beaches' },
        { name: 'Puri', lat: 19.8135, lng: 85.8312, desc: 'Sacred coastal city' }
    ],
    deserts: [
        { name: 'Jaisalmer', lat: 26.9157, lng: 70.9083, desc: 'Golden city' },
        { name: 'Pushkar', lat: 26.4899, lng: 74.5511, desc: 'Desert oasis' },
        { name: 'Bikaner', lat: 28.0229, lng: 73.3119, desc: 'Camel country' },
        { name: 'Rann of Kutch', lat: 23.7337, lng: 69.8597, desc: 'White desert' }
    ],
    temples: [
        { name: 'Varanasi', lat: 25.3176, lng: 82.9739, desc: 'Spiritual capital' },
        { name: 'Ayodhya', lat: 26.7922, lng: 82.1998, desc: 'Sacred pilgrimage' },
        { name: 'Mathura', lat: 27.4924, lng: 77.6737, desc: 'Birthplace of Krishna' },
        { name: 'Haridwar', lat: 29.9457, lng: 78.1642, desc: 'Gateway to Gods' },
        { name: 'Puri', lat: 19.8135, lng: 85.8312, desc: 'Jagannath Temple' },
        { name: 'Madurai', lat: 9.9252, lng: 78.1198, desc: 'Meenakshi Temple' }
    ],
    cities: [
        { name: 'Delhi', lat: 28.7041, lng: 77.1025, desc: 'Historic capital' },
        { name: 'Agra', lat: 27.1767, lng: 78.0081, desc: 'Home of Taj Mahal' },
        { name: 'Jaipur', lat: 26.9124, lng: 75.7873, desc: 'Pink City' },
        { name: 'Udaipur', lat: 24.5854, lng: 73.7125, desc: 'City of Lakes' },
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777, desc: 'City of Dreams' }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateProgressIndicator();
});

function initializeEventListeners() {
    // Welcome screen
    document.querySelector('.start-btn').addEventListener('click', startWizard);
    
    // People counter
    document.getElementById('decrementPeople').addEventListener('click', () => changePeople(-1));
    document.getElementById('incrementPeople').addEventListener('click', () => changePeople(1));
    
    // Vibe cards
    document.querySelectorAll('.vibe-card').forEach(card => {
        card.addEventListener('click', () => selectVibe(card));
    });
    
    // Theme cards
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => toggleTheme(card));
    });
    
    // Duration slider
    const slider = document.getElementById('durationSlider');
    slider.addEventListener('input', (e) => {
        state.duration = parseInt(e.target.value);
        document.getElementById('durationValue').textContent = state.duration;
    });
    
    // Starting point search
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', handleSearch);
    searchBox.addEventListener('focus', () => {
        if (searchBox.value) handleSearch({ target: searchBox });
    });
    
    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', previousStep);
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('generateBtn').addEventListener('click', generateRoute);
    
    // Map actions
    document.getElementById('startOverBtn').addEventListener('click', startOver);
    document.getElementById('bookBtn').addEventListener('click', bookNow);
}

function startWizard() {
    document.querySelector('.welcome-screen').classList.remove('active');
    document.querySelector('.wizard-container').classList.add('active');
    showStep(0);
}

function changePeople(delta) {
    const newValue = state.people + delta;
    if (newValue >= 1 && newValue <= 20) {
        state.people = newValue;
        document.getElementById('peopleCount').textContent = state.people;
    }
}

function selectVibe(card) {
    // Remove previous selection
    document.querySelectorAll('.vibe-card').forEach(c => c.classList.remove('selected'));
    
    // Add new selection
    card.classList.add('selected');
    state.vibe = card.dataset.vibe;
}

function toggleTheme(card) {
    const theme = card.dataset.theme;
    
    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        state.themes = state.themes.filter(t => t !== theme);
    } else {
        card.classList.add('selected');
        state.themes.push(theme);
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const suggestions = document.getElementById('citySuggestions');
    
    if (query.length === 0) {
        suggestions.classList.remove('active');
        return;
    }
    
    const matches = indianCities.filter(city => 
        city.toLowerCase().includes(query)
    );
    
    if (matches.length > 0) {
        suggestions.innerHTML = matches.map(city => 
            `<div class="suggestion-item" onclick="selectCity('${city}')">${city}</div>`
        ).join('');
        suggestions.classList.add('active');
    } else {
        suggestions.classList.remove('active');
    }
}

function selectCity(city) {
    state.startingPoint = city;
    document.getElementById('searchBox').value = city;
    document.getElementById('citySuggestions').classList.remove('active');
}

function showStep(stepIndex) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step${stepIndex + 1}`).classList.add('active');
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const generateBtn = document.getElementById('generateBtn');
    
    prevBtn.style.display = stepIndex === 0 ? 'none' : 'block';
    
    if (stepIndex === 4) {
        nextBtn.style.display = 'none';
        generateBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        generateBtn.style.display = 'none';
    }
    
    updateProgressIndicator();
}

function updateProgressIndicator() {
    const dots = document.querySelectorAll('.step-dot');
    const progressLine = document.querySelector('.progress-line');
    
    dots.forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index < state.currentStep) {
            dot.classList.add('completed');
        } else if (index === state.currentStep) {
            dot.classList.add('active');
        }
    });
    
    // Update progress line width
    const progress = (state.currentStep / (dots.length - 1)) * 100;
    progressLine.style.width = `${progress}%`;
}

function previousStep() {
    if (state.currentStep > 0) {
        state.currentStep--;
        showStep(state.currentStep);
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (state.currentStep < 4) {
            state.currentStep++;
            showStep(state.currentStep);
        }
    }
}

function validateCurrentStep() {
    switch(state.currentStep) {
        case 0:
            return state.people >= 1;
        case 1:
            if (!state.vibe) {
                alert('Please select a travel vibe');
                return false;
            }
            return true;
        case 2:
            if (state.themes.length === 0) {
                alert('Please select at least one theme');
                return false;
            }
            return true;
        case 3:
            return state.duration >= 1;
        case 4:
            if (!state.startingPoint) {
                alert('Please enter your starting city');
                return false;
            }
            return true;
        default:
            return true;
    }
}

function generateRoute() {
    if (!validateCurrentStep()) return;
    
    // Hide wizard
    document.querySelector('.wizard-container').classList.remove('active');
    
    // Show loading
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('active');
    
    // Simulate processing
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        displayMap();
    }, 2500);
}

function displayMap() {
    const mapContainer = document.querySelector('.map-container');
    mapContainer.classList.add('active');
    
    // Calculate route based on preferences
    const selectedDestinations = calculateRoute();
    state.route = selectedDestinations;
    
    // Initialize Leaflet map
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Center of India
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Add starting point marker
    const startCity = getCoordinates(state.startingPoint);
    if (startCity) {
        L.marker([startCity.lat, startCity.lng], {
            icon: L.divIcon({
                className: 'custom-marker',
                html: '<div style="background:#26a69a;color:white;padding:8px 12px;border-radius:20px;font-weight:bold;box-shadow:0 2px 10px rgba(0,0,0,0.2)">START: ' + state.startingPoint + '</div>',
                iconSize: null
            })
        }).addTo(map);
    }
    
    // Add destination markers and create route
    const routePoints = startCity ? [[startCity.lat, startCity.lng]] : [];
    
    selectedDestinations.forEach((dest, index) => {
        const marker = L.marker([dest.lat, dest.lng]).addTo(map);
        marker.bindPopup(`
            <div style="text-align:center;padding:5px;">
                <strong style="color:#1e88e5;font-size:1.1rem;">Stop ${index + 1}: ${dest.name}</strong><br>
                <p style="margin:5px 0;color:#666;">${dest.desc}</p>
            </div>
        `);
        routePoints.push([dest.lat, dest.lng]);
    });
    
    // Draw route polyline
    if (routePoints.length > 1) {
        L.polyline(routePoints, {
            color: '#1e88e5',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 5'
        }).addTo(map);
    }
    
    // Fit map to show all markers
    if (routePoints.length > 0) {
        map.fitBounds(routePoints, { padding: [50, 50] });
    }
}

function calculateRoute() {
    let availableDestinations = [];
    
    // Collect destinations based on selected themes
    state.themes.forEach(theme => {
        if (destinations[theme]) {
            availableDestinations = [...availableDestinations, ...destinations[theme]];
        }
    });
    
    // If no themes selected, use all
    if (availableDestinations.length === 0) {
        Object.values(destinations).forEach(dests => {
            availableDestinations = [...availableDestinations, ...dests];
        });
    }
    
    // Calculate number of stops based on duration
    let numStops = Math.min(Math.ceil(state.duration / 3), availableDestinations.length);
    numStops = Math.max(numStops, 3); // Minimum 3 stops
    numStops = Math.min(numStops, 8); // Maximum 8 stops
    
    // Randomly select destinations (in real app, would use optimization algorithm)
    const shuffled = availableDestinations.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numStops);
}

function getCoordinates(cityName) {
    // Simple mapping of major cities to coordinates
    const cityCoords = {
        'Delhi': { lat: 28.7041, lng: 77.1025 },
        'Mumbai': { lat: 19.0760, lng: 72.8777 },
        'Bangalore': { lat: 12.9716, lng: 77.5946 },
        'Kolkata': { lat: 22.5726, lng: 88.3639 },
        'Chennai': { lat: 13.0827, lng: 80.2707 },
        'Hyderabad': { lat: 17.3850, lng: 78.4867 },
        'Pune': { lat: 18.5204, lng: 73.8567 },
        'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
        'Jaipur': { lat: 26.9124, lng: 75.7873 },
        'Lucknow': { lat: 26.8467, lng: 80.9462 },
        'Varanasi': { lat: 25.3176, lng: 82.9739 },
        'Agra': { lat: 27.1767, lng: 78.0081 }
    };
    
    return cityCoords[cityName] || { lat: 20.5937, lng: 78.9629 };
}

function startOver() {
    // Reset state
    state.currentStep = 0;
    state.people = 2;
    state.vibe = '';
    state.themes = [];
    state.duration = 7;
    state.startingPoint = '';
    state.route = null;
    
    // Reset UI
    document.getElementById('peopleCount').textContent = '2';
    document.querySelectorAll('.vibe-card, .theme-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById('durationSlider').value = 7;
    document.getElementById('durationValue').textContent = '7';
    document.getElementById('searchBox').value = '';
    
    // Hide map, show welcome
    document.querySelector('.map-container').classList.remove('active');
    document.querySelector('.welcome-screen').classList.add('active');
}

function bookNow() {
    // Redirect to packages page
    window.location.href = 'packages.html';
}
