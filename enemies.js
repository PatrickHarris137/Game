class Enemy {
	constructor(bspeed) {
		this.velocity = {
			x: (Math.random() - 0.5) * 3+bspeed,
			y: (Math.random() - 0.5) * 3+bspeed
        }
        this.x;
        this.y;
        this.color;
        this.hp=1;
        this.l=50;
        this.RandomPos();
        this.randomColor();
    }
    draw() {
        context.beginPath();
        context.fillStyle=`rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]})`;
		context.rect(this.x,this.y,this.l,this.l);
		context.closePath();
		context.lineWidth = 3;
		context.stroke();
        context.fill();
        
    }
    randomColor()
    {this.colours = [Math.random() * 255, Math.random() * 255, Math.random() * 255];

    }
    
    update(enenies)
    {   this.checkBounds();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
    RandomPos()
    {   this.x = this.l + (Math.random() * (canvas.width - (this.l * 2)));
        this.y = this.l + (Math.random() * (canvas.height - (this.l * 2)));
        while(this.y>canvas.height-300)
        {
            
            this.y = this.l + (Math.random() * (canvas.height - (this.l * 2)));
        }
    }
    checkBounds()
    {if ((this.x + this.l) > canvas.width || (this.x) < 0) {
        this.velocity.x = -this.velocity.x;
    }

    if ((this.y + this.l*2) > canvas.height || (this.y) < 0) {
        this.velocity.y = -this.velocity.y;
    }

    }
}