window.FooterComponent = function() {
    return `
    <footer role="contentinfo" aria-label="Site Footer">
    <section class="footer-above" aria-label="Footer Information">
        <div class="footer-grid">
            <div class="footer-section">
                <h3 id="footer-contact-heading">Contact</h3>
                <ul aria-labelledby="footer-contact-heading">
                    <li><span aria-label="Phone number">Phone: 0360-2216826 (O)</span></li>
                    <li><span aria-label="Email address">Email: secy-lykta-arn[at]gov[dot]in</span></li>
                    <li><span aria-label="Office address">Address: Officer's Apartment, Zoo Road, Tower-1, Itanagar, Arunachal Pradesh - 791113</span></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3 id="footer-help-heading">Help Section</h3>
                <ul aria-labelledby="footer-help-heading">
                    <li><a href="feedback.html">Feedback</a></li>
                    <li><a href="help.html">Help</a></li>
                    <li><a href="website-policy.html">Website Policy</a></li>
                    <li><a href="accessibility-statement.html">Accessibility Statement</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3 id="footer-external-heading">External Links</h3>
                <ul aria-labelledby="footer-external-heading">
                    <li><a href="https://dopt.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Department of Personnel and Training (opens in new tab)">Dept. of Personnel &amp; Training <span aria-hidden="true">↗</span></a></li>
                    <li><a href="http://ghcitanagar.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Gauhati High Court, Itanagar Bench (opens in new tab)">Gauhati High Court, Itanagar Bench <span aria-hidden="true">↗</span></a></li>
                    <li><a href="http://arunachalgovernor.gov.in" target="_blank" rel="noopener noreferrer" aria-label="Governor of Arunachal Pradesh (opens in new tab)">Governor of Arunachal Pradesh <span aria-hidden="true">↗</span></a></li>
                    <li><a href="http://www.arunachalpradesh.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="Government of Arunachal Pradesh (opens in new tab)">Govt. of Arunachal Pradesh <span aria-hidden="true">↗</span></a></li>
                </ul>
            </div>
        </div>
    </section>
    <div class="footer-bottom" role="contentinfo">
        <div style="display: flex; align-items: center; justify-content: space-between; max-width: 1140px; margin: 0 auto; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                <nav aria-label="Footer Navigation" style="display: flex; gap: 1rem; font-size: 0.9rem;">
                    <a href="index.html" style="color: #ffffff; text-decoration: none;">Home</a>
                    <span style="color: rgba(255,255,255,0.5);" aria-hidden="true">|</span>
                    <a href="sitemap.html" style="color: #ffffff; text-decoration: none;">Sitemap</a>
                    <span style="color: rgba(255,255,255,0.5);" aria-hidden="true">|</span>
                    <a href="disclaimer.html" style="color: #ffffff; text-decoration: none;">Disclaimer</a>
                </nav>
                <span style="color: rgba(255,255,255,0.4);" aria-hidden="true">|</span>
                <p style="margin: 0; color: #ffffff;">© ${new Date().getFullYear()} Arunachal Pradesh Lokayukta</p>
            </div>
            <a href="https://www.nic.in" target="_blank" rel="noopener noreferrer" aria-label="National Informatics Centre website (opens in new tab)" style="display: inline-flex; align-items: center; transition: opacity 0.3s ease; opacity: 0.9;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.9'">
                <img src="images/Nic_logo3-01.png" alt="National Informatics Centre Logo" style="height: 30px; width: auto; display: block;">
            </a>
        </div>
    </div>
    </footer>
    `;
};
