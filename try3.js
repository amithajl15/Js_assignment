fs = require('fs')
console.log("ami");
fs.readFile('India2011.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }


  data1=csvJSON(data);
  console.log(data1);
  var wstream = fs.createWriteStream('outputtry.json');
  wstream.write(data1);
  wstream.end();
});

function csvJSON(csv){

  var lines=csv.split("\n");

  var rows = [];
  var n=0;
  var col1=[];
  var col2=[];
  var col3=[];
  var m=0;
 var agegrp=[];
 var count;
 var sumarr=[];
  var headers=lines[0].split(",");
  for(var i=1; i<lines.length-1; i++)
  {
    rows[n]=lines[i].split(',');
    col1.push(rows[n][5]);
    col2.push(rows[n][12]);
    col3.push(rows[n][4]);
    n++;
  }

  for(var i=0;i<col1.length;i++)
  {
    count=0;
      for(var k=0;k<=agegrp.length;k++)
      {
        if(agegrp[k]==col1[i])
          count=1;
      }
      if(count==0){
         agegrp.push(col1[i]);
       }
  }



  for(var i=1;i<agegrp.length-1;i++)
  {

    var sum=0;

    for(var j=0;j<col1.length;j++)
      if(agegrp[i]==col1[j] && col3[j]=="Total")
        sum+=parseInt(col2[j]);

  sumarr.push(sum);
  }
  var sum1=0;
  var sum2=0;
  var sum3=0;

  for(var i=1;i<agegrp.length-1;i++)
  {
    if(agegrp[i]==7 || agegrp[i]==8 || agegrp[i]==9)
      sum1+=parseInt(sumarr[i]);
    else if(agegrp[i]==10 || agegrp[i]==11 || agegrp[i]==12 || agegrp[i]==13 || agegrp[i]==14)
      sum2+=parseInt(sumarr[i]);
    else if(agegrp[i]==15 || agegrp[i]==16 || agegrp[i]==17 || agegrp[i]==18 || agegrp[i]==19)
      sum3+=parseInt(sumarr[i]);
  }

  var finalSumList=[];
  finalSumList.push(parseInt(col2[1]));
  finalSumList.push(sum1);
  finalSumList.push(sum2);
  finalSumList.push(sum3);

  for(var i=14;i<sumarr.length;i++)
  {
    finalSumList.push(sumarr[i]);
  }

  var finalAgeList=[];
  finalAgeList.push(agegrp[1]);
  finalAgeList.push('7-9');
  finalAgeList.push('10-14');
  finalAgeList.push('15-19');

  for(var i=15;i<agegrp.length-1;i++)
  {
     finalAgeList.push(agegrp[i]);
  }

   var myobj={};
   var myObjArr=[];

   for(var i=0;i<finalSumList.length;i++)
   {
     myobj.age_group=finalAgeList[i];
     myobj.totalLiterate=finalSumList[i];

     myObjArr[i]=myobj;
     myobj={};
   }
json=JSON.stringify(myObjArr);
str= json.replace(/},/g, "},\r\n");
return str;
 }
