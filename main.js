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
function buySong(file) {
    let email = prompt("Enter your email:");
    let phone = prompt("Enter your phone number:");
    if (!email || !phone) return alert("Email and phone are required!");

    var handler = PaystackPop.setup({
        key: 'YOUR_PUBLIC_KEY', // replace with your Paystack public key
        email: email,
        amount: 200 * 100, // $2 in kobo
        metadata: {
            custom_fields: [
                { display_name: "Phone", variable_name: "phone", value: phone }
            ]
        },
        callback: function(response){
            alert('Payment successful! Your download will start.');
            const link = document.createElement('a');
            link.href = 'songs/' + file;
            link.download = file;
            link.click();
        },
        onClose: function(){
            alert('Payment cancelled.');
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