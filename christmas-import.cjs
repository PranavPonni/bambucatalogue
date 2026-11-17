const fs=require('fs');
const cp=require('child_process');
const rows=[
['20.55.23','Cozy Snowman','Ladul',1066,932,80,150,10,10,17],
['20.56.18','Winter Scene – 3D Christmas Decoration','3DArtisan',1052,914,80,150,17,7,10],
['20.55.13','Scandinavian Christmas Tree Light – Modern','Konfettiracker',1034,916,45,90,9,9,17,3471303],
['20.56.22','Winter Watermill','3D Drucker',1050,908,150,280,17,17,17],
['20.55.33','Christmas Tree LED Tealight Holders – 4 Designs','Vaporone',1066,920,45,90,9,9,16],
['20.54.41','Magic Castle for LED Kit','3D Drucker',1046,918,160,300,17,17,17],
['20.55.39','Christmas Village Ornament – Winter Wonderland','Styllusak',1046,916,20,45,10,2,12],
['20.56.37','Reindeer & Sleigh Christmas Catchall Bowl','TheHexArtist',1052,914,90,170,17,9,15],
['20.54.47','Christmas Tree Ball with Train and Mountains','Old Fart Network',1062,922,35,70,10,5,12,3499653],
['20.56.28','Custom Personalized Christmas Baubles with Names','PCnno81',1054,912,10,25,10,0.6,11],
['20.55.45','Christmas Bauble Angel','Lukas',1038,910,35,70,10,7,12],
['20.56.12','Lighted Nativity Arch','littleprintlove',1058,904,50,100,17,4,11],
['20.54.53','Winter Lighthouse LED Winter Landscape','3D Drucker',1066,910,130,250,16,16,17],
['20.56.00','Christmas Village Light Arch with Gnomes','littleprintlove',1036,908,50,100,17,4,11],
['20.55.54','Christmas Tree for Bambu Lab LED Kit','3D Drucker',1036,902,65,130,10,10,17],
['20.56.42','Christmas Tree Minimalistic Decor No Supports','NowCraft3D',1062,914,40,85,9,9,17],
['20.54.34','Magical Winter House with LED Lighting','3D Drucker',1048,924,120,230,14,14,17],
['20.54.25','Nordic Deer Candle Holder — Christmas Centerpiece','MYSH Studio',1044,930,70,140,17,6,11],
['20.57.06','Customizable Christmas Ornaments','3dplux',1054,914,10,25,10,0.5,11]
];
const products=JSON.parse(fs.readFileSync('catalogue-data.json','utf8'));
for(const [i,r] of rows.entries()){
 const [time,name,creator,w,h,lo,hi,...rest]=r, dims=rest.slice(0,3),model=rest[3];
 const id='P'+String(76+i).padStart(3,'0'),image=`assets/christmas-${76+i}.jpg`;
 cp.execFileSync('sips',['-s','format','jpeg',`/Users/pranavponnivalavan/Desktop/Screenshot 2026-11-17 at ${time}.png`,'--out',image]);
 const p={id,name,creator,category:'Christmas',weightEstimate:[lo,hi],proposedDimensionsCm:dims,description:'Estimate is for one design. Lighting and accessories are extra. LED lights only for illuminated designs.',image,originalImage:image,imageWidth:w,imageHeight:h,imageCrop:{x:145,y:165,width:w-175,height:h-185},verifiedWeightGrams:null,verifiedDimensionsMm:null,sourceUrl:model?`https://makerworld.com/en/models/${model}`:null,searchUrl:'https://makerworld.com/en/search/models?keyword='+encodeURIComponent(name+' '+creator),verificationStatus:'Planning estimate; model profile and dimensions awaiting verification',priceEstimateYen:[Math.ceil(lo*3.4*1.5),Math.ceil(hi*3.4*1.5)]};
 if(i===1||i===11||i===13||i===18)p.imageCrop={x:30,y:150,width:w-55,height:h-165};
 if(i===2)p.imageCrop={x:242,y:150,width:564,height:753};
 if(i===16)p.imageCrop={x:310,y:190,width:440,height:670};
 products.push(p);
 const vals=[id,name,creator,'Christmas',lo,hi,dims.join(' x '),...p.priceEstimateYen,'','',p.verificationStatus,p.sourceUrl||'',p.searchUrl,image];
 fs.appendFileSync('specifications.csv',vals.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')+'\n');
}
fs.writeFileSync('catalogue-data.json',JSON.stringify(products,null,2)+'\n');
fs.writeFileSync('products.js','window.CATALOGUE_PRODUCTS = '+JSON.stringify(products,null,2)+';\n');
