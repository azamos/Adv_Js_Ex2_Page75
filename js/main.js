{   const msg=document.getElementById('jTron');
    const delay=5000;
    const totalCounter=makeCounter("total");//the total amount of colors picked
    const colorsCounters=[];//array to keep tracks of all of the colors that are picked.Each filled cell
    let firstTimeEvent=true;//contatins an object named colorData, which has 2 properties: color's value, and a counter.
    let previousColor=null;//At first, there is no previous pick
    //These consts are used inside function print_banner
    const totalRef=document.getElementById("total");
    const thisIdRef = document.getElementById('this_id');
    const thisColorCountREf=document.getElementById("this_color_count");
    const thisColorRef=document.getElementById('this_color');
    const thisCollorVisual=document.getElementById('this_color_visual');
    const prevColorVis=document.getElementById("prev_color_visual");
    const prevCol=document.getElementById("prev_color");
    const prevId=document.getElementById('prev_id');
    /////////////////////////////////////////////////
    //functions ////////////////////////////////////
    ///////////////////////////////////////////////
    function input_event_handler(e){
        totalCounter.increment();
        let color=e.target.value;
        let index=checkIfColorWasPickedBefore(color);//Will keep index of a repeatadly chosen color
        //,or NULL if said color was not picked before.
        let sentIndex;//Will be sent to the printing function
        if(index==null){//Means we need to add new color
            //to colorsCounter
            const colorData={value: color, counter: makeCounter('color')};//Is beign kept inside colorsCounters
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
        if(!msg.classList.contains('invisible')){msg.classList.add('invisible');}
        setTimeout(printBanner,delay,sentIndex,msg);
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
        totalRef.innerText=`You have picked a color ${totalCounter.getCount()} times!`;
        let color=colorsCounters[index].value;
        let counter=colorsCounters[index].counter;
        let id=color+`_${counter.getCount()}`;
        thisIdRef.innerText=`this choise's id is: ${id}`;
        thisColorCountREf.innerText=`You have picked this specific color ${counter.getCount()} times!`;
        thisColorRef.innerText=`The color you picked is ${color}`;
        thisCollorVisual.style.fill = color;
        if(firstTimeEvent==false&&previousColor!=null&&totalCounter.getCount()>=2){
            prevColorVis.style.fill = previousColor;
            prevCol.textContent=`Your previous choise was ${previousColor}`;
            prevId.classList.remove("invisible");
        }
        previousColor=color;
        firstTimeEvent=false;
    }
    function hide(){
        msg.classList.add('invisible');
    }
}