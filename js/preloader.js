var imageLoader = function( objId, cImageSrc, callback){
	var self = this;
	var cSpeed=9;
	var cWidth=128;
	var cHeight=128;
	var cTotalFrames=12;
	var cFrameWidth=128;
	
	var cImageTimeout=false;
	var cIndex=0;
	var cXpos=0;
	var cPreloaderTimeout=false;
	var SECONDS_BETWEEN_FRAMES=0;

	self.startAnimation = function(){
		document.getElementById(objId).style.backgroundImage='url('+cImageSrc+')';
		document.getElementById(objId).style.width=cWidth+'px';
		document.getElementById(objId).style.height=cHeight+'px';
		
		//FPS = Math.round(100/(maxSpeed+2-speed));
		FPS = Math.round(100/cSpeed);
		SECONDS_BETWEEN_FRAMES = 1 / FPS;
		
		cPreloaderTimeout=setTimeout('self.continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);
		
	}

	self.continueAnimation = function(){
		
		cXpos += cFrameWidth;
		//increase the index so we know which frame of our animation we are currently on
		cIndex += 1;
		 
		//if our cIndex is higher than our total number of frames, we're at the end and should restart
		if (cIndex >= cTotalFrames) {
			cXpos =0;
			cIndex=0;
		}
		
		if(document.getElementById(objId))
			document.getElementById(objId).style.backgroundPosition=(-cXpos)+'px 0';
		
		cPreloaderTimeout=setTimeout('self.continueAnimation()', SECONDS_BETWEEN_FRAMES*1000);
	}
	
	self.stopAnimation = function(){//stops animation
		clearTimeout(cPreloaderTimeout);
		cPreloaderTimeout=false;
	}
	
	self._imageLoader = function (s, fun)//Pre-loads the sprites image
	{	
		if(typeof fun == "undefined") {
			fun = "self.startAnimation";
		}
		clearTimeout(cImageTimeout);
		cImageTimeout=0;
		genImage = new Image();
		genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
		genImage.onerror=new Function('alert(\'Could not load the image\')');
		genImage.src=s;
	}

	self._imageLoader(cImageSrc, callback)

}
