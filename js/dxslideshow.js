/*
 * Dx-Slideshow v0.1
 * 
 * Copyright 2011, Luca Lauretta
 * Dual licensed under the MIT or GPL version 2 licenses.
 */
(function( $ ){
	$.extend($.ui, { dxslideshow: { version: "0.1" } });
	
	$.fn.dxslideshow = function(method) {
		var plugin_arguments = arguments;
		var slideshow = this;
		var classes = {
			screen: 'screen',
			index: 'index'
		};
		var functions = {
			show: function () {
				var $el = $(this);
				var $sl = $(slideshow);
				$sl.find('.'+classes.screen).html($el.html());
			}
		};
		
		var methods = {
			init : function( options ) {
				var $this = $(this);
				$this.prepend('<div class="'+ classes.screen +'"></div>');
				$this.find('.'+ classes.index +' li').click(functions.show);
				functions.show.call($this.find('.'+ classes.index +' li:first'));
			}
		};
		
		this.each(function() {
			if(methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(plugin_arguments, 1));
			} else if( typeof method === 'object' || ! method ) {
				return methods.init.apply(this, plugin_arguments);
			} else {
				$.error('Method ' +  method + ' does not exist!');
			}
			return false;
		});
		
		return slideshow;
	};

	var PROP_NAME = 'dxslideshow';
	var dpuuid = new Date().getTime();
	var instActive;

	$.dxslideshow = {
		version: $.ui.dxslideshow.version,
		initialized: false,
		uuid: new Date().getTime()
	};

	// Add another global to avoid noConflict issues with inline event handlers
	window['DP_jQuery_' + dpuuid] = $;
})( jQuery );