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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-2.7 1.1-5.4 1.4-8.1 1.4H9V4h5.5a3.5 3.5 0 0 1 3.5 3.5c0 1.2-.6 2.3-1.5 3-1 .6-2.2.9-3.5.9H9v6h5.5c4.1 0 7.5-3.4 7.5-7.5S22 4 22 4z"></path>
                </svg>
              </SocialIcon>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Compre</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Cuidado Facial
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Corpo e Pele
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Cuidado Capilar
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Sobre</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent">
                  Sustentabilidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-accent">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-headline font-semibold">Junte-se à Nossa Comunidade</h4>
            <p className="text-sm text-muted-foreground">
              Receba dicas ecológicas, alertas de novos produtos e ofertas especiais.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="bg-background" />
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
