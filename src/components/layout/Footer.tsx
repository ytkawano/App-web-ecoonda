import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import Link from 'next/link';

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-accent"
  >
    {children}
  </a>
);

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Cosméticos sustentáveis e veganos inspirados no oceano.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </SocialIcon>
              <SocialIcon href="#">
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                </svg>
              </SocialIcon>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Navegue</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-accent">
                  Loja
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent">
                  Sobre Nós
                </Link>
              </li>
               <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-accent">
                  Sustentabilidade
                </Link>
              </li>
            </ul>
          </div>
           <div className="space-y-4">
            <h4 className="font-headline font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Junte-se à Nossa Comunidade</h4>
            <p className="text-sm text-muted-foreground">
              Receba dicas, novidades e ofertas especiais.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Seu e-mail" className="bg-background" />
              <Button type="submit" size="icon" className="wave-hover">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ECOONDA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
