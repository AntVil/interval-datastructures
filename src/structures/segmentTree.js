class SegmentTree{
    constructor(intervalSize){
        this.intervalSize = intervalSize;
        this.root = new SegmentTreeNode(0, intervalSize);
    }

    clear(){
        this.root.clear();
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

class SegmentTreeNode{
    constructor(left, right){
        this.left = left;
        this.right = right;

        if(this.right - this.left <= 1){
            this.leftNode = null;
            this.rightNode = null;
        }else{
            let middle = this.left + Math.round((this.right - this.left) / 2)
            this.leftNode = new SegmentTreeNode(this.left, middle);
            this.rightNode = new SegmentTreeNode(middle, this.right);
        }
        this.content = [];
    }

    clear(){
        this.content = [];
        if(this.leftNode !== null && this.rightNode !== null){
            this.leftNode.clear();
            this.rightNode.clear();
        }
    }

    add(name, lower, upper){
        if(this.leftNode !== null && this.rightNode !== null){
            let middle = this.left + Math.round((this.right - this.left) / 2)

            if(this.left === lower && this.right === upper){
                this.content.push(name);
            }else if(upper <= middle){
                this.leftNode.add(name, lower, upper);
            }else if(lower >= middle){
                this.rightNode.add(name, lower, upper);
            }else{
                this.leftNode.add(name, lower, middle);
                this.rightNode.add(name, middle, upper);
            }
        }else{
            this.content.push(name);
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
        ctxt.beginPath();
        ctxt.arc(middle, height + heightStep, 5, 0, 2*Math.PI);
        ctxt.fill();

        ctxt.fillStyle = "#0099FF";
        for(let i=0;i<this.content.length;i++){
            ctxt.fillText(this.content[i], middle, height + heightStep * (i+1) / (2*this.content.length));
        }

        if(this.leftNode !== null && this.rightNode !== null){
            this.leftNode.render(ctxt, left, middle, height + heightStep, heightStep);
            this.rightNode.render(ctxt, middle, right, height + heightStep, heightStep);
        }else{
            ctxt.fillStyle = "#FFFFFF";
            ctxt.fillText(`${this.right}`, middle, height + 2*heightStep);
        }
    }
}
