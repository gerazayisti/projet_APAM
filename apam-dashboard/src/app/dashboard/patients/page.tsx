'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { api } from '@/lib/api';
import { PatientModal } from '@/components/modals/PatientModal';

export default function PatientsPage() {
    const [patients, setPatients] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUserId(user.id_pro || user.id_patient);
        }
    }, []);

    useEffect(() => {
        if (currentUserId) {
            fetchMyPatients();
        }
    }, [currentUserId]);

    const fetchMyPatients = async () => {
        if (!currentUserId) return;

        setLoading(true);
        try {
            const data = await api.getDoctorPatients(currentUserId);
            setPatients(data || []);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
            setPatients([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePatientSaved = () => {
        fetchMyPatients();
        setIsModalOpen(false);
        setSelectedPatient(null);
    };

    const openPatientDetails = async (patient: any) => {
        try {
            const details = await api.getPatientDetails(patient.id_patient);
            setSelectedPatient(details);
            setIsDetailModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch patient details:', error);
        }
    };

    const filteredPatients = patients.filter(p =>
        `${p.nom} ${p.prenom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Mes Patients</h1>
                    <p className={styles.subtitle}>Gestion des patients en consultation</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} style={{ width: 'auto' }}>
                    <Icons.Plus size={18} style={{ marginRight: '8px' }} />
                    Nouveau Patient
                </Button>
            </header>

            <div className={styles.searchContainer}>
                <div className={styles.searchInputContainer}>
                    <Icons.Search size={20} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou email..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Chargement...
                </div>
            ) : filteredPatients.length === 0 ? (
                <div className={styles.emptyState}>
                    <Icons.Users size={64} style={{ color: 'var(--border)', marginBottom: '1rem' }} />
                    <h3>Aucun patient trouvé</h3>
                    <p>Les patients en consultation apparaîtront ici.</p>
                </div>
            ) : (
                <div className={styles.patientsList}>
                    <div className={styles.tableHeader}>
                        <div className={styles.headerCell} style={{ flex: 3 }}>Patient</div>
                        <div className={styles.headerCell} style={{ flex: 2 }}>Contact</div>
                        <div className={styles.headerCell} style={{ flex: 2 }}>Informations</div>
                        <div className={styles.headerCell} style={{ flex: 1 }}>Actions</div>
                    </div>
                    {filteredPatients.map((patient) => (
                        <div key={patient.id_patient} className={styles.patientRow}>
                            <div className={styles.patientCell} style={{ flex: 3 }}>
                                <div className={styles.patientAvatar}>
                                    {patient.nom?.charAt(0)}{patient.prenom?.charAt(0)}
                                </div>
                                <div>
                                    <button
                                        className={styles.patientName}
                                        onClick={() => openPatientDetails(patient)}
                                    >
                                        {patient.nom} {patient.prenom}
                                    </button>
                                    <div className={styles.patientMeta}>
                                        Groupe: {patient.groupe_sang} • Depuis {new Date(patient.date_debut).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.patientCell} style={{ flex: 2 }}>
                                <div className={styles.contactInfo}>
                                    <div>{patient.email}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {patient.telephone}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.patientCell} style={{ flex: 2 }}>
                                <div className={styles.patientInfo}>
                                    {patient.allergies && patient.allergies !== 'Aucune' && (
                                        <span className={styles.allergyBadge}>⚠️ Allergies</span>
                                    )}
                                    <span className={styles.infoBadge}>
                                        {patient.taille}cm • {patient.poids}kg
                                    </span>
                                </div>
                            </div>
                            <div className={styles.patientCell} style={{ flex: 1 }}>
                                <Button
                                    variant="secondary"
                                    style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                    onClick={() => window.location.href = `/dashboard/records?patient=${patient.id_patient}`}
                                >
                                    <Icons.FileText size={16} style={{ marginRight: '4px' }} />
                                    Dossier
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <PatientModal
                    isOpen={isModalOpen}
                    patient={selectedPatient}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedPatient(null);
                    }}
                    onSuccess={handlePatientSaved}
                />
            )}

            {isDetailModalOpen && selectedPatient && (
                <div className={styles.modalOverlay} onClick={() => setIsDetailModalOpen(false)}>
                    <div className={styles.detailModal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.detailHeader}>
                            <h2>Détails du Patient</h2>
                            <button className={styles.closeBtn} onClick={() => setIsDetailModalOpen(false)}>
                                <Icons.X size={24} />
                            </button>
                        </div>
                        <div className={styles.detailContent}>
                            <div className={styles.detailSection}>
                                <h3>Informations Personnelles</h3>
                                <div className={styles.detailGrid}>
                                    <div><strong>Nom:</strong> {selectedPatient.nom} {selectedPatient.prenom}</div>
                                    <div><strong>Email:</strong> {selectedPatient.email}</div>
                                    <div><strong>Téléphone:</strong> {selectedPatient.telephone}</div>
                                    <div><strong>Date de naissance:</strong> {new Date(selectedPatient.date_nais).toLocaleDateString('fr-FR')}</div>
                                </div>
                            </div>

                            <div className={styles.detailSection}>
                                <h3>Informations Médicales</h3>
                                <div className={styles.detailGrid}>
                                    <div><strong>Groupe sanguin:</strong> {selectedPatient.groupe_sang}</div>
                                    <div><strong>Taille:</strong> {selectedPatient.taille} cm</div>
                                    <div><strong>Poids:</strong> {selectedPatient.poids} kg</div>
                                    <div><strong>Allergies:</strong> <span style={{ color: selectedPatient.allergies !== 'Aucune' ? '#d32f2f' : 'inherit' }}>{selectedPatient.allergies}</span></div>
                                </div>
                            </div>

                            {selectedPatient.nom_urgence && (
                                <div className={styles.detailSection}>
                                    <h3>Contact d'Urgence</h3>
                                    <div className={styles.detailGrid}>
                                        <div><strong>Nom:</strong> {selectedPatient.nom_urgence}</div>
                                        <div><strong>Téléphone:</strong> {selectedPatient.tel_urgence}</div>
                                        <div><strong>Relation:</strong> {selectedPatient.relation_urgence}</div>
                                    </div>
                                </div>
                            )}

                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsDetailModalOpen(false)}
                                    style={{ width: 'auto' }}
                                >
                                    Fermer
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsDetailModalOpen(false);
                                        window.location.href = `/dashboard/records?patient=${selectedPatient.id_patient}`;
                                    }}
                                    style={{ width: 'auto' }}
                                >
                                    <Icons.FileText size={18} style={{ marginRight: '8px' }} />
                                    Voir Dossier Médical
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
