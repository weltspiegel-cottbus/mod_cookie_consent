/**
 * Cookie Consent Module JavaScript
 *
 * @package     Weltspiegel\Module\CookieConsent
 * @copyright   Weltspiegel Cottbus
 * @license     MIT
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'cookie_consent';
    const banner = document.getElementById('cookieConsentBanner');
    const drawer = document.getElementById('cookieConsentDrawer');
    const enableBtn = document.getElementById('cookieConsentEnable');
    const dismissBtn = document.getElementById('cookieConsentDismiss');

    // Check current consent state
    function getConsent() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    // Save consent state
    function setConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
            // Dispatch event for other scripts to listen to
            window.dispatchEvent(new CustomEvent('cookieConsentChanged', {
                detail: { consent: value }
            }));
        } catch (e) {
            console.error('Could not save consent to localStorage:', e);
        }
    }

    // Show banner
    function showBanner() {
        banner.classList.remove('cookie-consent-hidden');
        drawer.style.display = 'none';
    }

    // Hide banner and show drawer
    function hideBanner() {
        banner.classList.add('cookie-consent-hidden');
        drawer.style.display = 'block';
    }

    // Initialize
    function init() {
        const consent = getConsent();

        if (consent === null) {
            // First visit - show banner
            showBanner();
        } else {
            // Already decided - show drawer
            hideBanner();
        }
    }

    // Event listeners
    enableBtn.addEventListener('click', function() {
        setConsent('granted');
        hideBanner();
    });

    dismissBtn.addEventListener('click', function() {
        setConsent('denied');
        hideBanner();
    });

    drawer.addEventListener('click', function() {
        showBanner();
    });

    // Run on page load
    init();
})();
