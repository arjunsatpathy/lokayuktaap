window.FooterComponent = function() {
    let lastUpdatedDate = '';
    try {
        const metaTag = document.querySelector('meta[name="last-updated"]');
        if (metaTag && metaTag.content) {
            lastUpdatedDate = metaTag.content;
        } else if (document.lastModified) {
            const d = new Date(document.lastModified);
            if (!isNaN(d.getTime())) {
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                lastUpdatedDate = `${day}-${month}-${year}`;
            }
        }
    } catch(e) {}
    if (!lastUpdatedDate) {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        lastUpdatedDate = `${day}-${month}-${year}`;
    }

    return `
    <footer class="site-footer" role="contentinfo" aria-label="Site Footer">
        <div class="footer-container">
            <div class="footer-grid">
                <!-- Column 1: Contact -->
                <div class="footer-col">
                    <h4 class="footer-heading" id="footer-contact-heading">CONTACT</h4>
                    <div class="footer-heading-line" aria-hidden="true"></div>
                    <ul class="footer-list" aria-labelledby="footer-contact-heading">
                        <li>Phone: 0360-2216826 (O)</li>
                        <li>Email: secy-lykta-arn[at]gov[dot]in</li>
                        <li>Address: Officer's Apartment, Zoo Road, Tower-1,<br>Itanagar, Arunachal Pradesh - 791113</li>
                    </ul>
                </div>

                <!-- Column 2: Help Section -->
                <div class="footer-col">
                    <h4 class="footer-heading" id="footer-help-heading">HELP SECTION</h4>
                    <div class="footer-heading-line" aria-hidden="true"></div>
                    <ul class="footer-list" aria-labelledby="footer-help-heading">
                        <li><a href="feedback.html">Feedback</a></li>
                        <li><a href="help.html">Help</a></li>
                        <li><a href="website-policy.html">Website Policy</a></li>
                        <li><a href="accessibility-statement.html">Accessibility Statement</a></li>
                    </ul>
                </div>

                <!-- Column 3: External Links -->
                <div class="footer-col">
                    <h4 class="footer-heading" id="footer-external-heading">EXTERNAL LINKS</h4>
                    <div class="footer-heading-line" aria-hidden="true"></div>
                    <ul class="footer-list" aria-labelledby="footer-external-heading">
                        <li><a href="https://dopt.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Department of Personnel and Training (opens in new tab)">Dept. of Personnel &amp; Training ↗</a></li>
                        <li><a href="http://ghcitanagar.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Gauhati High Court, Itanagar Bench (opens in new tab)">Gauhati High Court, Itanagar Bench ↗</a></li>
                        <li><a href="http://arunachalgovernor.gov.in" target="_blank" rel="noopener noreferrer" aria-label="Governor of Arunachal Pradesh (opens in new tab)">Governor of Arunachal Pradesh ↗</a></li>
                        <li><a href="http://www.arunachalpradesh.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Government of Arunachal Pradesh (opens in new tab)">Govt. of Arunachal Pradesh ↗</a></li>
                    </ul>
                </div>

                <!-- Column 4: NIC Logo & Last Updated -->
                <div class="footer-col footer-col-logo">
                    <a href="https://www.nic.in" target="_blank" rel="noopener noreferrer" aria-label="National Informatics Centre website (opens in new tab)" class="footer-nic-link">
                        <img src="images/Nic_logo3-01.png" alt="National Informatics Centre Logo" class="footer-nic-img">
                    </a>
                    <div class="footer-last-updated" aria-label="Page last updated date">
                        <span>Last Updated On: <strong id="last-updated-date">${lastUpdatedDate}</strong></span>
                    </div>
                </div>
            </div>

            <!-- Bottom: Centered Navigation & Copyright -->
            <div class="footer-bottom">
                <nav class="footer-bottom-nav" aria-label="Footer Navigation">
                    <a href="index.html">Home</a>
                    <span class="footer-sep" aria-hidden="true">|</span>
                    <a href="sitemap.html">Sitemap</a>
                    <span class="footer-sep" aria-hidden="true">|</span>
                    <a href="disclaimer.html">Disclaimer</a>
                    <span class="footer-sep" aria-hidden="true">|</span>
                    <span class="footer-copyright">© ${new Date().getFullYear()} Arunachal Pradesh Lokayukta</span>
                </nav>
            </div>
        </div>
    </footer>
    `;
};
