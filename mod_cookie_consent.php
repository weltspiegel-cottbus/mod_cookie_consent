<?php

/**
 * @package     Weltspiegel\Module\CookieConsent
 *
 * @copyright   Weltspiegel Cottbus
 * @license     MIT; see LICENSE file
 */

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

// Get module parameters
/** @var $params */

$consentText = $params->get('consent_text', 'Diese Seite nutzt selbst keine Cookies zur Nutzer-Verfolgung. Falls du allerdings YouTube Trailer direkt anschauen willst, musst du diese explizit freischalten. Damit erlaubst du ein Tracking seitens YouTube.');
$buttonOk    = $params->get('button_ok', 'OK');
$drawerText  = $params->get('drawer_text', 'Cookie-Einstellungen');

// v2: data-driven consent categories (each renders as a switch in the banner)
$categories = [];
foreach ((array) $params->get('categories', []) as $row) {
    $row = (object) $row;
    $id  = trim((string) ($row->cat_id ?? ''));

    if ($id === '') {
        continue;
    }

    $categories[] = (object) [
        'id'          => $id,
        'label'       => (string) ($row->cat_label ?? $id) ?: $id,
        'description' => (string) ($row->cat_description ?? ''),
        'default'     => (string) ($row->cat_default ?? '0') === '1',
    ];
}

// No fallback: the module is fully autonomous and knows nothing about any
// specific feature. With no categories configured the banner shows just text
// and the close button.

require ModuleHelper::getLayoutPath('mod_cookie_consent', $params->get('layout', 'default'));
