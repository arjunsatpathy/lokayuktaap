window.NavbarComponent = function() {
    return `
    <header class="site-header" role="banner">
        <!-- Top Row: Brand & Accessibility Tools -->
        <div class="header-main">
            <div class="header-container">
                <a href="index.html" class="nav-brand" aria-label="Arunachal Pradesh Lokayukta - Go to Homepage">
                    <img src="ashokstambh.png" alt="Emblem of India - Ashok Stambh">
                    <div class="nav-brand-text">
                        <span class="nav-brand-title">Arunachal Pradesh Lokayukta</span>
                    </div>
                </a>

                <div class="header-tools" role="region" aria-label="Accessibility Tools">
                    <a href="#main-content" class="header-tool-btn" id="skip-to-main" title="Skip to Main Content" aria-label="Skip to Main Content">
                        <img src="icons/skip-to-main.svg" class="tool-icon" alt="" aria-hidden="true">
                    </a>
                    <span class="tool-separator" aria-hidden="true">|</span>
                    <div class="text-size-controls" role="group" aria-label="Text Size Controls">
                        <button class="header-tool-btn" id="btn-decrease-text" aria-label="Decrease text size" title="Decrease Font Size" type="button">
                            <img src="icons/text-decrease.svg" class="tool-icon" alt="" aria-hidden="true">
                        </button>
                        <button class="header-tool-btn" id="btn-normal-text" aria-label="Reset text to normal size" title="Normal Font Size" type="button">
                            <img src="icons/text-normal.svg" class="tool-icon" alt="" aria-hidden="true">
                        </button>
                        <button class="header-tool-btn" id="btn-increase-text" aria-label="Increase text size" title="Increase Font Size" type="button">
                            <img src="icons/text-increase.svg" class="tool-icon" alt="" aria-hidden="true">
                        </button>
                    </div>
                    <span class="tool-separator" aria-hidden="true">|</span>
                    <a href="accessibility-statement.html" class="header-tool-btn" title="Accessibility Statement & Screen Reader Access" aria-label="Screen Reader Access information page">
                        <img src="icons/accessibility.svg" class="tool-icon" alt="" aria-hidden="true">
                    </a>
                </div>
            </div>
        </div>

        <!-- Bottom Row: Navigation Bar with White Background -->
        <nav class="navbar" id="nav-content" role="navigation" aria-label="Main Navigation">
            <div class="navbar-container">
                <button class="mobile-menu-btn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-nav-links" type="button">☰</button>
                <ul class="nav-links" id="main-nav-links" role="menubar">
                    <li class="nav-item" role="none"><a href="index.html" class="nav-link" role="menuitem">Home</a></li>
                    <li class="nav-item" role="none">
                        <a href="#" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-about">About Us <img src="icons/Caret%20Down.svg" class="chevron" alt="" aria-hidden="true"></a>
                        <ul class="dropdown-menu" id="dropdown-about" role="menu" aria-label="About Us submenu">
                            <li role="none"><a href="introduction.html" role="menuitem">Introduction</a></li>
                            <li role="none"><a href="history.html" role="menuitem">History</a></li>
                            <li role="none"><a href="messagefromLokayukta.html" role="menuitem">Message from Lokayukta</a></li>
                            <li role="none"><a href="organization-chart.html" role="menuitem">Organization Chart</a></li>
                        </ul>
                    </li>
                    <li class="nav-item" role="none"><a href="downloads.html" class="nav-link" role="menuitem">Downloads</a></li>
                    <li class="nav-item" role="none"><a href="photo_gallery.html" class="nav-link" role="menuitem">Gallery</a></li>
                    <li class="nav-item" role="none"><a href="faq.html" class="nav-link" role="menuitem">FAQ</a></li>
                    <li class="nav-item" role="none">
                        <a href="#" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-public">Public Info <img src="icons/Caret%20Down.svg" class="chevron" alt="" aria-hidden="true"></a>
                        <ul class="dropdown-menu" id="dropdown-public" role="menu" aria-label="Public Info submenu">
                            <li role="none"><a href="cases.html" role="menuitem">Cases</a></li>
                        </ul>
                    </li>
                    <li class="nav-item" role="none">
                        <a href="#" class="nav-link" role="menuitem" aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-contact">Contact <img src="icons/Caret%20Down.svg" class="chevron" alt="" aria-hidden="true"></a>
                        <ul class="dropdown-menu" id="dropdown-contact" role="menu" aria-label="Contact submenu">
                            <li role="none"><a href="contact-us.html" role="menuitem">Contact Us</a></li>
                            <li role="none"><a href="contactdir.html" role="menuitem">Contact Directory</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    `;
};
