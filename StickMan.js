class StickMan{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.head=15;
        this.chest=this.y+30;
        this.bodyLength=5;
        this.legLength=30;
        this.legDistance=8;
        this.pupilx=x;
        this.pupily=y;
        this.pupilcolor="purple";
        this.speed=8;
        this.mx=0;
        this.my=0;
    }
    giveEyeCoord()
    {   let pupil = {
            x: this.pupilx,
            y: this.pupily
        };
        return pupil;
    }


    giveStickCoord()
    {let stick = {
        x: this.x,
        y: this.y,
        r:this.head
    };
    return stick;

    }
    draw()
    {   this.drawman();
       
    }
    drawman()
{
    context.lineWidth=3;
    // body
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.chest);
    context.strokeStyle = "black";
    context.stroke();
    context.closePath();
    
    //head
    context.beginPath();
    context.fillStyle = "white";
    context.arc(this.x, this.y, this.head, 0, Math.PI * 2, true); // draw circle for head
    // (x,y) center, radius, start angle, end angle, anticlockwise
    context.fill();
    context.closePath();

    //pupil
    context.beginPath();
    context.fillStyle = this.pupilcolor; 
    context.arc(this.pupilx, this.pupily, 3, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
    
    // legs
    context.beginPath();
    context.strokeStyle = "black";

    context.moveTo(this.x, this.chest); //left leg
    context.lineTo(this.x-this.legDistance, this.chest+this.legLength);

    context.moveTo(this.x, this.chest);//middle leg
    context.lineTo(this.x, this.chest+this.legLength);

    context.moveTo(this.x, this.chest);//right leg
    context.lineTo(this.x+this.legDistance, this.chest+this.legLength);

    context.stroke();
    context.closePath();
    }

    goLeft()
    {   if(this.x>35)
        {   this.x-=this.speed;
            this.pupilx-=this.speed;
        }
        
    }
    goRight()
    {   if(this.x<canvas.width-35)
        {   this.x+=this.speed;
            this.pupilx+=this.speed;
        }
    }
    moveEye(mx,my)
    {   this.mx=mx;
        this.my=my;
        let pupilbuffer=11;
        if(this.pupilx<this.mx)
            if(this.pupilx<this.x+pupilbuffer)
                this.pupilx+=1;
        if(this.pupilx>this.mx)
            if(this.pupilx>this.x-pupilbuffer)
                this.pupilx-=1;
        if(this.pupily<this.my)
            if(this.pupily<this.y+pupilbuffer)
                this.pupily+=1;
        if(this.pupily>this.my)
            if(this.pupily>this.y-pupilbuffer)
                this.pupily-=1;
    }
    changePupilColor(pnum)
    {   this.pnum=pnum;
        switch (this.pnum) {
            case 0:
                this.pupilcolor="purple";
                break;
            case 1:
                this.pupilcolor="orange";
                break;
            case 2:
                this.pupilcolor="blue";
                break;    
        }
    }
}