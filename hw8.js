var key=" ", usertype=" ";
    var idarray= new Array();
    var next=null, previous=null;
    var ref;
    ref= $("div.row ul.nav.navbar-nav li.active");
    var lat=" "; var log=" ";
    $(document).ready(function(){
	     $('#sform').submit(function() {
            var valid = true;
            $('span.error', this).remove();
            if (!$('#key').val()) {
                  valid = false;
                  $('<span class="error">Please enter a keyword</span>').
                        insertBefore('#key');
            }
            
            return valid;
      });
      var i;
		window.fbAsyncInit = function() {
		FB.init({
			appId:'105687296626875',xfbml:true,status:true,version:'v2.8'
		});
	};
  var len=localStorage.length;

	(function(d, s, id){
		var js;
    var fjs = d.getElementsByTagName(s)[0];
		if (!d.getElementById(id)) {
      flag=false;
    } else if(d.getElementById(id)) {
      return;
    }
		js = d.createElement(s);flag=false; js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
    if(flag) {
      return;
    }
		fjs.parentNode.insertBefore(js, fjs);
    if(flag) {
      return;
    }
		}(document, 'script', 'facebook-jssdk'));
	 i=0;
        while(i<len)
        {   var getwordkey;
          getwordkey=localStorage.key(i);
            var getitemword=localStorage.getItem(getwordkey);
            var idcheck=JSON.parse(getitemword);
            i=i+1;
            idarray.push(idcheck["rowid"]);
        }
        
        $('#searchid').click(
          function(event){
                var ref;
                ref=$("div.row ul.nav.navbar-nav li.active");
          
            var id;
            id= ref.data("id");
            function checkGreat(value) {
              if(value > 10) {
                return true;
              }
              return false;
            }
            if(id == "1")
			{
			usertype="user";
			}
			else if(id == "2")
			{
			usertype = "page";
			}
			else if(id == "3")
			{
			usertype="event";
			}
			else if(id == "4")
			{
			usertype="place";
			getLocation();
			}
			else if (id == "5")
			{
			usertype="group";
			}
			else if (id == "6")
			{
			usertype="favourites";
			}
			else{
			}
			
        key=$("#key").val();    		
        event.preventDefault();                                
        if(!(usertype=="favourites")) {
            var chktem=checkGreat(1);

          $.ajax({url: "FBSearch.php",type: "get",async: false,data:{
            keyword:key,searchtype:usertype,iden:null,latitude:lat,longitude:log,details:null
          },
          success: function (response,status,xhr) {
            var valueadd=1000;
             hiddenProgress();
             var teem=checkGreat(valueadd);

			 setTimeout(function(){displayDataTable(response,usertype)},1000);
           //displayDataTable(response,usertype);

        },  
            
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }

    }); 
             
         }
            else{
                 getdata();
			     document.getElementById("nextlink").style.display = "none";
            }
        })
            
         
        $("a").click(function(event){	
          
	 
	       var id= event.currentTarget.id;
            if(id == "1")
			{
			usertype="user";
			}
			else if(id == "2")
			{
			usertype = "page";
			}
			else if(id == "3")
			{
			usertype="event";
			}
			else if(id == "4")
			{
			usertype="place";
			getLocation();
			}
			else if (id == "5")
			{
			usertype="group";
			}
			else if (id == "6")
			{
			usertype="favourites";
			}
			else{
			}
			
        key=$("#key").val();  
        event.preventDefault();	
     if(usertype=="favourites")
         {
             getdata();
			 document.getElementById("nextlink").style.display="none";
         }
              else{
			  if(key!=" ")
               { 
        document.getElementById("favi").style.display="none";
        
        function setStatus(str) {
          str2=" ";
          return str.concat(str2);
        }
              
       $.ajax({
        url: "FBSearch.php",
        type: "GET",
        async: false,
        data:{
            keyword:key,
            searchtype:usertype,
            iden:null,
            latitude:lat,
            longitude:log,
            details:null
        },
            
        success: function (response,status,xhr) {
            var valueadd=1000;
            hiddenProgress();
            var teem=checkGreat(valueadd);
            displayDataTable(response); 

        },
		
        error: function(jqXHR, textStatus, errorThrown) {
          var updstatus;
          updstatus=setStatus("error");
           console.log(textStatus, errorThrown);
        }

       
    });
  }
  }
  })	
          
		 var previousvar;
     previousvar="previous";	 
	   $('#previouslink').click(function(event){
      var nextvaris;
      nextvaris="NEXT";
            event.preventDefault();	
            nextvaris.concat(previousvar);	 
        $.ajax({
        url: "FBSearch.php",
        type: "GET",
        async: false,
        data:{
            keyword:key,searchtype:usertype,iden:previousvar,previousurl: previous,details:null
        },
        success: function (response,status,xhr) {
            var valueadd=1000;
            hiddenProgress();
            var teem=checkGreat(valueadd);
            displayDataTable(response);
        },             
        error: function(jqXHR, textStatus, errorThrown) { 
          var updstatus=setStatus("error");
		   console.log(textStatus, errorThrown);        }
                 
            
        });
    
     })
        	   
        var nextvar="next";
        $('#nextlink').click(function(event){
			event.preventDefault();		  
            $.ajax({
		url: "FBSearch.php",type: "GET",async: false,
		data:{
            keyword: key,searchtype:usertype,iden:nextvar,nexturl: next,details:null
        },
        success: function (response,status,xhr) {
          hiddenProgress();
          displayDataTable(response );
        },
                     
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
                 
            
        });
    
     })
        
        
        })

    
