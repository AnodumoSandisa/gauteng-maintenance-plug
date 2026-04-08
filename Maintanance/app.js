// Global variable to keep track of the chosen slot
let selectedSlot = "";

async function applyFilters() {
    // ⚠️ MANUALLY CHECK: Ensure your file is named 'startup.json' in your folder
    const response = await fetch('startup.json');
    const data = await response.json();

    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;

    const filteredData = data.filter(startup => {
        const matchCat = category === 'all' || startup.category === category;
        const matchLoc = location === 'all' || startup.city === location;
        return matchCat && matchLoc;
    });

    renderCards(filteredData);
}

function renderCards(startups) {
    const grid = document.getElementById('startupGrid');
    grid.innerHTML = startups.map(item => `
        <div class="card">
            <h3>${item.name}</h3>
            <p>📍 ${item.area}</p>
            <p class="price">From R${item.price}</p>
            <button onclick="viewPortfolio(${item.id})" style="width:100%">View Work</button>
        </div>
    `).join('');
}

async function viewPortfolio(id) {
    const response = await fetch('./startup.json');
    const data = await response.json();
    
    // Use == to handle potential string/number mismatches from HTML
    const startup = data.find(s => s.id == id);

    if (!startup) return;

    const details = document.getElementById('portfolioDetails');
    details.innerHTML = `
        <h2>${startup.name}'s Portfolio</h2>
        <div class="image-gallery">
            ${startup.portfolio.map(img => `<img src="${img}" class="portfolio-img">`).join('')}
        </div>
        
        <h3>1. Available Slots</h3>
        <div class="slots-container">
            ${startup.slots.map(slot => `
                <button class="slot-btn" onclick="selectSlot(this, '${slot}')">${slot}</button>
            `).join('')}
        </div>

        <h3>2. Confirm Details</h3>
        <input type="email" id="userEmail" placeholder="Enter your email for confirmation" 
               style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ccc;">
        
        <button class="book-final-btn" onclick="sendBooking('${startup.name}')" style="width:100%">
            Confirm & Send Email
        </button>
    `;

    document.getElementById('portfolioModal').style.display = "block";
}

// Logic to select a slot visually
function selectSlot(button, slot) {
    selectedSlot = slot;
    // Reset all buttons to default style
    document.querySelectorAll('.slot-btn').forEach(btn => {
        btn.style.background = "#333";
        btn.style.color = "#D4AF37";
    });
    // Highlight selected
    button.style.background = "#D4AF37";
    button.style.color = "black";
}

// 📧 THE EMAILJS FUNCTION
function sendBooking(businessName) {
    const userEmail = document.getElementById('userEmail').value;

    if (!selectedSlot) {
        alert("Please pick a time slot first!");
        return;
    }
    if (!userEmail) {
        alert("Please enter your email!");
        return;
    }

    const templateParams = {
        to_email: userEmail,
        business_name: businessName,
        selected_slot: selectedSlot
    };

    // ⚠️ MANUALLY ADD: Replace with your actual IDs from EmailJS Dashboard
    const SERVICE_ID = "service_v2sybp3"; 
    const TEMPLATE_ID = "template_fnj1a5p";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function() {
           alert('Booking Sent! Check your email for confirmation.');
           closeModal();
        }, function(error) {
           console.error('EmailJS Error:', error);
           alert('Failed to send booking. Check console for details.');
        });
}

function closeModal() {
    document.getElementById('portfolioModal').style.display = "none";
}

applyFilters();