export async function getAIInsights(summary:unknown,question=''){
 const response=await fetch('/api/analyze',{method:'POST',headers:{'content-type':'application/json'},signal:AbortSignal.timeout(30000),body:JSON.stringify({summary:JSON.stringify(summary),question})});
 const data=await response.json();if(!response.ok)throw Error(data.error||'Não foi possível consultar o serviço.');
 if(typeof data.result!=='string')throw Error('Resposta inválida do serviço.');return data.result as string;
}
