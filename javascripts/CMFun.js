(function($, w) {
	//sth comm Function
	//copyright d.star
	var _ = {};
	if (!w.CMFun) w.CMFun = _;
	//☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
	//function hover
	//arg1: base对象id
	//arg2: 浮层对象id
	//arg3: json配置，{topFix: (Int), leftFix: (Int)}
	_.Hover = (function() {
		function _hover(tid, eid, cfg) {
			var leftFix = (cfg && cfg.leftFix) || 0,
				topFix = (cfg && cfg.topFix) || 0,
				target = $('#' + tid),
				el = $('#' + eid);
			target.bind('mouseover', function(e) {
				if (el.css('display') != 'none') {
					return false;
				}
				var innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
				var elWidth = getHideWidth(el);
				var left = (target.offset().left) + leftFix;
				if (innerWidth - left < elWidth + 20) {
					left = left - (elWidth - (innerWidth - left)) - 40;
				}
				el.css({
					'top': (target.offset().top + topFix) + 'px',
					'left': left + 'px'
				});
				el.data('fi', window.setTimeout(function() {
					FadeIn(el.get(0));
				}, 150));
				window.clearTimeout(el.data('fo'));
			}).bind('mouseout', function(e) {
				window.clearTimeout(el.data('fi'));
				el.data('fo', window.setTimeout(function() {
					FadeOut(el.get(0));
				}, 500));
			});
			el.bind('mouseover', function(e) {
				window.clearTimeout(el.data('fo'));
			}).bind('mouseout', function(e) {
				window.clearTimeout(el.data('fi'));
				el.data('fo', window.setTimeout(function() {
					FadeOut(el.get(0));
				}, 500));
			});
		}
		//获取隐藏高度
		function getHideWidth(cDom) {
			cDom.css({
				'visibility': 'hidden',
				'display': 'block'
			});
			var width = cDom.width();
			cDom.css({
				'visibility': '',
				'display': 'none'
			});
			return width;
		}
        function FadeIn(el) {
            if (el.getAttribute('fading') == 'true') {
                return false;
            }
            el.style.display = 'block';
            el.style.opacity = 0;
            el.style.filter = 'Alpha(opacity=' + 0 + ')';
            el.setAttribute('fading', 'true');
            var o = 0;
            var fi = setInterval(function () {
                if (o <= 10) {
                    el.style.opacity = o / 10;
                    el.style.filter = 'Alpha(opacity=' + o * 10 + ')';
                    o++;
                } else {
                    clearInterval(fi);
                    el.setAttribute('fading', 'false');
                }
            }, 20);
        }
        function FadeOut(el) {
            if (el.getAttribute('fading') == 'true') {
                return false;
            }
            el.setAttribute('fading', 'true');
            var o = 10;
            var fo = setInterval(function () {
                if (o >= 0) {
                    el.style.opacity = o / 10;
                    el.style.filter = 'Alpha(opacity=' + o * 10 + ')';
                    o--;
                } else {
                    clearInterval(fo);
                    el.style.display = 'none';
                    el.setAttribute('fading', 'false');
                }
            }, 20);
        }

        return {
        	init: _hover
        }
	})();
	//☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
	//Paging 分页方法
	_.Paging = (function() {
		var P = {
			draw: function(fn, list, count, container) {
				container.find('.prev').unbind('click', P.onPreviousClick).remove();
				container.find('.otherPage').unbind('click', P.onLinkClick).remove();
				container.find('.next').unbind('click', P.onNextClick).remove();
				//
				fn(0, count);
				if (Math.ceil(list.length / count) < 2) return false;
				//
				var previous = $(document.createElement('a'));
				previous.addClass('prev');
				P.setHref(previous);
				previous.html('<-');
				var next = $(document.createElement('a'));
				next.addClass('next');
				P.setHref(next);
				next.html('->');
				//
				container.data('list', list).data('count', count).data('fn', fn);
				previous.bind('click', P.onPreviousClick);
				container.append(previous);
				next.bind('click', P.onNextClick);
				container.append(next);
				P.drawPages(0, list, count, container);
				return true;
			},
			drawPages: function(nIndex, list, count, container) {
				container.find('.otherPage').unbind('click', P.onLinkClick).remove();
				var start = 0, end = 0;
				var previous = container.find('.prev'),
					next = container.find('.next');
				//
				var len = Math.ceil(list.length / count);
				previous.css('display', '');
				next.css('display', '');
				//判断<- ->显示逻辑
				if (nIndex < 3 && nIndex != len - 1) {
					start = 0;
					end = len > 4 ? 5 : len;
					(0 == nIndex) && previous.css('display', 'none');
				} else if (nIndex > len - 3) {
					start = len < 5 ? 0 : len - 5;
					end = len;
					(nIndex == end - 1) && next.css('display', 'none');
				} else {
					start = nIndex - 2;
					end = nIndex + 3;
				}
				for (var i = start; i < end; i++) {
					container.append(P.makeLink(i));
				}
				container.find('.otherPage[index="' + nIndex + '"]').addClass('current');
				container.append(next.get(0));
			},
			setHref: function(obj) {
				obj.attr('href', 'javascript:void(0);');
			},
			makeLink: function(index) {
				var aObj = $(document.createElement('a'));
				P.setHref(aObj);
				aObj.addClass('otherPage');
				aObj.attr('index', index);
				aObj.html(index + 1);
				aObj.bind('click', P.onLinkClick);
				return aObj;
			},
			onPreviousClick: function(e) {
				var page = $(this).parent();
				var currentPage = page.find('.current');
				var count = page.data('count');
                var start = parseInt(currentPage.attr('index'));
                var fn = page.data('fn');
                if(start >=1){
                	currentPage.removeClass('current');
                	page.find('a[index="' + (start - 1) + '"]').addClass('current');
                	fn(start - 1, count);
                }
                P.drawPages(start - 1, page.data('list'), count, page);
				e.stopPropagation();
				e.preventDefault()
			},
			onNextClick: function(e) {
				var page = $(this).parent();
				var currentPage = page.find('.current');
				var count = page.data('count');
				var start = parseInt(currentPage.attr('index'));
				var fn = page.data('fn');
				if ((start + 1) * count <= list.length - 1) {
					currentPage.removeClass('current');
					page.find('a[index="' + (start + 1) + '"]').addClass('current');
					fn((start + 1) * count, count);
				}
				P.drawPages(start + 1, page.data('list'), count, page);
				e.stopPropagation();
				e.preventDefault()
			},
			onLinkClick: function(e) {
				//当前页点击，不刷新
				if ($(this).hasClass('current')) {
					return false;
				}
				var page = $(this).parent();
				var index = parseInt($(this).attr('index'));
				var count = page.data('count');
				var fn = page.data('fn');
				page.find('.current').removeClass('current');
				$(this).addClass('current');
				fn(index * count, count);
				P.drawPages(index, page.data('list'), count, page);

				e.stopPropagation();
				e.preventDefault()
			}
		}

		return {
			draw: P.draw
		}
	})();
	//☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
	// Form 提交Function
	// 可接受参数为json或者string字符串
	_.FormSubmit = (function() {
		var FS = function(opt) {
			var f = this._form = this._form || function() {
				var f = document.createElement('form');
				f.style.display = 'none';
				document.body.appendChild(f);
				return f;
			}();
			var d = this._div = this._div || function() {
				var d = document.createElement('div');
				d.style.display = 'none';
				document.body.appendChild(d);
				return d;
			}();
			//
			if (opt.data) {
				if (typeof opt.data == 'object') {
					var html = [],
						d = opt.data;
					for (var n in d) {
						if (!d.hasOwnProperty(n)) continue;
						var v = d[n] === undefined || d[n] === null ? '' : d[n].toString();
						v = v.replace(/\"/gi, '\\"');
						html.push('<input type=hidden name="' + n + '" value="' + v + '"/>');
						opt.data = html.join('');
					}
					$(f).attr('action', opt.url)
						.attr('method', opt.method || 'GET')
						.attr('target', opt.target || '_self')
						.html(opt.data);
					f.submit();
				} else {
					if (opt.data.indexOf('</form>') > -1) {
						$(d).html(opt.data).find('form')[0].submit();
					} else {
						$(f).attr('action', opt.url)
							.attr('method', opt.method || 'GET')
							.attr('target', opt.target || '_self')
							.html(opt.data);
						f.submit();
					}
				}
			}
		}

		return FS;
	})();


	//extend函数扩展
	$.extend($.fn, {
		mask: function(o) {
			var a = this[0];
			if (!a)
				return console.log("mask", "the cDom object is empty"), this;
			this.unmask();
			var b = {};
			b.cssText = a.style.cssText;
			b.nextSibling = a.nextSibling;
			b.parentNode = a.parentNode;
			a.style.position = "absolute";
			a.style.display = "block";
			var C = {
				a_bgColor: (o && o.bgColor) || "#fff"
			};
			//        var _ina = document.createElement("container");
			//        _ina.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;z-index:100;";
			//        var _inb = document.body;
			//        _inb || document.write('<span id="__body__" style="display:none;">cQuery</span>');
			//        ((_inb = document.body.firstChild) ? document.body.insertBefore(_ina, _inb) : document.body.appendChild(_ina));
			//        (_inb = document.getElementById("__body__")) && _inb.parentNode.removeChild(_inb);
			//        var _container = $(_ina);
			//        _container.append(a);
			a.style.left = (document.documentElement.scrollLeft || document.body.scrollLeft || 0) + Math.max(0, (document.documentElement.clientWidth - a.offsetWidth) / 2) + "px";
			a.style.top = (document.documentElement.scrollTop || document.body.scrollTop || 0) + Math.max(0, (document.documentElement.clientHeight - a.offsetHeight) / 2) + "px";
			var c = "background:" + C.a_bgColor + ";position:absolute;left:0;top:0;width:" + Math.max(document.documentElement.clientWidth, document.documentElement.scrollWidth, document.body.clientWidth, document.body.scrollWidth) + "px;height:" + Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight) + "px;";
			b.maskDiv = document.createElement("div");
			b.maskDiv.style.cssText = c + "filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);opacity:0.6;";
			$(b.maskDiv).insertBefore(a);
			var isIE = /msie/.test(navigator.userAgent.toLowerCase());
			isIE && (b.maskIframe = document.createElement("iframe"), b.maskIframe.style.cssText = c + "filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);opacity:0;", $(b.maskIframe).insertBefore(b.maskDiv));
			this.data("__mask__", b);
			return this;
		},
		unmask: function() {
			if (!this[0])
				return console.log("mask", "the cDom object is empty"), this;
			var a = this.data("__mask__");
			a && (this[0].style.cssText = a.cssText, (a.nextSibling ? this.first().insertBefore(a.nextSibling) : this.first().appendTo(a.parentNode)), $(a.maskDiv).remove(), a.maskIframe && $(a.maskIframe).remove(), this.removeData("__mask__"));
		},
		placeholder: function() {
			if ("placeholder" in document.createElement("input")) {
				return this; //如果原生支持placeholder属性，则返回对象本身
			} else {
				return this.each(function() {
					var _this = $(this);
					_this.focus(function() {
						if (_this.val() === _this.attr("placeholder")) {
							_this.css("color", "");
							_this.val("")
						}
					}).blur(function() {
						if (_this.val().length === 0) {
							_this.val(_this.attr("placeholder"));
							_this.css("color", "gray");
						}
					});
					if (!_this.val()) {
						_this.val(_this.attr("placeholder"));
						_this.css("color", "gray");
					};
				})
			}
		}
	});
	//Date 对象扩展方法format，可以进行日期格式
	Date.prototype.format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		}
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	}
})(jQuery, window);