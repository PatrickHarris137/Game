//Initialize Canvas
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.height = 800;
canvas.width = 1500;

//Object that contains input keys
let keys = {};

//Score Variables
let score=0;
let highscore=0;
let killed;
//Time Variables
let timer=0;
let timerms=0;

//Menu Conditions
let deadstick=false;
let dead=false;
let start=false;


let pause=false;
//Enemy Stats
let ennum=5;
let bspeed=1.5;
let enenies=[];

//Shot stats
let stype=0;
let shotoffset=0;

//Hit variables
let mouse={
	x:0 ,
    y:0
};
let pupil;
let shooting
let stickcoord;


//Sounds
let mysound= new sound("music/laser.mp3");
let dedsound= new sound("music/ded.mp3");
let expl=new sound("music/explosion.mp3");
let elec=new sound("music/elec.mp3");
let theme=new sound("music/mega.mp3");
//Objects
let stick=new StickMan(canvas.width/2,canvas.height-100);
let proj= new projectile();	
let back=new Background();

//***********************************************Event Listeners*************************************/
canvas.addEventListener('keydown', event => {
	keys[event.key] = true; // 
	
});
canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
	if(keys.a==true||keys.A==true)		//Prevents a glitch where when you move while holding another button,
		{	keys.a=false;				//you keep moving in that direction even after releasing
			keys.A=false;
		}
	if(keys.d==true||keys.D==true)
		{	keys.d=false;
			keys.D=false;
		}
});
canvas.addEventListener('mousedown', event => {
	shooting=true;
	
});canvas.addEventListener('mouseup', event => {
	shooting=false;
	if(shotoffset<timer)
		shotoffset=timer+0.6;
});

canvas.addEventListener('mousemove',event => {
	let realPos=getMousePos(event);	//gets location of mouse regardless of where the canvas is
	mouse.x=realPos.x;
	mouse.y=realPos.y;
	stick.moveEye(mouse.x,mouse.y);
	pupil=stick.giveEyeCoord();
});
//***********************************************End Event Listeners*************************************/

function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function spawn()
{	for (let index = 0; index < ennum; index++) {
		const eny=new Enemy(bspeed);
		enenies.push(eny);
	}
	ennum+=3;
	bspeed+=0.2;
}
function combat()
{	
	proj.updateprojectile(mouse,pupil);
	stickcoord=stick.giveStickCoord();
	checkstickhit();
	proj.draw();
	checkhit();
	if(enenies.length==0)
		spawn();
	
}

//***********************************************Hit Detections Methods*************************************/
function checkstickhit()
{{for(let i=0; i<enenies.length; i++)
	{ if((stickcoord.x+stickcoord.r>=enenies[i].x&&stickcoord.x-stickcoord.r<=enenies[i].x+enenies[i].l)&&(stickcoord.y+stickcoord.r>=enenies[i].y&&stickcoord.y-stickcoord.r<=enenies[i].y+enenies[i].l))
		{deadstick=true;
		}
	}
}
}
function checkhit()
{   killed=0;
	if(stype==0)
	{laserhit();
	}
	else if(stype==1)
	{firehit();
	}
	else if(stype==2)
	{lightninghit();
	}
	score+=100*killed;
}
function killenemy()
{	
	
	enenies=enenies.filter(function(hero) {
	   return hero.hp>0;})
	
	
}
function hitenemy(x,y,r,ex,ey,el)
{if((x+r>=ex&&x-r<=ex+el)&&(y+r>=ey&&y-r<=ey+el))
	return true;
else
	return false;
}
//***********************************************Hit Types*************************************/
function laserhit()
{let laser=proj.getlasercoord();
	{for(let i=0; i<enenies.length; i++)
		{ if(hitenemy(laser.x,laser.y,0,enenies[i].x,enenies[i].y,enenies[i].l))
			{
			 enenies[i].hp=0;
			 dedsound.play();
			 killed+=1;
			}
			killenemy();
		}
	}
}
function firehit()
{fire=proj.getfireballcoord();
	{for(let i=0; i<enenies.length; i++)
		{ if( hitenemy(fire.x,fire.y,fire.r,enenies[i].x,enenies[i].y,enenies[i].l))
			{
			 dedsound.play();
				if(highscore>2000||score>2000)
				  {proj.explode();
				   expl.play();
				  }
			 fire=proj.getfireballcoord();
			 console.log(fire.x,fire.y,fire.r);
			 for (let j = 0; j < enenies.length; j++) {
				if( hitenemy(fire.x,fire.y,fire.r,enenies[j].x,enenies[j].y,enenies[j].l))
				{	enenies[j].hp=0;
					killed+=1;
					shooting=true;
				}		 
			 }	
			}		
		}
		killenemy();
	}

}
function lightninghit()
{let light=proj.getlightcoord();
	let x=1000;
	let y=1000;
	{for(let i=0; i<enenies.length; i++)
		{ if( hitenemy(light.x,light.y,0,enenies[i].x,enenies[i].y,enenies[i].l))
			{
			 enenies[i].hp=0;
			 killed+=1;
			 dedsound.play();
			 killenemy();
			 for (let j = 0; j < enenies.length; j++) 
			 {	if(Math.abs(light.x-enenies[j].x)<x && Math.abs(light.y-enenies[j].y))
					{	x=enenies[j].x;
						y=enenies[j].y;
					}
			 }	
			 if(highscore>1000||score>1000)
				 proj.chain(x+25,y+25);
			}
		}
	}

}
//***********************************************End of Hit Types*************************************/
//***********************************************End of Hit Detecton Methods*************************************/

