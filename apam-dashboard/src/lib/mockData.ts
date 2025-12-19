export const MOCK_PATIENTS = [
    {
        id_patient: 1,
        nom: "Martin",
        prenom: "Sophie",
        email: "sophie.martin@email.com",
        telephone: "0612345678",
        date_nais: "1995-05-15",
        groupe_sang: "A+",
        taille: 165,
        poids: 60,
        allergies: "Pénicilline",
        nom_urgence: "Martin Pierre",
        tel_urgence: "0687654321",
        relation_urgence: "Père"
    },
    {
        id_patient: 2,
        nom: "Dupont",
        prenom: "Jean",
        email: "jean.dupont@email.com",
        telephone: "0623456789",
        date_nais: "1980-11-20",
        groupe_sang: "O-",
        taille: 180,
        poids: 85,
        allergies: "Aucune",
        nom_urgence: "Dupont Marie",
        tel_urgence: "0676543210",
        relation_urgence: "Épouse"
    }
];

export const MOCK_DOSSIERS = [
    {
        id_dossier: 1,
        id_patient: 1,
        antecedent_familiaux: "Diabète type 2 (Mère)",
        vaccinations: "BCG, DTP, Hépatite B",
        historique_hospitalisation: "Appendicectomie en 2012",
        chirurgies: "Appendicectomie",
        allergies: "Pénicilline"
    }
];

export const MOCK_RDVS = [
    {
        id_rdv: 1,
        id_patient: 1,
        id_pro_sante: 1,
        date_rdv: "2025-12-18T14:30:00",
        type: "Consultation",
        statut: "confirme",
        motif: "Suivi annuel"
    },
    {
        id_rdv: 2,
        id_patient: 2,
        id_pro_sante: 1,
        date_rdv: "2025-12-18T16:00:00",
        type: "Téléconsultation",
        statut: "planifie",
        motif: "Renouvellement ordonnance"
    }
];

export const MOCK_PRESCRIPTIONS = [
    {
        id_prescription: 1,
        id_patient: 1,
        id_pro_sante: 1,
        date_prescription: "2025-12-10",
        date_expiration: "2026-06-10",
        ordonnance: "Doliprane 1000mg, 3 fois par jour pendant 5 jours."
    }
];

export const MOCK_RESULTATS = [
    {
        id_resultat: 1,
        id_dossier: 1,
        type_test: "Prise de sang",
        date_realisation: "2024-11-20",
        nom_labo: "Laboratoire BioSafe",
        description_resultat: "Glycémie à jeun: 0.95 g/L (Normal)",
        fichier_joint: "resultat_sang_1120.pdf"
    }
];

export const MOCK_JOURNAL = [
    {
        id_entree: 1,
        id_patient: 1,
        type: "Douleur",
        description: "Légère migraine le matin",
        niveau_douleur: 3,
        pieces_jointes: null
    }
];
