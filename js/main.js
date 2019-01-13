{   const msg=document.getElementById('jTron');
    const delay=5000;
    const totalCounter=makeCounter("total");//the total amount of colors picked
    const colorsCounters={};//object to keep tracks of all of the colors that are picked.Each filled cell
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

    function input_event_handler(e){
        totalCounter.increment();
        let color=e.target.value;
        check(color);
        colorsCounters[color].increment();
        if(!msg.classList.contains('invisible')){
            msg.classList.add('invisible');
        }
        setTimeout(printBanner,delay,color);
    }
    function check(color){
        //let colors=Object.getOwnPropertyNames(colorsCounters);
        for(p in colorsCounters){
            if(p==color){
                console.log(p);
                return;
            }
        }
        colorsCounters[color]=makeCounter(`${color}`);
    }
    function printBanner(color){
        msg.classList.remove('invisible');
        totalRef.innerText=`You have picked a color ${totalCounter.getCount()} times!`;
        let counter=colorsCounters[color].getCount();
        let id=color+`_${counter}`;
        thisIdRef.innerText=`this choise's id is: ${id}`;
        thisColorCountREf.innerText=`You have picked this specific color ${counter} times!`;
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