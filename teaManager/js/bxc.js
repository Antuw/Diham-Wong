
		var map; 
		var zoom=17;
        var TeaAddress="泰安市岱岳区山口镇小马庄村"
        var Tealocation=[117.2427056,36.23409444]
        var Teacomanyname="泰安市泰山碧霞春经贸有限公司"
       
		function onLoad() 
		{ 
			map = new TMap("mapDiv"); 
			map.centerAndZoom(new TLngLat(Tealocation[0],Tealocation[1]),zoom); 
			//允许鼠标滚轮缩放地图 
			map.enableHandleMouseScroll(); 

			var config = { 
			type:"TMAP_NAVIGATION_CONTROL_LARGE",	//缩放平移的显示类型 
			anchor:"TMAP_ANCHOR_TOP_LEFT",			//缩放平移控件显示的位置 
			offset:[0,0],							//缩放平移控件的偏移值 
			showZoomInfo:true						//是否显示级别提示信息，true表示显示，false表示隐藏。 
		    }; 
			//创建缩放平移控件对象 
			control=new TNavigationControl(config); 
            control.setLeft(30);
			//添加缩放平移控件 
			map.addControl(control); 
			//创建比例尺控件对象          
			var scale = new TScaleControl(); 
			//添加比例尺控件 
            scale.setLeft(40); 
			map.addControl(scale); 
			//创建地图类型控件对象 
			var chooseMapControl = new TMapTypeControl({mapTypes:[TMAP_SATELLITE_MAP, TMAP_HYBRID_MAP, TMAP_NORMAL_MAP]}); 
			//将地图类型控件添加到地图上 
			map.addControl(chooseMapControl); 
			//设置默认显示卫星图 
			map.setMapType(TMAP_SATELLITE_MAP); 
			//设置地图类型控件在地图上显示的位置，默认为在右侧，注：将控件加载到map之后再做此配置 
			chooseMapControl.setRight(10); 
	        chooseMapControl.setTop(10); 
			 
			//创建自定义控件，并添加到地图上 折线图
            var chartObj = document.getElementById("chart"); 
            var chartControl = new THtmlElementControl(chartObj); 
            chartControl.setRight(30); 
            chartControl.setTop(50); 
            map.addControl(chartControl); 

            // //自定义控件2茶园列表
            var nameObj = document.getElementById("name"); 
            var nameControl = new THtmlElementControl(nameObj); 
            nameControl.setLeft(0); 
            nameControl.setTop(0); 
            map.addControl(nameControl); 

           //创建标注对象
           marker = new TMarker(new TLngLat(Tealocation[0],Tealocation[1]));
           //向地图上添加标注
            map.addOverLay(marker); 
            //注册标注的点击事件
       		 TEvent.addListener(marker,"click",onClick); 
            
                 
		}
        function closeControl(){
            var showChart=document.getElementById("chart");
            showChart.style.display="none";
        }
		function onClose(win){ //关闭弹出窗口
         map.removeOverLay(win); 
     	}

		function onClick(){ //弹出信息窗口
         var showChart=document.getElementById("chart");
         showChart.style.display="block";
         

         var html=[]; 
         html.push('<div style="background:#CCCC99;height:25px;color:#000;width:300px;">'); 
         html.push('     <span style="width:100px;float:left;margin-left:2px;background:">'+Teacomanyname+'</span><button onclick="onClose(customerWinInfo)" style="float:right;margin-right:5px;" >关闭</button><span   ></span>');    
         html.push('</div>'); 
         html.push('<div id="deliver-legend-ctrl" style="background:#fff;border:1px solid #C0C0C0;">'); 
         html.push(' <table cellspacing="0" cellspadding="0" style="width:300px;border:1px solid #ff0000;">'); 
         html.push('     <tr align="center" style="height:10px;">'); 
         html.push('         <td></td>'); 
         html.push('         <td><a herf="javascript:void(0);"></a></td>'); 
         html.push('     </tr>'); 
         html.push('     <tr align="center">'); 
         html.push('         <td>地址:</td>'); 
         html.push('         <td>'+TeaAddress+'</td>'); 
         html.push('     </tr>'); 
         html.push('     <tr align="center">'); 
         html.push('         <td>经纬度:</td>'); 
         html.push('         <td>东经'+marker.getLngLat().getLng()+',北纬'+marker.getLngLat().getLat()+'</td>'); 
         html.push('     </tr>'); 
         html.push('     <tr style="height:10px;">'); 
         html.push('         <td></td>'); 
         html.push('         <td><a herf="javascript:void(0);"></a></td>'); 
         html.push('     </tr>'); 
         html.push(' </table>'); 
         html.push('</div>'); 
		 
         var config = { 
			offset:new TPixel(0,0), 
			position:marker.getLngLat() 
		 }; 
         customerWinInfo=new TLabel(config); 
         customerWinInfo.setTitle(''); 
         customerWinInfo.setLabel(html.join('')); 
         customerWinInfo.getObject().style.zIndex = 10000; 
         map.addOverLay(customerWinInfo); 
         var obj = customerWinInfo.getObject(); 
         var width = parseInt(obj.offsetWidth); 
         var height = parseInt(obj.offsetHeight); 
         var icon = this.getIcon(); 
         var anchor_icon = icon.getAnchor(); 
         var pixel = new TPixel(width/-2,height/-2-anchor_icon[1]); 
         customerWinInfo.setOffset(pixel); 
     	}
        function bodysize(){
            bodyWidth=document.body.scrollWidth;
            bodyHeight=document.body.scrollHeight;
        }
        var count=1; 
        // function checkWidth(){
        //     if(count%2==0){
        //          showleft();              
        //      }else{
        //          closeleft();               
        //      }
        // }
        var checkwidth=setInterval(function(){//监听宽度改变事件
            if(count%2==0){
                showleft();              
            }else{
                closeleft();               
            }
        },100)
        function slid(){//侧边栏出现收回函数
            if(count%2==0){
                showleft();
                count++;
            }else{
                closeleft();
                count++;
            }
        }
        function showleft(){//显示侧边栏
            document.getElementById("openclose").src="tea/1.png";
            bodysize();
            ww=bodyWidth-315;
            w=ww+"px";
            var mapcontainer=document.getElementById("mapcontainer");
            var mapdiv=document.getElementById("mapDiv");        
            mapcontainer.style.width=w;
            mapdiv.style.width=w;
            var left=document.getElementById("left");
            left.style.display="block";
        }
        function closeleft(){//收回侧边栏
            document.getElementById("openclose").src="tea/2.png";
            var left=document.getElementById("left");
            left.style.display="none";
            var mapcontainer=document.getElementById("mapcontainer");
            var mapdiv=document.getElementById("mapDiv");
            mapcontainer.style.width="100%";
            mapdiv.style.width="100%";
            
        }
        function reachtea(teaurl){
            // window.open(teaurl,"_self",)
            window.location.assign(teaurl);
        }
