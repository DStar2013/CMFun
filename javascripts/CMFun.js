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
	_.HoverInit = (function() {
		function _hover(tid, eid, cfg) {
			var leftFix = (cfg && cfg.leftFix) || 0,
				topFix = (cfg && cfg.topFix) || 0;
			target.bind('mouseover', function() {
				if (el.css) {

				}

			});


		}

		//
		function getHideWidth(cDom) {

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