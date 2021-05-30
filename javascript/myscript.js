const canvas=document.getElementById('mycanvas');
const ctx=canvas.getContext('2d');
ww=window.innerWidth
wh=window.innerHeight
canvas.width=ww
canvas.height=wh
mx=ww/2
my=wh/2
let fps=100


//全域變數
let paper={
	middle:{x:800,y:300},
	size:{x:1000,y:600}
}
let recting={
	type:'rect',
	p:{x:0,y:0},
	topleft:{x:0,y:0},
	rightbottom:{x:0,y:0},
	stroke:{is:true,color:'rgb(0,0,0)',width:2},
	fill:{is:true,color:'rgb(0,0,0)'},
	translate:{x:0,y:0},
	deg:0,
	scale:{x:1,y:1},
	through:0

}
let circleing={
	type:'circle',
	p:{x:0,y:0},
	position:{x:0,y:0},
	rr:5,
	startdeg:0,
	enddeg:Math.PI*2,
	isclose:true,
	isrr:false,
	stroke:{is:true,color:'rgb(0,0,0)',width:2},
	fill:{is:true,color:'rgb(0,0,0)'},
	translate:{x:0,y:0},
	deg:0,
	scale:{x:1,y:1},
	through:0

}
let lineing={
	type:'line',
	p:{x:0,y:0},
	pointarray:[],
	stroke:{is:true,color:'rgb(0,0,0)',width:2},
	fill:{is:true,color:'rgb(0,0,0)'},
	translate:{x:0,y:0},
	deg:0,
	scale:{x:1,y:1},
	through:0,
	iscolse:false,

}
let color
let rslider
let gslider
let bslider
let color_r=0
let color_g=0
let color_b=0
let ispress=false
let mousex=0
let mousey=0
let btnrect
let btncircle
let drawmd=0
let isnext=false
let iscolor=true
let all=[]
let choose=0
let isctrl=false
let clone={}
let clonex=0
let cloney=0


function init(){
	




	rslider=new Rect({color:{fill:'rgb(100,100,100)',stroke:'black'},size:{x:10,y:30},position:{x:60,y:90}})
	gslider=new Rect({color:{fill:'rgb(100,100,100)',stroke:'black'},size:{x:10,y:30},position:{x:60,y:140}})
	bslider=new Rect({color:{fill:'rgb(100,100,100)',stroke:'black'},size:{x:10,y:30},position:{x:60,y:190}})

	btnrect=new Rect({fill:false,stroke:true,position:{x:1400,y:100},size:{x:100,y:100},strokewidth:1})
	btncircle=new Rect({fill:false,stroke:true,position:{x:1400,y:250},size:{x:100,y:100},strokewidth:1})
	btnline=new Rect({fill:false,stroke:true,position:{x:1400,y:400},size:{x:100,y:100},strokewidth:1})
	btniscolor=new Rect({fill:false,stroke:true,position:{x:200,y:40},size:{x:80,y:40},strokewidth:1})

	pen=new Circle({fill:false,stroke:true,rr:2,strokewidth:1})


	canvas.addEventListener('mousedown',mousedown)
	canvas.addEventListener('mouseup',mouseup)
	canvas.addEventListener('mousemove',mousemove)
	canvas.addEventListener('click',click)
	window.addEventListener('keydown',keydown)
	window.addEventListener('keyup',keyup)
}
function update(){	
	if(ispress){
		press()
	}
	color_r=(rslider.position.x-60)*255/200
	color_g=(gslider.position.x-60)*255/200
	color_b=(bslider.position.x-60)*255/200
	color='rgb('+Math.floor(color_r)+','+Math.floor(color_g)+','+Math.floor(color_b)+')'
	
	pen.position.x=mousex-mousex%5
	pen.position.y=mousey-mousey%5
	pen.x=pen.position.x-800
	pen.y=pen.position.y-300
	if(mousex<1300&&mousex>300&&mousey<600&&mousey>0){

		pen.visible=true
	}else{
		pen.visible=false
	}

	if(drawmd>=10&&drawmd<20){
		if(drawmd===10){
			isnext=true
		}
		if(drawmd===11){
			if(recting.topleft.x!=recting.rightbottom.x&&recting.topleft.y!=recting.rightbottom.y){
				isnext=true
			}			
		}
		if(drawmd>=12&&drawmd<=17){
			isnext=true
		}
		if(drawmd===18){
			let finishrect=recting
			recting={p:{x:0,y:0},type:'rect',topleft:{x:0,y:0},rightbottom:{x:0,y:0},stroke:{is:true,color:'rgb(0,0,0)',width:2},fill:{is:true,color:'rgb(0,0,0)'},translate:{x:0,y:0},deg:0,scale:{x:1,y:1},through:0}
			all.push(finishrect)
			drawmd=0
		}
	}
	
	if(drawmd>=20&&drawmd<33){
		if(drawmd===20){
			isnext=true
		}
		if(drawmd===21){
			if(circleing.rr!=0){
				isnext=true
			}			
		}
		if(drawmd>=22&&drawmd<=31){
			isnext=true
		}
		if(drawmd===32){
			let finishcircle=circleing
			circleing={p:{x:0,y:0},type:'circle',position:{x:0,y:0},rr:5,startdeg:0,enddeg:Math.PI*2,isclose:true,isrr:false,stroke:{is:true,color:'rgb(0,0,0)',width:2},fill:{is:true,color:'rgb(0,0,0)'},translate:{x:0,y:0},deg:0,scale:{x:1,y:1},through:0}
			all.push(finishcircle)
			drawmd=0
		}
	}
	if(drawmd>=41&&drawmd<=46){
		isnext=true
	}
	if(drawmd===47){
		let finishline=lineing
		lineing={p:{x:0,y:0},type:'line',pointarray:[],stroke:{is:true,color:'rgb(0,0,0)',width:2},fill:{is:true,color:'rgb(0,0,0)'},translate:{x:0,y:0},deg:0,scale:{x:1,y:1},through:0,iscolse:false}
		all.push(finishline)
		drawmd=0
	}
	



	


}
function draw(){
	background('white')
	drawer(all)
	rslider.draw()
	gslider.draw()
	bslider.draw()	
	pen.draw()
	btniscolor.draw()
	rectingmark()
	circleingmark()
	lineingmark()
	middlemark()
	if(drawmd===0){
		drawmark()
		btnrect.draw()
		btncircle.draw()
		btnline.draw()
	}
	if(drawmd===1){
		ctx.font='20px Verdana'
		ctx.fillStyle='black'
		ctx.fillText('choose'+choose+'',30,250)
		ctx.fillText('type:'+all[choose].type+'',30,270)

		ctx.fillStyle='red'
		getp()
		if(all[choose].type==='line'){
			ctx.fillRect(all[choose].p.x+800-5,all[choose].p.y+300-5,10,10)
		}else if(all[choose].type==='circle'){
			ctx.fillRect(all[choose].p.x+800-5,all[choose].p.y+300-5,10,10)
		}else if(all[choose].type==='rect'){
			ctx.fillRect(all[choose].p.x+800-5,all[choose].p.y+300-5,10,10)
		}
		
	}
	if(drawmd===2){
		drawer([clone])
		ctx.font='20px Verdana'
		ctx.fillStyle='black'
		ctx.fillText('clone x:'+clonex+' y:'+cloney,30,250)
	}
		
	
}
setInterval(update,1000/fps)
setInterval(draw,1000/fps)




