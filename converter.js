var doc= `
port-object eq 7000
port-object eq 5280
port-object eq 587
port-object eq 10022
port-object eq 10032
port-object range 8080 8089`
function stringSplitter(doc){
    var stringArr = doc.split(/(\d+)/);
    var newEntries=[];
    var newDoc="";
    for(var i=0; i<stringArr.length; i++){
        if(stringArr[i].includes("p")){
            stringArr.splice(i,1)
        }
        if(stringArr[i] ==" "){
            stringArr[i] = "-";
        }
    }
    for(var j=0; j<stringArr.length; j++){
        if(stringArr[j+1]=="-"){
            newEntries.push(`edit "tcp_`+stringArr[j]+stringArr[j+1]+stringArr[j+2]+ `"\
            set tcp-portrange `+ stringArr[j]+stringArr[j+1]+stringArr[j+2] +`\
            next`);
        }else{
            newEntries.push(`edit "tcp_`+ stringArr[j]+`"\
            set tcp-portrange `+ stringArr[j]+`\
            next`);
        }
    }
    for(var k=0; k<newEntries.length; k++){
        newDoc+= newEntries[k];
    }
    return newDoc
}
stringSplitter(doc)