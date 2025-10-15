'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Última atualização: 16 de outubro de 2023
        </p>
      </header>

      <div className="prose prose-lg mx-auto max-w-none text-foreground">
        <p>
          A sua privacidade é importante para nós. É política da ECOONDA respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site ECOONDA, e outros sites que possuímos e operamos.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">1. Informações que coletamos</h2>
        <p>
          Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">2. Como usamos as suas informações</h2>
        <p>
          Usamos as informações que coletamos para operar e manter nosso site, fornecer os produtos que você solicita, processar suas transações e nos comunicar com você. Também usamos essas informações para personalizar sua experiência e para fins de análise interna.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">3. Segurança</h2>
        <p>
          A segurança dos seus dados é importante para nós. Usamos meios comercialmente aceitáveis para proteger suas informações pessoais, mas lembre-se que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">4. Links para outros sites</h2>
        <p>
          O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
        </p>

        <h2 className="font-headline text-2xl text-primary">5. Alterações nesta política</h2>
        <p>
          Podemos atualizar nossa política de privacidade de tempos em tempos. Aconselhamos que você revise esta página periodicamente para quaisquer alterações.
        </p>

         <h2 className="font-headline text-2xl text-primary">Entre em Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
        </p>
      </div>
    </div>
  );
}