//event function
function keydown(e){
	keyid=e.code
	if(keyid==='Enter'){
		document.write('[')
		getp()
		for(let i=0;i<all.length;i++){
			let o=all[i]
			if(o.type==='line'){
				document.write('{type:\'line\',p:{x:')
				
				document.write(o.p.x)
				document.write(',y:')
				document.write(o.p.y)
				document.write('},pointarray:[')
				for(let y=0;y<o.pointarray.length-1;y++){
					document.write('['+o.pointarray[y][0]+','+o.pointarray[y][1]+']')
					document.write(',')
				}
				document.write('['+o.pointarray[o.pointarray.length-1][0]+','+o.pointarray[o.pointarray.length-1][1]+']')
				document.write('],stroke:{is:')
				document.write(o.stroke.is)
				document.write(',color:')
				document.write('\''+o.stroke.color+'\'')
				document.write(',width:')
				document.write(o.stroke.width)
				document.write('},fill:{is:')
				document.write(o.fill.is)
				document.write(',color:')
				document.write('\''+o.fill.color+'\'')
				document.write('},translate:{x:')
				document.write(o.translate.x)
				document.write(',y:')
				document.write(o.translate.y)
				document.write('},deg:')
				document.write(o.deg)
				document.write(',scale:{x:')
				document.write(o.scale.x)
				document.write(',y:')
				document.write(o.scale.y)
				document.write('},through:')
				document.write(o.through)
				document.write(',iscolse:')
				document.write(o.iscolse)
				document.write('}')
					
			}else if(o.type==='rect'){
				document.write('{type:\'rect\',p:{x:')					
				document.write(o.p.x)
				document.write(',y:')
				document.write(o.p.y)
				document.write('},topleft:{x:')
				document.write(o.topleft.x)
				document.write(',y:')
				document.write(o.topleft.y)
				document.write('},rightbottom:{x:')
				document.write(o.rightbottom.x)
				document.write(',y:')
				document.write(o.rightbottom.y)
				document.write('},stroke:{is:')
				document.write(o.stroke.is)
				document.write(',color:')
				document.write('\''+o.stroke.color+'\'')
				document.write(',width:')
				document.write(o.stroke.width)
				document.write('},fill:{is:')
				document.write(o.fill.is)
				document.write(',color:')
				document.write('\''+o.fill.color+'\'')
				document.write('},translate:{x:')
				document.write(o.translate.x)
				document.write(',y:')
				document.write(o.translate.y)
				document.write('},deg:')
				document.write(o.deg)
				document.write(',scale:{x:')
				document.write(o.scale.x)
				document.write(',y:')
				document.write(o.scale.y)
				document.write('},through:')
				document.write(o.through)
				document.write('}')
			}else if(o.type==='circle'){
				document.write('{type:\'circle\',p:{x:')					
				document.write(o.p.x)
				document.write(',y:')
				document.write(o.p.y)
				document.write('},position:{x:')
				document.write(o.position.x)
				document.write(',y:')
				document.write(o.position.y)
				document.write('},rr:')
				document.write(o.rr)
				document.write(',startdeg:')
				document.write(o.startdeg)
				document.write(',enddeg:')
				document.write(o.enddeg)
				document.write(',isclose:')
				document.write(o.isclose)
				document.write(',isrr:')
				document.write(o.isrr)
				document.write(',stroke:{is:')
				document.write(o.stroke.is)
				document.write(',color:')
				document.write('\''+o.stroke.color+'\'')
				document.write(',width:')
				document.write(o.stroke.width)
				document.write('},fill:{is:')
				document.write(o.fill.is)
				document.write(',color:')
				document.write('\''+o.fill.color+'\'')
				document.write('},translate:{x:')
				document.write(o.translate.x)
				document.write(',y:')
				document.write(o.translate.y)
				document.write('},deg:')
				document.write(o.deg)
				document.write(',scale:{x:')
				document.write(o.scale.x)
				document.write(',y:')
				document.write(o.scale.y)
				document.write('},through:')
				document.write(o.through)
				document.write('}')
			}
			if(i!=all.length-1){
				document.write(',')
			}
		}
		document.write('],')
	}
	if(keyid==='KeyN'){
		if(isnext===true){
			drawmd+=1
			isnext=false
		}
		if(drawmd===0&&all.length>0){
			drawmd=1
		}

			
	}
	if(keyid==='KeyB'){
		if(drawmd%10!==0||drawmd===30){
			drawmd-=1
			if(drawmd===40){
				lineing.isclose=false
			}
		}else{
			if(drawmd===10){
				recting={p:{x:0,y:0},type:'rect',topleft:{x:0,y:0},rightbottom:{x:0,y:0},stroke:{is:true,color:'rgb(0,0,0)',width:2},fill:{is:true,color:'rgb(0,0,0)'},translate:{x:0,y:0},deg:0,scale:{x:1,y:1},through:0}
				drawmd=0
			}else if(drawmd===20){
				circleing={p:{x:0,y:0},type:'circle',position:{x:0,y:0},rr:5,startdeg:0,enddeg:Math.PI*2,isclose:true,isrr:false,stroke:{is:true,color:'rgb(0,0,0)',width:2},fill:{is:true,color:'rgb(0,0,0)'},translate:{x:0,y:0},deg:0,scale:{x:1,y:1},through:0}
				drawmd=0
			}else if(drawmd===40){
				lineing={p:{x:0,y:0},type:'line',pointarray:[],stroke:{is:true,color:'rgb(0,0,0)',width:2},fill:{is:true,color:'rgb(0,0,0)'},translate:{x:0,y:0},deg:0,scale:{x:1,y:1},through:0,iscolse:false}
				drawmd=0
			}
		}

			
	}
	if(keyid==='KeyF'){
		if(drawmd===13){
			recting.fill.color=color
			recting.fill.is=iscolor
		}
		if(drawmd===27){
			circleing.fill.color=color
			circleing.fill.is=iscolor
		}
		if(drawmd===42){
			lineing.fill.color=color
			lineing.fill.is=iscolor
		}
		if(drawmd===12){
			recting.stroke.color=color
			recting.stroke.is=iscolor
		}
		if(drawmd===26){
			circleing.stroke.color=color
			circleing.stroke.is=iscolor
		}
		if(drawmd===41){
			lineing.stroke.color=color
			lineing.stroke.is=iscolor
		}
			
	}
	if(keyid==='KeyC'){
		if(drawmd===40){
			lineing.isclose=true
			drawmd=41
		}
		if(drawmd===1&&isctrl){
			clone=$.extend(true, {},all[choose])
			drawmd=2
		}
		
	}
	if(keyid==='KeyV'){
		if(drawmd===2&&isctrl){
			all.push(clone)
			drawmd=0
			clonex=0
			cloney=0
			clone={}
		}
	}
	if(keyid==='KeyE'){
		if(drawmd===40){
			drawmd=41
		}
		if(drawmd===1){
			drawmd=0
		}
		
	}
	if(keyid==='ArrowUp'){
		if(drawmd===14){
			recting.translate.y-=5
		}
		if(drawmd===16){
			recting.scale.y+=0.1
		}
		if(drawmd===12){
			if(recting.stroke.width<200){
				recting.stroke.width+=1
			}
			
		}
		if(drawmd===26){
			if(circleing.stroke.width<200){
				circleing.stroke.width+=1
			}
			
		}
		if(drawmd===41){
			if(lineing.stroke.width<200){
				lineing.stroke.width+=1
			}
			
		}
		if(drawmd===28){
			circleing.translate.y-=5
		}
		if(drawmd===30){
			circleing.scale.y+=0.1
		}
		if(drawmd===43){
			lineing.translate.y-=5
		}
		if(drawmd===45){
			lineing.scale.y+=0.1
		}
		if(drawmd===2){
			clone.translate.y-=5
			clonex-=5
		}
		if(drawmd===1){
			all.push(all[choose])
			all.splice(choose,1)
			choose=all.length-1
			
			
		}
	}
	if(keyid==='ArrowDown'){
		if(drawmd===14){
			recting.translate.y+=5
		}
		if(drawmd===16){
			recting.scale.y-=0.1
		}
		if(drawmd===12){
			if(recting.stroke.width>1){
				recting.stroke.width-=1
			}
			
		}
		if(drawmd===26){
			if(circleing.stroke.width>1){
				circleing.stroke.width-=1
			}
			
		}
		if(drawmd===41){
			if(lineing.stroke.width>1){
				lineing.stroke.width-=1
			}
			
		}
		if(drawmd===28){
			circleing.translate.y+=5
		}
		if(drawmd===30){
			circleing.scale.y-=0.1
		}
		if(drawmd===43){
			lineing.translate.y+=5
		}
		if(drawmd===45){
			lineing.scale.y-=0.1
		}
		if(drawmd===2){
			clone.translate.y+=5
			cloney+=5
		}
	}
	if(keyid==='ArrowLeft'){
		if(drawmd===14){
			recting.translate.x-=5
		}
		if(drawmd===15){
			recting.deg+=Math.PI*2/360
		}
		if(drawmd===16){
			recting.scale.x-=0.1
		}
		if(drawmd===17&&recting.through>0){
			recting.through-=1
		}
		if(drawmd===22){
			circleing.startdeg-=Math.PI*2/360
		}
		if(drawmd===23){
			circleing.enddeg-=Math.PI*2/360
		}
		if(drawmd===28){
			circleing.translate.x-=5
		}
		if(drawmd===29){
			circleing.deg+=Math.PI*2/360
		}
		if(drawmd===30){
			circleing.scale.x-=0.1
		}
		if(drawmd===31&&circleing.through>0){
			circleing.through-=1
		}
		if(drawmd===43){
			lineing.translate.x-=5
		}
		if(drawmd===44){
			lineing.deg+=Math.PI*2/360
		}
		if(drawmd===45){
			lineing.scale.x-=0.1
		}
		if(drawmd===46&&lineing.through>0){
			lineing.through-=1
		}
		if(drawmd===1){
			if(choose>0){
				choose-=1
			}else{
				choose=all.length-1
			}
		}
		if(drawmd===2){
			clone.translate.x-=5
			clonex-=5
		}
	}
	if(keyid==='ArrowRight'){
		if(drawmd===14){
			recting.translate.x+=5
		}
		if(drawmd===15){
			recting.deg-=Math.PI*2/360
		}
		if(drawmd===16){
			recting.scale.x+=0.1
		}
		if(drawmd===17&&recting.through<100){
			recting.through+=1
		}
		if(drawmd===22){
			circleing.startdeg+=Math.PI*2/360
		}
		if(drawmd===23){
			circleing.enddeg+=Math.PI*2/360
		}
		if(drawmd===24){
			if(circleing.isclose){
				circleing.isclose=false
			}else{
				circleing.isclose=true
			}
			
		}
		if(drawmd===25){
			if(circleing.isrr){
				circleing.isrr=false
			}else{
				circleing.isrr=true
			}
			
		}
		if(drawmd===28){
			circleing.translate.x+=5
		}
		if(drawmd===29){
			circleing.deg-=Math.PI*2/360
		}
		if(drawmd===30){
			circleing.scale.x+=0.1
		}
		if(drawmd===31&&circleing.through<100){
			circleing.through+=1
		}
		if(drawmd===43){
			lineing.translate.x+=5
		}
		if(drawmd===44){
			lineing.deg-=Math.PI*2/360
		}
		if(drawmd===45){
			lineing.scale.x+=0.1
		}
		if(drawmd===46&&lineing.through<100){
			lineing.through+=1
		}
		if(drawmd===1){
			if(choose<all.length-1){
				choose+=1
			}else{
				choose=0
			}
		}
		if(drawmd===2){
			clone.translate.x+=5
			clonex+=5
		}

	}
	if(keyid==='KeyS'){
		if(drawmd===1){
			if(all[choose].type==='rect'){
				recting=all[choose]
				drawmd=10
			}
			if(all[choose].type==='circle'){
				circleing=all[choose]
				drawmd=20
			}
			if(all[choose].type==='line'){
				lineing=all[choose]
				drawmd=40
			}
			all.splice(choose,1)
			
			
		}
	}
	
	if(keyid==='Backspace'){
		if(drawmd===40){
			lineing.pointarray.pop()
		}
		if(drawmd===1){
			all.splice(choose,1)
			drawmd=0
		}
	}
	if(keyid==='ControlLeft'){
		isctrl=true
	}
	
}
function keyup(e){
	let keyid=e.code
	if(keyid==='ControlLeft'){
		isctrl=false
	}
}
function click(e){
	if(drawmd>=10&&drawmd<20){
		if(drawmd===10){
			recting.topleft.x=pen.x
			recting.topleft.y=pen.y
		}
		if(drawmd===11){
			recting.rightbottom.x=pen.x
			recting.rightbottom.y=pen.y
		}
		
	}
	if(drawmd===20){
		circleing.position.x=pen.x
		circleing.position.y=pen.y
	}
	if(drawmd===21){
		if(mousex>300&&mousex<1300){
				circleing.rr=Math.abs(pen.x-circleing.position.x)
		}
		
	}
	if(drawmd===40){
		lineing.pointarray.push([pen.x,pen.y])
	}
	if(btnrect.ispointinpath(mousex,mousey)){
		drawmd=10
	}
	if(btncircle.ispointinpath(mousex,mousey)){
		drawmd=20
	}
	if(btnline.ispointinpath(mousex,mousey)){
		drawmd=40
	}
	if(btniscolor.ispointinpath(mousex,mousey)){
		if(iscolor){
			iscolor=false
		}else{
			iscolor=true
		}
	}
}
function mousedown(e){
	ispress=true
}
function mouseup(e){
	ispress=false
}
function mousemove(e){
	let canvasrect = canvas.getBoundingClientRect()
	mousex=e.clientX-canvasrect.left
	mousey=e.clientY-canvasrect.top
}
function press(){
	//color slider
	if(70<mousey&&mousey<110){
		if(30<mousex&&mousex<290){

			rslider.position.x=mousex
		}
	}	
	if(rslider.position.x>260){
			rslider.position.x=260
	}
	if(rslider.position.x<60){
			rslider.position.x=60
	}
	if(120<mousey&&mousey<160){
		if(30<mousex&&mousex<290){
			gslider.position.x=mousex
		}
	}	
	if(gslider.position.x>260){
			gslider.position.x=260
	}
	if(gslider.position.x<60){
			gslider.position.x=60
	}
	if(170<mousey&&mousey<210){
		if(30<mousex&&mousex<290){
			bslider.position.x=mousex
		}
	}	
	if(bslider.position.x>260){
			bslider.position.x=260
	}
	if(bslider.position.x<60){
			bslider.position.x=60
	}
	
}






