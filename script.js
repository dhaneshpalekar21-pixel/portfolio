const text = [
    "Software Developer Intern @ Agrozone",
    "Full Stack Web Developer",
    "MERN Stack Specialist",
    "Data Analytics & Insights",
    "Frontend Engineer",
    "UI/UX Web Designer"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function type() {
    if (!typingElement) return;

    const currentText = text[index % text.length];
    
    if (isDeleting) {
        // Erase character
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Type character
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 60 : 120; // Type/delete speeds

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at the end of typing
        typeSpeed = 1600;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index++;
        // Pause before typing next word
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

if (typingElement) {
    type();
}

/* Theme Toggle */
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
    /* LOAD SAVED THEME */
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        themeBtn.innerHTML = "☀️";
    }

    /* BUTTON CLICK */
    themeBtn.onclick = function() {
        document.body.classList.toggle("light-theme");
        if (document.body.classList.contains("light-theme")) {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = "🌙";
        }
    };
}

/* Scroll Progress Bar */
const scrollIndicatorContainer = document.createElement("div");
scrollIndicatorContainer.className = "scroll-progress-container";
const scrollProgress = document.createElement("div");
scrollProgress.className = "scroll-progress";
scrollIndicatorContainer.appendChild(scrollProgress);
document.body.appendChild(scrollIndicatorContainer);

window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    scrollProgress.style.width = scrolled + "%";
});

/* Project Filtering */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hide");
                    card.style.display = "flex";
                    card.style.animation = "cardEntrance 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards";
                } else {
                    card.classList.add("hide");
                    card.style.display = "none";
                    card.style.animation = "none";
                }
            });
        });
    });
}

/* Certificate Lightbox Modal */
const lightbox = document.getElementById("cert-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");
const viewCertBtns = document.querySelectorAll(".view-cert-btn");

if (lightbox && viewCertBtns.length > 0) {
    viewCertBtns.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const certSrc = this.getAttribute("data-cert");
            const certTitle = this.closest(".certificate-content").querySelector("h2").textContent;
            
            lightboxImg.src = "";
            lightboxImg.src = certSrc;
            lightboxCaption.textContent = certTitle;
            
            lightbox.style.display = "flex";
            setTimeout(() => {
                lightbox.classList.add("show");
            }, 10);
            document.body.style.overflow = "hidden";
        });
    });

    const closeLightbox = function() {
        lightbox.classList.remove("show");
        setTimeout(() => {
            lightbox.style.display = "none";
        }, 300);
        document.body.style.overflow = "auto";
    };

    if (closeBtn) {
        closeBtn.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", function(e) {
        if (e.target === lightbox || e.target.classList.contains("lightbox-content-wrapper")) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && lightbox.classList.contains("show")) {
            closeLightbox();
        }
    });
}

/* Contact Form Submission */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const emailBody = `Hi Dhanesh,\n\nYou have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dhaneshpalekar21@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        window.open(gmailUrl, "_blank");
    });
}

/* Scroll Reveal Intersection Observer */
const revealElements = document.querySelectorAll(".scroll-reveal");

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -80px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
}