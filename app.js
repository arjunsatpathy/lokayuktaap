document.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar and Footer
    const navContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');

    if (navContainer && window.NavbarComponent) {
        navContainer.innerHTML = window.NavbarComponent();
    }

    if (footerContainer && window.FooterComponent) {
        footerContainer.innerHTML = window.FooterComponent();
    }

    initNavbar();
    initTabs();
    initAccordions();
    initGalleryLightbox();
    initScrollAnimations();
    initScrollSpy();
    initAccessibility();
    initScreenReaderAnnouncer();
});

/* ═══════════════════════════════════════════
   LIVE ANNOUNCER FOR SCREEN READERS
   ═══════════════════════════════════════════ */
function initScreenReaderAnnouncer() {
    // Create a live region for dynamic announcements
    if (!document.getElementById('sr-announcer')) {
        const announcer = document.createElement('div');
        announcer.id = 'sr-announcer';
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(announcer);
    }
}

function announce(message) {
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
        announcer.textContent = '';
        // Small timeout to ensure screen reader picks up the change
        setTimeout(() => { announcer.textContent = message; }, 100);
    }
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            const isScrolled = window.scrollY > 20;
            navbar.classList.toggle('scrolled', isScrolled);
            if (topBar) topBar.classList.toggle('scrolled', isScrolled);
        }, { passive: true });
    }

    // Mobile menu with aria-expanded
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileBtn.innerHTML = isOpen ? '<img src="icons/Cancel.svg" alt="" style="width: 22px; height: 22px; display: block;" aria-hidden="true">' : '☰';
            mobileBtn.setAttribute('aria-expanded', String(isOpen));
            mobileBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            announce(isOpen ? 'Navigation menu opened' : 'Navigation menu closed');
        });
    }

    // Mobile dropdown toggling with aria-expanded
    document.querySelectorAll('.nav-item').forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    // Close other open dropdowns
                    document.querySelectorAll('.nav-item.open').forEach(other => {
                        if (other !== item) {
                            other.classList.remove('open');
                            const otherLink = other.querySelector('.nav-link');
                            if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
                        }
                    });
                    const isNowOpen = item.classList.toggle('open');
                    link.setAttribute('aria-expanded', String(isNowOpen));
                    announce(isNowOpen ? 'Submenu expanded' : 'Submenu collapsed');
                }
            });

            // Keyboard support for dropdown (Enter / Space / Escape)
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (link.getAttribute('aria-haspopup') === 'true') {
                        e.preventDefault();
                        const isNowOpen = item.classList.toggle('open');
                        link.setAttribute('aria-expanded', String(isNowOpen));
                        if (isNowOpen) {
                            const firstItem = dropdown.querySelector('a');
                            if (firstItem) firstItem.focus();
                        }
                    }
                }
                if (e.key === 'Escape') {
                    item.classList.remove('open');
                    link.setAttribute('aria-expanded', 'false');
                    link.focus();
                }
            });

            // Escape key within dropdown items
            dropdown.querySelectorAll('a').forEach(dropdownLink => {
                dropdownLink.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        item.classList.remove('open');
                        link.setAttribute('aria-expanded', 'false');
                        link.focus();
                    }
                });
            });
        }
    });

    // Close dropdown when focus leaves the nav-item entirely
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('focusout', (e) => {
            setTimeout(() => {
                if (!item.contains(document.activeElement)) {
                    item.classList.remove('open');
                    const link = item.querySelector('.nav-link[aria-haspopup]');
                    if (link) link.setAttribute('aria-expanded', 'false');
                }
            }, 0);
        });
    });
}

/* ═══════════════════════════════════════════
   ACCORDIONS
   ═══════════════════════════════════════════ */
