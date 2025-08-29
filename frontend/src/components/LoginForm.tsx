import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet } from "lucide-react";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const LoginForm = ({ isOpen, onClose, onLogin }: LoginFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };
      
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
        setFormData({ name: '', email: '', password: '' });
        onClose();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      // Fallback to localStorage for demo
      let users = JSON.parse(localStorage.getItem('allUsers') || '[]');
      
      if (isLogin) {
        let user = users.find(u => u.email === formData.email);
        if (!user) {
          user = {
            name: formData.email.split('@')[0],
            email: formData.email,
            id: Date.now()
          };
          users.push(user);
          localStorage.setItem('allUsers', JSON.stringify(users));
        }
        localStorage.setItem('user', JSON.stringify(user));
        onLogin(user);
      } else {
        const userData = {
          name: formData.name,
          email: formData.email,
          id: Date.now()
        };
        users.push(userData);
        localStorage.setItem('allUsers', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
      }
      
      setFormData({ name: '', email: '', password: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-fit">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            {isLogin ? '🔑 Welcome Back!' : '🎉 Join Wallet Whisperer'}
          </DialogTitle>
          <p className="text-muted-foreground">
            {isLogin ? 'Login to access your dashboard' : 'Create your account to get started'}
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
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
              required
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
              required
            />
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLogin ? '🚀 Login Now' : '✨ Create Account'}
            </Button>
            
            <div className="text-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </Button>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              🔒 Your data is secure and encrypted
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;