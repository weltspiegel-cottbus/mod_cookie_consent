x# Cookie Consent Module

Joomla 5/6 module for GDPR-compliant cookie consent management for third-party services (YouTube, etc.).

## Description

This module provides a cookie consent banner for managing user consent to third-party services. It uses `localStorage` to store consent preferences (no cookies required) and dispatches custom events that other components can listen to for dynamic content loading.

**Key Features:**
- GDPR-compliant consent management without using cookies
- Configurable banner text and button labels
- Persistent drawer tab for reopening consent settings
- Custom DOM events for integration with other extensions
- Responsive design with Bootstrap 5 grid

## Requirements

- Joomla 5.0 or higher (tested with Joomla 6)
- PHP 8.1 or higher

## Installation

### Manual Installation

1. Build the package:
   ```bash
   npm install
   npm run release
   ```

2. Upload the generated ZIP file via Joomla Administrator:
   - System → Extensions → Install
   - Upload `mod_cookie_consent-*.zip`

3. Publish the module:
   - Content → Site Modules → New
   - Select "Cookie Consent"
   - Assign to desired position (typically a bottom position)
   - Publish it

4. Configure the module:
   - Consent Text: Message explaining cookie usage
   - Enable Button Text: Text for accepting cookies (e.g., "With YouTube Videos")
   - Dismiss Button Text: Text for declining (e.g., "Ok")
   - Drawer Text: Label shown in the drawer tab (e.g., "Cookie Settings")

### Via GitHub Releases

Download the latest release ZIP from the GitHub releases page and install via Joomla Administrator.

### Automatic Updates

Once installed, the module can be updated automatically through Joomla's update system:
- System → Update → Extensions
- Joomla checks the update server configured in the module manifest
- New versions are automatically detected and can be installed with one click

The update manifest is hosted at:
`https://raw.githubusercontent.com/weltspiegel-cottbus/mod_cookie_consent/main/update-manifest.xml`

## Integration with Other Extensions

The module stores consent state in `localStorage` with the key `cookie_consent` and dispatches a `cookieConsentChanged` event when consent changes.

### Example: YouTube Embed Integration

```javascript
// Check current consent
const consent = localStorage.getItem('cookie_consent');

if (consent === 'granted') {
    // Load YouTube iframe
} else {
    // Show placeholder
}

// Listen for consent changes
window.addEventListener('cookieConsentChanged', (event) => {
    if (event.detail.consent === 'granted') {
        // Dynamically load YouTube content
    }
});
```

## Development

### Build Process

The module uses a modern build toolchain with asset minification:

```bash
# Install dependencies
npm install

# Build minified assets (JS + CSS)
npm run build

# Build JS only
npm run build:js

# Build CSS only
npm run build:css

# Create Joomla installation package
npm run package

# Build and package in one command
npm run release
```

**Build Output:**
- `media/js/consent.min.js` - Minified JavaScript (ES2020 target)
- `media/css/consent.min.css` - Minified CSS with vendor prefixes

The package ZIP **only includes minified assets**, not source files, for optimal production performance.

### Creating Releases

This project uses [changelogen](https://github.com/unjs/changelogen) for automated changelog generation and releases based on conventional commits.

#### Commit Message Format

Follow conventional commits format:

```
<type>: <description>

[optional body]
```

**Types:**
- `feat:` New feature (bumps minor version)
- `fix:` Bug fix (bumps patch version)
- `perf:` Performance improvement (bumps patch version)
- `refactor:` Code refactoring (bumps patch version)
- `docs:` Documentation changes
- `build:` Build system changes
- `chore:` Maintenance tasks
- `ci:` CI/CD changes
- `style:` Code style changes
- `test:` Test changes

**Examples:**
```bash
git commit -m "feat: add animation to banner"
git commit -m "fix: correct responsive breakpoints"
git commit -m "docs: update integration examples"
```

#### Release Commands

Install dependencies first:
```bash
npm install
```

**Before releasing**, update version numbers in three files:

1. **`mod_cookie_consent.xml`**:
   - Update the `<version>` tag to match the new version

2. **`media/joomla.asset.json`**:
   - Update the `version` field to match the new version

3. **`update-manifest.xml`**:
   - Update the `<version>` tag to match the new version
   - Update the download URL to match the new version tag and filename

4. Commit these changes

**Note:** Do NOT manually update `package.json` - changelogen will automatically bump the version there.

Then create a release:

```bash
# Patch release (0.1.0 -> 0.1.1) - for bug fixes
npm run release:patch

# Minor release (0.1.0 -> 0.2.0) - for new features
npm run release:minor

# Major release (0.1.0 -> 1.0.0) - for breaking changes
npm run release:major
```

This will:
1. Generate/update `CHANGELOG.md`
2. Bump version in `package.json`
3. Create a git commit with the changes
4. Create a git tag (e.g., `v0.2.0`)
5. Push to GitHub
6. Create a GitHub release with changelog
7. Trigger GitHub Actions to build, minify, package, and attach the ZIP file

#### Manual Changelog Generation

To generate changelog without releasing:

```bash
npm run changelog
```

### What Gets Packaged

The build script includes only the necessary files:
- `mod_cookie_consent.xml` - Module manifest
- `mod_cookie_consent.php` - Module entry point
- `tmpl/` - Layout files
- `language/` - Translation files
- `media/` - CSS, JavaScript, and asset manifest

Excluded from package:
- `.idea/` - IDE files
- `.git/`, `.github/` - Git repository and workflows
- `.build/` - Build scripts
- `node_modules/` - Dependencies
- `package.json`, `package-lock.json` - npm files
- `*.zip` - Previous builds
- Source assets (only minified versions included)

## Continuous Integration

### GitHub Actions

The module includes a GitHub Actions workflow (`.github/workflows/release.yml`) that automatically builds and attaches the ZIP file to releases.

#### How It Works

When you run `npm run release:minor` (or patch/major):
1. **Changelogen** creates the GitHub release with changelog
2. **GitHub Actions** triggers automatically on release creation
3. **Workflow** builds minified assets, creates the ZIP, and attaches it to the release

The workflow:
1. Checks out the code
2. Sets up Node.js LTS with npm caching
3. Installs dependencies with `npm ci`
4. Minifies JS and CSS assets
5. Creates the installable ZIP package (with only minified assets)
6. Uploads the ZIP to the release created by changelogen

No manual intervention needed - just run the release command!

## License

MIT License - see LICENSE file for details

## Credits

Developed for Weltspiegel Cottbus cinema
