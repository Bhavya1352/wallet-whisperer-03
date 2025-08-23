import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginForm = ({ isOpen, onClose, onSuccess }: LoginFormProps) => {
  const handleDemoLogin = () => {
    localStorage.setItem('token', 'demo-token-' + Date.now());
    localStorage.setItem('user', JSON.stringify({
      name: 'Demo User',
      email: 'demo@test.com',
      id: Date.now()
    }));
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Wallet Whisperer</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            Click below to start using the app with demo data
          </p>
          
          <Button 
            onClick={handleDemoLogin}
            className="w-full"
          >
            Start Demo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;