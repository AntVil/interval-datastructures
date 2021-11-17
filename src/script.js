let INTERVAL_SIZE;

let intervalTreeCanvas;
let segmentTreeCanvas;

let intervalTreeCtxt;
let segmentTreeCtxt;

let intervalTree;
let segmentTree;

window.onresize = function(){
    intervalTreeCanvas = document.getElementById("intervalTreeCanvas");
    segmentTreeCanvas = document.getElementById("segmentTreeCanvas");

    intervalTreeCanvas.width = segmentTreeCanvas.clientWidth;
    intervalTreeCanvas.height = segmentTreeCanvas.clientHeight;
    intervalTreeCtxt = intervalTreeCanvas.getContext("2d");
    
    segmentTreeCanvas.width = segmentTreeCanvas.clientWidth;
    segmentTreeCanvas.height = segmentTreeCanvas.clientHeight;
    segmentTreeCtxt = segmentTreeCanvas.getContext("2d");
}

window.onload = function(){
    updateIntervalSize();
    
    intervalTreeCanvas = document.getElementById("intervalTreeCanvas");
    segmentTreeCanvas = document.getElementById("segmentTreeCanvas");

    intervalTreeCanvas.width = segmentTreeCanvas.clientWidth;
    intervalTreeCanvas.height = segmentTreeCanvas.clientHeight;
    intervalTreeCtxt = intervalTreeCanvas.getContext("2d");
    
    segmentTreeCanvas.width = segmentTreeCanvas.clientWidth;
    segmentTreeCanvas.height = segmentTreeCanvas.clientHeight;
    segmentTreeCtxt = segmentTreeCanvas.getContext("2d");

    requestAnimationFrame(loop);
}

function loop(){
    let sliders = document.getElementsByClassName("multi-slider");
    let intervalsElement = document.getElementById("intervals");
    intervalsElement.innerHTML = "";
    let names = document.getElementsByClassName("name");
    let intervals = [];
    for(let i=0;i<sliders.length;i++){
        let interval = [parseInt(sliders[i].children[0].value), parseInt(sliders[i].children[1].value)].sort((a, b) => {
            return a - b;
        });
        interval.push(names[i].innerText);
        if(interval[1] - interval[0] > 0){
            intervals.push(interval);

            let element = document.createElement("div");
            element.innerText = `${interval[2]} = [${interval[0]}, ${interval[1]}]`;
            intervalsElement.appendChild(element);
        }
    }

    intervalTree.clear();
    intervalTree.add(intervals);
    intervalTree.render(intervalTreeCtxt, intervalTreeCanvas.width, intervalTreeCanvas.height);

    segmentTree.clear();
    segmentTree.add(intervals);
    segmentTree.render(segmentTreeCtxt, segmentTreeCanvas.width, segmentTreeCanvas.height);

    requestAnimationFrame(loop);
}

function shuffleSliders(){
    let sliders = document.getElementsByClassName("multi-slider");
    for(let slider of sliders){
        slider.children[0].value = Math.round(Math.random() * INTERVAL_SIZE);
        slider.children[1].value = Math.round(Math.random() * INTERVAL_SIZE);
    }
}

function updateIntervalSize(){
    INTERVAL_SIZE = Math.pow(2, parseInt(document.getElementById("interval-size").value)) - 1;

    intervalTree = new IntervalTree(INTERVAL_SIZE);
    segmentTree = new SegmentTree(INTERVAL_SIZE);
    
    let sliders = document.getElementsByClassName("multi-slider");
    for(let slider of sliders){
        slider.children[0].max = INTERVAL_SIZE;
        slider.children[1].max = INTERVAL_SIZE;
    }

    shuffleSliders();
}
