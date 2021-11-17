class IntervalTree{
    constructor(intervalSize){
        this.intervalSize = intervalSize;
        this.root = new IntervalTreeNode(0, intervalSize);
    }

    clear(){
        this.root.clear()
    }

    add(intervals){
        for(let i=0;i<intervals.length;i++){
            this.root.add(`${intervals[i][2]}`, intervals[i][0], intervals[i][1]);
        }
    }

    render(ctxt, width, height){
        ctxt.clearRect(0, 0, width, height);
        ctxt.strokeStyle = "#333333";
        ctxt.textAlign = "center";
        ctxt.textBaseline = "middle";
        ctxt.font = "15px arial";
        this.root.render(ctxt, 0, width, 0, height / (Math.log2(this.intervalSize) + 3));
    }
}

class IntervalTreeNode{
    constructor(left, right){
        this.value = Math.round(left + (right - left) / 2);

        if(right - left <= 1){
            this.leftNode = null;
            this.rightNode = null;
        }else{
            this.leftNode = new IntervalTreeNode(left, this.value-1);
            this.rightNode = new IntervalTreeNode(this.value+1, right);
        }

        this.under = [];
        this.over = [];
    }

    clear(){
        this.under = [];
        this.over = [];
        if(this.leftNode !== null && this.rightNode !== null){
            this.leftNode.clear();
            this.rightNode.clear();
        }
    }

    add(name, lower, upper){
        if(upper < this.value){
            this.leftNode.add(name, lower, upper);
        }else if(lower > this.value){
            this.rightNode.add(name, lower, upper);
        }else{
            this.under = [...this.under, [lower, upper, name]].sort((a, b) => {
                return a[0] - b[0];
            });
            this.over = [...this.over, [lower, upper, name]].sort((a, b) => {
                return b[1] - a[1];
            });
        }
    }

    render(ctxt, left, right, height, heightStep){
        let middle = left + (right - left) / 2;

        if(this.leftNode !== null && this.rightNode !== null){
            ctxt.beginPath();
            ctxt.moveTo(left + (middle-left)/2, height + 2*heightStep);
            ctxt.lineTo(middle, height + heightStep);
            ctxt.lineTo(middle + (middle-left)/2, height + 2*heightStep);
            ctxt.stroke();
        }

        ctxt.fillStyle = "#FFFFFF";
        ctxt.fillText(this.value, middle, height + heightStep);

        ctxt.fillStyle = "#FF9900";
        for(let i=0;i<this.under.length;i++){
            ctxt.fillText(this.under[i][2], middle - (right-left) / 8 + ((i)/this.under.length) * (right-left) / 8, height + heightStep);
        }

        ctxt.fillStyle = "#0099FF";
        for(let i=0;i<this.over.length;i++){
            ctxt.fillText(this.over[i][2], middle + ((i+1)/this.over.length) * (right-left) / 8, height + heightStep);
        }
        
        if(this.leftNode !== null && this.rightNode !== null){
            this.leftNode.render(ctxt, left, middle, height + heightStep, heightStep);
            this.rightNode.render(ctxt, middle, right, height + heightStep, heightStep);
        }
    }
}
