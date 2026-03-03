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