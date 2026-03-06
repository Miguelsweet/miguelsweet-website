// Sweet Popup
const sweetPopup = document.getElementById('sweet-popup');
const sweetForm = document.getElementById('sweet-form');
const homeSection = document.getElementById('home-section');

// Show popup after 2 seconds
setTimeout(() => {
    sweetPopup.style.display = 'flex';
}, 2000);

// Form submission
sweetForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('sweet-name').value;
    const email = document.getElementById('sweet-email').value;
    const phone = document.getElementById('sweet-phone').value;

    if(!name || !email || !phone){
        alert("Please fill all fields to unlock!");
        return;
    }

    // Send data to Formspree (replace with your own endpoint if needed)
    fetch("https://formspree.io/f/mvzwpjeo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone })
    }).then(() => {
        alert("🎉 Awesome! Your exclusive content is unlocked!");
        sweetPopup.style.display = 'none';
        homeSection.classList.remove('hidden'); // Show home section
    }).catch(err => {
        alert("Oops! Something went wrong, try again.");
        console.error(err);
    });
}); 

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

    sections.forEach(s => {
      s.classList.add('hidden');
      s.classList.remove('active');
    });

    links.forEach(l => l.classList.remove('active-link'));

    sections[i].classList.remove('hidden');
    sections[i].classList.add('active');

    link.classList.add('active-link');
  });
});


// Buy Song Function
function buySong(songFile, price) {

  let handler = PaystackPop.setup({
    key: 'pk_live_c78f281b6ca9f6d6a4b89adb7f2b05212750eabc',
    email: 'customer@email.com',
    amount: price * 100,
    currency: "USD",

    callback: function(response) {
      alert("Payment successful! Download starting...");
      window.location.href = "songs/" + songFile;
    },

    onClose: function() {
      alert("Transaction cancelled.");
    }
  });

  handler.openIframe();
}


// Floating emojis
const emojiContainer = document.querySelector('.emoji-bg');

if (emojiContainer) {

  const emojis = ['🩶','🍭','♠️'];
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


// Merch products
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


// Open modal when merch item clicked
document.querySelectorAll('.merch-item').forEach(item => {

  item.addEventListener('click', () => {

    const key = item.querySelector('img')
    .getAttribute('src')
    .split('/')
    .pop()
    .split('.')[0];

    if (merchProducts[key]) {

      const product = merchProducts[key];

      productTitle.textContent = key.toUpperCase();
      productImg.src = product.img;
      productPriceSpan.textContent = product.price;

      modal.classList.remove('hidden');
    }

  });

});


// Close modal
closeBtn.addEventListener('click', () => {

  modal.classList.add('hidden');

});


// Close if clicking outside
window.addEventListener('click', e => {

  if (e.target === modal) {

    modal.classList.add('hidden');

  }

});


// Paystack payment for merch
form.addEventListener("submit", function(e) {

  e.preventDefault();

  const name = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const amount = parseInt(productPriceSpan.textContent) * 100;

  let handler = PaystackPop.setup({

    key: "pk_live_c78f281b6ca9f6d6a4b89adb7f2b05212750eabc",

    email: email,

    amount: amount,

    metadata: {

      custom_fields: [

        {
          display_name: "Full Name",
          value: name
        },

        {
          display_name: "Phone",
          value: phone
        }

      ]

    },

    callback: function(response) {

      alert("Payment successful! Your order has been placed.");

      form.submit();

      modal.classList.add("hidden");

      form.reset();

    },

    onClose: function() {

      alert("Payment cancelled.");

    }

  });

  handler.openIframe();

});