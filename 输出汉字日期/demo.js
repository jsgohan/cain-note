var DATE_ZH = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
var DATE_UNIT = ["年", "月", "日", "星期", "时", "分", "秒"];

function timeReport(date) {
  var dateArr = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()];

  var transformedDate = dateArr.map(function(time, index){
      var transformedTime = "";
      var mod = 0;
      var curTime = time;

      do{
          mod = curTime % 10;
          curTime = Math.floor(curTime / 10);

          //deal with sunday
          if(index == 3 && time == 0){
              transformedTime +=  " " + DATE_UNIT[index] +  "日 ";
              break;
          }

          //deal with year like 2015
          if(index == 0 ){
              transformedTime = DATE_ZH[mod] + transformedTime;
              continue;
          }

          //deal with 10, 20, 30, ... 50 and 0
          transformedTime = (mod == 0 && time !== 0) ? "" : DATE_ZH[mod] + transformedTime;

          //deal with  30, 29, 28, ... 10
          if(curTime >= 1){
              transformedTime  = "十"  + transformedTime;
              if(curTime == 1) break;    
          }

      }while(curTime >= 1)

      return transformedTime += index !== 3 ? DATE_UNIT[index] : "";
  });

  return  transformedDate.join("");
}

console.log(timeReport(new Date()));