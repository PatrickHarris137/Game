class projectile{
    constructor(){
    //Mouse and pupil coordinates
    this.mx;
    this.my;
    this.pupilx;
    this.pupily;

    //projectile to be used
    this.currentProjectil;

    //Fire values
    this.firex;
    this.firey;
    this.fcos;
    this.fsin;
    this.fireSize;

    //Laser values
    this.lasx;
    this.lasy;
    this.lcos;
    this.lsin;
    this.bounce=0;
    
    //Lightning values
    this.licos;
    this.lisin;
    this.lix;
    this.liy;
    }
    draw()
    {this.flyingprojectile();
    }
    //***********************************************Projectile Methods*************************************/
    updateprojectile(mouse, pupil)
    {   this.mx=mouse.x;
        this.my=mouse.y;
        this.pupilx=pupil.x;
        this.pupily=pupil.y;
    }
    changeproj(changedto)
    {this.currentProjectile=changedto;}

    GetRad(px,py,mx,my) {

        let angleRadians = Math.atan2(my - py, mx - px);
        return angleRadians;
    }
    flyingprojectile()
    {   if(this.currentProjectile=="fireball")
            {   
                this.fireballproj();
            }
        if(this.currentProjectile=="laser")
            {   
                this.laserproj();
            }
        if(this.currentProjectile=="lightning")
            {   
                this.lightningproj();
            }
    }
     //********************************************End of Projectile Methods*************************************/

    //***********************************************Lightning Methods*************************************/
    lightningproj()
    {   context.beginPath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        if((this.lix>canvas.width+200 || this.lix<-200)&&(this.liy > canvas.height+200 || this.liy  < -200))
            {this.lix=-300;
             this.liy=-300;
            }
        context.moveTo(this.lix, this.liy);
        context.lineTo(this.lix+= this.licos,this.liy+= this.lisin);
        context.stroke();
        context.closePath(); 

    }
    lightning()
    {   let rad = this.GetRad(this.pupilx, this.pupily,this.mx,this.my);
        this.licos=Math.cos(rad)*30;
        this.lisin=Math.sin(rad)*30;
        this.lix=this.pupilx;
        this.liy=this.pupily;
        context.beginPath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.moveTo(this.lix, this.liy);
        context.lineTo(this.lix+ this.licos,this.liy+ this.lisin);
        context.stroke();
        context.closePath();
    }
    chain(x, y)
    {   let rad=this.GetRad(this.lix,this.liy,x,y);
        this.licos=Math.cos(rad)*30;
        this.lisin=Math.sin(rad)*30;  

    }
    getlightcoord()
    {let light={
        x:this.lix ,
        y:this.liy   
        };
        return light;
    }
    //***********************************************End of Lightning Methods*************************************/
    //***********************************************Laser Methods*************************************/
    laser()
    {   this.bounce=0;
        let rad = this.GetRad(this.pupilx, this.pupily,this.mx,this.my);
        this.lcos=Math.cos(rad)*20;
        this.lsin=Math.sin(rad)*20;
        this.lasx=this.pupilx;
        this.lasy=this.pupily;
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "red";
        context.moveTo(this.lasx, this.lasy);
        context.lineTo(this.lasx+ this.lcos,this.lasy+ this.lsin);
        context.stroke();
        context.closePath();
    }
    laserproj()
    {   
   if(this.bounce<5)
   { if ((this.lasx) > canvas.width || this.lasx < 0&&this.bounce<4) 
        {   this.lcos = -(this.lcos*1.3);
            this.bounce++;

        }
    else if (this.lasy > canvas.height || this.lasy  < 0) 
        {this.lsin = -(this.lsin*1.3);
         this.bounce++;
        }
        if((this.lasx>canvas.width+200 || this.lasx<-200)&&(this.lasy > canvas.height+200 || this.lasy  < -200))
            {this.lasx=-300;
             this.lasy=-300;
            }
    context.beginPath();
    context.strokeStyle = "red";
    context.fillStyle="red";
    context.moveTo(this.lasx, this.lasy);
    context.lineTo(this.lasx+= this.lcos,this.lasy+= this.lsin);
    context.stroke();
    context.closePath(); 

   }
    }
    getlasercoord()
    {let laser={
        x:this.lasx ,
        y:this.lasy   
        };
        return laser;
    }
     //*******************************************End of Laser Methods*************************************/
     
     //***********************************************FireBall Methods*************************************/
    fireball()
    {   this.fireSize=15;
        this.firex=this.pupilx;
        this.firey=this.pupily;       
    }
 
    fireballproj()
    {   let rad= this.GetRad(this.firex,this.firey,this.mx,this.my);
        this.fcos=Math.cos(rad)*5;
        this.fsin=Math.sin(rad)*5;
        context.beginPath();
        
        context.fillStyle = "orange";
        context.strokeStyle = "orange";
        context.arc(this.firex+=this.fcos, this.firey+=this.fsin, this.fireSize, 0, Math.PI * 2, true); 
        context.fill();
        context.closePath();
    }
    
    explode()
    {   this.fireSize=150;
        context.beginPath();
        context.fillStyle = "orange";
        context.strokeStyle="orange";
        context.arc(this.firex, this.firey, this.fireSize, 0, Math.PI * 2, true); 
        context.fill();
        context.closePath();   
    }
    getfireballcoord(returned)
    {  let fireball={
            x:this.firex ,
            y:this.firey ,
            r:this.fireSize  
        };
        return fireball;
    }
    //*******************************************End of FireBall Methods*************************************/
    
}

        