const navlinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

navlinks.forEach(link => {
    link.addEventListener('click', () => {
        sections.forEach(s => s.style.display = 'none');

        let idSection = link.getAttribute('href').substring(1);

        sections.forEach(s => {
            if (s.id === idSection) {
                s.style.display = 'block';
            }
        })
    });
})