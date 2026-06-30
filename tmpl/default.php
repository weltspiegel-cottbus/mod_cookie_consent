<?php

/**
 * @package     Weltspiegel\Module\CookieConsent
 *
 * @copyright   Weltspiegel Cottbus
 * @license     MIT; see LICENSE file
 *
 * Rudimentary standalone layout (Bootstrap). The Weltspiegel template ships a
 * styled override; this is the generic fallback for standalone use.
 *
 * @var string   $consentText
 * @var string   $buttonOk
 * @var string   $drawerText
 * @var object[] $categories  Each: ->id, ->label, ->description, ->default (bool)
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

$wa->registerAndUseStyle(
    'mod_cookie_consent.consent',
    'media/mod_cookie_consent/css/consent.min.css',
    [],
    [],
    []
);

$wa->registerAndUseScript(
    'mod_cookie_consent.consent',
    'media/mod_cookie_consent/js/consent.min.js',
    [],
    ['defer' => true],
    []
);

?>

<!-- Cookie Consent Banner -->
<div id="cookieConsentBanner" class="cookie-consent-banner cookie-consent-hidden">
    <div class="container py-3">
        <p class="mb-3"><?= htmlspecialchars($consentText) ?></p>

        <div class="d-flex flex-column gap-2 mb-3">
            <?php foreach ($categories as $cat): ?>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="cc-<?= htmlspecialchars($cat->id) ?>"
                        data-consent-category="<?= htmlspecialchars($cat->id) ?>"
                        data-consent-default="<?= $cat->default ? '1' : '0' ?>"
                    >
                    <label class="form-check-label" for="cc-<?= htmlspecialchars($cat->id) ?>">
                        <strong><?= htmlspecialchars($cat->label) ?></strong>
                        <?php if ($cat->description !== ''): ?>
                            <span class="d-block text-body-secondary small"><?= htmlspecialchars($cat->description) ?></span>
                        <?php endif; ?>
                    </label>
                </div>
            <?php endforeach; ?>
        </div>

        <button id="cookieConsentOk" type="button" class="btn btn-primary">
            <?= htmlspecialchars($buttonOk) ?>
        </button>
    </div>
</div>

<!-- Cookie Consent Drawer (reopens banner) -->
<div id="cookieConsentDrawer" class="cookie-consent-drawer">
    <?= htmlspecialchars($drawerText) ?>
</div>
