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
	//
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



})(jQuery, window);