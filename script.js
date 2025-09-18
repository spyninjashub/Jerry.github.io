document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Generate Table of Contents
    const tocNav = document.getElementById('toc-nav');
    const sections = document.querySelectorAll('.tos-content section[id]');

    sections.forEach(section => {
        const title = section.querySelector('h2').textContent;
        const id = section.getAttribute('id');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = title;
        tocNav.appendChild(link);
    });

    // Handle smooth scrolling and active class for TOC
    const tocLinks = tocNav.querySelectorAll('a');
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
        });
    });

    // Highlight TOC link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
