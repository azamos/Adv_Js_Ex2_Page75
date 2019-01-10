
const totalCounter=makeCounter("total");
const colorsCounters=[];

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
function func1(e){
    totalCounter.increment();
    console.log('this is change'+e.target.value+" total counter is: "+totalCounter.getCount());
    let colorData={value: e.target.value, counter: makeCounter('e.target.value')};
    //TODO: make value non configurable.
    colorData.counter.increment();
    colorsCounters.push(colorData);
    setTimeout(printBanner,5000);
}
function func2(e){
    console.log("This is input"+e.target.value);
}
function checkIfColorWasPickedBefore(color){
    for(let i=0;i<colorsCounters.length;i++){
        if(colorsCounters[i].value==color){
            return i;
        }
        return null;//Means we did not pick it before
    }
}
function printBanner(){
    document.querySelector('.invisible').classList.remove('invisible');
    let string=`You have picked a color ${totalCounter.getCount()} times!`;
    document.getElementById("balls").innerText=string;
    alert('user picked this color: '+435345+' times');
}

