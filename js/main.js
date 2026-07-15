/**
 * El Podium Portfolio - Main JavaScript
 * Handles header scroll effects, smooth anchors, and scroll-to-top.
 */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const scrollToTopBtn = document.querySelector(".scroll-to-top");

    /**
     * Updates the fixed header styling based on vertical scroll position.
     */
    const updateHeaderOnScroll = () => {
        if (!header) {
            return;
        }

        if (window.scrollY > 50) {
            header.style.background = "rgba(255, 255, 255, 0.98)";
            header.style.padding = "10px 0";
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
            return;
        }

        header.style.background = "rgba(255, 255, 255, 0.9)";
        header.style.padding = "20px 0";
        header.style.boxShadow = "none";
    };

    /**
     * Shows or hides the scroll-to-top button after the user scrolls past a threshold.
     */
    const updateScrollToTopVisibility = () => {
        if (!scrollToTopBtn) {
            return;
        }

        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add("visible");
            return;
        }

        scrollToTopBtn.classList.remove("visible");
    };

    window.addEventListener("scroll", () => {
        updateHeaderOnScroll();
        updateScrollToTopVisibility();
    });

    updateHeaderOnScroll();
    updateScrollToTopVisibility();

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Smooth scroll for same-page hash links (e.g. #features on the homepage)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
        });
    });

    // Simple reveal animation on scroll for homepage cards / screenshots
    const revealElements = document.querySelectorAll(".feature-card, .screenshot-item");

    if (revealElements.length === 0) {
        return;
    }

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;

        revealElements.forEach((el) => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    revealElements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.transition = "all 0.6s ease-out";
    });

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});
