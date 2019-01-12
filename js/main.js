
const totalCounter=makeCounter("total");//the total amount of colors picked
const colorsCounters=[];//array to keep tracks of all of the colors that are picked
const previousColor=null;//At first, there is no previous pick
//the function below was created by asaf
function makeCounter(counterId, initialValue = 0) {
    const id = counterId;
    let counter = initialValue;
  
    function changeValue(by) {
      counter = counter + by;
      return counter;
    }
  
    return {
      increment: function() {
        return changeValue(1);
      },
      decrement: function() {
        return changeValue(-1);
      },
      getCount: function() {
        return counter;
      },
      getID: function() {
        return id;
      },
      /**
       *
       * @param otherCounter the other counter to compare with the current
       * @returns 1 if current count is bigger, -1 if other count is bigger, else 0
       */
      compare: function(otherCounter) {
        const delta = this.getCount() - otherCounter.getCount();
  
        if (delta > 0) {
          return 1;
        }
  
        if (delta < 0) {
          return -1;
        }
  
        return 0;
      }
    };
  }
function input_event_handler(e){
    totalCounter.increment();
    let color=e.target.value;
    console.log('this is change '+color+" total counter is: "+totalCounter.getCount());
    let index=checkIfColorWasPickedBefore(color);
    let sentIndex;
    if(index==null){//Means we need to add new color Counter id
        //to colorsCounter
        let colorData={value: color, counter: makeCounter('color')};
        Object.defineProperty(colorData,'value',{
            //value: color,
            writable:false
        })
        
        //TODO: make value non configurable and non writable.Note: I think I dit it
        colorData.counter.increment();
        colorsCounters.push(colorData);
        sentIndex=colorsCounters.length-1;
    }
    else{
        colorsCounters[index].counter.increment();
        sentIndex=index;
    }
    let msg=document.getElementById('jTron');
    if(!msg.classList.contains('invisible')){msg.classList.add('invisible');}
    setTimeout(printBanner,5000,sentIndex);
}
function checkIfColorWasPickedBefore(color){
    for(let i=0;i<colorsCounters.length;i++){
        if(colorsCounters[i].value==color){
            return i;
        }
        return null;//Means we did not pick it before
    }
}
function printBanner(index){
    let msg=document.querySelector('.invisible');
    if(msg!=null){
        msg.classList.remove('invisible');
    }
    let string=`You have picked a color ${totalCounter.getCount()} times!`;
    document.getElementById("total").innerText=string;
    let color=colorsCounters[index].value;
    let id=color+'_'+colorsCounters[index].counter.getCount();
    document.getElementById('this_id').innerText=`this choise's id is: ${id}`;
    let string2=`You have picked this specific color ${colorsCounters[index].counter.getCount()} times!`;
    document.getElementById("this_color_count").innerText=string2;
    let string3=`The color you picked is ${colorsCounters[index].value}`;
    document.getElementById('this_color').innerText=string3;
    document.getElementById('this_color_visual').style.fill = colorsCounters[index].value;
}
function hide(){
    let msg=document.getElementById('jTron');
    msg.classList.add('invisible');
}
