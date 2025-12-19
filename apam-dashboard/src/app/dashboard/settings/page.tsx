'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/ui/Icons';
import { api } from '@/lib/api';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const id_pro = user.id_pro || 1; // Default to 1 if not set
                try {
                    const data = await api.getProProfile(id_pro);
                    if (data && !data.message) {
                        setProfile(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch profile:', error);
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const initials = profile ? `${profile.nom?.charAt(0)}${profile.prenom?.charAt(0)}` : 'DW';

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Paramètres du Compte</h1>
                <p className={styles.subtitle}>Gérez vos informations professionnelles et préférences utilisateur</p>
            </header>

            <div className={styles.settingsGrid}>
                <aside className={styles.settingsNav}>
                    <div
                        className={`${styles.navItem} ${activeTab === 'profile' ? styles.activeNavItem : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <Icons.User size={18} /> Profil Professionnel
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === 'notifications' ? styles.activeNavItem : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <Icons.Bell size={18} /> Notifications
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === 'security' ? styles.activeNavItem : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <Icons.Shield size={18} /> Sécurité & Accès
                    </div>
                </aside>

                <main className={styles.content}>
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
                    ) : (
                        <>
                            {activeTab === 'profile' && (
                                <div className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Éditer le profil (PRO_SANTE)</h2>

                                    <div className={styles.profileAvatarSection}>
                                        <div className={styles.avatarLarge}>{initials}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <Button style={{ width: 'auto' }} variant="secondary">Changer l'image</Button>
                                            <p className={styles.subtitle} style={{ fontSize: '0.8rem' }}>Recommandé: 400x400px</p>
                                        </div>
                                    </div>

                                    <div className={styles.formGrid}>
                                        <Input label="Nom" defaultValue={profile?.nom || "Watson"} />
                                        <Input label="Prénom" defaultValue={profile?.prenom || "John"} />
                                        <Input label="Email professionnel" defaultValue={profile?.email || "dr.watson@apam.com"} />
                                        <Input label="Téléphone" defaultValue={profile?.telephone || "0612345678"} />
                                        <Input label="Numéro de licence (num_licence)" defaultValue={profile?.num_licence || "RPPS-123456789"} />
                                        <Input label="Spécialité (specialite)" defaultValue={profile?.specialite || "Oncologie / Médecine Générale"} />
                                        <Input label="Établissement (etablissement)" defaultValue={profile?.etablissement || "Hôpital Central de Paris"} />
                                        <Input label="Tarifs de consultation (tarifs)" defaultValue={profile?.tarifs || "50 DT / 25 €"} />
                                    </div>

                                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                        <Button style={{ width: 'auto', padding: '0.75rem 2.5rem' }}>
                                            <Icons.Plus size={18} style={{ marginRight: '8px' }} />
                                            Sauvegarder les modifications
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Gestion des Alertes</h2>

                                    <div className={styles.toggleGroup}>
                                        <div className={styles.toggleItem}>
                                            <div className={styles.toggleLabel}>
                                                <span className={styles.labelTitle}>Nouveaux rendez-vous</span>
                                                <span className={styles.labelDesc}>Être averti pour chaque nouvelle réservation (RDV)</span>
                                            </div>
                                            <label className={styles.switch}>
                                                <input type="checkbox" defaultChecked />
                                                <span className={styles.slider}></span>
                                            </label>
                                        </div>

                                        <div className={styles.toggleItem}>
                                            <div className={styles.toggleLabel}>
                                                <span className={styles.labelTitle}>Messages directs</span>
                                                <span className={styles.labelDesc}>Notifications Push et Email pour les nouveaux messages</span>
                                            </div>
                                            <label className={styles.switch}>
                                                <input type="checkbox" defaultChecked />
                                                <span className={styles.slider}></span>
                                            </label>
                                        </div>

                                        <div className={styles.toggleItem}>
                                            <div className={styles.toggleLabel}>
                                                <span className={styles.labelTitle}>Rappels de suivi</span>
                                                <span className={styles.labelDesc}>Alertes sur les traitements et carnets à jour</span>
                                            </div>
                                            <label className={styles.switch}>
                                                <input type="checkbox" />
                                                <span className={styles.slider}></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Contrôle d'Accès</h2>

                                    <div style={{ maxWidth: '450px' }}>
                                        <Input label="Mot de passe actuel" type="password" />
                                        <Input label="Nouveau mot de passe" type="password" />
                                        <Input label="Confirmation" type="password" />

                                        <div style={{ marginTop: '2rem' }}>
                                            <Button style={{ width: 'auto' }}>Changer le mot de passe</Button>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '4rem', padding: '1.5rem', background: '#FFF5F5', borderRadius: '12px', border: '1px solid #FED7D7' }}>
                                        <h3 style={{ color: '#C53030', marginBottom: '0.5rem', fontWeight: '800' }}>Zone Critique</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#742A2A', marginBottom: '1.5rem' }}>
                                            Attention: La suppression ou désactivation de votre compte PRO_SANTE est irréversible.
                                        </p>
                                        <Button variant="secondary" style={{ color: '#C53030', borderColor: '#C53030', background: 'white', width: 'auto' }}>
                                            Désactiver mon compte
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}


