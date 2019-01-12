const totalCounter=makeCounter("total");//the total amount of colors picked
const colorsCounters=[];//array to keep tracks of all of the colors that are picked.Each filled cell
let firstTimeEvent=true;
//contatins an object named colorData, which has 2 properties: color's value, and a counter.
let previousColor=null;//At first, there is no previous pick
//the function below was created by asaf blum.No changes were made.
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
    if(firstTimeEvent==true){
        setTimeout(function(){firstTimeEvent=false;},16000);
    }
    totalCounter.increment();
    let color=e.target.value;
    let index=checkIfColorWasPickedBefore(color);//Will keep index of a repeatadly chosen color
    //,or NULL if said color was not picked before.
    let sentIndex;//Will be sent to the printing function
    if(index==null){//Means we need to add new color
        //to colorsCounter
        let colorData={value: color, counter: makeCounter('color')};//Is beign kept inside colorsCounters
        Object.defineProperty(colorData,'value',{//prevents accidental changes to the value
            writable:false
        })
        colorData.counter.increment();
        colorsCounters.push(colorData);
        sentIndex=colorsCounters.length-1;//New color pushed to new and last cell of colorsCounters.
    }
    else{//Means color was chosen before. need to update it's counter and pass on it's index in colorsCounters
        colorsCounters[index].counter.increment();
        sentIndex=index;
    }
    let msg=document.getElementById('jTron');
    if(!msg.classList.contains('invisible')){msg.classList.add('invisible');}
    setTimeout(printBanner,15000,sentIndex,msg);
}
function checkIfColorWasPickedBefore(color){
    for(let i=0;i<colorsCounters.length;i++){
        if(colorsCounters[i].value==color){
            return i;
        }
    }
    return null;//Means we did not pick it before
}
function printBanner(index,msg){
    msg.classList.remove('invisible');
    document.getElementById("total").innerText=`You have picked a color ${totalCounter.getCount()} times!`;
    let color=colorsCounters[index].value;
    let counter=colorsCounters[index].counter;
    let id=color+`_${counter.getCount()}`;
    document.getElementById('this_id').innerText=`this choise's id is: ${id}`;
    document.getElementById("this_color_count").innerText=`You have picked this specific color ${counter.getCount()} times!`;
    document.getElementById('this_color').innerText=`The color you picked is ${color}`;
    document.getElementById('this_color_visual').style.fill = color;
    if(firstTimeEvent==false){
        if(totalCounter.getCount()==2){
            document.getElementById('prev_id').classList.remove("invisible");
        }
        document.getElementById("prev_color_visual").style.fill = previousColor;
        document.getElementById("prev_color").textContent=`Your previous choise was ${previousColor}`;
    }
    previousColor=color;
}
function hide(){
    let msg=document.getElementById('jTron');
    msg.classList.add('invisible');
}