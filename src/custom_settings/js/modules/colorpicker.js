define(['lib/flexiColorPicker'], function(ColorPicker) {

	/** FlexiColorPicker by David Durman, https://github.com/DavidDurman/FlexiColorPicker, MIT
	 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
	 *  TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
	 *  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
	 *  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
	 *  DEALINGS IN THE SOFTWARE.
	 */
	
	// Named web colors index for converting values to HEX; required for flexiColorPicker
	var webColorIndex = {
		aliceblue: '#F0F8FF',	  antiquewhite: '#FAEBD7',  aqua:'#00ffff',       aquamarine:'#7fffd4',   azure:'#f0ffff',	      beige:'#f5f5dc',        yellow:'#ffff00',
		bisque:'#ffe4c4',	      blanchedalmond:'#ffebcd', black:'#000000',	    blue:'#0000ff',	        blueviolet:'#8a2be2',	  brown:'#a52a2a',        yellowgreen:'#9ACD32',
		burlywood:'#deb887',	  cadetblue:'#5f9ea0',	    chartreuse:'#7fff00',	chocolate:'#d2691e',    coral:'#ff7f50',	      darkgray:'#a9a9a9',     cornflowerblue:'#6495ed',
		cornsilk:'#fff8dc',	    crimson:'#dc143c',	      cyan:'#00ffff',     	darkblue:'#00008b',	    darkcyan:'#008b8b',	    gainsboro:'#dcdcdc',    darkgoldenrod:'#b8860b',	
		darkgrey:'#a9a9a9',	    darkgreen:'#006400',	    darkkhaki:'#bdb76b',	darkmagenta:'#8b008b',	darkorange:'#ff8c00',   lightgrey:'#d3d3d3',    darkolivegreen:'#556b2f',
		darkorchid:'#9932cc',	  darkred:'#8b0000',	      darksalmon:'#e9967a',	darkseagreen:'#8fbc8f',	darkslateblue:'#483d8b',honeydew:'#f0fff0',     darkslategray:'#2f4f4f',
		darkslategrey:'#2f4f4f',darkturquoise:'#00ced1',	darkviolet:'#9400d3',	deeppink:'#ff1493',	    deepskyblue:'#00bfff',	dimgray:'#696969',      whitesmoke:'#f5f5f5',
		dimgrey:'#696969',	    dodgerblue:'#1e90ff',   	firebrick:'#b22222',	floralwhite:'#fffaf0',	forestgreen:'#228b22',	fuchsia:'#ff00ff',	    tan:'#d2b48c',
		ghostwhite:'#f8f8ff',	  gold:'#ffd700',	          goldenrod:'#daa520',	gray:'#808080',       	grey:'#808080',	        green:'#008000',		    white:'#ffffff',
		hotpink:'#ff69b4',	    indianred:'#cd5c5c',      indigo:'#4b0082',	    ivory:'#fffff0',	      khaki:'#f0e68c',	      lavender:'#e6e6fa',	    lavenderblush:'#fff0f5',	
		lemonchiffon:'#fffacd',	lightblue:'#add8e6',	    lightcoral:'#f08080',	lightcyan:'#e0ffff',	  lightgray:'#d3d3d3',	  greenyellow:'#adff2f',  lightgoldenrodyellow:'#fafad2', 
		lightgreen:'#90ee90',	  lightpink:'#ffb6c1',	    lightsalmon:'#ffa07a',lightseagreen:'#20b2aa',lightskyblue:'#87cefa',	lawngreen:'#7cfc00',    lightslategray:'#778899',
		lightyellow:'#ffffe0',  lightslategrey:'#778899', lime:'#00ff00',       limegreen:'#32cd32',    linen:'#faf0e6',        royalblue:'#4169e1',    lightsteelblue:'#b0c4de',
		magenta:'#ff00ff',	    maroon:'#800000',	        mediumblue:'#0000cd',	mediumorchid:'#ba55d3', purple:'#800080',       rosybrown:'#bc8f8f',	  mediumaquamarine:'#66cdaa', 
		mediumpurple:'#9370d8',	mediumseagreen:'#3cb371',	mistyrose:'#ffe4e1',  navajowhite:'#ffdead',  sienna:'#a0522d',       teal:'#008080',         mediumslateblue:'#7b68ee',		
		midnightblue:'#191970', mediumvioletred:'#c71585',mintcream:'#f5fffa',	moccasin:'#ffe4b5',	    orchid:'#da70d6',       skyblue:'#87ceeb',      mediumspringgreen:'#00fa9a',
		navy:'#000080',	        oldlace:'#fdf5e6',	      olive:'#808000',	    olivedrab:'#6b8e23',	  orange:'#ffa500',			  wheat:'#f5deb3',        palegoldenrod:'#eee8aa',
		palegreen:'#98fb98',	  paleturquoise:'#afeeee',	papayawhip:'#ffefd5', palevioletred:'#d87093',orangered:'#ff4500',    violet:'#ee82ee',       mediumturquoise:'#48d1cc',
		peachpuff:'#ffdab9',	  peru:'#cd853f',           pink:'#ffc0cb',	      plum:'#dda0dd',	        powderblue:'#b0e0e6',		red:'#ff0000',	        turquoise:'#40e0d0',
		saddlebrown:'#8b4513',	salmon:'#fa8072',	        sandybrown:'#f4a460',	seagreen:'#2e8b57',	    seashell:'#fff5ee',		  silver:'#c0c0c0',	      tomato:'#ff6347',
		slateblue:'#6a5acd',	  slategray:'#708090',	    slategrey:'#708090',	snow:'#fffafa',	        springgreen:'#00ff7f',	steelblue:'#4682b4',		thistle:'#d8bfd8'
	};
	
	// initialize color-picker. We need to keep track of the last positions
	// of the picker-indicator to make sure that they are not reset when the 
	// slider indicator changes position
	var picker = document.getElementById('cs-colorpicker'),	
		pickerObj = ColorPicker(picker, function(hex, rgb, hsv) {
			ko.dataFor(picker.parentNode).value(hex);
		});
	
	// color box function (toggle colorpicker visibility) +
	// hide picker when user hovers over another setting
	function convertColorValue(e) {
		var target = e.target || e.srcElement, colors,
				colorValue = target.parentNode.getElementsByTagName('input')[0].value;
		if (!picker) {
			picker = document.createElement('div');
			picker.id = 'cs-colorpicker';
		}
		if (!target.parentNode.getElementsByClassName('picker-indicator').length)
			target.parentNode.appendChild(picker);
		picker.style.display = 'block';
				
		if (/#/.test(colorValue)) {
			if (colorValue.length === 4)
				colorValue = '#' + colorValue[1] + colorValue[1] + colorValue[2] + colorValue[2] + colorValue[3] + colorValue[3];
			if (colorValue.length === 7)
				pickerObj.setHex(colorValue);
				
		} else if (/rgb/.test(colorValue)) {
			colors = colorValue.replace(/rgba*\(/, '').split(',');
			colorValue = {r: parseInt(colors[0]), g: parseInt(colors[1]), b: parseInt(colors[2].replace(')',''))};
			pickerObj.setRgb(colorValue);
			
		} else if (/hsl/.test(colorValue)) {
			colors = colorValue.replace(/hsla*\(/, '').split(',');
			colorValue = {h: parseInt(colors[0]), s: parseInt(colors[1].replace('%',''))/100, v: parseInt(colors[2].replace(')','').replace('%',''))/100};
			pickerObj.setHsv(colorValue);
			
		} else if (webColorIndex.hasOwnProperty(colorValue))
			pickerObj.setHex(webColorIndex[colorValue]);
	}
	
	$(document.body).on('click', '.colorbox', convertColorValue);
	//$(document.body).on('change', '.setting.color .input-field', convertColorValue);
	$(document.body).on('mouseover', '.setting', function(e) {
			var $this = $(e.target || e.srcElement);
			if ($this.hasClass('setting') && !$this.find(picker).length)
					picker.style.display = 'none';
			});

});