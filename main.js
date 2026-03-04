// Navigation script (section switching)
const links = document.querySelectorAll('nav a');
const sections = [
    document.getElementById('home-section'),
    document.getElementById('music-section'),
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
        email: 'customer@email.com', // You can later collect real email
        amount: price * 100, // Paystack uses kobo
        currency: "NGN",

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
const emojis = ['🩶', '🍭', '♠️'];
const emojiCount = 30; // number of emojis to show

for (let i = 0; i < emojiCount; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    // random starting position
    span.style.top = Math.random() * 100 + '%';
    span.style.left = Math.random() * 100 + '%';
    // random size
    span.style.fontSize = (12 + Math.random() * 24) + 'px';
    // random animation duration
    span.style.animationDuration = (10 + Math.random() * 20) + 's';
    emojiContainer.appendChild(span);
}