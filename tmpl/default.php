<?php

/**
 * @package     Weltspiegel\Module\CookieConsent
 *
 * @copyright   Weltspiegel Cottbus
 * @license     MIT; see LICENSE file
 */

\defined('_JEXEC') or die;

/**
 * @var string $consentText
 * @var string $buttonEnable
 * @var string $buttonDismiss
 * @var string $drawerText
 */

use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

// Register and use CSS
$wa->registerAndUseStyle(
    'mod_cookie_consent.consent',
    'media/mod_cookie_consent/css/consent.css',
    [],
    [],
    []
);

// Register and use JavaScript
$wa->registerAndUseScript(
    'mod_cookie_consent.consent',
    'media/mod_cookie_consent/js/consent.js',
    [],
    ['defer' => true],
    []
);

?>

<!-- Cookie Consent Banner -->
<div id="cookieConsentBanner" class="cookie-consent-banner cookie-consent-hidden">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-8 mb-3 mb-lg-0">
                <p class="mb-0"><?= htmlspecialchars($consentText) ?></p>
            </div>
            <div class="col-lg-4 text-lg-end">
                <button id="cookieConsentEnable" class="btn btn-danger me-2">
                    <?= htmlspecialchars($buttonEnable) ?>
                </button>
                <button id="cookieConsentDismiss" class="btn btn-success">
                    <?= htmlspecialchars($buttonDismiss) ?>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Cookie Consent Drawer (reopens banner) -->
<div id="cookieConsentDrawer" class="cookie-consent-drawer">
    <?= htmlspecialchars($drawerText) ?>
</div>