function middlemark(){
	ctx.strokeStyle='red'
	ctx.lineWidth='1'
	ctx.strokeRect(800-2,300-2,4,4)

}


function drawmark(){
	ctx.lineWidth=4
	ctx.fillStyle='red'
	ctx.fillRect(1375,75,50,50)
	ctx.strokeRect(1375,75,50,50)	
	ctx.beginPath()
	ctx.arc(1400,250,25,0,Math.PI*2)
	ctx.closePath()
	ctx.fill()
	ctx.stroke()
	ctx.beginPath()
	ctx.moveTo(1425,375)
	ctx.lineTo(1375,425)
	ctx.stroke()
	
}


function rectingmark(){
	if(drawmd>=10&&drawmd<14){
		ctx.font='30px Verdana'
		ctx.fillStyle='black'
		ctx.fillText('Rect',30,250)
		ctx.font='20px Verdana'
		ctx.fillText('topleft('+recting.topleft.x+','+recting.topleft.y+')',30,300)
		ctx.fillRect(recting.topleft.x+800-2,recting.topleft.y+300-2,4,4)
		if(drawmd>=11){
			ctx.fillText('rightbottom('+recting.rightbottom.x+','+recting.rightbottom.y+')',30,320)
			ctx.fillRect(recting.rightbottom.x+800-2,recting.rightbottom.y+300-2,4,4)
			ctx.strokeStyle='red'
			ctx.lineWidth=0.5
			ctx.strokeRect(recting.topleft.x+800,recting.topleft.y+300,recting.rightbottom.x-recting.topleft.x,recting.rightbottom.y-recting.topleft.y)
			if(drawmd>=12){
				ctx.fillText('stroke('+recting.stroke.is+','+recting.stroke.width+')',30,340)
				ctx.fillText(recting.stroke.color,30,360)
				if(recting.stroke.is===true){
					ctx.lineWidth=recting.stroke.width
					ctx.strokeStyle=recting.stroke.color
					ctx.strokeRect(recting.topleft.x+800,recting.topleft.y+300,recting.rightbottom.x-recting.topleft.x,recting.rightbottom.y-recting.topleft.y)
				}
				if(drawmd===13){
					ctx.fillText('fill('+recting.fill.is+')',30,380)
					ctx.fillText(recting.fill.color,30,400)
					if(recting.fill.is===true){
						ctx.fillStyle=recting.fill.color
						ctx.fillRect(recting.topleft.x+800,recting.topleft.y+300,recting.rightbottom.x-recting.topleft.x,recting.rightbottom.y-recting.topleft.y)
					}	
				}
			}

			
		}
		
	}
	if(drawmd>=14&&drawmd<=17){
		ctx.font='30px Verdana'
		ctx.fillStyle='black'
		ctx.fillText('Rect',30,250)
		ctx.font='20px Verdana'
		ctx.fillText('topleft('+recting.topleft.x+','+recting.topleft.y+')',30,300)
		ctx.fillText('rightbottom('+recting.rightbottom.x+','+recting.rightbottom.y+')',30,320)
		ctx.fillText('stroke('+recting.stroke.is+','+recting.stroke.width+')',30,340)
		ctx.fillText(recting.stroke.color,30,360)
		ctx.fillText('fill('+recting.fill.is+')',30,380)
		ctx.fillText(recting.fill.color,30,400)
		ctx.fillText('translate('+recting.translate.x+','+recting.translate.y+')',30,420)
		if(drawmd>=15){
			ctx.fillText('rotate('+Math.floor(recting.deg/Math.PI/2*360)+')',30,440)
			if(drawmd>=16){
				ctx.fillText('scale('+Math.floor(recting.scale.x*10)/10+','+Math.floor(recting.scale.y*10)/10+')',30,460)
				if(drawmd===17){
					ctx.fillText('through('+recting.through+'%)',30,480)
				}
			}
		}
		
		ctx.globalAlpha=(100-recting.through)/100
		ctx.save()
		ctx.translate(800,300)
		ctx.translate(recting.translate.x,recting.translate.y)
		if(drawmd>=15){
			ctx.rotate(recting.deg)
			if(drawmd>=16){
				ctx.scale(recting.scale.x,recting.scale.y)
			}
		}
		if(recting.stroke.is===true){
			ctx.lineWidth=recting.stroke.width
			ctx.strokeStyle=recting.stroke.color
			ctx.strokeRect(recting.topleft.x,recting.topleft.y,recting.rightbottom.x-recting.topleft.x,recting.rightbottom.y-recting.topleft.y)
		}
		if(recting.fill.is===true){
			ctx.fillStyle=recting.fill.color
			ctx.fillRect(recting.topleft.x,recting.topleft.y,recting.rightbottom.x-recting.topleft.x,recting.rightbottom.y-recting.topleft.y)
		}
		
		ctx.restore()
		ctx.globalAlpha=1.0
	}
	
}


