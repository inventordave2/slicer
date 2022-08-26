const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

var myArgs = process.argv.slice(2)
var img_url = myArgs[0]
var cols = Math.floor(myArgs[1])
var rows = Math.floor(myArgs[2])

var ft = myArgs[3] // Output fileType/Output image format (samesies.) 
if(test(ft))
	ft = ''

var fn = myArgs[4] // fnFormat
if(test(fn))
	fn = ''

var scale = myArgs[5] // scale
if(test(scale))
	scale = 0

var fp = myArgs[6] // file-path (output)
if(test(fp))
	fp = ''

var toDURL = myArgs[7] // toDataURL option
if(test(toDURL) || (toDURL==''))
	toDURL = false

var q = false

var _test = []
if(toDURL) {
	
	if((toDURL.substr(0,4)=="true")||(toDURL.charAt(0)=='1'))	{
		
		_test = toDURL.split(":")
		toDURL = true;
	}
	else	{

		toDURL = false;
	}
}
	
if(_test.length==2)
	if(_test[1]=='q')
		q = true


if(fp.length<1)
	fp = ''

if( (fp.substr(0,2)!="./")&&(fp.charAt(0)!='/')&&(!fp.match(/^[a-zA-Z]\:[//|\\\\]/))&&(fp.charAt(0)!='~') )
	fp = './' + fp

if(fp.charAt(fp.length-1)!='/')
	fp = fp + '/'

if(fn.length<1)
	fn = ''

if(ft.length<3)
	ft = 'png'

if(ft.charAt(0)=='.')
	ft = ft.substr(1)


loadImage(img_url).then((image) =>	{

	var a = 1;
	slice(image, rows, cols, ft, fn, fp, scale, toDURL);
}).catch((msg) => { console.log(`Bruh! Totally failed!: '${msg}'`); })


function slice(img, rows, cols, ft, fn, fp, scale, toDURL)	{
	
	var IW = img.width
	var IH = img.height
	var s_w = Math.floor(IW / cols)
	var s_h = Math.floor(IH / rows)
	
	var OW = IW
	var OH = IH
	
	
	if(scale!=0)	{
		
		OW = s_w * scale
		OH = s_h * scale
	}
	
	var canv = createCanvas(OW, OH)

	for(var l = 0; l < cols; l++)	{
		
		for(var j = 0; j < rows; j++)	{
			
			const ctx = canv.getContext('2d')
			ctx.drawImage(img, s_w * l, s_h * j, s_w, s_h, 0, 0, OW, OH)
			//image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
			
			let format = 'image/' + ft
			
			let ft2;
			if(toDURL)
				ft2 = ".txt"
			else
				ft2 = '.' + ft;
				
			let fn2 = genFN(fn, l, j) || String(l + '_x_' + j)
			
			if( ((fn2.charAt(0)=="'")||(fn2.charAt(0)=="'")) && ((fn2.charAt(fn2.length-1)=="'")||(fn2.charAt(fn2.length-1)=="'")) )	{
				
				fn2 = fn2.substr(1)
				fn2 = fn2.substr(0, fn2.length-1);
			}
			

			
			let fname = fp + fn2 + ft2
			let buffer = undefined
			let dataStr = undefined
			
			if(toDURL==false)
				buffer = canv.toBuffer(format)
			else
				dataStr = canv.toDataURL(format, 1);
			
			if((dataStr)&&(q))
				dataStr = '"' + dataStr + '"'
			
			var data = 0
			if(dataStr)
				data = dataStr
			else
				data = buffer;
			
			
			fs.writeFileSync(fname, data);
		}
	}

	console.log("Images generated in dir: '" + fp + "', " + String(cols*rows) + " images.")
	
	return;
	
	
	function genFN(fn, c, r)	{
		
		if(fn=='')
			return false
		
		let result = fn.replace("{c}", c+1)
		result = result.replace("{r}", r+1)
		
		if(fn==result)
			return false
		
		return result;
	};
}

function test(str)	{
	
	if(str=="false")
		return true
	
	if(str=="0")
		return true
	
	if(str=="undefined")
		return true
	
	if(str=="null")
		return true
	
	if(str=="")
		return true
	
	if(!str)
		return true
	
	return false;
}
