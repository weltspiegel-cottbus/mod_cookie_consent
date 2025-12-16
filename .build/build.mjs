#!/usr/bin/env node

/**
 * Build script for mod_cookie_consent
 * Minifies JavaScript and CSS assets
 */

import { build } from 'esbuild';
import { transform } from 'lightningcss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const buildJS = args.includes('--js') || args.length === 0;
const buildCSS = args.includes('--css') || args.length === 0;

/**
 * Minify JavaScript files
 */
async function minifyJS() {
    const jsFiles = [
        {
            input: 'media/js/consent.js',
            output: 'media/js/consent.min.js'
        }
    ];

    console.log('Minifying JavaScript files...');

    for (const file of jsFiles) {
        const inputPath = path.join(rootDir, file.input);
        const outputPath = path.join(rootDir, file.output);

        try {
            await build({
                entryPoints: [inputPath],
                outfile: outputPath,
                minify: true,
                target: 'es2020',
                format: 'iife',
                legalComments: 'none',
                banner: {
                    js: `/**\n * Cookie Consent Module JavaScript (Minified)\n * @package Weltspiegel\\Module\\CookieConsent\n * @license MIT\n */`
                }
            });
            console.log(`  ✓ ${file.input} → ${file.output}`);
        } catch (error) {
            console.error(`  ✗ Error minifying ${file.input}:`, error.message);
            process.exit(1);
        }
    }
}

/**
 * Minify CSS files
 */
async function minifyCSS() {
    const cssFiles = [
        {
            input: 'media/css/consent.css',
            output: 'media/css/consent.min.css'
        }
    ];

    console.log('Minifying CSS files...');

    for (const file of cssFiles) {
        const inputPath = path.join(rootDir, file.input);
        const outputPath = path.join(rootDir, file.output);

        try {
            const css = fs.readFileSync(inputPath, 'utf8');
            const { code } = transform({
                filename: inputPath,
                code: Buffer.from(css),
                minify: true,
                targets: {
                    safari: (13 << 16) | (0 << 8), // Safari 13
                    firefox: 70 << 16,              // Firefox 70
                    chrome: 80 << 16                // Chrome 80
                }
            });

            const banner = `/**\n * Cookie Consent Module Styles (Minified)\n * @package Weltspiegel\\Module\\CookieConsent\n * @license MIT\n */\n`;
            fs.writeFileSync(outputPath, banner + code.toString());
            console.log(`  ✓ ${file.input} → ${file.output}`);
        } catch (error) {
            console.error(`  ✗ Error minifying ${file.input}:`, error.message);
            process.exit(1);
        }
    }
}

/**
 * Main build process
 */
async function main() {
    console.log('Building mod_cookie_consent assets...\n');

    try {
        if (buildJS) {
            await minifyJS();
        }
        if (buildCSS) {
            await minifyCSS();
        }
        console.log('\n✓ Build completed successfully');
    } catch (error) {
        console.error('\n✗ Build failed:', error.message);
        process.exit(1);
    }
}

main();
