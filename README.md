# CMFun
基于jQuery封装的一些常用的Function

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

<h4 style="color:gray">功能：下拉分页功能</h4>

函数名： CMFun.draw(fn, list, count, container)  <br/>

参数： <br/>
fn: 执行执行绘制下拉的函数 <br/>
list: 绘制数据json数组 [{}, {}] <br/>
count: 绘制数据json数组长度 <br/>
container: 分页Page所在Div的jQuery对象 <br/>

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

<h4 style="color:gray">功能：鼠标悬浮浮层功能</h4>

函数名： CMFun.Hover.init(tid, eid, cfg) <br/>

参数： <br/>
tid：目标base对象的id  <br/>
eid：悬浮浮层对象的id  <br/>
cfg：json的配置参数，可选，{topFix: (Int), leftFix: (Int)}  <br/>

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

<h4 style="color:gray">功能：模态弹出层弹出功能</h4>

函数名：$(xxx).mask()  $(xxx).unmask()   

参数： <br/>
extend扩展了jQ的$.fn的方法 <br/>
$().mask()： 弹出层弹出
$().unmask()： 弹出层收起 

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

#
