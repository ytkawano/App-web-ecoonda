'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2, QrCode, X, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";

export default function EcoReturn() {
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [isAppQrDialogOpen, setIsAppQrDialogOpen] = useState(false);
  const [scanStep, setScanStep] = useState<'initial' | 'scanning' | 'success'>('initial');
  const { toast } = useToast();
  const [appUrl, setAppUrl] = useState('');

  useEffect(() => {
    if (isReturnDialogOpen) {
      setScanStep('initial');
    }
  }, [isReturnDialogOpen]);

  useEffect(() => {
    // This will run on the client and get the correct URL for the QR code
    setAppUrl(window.location.origin);
  }, []);

  const handleScan = () => {
    setScanStep('scanning');
    setTimeout(() => {
      setScanStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setIsReturnDialogOpen(false);
    if(scanStep === 'success') {
      toast({
        title: 'Devolução Registrada!',
        description: 'Você ganhou 50 Eco Pontos. Obrigado por ajudar o planeta!',
      });
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
        <h3 className="mb-2 font-headline text-2xl font-semibold">Pronto para devolver?</h3>
        <p className="mb-6 text-muted-foreground">
          Escaneie o QR code da sua embalagem para iniciar o processo.
        </p>
        <Button
          size="lg"
          onClick={() => setIsReturnDialogOpen(true)}
          className="wave-animate"
        >
          <QrCode className="mr-2 h-5 w-5" />
          Escanear Embalagem
        </Button>
      </div>

      <div className="mt-8 rounded-lg border bg-card p-8 text-center shadow-sm">
        <h3 className="mb-2 font-headline text-2xl font-semibold">Ver no seu celular</h3>
        <p className="mb-6 text-muted-foreground">
          Escaneie o código abaixo para abrir este aplicativo no seu celular.
        </p>
        <Button
          size="lg"
          onClick={() => setIsAppQrDialogOpen(true)}
          className="wave-animate"
          variant="outline"
        >
          <Smartphone className="mr-2 h-5 w-5" />
          Mostrar QR Code do App
        </Button>
      </div>

      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:max-w-[425px]"
        >
            <button
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Fechar</span>
            </button>
          <DialogHeader>
            <DialogTitle className="font-headline text-center text-2xl">
              Registre Sua Devolução
            </DialogTitle>
            <DialogDescription className="text-center">
              {scanStep === 'initial' && 'Posicione o QR code dentro do quadro.'}
              {scanStep === 'scanning' && 'Escaneando... mantenha firme.'}
              {scanStep === 'success' && 'Escaneamento com sucesso! Sua devolução foi registrada.'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex h-64 items-center justify-center rounded-lg bg-muted/50">
            {scanStep === 'initial' && <QrCode className="h-32 w-32 text-muted-foreground" />}
            {scanStep === 'scanning' && <Loader2 className="h-24 w-24 animate-spin text-accent" />}
            {scanStep === 'success' && <CheckCircle className="h-32 w-32 text-green-500" />}
          </div>

          <DialogFooter>
            {scanStep === 'initial' && (
              <Button onClick={handleScan} className="w-full">
                Simular Escaneamento
              </Button>
            )}
            {scanStep === 'success' && (
              <Button onClick={handleClose} className="w-full">
                Pronto
              </Button>
            )}
             {scanStep === 'scanning' && (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Escaneando...
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAppQrDialogOpen} onOpenChange={setIsAppQrDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-center text-2xl">
              Abra no seu celular
            </DialogTitle>
            <DialogDescription className="text-center">
              Escaneie este código com a câmera do seu celular.
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-64 items-center justify-center rounded-lg bg-white p-4">
            {appUrl ? <QRCode value={appUrl} size={220} /> : <Loader2 className="h-24 w-24 animate-spin text-accent" />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
