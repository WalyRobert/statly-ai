# Statly AI

Estatística descritiva local, histograma e correlação de Pearson, com interpretação Gemini opcional. Autor: Waly Robert. Edição de portfólio derivada do projeto no Google AI Studio, com parser, convenções e casos-limite corrigidos.

## Executar

Node.js 22.16 ou superior.

```bash
npm ci
npm run dev
```

Use “Exemplo sintético” e “Calcular”. Os cálculos funcionam sem chave. Para interpretação opcional, copie `.env.example` para `.env`, configure `GEMINI_API_KEY` no servidor e execute `npm run server` em outro terminal. Não coloque chaves no frontend. O Vite encaminha `/api` para a porta 3001.

Produção local: `npm run build` e `npm start`, endereço `http://127.0.0.1:3001`. O servidor usa loopback, valida origem, limita o corpo, mantém uma consulta simultânea e aplica timeout. Não é serviço multiusuário pronto para exposição pública; autenticação, quotas e implantação ficam a cargo de uma etapa posterior.

## Entrada e convenções

- Escolha decimal vírgula ou ponto explicitamente. No modo vírgula, use espaço, nova linha ou ponto e vírgula entre valores; no modo ponto, a vírgula também separa valores. Sem separador de milhar. Tokens inválidos geram erro, não são silenciosamente descartados.
- Até 10000 valores manuais, módulo máximo 1e100. CSV/XLSX: primeira aba, cabeçalho obrigatório, 1 MB, 1000 linhas e 30 colunas; selecione uma coluna. Células vazias são omitidas. Ajuste a convenção decimal após importar. Não há importação DOC/DOCX ou XLS legado nesta edição.
- Pares para correlação devem ser explícitos: uma linha `x;y` por observação. X e Y recebem estatísticas separadas; não misturamos todas as colunas numa única lista.
- Variância populacional (n) por padrão; amostral (n−1) opcional, indefinida para n=1. Quartis com interpolação linear R7, h=(n−1)p. Cercas de Tukey Q1−1,5 IQR e Q3+1,5 IQR.
- CV só aparece se a média for positiva, não houver valores negativos e o desvio for definido. Mesmo assim sua interpretação exige escala de razão. Pearson é indefinido em coluna constante; não retorna zero artificial.
- Histograma usa ceil(sqrt(n)), até 20 classes. O último intervalo inclui o máximo; valores constantes geram uma classe. Moda é amodal quando nenhum valor repete; empates repetidos são multimodais.

## IA e dados

Somente ao clicar em “Consultar interpretação”, o resumo numérico e a pergunta são enviados ao Gemini pelo servidor. Os valores brutos não são enviados por esse fluxo. Resumos e perguntas também podem ser sensíveis: use dados sintéticos/autorizados. A IA não recalcula os resultados e pode errar; não infere causalidade ou significância apenas das medidas exibidas. Sem chave o servidor retorna configuração pendente, nunca um insight simulado.

## Verificação e limites

```bash
npm test
npm run test:server
npm run build
```

Testes cobrem decimais brasileiros, quartis, variância, CV indefinido, histograma, pares, interface e proxy Gemini com respostas simuladas. Nenhuma chamada paga é necessária nos testes. O CI repete testes e build. XLSX pode expandir em memória além do tamanho compactado; evite arquivos não confiáveis.

Protótipo educacional: sem testes de hipótese, inferência causal, certificação estatística ou relatórios DOCX/PDF. A interface foi adaptada para esta edição; o projeto do Studio não é sobrescrito. Licença de redistribuição ainda não definida pelo autor; dependências mantêm suas licenças.


## Início e diagnóstico simplificados

Após `npm ci`, execute `npm run diagnostico` para verificar Node, dependências, build e presença de configuração sem revelar chaves ou consumir cota. Execute `npm run iniciar` para compilar a versão atual e abrir o servidor local em um único terminal. A faixa de estado da interface distingue configuração ausente e integração ainda não comprovada. Encontrar uma chave não confirma que ela é válida nem que existe cota gratuita. Nenhum teste de geração é iniciado automaticamente.
