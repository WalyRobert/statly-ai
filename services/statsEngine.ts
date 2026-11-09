export type DecimalMode='comma'|'dot';
export function parseNumber(token:string,mode:DecimalMode){
 const text=token.trim();const normalized=mode==='comma'?text.replace(',','.'):text;
 if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized)||(mode==='comma'&&text.includes('.')))throw Error(`Valor inválido: ${text.slice(0,30)}. Confira o separador decimal.`);
 const value=Number(normalized);if(!Number.isFinite(value)||Math.abs(value)>1e100)throw Error('Use números finitos com módulo até 1e100.');return value;
}
export function parseValues(input:string,mode:DecimalMode='comma'){
 if(input.length>300000)throw Error('Texto maior que 300 mil caracteres.');
 const tokens=input.trim().split(mode==='comma'?/[\s;]+/:/[\s,;]+/).filter(Boolean);
 if(!tokens.length||tokens.length>10000)throw Error('Informe de 1 a 10000 valores.');
 return tokens.map(t=>parseNumber(t,mode));
}
export function quantile(sorted:number[],p:number){const h=(sorted.length-1)*p,i=Math.floor(h);return sorted[i]+(sorted[Math.min(i+1,sorted.length-1)]-sorted[i])*(h-i);}
export function describe(values:number[],sample=false){
 if(!values.length||values.length>10000||values.some(v=>!Number.isFinite(v)||Math.abs(v)>1e100))throw Error('Conjunto numérico inválido.');
 const sorted=[...values].sort((a,b)=>a-b),n=values.length,mean=values.reduce((s,v)=>s+v/n,0),q1=quantile(sorted,.25),q3=quantile(sorted,.75),iqr=q3-q1;
 const variance=sample&&n<2?null:values.reduce((s,v)=>s+(v-mean)**2/(sample?n-1:n),0),stdDev=variance===null?null:Math.sqrt(variance);
 const cv=mean>0&&values.every(v=>v>=0)&&stdDev!==null?stdDev/mean*100:null;
 const frequency=new Map<number,number>();values.forEach(v=>frequency.set(v,(frequency.get(v)??0)+1));const maxFreq=Math.max(...frequency.values());const modes=maxFreq===1?[]:[...frequency].filter(([,f])=>f===maxFreq).map(([v])=>v).sort((a,b)=>a-b);
 const min=sorted[0],max=sorted[n-1],lowerBound=q1-1.5*iqr,upperBound=q3+1.5*iqr,outliers=values.filter(v=>v<lowerBound||v>upperBound);
 const bins=min===max?1:Math.min(20,Math.ceil(Math.sqrt(n))),width=min===max?1:(max-min)/bins;
 const histogram=Array.from({length:bins},(_,i)=>({start:min+i*width,end:min===max?max:min+(i+1)*width,count:0}));
 values.forEach(v=>histogram[Math.min(bins-1,Math.max(0,Math.floor((v-min)/width)))].count++);
 return {n,mean,median:quantile(sorted,.5),modes,variance,stdDev,cv,min,max,q1,q3,iqr,lowerBound,upperBound,outliers,histogram,sample};
}
export function parsePairs(input:string,mode:DecimalMode){
 const lines=input.trim().split(/\r?\n/).filter(l=>l.trim());if(lines.length<2||lines.length>10000)throw Error('Use de 2 a 10000 linhas com pares x;y.');
 return lines.map(line=>{const pair=line.split(';');if(pair.length!==2)throw Error('Cada linha de pares deve ter exatamente x;y.');return pair.map(v=>parseNumber(v,mode)) as [number,number];});
}
export function pearson(pairs:[number,number][]){
 if(pairs.length<2||pairs.some(p=>p.some(v=>!Number.isFinite(v))))return null;
 const sx=Math.max(...pairs.map(p=>Math.abs(p[0])))||1,sy=Math.max(...pairs.map(p=>Math.abs(p[1])))||1;
 const scaled=pairs.map(p=>[p[0]/sx,p[1]/sy]),mx=scaled.reduce((s,p)=>s+p[0]/pairs.length,0),my=scaled.reduce((s,p)=>s+p[1]/pairs.length,0);
 const vx=scaled.reduce((s,p)=>s+(p[0]-mx)**2,0),vy=scaled.reduce((s,p)=>s+(p[1]-my)**2,0);
 if(vx===0||vy===0)return null;
 return Math.max(-1,Math.min(1,scaled.reduce((s,p)=>s+(p[0]-mx)*(p[1]-my),0)/Math.sqrt(vx*vy)));
}
export const calculateStats=(input:string,mode:DecimalMode='comma',sample=false)=>describe(parseValues(input,mode),sample);
