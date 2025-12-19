import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { api } from '@/lib/api';

interface TestResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    dossierId: number;
}

export function TestResultModal({ isOpen, onClose, onSuccess, dossierId }: TestResultModalProps) {
    const [formData, setFormData] = useState({
        type_test: '',
        nom_labo: '',
        date_realisation: new Date().toISOString().split('T')[0],
        description_resultat: ''
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
        if (!formData.type_test || !formData.date_realisation) {
            setError('Veuillez remplir les champs obligatoires');
            return;
        }

        setLoading(true);
        setError('');

        const payload = {
            id_dossier: dossierId,
            type_test: formData.type_test,
            nom_labo: formData.nom_labo,
            date_realisation: formData.date_realisation,
            description_resultat: formData.description_resultat
        };

        try {
            await api.createTestResult(payload);
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                type_test: '',
                nom_labo: '',
                date_realisation: new Date().toISOString().split('T')[0],
                description_resultat: ''
            });
        } catch (err) {
            console.error('Error creating test result:', err);
            setError('Erreur lors de l\'ajout');
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
                {loading ? 'Ajout...' : 'Ajouter le résultat'}
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Ajouter un résultat d'examen"
            footer={footer}
        >
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                    id="type_test"
                    label="Type de test *"
                    value={formData.type_test}
                    onChange={handleChange}
                    placeholder="Ex: Bilan sanguin, Radiographie thoracique, Échographie..."
                    required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        id="nom_labo"
                        label="Laboratoire / Établissement"
                        value={formData.nom_labo}
                        onChange={handleChange}
                        placeholder="Nom du laboratoire"
                    />
                    <Input
                        id="date_realisation"
                        label="Date de réalisation *"
                        type="date"
                        value={formData.date_realisation}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description_resultat" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Description / Résultats
                    </label>
                    <textarea
                        id="description_resultat"
                        value={formData.description_resultat}
                        onChange={handleChange}
                        placeholder="Saisir les résultats détaillés, valeurs, interprétation..."
                        style={{
                            width: '100%',
                            minHeight: '120px',
                            padding: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
}
