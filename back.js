class Background{
    constructor(){
        
        this.bwidth=canvas.width;
        this.bheight=canvas.height;
        this.bx=0;
        this.by=this.bheight-100;

    }
    drawb()
    {   context.fillStyle = "Gray";
        context.strokeStyle = "black";
        context.rect(this.bx, this.by, this.bwidth, this.bheight);
        context.closePath();
		context.lineWidth = 3;
		context.stroke();
        context.fill();
    
    }
}