export const PROVIDER_LIST=Object.freeze([
 {id:'gemini',name:'Google Gemini',defaultModel:'gemini-2.5-flash',keyEnv:'GEMINI_API_KEY',modelEnv:'GEMINI_MODEL'},
 {id:'deepseek',name:'DeepSeek',defaultModel:'deepseek-flash',keyEnv:'DEEPSEEK_API_KEY',modelEnv:'DEEPSEEK_MODEL'},
 {id:'openai',name:'OpenAI',defaultModel:'gpt-4.1-mini',keyEnv:'OPENAI_API_KEY',modelEnv:'OPENAI_MODEL'},
]);
export const validModel=model=>typeof model==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,99}$/.test(model);
export function findProvider(id){const provider=PROVIDER_LIST.find(p=>p.id===id);if(!provider)throw Error('Provedor de texto não suportado.');return provider;}
