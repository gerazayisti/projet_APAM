import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../login/page.module.css';

export default function ForgotPasswordPage() {
    return (
        <div className={styles.container}>
            {/* Left Panel - Form */}
            <div className={styles.leftPanel}>
                <div className={styles.loginCard}>
                    <Link href="/" className={styles.logo}>
                        AP.A.M
                    </Link>

                    <h1 className={styles.title}>Mot de passe oublié ?</h1>
                    <p className={styles.subtitle}>
                        Saisissez votre email professionnel et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                    </p>

                    <form action="/login" style={{ marginTop: '2rem' }}>
                        <Input
                            id="email"
                            type="email"
                            label="Email professionnel"
                            placeholder="dr.exemple@apam.com"
                            required
                        />

                        <div style={{ marginTop: '2rem' }}>
                            <Button type="submit">
                                Envoyer le lien de réinitialisation
                            </Button>
                        </div>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <Link href="/login" style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 500 }}>
                            ← Retour à la connexion
                        </Link>
                    </div>
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
