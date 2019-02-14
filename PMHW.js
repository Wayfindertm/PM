'use strict';

(function(){

	var isObject = function (o) {
		return typeof o === 'object' && o !== null;
	}

	var extend = function (defaults, options) {
	    if (options !== undefined && options !== null) {
	    	const keys = Object.keys(Object(options));
        	for (let idx = 0, len = keys.length; idx < len; idx += 1) {
      			const key = keys[idx];
      			if (isObject(defaults[key]) && isObject(options[key])) {
      				defaults[key] = extend(defaults[key], options[key]);
      			} else if (!isObject(defaults[key]) && isObject(options[key])) {
      				defaults[key] = extend({}, options[key]);
      			} else {
      				defaults[key] = options[key]
      			}
      		}
	    }
	    return defaults;
	};

	var PMHW = function(options){

		// Default options
		var defaults = {
			items: {
				p: 	['padding', 'px'],
				pt: ['padding-top', 'px'],
				pb: ['padding-bottom', 'px'],
				pl: ['padding-left', 'px'],
				pr: ['padding-right', 'px'],
				m: 	['margin', 'px'],
				mt: ['margin-top', 'px'],
				mb: ['margin-bottom', 'px'],
				ml: ['margin-left', 'px'],
				mr: ['margin-right', 'px'],
				h: 	['height', 'px'],
				w: 	['width', 'px'],
				vh: ['height', 'vh'],
				vw: ['width', 'vw'],
			},
			breakpoints: {
				xl: 1440,
				lg: 960,
				md: 720,
				sm: 540
			},
			cache: true
		}

		// Load options
		this.options = extend(defaults, options);

		// Create page style element
		var head = document.head || document.getElementsByTagName('head')[0];
		this.style = document.createElement('style');
		this.style.id = 'PMHW';
		this.style.type = 'text/css';
		head.appendChild(this.style);

		// Load cached styles
		if (this.options.cache) {
			let ls = localStorage.getItem('PMHW');
			if (ls !== undefined) {
				this.style.textContent = ls;
			}
		}

		this.reload();
	}

	// Create css from class name
	PMHW.prototype.createCSS = function(b = false) {
		var css = '';
		for (let n in this.options.items) {
			let cn = (b !== false) ? n+'-'+b : n,
				e = document.querySelectorAll("[class*="+cn+"-]"),
				hc = [];
			for (let i of e) {
				for (let c of i.classList) {
					let r = new RegExp('^'+cn+'-\\d', 'g');
					if (c.match(r)) {
						if (hc.indexOf(c) === -1) {
							let p = c.replace(cn,'').replace(/-/g,' ').replace(/(\d+)/g, '$1'+this.options.items[n][1]);
							css += '.'+c+' { '+this.options.items[n][0]+':'+p+'}\n';
							hc.push(c);
						}
					}
				}
			}
		}
		return css;
	}

	// Reload css
	PMHW.prototype.reload = function() {
		this.css = '';

		// Create default styles
		this.css += this.createCSS();

		// Create breakpoints styles
		var breakpoints = Object.keys(this.options.breakpoints).reverse();
		for (let bp of breakpoints) {
			let c = this.createCSS(bp);
			if (c !== '') {
				this.css += '@media only screen and (min-width: '+(this.options.breakpoints[bp] - 1)+'px) {\n' + c + '}\n';
			}
		}

		// Save styles in cache
		if (this.options.cache) {
			try {
				localStorage.setItem('PMHW', this.css);
			} catch (e) {
				if (e == QUOTA_EXCEEDED_ERR) {
					console.warn('Ooops, localStorage quota exceeded.');
				} else {
					console.warn('WTF?');
				}
				localStorage.removeItem("PMHW");
			}
		}

		this.style.textContent = this.css;
	}

	window.PMHW = PMHW;

})();