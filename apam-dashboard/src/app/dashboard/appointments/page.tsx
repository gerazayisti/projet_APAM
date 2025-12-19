'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { MOCK_RDVS, MOCK_PATIENTS } from '@/lib/mockData';
import { api } from '@/lib/api';
import { AppointmentModal } from '@/components/modals/AppointmentModal';

const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const days = [
    { name: 'Lun', date: '15' },
    { name: 'Mar', date: '16' },
    { name: 'Mer', date: '17' },
    { name: 'Jeu', date: '18' },
    { name: 'Ven', date: '19' },
];

export default function AppointmentsPage() {
    const [rdvs, setRdvs] = useState<any[]>(MOCK_RDVS);
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState<any[]>(MOCK_PATIENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [rdvData, patientsData] = await Promise.all([
                    api.getAppointments(),
                    api.getPatients()
                ]);
                if (Array.isArray(rdvData)) setRdvs(rdvData);
                if (Array.isArray(patientsData)) setPatients(patientsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Calendrier des RDV</h1>
                    <p className={styles.subtitle}>Gestion des consultations ({rdvs.length} planifiés cette semaine)</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="secondary" style={{ width: 'auto' }}>
                        <Icons.Search size={18} style={{ marginRight: '8px' }} />
                        Rechercher
                    </Button>
                    <Button style={{ width: 'auto' }} onClick={() => {
                        setSelectedAppointment(null);
                        setIsModalOpen(true);
                    }}>
                        <Icons.Plus size={18} style={{ marginRight: '8px' }} />
                        Nouveau RDV
                    </Button>
                </div>
            </header>

            <section>
                <div className={styles.calendarHeader}>
                    <div className={styles.currentMonth}>
                        <Icons.ChevronLeft size={20} style={{ cursor: 'pointer' }} />
                        <span>Décembre 2025</span>
                        <Icons.ChevronRight size={20} style={{ cursor: 'pointer' }} />
                    </div>
                    <div className={styles.viewToggle}>
                        <button className={`${styles.viewBtn} ${styles.activeView}`}>Semaine</button>
                        <button className={styles.viewBtn}>Mois</button>
                        <button className={styles.viewBtn}>Jour</button>
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '4rem', textAlign: 'center' }}>Chargement du calendrier...</div>
                ) : (
                    <div className={styles.scheduleBoard}>
                        <div className={styles.timeColumn}>
                            <div className={styles.dayHeader} style={{ background: 'var(--background)' }}></div>
                            {timeSlots.map(time => (
                                <div key={time} className={styles.timeSlot}>{time}</div>
                            ))}
                        </div>

                        <div className={styles.mainSchedule}>
                            {days.map(day => (
                                <div key={day.name} className={styles.dayColumn}>
                                    <div className={styles.dayHeader}>
                                        <div className={styles.dayName}>{day.name}</div>
                                        <div className={styles.dayDate}>{day.date}</div>
                                    </div>
                                    {timeSlots.map(time => {
                                        // Match RDV
                                        const rdv = rdvs.find(r => {
                                            const rdvDate = new Date(r.date_rdv);
                                            const rdvHour = rdvDate.getHours().toString().padStart(2, '0');
                                            const rdvDay = rdvDate.getDate().toString();
                                            return rdvHour === time.split(':')[0] && rdvDay === day.date;
                                        });

                                        const patient = rdv ? MOCK_PATIENTS.find(p => p.id_patient === rdv.id_patient) : null;
                                        const patientName = rdv?.nom ? `${rdv.nom} ${rdv.prenom?.charAt(0)}.` : (patient ? `${patient.nom} ${patient.prenom[0]}.` : 'Patient');

                                        return (
                                            <div key={`${day.name}-${time}`} className={styles.slotCell}>
                                                {rdv && (
                                                    <div className={`${styles.appointment} ${rdv.statut === 'confirme' ? styles.aptConfirmed : styles.aptPending}`}>
                                                        <div className={styles.aptHeader}>
                                                            <span className={styles.aptType}>{rdv.type || 'Cons.'}</span>
                                                            {rdv.statut === 'confirme' && <Icons.Shield size={12} color="white" />}
                                                        </div>
                                                        <span className={styles.aptName}>{patientName}</span>
                                                        <span className={styles.aptTime} title={rdv.motif}>{rdv.motif}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    const fetchData = async () => {
                        const data = await api.getAppointments();
                        if (Array.isArray(data)) setRdvs(data);
                    };
                    fetchData();
                    setIsModalOpen(false);
                }}
                appointment={selectedAppointment}
                patients={patients}
            />
        </div>
    );
}
