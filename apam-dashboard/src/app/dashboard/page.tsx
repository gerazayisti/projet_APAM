'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Icons } from '@/components/ui/Icons';
import { MOCK_RDVS, MOCK_PATIENTS, MOCK_RESULTATS } from '@/lib/mockData';
import { api } from '@/lib/api';

export default function DashboardPage() {
    const [rdvs, setRdvs] = useState<any[]>(MOCK_RDVS);
    const [statsValues, setStatsValues] = useState({
        total_patients: MOCK_PATIENTS.length,
        upcoming_appointments: MOCK_RDVS.filter(r => r.date_rdv.startsWith('2025-12-18')).length,
        new_results: MOCK_RESULTATS.length,
        messages: 7
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                const [statsData, rdvData] = await Promise.all([
                    api.getDashboardStats(),
                    api.getAppointments()
                ]);

                if (statsData && !statsData.error) {
                    setStatsValues({
                        total_patients: statsData.total_patients,
                        upcoming_appointments: statsData.upcoming_appointments,
                        new_results: MOCK_RESULTATS.length, // Placeholder if not in API
                        messages: statsData.new_messages || 7
                    });
                }

                if (Array.isArray(rdvData)) {
                    setRdvs(rdvData);
                }
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const stats = [
        { label: 'Total Patients', value: statsValues.total_patients, icon: <Icons.Users size={24} color="var(--primary)" />, trend: '+2', trendUp: true },
        { label: 'RDV Aujourd\'hui', value: statsValues.upcoming_appointments, icon: <Icons.Calendar size={24} color="#4CAF50" />, trend: 'Stable', trendUp: true },
        { label: 'Nouveaux Résultats', value: statsValues.new_results, icon: <Icons.FileText size={24} color="#FB8C00" />, trend: '+1', trendUp: true },
        { label: 'Messages', value: statsValues.messages, icon: <Icons.MessageSquare size={24} color="#2196F3" />, trend: '+3', trendUp: true },
    ];

    const recentActivities = [
        { id: '1', text: `Consultation terminée pour ${MOCK_PATIENTS[0].nom} ${MOCK_PATIENTS[0].prenom}`, time: 'Il y a 10 min', icon: <Icons.FileText size={16} /> },
        { id: '2', text: `Nouveau résultat d'examen: ${MOCK_RESULTATS[0].type_test}`, time: 'Il y a 45 min', icon: <Icons.Shield size={16} /> },
        { id: '3', text: 'Nouvelle demande d\'accès patient: P-99283', time: 'Il y a 2h', icon: <Icons.Lock size={16} /> },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Tableau de bord</h1>
                <p className={styles.subtitle}>Gérez efficacement votre pratique médicale AP.A.M</p>
            </header>

            {/* Stats Section */}
            <section className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statIcon}>{stat.icon}</span>
                            <span className={`${styles.statTrend} ${stat.trendUp ? styles.trendUp : styles.trendDown}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className={styles.statLabel}>{stat.label}</p>
                            <h3 className={styles.statValue}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </section>

            <div className={styles.mainGrid}>
                {/* Appointments Panel */}
                <section className={styles.panel}>
                    <h2 className={styles.panelTitle}>Prochains Rendez-vous</h2>
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Heure</th>
                                    <th>Motif</th>
                                    <th>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rdvs.slice(0, 5).map((rdv) => {
                                    const patient = MOCK_PATIENTS.find(p => p.id_patient === rdv.id_patient);
                                    const time = new Date(rdv.date_rdv).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <tr key={rdv.id_rdv}>
                                            <td>{rdv.nom ? `${rdv.nom} ${rdv.prenom}` : (patient ? `${patient.nom} ${patient.prenom}` : 'Patient inconnu')}</td>
                                            <td>{time}</td>
                                            <td>{rdv.motif}</td>
                                            <td>
                                                <span className={`${styles.status} ${rdv.statut === 'confirme' ? styles.statusConfirmed : styles.statusPending}`}>
                                                    {rdv.statut === 'confirme' ? 'Confirmé' : 'Planifié'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </section>

                {/* Recent Activity Panel */}
                <section className={styles.panel}>
                    <h2 className={styles.panelTitle}>Activité Récente</h2>
                    <div className={styles.activityList}>
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className={styles.activityItem}>
                                <div className={styles.itemIcon}>{activity.icon}</div>
                                <div className={styles.itemInfo}>
                                    <p className={styles.itemText}>{activity.text}</p>
                                    <span className={styles.itemTime}>{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

