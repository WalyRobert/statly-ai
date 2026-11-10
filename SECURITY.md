# Segurança

Não inclua `.env`, chaves, planilhas privadas ou exemplos pessoais no repositório. O processamento estatístico é local; a interpretação opcional transmite resumo e pergunta ao provedor pelo servidor.

O servidor de demonstração escuta em loopback. Antes de torná-lo público, implemente autenticação, quotas e controle de custos. Não use a saída de IA como decisão profissional validada. Relate falhas com dados sintéticos e sem segredos em issues públicas.


A chave pessoal da interface é mantida apenas em memória da aba, sem armazenamento persistente pelo aplicativo. É encaminhada em header ao servidor local e ao provedor escolhido, sem entrar no prompt, URL ou logs. A operação de apagar não desfaz solicitações já enviadas. Não registre headers de autenticação no proxy. As opções de provedor usam destinos fixos; não há fallback para outra chave ou serviço no fluxo da interface.

