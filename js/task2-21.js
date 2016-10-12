

(function(){
	
	var tagInput = document.getElementById("tagInput");
	var tagOutput = document.getElementById("tagOutput");
	var hobbyInput = document.getElementById("hobbyInput");
	var hobbyOutput = document.getElementById("hobbyOutput");
	var sureHobby = document.getElementById("sureHobby");
	
	//判断是否有一样的内容
	function hasLabel(label,output){
		var liList = output.getElementsByTagName("li");
		for (var i=0;i<liList.length;i++) {
			if(liList[i].innerHTML == label){
				return true;
			}
		}
		return false;
	}
	//添加事件操作
	function addEvent(element,type,handler){
		if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
	}
	
	// 对数组进行去重操作
	function uniqArray(arr) {
	    var new_array = [];
	    for (var i = 0;i < arr.length; i++) {
	        if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0 ) {
	            new_array.push(arr[i]);
	        }
	    }
	    return new_array;
	}
	//获取输入框内容到显示内容处
	function getOutput(inputvalue){
		var value = inputvalue.value;
		var array = value.split(/[,，、 \n\t\r]+/);
		var finnalArray = [];
		for(var i=0;i<array.length;i++){
			if(array[i].trim() !== ""){
				finnalArray.push(array[i]);
			}
		}
		if(finnalArray.length){
			uniqArray(finnalArray);
			return finnalArray;
		}else{
			alert("输入框没有内容了");
			return false;
		}
	}
	//鼠标事件
	function hover(ev,output){
		var event = ev || window.event;
		var obj = event.srcElement ? event.srcElement :event.target;
		if(obj.nodeName.toLocaleLowerCase() =="li"){
			var inner = obj.innerHTML;
			obj.innerHTML = "点击删除"+inner;
			obj.style.backgroundColor = "green";
			
			addEvent(obj,"mouseout",function(){
				obj.innerHTML = inner;
				obj.style.backgroundColor = "darkslateblue";
			});
			addEvent(obj,"click",function(){
				output.removeChild(obj);
			});
		}
	}
	
	//多于10个，删除第一个标签
	function push(output,inputvalue){
		var value = getOutput(inputvalue);
		if(value.length){
			var fragment = document.createDocumentFragment();//documentFragment类型
			for (var i=0;i<value.length;i++) {
				if(!hasLabel(value[i],output)){
					var Li = document.createElement("li");
					Li.innerHTML = value[i];
					fragment.appendChild(Li);
				}
			}
			
			output.appendChild(fragment);
			var liList = output.getElementsByTagName("li");
			if(liList.length > 10){
                for(var j=0; j<liList.length - 10; j++){
                    output.removeChild(output.firstElementChild);
                }
            }
		    output.value = "";
		    }
			else{
		        return false;
		        }
		    }
	

    addEvent(tagOutput, "mouseover", function(){
    	hover(event,tagOutput);	
    });
    addEvent(hobbyOutput, "mouseover", function(){
    	hover(event,hobbyOutput);	
    });

    addEvent(sureHobby, "click", function(){
        push(hobbyOutput, hobbyInput);
    });

    addEvent(tagInput, "keydown", function(){
        var ev = event || window.event;
        if(ev.keyCode == 13 || ev.keyCode == 108 ||ev.keyCode == 32 ||ev.keyCode == 188){
            push(tagOutput, tagInput);
        }
    });

})();
