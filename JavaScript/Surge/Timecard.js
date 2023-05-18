/*

申明：部分函数方法来源于TimeCard.js，其原始作者@smartmimi
原脚本：https://raw.githubusercontent.com/smartmimi/conf/master/surge/timecard.js
原脚本作者：@smartmimi 
GitHub：https://github.com/smartmimi/conf/tree/master

修改：TributePaulWalker
Surge：

[Panel]
节假提醒 = script-name=节假提醒,update-interval=3600

[Script]
节假提醒 = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/clare88/Profiles/main/JavaScript/Surge/Timecard.js
 
 */
var tlist = {
  
1: ["情人节", "2023-02-14"],
2: ["龙抬头", "2023-02-21"],
3: ["惊蛰", "2023-03-06"],
4: ["妇女节", "2023-03-08"],
5: ["植树节", "2023-03-12"],
6: ["消费者维权日", "2023-03-15"],
7: ["春分", "2023-03-21"],
8: ["愚人节", "2023-04-01"],
9: ["清明", "2023-04-05"],
10: ["谷雨", "2023-04-20"],
11: ["劳动", "2023-05-01"],
12: ["青年节", "2023-05-04"],
13: ["立夏", "2023-05-06"],
14: ["母亲节", "2023-05-14"],
15: ["520", "2023-05-20"],
16: ["小满", "2023-05-21"], 
17: ["老婆生日", "2023-05-28"],
18: ["儿童节", "2023-06-01"],
19: ["芒种", "2023-06-06"],
20: ["父亲节", "2023-06-18"],
21: ["夏至", "2023-06-21"],
22: ["端午", "2023-06-22"],
23: ["建党节", "2023-07-01"],
24: ["小暑", "2023-07-07"],
25: ["大暑", "2023-07-23"],
26: ["建军节", "2023-08-01"],
27: ["立秋", "2023-08-08"],
28: ["七夕", "2023-08-22"],
29: ["处暑", "2023-08-23"],
30: ["白露", "2023-09-08"],
31: ["教师节", "2023-09-10"],
32: ["秋分", "2023-09-23"],
33: ["中秋", "2023-09-29"],
34: ["国庆", "2023-10-01"],
35: ["寒露", "2023-10-08"],
36: ["重阳节", "2023-10-23"],
37: ["霜降", "2023-10-24"],
38: ["万圣节前夜", "2023-10-31"],
39: ["万圣节", "2023-11-01"],
40: ["立冬", "2023-11-08"],
41: ["小雪", "2023-11-22"],
42: ["感恩节", "2022-11-23"],
43: ["大雪", "2023-12-07"],
44: ["冬至", "2023-12-22"],
45: ["平安夜", "2023-12-24"],
46: ["圣诞节", "2023-12-25"],
47: ["元旦", "2024-01-01"],
48: ["小寒", "2024-01-06"],
49: ["腊八", "2024-01-18"],
50: ["大寒", "2024-01-20"],
51: ["小年", "2024-02-02"],
52: ["立春", "2022-02-04"],
53: ["除夕", "2024-02-09"],
54: ["春节", "2024-02-10"],
55: ["情人节", "2024-02-14"],
56: ["雨水", "2024-02-19"],
57: ["元宵节", "2024-02-24"],
58: ["惊蛰", "2024-03-05"],
59: ["妇女节", "2024-03-08"],
60: ["龙抬头", "2024-03-11"],
61: ["植树节", "2024-03-12"],
62: ["消费者权益日", "2024-03-15"],
63: ["春分", "2024-03-20"],
64: ["愚人节", "2024-04-01"],
65: ["清明节", "2024-04-04"],
66: ["谷雨", "2024-04-19"],
};
let tnow = new Date();
let tnowf =
  tnow.getFullYear() + "-" + (tnow.getMonth() + 1) + "-" + tnow.getDate();

/* 计算2个日期相差的天数，不包含今天，如：2016-12-13到2016-12-15，相差2天
 * @param startDateString
 * @param endDateString
 * @returns
 */
function dateDiff(startDateString, endDateString) {
  var separator = "-"; //日期分隔符
  var startDates = startDateString.split(separator);
  var endDates = endDateString.split(separator);
  var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2]);
  var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2]);
  return parseInt(
    (endDate - startDate) / 1000 / 60 / 60 / 24
  ).toString();
}

//计算输入序号对应的时间与现在的天数间隔
function tnumcount(num) {
  let dnum = num;
  return dateDiff(tnowf, tlist[dnum][1]);
}

//获取最接近的日期
function now() {
  for (var i = 1; i <= Object.getOwnPropertyNames(tlist).length; i++) {
    if (Number(dateDiff(tnowf, tlist[i.toString()][1])) >= 0) {
      //console.log("最近的日期是:" + tlist[i.toString()][0]);
      //console.log("列表长度:" + Object.getOwnPropertyNames(tlist).length);
      //console.log("时间差距:" + Number(dateDiff(tnowf, tlist[i.toString()][1])));
      return i;
    }
  }
}

//如果是0天，发送emoji;
let nowlist = now();
function today(day) {
  let daythis = day;
  if (daythis == "0") {
    datenotice();
    return "🎉";
  } else {
    return daythis;
  }
}

//提醒日当天发送通知
function datenotice() {
  if ($persistentStore.read("timecardpushed") != tlist[nowlist][1] && tnow.getHours() >= 6) {
    $persistentStore.write(tlist[nowlist][1], "timecardpushed");
    $notification.post("假日祝福","", "今天是" + tlist[nowlist][1] + "日 " + tlist[nowlist][0] + "   🎉")
  } else if ($persistentStore.read("timecardpushed") == tlist[nowlist][1]) {
    //console.log("当日已通知");
  }
}
$done({
title:"节假提醒",
icon:"list.dash.header.rectangle",
'icon-color': "#5AC8FA",
content:tlist[nowlist][0]+"  :  "+today(tnumcount(nowlist))+"天\n"+tlist[Number(nowlist) + Number(1)][0] +"  :  "+ tnumcount(Number(nowlist) + Number(1))+ "天\n"+tlist[Number(nowlist) + Number(2)][0]+"  :  "+tnumcount(Number(nowlist) + Number(2))+"天"
})
