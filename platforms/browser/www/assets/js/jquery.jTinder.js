/*
 * jTinder v.1.0.0
 * https://github.com/do-web/jTinder
 * Requires jQuery 1.7+, jQuery transform2d
 *
 * Copyright (c) 2014, Dominik Weber
 * Licensed under GPL Version 2.
 * https://github.com/do-web/jTinder/blob/master/LICENSE
 */
(function ($, window, document, undefined) {
	var pluginName = "jTinder",
		defaults = {
			onDislike: null,
			onLike: null,
			animationRevertSpeed: 200,
			animationSpeed: 400,
			threshold: 1,
			likeSelector: '.yes',
			dislikeSelector: '.no'
		};
	var container = null;
	var panes = null;
	var $that = null;
	var xStart = 0;
	var yStart = 0;
	var touchStart = false;
	var posX = 0, posY = 0, lastPosX = 0, lastPosY = 0, pane_width = 0, pane_width = 0, pane_count = 0, current_pane = 0;

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init(element);
	}
	Plugin.prototype = {
		init: function (element) {
			container = $(">ul", element);
			panes = $(">ul>li", element);
			pane_width = container.width()*1.5;
			pane_height = 500;
			pane_count = panes.length;
			current_pane = panes.length - 1;
			$that = this;

			$(panes[current_pane-1]).addClass('next');
			$(panes[current_pane]).addClass('active');

			$(element).bind('touchstart mousedown', this.handler);
			$(element).bind('touchmove mousemove', this.handler);
			$(element).bind('touchend mouseup', this.handler);
		},
        bindNew: function(element){
            panes = $(">ul>li", element);
            pane_count = panes.length;
            current_pane = panes.length - 1;
        },		
		showPane: function (index) {
			$(panes[current_pane-2]).addClass('next');
			$(panes[current_pane-1]).removeClass('next').addClass('active');
			$(panes[current_pane]).removeClass('active').addClass('previous');
			current_pane = index;
		},
		next: function(){
			return this.showPane(current_pane - 1);
		},
		dislike: function() {
			$('.bookmark').css('opacity',0);
			$('.yes').css('opacity',0);
			$('.no').css('opacity',1);
			panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
				if($that.settings.onDislike) {
					$that.settings.onDislike(panes.eq(current_pane));
				}
				$('.yes, .no').css('opacity',0);
				$that.next();
			});
		},
		like: function() {
			$('.bookmark').css('opacity',0);
			$('.yes').css('opacity',1);
			$('.no').css('opacity',0);
			panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (pane_width*-1.5) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
				if($that.settings.onLike) {
					$that.settings.onLike(panes.eq(current_pane));
				}
				$('.yes, .no').css('opacity',0);
				$that.next();
			});
		},
		bookmark: function() {
			$('.bookmark').css('opacity',1);
			$('.yes').css('opacity',0);
			$('.no').css('opacity',0);

			console.log('bookmark');
		},
		handler: function (ev) {
			ev.preventDefault();
			switch (ev.type) {
				case 'touchstart':
					if(touchStart === false) {
						touchStart = true;
						xStart = ev.originalEvent.touches[0].pageX;
						yStart = ev.originalEvent.touches[0].pageY;
					}
				case 'mousedown':
					if(touchStart === false) {
						touchStart = true;
						xStart = ev.pageX;
						yStart = ev.pageY;
					}
				case 'mousemove':
				case 'touchmove':
					if(touchStart === true) {
						var pageX = typeof ev.pageX == 'undefined' ? ev.originalEvent.touches[0].pageX : ev.pageX;
						var pageY = typeof ev.pageY == 'undefined' ? ev.originalEvent.touches[0].pageY : ev.pageY;
						var deltaX = parseInt(pageX) - parseInt(xStart);
						var deltaY = parseInt(pageY) - parseInt(yStart);
						var percent = ((100 / pane_width) * deltaX) / pane_count;
						posX = deltaX + lastPosX;
						posY = deltaY + lastPosY;
						panes.eq(current_pane).css("transform", "translate(" + posX + "px," + posY + "px) rotate(" + (percent / 2) + "deg)");
						var opaX = (Math.abs(deltaX) / $that.settings.threshold) / 100 + 0.2;
						var opaY = (Math.abs(deltaY) / $that.settings.threshold) / 100 + 0.2;

						opaX = (opaX > 1.0)?1.0:opaX;
						opaY = (opaY > 1.0)?1.0:opaY;

						if (posX > 50) {
							$('.bookmark').css('opacity',0);
							$('.yes').css('opacity',opaX);
							$('.no').css('opacity',0);
						}
						else if (posX < -50) {
							$('.bookmark').css('opacity',0);
							$('.no').css('opacity',opaX);
							$('.yes').css('opacity',0);
						}

						// console.log(opaY);

						if(posY < -50){
							$('.bookmark').css('opacity',opaY);
							$('.no').css('opacity',0);
							$('.yes').css('opacity',0);
							// console.log('bookmark');							
						}
					}
					break;
				case 'mouseup':
				case 'touchend':
					touchStart = false;
					var pageX = (typeof ev.pageX == 'undefined') ? ev.originalEvent.changedTouches[0].pageX : ev.pageX;
					var pageY = (typeof ev.pageY == 'undefined') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
					var deltaX = parseInt(pageX) - parseInt(xStart);
					var deltaY = parseInt(pageY) - parseInt(yStart);

					posX = deltaX + lastPosX;
					posY = deltaY + lastPosY;
					var opaX = Math.abs((Math.abs(deltaX) / $that.settings.threshold) / 100 + 0.2);
					var opaY = Math.abs((Math.abs(deltaY) / $that.settings.threshold) / 100 + 0.2);
					if (opaX >= 1) {
						if (posX > 0) {
							panes.eq(current_pane).animate({"transform": "translate(" + (pane_width) + "px," + (posY + pane_width) + "px) rotate(60deg)"}, $that.settings.animationSpeed, function () {
								if($that.settings.onLike) {
									$that.settings.onLike(panes.eq(current_pane));
								}
								$that.next();
							});
						} 
						else {
							panes.eq(current_pane).animate({"transform": "translate(-" + (pane_width) + "px," + (posY + pane_width) + "px) rotate(-60deg)"}, $that.settings.animationSpeed, function () {
								if($that.settings.onDislike) {
									$that.settings.onDislike(panes.eq(current_pane));
								}
								$that.next();
							});
						}

					}
					else if(opaY >= 1){ // for bookmarking here
						if(posY <= 0){
							panes.eq(current_pane).animate({"transform": "translate(0px,-1000px) rotate(0deg)"}, $that.settings.animationSpeed, function () {
								if($that.settings.onBookmark) {
									$that.settings.onBookmark(panes.eq(current_pane));
								}
								$that.next();
							});
						}
					}
					else {
						lastPosX = 0;
						lastPosY = 0;
						panes.eq(current_pane).animate({"transform": "translate(0px,0px) rotate(0deg)"}, $that.settings.animationRevertSpeed);
						panes.eq(current_pane).find($that.settings.likeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);
						panes.eq(current_pane).find($that.settings.dislikeSelector).animate({"opacity": 0}, $that.settings.animationRevertSpeed);						
					}
					$('.yes, .no, .bookmark').css('opacity',0);
				break;
			}
		}
	};

	$.fn[ pluginName ] = function (options) {
		this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
			else if ($.isFunction(Plugin.prototype[options])) {
				$.data(this, 'plugin_' + pluginName)[options]();
			}
            else {
                $.data(this, "plugin_" + pluginName).bindNew(this);
            }
		});

		return this;
	};
})(jQuery, window, document);