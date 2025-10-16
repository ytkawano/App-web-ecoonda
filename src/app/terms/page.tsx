'use client';

import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Termos de Serviço da ECOONDA
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Última atualização: 14 de outubro de 2025
        </p>
      </header>

      <div className="prose prose-lg mx-auto max-w-none text-foreground">
        <p>
          Bem-vindo à ECOONDA ("nós", "nosso" ou "Empresa")! Estes Termos de Serviço ("Termos") regem o uso do nosso aplicativo móvel para iOS e Android, que oferece distribuição de cosméticos veganos, naturais e ecológicos, alinhados ao ODS 14 da ONU. Ao baixar, instalar ou usar o app, você concorda com estes Termos. Se não concordar, não use o app.
        </p>
        
        <h2 className="font-headline text-2xl text-primary">1. Elegibilidade</h2>
        <p>
          Você deve ter pelo menos 18 anos para usar o app. Ao se registrar, você garante que fornece informações verdadeiras.
        </p>

        <h2 className="font-headline text-2xl text-primary">2. Registro e Conta</h2>
        <ul>
            <li>Crie uma conta com e-mail e senha segura.</li>
            <li>Você é responsável por manter a confidencialidade da conta e notificar-nos de usos não autorizados.</li>
            <li>Podemos suspender ou encerrar contas por violação destes Termos.</li>
        </ul>
        
        <h2 className="font-headline text-2xl text-primary">3. Compras e Pagamentos</h2>
        <ul>
            <li><strong>Produtos:</strong> Oferecemos cosméticos veganos (ex.: shampoos em barra, hidratantes sólidos) de marcas parceiras.</li>
            <li><strong>Preços:</strong> Em Reais (R$), sujeitos a alterações. Incluem impostos; frete calculado no checkout.</li>
            <li><strong>Pagamento:</strong> Aceitamos cartões, Pix, boleto via processadores terceiros. Transações são seguras.</li>
            <li><strong>Pedidos:</strong> Confirmados após pagamento. Podemos cancelar por estoque ou erro.</li>
            <li><strong>Sistema de Fidelidade:</strong> Retorne embalagens para pontos/descontos (ex.: 3 embalagens = 10% off). Pontos não transferíveis.</li>
        </ul>

        <h2 className="font-headline text-2xl text-primary">4. Entrega e Logística Reversa</h2>
        <ul>
            <li><strong>Entrega:</strong> Via parceiros (ex.: Correios), com prazos estimados no app.</li>
            <li><strong>Devoluções:</strong> 7 dias para arrependimento (Código de Defesa do Consumidor). Produtos devem estar intactos.</li>
            <li><strong>Logística Reversa:</strong> Envie embalagens vazias via pontos de coleta ou correio (frete grátis via cupom). Encaminhamos para reciclagem.</li>
        </ul>
        
        <h2 className="font-headline text-2xl text-primary">5. Propriedade Intelectual</h2>
        <ul>
            <li>O app, logotipo "ECOONDA" e conteúdos são nossa propriedade ou de licenciados.</li>
            <li>Você recebe licença limitada, não exclusiva, para uso pessoal. Não copie, modifique ou distribua.</li>
        </ul>

        <h2 className="font-headline text-2xl text-primary">6. Conduta do Usuário</h2>
        <ul>
            <li>Não use o app para fins ilegais, fraudulentos ou que violem direitos de terceiros.</li>
            <li>Não interfira no app (ex.: hacks, sobrecarga).</li>
            <li>Conteúdos educativos sobre sustentabilidade são para uso pessoal.</li>
        </ul>
        
        <h2 className="font-headline text-2xl text-primary">7. Limitações de Responsabilidade</h2>
        <ul>
            <li>O app é fornecido "como está". Não garantimos ausência de erros ou disponibilidade ininterrupta.</li>
            <li>Não nos responsabilizamos por danos indiretos, perda de dados ou lucros cessantes.</li>
            <li>Responsabilidade limitada ao valor pago pelo produto.</li>
        </ul>

        <h2 className="font-headline text-2xl text-primary">8. Encerramento</h2>
        <p>
            Podemos encerrar o app ou sua conta a qualquer momento, com notificação.
        </p>

        <h2 className="font-headline text-2xl text-primary">9. Lei Aplicável</h2>
        <p>
            Estes Termos são regidos pelas leis do Brasil. Disputas resolvidas nos tribunais de São Paulo, SP.
        </p>

        <h2 className="font-headline text-2xl text-primary">10. Alterações nos Termos</h2>
        <p>
            Podemos atualizar os Termos. Notificaremos via app. Uso contínuo implica aceitação.
        </p>
      </div>
    </div>
  );
}
