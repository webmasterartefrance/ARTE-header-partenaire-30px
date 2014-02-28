(function($) {
	var ArteHeader = function(element, _options) {
		
		var scriptPath = $('head script').last().attr('src');
		var scriptFolder = scriptPath.substr(0, scriptPath.lastIndexOf( '/' )+1 );
		
		var options = $.extend({
			current : "none",
			menu : false,
			lang : "fr",
			pushContent : false,
			socialButtons : true,
			compact : false,
			css : "http://www.arte.tv/header-arte/assets/css/arte-header.css",
			cssCompact : scriptFolder+"assets/css/arte-header-compact.css"
		}, _options), SELF = this, 
			html='<div class="arte-header-wrapper"> <a class="arte-header-logo" href="http://www.arte.tv/"></a> <div class="arte-header-current"></div> <div class="arte-header-menu">     <ul class="arte-header-menu-col1">         <li><a class="color-direct" data-keyword="direct" href=""></a></li>         <li><a class="color-programmes" data-keyword="programmes" href=""></a></li>         <li><a class="color-plus7" data-keyword="plus7" href=""></a></li>         <li><a class="color-vod" data-keyword="vod" href=""></a></li>     </ul>     <ul class="arte-header-menu-col2">         <li><a class="color-future" data-keyword="future" href=""></a></li>         <li><a class="color-creative" data-keyword="creative" href=""></a></li>         <li><a class="color-liveweb" data-keyword="liveweb" href=""></a></li>     </ul> </div> <div class="arte-header-autopromo">     <div class="arte-header-langs">         <ul class="arte-header-lang">             <li><a lang="fr" href="">FR</a> |</li>             <li><a lang="de" href="">DE</a></li>         </ul>         <ul class="arte-header-social">             <li><a href="" class="arte-header-fb"></a></li>             <li><a href="" class="arte-header-tw"></a></li>             <li><a href="" class="arte-header-go"><div class="g-plusone" data-size="small" data-annotation="none"></div></a></li>         </ul>     </div>     <div class="arte-header-textpromo">     </div> </div></div><a href="/" class="arte-header-toggle"></a>',
			opened = false, $this = $(element), $menu, $menuResponsive, $defaultMenus, $toggleButton, $current, $langs, $col1, $col2, i18n = {
			fr : {
				direct : "DIRECT",
				programmes : "PROGRAMMES",
				plus7 : "+7",
				vod : "VOD DVD",
				future : "FUTURE",
				creative : "CREATIVE",
				liveweb : "LIVE WEB",
				link_direct : "http://www.arte.tv/direct",
				link_programmes : "http://www.arte.tv/programmes",
				link_plus7 : "http://www.arte.tv/guide/fr/plus7",
				link_vod : "http://www.arte.tv/vod",
				link_future : "http://future.arte.tv/fr",
				link_creative : "http://creative.arte.tv/fr",
				link_liveweb : "http://liveweb.arte.tv/fr",
				link_arte : "http://www.arte.tv/fr",
				keywords : {
					direct : "fr_direct",
					programmes : "fr_programmes",
					plus7 : "fr_plus7",
					vod : "fr_vod",
					future : "fr_future",
					creative : "fr_creative",
					liveweb : "fr_liveweb",
					none : "fr_home"
				}
			},
			de : {
				direct : "LIVE",
				programmes : "TV-PROGRAMM",
				plus7 : "+7",
				vod : "EDITION",
				future : "FUTURE",
				creative : "CREATIVE",
				liveweb : "LIVE WEB",
				link_direct : "http://www.arte.tv/live",
				link_programmes : "http://www.arte.tv/programm",
				link_plus7 : "http://www.arte.tv/guide/de/plus7",
				link_vod : "http://www.arte-edition.de/",
				link_future : "http://future.arte.tv/de",
				link_creative : "http://creative.arte.tv/de",
				link_liveweb : "http://liveweb.arte.tv/de",
				link_arte : "http://www.arte.tv/de",
				keywords : {
					direct : "de_direct",
					programmes : "de_programmes",
					plus7 : "de_plus7",
					vod : "de_vod",
					future : "de_future",
					creative : "de_creative",
					liveweb : "de_liveweb",
					none : "de_home"
				}
			}
		}, getI18n = function(k) {
			return i18n[options.lang][k]
		}, onMenuToggle = function(event) {
			event.preventDefault();
			if (!opened) {
				$toggleButton.addClass("selected");
				$menu.addClass("arte-header-menu-open")
			} else {
				$toggleButton.removeClass("selected");
				$menu.removeClass("arte-header-menu-open")
			}
			opened = !opened
		}, showCurrent = function() {
			var cssClass = (options.current == "none") ? "" : options.current;
			$current.attr("class", "arte-header-current " + cssClass);
			if (options.lang == "de") {
				$current.addClass("de")
			}
			$menu.find("ul li a").removeClass("selected");
			$("div.arte-header-current").hide().fadeIn(500);
			if (cssClass.length > 0) {
				$menu.find('ul li a[class*="color-' + cssClass + '"]')
						.addClass("selected")
			}
		}, onResize = function() {
			if (false === options.menu) {
				return
			}
			if ($(window).width() >= 730) {
				$defaultMenus.css({
					display : "block"
				})
			} else {
				$defaultMenus.css({
					display : "none"
				})
			}
		}, handleResponsiveMenu = function() {
			if (false !== options.menu) {
				var html = "";
				$menu.prepend('<ul class="arte-header-menu-responsive"></ul>');
				$.each(options.menu,
						function(k, v) {
							if (v.hasOwnProperty("label")) {
								html += "<li>"
										+ $("<a>" + v.label + "</a>").attr(
												v.attr)[0].outerHTML + "</li>"
							} else {
								if (v.hasOwnProperty("html")) {
									html += "<li>" + v.html + "</li>"
								}
							}
						});
				$menuResponsive = $this.find("ul.arte-header-menu-responsive");
				$menuResponsive.html(html)
			}
		}, onMenuClick = function($this) {
			var keyword = $this.data("keyword");
			xt_med("C", "26", keyword, "N");
			window.location = $this.attr("href")
		}, handleTracking = function() {
			if (typeof xt_med != "undefined") {
				$(".arte-header-menu li a").bind("click", function(event) {
					event.preventDefault();
					onMenuClick($(this))
				})
			}
		}, handleSocial = function() {
			if (false !== options.socialButtons) {
				if (typeof window.___gcfg == "undefined") {
					window.___gcfg = {
						lang : options.lang
					};
					var scriptElement = document.createElement("script");
					scriptElement.src = "https://apis.google.com/js/plusone.js";
					scriptElement.async = true;
					document.getElementsByTagName("head")[0]
							.appendChild(scriptElement)
				}
				$("a.arte-header-fb").bind(
						"click",
						function(event) {
							event.preventDefault();
							window.open("http://www.facebook.com/sharer.php?u="
									+ encodeURIComponent(window.location.href)
									+ "&t=" + encodeURIComponent(""),
									"facebook",
									"toolbar=0,status=0,width=900,height=626")
						});
				$("a.arte-header-tw").bind(
						"click",
						function(event) {
							event.preventDefault();
							window.open("http://twitter.com/home?status="
									+ encodeURIComponent(window.location.href),
									"twitter",
									"toolbar=0,status=0,width=626,height=436")
						})
			} else {
				$this.find("ul.arte-header-social").hide()
			}
		}, handleAutopromo = function() {
			var _handleAutopromo = function() {
				var script = document.createElement("script");
				script.src = "http://www.arte.tv/header-arte/dev/assets/js/jquery.xdomainajax.jquery.1.9.compatible.js";
				var head = document.getElementsByTagName("head")[0], done = false;
				script.onload = script.onreadystatechange = function() {
					if (!done
							&& (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
						done = true;
						script.onload = script.onreadystatechange = null;
						head.removeChild(script);
						var html = "", keywords = getI18n("keywords"), key = (options.current.length == 0) ? "none"
								: options.current, getCacheToken = function() {
							var d = new Date(), m = d.getMinutes(), h = d
									.getHours();
							m = m < 10 ? "0" + m : m;
							h = h < 10 ? "0" + h : h;
							return "" + h + m
						};
						if (keywords.hasOwnProperty(key)) {
							$
									.ajax({
										url : "http://www.arte.tv/sites/autopromo/category/"
												+ keywords[key]
												+ "/?nocache="
												+ getCacheToken(),
										dataType : "json",
										cache : (window.navigator.appName != "Microsoft Internet Explorer"),
										error : function(jqXHR, textStatus,
												errorThrown) {
											if (typeof console != "undefined") {
												console.log(jqXHR, textStatus,
														errorThrown)
											}
										},
										success : function(response) {
											if (response.success) {
												$this
														.find(
																".arte-header-textpromo")
														.html(
																'<div class="autopromo_livepreview">'
																		+ response.data.autopromo_html
																		+ "</div>");
												$(
														"#arte-header div.autopromo_livepreview a")
														.bind(
																"click",
																function(event) {
																	if (typeof xt_med != "undefined") {
																		event
																				.preventDefault();
																		xt_med(
																				"C",
																				"26",
																				encodeURIComponent($(
																						this)
																						.attr(
																								"href"))
																						+ "_"
																						+ response.data.autopromo_category,
																				"N");
																		window.location = $(
																				this)
																				.attr(
																						"href")
																	}
																})
											}
										}
									})
						}
					}
				};
				head.appendChild(script)
			};
			if (arguments.length == 1 && arguments[0] === true) {
				_handleAutopromo()
			} else {
				$(window).load(function(event) {
					_handleAutopromo()
				})
			}
		}, initialize = function(data) {
			
			if ($('head link[href="'+options.css+'"]').length <= 0 ) {
				$('head').append('<link rel="stylesheet" href="'+options.css+'" type="text/css" />');
			}
			if (options.compact && $('head link[href="'+options.cssCompact+'"]').length <= 0 ) {
				$('head').append('<link rel="stylesheet" href="'+options.cssCompact+'" type="text/css" />');
			}
			
			$this.html(data);
			$menu = $this.find("div.arte-header-menu");
			$menuResponsive = $this.find("ul.arte-header-menu-responsive");
			$defaultMenus = $this
					.find("div.arte-header-menu ul.arte-header-menu-col1, div.arte-header-menu ul.arte-header-menu-col2");
			$toggleButton = $this.find("a.arte-header-toggle");
			$current = $this.find("div.arte-header-current");
			$langs = $this.find("div.arte-header-langs");
			$col1 = $this.find(".arte-header-menu-col1");
			$col2 = $this.find(".arte-header-menu-col2");
			$menu.find("ul li a").each(
					function(k, v) {
						var className = $(this).attr("class").replace("color-",
								"");
						$(this).html(getI18n(className)).attr("href",
								getI18n("link_" + className))
					});
			$langs.find("ul li a").removeClass("selected");
			$langs.find('ul li a[lang="' + options.lang + '"]').addClass(
					"selected");
			if (options.pushContent && !options.compact) {
				var menuHeight;
				onMenuToggle = function(event) {
					event.preventDefault();
					if (!opened) {
						$toggleButton.addClass("selected");
						$menu.height(menuHeight)
					} else {
						$toggleButton.removeClass("selected");
						$menu.height(0)
					}
					opened = !opened
				};
				onResize = function() {
					if ($(window).width() >= 730) {
						$menu.removeClass("push-menu");
						$menu.css({
							height : "auto"
						});
						$defaultMenus.css({
							display : "block"
						})
					} else {
						if (!options.menu) {
							menuHeight = $col1.outerHeight(true)
									+ $col2.outerHeight(true)
									+ $menuResponsive.outerHeight(true)
						} else {
							menuHeight = $menuResponsive.height();
							$defaultMenus.css({
								display : "none"
							})
						}
						$menu.addClass("push-menu");
						var h = !opened ? 0 : menuHeight;
						$menu.height(h)
					}
				};
				$menu.addClass("arte-header-menu-open")
			}
			$toggleButton.bind("click", function(event) {
				onMenuToggle(event)
			});
			var currentLink = getI18n("link_" + options.current);
			if (currentLink != undefined) {
				$(".arte-header-current").css({
					cursor : "pointer"
				}).bind("click", function(event) {
					window.location = currentLink
				})
			}
			$this.find("a.arte-header-logo").attr("href", getI18n("link_arte"));
			showCurrent();
			handleResponsiveMenu();
			handleTracking();
			handleSocial();
			handleAutopromo();
			$(window).resize(onResize);
			onResize()
		};
		initialize(html);
		this.handleAutopromo = handleAutopromo;
		this.updateLangHref = function(lang, href) {
			$this
					.find(
							'div.arte-header-autopromo div.arte-header-langs ul.arte-header-lang li a[lang="'
									+ lang + '"]').attr("href", href);
			return this
		};
		this.addLang = function(label, href, selected) {
			$(".arte-header-lang li:last a").after("|");
			if (selected) {
				$(".arte-header-lang li a").removeClass("selected")
			}
			$(".arte-header-lang").append(
					"<li><a" + ((selected) ? ' class="selected"' : "")
							+ ' lang="' + label.toLowerCase() + '" href="'
							+ href + '">' + label + "</a></li>")
		};
		this.setCurrentResponsive = function(index) {
			$this.find("ul.arte-header-menu-responsive li a").removeClass(
					"selected");
			$this.find("ul.arte-header-menu-responsive li:eq(" + index + ") a")
					.addClass("selected");
			return this
		};
		this.updateLangLabel = function(lang, label) {
			$this
					.find(
							'div.arte-header-autopromo div.arte-header-langs ul.arte-header-lang li a[lang="'
									+ lang + '"]').html(label);
			return this
		};
		this.hideLang = function(lang) {
			if (typeof lang == "undefined") {
				$this
						.find(
								"div.arte-header-autopromo div.arte-header-langs ul.arte-header-lang")
						.hide()
			} else {
				if (typeof lang == "string") {
					$this
							.find(
									'div.arte-header-autopromo div.arte-header-langs ul.arte-header-lang li a[lang="'
											+ lang + '"]').parent().hide()
				}
			}
			return this
		};
		this.setCurrent = function(current) {
			options.current = current;
			showCurrent();
			return this
		};
		this.hide = function() {
			$this.hide();
			return this
		};
		this.show = function() {
			$this.show();
			return this
		};
		this.destroy = function() {
			$toggleButton.unbind("click");
			$(window).unbind("resize", onResize);
			$(".arte-header-menu li a").unbind("click");
			$("a.arte-header-fb").unbind("click");
			$("a.arte-header-tw").unbind("click");
			$this.html("");
			return this
		}
	};
	$.fn.arteHeader = function(options) {
		return this.each(function() {
			var element = $(this);
			if (element.data("plugin-arte-header")) {
				return
			}
			var plugin = new ArteHeader(this, options);
			element.data("plugin-arte-header", plugin);
			element.trigger("loaded")
		})
	}
})(jQuery);