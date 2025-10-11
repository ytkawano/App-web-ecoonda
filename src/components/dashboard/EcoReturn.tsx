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
import { CheckCircle, Loader2, QrCode, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EcoReturn() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scanStep, setScanStep] = useState<'initial' | 'scanning' | 'success'>('initial');
  const { toast } = useToast();

  useEffect(() => {
    if (isDialogOpen) {
      setScanStep('initial');
    }
  }, [isDialogOpen]);

  const handleScan = () => {
    setScanStep('scanning');
    setTimeout(() => {
      setScanStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    if(scanStep === 'success') {
      toast({
        title: 'Return Registered!',
        description: 'You\'ve earned 50 Eco Points. Thank you for helping the planet!',
      });
    }
  };

  return (
    <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
      <h3 className="mb-2 font-headline text-2xl font-semibold">Ready to Return?</h3>
      <p className="mb-6 text-muted-foreground">
        Scan the QR code on your packaging to start the process.
      </p>
      <Button
        size="lg"
        onClick={() => setIsDialogOpen(true)}
        className="wave-animate"
      >
        <QrCode className="mr-2 h-5 w-5" />
        Scan Packaging
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <span className="sr-only">Close</span>
            </button>
          <DialogHeader>
            <DialogTitle className="font-headline text-center text-2xl">
              Register Your Return
            </DialogTitle>
            <DialogDescription className="text-center">
              {scanStep === 'initial' && 'Position the QR code within the frame.'}
              {scanStep === 'scanning' && 'Scanning... hold steady.'}
              {scanStep === 'success' && 'Scan successful! Your return is logged.'}
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
                Simulate Scan
              </Button>
            )}
            {scanStep === 'success' && (
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            )}
             {scanStep === 'scanning' && (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
