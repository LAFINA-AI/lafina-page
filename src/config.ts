/**
 * Application configuration.
 * Change DOWNLOAD_URL to update all download buttons and SEO schema throughout the app.
 */
export const DOWNLOAD_URL = "https://github.com/LAFINA-AI/LAFINA/releases/download/v0.3.0-beta/lafina_v0.3.0_beta.apk";

// Extract version from DOWNLOAD_URL. E.g. "https://.../download/v0.3.0-beta/..." -> "v0.3.0-beta"
export const VERSION = (() => {
  const match = DOWNLOAD_URL.match(/\/releases\/download\/([^/]+)/);
  return match ? match[1] : "v0.3.0-beta";
})();

// Clean version string for display (e.g., "v0.3.0-beta" -> "v0.3.0")
export const DISPLAY_VERSION = VERSION.replace(/-beta$/, '');
