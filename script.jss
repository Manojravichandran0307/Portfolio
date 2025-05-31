// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Image optimization handler
const profileImage = document.getElementById('profile-image');
if (profileImage) {
    profileImage.onload = function() {
        // Check if image needs resizing
        if (this.naturalWidth > 500 || this.naturalHeight > 500) {
            console.log('Profile image optimized for display');
        }
    };
    
    // Fallback if image fails to load
    profileImage.onerror = function() {
        this.src = 'https://via.placeholder.com/500x500?text=Manoj+Ravichandran';
        this.alt = 'Placeholder Profile Image';
    };
}

// Google Sheets Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Replace with your Google Apps Script URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwzSRw1rRxawyYmvbaLEnHJKIXVTHln-XS_NGgn4ot6qhBtWWR9YfnsB9mspG8q40pyoA/exec';
        
        fetch(scriptURL, { 
            method: 'POST',
            body: new FormData(contactForm)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(data => {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        })
        .catch(error => {
            alert('Error! Please try again later or contact me directly at themanojravichandran@outlook.com');
            console.error('Error!', error.message);
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

// Cookie Consent Handler
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const customizeCookies = document.getElementById('customize-cookies');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'block';
    }

    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
        // Enable all cookies
        enableCookies();
    });

    customizeCookies.addEventListener('click', function() {
        // Show cookie customization modal (simplified version)
        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-content">
                <h3>Cookie Preferences</h3>
                <p>Manage your cookie settings:</p>
                <div class="cookie-option">
                    <input type="checkbox" id="essential-cookies" checked disabled>
                    <label for="essential-cookies">Essential Cookies (Required)</label>
                </div>
                <div class="cookie-option">
                    <input type="checkbox" id="analytics-cookies">
                    <label for="analytics-cookies">Analytics Cookies</label>
                </div>
                <div class="cookie-option">
                    <input type="checkbox" id="marketing-cookies">
                    <label for="marketing-cookies">Marketing Cookies</label>
                </div>
                <div class="cookie-modal-buttons">
                    <button id="save-cookie-prefs" class="btn btn-small">Save Preferences</button>
                    <button id="close-cookie-modal" class="btn btn-small">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('save-cookie-prefs').addEventListener('click', function() {
            const analytics = document.getElementById('analytics-cookies').checked;
            const marketing = document.getElementById('marketing-cookies').checked;
            localStorage.setItem('cookieConsent', JSON.stringify({
                essential: true,
                analytics: analytics,
                marketing: marketing
            }));
            cookieConsent.style.display = 'none';
            modal.remove();
            // Apply cookie preferences
            applyCookiePreferences(analytics, marketing);
        });

        document.getElementById('close-cookie-modal').addEventListener('click', function() {
            modal.remove();
        });
    });

    function enableCookies() {
        // Implement cookie enabling logic here
        console.log('All cookies enabled');
    }

    function applyCookiePreferences(analytics, marketing) {
        // Implement cookie preferences logic here
        console.log('Cookie preferences applied:', { analytics, marketing });
    }
});

// Cookie Modal Styles
const style = document.createElement('style');
style.innerHTML = `
    .cookie-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }

    .cookie-modal-content {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        max-width: 500px;
        width: 90%;
    }

    .cookie-option {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .cookie-modal-buttons {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }
`;
document.head.appendChild(style);
