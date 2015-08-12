# CMFun
基于jQuery封装的一些常用的Function

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
函数名： CMFun.draw(fn, list, count, container)

参数：
fn: 执行执行绘制下拉的函数
list: 绘制数据json数组 [{},{}]
count: 绘制数据json数组长度
container: 分页Page所在Div的jQuery对象

Demo示例：
Html结构：
<input type="text" style="width:268px;height:20px;" id="PagingInput">
<div class="ui-selector unselectable ui-asearch in points-ltlb StarPop" id="PagingLayer" style="position: absolute; width: 268px; display:none; z-index:5;">
  <div class="ui-selector-list">
    <div class="list"></div>
  </div>
  <div class="ui-paging"><div class="asp_net_pager"></div></div>
</div>
Js代码
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
☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
