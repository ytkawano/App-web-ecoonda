'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, BarChart2, QrCode, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

const dashboardNavLinks = [
  { href: '/dashboard/impact', label: 'Meu Impacto', icon: BarChart2 },
  { href: '/dashboard/challenges', label: 'Desafios Ecológicos', icon: Award },
  { href: '/dashboard/returns', label: 'EcoReturn', icon: QrCode },
];

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return <UserIcon />;
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0][0];
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="text-3xl">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="font-headline text-3xl font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline">Editar Perfil</Button>
      </div>

      <div className="mt-12">
        <Card>
            <CardHeader>
                <CardTitle className='font-headline'>Painel</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {dashboardNavLinks.map(link => (
                        <Link href={link.href} key={link.href} passHref>
                            <Button variant="outline" className="w-full h-24 flex-col gap-2">
                                <link.icon className="h-8 w-8" />
                                <span>{link.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
