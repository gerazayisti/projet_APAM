import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { api } from '@/lib/api';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    appointment?: any;
    patients?: any[];
}

export function AppointmentModal({ isOpen, onClose, onSuccess, appointment, patients = [] }: AppointmentModalProps) {
    const [formData, setFormData] = useState({
        id_patient: '',
        id_pro_sante: '1', // Default to logged-in doctor
        date_rdv: '',
        time: '',
        type: 'Consultation',
        statut: 'planifie',
        motif: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (appointment) {
            const date = new Date(appointment.date_rdv);
            setFormData({
                id_patient: appointment.id_patient || '',
                id_pro_sante: appointment.id_pro_sante || '1',
                date_rdv: date.toISOString().split('T')[0],
                time: date.toTimeString().slice(0, 5),
                type: appointment.type || 'Consultation',
                statut: appointment.statut || 'planifie',
                motif: appointment.motif || ''
            });
        }
    }, [appointment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id || e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (!formData.id_patient || !formData.date_rdv || !formData.time) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setLoading(true);
        setError('');

        const dateTime = `${formData.date_rdv} ${formData.time}:00`;
        const payload = {
            id_patient: parseInt(formData.id_patient),
            id_pro_sante: parseInt(formData.id_pro_sante),
            date_rdv: dateTime,
            type: formData.type,
            statut: formData.statut,
            motif: formData.motif
        };

        try {
            if (appointment) {
                await api.updateAppointment(appointment.id_rdv, payload);
            } else {
                await api.createAppointment(payload);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error('Error saving appointment:', err);
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
                {loading ? 'Enregistrement...' : (appointment ? 'Mettre à jour' : 'Créer')}
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={appointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
            footer={footer}
        >
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label htmlFor="id_patient" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Patient *
                    </label>
                    <select
                        id="id_patient"
                        value={formData.id_patient}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '1rem'
                        }}
                        required
                    >
                        <option value="">Sélectionner un patient</option>
                        {patients.map(p => (
                            <option key={p.id_patient} value={p.id_patient}>
                                {p.nom} {p.prenom}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        id="date_rdv"
                        label="Date *"
                        type="date"
                        value={formData.date_rdv}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        id="time"
                        label="Heure *"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label htmlFor="type" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        >
                            <option>Consultation</option>
                            <option>Urgence</option>
                            <option>Suivi</option>
                            <option>Vaccination</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="statut" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Statut
                        </label>
                        <select
                            id="statut"
                            name="statut"
                            value={formData.statut}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="planifie">Planifié</option>
                            <option value="confirme">Confirmé</option>
                            <option value="termine">Terminé</option>
                            <option value="annule">Annulé</option>
                        </select>
                    </div>
                </div>

                <Input
                    id="motif"
                    label="Motif de consultation"
                    value={formData.motif}
                    onChange={handleChange}
                    placeholder="Ex: Contrôle annuel, douleurs abdominales..."
                />
            </div>
        </Modal>
    );
}
