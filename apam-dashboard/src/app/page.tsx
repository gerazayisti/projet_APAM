import Link from 'next/link';
import styles from './page.module.css';
import { Icons } from '@/components/ui/Icons';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Icons.Shield size={24} />
          </div>
          AP.A.M
        </div>
        <Link href="/login" className={`${styles.ctaButton} ${styles.secondary}`}>
          Connexion Pro
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Gestion Médicale <span className={styles.gradient}>Moderne</span>
          </h1>
          <p className={styles.subtitle}>
            La plateforme complète pour une coordination optimale entre professionnels de santé et patients.
            Dossiers numériques, rendez-vous simplifiés, suivi en temps réel.
          </p>

          <div className={styles.ctaButtons}>
            <Link href="/login" className={`${styles.ctaButton} ${styles.primary}`}>
              Accéder au Dashboard
            </Link>
            <Link href="/register" className={`${styles.ctaButton} ${styles.secondary}`}>
              Inscription Professionnel
            </Link>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icons.Users size={28} />
              </div>
              <h3 className={styles.featureTitle}>Gestion Patients</h3>
              <p className={styles.featureDesc}>
                Accès centralisé aux dossiers médicaux, historique complet et contacts d'urgence
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icons.Calendar size={28} />
              </div>
              <h3 className={styles.featureTitle}>Planification Intelligente</h3>
              <p className={styles.featureDesc}>
                Calendrier unifié, rappels automatiques et gestion de disponibilités
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Icons.FileText size={28} />
              </div>
              <h3 className={styles.featureTitle}>Dossiers Numériques</h3>
              <p className={styles.featureDesc}>
                Prescriptions, résultats d'examens et carnets de santé sécurisés
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        © 2025 AP.A.M - Plateforme de Gestion Médicale
      </footer>
    </div>
  );
}
