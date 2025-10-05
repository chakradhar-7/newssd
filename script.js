
// --- Live Clock ---
function startTime() {
    const today = new Date();
    // Formats the date and time in a user-friendly way
    document.getElementById('txt').innerHTML = today.toLocaleString('en-US', {
        dateStyle: 'full', timeStyle: 'medium'
    });
    setTimeout(startTime, 1000); // Updates the clock every second
}

// --- Scroll-to-Top Button Logic ---
const scrollTopBtn = document.getElementById("scrollTopBtn");
// The main scroll event listener handles the visibility of the scroll-to-top button
// and also triggers the navigation link update.
window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};
// Function called when the button is clicked
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// --- Dark Mode Toggle Logic ---
const themeToggle = document.getElementById('checkbox');
// When the toggle is clicked, add/remove the 'dark-mode' class from the body
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    // Save the user's preference in localStorage so it persists between visits
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// On page load, check if a theme preference is saved in localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true; // Sync the toggle switch state
}

// --- Scrollspy & Animation Observer ---
// We wait for the DOM to be fully loaded before running this script
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    // The Intersection Observer is a modern, efficient way to detect when an element
    // enters the viewport. It's better for performance than using a scroll event listener.
    const animationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS animation
                entry.target.classList.add('visible');
                // Optional: unobserve after animating once to save resources
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    // Observe each content section for the scroll animation
    document.querySelectorAll('.content-section').forEach(section => {
        animationObserver.observe(section);
    });

    // This scroll listener is for the "scrollspy" feature (highlighting nav links)
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Check if the user has scrolled past the top of the section
            if (pageYOffset >= sectionTop - 100) { // 100px offset for better accuracy
                currentSectionId = section.getAttribute('id');
            }
        });
        // Update the active class on navigation links
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${currentSectionId}`) {
                a.classList.add('active');
            }
        });
    });
});
