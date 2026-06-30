/**
 * Cookie Consent Module JavaScript (standalone, category based)
 *
 * Self-contained fallback for standalone use. Stores consent per category in
 * localStorage as JSON ({ "<cat>": true|false }) and dispatches
 * `cookieConsentChanged` with detail { category, granted } on every change.
 * The Weltspiegel template ships its own (bundled) implementation.
 *
 * @package     Weltspiegel\Module\CookieConsent
 * @copyright   Weltspiegel Cottbus
 * @license     MIT
 */

(function () {
  "use strict";

  const STORAGE_KEY = "cookie_consent";

  const Consent = {
    getAll() {
      let raw;
      try {
        raw = localStorage.getItem(STORAGE_KEY);
      } catch {
        return {};
      }
      if (!raw) return {};

      // Old v1 format: a single global "granted"/"denied" string. That global
      // consent does NOT map to a specific category, so we deliberately discard
      // it (and clean it up) and require fresh, per-category consent.
      if (raw === "granted" || raw === "denied") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        return {};
      }

      try {
        const obj = JSON.parse(raw);
        return obj && typeof obj === "object" ? obj : {};
      } catch {
        return {};
      }
    },
    isGranted(category) {
      return this.getAll()[category] === true;
    },
    set(category, granted) {
      const all = this.getAll();
      all[category] = !!granted;
      this.save(all);
      window.dispatchEvent(
        new CustomEvent("cookieConsentChanged", {
          detail: { category, granted: !!granted },
        }),
      );
    },
    save(obj) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
      } catch (e) {
        console.error("Could not save consent to localStorage:", e);
      }
    },
  };

  const banner = document.getElementById("cookieConsentBanner");
  const drawer = document.getElementById("cookieConsentDrawer");
  if (!banner || !drawer) return;

  function showBanner() {
    banner.classList.remove("cookie-consent-hidden");
    drawer.style.display = "none";
  }

  function hideBanner() {
    banner.classList.add("cookie-consent-hidden");
    drawer.style.display = "";
  }

  // Wire category switches (live toggle)
  const stored = Consent.getAll();
  banner.querySelectorAll("[data-consent-category]").forEach(function (sw) {
    const category = sw.dataset.consentCategory;
    if (!(category in stored)) {
      Consent.set(category, sw.dataset.consentDefault === "1");
    }
    sw.checked = Consent.isGranted(category);
    sw.addEventListener("change", function () {
      Consent.set(category, sw.checked);
    });
  });

  // No auto-open; banner opens via the drawer or an external request.
  hideBanner();

  const okBtn = document.getElementById("cookieConsentOk");
  if (okBtn) okBtn.addEventListener("click", hideBanner);
  drawer.addEventListener("click", showBanner);
  window.addEventListener("showCookieBanner", showBanner);
})();
