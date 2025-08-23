import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from '@/api';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await api.login({ email: formData.email, password: formData.password });
      } else {
        response = await api.register(formData);
      }

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user || { email: formData.email }));
        alert(isLogin ? 'Login successful!' : 'Registration successful!');
        onSuccess();
        onClose();
      } else {
        alert(response.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed');
    } finally {
      setLoading(false);
    }
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
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
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
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
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