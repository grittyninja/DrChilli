// Array 4D
var Map = 	[
				null,
				["H1",
					[["Q1",0.34],["Q3",0.28],["Q4",0.21],["Q2",0.17]]],
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
					[["Q20",0.45],["Q4",0.34],["Q10",0.18]]]
		]
// Array 4D
var Pivot = Map
function getMinQ(arrQ){
	temp = []
	for(i=1;i<Pivot.length;i+=1){
		for(j=0;j<Pivot[i][1].length;j+=1){
			console.log(Pivot[i][1][j][0])
		}
	}
	return temp
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
function getQ(arrQ){
	if(arrQ[0] in Rule){
		temp = arrQ[0]
		arrQ.shift()
		return temp
	}
	else{
		arrTemp = getArrMin(arrQ)
	}
}
function isTrue(Q){
	if(Q in Rule){
		Con = Rule[Q]
		arrQ = null
		arrH = Con
		return null
	}
	else{
		if(arrH == "start"){
			arrH = getH(Q)
		}
		else{

		}

	}
}
// Get H which have relation to Q
function getH(Q){
	Dep = []
	arrTemp = []
	for(i=1;i<=8;i+=1){
		arrTemp = Map[i][1]
		if(arrTemp.indexOf(Q)!=-1){
			Dep.push(Map[i][0])
		}
	}
	return Dep
}

// Get H Which Dependent to Q
function getHD(Q){
	H = []
	for(i=1;i<=8;i+=1){
		if(Map[i][1][0]==Q){
			H.push(Map[i][0])
		}
	}
	return H
}

// Get Q Which Dependent to H
function getQD(H){
	Q = []
	for(i=1;i<=8;i+=1){
		if(Map[i][0]==H){
			Q = Map[i][1]
		}
	}
	return Q
}

// Remove Subarray in array
function rmArr(base, sub){
	for(i=0;i<sub.length;i+=1){
		m = base.indexOf(sub[i])
		if (m > -1) {
    		base.splice(m, 1)
		}
	}
	return base
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
