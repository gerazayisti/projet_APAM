'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from '../login/page.module.css';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        num_licence: '',
        specialite: '',
        etablissement: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send data to admin for approval
        alert('Votre demande a été envoyée à l\'administrateur. Vous recevrez un email de confirmation sous 48h.');
    };

    return (
        <div className={styles.container}>
            {/* Left Panel - Form */}
            <div className={styles.leftPanel}>
                <div className={styles.loginCard} style={{ maxWidth: '550px' }}>
                    <Link href="/" className={styles.logo}>
                        AP.A.M
                    </Link>

                    <h1 className={styles.title}>Inscription Professionnel</h1>
                    <p className={styles.subtitle}>
                        Demander l'accès à la plateforme AP.A.M pour les professionnels de santé
                    </p>

                    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                id="nom"
                                type="text"
                                label="Nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                id="prenom"
                                type="text"
                                label="Prénom"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Input
                            id="email"
                            type="email"
                            label="Email professionnel"
                            placeholder="dr.exemple@hopital.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                id="telephone"
                                type="tel"
                                label="Téléphone"
                                value={formData.telephone}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                id="num_licence"
                                type="text"
                                label="N° Licence / RPPS"
                                placeholder="RPPS-123456789"
                                value={formData.num_licence}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Input
                            id="specialite"
                            type="text"
                            label="Spécialité"
                            placeholder="Médecine Générale, Pédiatrie..."
                            value={formData.specialite}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            id="etablissement"
                            type="text"
                            label="Établissement"
                            placeholder="Hôpital Central, Clinique..."
                            value={formData.etablissement}
                            onChange={handleChange}
                            required
                        />

                        <div style={{ marginTop: '2rem' }}>
                            <Button type="submit">
                                Soumettre la demande
                            </Button>
                        </div>
                    </form>

                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Déjà un compte ? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: '500' }}>Se connecter</Link>
                    </p>
                </div>
            </div>

            {/* Right Panel - Branding */}
            <div className={styles.rightPanel}>
                <div className={styles.brand}>AP.A.M</div>
                <p className={styles.tagline}>
                    Rejoignez la communauté des<br />professionnels de santé connectés.
                </p>
            </div>
        </div>
    );
}
