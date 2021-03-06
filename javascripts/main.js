(function(window, $) {
	//分页函数方法
	(function() {
		var data = (function() {
			var tmp = [];
			for (var i = 0; i < 30; i++) {
				tmp.push({
					key: i,
					value: "测试" + i
				});
			}
			return tmp;
		})();
		//
		var pL = $('#PagingLayer'),
			pI = $('#PagingInput');
		pL.data('val', data);
		//分页方法
		var drawContent = function(start, count) {
			var dcObj = pL.find('div.list');
			//
			var dlist = pL.data('val');
			dcObj.empty();
			if (dlist) {
				for (var i = start; i < (dlist.length < start + count ? dlist.length : start + count); i++) {
					var aObj = $(document.createElement('a'));
					aObj.html(data[i].value).attr('title', data[i].value);
					aObj.data('val', data[i].key);
					//liObj.bind('click',function () { }); //可进行下拉选项的绑定
					dcObj.append(aObj);
				}
			}
		}
		//
		pI.bind('click', function(e) {
			pL.css({
				'display': '',
				'left': $(this).position().left + 'px',
				'top': $(this).position().top + $(this).height() + 'px'
			});
			e.stopPropagation();
		});
		//
		data.length < 6 ? drawContent(0, 5) : CMFun.Paging.draw(drawContent, data, 5, pL.find('div.asp_net_pager'));
	})();
	//Hover悬浮效果方法
	(function() {
		//调用悬浮
		CMFun.Hover.init('HoverTarget', 'HoverLayer', {});
	})();
	//Mask
	(function() {
		$('#Mask').bind('click', function() {
			$('#MaskDiv').mask();
		});
		$('#MaskDiv p').click(function(){
			$('#MaskDiv').unmask();
		})
	})();
	//Date  Format
	(function() {
		$('#DateFormat p').html("时间日期(yyyy-MM-dd hh:mm:ss q S)：" + new Date().format('yyyy-MM-dd hh:mm:ss q S'));
	})();
	//
	(function() {
		//FormSubmit
		$('#FormSubmit').bind('click', function() {
			$('#FormSubmitDesc').mask();
		});
		//补充一个关闭的结构
		$('#FormSubmitDesc').click(function(){
			$(this).unmask()
		})
	})();
	

	//d
	$(document).click(function(e) {
		$('.StarPop').css('display', 'none');
	})
})(window, jQuery);