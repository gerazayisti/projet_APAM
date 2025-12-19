import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { api } from '@/lib/api';

interface PatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    patient?: any;
}

export function PatientModal({ isOpen, onClose, onSuccess, patient }: PatientModalProps) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        date_nais: '',
        groupe_sang: '',
        taille: '',
        poids: '',
        allergies: '',
        nom_urgence: '',
        tel_urgence: '',
        relation_urgence: '',
        pwd_hash: 'patient123' // Default password
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (patient) {
            setFormData({
                nom: patient.nom || '',
                prenom: patient.prenom || '',
                email: patient.email || '',
                telephone: patient.telephone || '',
                date_nais: patient.date_nais || '',
                groupe_sang: patient.groupe_sang || '',
                taille: patient.taille || '',
                poids: patient.poids || '',
                allergies: patient.allergies || '',
                nom_urgence: patient.nom_urgence || '',
                tel_urgence: patient.tel_urgence || '',
                relation_urgence: patient.relation_urgence || '',
                pwd_hash: 'patient123'
            });
        }
    }, [patient]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            if (patient) {
                await api.updatePatient(patient.id_patient, formData);
            } else {
                await api.createPatient(formData);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error saving patient:', err);
            setError('Erreur lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <>
            <Button variant="secondary" onClick={onClose}>
                Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Enregistrement...' : (patient ? 'Mettre à jour' : 'Créer')}
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={patient ? 'Modifier le patient' : 'Nouveau patient'}
            footer={footer}
            maxWidth="700px"
        >
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                    id="nom"
                    label="Nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                />
                <Input
                    id="prenom"
                    label="Prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                />
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    id="telephone"
                    label="Téléphone"
                    value={formData.telephone}
                    onChange={handleChange}
                />
                <Input
                    id="date_nais"
                    label="Date de naissance"
                    type="date"
                    value={formData.date_nais}
                    onChange={handleChange}
                />
                <Input
                    id="groupe_sang"
                    label="Groupe sanguin"
                    value={formData.groupe_sang}
                    onChange={handleChange}
                    placeholder="A+, O-, etc."
                />
                <Input
                    id="taille"
                    label="Taille (cm)"
                    type="number"
                    value={formData.taille}
                    onChange={handleChange}
                />
                <Input
                    id="poids"
                    label="Poids (kg)"
                    type="number"
                    value={formData.poids}
                    onChange={handleChange}
                />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <Input
                    id="allergies"
                    label="Allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="Pénicilline, Arachides, etc."
                />
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
                Contact d'urgence
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <Input
                    id="nom_urgence"
                    label="Nom"
                    value={formData.nom_urgence}
                    onChange={handleChange}
                />
                <Input
                    id="tel_urgence"
                    label="Téléphone"
                    value={formData.tel_urgence}
                    onChange={handleChange}
                />
                <Input
                    id="relation_urgence"
                    label="Relation"
                    value={formData.relation_urgence}
                    onChange={handleChange}
                    placeholder="Conjoint, Parent, etc."
                />
            </div>
        </Modal>
    );
}
