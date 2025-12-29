import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary/10 p-4 rounded-lg w-fit">
            <Scale className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Aluva Scales
          </CardTitle>
          <p className="text-muted-foreground">
            Internal Inventory & Production System
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive font-medium">{error}</p>
            )}
            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
