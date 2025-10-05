(function() {
    'use strict';
    
    /**
     * Initialize tracking on page load
     * This ensures the DOM is fully loaded before attaching event listeners
     */
    if (document.readyState === 'loading') {
        // DOM is still loading, wait for it to be ready
        document.addEventListener('DOMContentLoaded', initializeTracker);
    } else {
        // DOM is already loaded, initialize immediately
        initializeTracker();
    }
    
    /**
     * Main initialization function
     * Sets up all event listeners and tracking mechanisms
     */
    function initializeTracker() {
        console.log('%c========================================', 'color: #667eea; font-weight: bold;');
        console.log('%c🎯 UNIVERSAL EVENT TRACKER INITIALIZED', 'color: #667eea; font-weight: bold; font-size: 16px;');
        console.log('%c========================================', 'color: #667eea; font-weight: bold;');
        console.log('📊 Tracking started at:', new Date().toLocaleString());
        console.log('🌐 Page URL:', window.location.href);
        console.log('📱 User Agent:', navigator.userAgent);
        console.log('🖥️  Screen Resolution:', `${screen.width}x${screen.height}`);
        console.log('📏 Viewport Size:', `${window.innerWidth}x${window.innerHeight}`);
        console.log('');
        
        // Track initial page view
        trackPageView();
        
        // Set up click event tracking for all elements
        setupClickTracking();
        
        // Set up form submission tracking
        setupFormTracking();
        
        // Set up input field tracking
        setupInputTracking();
        
        // Set up scroll tracking
        setupScrollTracking();
        
        // Set up mouse movement tracking (throttled)
        setupMouseTracking();
        
        // Set up keyboard event tracking
        setupKeyboardTracking();
        
        // Set up visibility change tracking (tab switching)
        setupVisibilityTracking();
        
        // Set up navigation tracking
        setupNavigationTracking();
    }
    
    /**
     * Tracks page view event
     * Logs comprehensive page information to console
     */
    function trackPageView() {
        const pageViewData = {
            event: 'PAGE_VIEW',
            timestamp: new Date().toISOString(),
            url: window.location.href,
            path: window.location.pathname,
            title: document.title,
            referrer: document.referrer || 'Direct',
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            screen: {
                width: screen.width,
                height: screen.height
            }
        };
        
        // Log page view to console with styling
        console.log('%c📄 PAGE VIEW', 'background: #4CAF50; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
        console.table(pageViewData);
        console.log('');
    }
    
    /**
     * Sets up click event tracking on all elements
     * Uses event delegation on document for efficiency
     */
    function setupClickTracking() {
        // Use capture phase to catch events before they bubble
        document.addEventListener('click', function(event) {
            const element = event.target;
            
            // Gather detailed information about the clicked element
            const clickData = {
                event: 'CLICK',
                timestamp: new Date().toISOString(),
                element: {
                    tagName: element.tagName,
                    id: element.id || 'N/A',
                    className: element.className || 'N/A',
                    textContent: element.textContent ? element.textContent.substring(0, 50) + '...' : 'N/A',
                    value: element.value || 'N/A',
                    type: element.type || 'N/A',
                    name: element.name || 'N/A'
                },
                position: {
                    x: event.clientX,
                    y: event.clientY,
                    pageX: event.pageX,
                    pageY: event.pageY
                },
                cssSelector: getCSSSelector(element),
                computedStyles: getRelevantStyles(element),
                xpath: getXPath(element)
            };
            
            // Log click event with visual styling
            console.log('%c👆 CLICK EVENT', 'background: #2196F3; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            console.log('Element:', element);
            console.table(clickData.element);
            console.log('Position:', clickData.position);
            console.log('CSS Selector:', clickData.cssSelector);
            console.log('XPath:', clickData.xpath);
            console.log('Computed Styles:', clickData.computedStyles);
            console.log('Full Data:', clickData);
            console.log('');
        }, true); // Use capture phase
    }
    
    /**
     * Sets up form submission tracking
     * Captures form data before submission
     */
    function setupFormTracking() {
        document.addEventListener('submit', function(event) {
            const form = event.target;
            
            // Extract form data
            const formData = new FormData(form);
            const formValues = {};
            
            // Convert FormData to object (excluding sensitive fields)
            for (let [key, value] of formData.entries()) {
                // Mask password fields for security
                if (key.toLowerCase().includes('password')) {
                    formValues[key] = '***MASKED***';
                } else {
                    formValues[key] = value;
                }
            }
            
            const submitData = {
                event: 'FORM_SUBMIT',
                timestamp: new Date().toISOString(),
                form: {
                    id: form.id || 'N/A',
                    name: form.name || 'N/A',
                    action: form.action || 'N/A',
                    method: form.method || 'GET'
                },
                fields: formValues
            };
            
            // Log form submission
            console.log('%c📝 FORM SUBMIT', 'background: #FF9800; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            console.log('Form Element:', form);
            console.table(submitData.form);
            console.log('Form Data:', formValues);
            console.log('');
        }, true);
    }
    
    /**
     * Sets up input field tracking
     * Tracks changes in input, textarea, and select elements
     */
    function setupInputTracking() {
        // Track input changes (debounced to avoid excessive logging)
        let inputTimeout;
        
        document.addEventListener('input', function(event) {
            clearTimeout(inputTimeout);
            
            inputTimeout = setTimeout(function() {
                const element = event.target;
                
                // Only track form elements
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                    const inputData = {
                        event: 'INPUT_CHANGE',
                        timestamp: new Date().toISOString(),
                        element: {
                            tagName: element.tagName,
                            type: element.type || 'N/A',
                            id: element.id || 'N/A',
                            name: element.name || 'N/A',
                            value: element.type === 'password' ? '***MASKED***' : element.value
                        }
                    };
                    
                    console.log('%c⌨️  INPUT CHANGE', 'background: #9C27B0; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
                    console.table(inputData.element);
                    console.log('');
                }
            }, 500); // Debounce by 500ms
        }, true);
    }
    
    /**
     * Sets up scroll tracking
     * Tracks scroll position and percentage
     */
    function setupScrollTracking() {
        let scrollTimeout;
        let lastScrollPosition = 0;
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
                
                // Only log if scroll changed significantly (more than 10%)
                if (Math.abs(scrollPercentage - lastScrollPosition) > 10) {
                    lastScrollPosition = scrollPercentage;
                    
                    const scrollData = {
                        event: 'SCROLL',
                        timestamp: new Date().toISOString(),
                        position: scrollTop,
                        percentage: scrollPercentage + '%',
                        direction: scrollTop > lastScrollPosition ? 'down' : 'up'
                    };
                    
                    console.log('%c📜 SCROLL EVENT', 'background: #00BCD4; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
                    console.table(scrollData);
                    console.log('');
                }
            }, 200); // Throttle by 200ms
        });
    }
    
    /**
     * Sets up mouse movement tracking (heavily throttled)
     * Tracks general mouse movement patterns
     */
    function setupMouseTracking() {
        let mouseTimeout;
        let lastMousePosition = { x: 0, y: 0 };
        
        document.addEventListener('mousemove', function(event) {
            clearTimeout(mouseTimeout);
            
            mouseTimeout = setTimeout(function() {
                // Only log if mouse moved significantly (more than 100px)
                const distance = Math.sqrt(
                    Math.pow(event.clientX - lastMousePosition.x, 2) + 
                    Math.pow(event.clientY - lastMousePosition.y, 2)
                );
                
                if (distance > 100) {
                    lastMousePosition = { x: event.clientX, y: event.clientY };
                    
                    const mouseData = {
                        event: 'MOUSE_MOVE',
                        timestamp: new Date().toISOString(),
                        position: {
                            x: event.clientX,
                            y: event.clientY
                        },
                        elementUnderCursor: event.target.tagName
                    };
                    
                    console.log('%c🖱️  MOUSE MOVE', 'background: #607D8B; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
                    console.table(mouseData);
                    console.log('');
                }
            }, 1000); // Heavy throttle - 1 second
        });
    }
    
    /**
     * Sets up keyboard event tracking
     * Tracks key presses (excluding passwords)
     */
    function setupKeyboardTracking() {
        document.addEventListener('keydown', function(event) {
            // Don't track if typing in password field
            if (event.target.type === 'password') return;
            
            const keyData = {
                event: 'KEYPRESS',
                timestamp: new Date().toISOString(),
                key: event.key,
                code: event.code,
                ctrlKey: event.ctrlKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                targetElement: event.target.tagName
            };
            
            console.log('%c⌨️  KEYPRESS', 'background: #795548; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            console.table(keyData);
            console.log('');
        });
    }
    
    /**
     * Sets up page visibility tracking
     * Tracks when user switches tabs or minimizes browser
     */
    function setupVisibilityTracking() {
        document.addEventListener('visibilitychange', function() {
            const visibilityData = {
                event: 'VISIBILITY_CHANGE',
                timestamp: new Date().toISOString(),
                state: document.hidden ? 'hidden' : 'visible'
            };
            
            console.log('%c👁️  VISIBILITY CHANGE', 'background: #E91E63; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            console.table(visibilityData);
            console.log('');
        });
    }
    
    /**
     * Sets up navigation tracking
     * Tracks before unload and page navigation
     */
    function setupNavigationTracking() {
        window.addEventListener('beforeunload', function() {
            const navigationData = {
                event: 'PAGE_EXIT',
                timestamp: new Date().toISOString(),
                timeOnPage: Math.round((Date.now() - performance.timing.navigationStart) / 1000) + ' seconds',
                url: window.location.href
            };
            
            console.log('%c🚪 PAGE EXIT', 'background: #F44336; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            console.table(navigationData);
            console.log('');
        });
    }
    
    /**
     * Generates a unique CSS selector for an element
     * @param {HTMLElement} element - The target element
     * @returns {string} - CSS selector string
     */
    function getCSSSelector(element) {
        // If element has an ID, use it
        if (element.id) {
            return '#' + element.id;
        }
        
        // Build selector path
        const path = [];
        while (element.nodeType === Node.ELEMENT_NODE) {
            let selector = element.nodeName.toLowerCase();
            
            // Add classes if they exist
            if (element.className && typeof element.className === 'string') {
                selector += '.' + element.className.trim().split(/\s+/).join('.');
            }
            
            path.unshift(selector);
            element = element.parentNode;
            
            if (!element || element.nodeType !== Node.ELEMENT_NODE) {
                break;
            }
        }
        
        return path.join(' > ');
    }
    
    /**
     * Gets XPath for an element
     * @param {HTMLElement} element - The target element
     * @returns {string} - XPath string
     */
    function getXPath(element) {
        if (element.id) {
            return `//*[@id="${element.id}"]`;
        }
        
        if (element === document.body) {
            return '/html/body';
        }
        
        let index = 0;
        const siblings = element.parentNode.childNodes;
        
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (index + 1) + ']';
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                index++;
            }
        }
    }
    
    /**
     * Gets relevant computed styles for an element
     * @param {HTMLElement} element - The target element
     * @returns {Object} - Object containing relevant CSS properties
     */
    function getRelevantStyles(element) {
        const computed = window.getComputedStyle(element);
        
        return {
            display: computed.display,
            position: computed.position,
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            border: computed.border,
            padding: computed.padding,
            margin: computed.margin,
            width: computed.width,
            height: computed.height
        };
    }
    
    // Export tracking object for external access if needed
    window.EventTracker = {
        version: '1.0.0',
        initialized: true,
        trackCustomEvent: function(eventName, eventData) {
            console.log('%c🎯 CUSTOM EVENT: ' + eventName, 'background: #673AB7; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            console.log('Event Data:', eventData);
            console.log('Timestamp:', new Date().toISOString());
            console.log('');
        }
    };
    
    console.log('%c✅ Event Tracker Ready!', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
    console.log('Use EventTracker.trackCustomEvent(name, data) to track custom events');
    console.log('');
    
})();