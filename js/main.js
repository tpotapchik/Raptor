(function(app){

	app = {
		$tiles: null,
		$menu:  null,
		$document: null,
		$logo: null,
		$logoSymbol: null,
		$spinner: null, 

		dockedMenu: false,
		originalMenuOffset: null,

		init: function() {
			this.$tiles = $(".tile");
			this.$document = $(document);
			this.$menu = $("#sticky-bar");

			this.$logo = $(".logo");
			this.$logoSymbol = $(".logo__symbol");
			this.$spinner = $(".spinner");

			this.animateSpinner();
			this.originalMenuOffset =  this.$menu.offset().top;

			this.initEvents();
		},

		initEvents: function() {
			var self = this;

			$(window).on("resize", function(){
				self.resizeTiles();
			})

			.on("scroll", function() {
				if (!self.dockedMenu && (self.$menu.offset().top - self.$document.scrollTop() < 0)) {
					self.lockTopNav();
				} if (self.dockedMenu && self.$document.scrollTop() <= self.originalMenuOffset) {
					self.unlockTopNav();
				}
			});

			//вызываем событие, чтоб при загрузке правильно расчитались положения элементов
			$(window).trigger("resize");
			$(document).trigger("scroll");

			$(".catnav__item").hover(function(){
				var $item = $(this),
				$dropdown = $item.find(".products-slider");

				$item.addClass("catnav__item_hover");
				if($dropdown.hasClass("slick-initialized")) {
					return false;
				}

				$dropdown.slick({
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 3,
					responsive: [
						{
							breakpoint: 1600,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3
							}
						},
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						}
					]
				});
			}, function(){
				$(this).removeClass("catnav__item_hover");
			});

			$(".radio").each(function(){
				var $block = $(this),
				$input = $block.find(".radio__input");

				$input.on("click change", function(){
					$(".radio_checked").removeClass("radio_checked");
					$block.addClass("radio_checked");
				});
			});

		},

		// Ресайз тайлов при изменении ширины браузера
		resizeTiles: function() {
			var self = this;

			var $tilesHolder = $(".tiles"),
				tilesHolderOriginalWidth = 1160,
				tilesHolderWidth = $tilesHolder.width(),
				ratio = tilesHolderWidth / tilesHolderOriginalWidth;

			self.$tiles.each(function() {
				var $tile = $(this),
					originalWidth = parseInt($tile.data("width")),
					originalHeight = parseInt($tile.data("height")),
					originalFontSize = 13;

					$tile.css({
						"height": originalHeight * ratio,
						"width": originalWidth * ratio,
						"font-size": originalFontSize * ratio // * fontRatio
					})
			});
		},

		//закрепить меню при скролле вниз 
		lockTopNav: function (){
			var self = this;
           	
           	self.$menu.css({
                position : "fixed",
                top: 0
            });
            self.$logoSymbol.hide();
            self.dockedMenu = true;
		},

		//оставить меню на месте 
		unlockTopNav: function() {
			var self = this;

            self.$menu.css({
                position : "absolute",
                top: self.originalMenuOffset + 'px'
            });
            self.$logoSymbol.show();
            self.dockedMenu = false;
		},

		animateSpinner: function( offset ) {
			if(this.$spinner.length > 0 ) {
				return false;
			}
			var self = this;
			var cSpeed=9;
			var cWidth=128;
			var cHeight=128;
			var cTotalFrames=12;
			var cFrameWidth=128;

			var FPS = Math.round(100/cSpeed);
			var SECONDS_BETWEEN_FRAMES = 1 / FPS;
			var duration = SECONDS_BETWEEN_FRAMES * 1000;
	
			if(typeof offset == "undefined") {
				offset = 0;
			}

			self.$spinner.css({
				'background-position': offset +'px 0'
			});
			setTimeout(function(){
				self.animateSpinner( offset - 128)
			}, duration)
		}
	};


	$(function(){
		app.init();
	});

})(window['app']);