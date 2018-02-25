$(function(){
	refurbish();
	function refurbish(){
		var total = 0;
		var shopnum =0;
		var arr = $.cookie("cart");
		if(arr){
			arr = JSON.parse(arr);
			
		//清空旧节点
		$("form").empty();
		//遍历arr  创建节点
		for(var i = 0;i<arr.length;i++){
			var obj = arr[i];
			var table = $("<table border='1' cellspacing='0' cellpadding='0'><table").appendTo("form");
			var tr1 = $("<tr class='Tr1'></tr>").appendTo(table);
			var fristTd = $("<td class='fristTd' rowspan='2'></td>").appendTo(tr1);
			if(obj.checked==true){
				$("<input type='checkbox' checked='checked'/>").appendTo(fristTd);
				shopnum+=1;
			}else{
				$("<input type='checkbox' />").appendTo(fristTd);	
			}
			$("<td class='close'><img src='../showImg/5-140FG95151-53.png' /></td>").appendTo(tr1);
			var tr2 = $("<tr class='Tr2'></tr>").appendTo(table);
			var td2 = $("<td class='tdgoods'></td>").appendTo(tr2);
			$("<img src="+obj.img+"/>").appendTo(td2);
			$("<span class='description'>"+obj.name+"</span>").appendTo(td2);
			$("<span class='price'>单价&nbsp;&nbsp;&nbsp;&nbsp;<span>"+obj.price.toFixed(2)+"</span> 元</span>").appendTo(td2);
			$("<span class='number'>数量 </span>").appendTo(td2);
			$("<input class='sub' type='button' value='-'/>").appendTo(td2);
			$("<input class='num' type='text' value="+obj.num+" />").appendTo(td2);
			$("<input class='add' type='button' value='+' />").appendTo(td2);
			$("<span style='float: right;margin-right: 120px;'>有货</span>").appendTo(td2);
			
			if(obj.checked == true){
				total+=obj.num*obj.price.toFixed(2);
			}
		}
		//商品总价
		$(".total span").html(total.toFixed(2));
		//已选商品种类个数
		$(".balance_number span").html(shopnum);
		$(".count span").html(shopnum);
		}else{
			console.log("该购物车没有东西")
		}
		
		
		//删除一商品信息
		$("form").on("mousedown",".close",function(e){
			//事件绑定
			e.stopPropagation();
			var index = $(this).index(".close");
			console.log(index);
			if(index>=0){
			var arr = JSON.parse($.cookie("cart"));
			arr.splice(index,1);
			console.log(arr);
			//存储修改后的cookie
			$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
			//刷新
			checkall();
			refurbish();
			}
		})
		//add
		$("form").on("mousedown",".add",function(){
			var index = $(this).index(".add");
			var arr = JSON.parse($.cookie("cart"));
			arr[index].num++;
			console.log(arr);
			$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
			//刷新
			refurbish();
		})
		//sub
		$("form").on("mousedown",".sub",function(){
			var index = $(this).index(".sub");
			var arr = JSON.parse($.cookie("cart"));
			arr[index].num--;
			if(arr[index].num<=1){
				arr[index].num=1;
			}
			console.log(arr);
			$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
			//刷新
			refurbish();
		})
		//勾选和未勾选
		$("form").on("click",".fristTd input",function(){
			var index = $(this).index(".fristTd input");
			var arr = JSON.parse($.cookie("cart"));
			//此时要判断index是否为负数，否则勾选出错（bug）
			if(index>=0){
			console.log(index)
			arr[index].checked = !arr[index].checked;
			$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
			checkall();
			refurbish();
			}
		})
		
		//点击全选
		$(".allchck").click(function(){
			
//		console.log($(".allchck").prop("checked"))全选状态下为true;反之false
			var arr = JSON.parse($.cookie("cart"));
			$.each(arr, function(i) {
							
						if ( $(".allchck").prop("checked") ){//全选
							arr[i].checked = true;
							
						}
						else { //取消全选
							console.log("222");
							arr[i].checked = false;
						}
						
					});
					
				$.cookie("cart",JSON.stringify(arr),{expires:30,path:"/"});
				
				refurbish();
		})
		
		
		
		
		//判断是否为全选
		checkall();
		function checkall(){
			var num = 0;
			var arr = JSON.parse($.cookie("cart"));
			for(var i = 0;i<arr.length;i++){
				num+=arr[i].checked;
			}
			if(arr.length==0){//没有数据时不是全选
				$(".allchck").prop("checked", false); 
			}
			else if(num==arr.length){//全选
				$(".allchck").prop("checked", true); 
			}else{
				$(".allchck").prop("checked", false); 
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
