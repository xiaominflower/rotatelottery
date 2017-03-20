/* 
移动端转盘抽奖插件 
var mylottery = new Lottery({}) //调用
 */  

(function(w){

    var Lottery = function(opt){
    	var _this = this;
		!opt && (opt = {});
		_this.opt = {};
		for(var ele in _this.options){
			_this.opt[ele] = opt[ele] || _this.options[ele];
		}
		_this.init();
	}

    Lottery.prototype = {
		init : function(){
			var _this = this,
				opt = _this.opt,
			    turncate = opt.turncate;
			turncate.style[$.CSSTransform] = 'rotate('+opt.angel+'deg)'; 
		
		},
        rotateFn : function(index){  //转盘旋转  index为中奖区下标
        	var _this = this,
        		opt = _this.opt,
			    turncate = opt.turncate,
			    rotateType = opt.rotateType,
			    angel = null,
			    endAngle = null,
			   	singleAngle = 360 /opt.areaNumber, //单个奖区角度值
			   	disAngel =  opt.angel;

			if(rotateType == 'random'){
				endAngle = Math.random() * singleAngle;  //随机得出结果在扇区内的角度
				endAngle = Math.max(opt.deviation, endAngle);
		        endAngle = Math.min(singleAngle - opt.deviation, endAngle);
		        //endAngle = Math.ceil(endAngle + ((index-1) * singleAngle)); //设计稿边界线正中间
		        endAngle = Math.ceil(endAngle + ((index-2) * singleAngle))+disAngel;
			}else{
				//endAngle = index * singleAngle - singleAngle/2; //设计稿边界线正中间
				endAngle = (index-1) * singleAngle+disAngel; //设计稿默认扇区正中间
			}
			
			if (opt.flag_click) return;
			_this.flag_click = true;  //转盘转动过程中不可再次触发

			turncate.style[$.transition] = $.CSSTransform + ' '+opt.duration+'ms ease-out';
			turncate.style[$.CSSTransform] = 'rotate('+(opt.round+endAngle)+'deg)';
		
			setTimeout(function () {
				_this.stopRotate();
				turncate.style[$.CSSTransform] = 'rotate('+endAngle+'deg)';
				
			}, opt.duration+10);
        },
        stopRotate : function(){
        	var _this = this,
        		opt = _this.opt,
        		turncate = opt.turncate;
        	turncate.style[$.transition] =' none';
        	_this.flag_click = false;
        	_this.rotateOver();
        },
        rotateOver: function(){
        	var _this = this;
        	if(typeof _this.rotateOver === 'function'){
				_this.rotateOver();
			}
        }
	}

	Lottery.prototype.options = {
		duration : 3000,  //指针转动的时间 ms  
        round : 1440,  //圈数 360* n  
        rotateType: null,//  rotateType代表旋转形式(random 扇区内随机 ,默认为center代表扇形中心) 
        angel : 0,   //指针初始位置 
        areaNumber : 8,  //奖区数量
        deviation: 2 ,//随机结果角度偏差值 为了防止出现指针和扇区分割线无限重合 单位:°
        turncate :document.querySelector('.turncate') //转盘
    }
	w.Lottery = Lottery;
})(window);






