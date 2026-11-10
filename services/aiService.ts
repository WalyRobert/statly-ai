import {analyzeText,type AISettings} from './aiClient';
export async function getAIInsights(summary:unknown,question:string,settings:AISettings,signal?:AbortSignal){return analyzeText({summary:JSON.stringify(summary),question},settings,signal);}

