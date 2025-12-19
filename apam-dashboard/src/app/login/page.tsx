'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.login(email, password);
      if (data && data.user) {
        // Save user info to localStorage or context
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Identifiants invalides');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Impossible de se connecter au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Form */}
      <div className={styles.leftPanel}>
        <div className={styles.loginCard}>
          <Link href="/" className={styles.logo}>
            AP.A.M
          </Link>

          <h1 className={styles.title}>Bon retour</h1>
          <p className={styles.subtitle}>Connectez-vous à votre espace praticien</p>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Email professionnel"
              placeholder="dr.exemple@apam.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div style={{ margin: '1rem 0 2rem', textAlign: 'right' }}>
              <Link href="/forgot-password" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Pas encore de compte ? <Link href="/register" style={{ color: 'var(--primary)', fontWeight: '500' }}>Contactez l'admin</Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className={styles.rightPanel}>
        <div className={styles.brand}>AP.A.M</div>
        <p className={styles.tagline}>
          La plateforme moderne pour une<br />gestion médicale simplifiée.
        </p>
      </div>
    </div>
  );
}

