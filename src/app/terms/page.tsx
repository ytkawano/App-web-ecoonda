'use client';

import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Termos de Serviço
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Última atualização: 16 de outubro de 2023
        </p>
      </header>

      <div className="prose prose-lg mx-auto max-w-none text-foreground">
        <p>
          Ao acessar o site ECOONDA, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">1. Uso de Licença</h2>
        <p>
          É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site ECOONDA, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">2. Isenção de Responsabilidade</h2>
        <p>
          Os materiais no site da ECOONDA são fornecidos 'como estão'. A ECOONDA не oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">3. Limitações</h2>
        <p>
          Em nenhum caso o ECOONDA ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em ECOONDA.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">4. Modificações</h2>
        <p>
          O ECOONDA pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
        </p>

        <h2 className="font-headline text-2xl text-primary">5. Lei aplicável</h2>
        <p>
          Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
        </p>
      </div>
    </div>
  );
}
