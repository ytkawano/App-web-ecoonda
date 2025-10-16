'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Política de Privacidade da ECOONDA
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Última atualização: 14 de outubro de 2025
        </p>
      </header>

      <div className="prose prose-lg mx-auto max-w-none text-foreground">
        <p>
            A ECOONDA ("nós", "nosso" ou "Empresa"), uma microempresa dedicada à distribuição de cosméticos veganos, naturais e ecológicos via aplicativo móvel, valoriza a privacidade e a proteção dos dados pessoais de seus usuários ("você" ou "usuário"). Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) e outras regulamentações aplicáveis no Brasil.
        </p>
        <p>
            Ao utilizar nosso aplicativo móvel (disponível para iOS e Android), você concorda com as práticas descritas nesta política. Se não concordar, por favor, não utilize o app.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">1. Dados que Coletamos</h2>
        <p>
            Coletamos dados pessoais necessários para fornecer nossos serviços, incluindo:
        </p>
        <ul>
            <li><strong>Dados de Identificação e Contato:</strong> Nome, e-mail, número de telefone, data de nascimento e endereço, fornecidos durante o registro de conta, compras ou contatos conosco.</li>
            <li><strong>Dados de Pagamento:</strong> Informações de cartão de crédito/débito, dados bancários ou de plataformas de pagamento (ex.: Pix, boleto), processados por terceiros seguros.</li>
            <li><strong>Dados de Uso do App:</strong> Informações sobre interações no app, como produtos visualizados, carrinho de compras, histórico de pedidos, preferências de produtos veganos e sustentáveis, e dados de navegação (IP, tipo de dispositivo, versão do SO - iOS ou Android).</li>
            <li><strong>Dados de Logística Reversa:</strong> Informações sobre devoluções de embalagens, como endereços de coleta e pontos acumulados no sistema de fidelidade.</li>
            <li><strong>Dados Sensíveis:</strong> Não coletamos dados sensíveis (ex.: origem racial, dados de saúde) a menos que explicitamente consentido para fins específicos, como preferências veganas.</li>
        </ul>
        <p>
            Dados não pessoais, como estatísticas agregadas de uso, podem ser coletados para melhorar o app.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">2. Como Coletamos os Dados</h2>
        <p>
            Coletamos dados de três formas principais:
        </p>
        <ul>
            <li><strong>Diretamente de Você:</strong> Ao criar uma conta, fazer compras, participar de promoções ou retornar embalagens via app.</li>
            <li><strong>Automaticamente:</strong> Através de tecnologias como cookies, logs de servidor e ferramentas de análise (ex.: Google Analytics para apps móveis), que rastreiam uso para otimizar a experiência em iOS e Android.</li>
            <li><strong>De Terceiros:</strong> De parceiros de pagamento (ex.: PagSeguro, Mercado Pago) ou fornecedores de logística, sempre com seu consentimento.</li>
        </ul>
        
        <h2 className="font-headline text-2xl text-primary">3. Finalidades do Tratamento de Dados</h2>
        <p>
            Usamos seus dados para:
        </p>
        <ul>
            <li>Processar e entregar pedidos de cosméticos veganos e naturais.</li>
            <li>Gerenciar contas de usuário, incluindo login seguro (com criptografia de senhas, conforme critérios de segurança do projeto).</li>
            <li>Enviar comunicações educativas sobre sustentabilidade (ODS 14 - Vida na Água), promoções e atualizações via e-mail ou push notifications.</li>
            <li>Calcular impactos ambientais no app (ex.: plástico evitado nos oceanos) e gerenciar o sistema de pontos/fidelidade.</li>
            <li>Melhorar o app, prevenindo fraudes e analisando tendências de uso.</li>
            <li>Cumprir obrigações legais, como relatórios fiscais ou respostas a autoridades.</li>
        </ul>
        <p>
            Não usamos dados para fins não compatíveis sem seu consentimento.
        </p>

        <h2 className="font-headline text-2xl text-primary">4. Compartilhamento de Dados</h2>
        <p>
            Compartilhamos dados apenas quando necessário:
        </p>
        <ul>
            <li>Com fornecedores de cosméticos (ex.: Bio Terra, Simple Organic) para processamento de pedidos.</li>
            <li>Com parceiros de logística e reciclagem para sistema de troca de embalagens.</li>
            <li>Com processadores de pagamento para transações seguras.</li>
            <li>Com autoridades competentes, se exigido por lei (ex.: ANPD - Autoridade Nacional de Proteção de Dados).</li>
        </ul>
        <p>
            Não vendemos ou alugamos dados a terceiros para marketing sem consentimento explícito.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">5. Seus Direitos como Titular de Dados (LGPD)</h2>
        <p>
            Você tem direitos sob a LGPD, incluindo:
        </p>
        <ul>
            <li>Acesso aos seus dados.</li>
            <li>Correção de dados inexatos.</li>
            <li>Exclusão de dados (exceto quando retidos por lei).</li>
            <li>Oposição ao tratamento.</li>
            <li>Portabilidade de dados.</li>
            <li>Revogação de consentimento.</li>
        </ul>
        <p>
            Para exercer esses direitos, contate-nos em [e-mail de contato, ex.: privacidade@ecoonnda.com.br]. Responderemos em até 15 dias.
        </p>

        <h2 className="font-headline text-2xl text-primary">6. Segurança dos Dados</h2>
        <p>
            Implementamos medidas de segurança, como:
        </p>
        <ul>
            <li>Criptografia de senhas e dados sensíveis.</li>
            <li>Proteção contra injeção SQL e ataques de força bruta (conforme regras de desenvolvimento mobile do projeto).</li>
            <li>Armazenamento em servidores seguros no Brasil.</li>
            <li>Atualizações regulares do app para iOS e Android.</li>
        </ul>
        <p>
            Apesar disso, nenhum sistema é 100% seguro; notificaremos você em caso de incidentes.
        </p>

        <h2 className="font-headline text-2xl text-primary">7. Retenção de Dados</h2>
        <p>
            Retemos dados pelo tempo necessário para as finalidades (ex.: 5 anos para fins fiscais) ou até você solicitar exclusão.
        </p>

        <h2 className="font-headline text-2xl text-primary">8. Crianças e Adolescentes</h2>
        <p>
            O app não é direcionado a menores de 18 anos. Não coletamos dados de crianças intencionalmente.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">9. Transferências Internacionais</h2>
        <p>
            Dados podem ser transferidos para fora do Brasil apenas com garantias adequadas (ex.: cláusulas contratuais padrão).
        </p>

        <h2 className="font-headline text-2xl text-primary">10. Alterações nesta Política</h2>
        <p>
            Podemos atualizar esta política. Notificaremos via app ou e-mail. O uso contínuo implica aceitação.
        </p>
        <p>
            Para dúvidas, contate: [endereço da empresa, ex.: São Paulo, SP] ou [e-mail].
        </p>
      </div>
    </div>
  );
}
