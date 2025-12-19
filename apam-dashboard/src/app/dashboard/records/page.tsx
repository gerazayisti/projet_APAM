'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { Input } from '@/components/ui/Input';
import { MOCK_DOSSIERS, MOCK_RESULTATS, MOCK_PRESCRIPTIONS, MOCK_JOURNAL, MOCK_PATIENTS } from '@/lib/mockData';
import { api } from '@/lib/api';

export default function RecordsPage() {
    const [activeTab, setActiveTab] = useState('documents'); // 'documents', 'requests', 'editing'
    const [subTab, setSubTab] = useState('dossier'); // 'dossier', 'exams', 'prescriptions', 'journal'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExamModalOpen, setIsExamModalOpen] = useState(false);

    // State for live data
    const [patientId, setPatientId] = useState(1);
    const [dossier, setDossier] = useState<any>(MOCK_DOSSIERS[0]);
    const [results, setResults] = useState<any[]>(MOCK_RESULTATS);
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Access request state
    const [accessRequests, setAccessRequests] = useState<any[]>([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    // Search for new access request
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedPatientForRequest, setSelectedPatientForRequest] = useState<any>(null);
    const [requestMotif, setRequestMotif] = useState('');

    // Patients for editing (active consultations)
    const [myPatients, setMyPatients] = useState<any[]>([]);

    const selectedPatient = MOCK_PATIENTS.find(p => p.id_patient === patientId);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUserId(user.id_pro || user.id_patient);
        }
    }, []);

    useEffect(() => {
        if (currentUserId) {
            fetchAccessRequests();
            fetchMyPatients();
        }
    }, [currentUserId]);

    const fetchMyPatients = async () => {
        if (!currentUserId) return;
        try {
            const data = await api.getDoctorPatients(currentUserId);
            setMyPatients(data || []);
            // Set initial patient for editing if available
            if (data && data.length > 0 && !patientId) {
                setPatientId(data[0].id_patient);
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        }
    };

    const handleSearchPatients = async (query: string) => {
        setSearchQuery(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const data = await api.searchPatients(query);
            setSearchResults(data || []);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'editing') {
            fetchDossier();
        }
    }, [activeTab, patientId]);

    const fetchDossier = async () => {
        setLoading(true);
        try {
            const data = await api.getDossierByPatient(patientId);
            if (data && !data.message) {
                setDossier(data);
                if (data.resultats) setResults(data.resultats);
            }
        } catch (error) {
            console.error('Failed to fetch dossier:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAccessRequests = async () => {
        if (!currentUserId) return;
        setLoading(true);
        try {
            const requests = await api.getDoctorAccessRequests(currentUserId);
            setAccessRequests(requests || []);
        } catch (error) {
            console.error('Failed to fetch access requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAccessRequest = async (patientId: number, motif: string) => {
        if (!currentUserId) return;
        try {
            await api.createAccessRequest({
                id_patient: patientId,
                id_pro_sante: currentUserId,
                motif
            });
            alert('Demande d\'accès envoyée avec succès');
            fetchAccessRequests();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Failed to create access request:', error);
            alert('Erreur lors de l\'envoi de la demande');
        }
    };

    const fetchPrescriptions = async () => {
        try {
            const data = await api.getPrescriptions(patientId);
            setPrescriptions(data || []);
        } catch (error) {
            console.error('Failed to fetch prescriptions:', error);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Carnet Médical Digital</h1>
                    <p className={styles.subtitle}>Gestion des dossiers, examens et prescriptions</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="secondary" onClick={() => setIsModalOpen(true)} style={{ width: 'auto' }}>
                        <Icons.Plus size={18} style={{ marginRight: '8px' }} />
                        Demander accès
                    </Button>
                    {isAuthorized && (
                        <Button onClick={() => setActiveTab('editing')} style={{ width: 'auto' }}>
                            <Icons.FileText size={18} style={{ marginRight: '8px' }} />
                            Gérer le Dossier
                        </Button>
                    )}
                </div>
            </header>

            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${activeTab === 'documents' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('documents')}
                >
                    Documents récents
                </div>
                <div
                    className={`${styles.tab} ${activeTab === 'requests' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('requests')}
                >
                    Demandes d'accès
                </div>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'requests' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        <Icons.Bell size={18} /> Demandes d'Accès
                    </button>
                    {myPatients.length > 0 && (
                        <button
                            className={`${styles.tab} ${activeTab === 'editing' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('editing')}
                        >
                            <Icons.Shield size={18} /> Édition Carnets
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                {activeTab === 'editing' && (
                    <div className={styles.patientSelector}>
                        <label>Sélectionner le patient :</label>
                        <select
                            value={patientId}
                            onChange={(e) => setPatientId(Number(e.target.value))}
                            className={styles.selectInput}
                        >
                            {myPatients.map(p => (
                                <option key={p.id_patient} value={p.id_patient}>
                                    {p.nom} {p.prenom}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {activeTab === 'editing' ? (
                    <div className={styles.editingContainer}>
                        <div className={styles.editingSidebar}>
                            <div
                                className={`${styles.subTab} ${subTab === 'dossier' ? styles.activeSubTab : ''}`}
                                onClick={() => setSubTab('dossier')}
                            >
                                <Icons.FileText size={18} /> Dossier Physique
                            </div>
                            <div
                                className={`${styles.subTab} ${subTab === 'exams' ? styles.activeSubTab : ''}`}
                                onClick={() => setSubTab('exams')}
                            >
                                <Icons.Shield size={18} /> Examens & Tests
                            </div>
                            <div
                                className={`${styles.subTab} ${subTab === 'prescriptions' ? styles.activeSubTab : ''}`}
                                onClick={() => setSubTab('prescriptions')}
                            >
                                <Icons.FileText size={18} /> Ordonnances
                            </div>
                            <div
                                className={`${styles.subTab} ${subTab === 'journal' ? styles.activeSubTab : ''}`}
                                onClick={() => setSubTab('journal')}
                            >
                                <Icons.MessageSquare size={18} /> Journal de Santé
                            </div>
                        </div>

                        <div className={styles.editingContent}>
                            {loading ? (
                                <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>
                            ) : (
                                <>
                                    {subTab === 'dossier' && (
                                        <div className={styles.bookletContainer}>
                                            <div className={styles.bookletHeader}>
                                                <h2 className={styles.bookletTitle}>Carnet de Santé</h2>
                                                <p style={{ color: '#777', fontStyle: 'italic', fontSize: '0.9rem' }}>Ministère de la Santé Publique - Dossier Digital AP.A.M</p>
                                            </div>

                                            <div className={styles.bookletContent}>
                                                <div className={styles.bookletGrid}>
                                                    <div className={styles.bookletSection}>
                                                        <span className={styles.bookletLabel}>Nom du Patient:</span>
                                                        <span className={styles.bookletValue}>{selectedPatient?.nom} {selectedPatient?.prenom}</span>
                                                    </div>
                                                    <div className={styles.bookletSection}>
                                                        <span className={styles.bookletLabel}>Matricule N°:</span>
                                                        <span className={styles.bookletValue}>P-77281-Z</span>
                                                    </div>
                                                </div>

                                                <div className={styles.bookletSection}>
                                                    <span className={styles.bookletLabel}>Antécédents Familiaux:</span>
                                                    <div className={styles.bookletValue} style={{ display: 'block', minHeight: '5rem' }}>
                                                        {dossier.antecedent_familiaux}
                                                    </div>
                                                </div>

                                                <div className={styles.bookletGrid}>
                                                    <div className={styles.bookletSection}>
                                                        <span className={styles.bookletLabel}>Groupe Sanguin:</span>
                                                        <span className={styles.bookletValue}>{selectedPatient?.groupe_sang}</span>
                                                    </div>
                                                    <div className={styles.bookletSection}>
                                                        <span className={styles.bookletLabel}>Poids/Taille:</span>
                                                        <span className={styles.bookletValue}>{selectedPatient?.poids}kg / {selectedPatient?.taille}cm</span>
                                                    </div>
                                                </div>

                                                <div className={styles.bookletSection}>
                                                    <span className={styles.bookletLabel}>Vaccinations à jour:</span>
                                                    <span className={styles.bookletValue}>{dossier.vaccinations}</span>
                                                </div>

                                                <div className={styles.bookletSection}>
                                                    <span className={styles.bookletLabel}>Chirurgies passées:</span>
                                                    <span className={styles.bookletValue}>{dossier.chirurgies}</span>
                                                </div>

                                                <div className={styles.bookletSection}>
                                                    <span className={styles.bookletLabel}>Allergies signalées:</span>
                                                    <span className={styles.bookletValue} style={{ color: '#cc0000', fontWeight: 'bold' }}>{dossier.allergies}</span>
                                                </div>

                                                <div className={styles.bookletStamp}>CERTIFIÉ CONFORME</div>
                                            </div>

                                            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button style={{ width: 'auto' }}>
                                                    <Icons.Plus size={18} style={{ marginRight: '8px' }} />
                                                    Mettre à jour le carnet
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {subTab === 'exams' && (
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                                <h2 className={styles.sectionTitle}>Résultats de Tests</h2>
                                                <Button style={{ width: 'auto' }} onClick={() => setIsExamModalOpen(true)}>+ Ajouter un examen</Button>
                                            </div>
                                            <div className={styles.examList}>
                                                {results.map(res => (
                                                    <div key={res.id_resultat} className={styles.examCard}>
                                                        <div className={styles.examInfo}>
                                                            <div style={{ fontWeight: '700' }}>{res.type_test}</div>
                                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{res.nom_labo} - {res.date_realisation}</div>
                                                            <p style={{ marginTop: '0.5rem' }}>{res.description_resultat}</p>
                                                        </div>
                                                        <Button variant="secondary" style={{ width: 'auto' }}>
                                                            <Icons.FileText size={16} /> PDF
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {subTab === 'prescriptions' && (
                                        <div>
                                            <h2 className={styles.sectionTitle}>Historique des Prescriptions</h2>
                                            {MOCK_PRESCRIPTIONS.map(p => (
                                                <div key={p.id_prescription} className={styles.recordCard} style={{ marginBottom: '1rem' }}>
                                                    <div className={styles.cardHeader}>
                                                        <Icons.FileText size={20} color="var(--primary)" />
                                                        <span className={styles.fileType}>Ordonnance</span>
                                                    </div>
                                                    <div className={styles.cardBody}>
                                                        <p>{p.ordonnance}</p>
                                                        <p className={styles.subtitle}>Expire le {p.date_prescription}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <Button style={{ width: 'auto', marginTop: '1rem' }}>+ Nouvelle Prescription</Button>
                                        </div>
                                    )}

                                    {subTab === 'journal' && (
                                        <div>
                                            <h2 className={styles.sectionTitle}>Journal de Santé du Patient</h2>
                                            <div className={styles.activityList}>
                                                {MOCK_JOURNAL.map(j => (
                                                    <div key={j.id_entree} className={styles.activityItem} style={{ marginBottom: '1rem' }}>
                                                        <div className={styles.itemIcon}><Icons.MessageSquare size={16} /></div>
                                                        <div className={styles.itemInfo}>
                                                            <p className={styles.itemText}>{j.description}</p>
                                                            <span className={styles.itemTime}>Niveau de douleur: {j.niveau_douleur}/10</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ) : activeTab === 'documents' ? (
                    <>
                        <div className={styles.searchActions}>
                            <Icons.Search size={20} color="var(--text-secondary)" />
                            <input type="text" placeholder="Rechercher un document..." className={styles.searchBar} />
                        </div>

                        <div className={styles.recordsGrid}>
                            {results.map((record) => (
                                <div key={record.id_resultat} className={styles.recordCard}>
                                    <div className={styles.cardHeader}>
                                        <Icons.FileText size={24} color="var(--primary)" />
                                        <span className={styles.fileType}>{record.type_test}</span>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <h3 className={styles.patientName}>{selectedPatient?.nom} {selectedPatient?.prenom}</h3>
                                        <p className={styles.subtitle}>{record.nom_labo}</p>
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <span className={styles.date}><Icons.Calendar size={14} /> {record.date_realisation}</span>
                                        <button className={styles.actionBtn}>Ouvrir</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={styles.accessSection}>
                        <div className={styles.emptyState}>
                            <Icons.Bell size={48} color="var(--border)" />
                            <p>Aucune nouvelle demande d'accès.</p>
                            <Button style={{ width: 'auto' }} onClick={() => setIsModalOpen(true)}>Faire une demande</Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Access Request Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Nouvelle Demande d'Accès</h2>
                            <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                                <Icons.X size={24} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            {!selectedPatientForRequest ? (
                                <>
                                    <p>Rechercher le patient par nom ou email :</p>
                                    <input
                                        type="text"
                                        placeholder="Nom, prénom ou email..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearchPatients(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                    {isSearching && <p>Recherche...</p>}
                                    <div className={styles.searchResults}>
                                        {searchResults.map(p => (
                                            <div
                                                key={p.id_patient}
                                                className={styles.resultItem}
                                                onClick={() => setSelectedPatientForRequest(p)}
                                            >
                                                <div className={styles.resultAvatar}>
                                                    {p.nom[0]}{p.prenom?.[0]}
                                                </div>
                                                <div className={styles.resultInfo}>
                                                    <div className={styles.resultName}>{p.nom} {p.prenom}</div>
                                                    <div className={styles.resultEmail}>{p.email}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {searchQuery.length > 2 && searchResults.length === 0 && !isSearching && (
                                            <p>Aucun patient trouvé.</p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className={styles.requestForm}>
                                    <div className={styles.selectedPatientBox}>
                                        <strong>Patient sélectionné :</strong>
                                        <p>{selectedPatientForRequest.nom} {selectedPatientForRequest.prenom}</p>
                                        <button onClick={() => setSelectedPatientForRequest(null)} className={styles.changeBtn}>Modifier</button>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Motif de la demande :</label>
                                        <textarea
                                            placeholder="Ex: Consultation initiale, Suivi hypertension..."
                                            value={requestMotif}
                                            onChange={(e) => setRequestMotif(e.target.value)}
                                            className={styles.textarea}
                                        />
                                    </div>
                                    <Button
                                        onClick={() => handleCreateAccessRequest(selectedPatientForRequest.id_patient, requestMotif)}
                                        disabled={!requestMotif.trim()}
                                    >
                                        Envoyer la demande
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Exam Modal */}
            {isExamModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsExamModalOpen(false)}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>Ajouter un Examen</h2>
                        </div>
                        <div className={styles.modalBody}>
                            {/* Simple form placeholder */}
                            <div className={styles.formGroup}>
                                <label>Type d'examen</label>
                                <Input placeholder="ex: NFS, Glycémie..." />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Laboratoire</label>
                                <Input placeholder="ex: Centre Pasteur" />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <Button variant="secondary" onClick={() => setIsExamModalOpen(false)}>Annuler</Button>
                                <Button onClick={() => setIsExamModalOpen(false)}>Enregistrer</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

