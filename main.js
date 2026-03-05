// Navigation script (section switching)
const links = document.querySelectorAll('nav a');
const sections = [
document.getElementById('home-section'),
document.getElementById('music-section'),
document.getElementById('merch-section'),
document.getElementById('blog-section'),
document.getElementById('booking-section'),
document.getElementById('support-section'),
document.getElementById('invest-section')
]; 

links.forEach((link, i) => {
    link.addEventListener('click', () => {
        // Hide all sections
        sections.forEach(s => {
            s.classList.add('hidden');
            s.classList.remove('active');
        });

        // Remove active class from all links
        links.forEach(l => l.classList.remove('active-link'));

        // Show the clicked section
        sections[i].classList.remove('hidden');
        sections[i].classList.add('active');

        // Mark link as active
        link.classList.add('active-link');
    });
});

// --- Buy Song Function ---
function buySong(songFile, price) {
    let handler = PaystackPop.setup({
        key: 'pk_live_c78f281b6ca9f6d6a4b89adb7f2b05212750eabc',
        email: 'customer@email.com',
        amount: price * 100, // 2 becomes 200 cents
        currency: "USD",

        callback: function(response) {
            alert("Payment successful! Download starting...");
            window.location.href = "songs/" + songFile;
        },

        onClose: function() {
            alert("Transaction was cancelled.");
        }
    });

    handler.openIframe();
} 

 // Floating emojis dynamically
const emojiContainer = document.querySelector('.emoji-bg');

if (emojiContainer) {  // ONLY run if container exists
    const emojis = ['🩶', '🍭', '♠️'];
    const emojiCount = 30;

    for (let i = 0; i < emojiCount; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.top = Math.random() * 100 + '%';
        span.style.left = Math.random() * 100 + '%';
        span.style.fontSize = (12 + Math.random() * 24) + 'px';
        span.style.animationDuration = (10 + Math.random() * 20) + 's';
        emojiContainer.appendChild(span);
    }
}

const merchProducts = {
  "baby": { img: "merch/baby.jpg", price: 85 },
  "cordle": { img: "merch/cordle.jpg", price: 50 },
  "faim": { img: "merch/faim.jpg", price: 85 },
  "fan": { img: "merch/fan.jpg", price: 85 },
  "fill": { img: "merch/fill.jpg", price: 85 },
  "happy": { img: "merch/happy.jpg", price: 85 },
  "home": { img: "merch/home.jpg", price: 50 },
  "keepit": { img: "merch/keepit.jpg", price: 85 },
  "lady": { img: "merch/lady.jpg", price: 85 },
  "loverboy": { img: "merch/loverboy.jpg", price: 50 },
  "main": { img: "merch/main.jpg", price: 85 },
  "many": { img: "merch/many.jpg", price: 85 },
  "mean": { img: "merch/mean.jpg", price: 85 },
  "miguelsweet": { img: "merch/miguelsweet.jpg", price: 85 },
  "seen": { img: "merch/seen.jpg", price: 85 },
  "street": { img: "merch/street.jpg", price: 85 },
  "sweet": { img: "merch/sweet.jpg", price: 85 },
  "win": { img: "merch/win.jpg", price: 85 },
  "wind": { img: "merch/wind.jpg", price: 85 }
};

 // Modal elements
const modal = document.getElementById('merch-modal');
const closeBtn = document.getElementById('close-merch');
const form = document.getElementById('merch-form');
const productTitle = document.getElementById('product-title');
const productImg = document.getElementById('product-img');
const productPriceSpan = document.getElementById('product-price');

// Function to open modal with product info
function openMerch(name, imgSrc, price) {
    productTitle.textContent = name;
    productImg.src = imgSrc;
    productPriceSpan.textContent = price; // Update button price
    form.dataset.price = price;           // Store price in form dataset
    modal.classList.remove('hidden');     // Show modal
}

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Close modal if clicked outside the content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Paystack form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const price = form.dataset.price * 100; // convert to kobo
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const zip = document.getElementById('zip').value;

    if (!name || !email || !phone || !address || !zip) {
        return alert("Please fill in all required fields");
    }

    var handler = PaystackPop.setup({
        key: 'pk_live_c78f281b6ca9f6d6a4b89adb7f2b05212750eabc',
        email: email,
        amount: price,
        metadata: {
            custom_fields: [
                { display_name: "Full Name", variable_name: "full_name", value: name },
                { display_name: "Phone", variable_name: "phone", value: phone },
                { display_name: "Address", variable_name: "address", value: address },
                { display_name: "Zip Code", variable_name: "zip", value: zip }
            ]
        },
        callback: function(response) {
            alert("Payment successful! Thank you.");
            modal.classList.add('hidden');
            form.reset();
        },
        onClose: function() {
            alert("Payment cancelled.");
        }
    });
    handler.openIframe();
});