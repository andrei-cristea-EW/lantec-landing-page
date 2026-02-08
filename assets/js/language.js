/**
 * Lantec Language Switcher
 * Handles Romanian/English language toggle for Lantec.ro
 *
 * Usage: Automatically initializes on page load
 * All translatable elements should have data-ro and data-en attributes
 */

(function() {
	'use strict';

	// Default language
	const DEFAULT_LANG = 'ro';

	// Language state
	let currentLang = DEFAULT_LANG;

	/**
	 * Initialize language system
	 */
	function init() {
		// Load saved language from localStorage
		const savedLang = localStorage.getItem('lantec-lang');
		if (savedLang && (savedLang === 'ro' || savedLang === 'en')) {
			currentLang = savedLang;
		}

		// Set initial language
		setLanguage(currentLang, false);

		// Bind toggle buttons
		const langButtons = document.querySelectorAll('.lang-btn');
		langButtons.forEach(function(btn) {
			btn.addEventListener('click', function() {
				const lang = this.getAttribute('data-lang');
				setLanguage(lang, true);
			});
		});
	}

	/**
	 * Set active language
	 * @param {string} lang - Language code ('ro' or 'en')
	 * @param {boolean} saveToStorage - Whether to save preference
	 */
	function setLanguage(lang, saveToStorage) {
		if (lang !== 'ro' && lang !== 'en') return;

		currentLang = lang;

		// Update button states
		document.querySelectorAll('.lang-btn').forEach(function(btn) {
			if (btn.getAttribute('data-lang') === lang) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		});

		// Update all translatable elements
		updateContent(lang);

		// Update HTML lang attribute
		document.documentElement.setAttribute('lang', lang);

		// Save preference
		if (saveToStorage) {
			localStorage.setItem('lantec-lang', lang);
		}
	}

	/**
	 * Update page content based on language
	 * @param {string} lang - Language code
	 */
	function updateContent(lang) {
		const attr = 'data-' + lang;

		// Update text content
		document.querySelectorAll('[' + attr + ']').forEach(function(el) {
			const translatedText = el.getAttribute(attr);

			// Handle different element types
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				// Handle placeholder for form inputs
				const placeholderAttr = 'data-placeholder-' + lang;
				if (el.hasAttribute(placeholderAttr)) {
					el.placeholder = el.getAttribute(placeholderAttr);
				}
				// Handle value for submit buttons
				if (el.type === 'submit' || el.type === 'button') {
					el.value = translatedText;
				}
			} else {
				// Regular text content
				el.textContent = translatedText;
			}
		});

		// Update select options
		document.querySelectorAll('select option[data-' + lang + ']').forEach(function(option) {
			option.textContent = option.getAttribute('data-' + lang);
		});

		// Update meta tags for SEO
		updateMetaTags(lang);
	}

	/**
	 * Update meta tags for SEO
	 * @param {string} lang - Language code
	 */
	function updateMetaTags(lang) {
		// Update page title
		const titleEl = document.querySelector('title');
		if (titleEl && titleEl.hasAttribute('data-' + lang)) {
			titleEl.textContent = titleEl.getAttribute('data-' + lang);
		}

		// Update meta description
		let descMeta = document.querySelector('meta[name="description"]');
		if (!descMeta) {
			descMeta = document.createElement('meta');
			descMeta.name = 'description';
			document.head.appendChild(descMeta);
		}

		const descContent = lang === 'ro'
			? 'Lantec Computer Systems - Distribuitor exclusiv MOBOTIX în România. Soluții avansate de supraveghere video cu tehnologie termală, automatizare Crestron, accesorii MXessories și echipamente Allnet pentru afaceri.'
			: 'Lantec Computer Systems - Exclusive MOBOTIX distributor in Romania. Advanced thermal video surveillance, Crestron automation, MXessories accessories and Allnet equipment for businesses.';

		descMeta.content = descContent;
	}

	/**
	 * Get current language
	 * @returns {string} Current language code
	 */
	function getCurrentLanguage() {
		return currentLang;
	}

	// Initialize on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// Expose API for potential external use
	window.LantecLang = {
		setLanguage: setLanguage,
		getCurrentLanguage: getCurrentLanguage
	};

})();
