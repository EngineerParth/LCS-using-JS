


// function lcs(x,y){
// 	var i,j;
// 	var l_x=x.length;
// 	var l_y=y.length;

// 	//create two 2D arrays to hold the results
// 	var b=[], c=[];
// 	for(i=0;i<l_x+1;i++){
// 		b[i]=new Array(l_y+1);
// 		c[i]=new Array(l_y+1);
// 	}

// 	//Initialize
// 	for(i=0;i<l_x+1;i++){
// 		for(j=0;j<l_y+1;j++){
// 			b[i][j]='';
// 			c[i][j]=0;
// 		}
// 	}

// 	for(i=1;i<l_x+1;i++){
// 		for(j=1;j<l_y+1;j++){
// 			if(x[i-1]===y[i-1]){
// 				c[i][j]=c[i-1][j-1]+1;
// 				b[i][j]='+';
// 			}
// 			else{
// 				if(c[i-1][j]<=c[i][j-1]){
// 					c[i][j]=c[i][j-1];
// 					b[i][j]='-';
// 				}
// 				else{
// 					c[i][j]=c[i-1][j];
// 					b[i][j]='|';	
// 				}
// 			}
// 		}
// 	}

// 	return {_b:b,_c:c,llcs:c[i-1][j-1]};
// }

// function print_LCS(b,c,x,i,j){
// 	if(b[i][j]==='+'){
// 		print-LCS(b,c,x,i-1,j-1);
// 		console.log(x[i]);
// 	}else if(b[i][j]==='-'){
// 		print-LCS(b,c,x,i,j-1);
// 	}else{
// 		print-LCS(b,c,x,i-1,j);
// 	}
// }

// function print_LCS(ro,x,i,j){
	
// 		if(i==0 || j==0)return;
// 		if(ro._b[i][j]==='+'){
// 			print_LCS(ro,x,i-1,j-1);
// 			console.log(x[i-1]);
// 		}else if(ro._b[i][j]==='-'){
// 			print_LCS(ro,x,i,j-1);
// 		}else{
// 			print_LCS(ro,x,i-1,j);
// 		}
	
// }

//result object to be used outside of the scope of lcsProto
var resultObj={
	_b:new Array(),
	_c:new Array(),
	llcs:''
};

//Object holding the variables and functions to perform LCS operation
var lcsProto={
	x:[],
	
	y:[],
	
	resultObj:{
		_b:'',
		_c:'',
		llcs:'',
		lcs:''
	},
	
	lcs:function(x,y){
		var i,j;
		this.x=x;
		this.y=y;
		var l_x=x.length;
		var l_y=y.length;

		//create two 2D arrays to hold the results
		var b=[], c=[];
		for(i=0;i<l_x+1;i++){
			b[i]=new Array(l_y+1);
			c[i]=new Array(l_y+1);
		}

		//Initialize
		for(i=0;i<l_x+1;i++){
			for(j=0;j<l_y+1;j++){
				b[i][j]='';
				c[i][j]=0;
			}
		}

		for(i=1;i<l_x+1;i++){
			for(j=1;j<l_y+1;j++){
				if(x[i-1]===y[i-1]){
					c[i][j]=c[i-1][j-1]+1;
					b[i][j]='+';
				}
				else{
					if(c[i-1][j]<=c[i][j-1]){
						c[i][j]=c[i][j-1];
						b[i][j]='-';
					}
					else{
						c[i][j]=c[i-1][j];
						b[i][j]='|';	
					}
				}
			}
		}

		this.resultObj._b=b;
		this.resultObj._c=c;
		this.resultObj.llcs=c[i-1][j-1];

		return {_b:b,_c:c,llcs:c[i-1][j-1]};
	},
	print_LCS:function(i,j){
		if(i==0 || j==0)return;
		var ro=this.resultObj;
		if(ro._b[i][j]==='+'){
			this.print_LCS(i-1,j-1);
			console.log(this.x[i-1]);
			this.resultObj.lcs+=this.x[i-1];
		}else if(ro._b[i][j]==='-'){
			this.print_LCS(i,j-1);
		}else{
			this.print_LCS(i-1,j);
		}
	}
};

//global objects
var lcsObj=Object.create(lcsProto);
var resultObj1 = Object.create(resultObj);

//accessing DOM and event listener

var form=document.getElementById("form1");
if(form){
	form.addEventListener('submit',function(event){
		event.preventDefault();
		var str1=document.getElementById('str1').value;
		var str2=document.getElementById('str2').value;

		resultObj1 = lcsObj.lcs(str1,str2);

		console.log("Length of LCS: "+resultObj1.llcs);

		lcsObj.resultObj.lcs='';
		lcsObj.print_LCS(str1.length,str2.length);

		var resultllcs=document.getElementById("resultllcs");
		var resultlcs=document.getElementById("resultlcs");
		if(!resultllcs){
			resultllcs=document.createElement("p");
			resultllcs.id="resultllcs";
		}
		if(!resultlcs){
			resultlcs=document.createElement("p");
			resultlcs.id="resultlcs";
		}
		resultllcs.innerHTML=resultObj1.llcs;
		resultlcs.innerHTML=lcsObj.resultObj.lcs;
		document.body.appendChild(resultllcs);
		document.body.appendChild(resultlcs);
	});
}

