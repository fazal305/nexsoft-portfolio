// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector(".portfolio-navbar");

    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

// Typewriter effect
function startTypewriterEffect() {
    const typewriterText = document.querySelector("#typewriterText");
    const roles = ["Frontend Developer", "UI Builder", "Software Engineering Student"];

    let roleIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterText.textContent = currentRole.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typewriterText.textContent = currentRole.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let typingSpeed = isDeleting ? 60 : 100;

        if (!isDeleting && letterIndex === currentRole.length) {
            typingSpeed = 1400;
            isDeleting = true;
        }

        if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 300;
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole();
}

// Smooth scroll links
function setupSmoothScroll() {
    $('a[href^="#"]').on("click", function (event) {
        const targetSection = $(this.getAttribute("href"));

        if (targetSection.length) {
            event.preventDefault();

            $("html, body").animate(
                {
                    scrollTop: targetSection.offset().top - 75
                },
                700
            );

            $(".navbar-collapse").collapse("hide");
        }
    });
}

// Active nav link highlighting
function setupActiveNavLinks() {
    const watchedSections = document.querySelectorAll(".section-watch");
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
        root: null,
        threshold: 0.35
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.getAttribute("id");

                navLinks.forEach(function (link) {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${currentSectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    watchedSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}

// Page fade-in animations
function setupSectionAnimations() {
    const animatedSections = document.querySelectorAll(".section-watch");

    const animationObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
            }
        });
    }, { threshold: 0.2 });

    animatedSections.forEach(function (section) {
        section.classList.add("section-hidden");
        animationObserver.observe(section);
    });
}

// Contact form validation
function setupContactForm() {
    const contactForm = document.querySelector("#contactForm");

    if (!contactForm) {
        return;
    }

    const nameInput = document.querySelector("#nameInput");
    const emailInput = document.querySelector("#emailInput");
    const messageInput = document.querySelector("#messageInput");

    const nameError = document.querySelector("#nameError");
    const emailError = document.querySelector("#emailError");
    const messageError = document.querySelector("#messageError");
    const successMessage = document.querySelector("#formSuccessMessage");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let formIsValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        successMessage.textContent = "";

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            formIsValid = false;
        }

        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email.";
            formIsValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            formIsValid = false;
        }

        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please write a message.";
            formIsValid = false;
        }

        if (formIsValid) {
            successMessage.textContent = "Thank you! Your message is ready. This demo form does not send emails yet.";
            contactForm.reset();
        }
    });
}

// Back to top button
function setupBackToTopButton() {
    const backToTopButton = document.querySelector("#backToTopBtn");

    if (!backToTopButton) {
        return;
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            backToTopButton.classList.add("show-back-to-top");
        } else {
            backToTopButton.classList.remove("show-back-to-top");
        }
    });

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Run all website features
function initializePortfolioWebsite() {
    handleNavbarScroll();
    startTypewriterEffect();
    setupSmoothScroll();
    setupActiveNavLinks();
    setupSectionAnimations();
    setupContactForm();
    setupBackToTopButton();

    window.addEventListener("scroll", handleNavbarScroll);
}

document.addEventListener("DOMContentLoaded", initializePortfolioWebsite);