function initAccordions() {
    // Ensure accordion icons use Add.svg and Cancel.svg
    document.querySelectorAll('.accordion-header .accordion-icon').forEach(icon => {
        if (!icon.querySelector('img')) {
            icon.innerHTML = '<img src="icons/Add.svg" class="icon-add" alt="" aria-hidden="true"><img src="icons/Cancel.svg" class="icon-cancel" alt="" aria-hidden="true">';
        }
    });

    document.querySelectorAll('.accordion-header').forEach((header, index) => {
        // Set proper ARIA attributes
        const item = header.parentElement;
        const body = item.querySelector('.accordion-body');
        const headerId = header.id || `accordion-header-${index}`;
        const bodyId = body ? (body.id || `accordion-body-${index}`) : null;

        header.id = headerId;
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');

        if (body) {
            body.id = bodyId;
            body.setAttribute('role', 'region');
            body.setAttribute('aria-labelledby', headerId);
            header.setAttribute('aria-controls', bodyId);
        }

        const isActive = item.classList.contains('active');
        header.setAttribute('aria-expanded', String(isActive));

        header.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Close siblings
            item.parentElement.querySelectorAll('.accordion-item.active').forEach(sibling => {
                if (sibling !== item) {
                    sibling.classList.remove('active');
                    const sibBody = sibling.querySelector('.accordion-body');
                    if (sibBody) sibBody.style.maxHeight = '0';
                    const sibHeader = sibling.querySelector('.accordion-header');
                    if (sibHeader) sibHeader.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            item.classList.toggle('active', !wasActive);
            if (body) {
                body.style.maxHeight = !wasActive ? body.scrollHeight + 'px' : '0';
            }
            header.setAttribute('aria-expanded', String(!wasActive));
            announce(!wasActive ? 'Section expanded' : 'Section collapsed');
        });

        // Keyboard support
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });

    // Open first accordion item by default
    document.querySelectorAll('.accordion').forEach(accordion => {
        const first = accordion.querySelector('.accordion-item');
        if (first) {
            first.classList.add('active');
            const body = first.querySelector('.accordion-body');
            if (body) body.style.maxHeight = body.scrollHeight + 'px';
            const header = first.querySelector('.accordion-header');
            if (header) header.setAttribute('aria-expanded', 'true');
        }
    });
}

/* ═══════════════════════════════════════════
   TABS COMPONENT
   ═══════════════════════════════════════════ */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (!tabBtns.length) return;

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.tabs-container');
            if (!container) return;

            // Deactivate all tab buttons in container
            container.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
                b.setAttribute('tabindex', '-1');
            });

            // Activate clicked tab
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            btn.setAttribute('tabindex', '0');

            // Hide all tab panels
            container.querySelectorAll('.tab-panel').forEach(p => {
                p.classList.remove('active');
                p.hidden = true;
            });

            // Show active panel
            const targetId = btn.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.hidden = false;
            }

            if (typeof announce === 'function') {
                announce(`${btn.textContent.trim()} tab selected`);
            }
        });

        // Keyboard arrow navigation
        btn.addEventListener('keydown', (e) => {
            const container = btn.closest('.tabs-container');
            const allTabs = Array.from(container.querySelectorAll('.tab-btn'));
            let newIndex = index;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIndex = (index + 1) % allTabs.length;
                allTabs[newIndex].focus();
                allTabs[newIndex].click();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIndex = (index - 1 + allTabs.length) % allTabs.length;
                allTabs[newIndex].focus();
                allTabs[newIndex].click();
            }
        });
    });
}

/* ═══════════════════════════════════════════
   GALLERY LIGHTBOX
   ═══════════════════════════════════════════ */
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (!lightbox) return;

    // Set lightbox ARIA attributes
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image Lightbox');

    let previousFocus = null;

    document.querySelectorAll('.gallery-item').forEach((item, idx) => {
        // Make gallery items keyboard accessible
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption') || (img ? img.alt : '') || `Gallery image ${idx + 1}`;
        item.setAttribute('aria-label', `View ${caption}`);

        const openLightbox = () => {
            previousFocus = document.activeElement;
            if (img && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = caption;
            }
            if (lightboxCaption) lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            announce(`Viewing image: ${caption}`);

            // Focus the close button
            const closeBtn = lightbox.querySelector('.lightbox-close');
            if (closeBtn) closeBtn.focus();
        };

        item.addEventListener('click', openLightbox);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        announce('Lightbox closed');
        if (previousFocus) previousFocus.focus();
    };

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Trap focus within lightbox
        lightbox.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && lightbox.classList.contains('active')) {
                const focusable = lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
                if (focusable.length > 0) {
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        });
    }
}

/* ═══════════════════════════════════════════
   SCROLL ANIMATIONS
   ═══════════════════════════════════════════ */
function initScrollAnimations() {
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Show all elements immediately for users who prefer reduced motion
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

/* ═══════════════════════════════════════════
   SCROLL SPY — active nav link
   ═══════════════════════════════════════════ */
function initScrollSpy() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .dropdown-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.color = 'var(--clr-primary)';
            link.style.fontWeight = '700';
            link.setAttribute('aria-current', 'page');
        }
    });
}

/* ═══════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════ */
function initAccessibility() {
    // Add id="main-content" to the first main container if not present
    if (!document.getElementById('main-content')) {
        const mainContainer = document.querySelector('.container') || document.querySelector('.hero');
        if (mainContainer) {
            mainContainer.id = 'main-content';
            mainContainer.setAttribute('role', 'main');
            mainContainer.setAttribute('tabindex', '-1');
        }
    }

    const html = document.documentElement;
    let baseFontSize = 100; // percent

    document.addEventListener('click', (e) => {
        if (e.target.id === 'btn-increase-text') {
            if (baseFontSize < 120) baseFontSize += 10;
            html.style.fontSize = `${baseFontSize}%`;
            announce(`Text size increased to ${baseFontSize}%`);
        } else if (e.target.id === 'btn-decrease-text') {
            if (baseFontSize > 80) baseFontSize -= 10;
            html.style.fontSize = `${baseFontSize}%`;
            announce(`Text size decreased to ${baseFontSize}%`);
        } else if (e.target.id === 'btn-normal-text') {
            baseFontSize = 100;
            html.style.fontSize = `${baseFontSize}%`;
            announce('Text size reset to normal');
        }
    });

    // Handle skip-to-main-content link focus
    const skipLink = document.getElementById('skip-to-main');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}
