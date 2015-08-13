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
$().mask()： 弹出层弹出  <br/>
$().unmask()： 弹出层收起  <br/>

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

<h4 style="color:gray">功能：时间格式的Format</h4>

函数名： Date .Format('yyyy-MM-dd hh:mm:ss q S')

参数：  <br/>
yyyy：年份  <br/>
MM：月份  <br/>
dd：天数  <br/>
hh：小时  <br/>
mm：分钟  <br/>
ss：秒钟  <br/>
q：季度  <br/>
S：millisecond <br/>

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

<h4 style="color:gray">功能：Submit Form 提交表单</h4>

函数名：CMFun.FormSubmit({})

参数： <br/>
url:  Action的地址  <br/>
method:  POST/GET   <br/>
target:  _blank/_self   <br/>
data:  data数据格式为json格式    <br/>

也可以将整个form 的html字符串传入，或者不包含form的html字符串也可以当data传入

☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆

#
