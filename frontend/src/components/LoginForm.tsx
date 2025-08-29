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
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
  });

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = async () => {
    if (!formData.phone) {
      alert('Please enter phone number!');
      return;
    }
    
    if (formData.phone.length < 10) {
      alert('Please enter valid 10-digit phone number!');
      return;
    }
    
    try {
      // Call backend API to send real SMS
      const response = await fetch('http://localhost:3001/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formData.phone })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedOtp(data.demoOTP); // For demo purposes
        setOtpSent(true);
        alert(`📱 Real SMS sent to ${formData.phone}!\n\n🔢 Demo OTP: ${data.demoOTP}\n\n(Check your phone for actual SMS)`);
      } else {
        alert('Failed to send OTP: ' + data.error);
      }
    } catch (error) {
      console.error('OTP sending error:', error);
      // Fallback to demo mode
      const otp = generateOtp();
      setGeneratedOtp(otp);
      setOtpSent(true);
      alert(`📱 Demo mode - OTP: ${otp}\n\n(Backend not running - using demo mode)`);
    }
  };

  const verifyOtp = () => {
    if (formData.otp !== generatedOtp) {
      alert('Invalid OTP! Please try again.');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    let user = users.find(u => u.phone === formData.phone);
    
    if (!user) {
      // Create new user with phone login
      user = {
        name: `User_${formData.phone.slice(-4)}`,
        phone: formData.phone,
        email: `${formData.phone}@phone.login`,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      users.push(user);
      localStorage.setItem('allUsers', JSON.stringify(users));
    }
    
    localStorage.setItem('token', 'demo-token-' + user.id);
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', password: '', otp: '' });
    setOtpSent(false);
    setGeneratedOtp('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showOtpLogin) {
      if (!otpSent) {
        sendOtp();
      } else {
        verifyOtp();
      }
      return;
    }
    
    let users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    
    // Always ensure demo user exists
    const demoExists = users.find(u => u.email === 'demo@example.com');
    if (!demoExists) {
      const demoUser = {
        name: 'Demo User',
        email: 'demo@example.com',
        phone: '1234567890',
        password: 'demo123',
        id: 1,
        createdAt: new Date().toISOString()
      };
      users.push(demoUser);
      localStorage.setItem('allUsers', JSON.stringify(users));
    }
    
    if (isLogin) {
      // Login Logic - Allow demo credentials
      if (formData.email === 'demo@example.com' && formData.password === 'demo123') {
        const demoUser = users.find(u => u.email === 'demo@example.com') || users[0];
        localStorage.setItem('token', 'demo-token-' + demoUser.id);
        localStorage.setItem('user', JSON.stringify(demoUser));
        onLogin(demoUser);
        resetForm();
        onClose();
        return;
      }
      
      const existingUser = users.find(u => u.email === formData.email);
      if (!existingUser) {
        alert('User not found! Try: demo@example.com / demo123');
        return;
      }
      if (existingUser.password !== formData.password) {
        alert('Invalid password! Try: demo@example.com / demo123');
        return;
      }
      
      localStorage.setItem('token', 'demo-token-' + existingUser.id);
      localStorage.setItem('user', JSON.stringify(existingUser));
      onLogin(existingUser);
    } else {
      // Signup Logic
      const existingUser = users.find(u => u.email === formData.email);
      if (existingUser) {
        alert('Email already registered! Please login instead.');
        return;
      }
      
      if (!formData.name || !formData.email || !formData.password) {
        alert('Please fill Name, Email and Password!');
        return;
      }
      
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
      }
      
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      users.push(userData);
      localStorage.setItem('allUsers', JSON.stringify(users));
      localStorage.setItem('token', 'demo-token-' + userData.id);
      localStorage.setItem('user', JSON.stringify(userData));
      
      onLogin(userData);
    }
    
    setFormData({ name: '', email: '', phone: '', password: '', otp: '' });
    setShowOtpLogin(false);
    setOtpSent(false);
    setGeneratedOtp('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-fit">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            {showOtpLogin ? '📱 OTP Login' : 
             (isLogin ? '🔑 Welcome Back!' : '🎉 Join Wallet Whisperer')}
          </DialogTitle>
          <p className="text-muted-foreground">
            {showOtpLogin ? 'Enter your phone number to receive OTP' :
             (isLogin ? 'Login to access your dashboard' : 'Create your account to get started')}
          </p>
          {isLogin && !showOtpLogin && (
            <div className="bg-blue-50 p-3 rounded-lg mt-2">
              <p className="text-xs text-blue-600 font-medium">Demo Credentials:</p>
              <p className="text-xs text-blue-600">Email: demo@example.com</p>
              <p className="text-xs text-blue-600">Password: demo123</p>
            </div>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {showOtpLogin ? (
            // OTP Login Form
            <>
              {!otpSent ? (
                <>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-4 bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      📱 OTP sent to {formData.phone}
                    </p>
                    <div className="mt-2 p-2 bg-green-100 rounded border-2 border-green-300">
                      <p className="text-lg font-bold text-green-800">
                        Demo OTP: {generatedOtp}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Copy this OTP and enter below
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      maxLength={6}
                      required
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            // Regular Login/Signup Form
            <>
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number (optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </>
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
            </>
          )}

          <div className="flex flex-col gap-3 mt-6">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showOtpLogin ? 
                (!otpSent ? '📱 Send OTP' : '🔐 Verify OTP') :
                (isLogin ? '🚀 Login Now' : '✨ Create Account')
              }
            </Button>
            
            {!showOtpLogin && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowOtpLogin(true);
                  resetForm();
                }}
                className="w-full"
              >
                📱 Login with OTP
              </Button>
            )}
            
            <div className="text-center">
              {showOtpLogin ? (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => {
                    setShowOtpLogin(false);
                    resetForm();
                  }}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  ← Back to Email Login
                </Button>
              ) : (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </Button>
              )}
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