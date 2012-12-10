(function( $ ) {
  $.fn.autosearch = function(searchData, option) {
	   this.each(function() {
		var input = this;
		jQuery.autosearch(input, option, searchData);
	});
  };
})( jQuery );

jQuery.autosearch = function(input, option, suggestions){
	var outp;
	var oldins;
	var posi = -1;
	var words = new Array();
	var input;
	var key;
	var x;
	var color="red";
	var currColor="";
	var rowHeight = option.rowHeight;
	var gridHeight = 200;
	var itemInGrid = 0;
    var cnt = -1;
    var scrollHeight = 0;
    var noScroll=true;
    var suggestions;
	var $input = $(input).attr("autocomplete", "off");
	var width = input.offsetWidth;
    var fontType = option.fontType;
    var fontNormal = option.fontStyle;
	init();
	 function init(){
      suggestions = suggestions;
	  createDiv();
	  outp = document.createElement("div");
 	  outp.style.border = "1px solid black";
	  x.appendChild(outp);
	  document.body.appendChild(x);
	  window.setInterval(function(){search();}, 100);
	  setVisible("hidden");
	  document.onkeydown = keyBoardHandler;
     };

	function createDiv(){
     x = document.createElement("div");
	 x.style.position = 'absolute';
	 x.style.top  =  (findPosY(input)+3)+"px";
	 x.style.left =  (findPosX(input)+0)+"px";
	 x.style.width = width;
    };

	function findPosY(obj)
	{
		var curtop = 0;
		if (obj.offsetParent){
			curtop += obj.offsetHeight;
			while (obj.offsetParent){
				curtop += obj.offsetTop;
				obj = obj.offsetParent;
			}
		}
		else if (obj.y){
			curtop += obj.y;
			curtop += obj.height;
		}
		return curtop;
	};

	function findPosX(obj)
	{
		var curleft = 0;
		if (obj.offsetParent){
			while (obj.offsetParent){
				curleft += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		}
		else if (obj.x)
			curleft += obj.x;
		return curleft;
	};

    function search(){
	  var ins = $input.val();
	  if (oldins == ins) return;
		else if (posi > -1);
		else if (ins.length > 0){
			words = getWord(ins);
			if (words.length > 0){
				clearOutput();
				var height = rowHeight * (words.length - 1);
				if( height > gridHeight ) {
				   height = gridHeight;
				   outp.style.overflow="auto";
				   outp.style.height =  height+"px";
				   noScroll = false;
				 }
				 else { 
				 outp.style.overflow = "hidden";
				 outp.style.height =  (height + rowHeight) +"px";
				}
				itemInGrid = height / rowHeight;
				for (var i=0;i < words.length; ++i) addWord (words[i]);
				setVisible("visible");
				input = $input.val();
			}
			else{
				setVisible("hidden");
				posi = -1;
			}
		}
		else{
			setVisible("hidden");
			posi = -1;
		}
		oldins = ins;
    };
	
	function getWord(beginning){
		var words = new Array();
		var tmp = beginning.toLowerCase();
		for (var i=0;i < suggestions.length; ++i){
			var j = -1;
			var correct = 1;
			while (correct == 1 && ++j < beginning.length){
				if (suggestions[i].toLowerCase().charAt(j) != tmp.charAt(j)) correct = 0;
			}
			if (correct == 1) words[words.length] = suggestions[i];
		}
		return words;
	};

    function addWord(word){
		var sp = document.createElement("div");
		sp.appendChild(document.createTextNode(word));
		sp.style.height= rowHeight + "px";
		sp.style.fontFamily = fontType;
		sp.style.fontNormal = fontNormal;
		sp.onmouseover = mouseHandler;
		sp.onmouseout = mouseHandlerOut;
		sp.onclick = mouseClick;
		outp.appendChild(sp);
	};

    function setVisible(visi){
		x.style.visibility = visi;
	};

	function clearOutput(){
		while (outp.hasChildNodes()){
			noten=outp.firstChild;
			outp.removeChild(noten);
		}
		x.style.visibility = "hidden";
		posi = -1;
		cnt = -1;
		noScroll = true;
		scrollHeight = 0;
	};

	function getWord(beginning){
		var words = new Array();
		var tmp = beginning.toLowerCase();
		for (var i=0;i < suggestions.length; ++i){
			var j = -1;
			var correct = 1;
			while (correct == 1 && ++j < beginning.length){
				if (suggestions[i].toLowerCase().charAt(j) != tmp.charAt(j)) correct = 0;
			}
			if (correct == 1) words[words.length] = suggestions[i];
		}
		return words;
	};

	function setDivColor(pos, color, forg){
		outp.childNodes[pos].style.background = color;
		outp.childNodes[pos].style.color = forg;
	};


    function keyBoardHandler(event){
		if (!event && window.event) event = window.event;
		if (event) key = event.keyCode;
		keyHandler(event);
	};

  var mouseHandler=function(){
		for (var i=0; i < words.length; ++i)
		setDivColor (i, "white", "black");
		this.style.background = option.bgColor;
		this.style.color= "white";
	};
	
	var mouseHandlerOut=function(){
		this.style.background = "white";
		this.style.color= "black";
	};
	
	var mouseClick=function(){
		document.getElementsByName("text")[0].value = this.firstChild.nodeValue;
		//$input.val(this.firstChild.nodeValue);
		setVisible("hidden");
		posi = -1;
		oldins = this.firstChild.nodeValue;
	};

$input.blur(function(e){
 clearOutput();
});


function keyHandler(event){
		if (x.style.visibility == "visible"){
		var textfield = document.getElementsByName("text")[0];
			if (key == 40){ //Key down
		    if( posi >= words.length-1) {
			    setDivColor(posi, "#fff", "black");
                cnt = -1;
				scrollHeight = 0;
				posi =-1;
				outp.scrollTop = 0;
			}
			if (words.length > 0 && posi < words.length-1){
				if (posi >=0) setDivColor(posi, "#fff", "black");
				else input =  $input.val();
				setDivColor(++posi, option.bgColor, "white");
			    cnt=cnt+1;
				if(!noScroll){
				if(cnt >= itemInGrid) {
				   cnt = itemInGrid - 1;
				    scrollHeight = scrollHeight + rowHeight;
                   outp.scrollTop = scrollHeight;
				  }
			  }  	
				$input.val(outp.childNodes[posi].firstChild.nodeValue);
			}
		}
		else if (key == 38){ //Key up
			if (words.length > 0 && posi > 0){
				if (posi >=1){
					setDivColor(posi, "#fff", "black");
					setDivColor(--posi,  option.bgColor, "white");
					cnt=cnt-1;
				if(!noScroll){
				if(cnt < 0) {
				   cnt = 0;
				   scrollHeight = scrollHeight - rowHeight;
                   outp.scrollTop = scrollHeight;
				  }
				}  	
				$input.val(outp.childNodes[posi].firstChild.nodeValue);
				}
				else{
				 	setDivColor(posi, "#fff", "black");
					textfield.value = input;
					$input.focus();
					posi--;
				}
			}
		}
		else if (key == 27){ // Esc
			textfield.value = input;
			setVisible("hidden");
			posi = -1;
			oldins = input;
		}
		else if (key == 8){ // Backspace
			posi = -1;
			oldins=-1;
		}
		else if(key == 13){ 
	
		   }
		}
	};
  }
  