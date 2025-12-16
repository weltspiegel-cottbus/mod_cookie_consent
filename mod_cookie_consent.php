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

$consentText   = $params->get('consent_text', 'Diese Seite nutzt selbst keine Cookies zur Nutzer-Verfolgung. Falls du allerdings YouTube Trailer direkt anschauen willst, musst du diese explizit freischalten. Damit erlaubst du ein Tracking seitens YouTube.');
$buttonEnable  = $params->get('button_enable', 'Mit YouTube Videos');
$buttonDismiss = $params->get('button_dismiss', 'Ok');
$drawerText    = $params->get('drawer_text', 'Cookie-Einstellungen');

require ModuleHelper::getLayoutPath('mod_cookie_consent', $params->get('layout', 'default'));
