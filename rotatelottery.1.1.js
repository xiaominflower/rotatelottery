/* 
�ƶ���ת�̳齱��� 
var mylottery = new Lottery({}) //����
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
        rotateFn : function(index){  //ת����ת  indexΪ�н����±�
        	var _this = this,
        		opt = _this.opt,
			    turncate = opt.turncate,
			    rotateType = opt.rotateType,
			    angel = null,
			    endAngle = null,
			   	singleAngle = 360 /opt.areaNumber, //���������Ƕ�ֵ
			   	disAngel =  opt.angel;

			if(rotateType == 'random'){
				endAngle = Math.random() * singleAngle;  //����ó�����������ڵĽǶ�
				endAngle = Math.max(opt.deviation, endAngle);
		        endAngle = Math.min(singleAngle - opt.deviation, endAngle);
		        //endAngle = Math.ceil(endAngle + ((index-1) * singleAngle)); //��Ƹ�߽������м�
		        endAngle = Math.ceil(endAngle + ((index-2) * singleAngle))+disAngel;
			}else{
				//endAngle = index * singleAngle - singleAngle/2; //��Ƹ�߽������м�
				endAngle = (index-1) * singleAngle+disAngel; //��Ƹ�Ĭ���������м�
			}
			
			if (opt.flag_click) return;
			_this.flag_click = true;  //ת��ת�������в����ٴδ���

			turncate.style[$.transition] =' transform '+opt.duration+'ms ease-out';
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
		duration : 3000,  //ָ��ת����ʱ�� ms  
        round : 1440,  //Ȧ�� 360* n  
        rotateType: null,//  rotateType������ת��ʽ(random ��������� ,Ĭ��Ϊcenter������������) 
        angel : 0,   //ָ���ʼλ�� 
        areaNumber : 8,  //��������
        deviation: 2 ,//�������Ƕ�ƫ��ֵ Ϊ�˷�ֹ����ָ��������ָ��������غ� ��λ:��
        turncate :document.querySelector('.turncate') //ת��
    }
	w.Lottery = Lottery;
})(window);






