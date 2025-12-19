import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { api } from '@/lib/api';

interface PrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    patientId: number;
}

export function PrescriptionModal({ isOpen, onClose, onSuccess, patientId }: PrescriptionModalProps) {
    const [formData, setFormData] = useState({
        date_prescription: new Date().toISOString().split('T')[0],
        date_expiration: '',
        ordonnance: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        if (!formData.ordonnance) {
            setError('Veuillez saisir l\'ordonnance');
            return;
        }

        setLoading(true);
        setError('');

        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const id_pro_sante = user?.id_pro || 1;

        const payload = {
            id_patient: patientId,
            id_pro_sante,
            date_prescription: formData.date_prescription,
            date_expiration: formData.date_expiration || null,
            ordonnance: formData.ordonnance
        };

        try {
            await api.createPrescription(payload);
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                date_prescription: new Date().toISOString().split('T')[0],
                date_expiration: '',
                ordonnance: ''
            });
        } catch (err) {
            console.error('Error creating prescription:', err);
            setError('Erreur lors de la création');
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
                {loading ? 'Création...' : 'Créer l\'ordonnance'}
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nouvelle prescription"
            footer={footer}
        >
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        id="date_prescription"
                        label="Date de prescription"
                        type="date"
                        value={formData.date_prescription}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        id="date_expiration"
                        label="Date d'expiration"
                        type="date"
                        value={formData.date_expiration}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="ordonnance" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Ordonnance *
                    </label>
                    <textarea
                        id="ordonnance"
                        value={formData.ordonnance}
                        onChange={handleChange}
                        placeholder="Ex: Paracétamol 1g - 3x par jour pendant 7 jours&#10;Ibuprofène 400mg - Si douleur intense"
                        style={{
                            width: '100%',
                            minHeight: '150px',
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                        required
                    />
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0' }}>
                    💡 Conseil: Soyez précis sur les dosages, la fréquence et la durée du traitement.
                </p>
            </div>
        </Modal>
    );
}
