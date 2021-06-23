$(function () {
    console.log(navigator);
    document.onclick = function () {
    $.ajax({
        url: 'http://ip-api.com/json/',
        method: 'GET'
    }).done(function (response) {
        console.log(response);
        var userBrowserDim = "Height: " + window.screen.height + ", Width: " + window.screen.width
        var userLoc = "Country: " + response.country + ", City: " + response.city + ", region: " + response.regionName
        $('.v-dimntn em').text(userBrowserDim)
        $('.v-loc em').text(userLoc)
        $('.v-tz em').text(response.timezone)
        $('.v-os em').text(get_client_os())
        $('.v-br em').text(detect_browser())
        $('.v-ua em').text(navigator.userAgent)
    })
        
    }
})


function detect_browser() {
	// =========================================================== browser detecttion =====================================
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	
	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	
	// Chrome 1 - 79
	var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
	
	// Edge (based on chromium) detection
	var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
	
	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;
	
	
	var output = 'Detecting browsers by ducktyping:<hr>';
	output += 'isFirefox: ' + isFirefox + '<br>';
	output += 'isChrome: ' + isChrome + '<br>';
	output += 'isSafari: ' + isSafari + '<br>';
	output += 'isOpera: ' + isOpera + '<br>';
	output += 'isIE: ' + isIE + '<br>';
	output += 'isEdge: ' + isEdge + '<br>';
	output += 'isEdgeChromium: ' + isEdgeChromium + '<br>';
	output += 'isBlink: ' + isBlink + '<br>';
	if (isFirefox == true) {
		return "Firefox"
	}else if (isChrome == true) {
		return "Chrome"
	}else if (isSafari == true) {
		return "Safari"
	}else if (isOpera == true) {
		return "Opera"
	}else if (isIE == true) {
		return "Internet Explorer"
	}else if (isEdge == true) {
		return "Edge"
	}else if (isEdgeChromium == true) {
		return "Edge Chrome"
	}else if (isBlink == true) {
		return "Blink"
	}

	
}
// ================================================================= client screen tracking =================================

function get_client_os() {
	// ============================================================ operating system detection ================================================
	var module = {
		options: [],
		header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
		dataos: [
			{ name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
			{ name: 'Windows', value: 'Win', version: 'NT' },
			{ name: 'iPhone', value: 'iPhone', version: 'OS' },
			{ name: 'iPad', value: 'iPad', version: 'OS' },
			{ name: 'Kindle', value: 'Silk', version: 'Silk' },
			{ name: 'Android', value: 'Android', version: 'Android' },
			{ name: 'PlayBook', value: 'PlayBook', version: 'OS' },
			{ name: 'BlackBerry', value: 'BlackBerry', version: '/' },
			{ name: 'Macintosh', value: 'Mac', version: 'OS X' },
			{ name: 'Linux', value: 'Linux', version: 'rv' },
			{ name: 'Palm', value: 'Palm', version: 'PalmOS' }
		],
		databrowser: [
			{ name: 'Chrome', value: 'Chrome', version: 'Chrome' },
			{ name: 'Firefox', value: 'Firefox', version: 'Firefox' },
			{ name: 'Safari', value: 'Safari', version: 'Version' },
			{ name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
			{ name: 'Opera', value: 'Opera', version: 'Opera' },
			{ name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
			{ name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
		],
		init: function () {
			var agent = this.header.join(' '),
				os = this.matchItem(agent, this.dataos),
				browser = this.matchItem(agent, this.databrowser);
			
			return { os: os, browser: browser };
		},
		matchItem: function (string, data) {
			var i = 0,
				j = 0,
				html = '',
				regex,
				regexv,
				match,
				matches,
				version;
			
			for (i = 0; i < data.length; i += 1) {
				regex = new RegExp(data[i].value, 'i');
				match = regex.test(string);
				if (match) {
					regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
					matches = string.match(regexv);
					version = '';
					if (matches) { if (matches[1]) { matches = matches[1]; } }
					if (matches) {
						matches = matches.split(/[._]+/);
						for (j = 0; j < matches.length; j += 1) {
							if (j === 0) {
								version += matches[j] + '.';
							} else {
								version += matches[j];
							}
						}
					} else {
						version = '0';
					}
					return {
						name: data[i].name,
						version: parseFloat(version)
					};
				}
			}
			return { name: 'unknown', version: 0 };
		}
	};
	
	var e = module.init(),
		debug = '';
	
	debug += '' + e.os.name + ' '+e.os.version;
	

	return debug;
	
}