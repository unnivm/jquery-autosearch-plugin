/*
Copyright 2012 Unni Vemanchery Mana

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
  
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
	var rowHeight = (option.rowHeight == '' || option.rowHeight == undefined)?25:option.rowHeight;
	var gridHeight = 200;
	var itemInGrid = 0;
  var cnt = -1;
  var scrollHeight = 0;
  var noScroll=true;
  var suggestions;
	var $input = $(input).attr("autocomplete", "off");
	var width = input.offsetWidth;
  var fontType   =   ( option.fontType == ''  ||  option.fontType  == undefined ) ? "":option.fontType ;
  var fontNormal =   ( option.fontStyle == '' ||  option.fontStyle == undefined ) ? "":option.fontStyle ;
	var bgColor    =   ( option.bgColor == ''   ||  option.bgColor   == undefined ) ? "blue": option.bgColor;
	var fontSize   =   ( option.fontSize == ''  ||  option.fontSize   == undefined ) ? "12": option.fontSize;
	
	var searchHighlight;

	// detect browser type and version
	var browserType    = navigator.appName;
  var browserVersion =  navigator.appVersion;
	init();

	function init(){
    suggestions = suggestions;
	  createDiv();
	  outp = document.createElement("div");
 	  outp.style.border = "1px solid black";
 	  outp.style.background = "white";
	  x.appendChild(outp);
	  document.body.appendChild(x);
	  window.setInterval(function(){search();}, 100);
	  setVisible("hidden");
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
		 if (posi > -1);
		else if (ins.length > 0){
			words = getWord(ins);
			if (words.length > 0){
				clearOutput();
				var height = rowHeight * (words.length - 1);
				if( height > gridHeight ) {
				   height = gridHeight;
				   outp.style.overflow="auto";
				   if(browserType == "Microsoft Internet Explorer" && browserVersion.indexOf("MSIE 8.0")>0)  outp.style.height = ( height-1 ) +"px";
				   else outp.style.height =  height+"px";
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
           sp.innerHTML =  formatString($input.val(),word,true);
		//sp.appendChild(document.createTextNode(formatString($input.val(),word,true)));
		sp.style.height= rowHeight + "px";
		sp.style.textAlign="left";
		sp.style.fontFamily = fontType;
		sp.style.fontWeight = fontNormal;
		sp.style.fontSize = fontSize+"px";
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
	    $input.val(getStringValue(outp.childNodes[pos]));
	    input = getStringValue(outp.childNodes[pos]);
	};

	function getStringValue(divElement){
		var str="";
		for(var i = 0; i<divElement.childNodes.length; i++){
		  if(divElement.childNodes[i].nodeType == 1){
		  str+=divElement.childNodes[i].firstChild.nodeValue;
		} else if(divElement.childNodes[i].nodeType == 3){
		  str+=divElement.childNodes[i].nodeValue;
		}
		}
		return str;
	};
	
  var mouseHandler=function(){
		for (var i=0; i < words.length; ++i)
		setDivColor (i, "white", "black");
		this.style.background = bgColor;
		this.style.color= "white";
		$input.val(this.firstChild.nodeValue);
	};
	
	var mouseHandlerOut=function(){
		this.style.background = "white";
		this.style.color= "black";
	};
	
	var mouseClick=function(){
		$input.val(this.firstChild.nodeValue);
		setVisible("hidden");
		posi = -1;
		oldins = this.firstChild.nodeValue;
	};



 function formatString(searchString,str, caseSensitive){
    	var re = new RegExp(searchString,"i");
    	var fmtString = "<font style=\"font-weight:bold;font-size:13px;\">";
    	var newString = "";
        while( true ){
    	     var matchString = str.match(re);
             var index       = str.indexOf(matchString);
    	     if(index < 0 ) break;
         	   newString+=str.substring(0, index)+fmtString+matchString+"</font>";
    	       str = str.substring(index+searchString.length, str.length);
            }
          return (newString + str);		
         };

$input.keydown(function(e){
	switch(e.keyCode) {
	case 13:
		 e.preventDefault();
		 setVisible("hidden");
		 selectCurrentItem();
		 oldins = input;
		 posi = -1;
		 break;

        case 40: //down key
		if (x.style.visibility == "visible"){			  
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
				setDivColor(++posi, bgColor, "white");
				cnt=cnt+1;
				if(!noScroll){
				if(cnt >= itemInGrid) {
				   cnt = itemInGrid - 1;
				    scrollHeight = scrollHeight + rowHeight;
                		    outp.scrollTop = scrollHeight;
				  }
			  }  	
			}
  		
		 }
	         e.preventDefault(); 
                 e.stopPropagation();
		 break;	

          case 38: //up key
		  // if up arrow key pressed, then show the last item in the list	
	          if( words.length > 0 && posi <=0 ) {
                      posi = words.length - 1; // just added now
                      setDivColor(0, "#fff", "black");
                      setDivColor(posi, bgColor, "white");
                      scrollHeight   = rowHeight * posi;
                      outp.scrollTop = scrollHeight;  
		      return;				
                  }
   		  if (words.length > 0 && posi > 0){
				if (posi >=1){
					setDivColor(posi, "#fff", "black");
					setDivColor(--posi, bgColor, "white");
					cnt=cnt-1;
				if(!noScroll){
				if(cnt < 0) {
				   cnt = 0;
				   scrollHeight = scrollHeight - rowHeight;
                   outp.scrollTop = scrollHeight;
				  }
				}  	
				}
				else{
				 	setDivColor(posi, "#fff", "black");
					$input.focus();
					posi--;
				}
			}
  	         e.preventDefault(); 
                 e.stopPropagation();
                 break;  

            case 27:
                    setVisible("hidden");
                    posi = -1;
                    break;    	                		
   
            case 8:
                   posi = -1;
		   oldins=-1;
                   break;
	} //end of switch
                
});

function selectCurrentItem(){
   $input.val(input);
   if(option.onItemSelect) option.onItemSelect(input);
};

}
