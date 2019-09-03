/**
 * Author: Void rangers
 * Date: 2019.9.2
 * Version: 1.1.0
 * Description: Convert Arabic numerals into Chinese numerals.
 */


function NumberCompile (number){
    this.chinese_number = '';
    this.number = Number(number);
    this.kyop = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    //进制单位
    this.units = ['', '十', '百', '千'];
    //CU => counting unit => 计数单位
    this.CU = ['', '万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];
    this.init();
}

NumberCompile.prototype = {
    init: function(){
        try{
            if(!this.number)    throw   '缺少一个转换数字';
            if(isNaN(this.number))  throw   '参数不是数字';
        }catch(err){
            console.error('Uncaught ReferenceError:', err);
            return false;
        }
        var number = this.number,
            index = String(number).indexOf('+'),
            len = index == -1 ? String(number).length : Number(String(number).slice(index + 1)) + 1;
        //console.log('number:', this.number, len); return false;
        for(var i = len - 1; i >= 0; i--){
            var pow = Math.pow(10, i),
                unit = i % 4 > 0 ? this.units[i % 4] : this.CU[Math.floor(i / 4)],
                num = Math.floor(number / pow),
                num_str = this.kyop[num];
            /** 
             * 数字与单位判断
             * 最初简写 ==> this.chinese_number += (i % 4 == 0 && num == 0 ? '' : num == 0 && this.chinese_number[this.chinese_number.length - 1] == '零' ? '' : num_str) + (num == 0 ? i % 4 == 0 ? unit : '' : unit);
             * */
            if(i % 4 == 0 && num == 0){
                //每个单位末尾为0, 则省略'零'
                if(this.chinese_number[this.chinese_number.length - 1] == '零'){
                    //若数字中连续出现多个零的情况, 且是计数单位, 则删除前一个'零'
                    this.chinese_number = this.chinese_number.slice(0, this.chinese_number.length - 1);
                }
            }else if(i % 4 != 0 && num == 0 && this.chinese_number[this.chinese_number.length - 1] == '零'){
                //若数字中连续出现多个零的情况, 且不是计数单位, 则省略其它'零', 只留一个
            }else{
                this.chinese_number += num_str;
            }
            if(i % 4 != 0 && num == 0){
                //若数字为0, 又非计数单位, 则省略单位不写
            }else if(i % 4 == 0 && num == 0){
                if(this.CU.indexOf(this.chinese_number[this.chinese_number.length - 1]) == -1){
                    this.chinese_number += unit;
                }else{
                    //若数字为0, 又正好为计数单位, 且在计数单位内无非零数字存在
                }
            }else if(i % 4 == 0 && num != 0){
                //若数字不为0, 且是计数单位, 则省略进制单位不写
                this.chinese_number += unit;
            }else if(i % 4 != 0 && num != 0){
                //若数字不为0, 又非计数单位
                this.chinese_number += unit;
            }
            //console.log(i + ': chinese_number:', this.chinese_number);
            number -= num * pow;
        }
        console.log('this num:', this.number);
    }
};

var numberCompile = function(number){
    return new NumberCompile(number).chinese_number;
}