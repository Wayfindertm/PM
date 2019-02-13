'use strict';

(function(){

	var PM = function(opts){

		var defaults = {
			items: {
				p: ['padding', 'px'],
				pt: ['padding-top', 'px'],
				pb: ['padding-bottom', 'px'],
				pl: ['padding-left', 'px'],
				pr: ['padding-right', 'px'],
				m: ['margin', 'px'],
				mt: ['margin-top', 'px'],
				mb: ['margin-bottom', 'px'],
				ml: ['margin-left', 'px'],
				mr: ['margin-right', 'px'],
				h: ['height', 'px'],
				w: ['width', 'px'],
				vh: ['height', 'vh'],
				vw: ['width', 'vw'],
			},
			breakpoints: {
				xl: 1440,
				lg: 960,
				md: 720,
				sm: 540
			}
		}

		this.css = '\n';

		this.options = Object.assign(defaults, opts);

		this.css += this.createCSS();

		var breakpoints = Object.keys(this.options.breakpoints).reverse();
		for (let bp of breakpoints) {
			let c = this.createCSS(bp);
			if (c !== '') {
				this.css += '@media only screen and (min-width: '+(this.options.breakpoints[bp] - 1)+'px) {\n' + c + '}\n';
			}
		}

		var head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(this.css));
		head.appendChild(style);

	}

	PM.prototype.createCSS = function(b = false) {
		var css = '';
		for (let n in this.options.items) {
			let cn = (b !== false) ? n+'-'+b : n;
			let e = document.querySelectorAll("[class*="+cn+"-]");
			for (let i of e) {
				for (let c of i.classList) {
					let r = new RegExp('^'+cn+'-\\d', 'g');
					if (c.match(r)) {
						let p = c.replace(cn,'').replace(/-/g,' ').replace(/(\d+)/g, '$1'+this.options.items[n][1]);
						css += '.'+c+' { '+this.options.items[n][0]+': '+p+'}\n';
					}
				}
			}
		}
		return css;
	}

	window.PM = PM;

})();