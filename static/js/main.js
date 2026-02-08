// Main JavaScript for Portfolio

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark-900/90', 'backdrop-blur-xl', 'border-b', 'border-accent/10');
        } else {
            navbar.classList.remove('bg-dark-900/90', 'backdrop-blur-xl', 'border-b', 'border-accent/10');
        }
    });

    // Mobile menu toggle
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const spans = mobileBtn.querySelectorAll('span');
        if (!mobileMenu.classList.contains('hidden')) {
            spans[0].classList.add('rotate-45', 'translate-y-2');
            spans[1].classList.add('opacity-0');
            spans[2].classList.add('-rotate-45', '-translate-y-2');
        } else {
            spans[0].classList.remove('rotate-45', 'translate-y-2');
            spans[1].classList.remove('opacity-0');
            spans[2].classList.remove('-rotate-45', '-translate-y-2');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // AJAX form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
            btn.disabled = true;

            try {
                const response = await fetch('', {
                    method: 'POST',
                    body: new FormData(this),
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                });

                const data = await response.json();

                if (data.success) {
                    btn.innerHTML = '✓ Message Sent!';
                    btn.classList.add('bg-green-500');
                    this.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('bg-green-500');
                        btn.disabled = false;
                    }, 3000);
                } else {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    alert('Please fill all fields correctly.');
                }
            } catch (error) {
                // Fallback to regular form submission
                this.submit();
            }
        });
    }

    // Console greeting
    console.log('%c👋 Hello, Developer!', 'font-size: 20px; color: #1DB954;');
    console.log('%cLooking for a Full-Stack Developer? Contact: mishravikesh9525@gmail.com', 'font-size: 14px; color: #888;');
});