function circleingmark(){
	if(drawmd>=20&&drawmd<28){
		ctx.font='30px Verdana'
		ctx.fillStyle='black'
		ctx.fillText('Circle',30,250)
		ctx.font='20px Verdana'
		ctx.fillText('position('+circleing.position.x+','+circleing.position.y+')',30,300)
		ctx.fillRect(circleing.position.x+800-2,circleing.position.y+300-2,4,4)
		if(drawmd>=21){
			ctx.fillText('rr('+circleing.rr+')',30,320)			
			ctx.strokeStyle='red'
			ctx.lineWidth=0.5
			if(drawmd>=21&&drawmd<=23){
				ctx.beginPath()
				ctx.moveTo(circleing.position.x+800,circleing.position.y+300)
				ctx.lineTo(circleing.position.x+800+circleing.rr*Math.cos(circleing.startdeg),circleing.position.y+300+circleing.rr*Math.sin(circleing.startdeg))
				ctx.stroke()
			}
			
			if(drawmd>=22){
				ctx.fillText('stratdeg('+Math.floor(circleing.startdeg*360/Math.PI/2)+')',30,340)
				
				ctx.fillRect(circleing.position.x+800-2+circleing.rr*Math.cos(circleing.startdeg),circleing.position.y+300-2+circleing.rr*Math.sin(circleing.startdeg),4,4)
				
				if(drawmd>=23){
					ctx.fillText('enddeg('+Math.floor(circleing.enddeg*360/Math.PI/2)+')',30,360)
					ctx.fillRect(circleing.position.x+800-2+circleing.rr*Math.cos(circleing.enddeg),circleing.position.y+300-2+circleing.rr*Math.sin(circleing.enddeg),4,4)
					if(drawmd===23){
						ctx.beginPath()
						ctx.moveTo(circleing.position.x+800,circleing.position.y+300)
						ctx.lineTo(circleing.position.x+800+circleing.rr*Math.cos(circleing.enddeg),circleing.position.y+300+circleing.rr*Math.sin(circleing.enddeg))
						ctx.stroke()

					}
					ctx.beginPath()
					ctx.arc(circleing.position.x+800,circleing.position.y+300,circleing.rr,circleing.startdeg,circleing.enddeg)
					ctx.stroke()
					
					if(drawmd>=24){
						ctx.fillText('close('+circleing.isclose+')',30,380)
						if(circleing.isclose){
							ctx.closePath()
							ctx.stroke()
						}
						if(drawmd>=25){
							if(circleing.isclose&&drawmd===25){
								drawmd+=1
							}else{
								ctx.fillText('isrr('+circleing.isrr+')',30,400)
								if(circleing.isrr){
									ctx.lineTo(circleing.position.x+800,circleing.position.y+300)
									ctx.closePath()
									ctx.stroke()
								}
							}
							
							if(drawmd>=26){
								ctx.fillText('stroke('+circleing.stroke.is+','+circleing.stroke.width+')',30,420)
								ctx.fillText(circleing.stroke.color,30,440)
								if(circleing.stroke.is===true){
									ctx.lineWidth=circleing.stroke.width
									ctx.strokeStyle=circleing.stroke.color
									ctx.stroke()
								}
								if(drawmd===27){
									if(circleing.isclose===false&&circleing.isrr===false){
										drawmd+=1
									}else{
										ctx.fillText('fill('+circleing.fill.is+')',30,460)
										ctx.fillText(circleing.fill.color,30,480)
										if(circleing.fill.is===true){
											ctx.fillStyle=circleing.fill.color
											ctx.fill()
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(drawmd>=28&&drawmd<=31){
		ctx.font='30px Verdana'
		ctx.fillStyle='black'
		ctx.fillText('Circle',30,250)
		ctx.font='20px Verdana'
		ctx.fillText('position('+circleing.position.x+','+circleing.position.y+')',30,300)
		ctx.fillText('rr('+circleing.rr+')',30,320)
		ctx.fillText('stratdeg('+Math.floor(circleing.startdeg*360/Math.PI/2)+')',30,340)
		ctx.fillText('enddeg('+Math.floor(circleing.enddeg*360/Math.PI/2)+')',30,360)
		ctx.fillText('close('+circleing.isclose+')',30,380)
		ctx.fillText('isrr('+circleing.isrr+')',30,400)
		ctx.fillText('stroke('+circleing.stroke.is+','+circleing.stroke.width+')',30,420)
		ctx.fillText(circleing.stroke.color,30,440)
		ctx.fillText('fill('+circleing.fill.is+')',30,460)
		ctx.fillText(circleing.fill.color,30,480)
		ctx.fillText('translate('+circleing.translate.x+','+circleing.translate.y+')',30,500)

		if(drawmd>=29){
			ctx.fillText('rotate('+Math.floor(circleing.deg/Math.PI/2*360)+')',30,520)
			if(drawmd>=30){
				ctx.fillText('scale('+Math.floor(circleing.scale.x*10)/10+','+Math.floor(circleing.scale.y*10)/10+')',30,540)
				if(drawmd===31){
					ctx.fillText('through('+circleing.through+'%)',30,560)
				}
			}
		}
		
		ctx.globalAlpha=(100-circleing.through)/100
		ctx.save()
		ctx.translate(800,300)
		ctx.translate(circleing.translate.x,circleing.translate.y)
		if(drawmd>=29){
			ctx.rotate(circleing.deg)
			if(drawmd>=30){
				ctx.scale(circleing.scale.x,circleing.scale.y)
			}
		}
		ctx.beginPath()
		ctx.arc(circleing.position.x,circleing.position.y,circleing.rr,circleing.startdeg,circleing.enddeg)
		if(circleing.isclose){
			ctx.closePath()
		}
		if(circleing.isrr){
			ctx.lineTo(circleing.position.x,circleing.position.y)
			ctx.closePath()
		}
		if(circleing.stroke.is===true){
			ctx.lineWidth=circleing.stroke.width
			ctx.strokeStyle=circleing.stroke.color
			ctx.stroke()
		}
		if(circleing.fill.is===true){
			ctx.fillStyle=circleing.fill.color
			ctx.fill()
		}
		
		ctx.restore()
		ctx.globalAlpha=1.0
	}
	
	
}
function lineingmark(){
	if(drawmd>=40&&drawmd<=42){
		if (drawmd>=40) {
			ctx.font='30px Verdana'
			ctx.fillStyle='red'
			ctx.fillText('Line',30,250)
			ctx.font='20px Verdana'
			let font=20
			for(let i=0;i<lineing.pointarray.length;i++){
				let px=lineing.pointarray[i][0]
				let py=lineing.pointarray[i][1]
				ctx.fillRect(px+800-2,py+300-2,4,4)
				ctx.fillStyle='black'
				if(lineing.pointarray.length>10){
					ctx.font=''+200/lineing.pointarray.length+'px Verdana'
					font=200/lineing.pointarray.length
				}
				
				ctx.fillText('point'+(i+1)+'('+px+','+py+')',30,300+i*font)
				if(i===0){
					ctx.beginPath()
					ctx.moveTo(px+800,py+300)
				}else{
					ctx.lineTo(px+800,py+300)
				}
			}
			if(lineing.isclose){
				ctx.closePath()
			}
			ctx.strokeStyle='red'
			ctx.lineWidth=0.5
			ctx.stroke()
			if(drawmd>=41){
				ctx.font='20px Verdana'
				if(lineing.isclose){
					ctx.fillText('close',30,520)
				}else{
					ctx.fillText('end',30,520)
				}
				
				ctx.fillText('stroke('+lineing.stroke.is+','+lineing.stroke.width+')',30,540)
				ctx.fillText(lineing.stroke.color,30,560)
				if(lineing.stroke.is===true){
					ctx.lineWidth=lineing.stroke.width
					ctx.strokeStyle=lineing.stroke.color
					ctx.stroke()
				}
				if(drawmd===42){

					ctx.fillText('fill('+lineing.fill.is+')',30,580)
					ctx.fillText(lineing.fill.color,30,600)
					if(lineing.fill.is===true){
						ctx.fillStyle=lineing.fill.color
						ctx.fill()
					}
				}
			}
		}		
	}
	if(drawmd>=43&&drawmd<=46){
		ctx.fillStyle='red'
		ctx.font='30px Verdana'
		ctx.fillStyle='black'
		ctx.fillText('Line',30,250)
		ctx.font='20px Verdana'
		let font=20
		for(let i=0;i<lineing.pointarray.length;i++){
			let px=lineing.pointarray[i][0]
			let py=lineing.pointarray[i][1]
			if(lineing.pointarray.length>10){
				ctx.font=''+200/lineing.pointarray.length+'px Verdana'
				font=200/lineing.pointarray.length
			}			
			ctx.fillText('point'+(i+1)+'('+px+','+py+')',30,300+i*font)
		}
		ctx.font='20px Verdana'
		if(lineing.isclose){
			ctx.fillText('close',30,520)
		}else{
			ctx.fillText('end',30,520)
		}
		ctx.fillText('stroke('+lineing.stroke.is+','+lineing.stroke.width+')',30,540)
		ctx.fillText(lineing.stroke.color,30,560)
		ctx.fillText('fill('+lineing.fill.is+')',30,580)
		ctx.fillText(lineing.fill.color,30,600)
		ctx.fillText('translate('+lineing.translate.x+','+lineing.translate.y+')',30,620)

		if(drawmd>=44){
			ctx.fillText('rotate('+Math.floor(lineing.deg/Math.PI/2*360)+')',30,640)
			if(drawmd>=45){
				ctx.fillText('scale('+Math.floor(lineing.scale.x*10)/10+','+Math.floor(lineing.scale.y*10)/10+')',30,660)
				if(drawmd===46){
					ctx.fillText('through('+lineing.through+'%)',30,680)
				}
			}
		}
		
		ctx.globalAlpha=(100-lineing.through)/100
		ctx.save()
		ctx.translate(800,300)
		ctx.translate(lineing.translate.x,lineing.translate.y)
		if(drawmd>=44){
			ctx.rotate(lineing.deg)
			if(drawmd>=45){
				ctx.scale(lineing.scale.x,lineing.scale.y)
			}
		}
		for(let i=0;i<lineing.pointarray.length;i++){
			let px=lineing.pointarray[i][0]
			let py=lineing.pointarray[i][1]
			if(i===0){
				ctx.beginPath()
				ctx.moveTo(px,py)
			}else{
				ctx.lineTo(px,py)
			}
		}
		if(lineing.isclose){
			ctx.closePath()
		}
		if(lineing.stroke.is===true){
			ctx.lineWidth=lineing.stroke.width
			ctx.strokeStyle=lineing.stroke.color
			ctx.stroke()
		}
		if(lineing.fill.is===true){
			ctx.fillStyle=lineing.fill.color
			ctx.fill()
		}
		
		ctx.restore()
		ctx.globalAlpha=1.0
	}
	

}

function getp(){
	let xx=0
	let yy=0
	for(let i=0;i<all.length;i++){
		if(all[i].type==='line'){
			let allx=0
			let ally=0
			for(var y=0;y<all[i].pointarray.length;y++){
				allx+=all[i].pointarray[y][0]
				ally+=all[i].pointarray[y][1]
			}
			xx=allx/all[i].pointarray.length
			yy=ally/all[i].pointarray.length
			xx*=all[i].scale.x
			yy*=all[i].scale.y
			let rr=Math.sqrt(yy**2+xx**2)
			let rrdeg=Math.atan2(yy,xx)
			all[i].p.x=rr*Math.cos(rrdeg+all[i].deg)+all[i].translate.x
			all[i].p.y=rr*Math.sin(rrdeg+all[i].deg)+all[i].translate.y
		}else if(all[i].type==='circle'){
			xx=all[i].position.x*all[i].scale.x
			yy=all[i].position.y*all[i].scale.y
			let rr=Math.sqrt(yy**2+xx**2)
			let rrdeg=Math.atan2(yy,xx)
			all[i].p.x=rr*Math.cos(rrdeg+all[i].deg)+all[i].translate.x
			all[i].p.y=rr*Math.sin(rrdeg+all[i].deg)+all[i].translate.y

		}else if(all[i].type==='rect'){
			xx=(all[i].topleft.x+all[i].rightbottom.x)/2*all[i].scale.x
			yy=(all[i].topleft.y+all[i].rightbottom.y)/2*all[i].scale.y
			let rr=Math.sqrt(yy**2+xx**2)
			let rrdeg=Math.atan2(yy,xx)
			all[i].p.x=rr*Math.cos(rrdeg+all[i].deg)+all[i].translate.x
			all[i].p.y=rr*Math.sin(rrdeg+all[i].deg)+all[i].translate.y
		}
	}
	
}





function drawer(array){
	for (var i=0;i<array.length;i++) {
		if(array[i].type==='rect'){
			ctx.globalAlpha=(100-array[i].through)/100
			ctx.save()
			ctx.translate(800,300)
			ctx.translate(array[i].translate.x,array[i].translate.y)
			ctx.rotate(array[i].deg)
			ctx.scale(array[i].scale.x,array[i].scale.y)
			if(array[i].stroke.is===true){
				ctx.lineWidth=array[i].stroke.width
				ctx.strokeStyle=array[i].stroke.color
				ctx.strokeRect(array[i].topleft.x,array[i].topleft.y,array[i].rightbottom.x-array[i].topleft.x,array[i].rightbottom.y-array[i].topleft.y)
			}
			if(array[i].fill.is===true){
				ctx.fillStyle=array[i].fill.color
				ctx.fillRect(array[i].topleft.x,array[i].topleft.y,array[i].rightbottom.x-array[i].topleft.x,array[i].rightbottom.y-array[i].topleft.y)
			}
			
			ctx.restore()
			ctx.globalAlpha=1.0
		}else if(array[i].type==='circle'){
			ctx.globalAlpha=(100-array[i].through)/100
			ctx.save()
			ctx.translate(800,300)
			ctx.translate(array[i].translate.x,array[i].translate.y)
			ctx.rotate(array[i].deg)
			ctx.scale(array[i].scale.x,array[i].scale.y)
			ctx.beginPath()
			ctx.arc(array[i].position.x,array[i].position.y,array[i].rr,array[i].startdeg,array[i].enddeg)
			if(array[i].isclose){
				ctx.closePath()
			}
			if(array[i].isrr){
				ctx.lineTo(array[i].position.x,array[i].position.y)
				ctx.closePath()
			}
			if(array[i].stroke.is===true){
				ctx.lineWidth=array[i].stroke.width
				ctx.strokeStyle=array[i].stroke.color
				ctx.stroke()
			}
			if(array[i].fill.is===true){
				ctx.fillStyle=array[i].fill.color
				ctx.fill()
			}
			
			ctx.restore()
			ctx.globalAlpha=1.0
		}else if(array[i].type==='line'){
			ctx.globalAlpha=(100-array[i].through)/100
			ctx.save()
			ctx.translate(800,300)
			ctx.translate(array[i].translate.x,array[i].translate.y)
			ctx.rotate(array[i].deg)
			ctx.scale(array[i].scale.x,array[i].scale.y)
			for(let y=0;y<array[i].pointarray.length;y++){
				let px=array[i].pointarray[y][0]
				let py=array[i].pointarray[y][1]
				if(y===0){
					ctx.beginPath()
					ctx.moveTo(px,py)
				}else{
					ctx.lineTo(px,py)
				}
			}
			if(array[i].isclose){
				ctx.closePath()
			}
			if(array[i].stroke.is===true){
				ctx.lineWidth=array[i].stroke.width
				ctx.strokeStyle=array[i].stroke.color
				ctx.stroke()
			}
			if(array[i].fill.is===true){
				ctx.fillStyle=array[i].fill.color
				ctx.fill()
			}
			
			ctx.restore()
			ctx.globalAlpha=1.0
		

		}
	}
}






















































































//背景
function background(bgcolor){
	ctx.save()	
	ctx.fillStyle=bgcolor
	ctx.fillRect(0,0,ww,wh)
	ctx.font="30px Verdana";
	ctx.fillStyle='red'
	ctx.fillText('R',20,100)	
	ctx.fillStyle='green'
	ctx.fillText('G',20,150)
	ctx.fillStyle='blue'
	ctx.fillText('B',20,200)
	ctx.font="10px Verdana";
	ctx.fillStyle='black'
	ctx.fillText(''+Math.floor(color_r)+'',270,100-5)
	ctx.fillText(''+Math.floor(color_g)+'',270,150-5)
	ctx.fillText(''+Math.floor(color_b)+'',270,200-5)
	ctx.fillStyle=color
	ctx.fillRect(10,10,50,50)
	for(let i=0;i<3;i++){
		ctx.fillStyle='rgb(150,150,150)'
		ctx.fillRect(60,100-15+i*50,200,10)
	}
	ctx.lineWidth=2
	ctx.strokeStyle='black'
	ctx.strokeRect(800-500,300-300,1000,600)

	for(let i=305;i<1300;i+=5){
		ctx.beginPath()
		ctx.moveTo(i,0)
		ctx.lineTo(i,600)
		ctx.lineWidth=0.1
		ctx.stroke()
	}
	for(let i=5;i<600;i+=5){
		ctx.beginPath()
		ctx.moveTo(300,i)
		ctx.lineTo(1300,i)
		ctx.lineWidth=0.1
		ctx.stroke()
	}
	ctx.lineWidth=1
	ctx.strokeRect(1330,460,150,40)
	ctx.strokeRect(1330,510,150,40)
	ctx.strokeRect(1330,560,150,40)
	ctx.strokeRect(1330,610,150,40)
	ctx.strokeRect(1330,660,150,40)
	ctx.font="30px Verdana";
	ctx.fillText('stroke(s)',1340,490)
	ctx.fillText('fill(f)',1340,540)
	ctx.fillText('close(c)',1340,590)
	ctx.fillText('next(n)',1340,640)
	ctx.fillText('end(e)',1340,690)
	ctx.font="15px Verdana"
	ctx.fillText('('+pen.x+','+pen.y+')',150,250)
	
	ctx.restore()
	if(iscolor){
		ctx.font="30px Verdana";
		ctx.fillText('on',180,50)
	}else{
		ctx.font="30px Verdana";
		ctx.fillText('off',180,50)
	}
}
//矩形
class Rect{
	constructor(aa){
		let element={
			groupId:'none',
			position:{x:0,y:0},
			size:{x:50,y:50},
			deg:0,
			visible:true,
			color:{fill:'red',stroke:'black'},
			fill:true,		
			stroke:false,
			strokewidth:10
			

				
		}
		this.group=[]

		Object.assign(element,aa)
		Object.assign(this,element)
	}
	draw(){
		if(this.visible===false){
			return
		}
		ctx.save()
		ctx.beginPath()
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)
		
		ctx.rect(-this.size.x/2,-this.size.y/2,this.size.x,this.size.y)
		
		if(this.stroke){
			ctx.lineWidth=this.strokewidth
			ctx.strokeStyle=this.color.stroke
			ctx.stroke()
		}
		if(this.fill){
			ctx.fillStyle=this.color.fill
			ctx.fill()
		}
		ctx.restore()
	}
	updatepath(clearpath=true){
		if(clearpath){
			this.path=new Path2D()
		}
		ctx.save()
		for(let i=this.group.length-1;i>=0;i--){
			ctx.translate(this.group[i].position.x,this.group[i].position.y)
			ctx.rotate(this.group[i].deg)
			ctx.scale(this.group[i].scale.x,this.group[i].scale.y)
		}
		ctx.beginPath()
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)

		ctx.rect(-this.size.x/2,-this.size.y/2,this.size.x,this.size.y)		
		ctx.restore()
	}

	ispointinpath(x,y){
		if(this.visible===false){
			return false
		}
		this.updatepath()
		
		return ctx.isPointInPath(x,y)
	}

}
//圓形
class Circle{
	constructor(aa){
		let element={
			groupId:'none',
			position:{x:0,y:0},
			rr:25,
			deg:0,
			visible:true,
			color:{fill:'red',stroke:'black'},
			fill:true,		
			stroke:false,
			strokewidth:10,
						
		}
		this.group=[]
		Object.assign(element,aa)
		Object.assign(this,element)
	}
	draw(){
		if(this.visible===false){
			return
		}

		ctx.save()
		ctx.beginPath()
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)
		
		ctx.arc(0,0,this.rr,0,Math.PI*2)
		ctx.closePath()
		if(this.stroke){
			ctx.lineWidth=this.strokewidth
			ctx.strokeStyle=this.color.stroke
			ctx.stroke()
		}
		if(this.fill){
			ctx.fillStyle=this.color.fill
			ctx.fill()
		}
		ctx.restore()
		
	}
	updatepath(clearpath=true){
		if(clearpath){
			this.path=new Path2D()
		}
		ctx.save()
		for(let i=this.group.length-1;i>=0;i--){
			ctx.translate(this.group[i].position.x,this.group[i].position.y)
			ctx.rotate(this.group[i].deg)
			ctx.scale(this.group[i].scale.x,this.group[i].scale.y)
		}
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)
		ctx.beginPath()
		ctx.arc(0,0,this.rr,0,Math.PI*2)
		ctx.closePath()
		ctx.restore()
	}
	ispointinpath(x,y){
		if(this.visible===false){
			return false
		}
		this.updatepath()
		return ctx.isPointInPath(x,y)
	}
	


}
//群組
class Group{
	constructor(aa){
		let all_members=[]
		let element={
			position:{x:0,y:0},
			scale:{x:1,y:1},
			deg:0,
			visible:true,
			members_count:0,
			members:all_members
			
		}
		Object.assign(element,aa)
		Object.assign(this,element)
	}
	add(object_){
		this.members.push(object_)
		object_.group.push(this)
		this.members_count+=1
	}
	draw(){
		if(this.visible===false){
			return
		}
		for(let i=0;i<this.members_count;i++){
			ctx.save()
			ctx.translate(this.position.x,this.position.y)
			ctx.rotate(this.deg)
			ctx.scale(this.scale.x,this.scale.y)
			this.members[i].draw()
			ctx.restore()
			
	
		}
	}
	ispointinpath(x,y){
		if(this.visible===false){
			return false
		}
		for(let i=0;i<this.members_count;i++){
			
			if(this.members[i].ispointinpath(x,y)){
				return true
			}
			
		}
		return false

	}
}




init()