function hiddenProgress(){
    if(document.sform.keyword1.value!="") {
    if(!("block"==document.getElementById("progressId").style.display)){
       document.getElementById("plink").style.display=
       "none";
       document.getElementById("nlink").style.display=
        "none";
       document.getElementById("ddiv").innerHTML=
        "";
        document.getElementById("pId").style.display=
        "block";
        
 
                                                                        }

    else if(("block"==document.getElementById("progressId").style.display){
     document.getElementById("pId").style.display=
"none";
         }
else{}
                                        }
else
{}
}

function getLocation(){
        if (!navigator.geolocation) {
                 alert("Geolocation is not supported by this browser");
                 
               } else if(navigator.geolocation){ 
                navigator.geolocation.getCurrentPosition(showPosition);
                 }
             else{}
            }

           function showPos(pos) {
             lat= position.coords.latitude;//log = position.coords.longitude;

}
function resetform(id)
    {
         window.location.href="FBWEB.html";
        document.sform.keyword1.value="";
    }
	function hideShowAlbumsPosts(aid){
	  if(aid=='albums'){
	     if(!(document.getElementById('AlbumsTable').style.display=="block"))
		 {       document.getElementById('AlbumsTable').style.display='block';
			
		 }
              else if(document.getElementById('AlbumsTable').style.display=="block"){
                     document.getElementById('AlbumsTable').style.display='none';
                     }
		 else{
    
		  
		 }
           else{}
		   }
	  
	  if(aid=='posts'){
	     if(!(document.getElementById('PostsTable').style.display=="block"))
		 {       document.getElementById('PostsTable').style.display="block";
			 
		 }
               else if(document.getElementById('PostsTable').style.display=="block"){
                  document.getElementById('PostsTable').style.display="none";
                   }
		 else{}
		 else {
}
	  }
	  
	  if(aid=='idname'){
	     if(!(document.getElementById('idname').style.display=="block"))
		 {
			document.getElementById('idname').style.display='block';
		 }
		 else if (document.getElementById('idname').style.display=="block"){
		  document.getElementById('idname').style.display='none';
		 }
		  else{}
	  }
	  else
{
}
	   
   }
   
   
   function hSImage(){
	 if(!(document.getElementById(id).style.display=="block"))
	   {document.getElementById(id).style.display="block";
	   }
	   else if(document.getElementById(id).style.display=="block"){
		document.getElementById(id).style.display="none";   
	   }
else {
}
   }
   
   
   function savDefav(albumsPostsName,usertype)
    {
        var ispresent= false;var rid = btn.id.substr(index+1,btn.id.length);var index = btn.id.search("_");
        if(idarray.includes(rid))
            {ispresent=true;}
        var favid= btn.id; var photo= imgscr1;var utype= usertype;var name= albumsPostsName;

        if(ispresent) {
             removeData(rid,null);
              var change_glyph = document.getElementById(favid);
              change_glyph.innerHTML='<span id="star" class="glyphicon glyphicon-star-empty"></span>';
        }
        else if(!ispresent)
        {
            idarray.push(rid);
            symbol= {
                    "rowid":rid, "name" : name, "picture": photo, "type": utype
            };
            var stringJ=JSON.stringify(symbol);
            localStorage.setItem(rid, stringJ);  
            var change_glyph=document.getElementById(favid);
            change_glyph.innerHTML='<span id="star" class="glyphicon glyphicon-star" style="color:yellow"></span>';
        } 
    }
	
	
    
    
    
    
    
    
    
    
   
    
    
    function getdata()
    {
       document.getElementById('favi').style.display="block";
        document.getElementById('detailsdiv').style.display="none";
      var len = localStorage.length;       
       
        if(len==0 ){document.getElementById('favi').innerHTML="<p>NO FAVOURITES</p>";
                   }
       else{
           var displaytable="<div class=\"row\" style=\"width:100%\"><div class=\"col-md-12\"><table class=\"table table-hover\" ><tr><th> # </th><th>Profile Photo</th><th>Name</th><th>Type</th><th>Favorite</th><th>Details</th></tr>";
        i=0;
		while(i<len)
            
            {              
                var data= JSON.parse(localStorage.getItem(localStorage.key(i)));
                var id=data["rowid"];
                displaytable+= "<tr id=\""+data["rowid"]+"\"><td >"+(i+1)+"</td><td><img src=\""+data["picture"]+"\"width=\"40px\" height=\"30px\" style=\"border-radius:50%;\"/></td><td>"+data["name"]+"</td><td>"+data["type"]+"</td><td><button type=\"button\" class=\"btn btn-default btn-md\" onclick=removeData("+data["rowid"]+",'fav')> <span class=\"glyphicon glyphicon-trash\"></span> </button></td><td><button id=\"details_"+id+"\" onclick=\"displayDietails(this,true)\" class=\" newident btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-chevron-right\"></span></button></td></tr>";
                i++;
          }
           document.getElementById('favi').innerHTML=displaytable;
           }
    }
    
    function removeData(rowid,favtype)
    {
        var len= localStorage.length;
		i=0;
        while(i< len)
            {
                var row=JSON.parse(localStorage.getItem(localStorage.key(i)));
                var rid= row["rowid"];
                if(rid==rowid)
                    {
                    localStorage.removeItem(localStorage.key(i));
                        var index=idarray.indexOf(rid);
                        idarray.splice(index,1);
                        var len= idarray.length;
                    
                    if(favtype!=null)    
                        getdata();
                    }
               i++; 
            }
        
    }
    
    function displayDataTable(response,usertype)
    {
        var displaytable="<div class=\"row\" style=\"width:100%\"><div class=\"col-md-12\"><table class=\"table table-responsive table-hover\" ><thead><tr><th> # </th><th>Profile Photo</th><th>Name</th><th>Favourites</th><th>Details</th></tr></thead>";
            var pagingObj=null;
            if(response.hasOwnProperty("paging")){
            pagingObj=response.paging;
            }
            if(pagingObj!=null && pagingObj.hasOwnProperty("next")){
            next= pagingObj.next;
            }
            else{
                next=null;
            }
            if(pagingObj!=null &&  pagingObj.hasOwnProperty("previous")){
            previous= pagingObj.previous;
            }
            else{
                previous=null;
            }
                if(next!=null)
                {
                    document.getElementById("nextlink").style.display="inline-block";
                }
            if(previous!=null)
                {
                    document.getElementById("previouslink").style.display="inline-block";
                }
            var respData=response.data;
           var len=0;
            if(respData!=null){ len=respData.length;}
			var i=0;
           while(i<len)
               {
                   var imgscr=response.data[i].picture.data.url;
                   var favid= response.data[i].id;
                   displaytable+="<tr id=\""+favid+"\"><td>" + (i+1) +"</td>";
                   displaytable+="<td><img src=\""+imgscr+"\" height=\"50px\" width=\"50px\" style=\"border-radius: 50%; \" /></td>";
                   displaytable+="<td>" + response.data[i].name +"</td>";  
                   if(idarray.includes(favid))
                       {
                           displaytable+="<td><button id=\"btn_"+favid+"\" class=\"btn btn-default btn-sm\" onclick=\"savefav(this,usertype)\"><span class=\"glyphicon glyphicon-star\" style=\"color:yellow\"></span></button></td>"
                       }
                   else
                   {
                       displaytable+="<td><button id=\"btn_"+favid+"\" class=\"btn btn-default btn-sm\" onclick=\"savefav(this,usertype)\"><span id=\"star\" class=\"glyphicon glyphicon-star-empty \"></span></button></td>";
                   }
                   displaytable+="<td><button id=\"details_"+favid+"\" onclick=\"displayDietails(this,false)\" class=\"newident btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-chevron-right\"></span></button></td></tr>"; 
                   i++;
               }
             displaytable+="</div>";
             displaytable+="</div>";
           $("#detailsdiv").html(displaytable);
          document.getElementById("detailsdiv").style.display="block";
            hiddenProgress();
    }
    
    
    function displayDietails(event,isfav){
	detailsSlideFunc();
        if(isfav)
        {
            key=null;
            usertype=null;
        }
	var stringId = event.id;
		
         var className=event.className;
		 var value= className.search("newident");
        if(!(value<0)){		
        var index = stringId.search("_");
		var id_1 = stringId.substr(index+1,stringId.length);	 
            detailsExists="true";
			$.ajax({
        url: "FBSearch.php",
        type: "get",
        async: false,
        data:{
            keyword: key,
            searchtype:usertype,
			iden:null,
            details:detailsExists,
			id_details : id_1
            
        },
        success: function (response,status,xhr) {
		  console.log(response);
            var imgscr1=response.picture.data.url;
            var albumsPostsName=response.name;
		  var dispdetails="<div class=\"col-md-12 detailButtonGrp\">";
		  dispdetails+="<button onclick=\"backSlideFunc()\" type=\"button\" class=\"btn btn-default\" style=\"margin-top:2px\"><span class=\"glyphicon glyphicon-chevron-left\">Back</span></button>";
		  dispdetails+="<div class=\"pull-right\">";
          
		   if(!(idarray.includes(id_1)))
                       {
					       dispdetails+="<button id=\"fav_"+id_1+"\" class=\"btn btn-default btn-sm\" onclick=\"saveDetailsfav(this,'"+usertype+"','"+imgscr1+"','"+albumsPostsName+"')\"><span id=\"star\" class=\"glyphicon glyphicon-star-empty \"></span></button>";
                           
                       }
                   else
                   {
                       dispdetails+="<button id=\"fav_"+id_1+"\" class=\"btn btn-default btn-sm\" onclick=\"saveDetailsfav(this,'"+usertype+"','"+imgscr1+"','"+albumsPostsName+"')\"><span class=\"glyphicon glyphicon-star\" style=\"color:yellow\"></span></button>";
                   }
          dispdetails+="<button onclick=\"feedPost('"+albumsPostsName+"','"+imgscr1+"')\" class=\"btn btn-default\"><img src=\"http://cs-server.usc.edu:45678/hw/hw8/images/facebook.png\" style=\"width:15px; height:15px\"></button>";
          dispdetails+="</div>";
          dispdetails+="</div>";		  
		  var albumsPostsName=response.name;
		  dispdetails+="<div class=\"col-md-6\"><div class=\"panel panel-default\" >";
		  var albumobj=null;
		  if(response.hasOwnProperty("albums")){
            albumobj=response.albums;
            
			var albumobj1 = albumobj.data;
			albumlen = albumobj1.length;
			
			dispdetails+="<div class = \"panel-heading\">ALBUMS</div>";
			dispdetails+="<div class=\"panel-body\"><div class=\"panel-group\">";
	        var j=0;
			while( j<albumlen )
			{
			dispdetails+="<div class=\"panel panel-default\">";
			var pname = albumobj1[j],photoname = pname.name,idName = photoname.replace(" ","_");
			
			if(!(pname.hasOwnProperty("photos")))
			{
			dispdetails+="<div class = \"panel-heading\">ALBUMS</div>";
			dispdetails+="<div class=\"panel-body\">";
			dispdetails+="<div class=\"alert alert-warning\" role=\"alert\">No Albums Found</div>";
			dispdetails+="</div>";
			}
			dispdetails+="</div>";		
			dispdetails+="</div>";
			else if(pname.hasOwnProperty("photos")){
			photosobj=pname.photos;
			
			var photosobj1 = photosobj.data,photolen = photosobj1.length;
			
			dispdetails+="<div class = \"panel-heading\"><h4 class'panel-title><a id='ahrefid"+j+"' onclick=\"albumshideshowfunc('divalbumelem"+j+"')\" href='#ahrefid"+j+"'>"+photoname+"</h4></a></div>";
			if(!(j==0))
			{
				dispdetails+="<div id='divalbumelem"+j+"' style=\"display:none\" class = \"panel-collapse collapse\">";
            }
			dispdetails+="<div class = \"panel-body\">";
			else if(j==0)
			{
			dispdetails+="<div  id='divalbumelem"+j+"' style=\"display:block\" class = \"panel-collapse collapse in\">";
			}
			i=0;
			while(i<photolen)
			{
/*			var photosobj2 = photosobj1[i];
			if(photosobj2.hasOwnProperty("picture"))
			{
			
			var pic1 = photosobj2.picture;
			var picid=photosobj2.id;
			$.ajax({
        url: "FBSearch.php",
        type: "get",
        async: false,
        data:{
            picurl : picid,
			keyword:null,
            searchtype:null,
			iden:null,
            details:"false"
			},
			success : function(response1,status,xhr){
			if(response1!=null && response1.hasOwnProperty('Location')){
			var urlVal=response1.Location;
			dispdetails+="<div class=\"panel-body\"><img style=\"width:100%;\" src=\""+urlVal+"\"/></div>";		
			}
			
			},
			
		    error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown); */
		}
		});
						
			}
			i++;
			}
			dispdetails+="</div></div>";
			}
			dispdetails+="</div>";
			j++;
			}
			dispdetails+="</div>";
			dispdetails+="</div>";
			}
			
			
			var postsobj=null; 
		    dispdetails+="<div class=\"col-sm-6\">";
			dispdetails+="<div class=\"panel panel-default\" >";
			if(response.hasOwnProperty("posts")){
		    
            postsobj=response.posts;
			
			console.log(postsobj);
           	var postsobj1 = postsobj.data;
			var postslen = postsobj1.length;
			
			if(!(postslen<0))
			{
			
			dispdetails+="<div class = \"panel-heading\">POSTS</div>";
			dispdetails+="<div class=\"panel-body\">";
	
			var imgscr1=response.picture.data.url;
			//console.log(imgscr1);
			//console.log(imgscr1);
			var j=0;
			while( j<postslen )
			{
			var createdtime = postsobj1[j].created_time;
			var displayPostData="";
			if(postsobj1[j]!=null &&postsobj1[j].hasOwnProperty('message')){
			displayPostData = postsobj1[j].message;
			}
			else if(postsobj1[j]!=null &&postsobj1[j].hasOwnProperty('story')){displayPostData = postsobj1[j].story;}
			dispdetails+="<div  class=\"panel-group\"><div class=\"panel panel-default\">";
                        <!--dispdetails+="</div>"; -->
			dispdetails+="<div class = \"panel-collapse\">";
			dispdetails+="<div style=\"padding:2px 10px\" class=\"media\">";
			<!-- dispdetails+="<div style=\"margin:2px 10px\" class=\"media\">" -->
			dispdetails+="<div style=\"padding:10px 2px\" class=\"media-left\"><img src=\""+imgscr1+"\" width=\"50px\" height=\"50px\" /></div>";
			dispdetails+="<div style=\"padding:2px 10px\" class=\"media-body\"><span style=\"font-size:20px\" >"+albumsPostsName+"</span><p style=\"font-size:10px;color:grey\">"+createdtime+"</p></div>";
			dispdetails+="<p>"+displayPostData+"</p></div>";		
			dispdetails+="</div></div>";
			dispdetails+="</div>";
			j++;
			}

		dispdetails+="</div>";
		}
		else{
		dispdetails+="<div class = \"panel-heading\">POSTS</div>";
		dispdetails+="<div class=\"panel-body\">";
		dispdetails+="<div class=\"alert alert-warning\" role=\"alert\">No Posts Found</div>";
		dispdetails+="</div>";
		}
		}
		else{
		dispdetails+="<div class = \"panel-heading\">POSTS</div>";
		dispdetails+="<div class=\"panel-body\">";
		dispdetails+="<div class=\"alert alert-warning\" role=\"alert\">No Posts Found</div>";
		dispdetails+="</div>";
		}
		dispdetails+="</div>";
		dispdetails+="</div>";
		$("#detailsdiv").html(dispdetails);
		setTimeout(function(){details(response,detailsfavid)},1000);
		if(isfav){
                document.getElementById("favi").style.display="none";
		 document.getElementById("detailsdiv").style.display="block";
            }
         },            
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
                 
            
        });
		}
	}
   
   
   
   
   	var app = angular.module('myApp', ['ngAnimate', 'ngTouch']);
 
   app.controller('Swipetabs', function ($scope) {
    $scope.DetailstoHide = true;    
})
 
   function detailsSlideFunc(this){
   var scope = angular.element($("#MainDiv")).scope();
   //scope.$apply(func(){
		scope.$apply(function(){
    //scope.DetailstoHide = true;  
		scope.DetailstoHide = false; 
    })
   }
   
   function backSlideFunc(this){
       $( "#searchid" ).trigger( "click" );
	   //scope.$apply(func(){
       var scope = angular.element($("#MainDiv")).scope();
		//scope.$apply(func(){
		scope.$apply(function(){
        //scope.$apply(func(){
		scope.DetailstoHide = true;
    //scope.$apply(func(){
	})
   }
   
 function feedPost(name,picture){	
    FB.login(function(response){
	if (!response.authResponse){
	    alert('Not Posted');
	}
    else if(response.authResponse){
	FB.ui({
            method: 'feed',name: name,link:'http://www.facebook.com',picture: picture,caption: 'FB SEARCH FROM USC CSCI571',description:' ',display: "popup"
	   },function(response){ if(!response){alert('Not Posted');} else{
        alert("Posted Successfully");
    }});
        
    }
	});
}
var symbol;
   
    function savefav(btn,usertype)
    {
       
        var favid= btn.id;
        var index = favid.search("_");
		var rid = favid.substr(index+1,favid.length);
       
        var localkey= document.getElementById(rid) tabledata= localkey.cells,name = tabledata[2].firstChild.data,photo= tabledata[1].firstChild.currentSrc;
        var utype= usertype;
        var ispresent= false;
        if(!(idarray.includes(rid))
        {ispresent = false;}
        else if(idarray.includes(rid))
            {ispresent=true;}
        else { }
        if(ispresent)
        {
          removeData(rid,null);
          document.getElementById(favid).innerHTML='<span id=\"star\" class=\"glyphicon glyphicon-star-empty \"></span>';  
        }
        else if (!ispresent){
		     symbol= {
                    "rowid":rid,"name" : name,"picture": photo,"type": utype,
                };
                idarray.push(rid);
                localStorage.setItem(rid, JSON.stringify(symbol));  
                document.getElementById(favid).innerHTML='<span class="glyphicon glyphicon-star" style="color:yellow"></span>';
             
        }
    }
	
	function albumshideshowfunc(id){
   var display=document.getElementById(id).style.display;
   var sub=id.substr(0,12);
   var index=id.substr(12,13);
   if(document.getElementById(id).style.display=="block")
	{   document.getElementById(id).style.display="none";

	}
	else{
		   document.getElementById(id).style.display="block";
		   i=0;
		while(i<5){
			if(i!=index){
			 document.getElementById(sub+i).style.display="none";
			}
			i++;
		}
	}
   }




function hiddenProgress(){
    if(document.searchform.keyword.value!="") {
    if("block"==document.getElementById("progressId").style.display){
        document.getElementById("progressId").style.display="none";
    }

    else {
        document.getElementById("datadiv").innerHTML="";
        document.getElementById("nextlink").style.display="none";
        document.getElementById("previouslink").style.display="none"
        document.getElementById("progressId").style.display="block";
    }
    }
}
function getLocation(){
        if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(showPosition);
               } else { 
                alert("Geolocation is not supported by this browser");
                 }
            }

           function showPosition(position) {
             lat= position.coords.latitude;
             log = position.coords.longitude;
}
function resetform()
    {
         window.location.href="FBWEB.html";
        document.searchform.keyword.value="";
    }
	function hideShowAlbumsPosts(aid){
	  if(aid=='albums'){
	     if(document.getElementById('AlbumsTable').style.display=="block")
		 {
			document.getElementById('AlbumsTable').style.display='none';
		 }
		 else{
		  document.getElementById('AlbumsTable').style.display='block';
		 }
		  
	  }
	  
	  if(aid=='posts'){
	     if(document.getElementById('PostsTable').style.display=="block")
		 {
			 document.getElementById('PostsTable').style.display="none";
		 }
		 else{
		  document.getElementById('PostsTable').style.display="block";
		 }
		 
	  }
	  
	  if(aid=='idname'){
	     if(document.getElementById('idname').style.display=="block")
		 {
			document.getElementById('idname').style.display='none';
		 }
		 else{
		  document.getElementById('idname').style.display='block';
		 }
		  
	  }
	  
	   
   }
   
   
   function hideShowImage(id){
	 if(document.getElementById(id).style.display=="block")
	   {document.getElementById(id).style.display="none";
	   }
	   else{
		   document.getElementById(id).style.display="block";
	   }
   }
   
   
   function saveDetailsfav(btn,usertype,imgscr1,albumsPostsName)
    {
        var index = btn.id.search("_");
        var rid = btn.id.substr(index+1,btn.id.length);
        var ispresent= false;
        if(idarray.includes(rid))
            {
                ispresent=true;
            }
        var name= albumsPostsName;
        var photo= imgscr1;
        var utype= usertype;
        var favid= btn.id;

        if(ispresent) {
             removeData(rid,null);
              var change_glyph = document.getElementById(favid);
              change_glyph.innerHTML='<span id="star" class="glyphicon glyphicon-star-empty"></span>';
        }
        else if(!ispresent)
        {
            idarray.push(rid);
            symbol= {
                    "rowid":rid, "name" : name, "picture": photo, "type": utype
            };
            var stringJ=JSON.stringify(symbol);
            localStorage.setItem(rid, stringJ);  
            var change_glyph=document.getElementById(favid);
            change_glyph.innerHTML='<span id="star" class="glyphicon glyphicon-star" style="color:yellow"></span>';
        } 
    }
	
	