import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginForm = ({ isOpen, onClose, onSuccess }: LoginFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - always success
    const mockToken = 'demo-token-' + Date.now();
    const mockUser = {
      name: formData.name || 'Demo User',
      email: formData.email || 'demo@test.com',
      id: Date.now()
    };
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    onSuccess();
    onClose();
  };

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
          <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleDemoLogin}
              className="w-full"
            >
              Quick Demo
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setIsLogin(!isLogin)}
              className="w-full"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;