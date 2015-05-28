var Map = 	[
				null,
				["H1",
					[["Q3",0.28],["Q4",0.21],["Q2",0.17]]],
				["H2",
					[["Q6",0.42],["Q5",0.33],["Q7",0.17],["Q8",0.08]]],
				["H3",
					[["Q3",0.36],["Q9",0.29],["Q7",0.21],["Q8",0.14]]],
				["H4",
					[["Q3",0.45],["Q2",0.18],["Q10",0.18],["Q11",0.18]]],
				["H5",
					[["Q8",0.42],["Q9",0.25],["Q11",0.17],["Q12",0.17]]],
				["H6",
					[["Q8",0.36],["Q7",0.29],["Q5",0.21],["Q12",0.14]]],
				["H7",
					[["Q5",0.56],["Q6",0.44]]],
				["H8",
					[["Q4",0.34],["Q10",0.18]]]
		]

var Pivot = Map
function rmPivotQ(Q){
	for(i=1;i<Pivot.length;i+=1){
		temp = Pivot[i][1]
		for(j=0;j<temp.length;j+=1){
			if(Q==Pivot[i][1][j][0]){
				if(j==0){ 
					Pivot[i][1].shift()
				}
				else{
					for(l=0;l<Pivot[i][1].length;l+=1){
						if(temp[l][0]==Q){
							Pivot[i][1].splice(l, 1)
						}
					}
					
				}
			}
		}
	}
}
function getMinQ(arrQ){
	temp = []
	for(i=1;i<Pivot.length;i+=1){
		for(j=0;j<Pivot[i][1].length;j+=1){
			temp.push(Pivot[i][1][j][0])
		}
	}
	var counts = {};
	temp.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
	arrQOnly = {}
	for(i=0;i<arrQ.length;i+=1){
		arrQOnly[arrQ[i]] = counts[arrQ[i]]
	}
	min = 99
	Object.keys(arrQOnly).forEach(function(key) {
   		if(arrQOnly[key]<min)min=arrQOnly[key]
	});
	minQ = []
	Object.keys(arrQOnly).forEach(function(key) {
   		if(arrQOnly[key]==min)minQ.push(key)
	});
	return minQ
}
var Con = null
var arrH = "start"
var arrQ = ["Q20","Q19","Q18","Q17","Q16","Q15","Q14","Q13","Q1","Q12","Q11","Q10","Q9","Q8","Q7","Q6","Q5","Q4","Q3","Q2"]
var Rule = 	{	
				Q1  : "H1",
				Q13 : "H9",
				Q14 : "H5",
				Q15 : "H5",
				Q16 : "H7",
				Q17 : "H7",
				Q18 : "H8",
				Q19 : "H10",
				Q20 : "H8"
		}
var Wt = 	{
				H1 : 0,
				H2 : 0,
				H3 : 0,
				H4 : 0,
				H5 : 0,
				H6 : 0,
				H7 : 0,
				H8 : 0,
				H9 : 0,
				H10 : 0
}
// IF Q == NULL -> Conclusion
// IF H.length == 1 -> Conclusion
function getQ(){
	temp = null
	if(arrQ[0] in Rule){
		temp = arrQ[0]
		return temp
	}
	else{
		arrTemp = getMinQ(arrQ)
		if(arrTemp.length>1){
			temp = checkEigen(arrTemp) // IF length target > 1
		}
		else{
			temp = arrTemp
		}
		return temp.toString()
	}
}

function rmArrQ(Q){
	if(Q==arrQ[0])arrQ.shift()
	else{
		index = arrQ.indexOf(Q)
		arrQ.splice(index, 1)
	}
	rmPivotQ(Q)
	
}

function inferensi(){
	if(arrH.length==1){
		console.log(arrH)
	}
	else if(arrQ.length==0){
		arrH = getHWmax()
		console.log(arrH)
	}

}

function getHWmax(){
	maks = []
	ans_ = null
	Object.keys(Wt).forEach(function(key) {
		maks.push(Wt[key])
	});
	maxx  = Math.max.apply(Math, maks);
	Object.keys(Wt).forEach(function(key) {
		if(Wt[key]==maxx)ans_ = key
	});
	return ans_
}
function checkEigen(Q){
	temp = []
	for(h=0;h<Q.length;h+=1){
		temp.push(0)
		for(i=1;i<Pivot.length;i+=1){
			for(j=0;j<Pivot[i][1].length;j+=1){
				if(Pivot[i][1][j][0]==Q[h]){
					temp[temp.length-1]+=Pivot[i][1][j][1]
				}
			}
		}
	}
	maxz  = Math.max.apply(Math, temp);
	index = temp.indexOf(maxz)
	return Q[index]
}
function weight(H_,Q_){
	for(il=0;il<H_.length;il+=1){
		Wt[H_[il]] += getEigen(H_[il],Q_)
	}
}

function getEigen(_H,_Q){
	eigen = 0
	for(i=1;i<Pivot.length;i+=1){
		if(_H==Pivot[i][0]){
			for(j=0;j<Pivot[i][1].length;j+=1){
				if(_Q==Pivot[i][1][j][0]){
					return Pivot[i][1][j][1]
				}
			}
		}
	}
}
function isTrue(Q__){
	if(Q__ in Rule){
		Con = Rule[Q__]
		arrQ = []
		arrH = [Con]
		return null
	}
	else{
		if(arrH == "start"){
			arrH = getH(Q__)
			weight(arrH,Q__)
			unQ = difference(arrQ,getTargetQ(arrH))
			unlinkQ(unQ)
			arrQ = getTargetQ(arrH)
		}
		else{
			arrTemp = getH(Q__)
			arrTemp = isect(arrTemp,arrH)
			weight(arrTemp,Q__)
		}

	}
}

function difference(a1, a2) {
  var result = [];
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result.push(a1[i]);
    }
  }
  return result;
}

function unlinkQ(Qiu){
	for(ko=0;ko<Qiu.length;ko+=1){
		rmPivotQ(Qiu[ko])
	}
}

function getTargetQ(Ha){
	qq = []
	for(bl=0;bl<Ha.length;bl+=1){
		qq = arrUnique(qq,getQD(Ha[bl]))
	}
	return qq
}
// Get H which have relation to Q
function getH(Q){
	Dep = []
	arrTemp = []
	for(i=1;i<Pivot.length;i+=1){
		arrTemp = Pivot[i][1]
		for(j=0;j<arrTemp.length;j+=1){
			if(arrTemp[j][0]==Q){
				Dep.push(Pivot[i][0])
			}
		}
		
	}
	return Dep
}
// Intersection between 2 array
function isect(alpha, beta) {
	var dum = {};
	var res = [];
	for (var i = 0; i < beta.length; i+=1) {
		dum[beta[i]] = true;
	}
	for (var j = 0; j < alpha.length; j+=1) {
		if (dum[alpha[j]])
		res.push(alpha[j]);
	}
	return res;
}
function arrUnique(a,b){
	var c = a.concat(b.filter(function (item) {
    	return a.indexOf(item) < 0;
	}));
	return c
}
function getQD(HH){
	DeP = []
	for(im=1;im<Pivot.length;im+=1){
		if(Pivot[im][0]==HH){
			temp = Pivot[im][1]
			for(jim=0;jim<temp.length;jim+=1){
				DeP.push(temp[jim][0])
			}
		}
	}
	return DeP
}