function shoot()
	{  if(shotoffset<timer)
		{switch (stype) {
            case 0:
				mysound.play();
				proj.changeproj("laser");
                proj.laser();
                break;
            case 1:
				proj.fireball();
				proj.changeproj("fireball");
                break;
            case 2:
				elec.play();
				proj.lightning();
				proj.changeproj("lightning");
                break;
        }

		}
	}

//***********************************************Animate Loop *************************************/
function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	back.drawb();
	theme.play();
	if(start&&!pause&&!deadstick)
	{
	timerms++;
	if(timerms==60)
		{	timer+=1;
			timerms=0;
		}
	if (keys.a || keys.A) {
		stick.goLeft();
	}
	if (keys.d || keys.D) {
		stick.goRight();
	}
	if(keys.e || keys.E&&!shooting)
		{	stype=0;
			stick.changePupilColor(stype);
			
		}
	if(keys.r||keys.R&&!shooting)
		{	stype=1;
			stick.changePupilColor(stype);
			
		}
	if(keys.t||keys.T&&!shooting)
		{	stype=2;
			stick.changePupilColor(stype);

		}
	if(keys.f||keys.F)
		{	pause=true;
		}
	if(shooting)
		shoot();
	stick.draw();
	pupil=stick.giveEyeCoord();
	enenies.map(eny => eny.update(enenies));
	combat();
	displayStatus();
		
	}
	else if(!start)
	{displayInstructions();
	 if(keys.Enter)
		{start=true;
		 
		}

	}
	else if(pause)
	{if(keys.Shift)
		{	pause=false;
		}
		displayPause();

	}
	else if(deadstick)
	{displayDeath();
	
	 if(keys.Enter==true)
	 {deadstick=false;
		start=true;
		reset();
	 }
	}
}
function reset()
{ 	if(score>highscore)
		highscore=score;
	score=0;
	ennum=5;
	bspeed=1;
	timer=0;
	enenies.length=0;
	shotoffset=0;
}
//***********************************************End Animate Loop*************************************/

//***********************************************Display Methods*************************************/
function displayPause()
{context.font = "20px Arial";
context.fillStyle = "black";
context.fillText("Press Shift to Continue", 650, 20);

}
function displayDeath()
{context.font = "20px Arial";
context.fillStyle = "black";
context.fillText(`You survived for ${timer.toFixed(0)} Seconds`, 650, 40);
context.fillText(`Your final score was ${score.toFixed(0)}`, 650, 60);
context.fillText("Hit enter to try again", 650, 80);

}
function displayStatus() 
{	context.save();
	context.font = "20px Arial";
	context.fillStyle = "black";
	context.fillText(`HighScore ${highscore.toFixed(0)}`, 10, 20);
	context.fillText(`Score ${score.toFixed(0)}`, 10, 40);
	context.fillText(`Time ${timer.toFixed(0)}`, 10, 60);
	context.restore();
}

function displayInstructions()
{context.save();
	context.fillStyle = "black";
	context.font = "50px Arial";
	context.fillText("Welcome To Eye Blaster!", 450, 80);
	context.font = "20px Arial";
	context.fillText("To play you move with A(Left) or D(Right)", 450, 120);
	context.fillText("To shoot you left click", 450, 140);
	context.fillText("To toggle between yours shots it is E(Laser) R(Fireball) and T(Lightning)", 450, 160);
	context.fillText("The different shot types will gain an ability as you kill the accursed cubes", 450, 180);
	context.fillText("Fireball gains explode at 2000 points, lightning gains Chain at 1000 points, Laser bounces by default", 450, 200);
	context.fillText("These abilities will carry through to future playthroughs(until you refresh)", 450, 220);
	context.fillText("The goal of the game is to murder as many cursed cubes as you can without getting hit(and cursed to death)", 450, 240);
	context.fillText("Hit F to pause", 450, 260);
	context.fillText("Hit enter when you are ready for the crusade", 450, 280);
	context.restore();

}
//***********************************************End Display Methods*************************************/

//Sound Method
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
animate();
canvas.focus();