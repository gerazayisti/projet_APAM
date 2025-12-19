# Structure du Projet AP.A.M - Interfaces

## Vue d'ensemble des Interfaces

Le projet AP.A.M comporte 3 interfaces principales :

1. **Interface Mobile** : Application React Native (Patient + Médecin)
2. **Interface Web** : Site web public pour les visiteurs
3. **Dashboard** : Interface web pour les professionnels de santé

---

## I. INTERFACE MOBILE (React Native Expo)

### Écrans - Patient

#### A. Authentification & Onboarding
1. **Splash Screen** - Écran de démarrage
2. **Onboarding 1** - Présentation de l'app
3. **Onboarding 2** - Fonctionnalités clés
4. **Onboarding 3** - Avantages de l'app
5. **Connexion** - Email/Mot de passe
6. **Inscription** - Création de compte
7. **Oubli mot de passe** - Réinitialisation
8. **Vérification email** - Code de confirmation

#### B. Accueil & Navigation
9. **Ecran d'accueil** - Dashboard patient
10. **Profil** - Informations personnelles
11. **Paramètres** - Configuration

#### C. Rendez-vous
12. **Prendre un rendez-vous** - Liste des médecins
13. **Détails médecin** - Profil et disponibilités
14. **Choisir créneau** - Calendrier des disponibilités
15. **Confirmation RDV** - Résumé du rendez-vous
16. **Mes rendez-vous** - Liste des RDV (à venir/passés)
17. **Détails RDV** - Informations complètes
18. **Annulation RDV** - Confirmation d'annulation

#### D. Consultations en ligne
19. **Consultations en ligne** - Liste des consultations
20. **Salle d'attente vidéo** - Avant la consultation
21. **Consultation vidéo** - Appel vidéo avec médecin
22. **Consultation chat** - Chat en direct
23. **Résumé consultation** - Transcription et notes

#### E. Journal de santé
24. **Journal de santé** - Liste des entrées
25. **Ajouter symptôme** - Formulaire de saisie
26. **Ajouter mesure** - Tension, poids, glycémie
27. **Ajouter note** - Notes personnelles
28. **Détails entrée** - Affichage d'une entrée
29. **Statistiques** - Graphiques de suivi

#### F. Médicaments
30. **Mes médicaments** - Liste des médicaments
31. **Ajouter médicament** - Formulaire de prescription
32. **Calendrier des prises** - Vue mensuelle
33. **Détails médicament** - Informations complètes
34. **Prise confirmée** - Confirmation de prise

#### G. Dossier médical
35. **Mon dossier médical** - Accès au dossier
36. **Antécédents médicaux** - Historique
37. **Allergies** - Liste des allergies
38. **Vaccinations** - Calendrier vaccinal
39. **Résultats de tests** - Analyses et radiographies
40. **Partager dossier** - Partage avec médecin

#### H. Notifications
41. **Notifications** - Liste des notifications
42. **Détails notification** - Voir une notification

#### I. Éducation santé
43. **Articles santé** - Liste des articles
44. **Détails article** - Lecture d'un article
45. **Vidéos éducatives** - Contenu vidéo
46. **FAQ** - Questions fréquentes

---

### Écrans - Médecin

#### A. Authentification & Onboarding
47. **Splash Screen Médecin** - Écran de démarrage
48. **Connexion Médecin** - Authentification
49. **Vérification licence** - Validation professionnelle
50. **Prise en main** - Onboarding médecin

#### B. Accueil & Navigation
51. **Dashboard Médecin** - Vue d'ensemble
52. **Profil Médecin** - Informations professionnelles
53. **Paramètres Médecin** - Configuration

#### C. Rendez-vous
54. **Mes rendez-vous** - Calendrier des RDV
55. **Liste des patients** - Aujourd'hui/Demain
56. **Détails patient** - Profil du patient
57. **Confirmer RDV** - Confirmation
58. **Notes de consultation** - Ajouter des notes

#### D. Consultations en ligne
59. **Consultations à venir** - Liste des consultations
60. **Salle d'attente** - Avant le rendez-vous
61. **Consultation vidéo** - Appel vidéo
62. **Consultation chat** - Chat en direct
63. **Fin de consultation** - Résumé et ordonnance

#### E. Dossiers patients
64. **Mes patients** - Liste des patients
65. **Consultation dossier** - Accès au dossier complet
66. **Historique consultations** - Anciennes consultations
67. **Résultats de tests** - Analyses du patient
68. **Prescrire médicament** - Émission d'ordonnance

#### F. Prescriptions
69. **Mes prescriptions** - Liste des ordonnances
70. **Créer prescription** - Nouvelle ordonnance
71. **Signature électronique** - Validation
72. **Partager prescription** - Envoi au patient

#### E. Planification
73. **Mon planning** - Calendrier personnel
74. **Gérer disponibilités** - Bloquer/créer créneaux
75. **Modifier horaires** - Changement d'horaires

#### F. Laboratoire & Tests
76. **Demander analyses** - Prescription de tests
77. **Résultats reçus** - Nouveaux résultats
78. **Interprétation** - Commentaires médicaux

#### G. Notifications
79. **Notifications Médecin** - Nouvelles demandes RDV
80. **Alertes urgentes** - Urgences patients

#### H. Statistiques & Rapports
81. **Statistiques consultations** - Graphiques
82. **Rapport d'activité** - Bilan mensuel
83. **Revenus** - Suivi financier

---

## II. INTERFACE WEB (Visiteur)

### Écrans Web Publics

1. **Accueil** - Page d'accueil du site
2. **À propos** - Présentation de l'application
3. **Fonctionnalités** - Avantages et services
4. **Tarifs** - Offres et prix
5. **Blog** - Articles de santé
6. **Contact** - Formulaire de contact
7. **FAQ** - Questions fréquentes
8. **Connexion** - Lien vers l'application mobile

---

## III. DASHBOARD ADMIN (Web)

### Écrans Dashboard Médecin

#### A. Authentification
1. **Connexion Dashboard** - Authentification sécurisée

#### B. Tableau de bord
2. **Dashboard principal** - Vue d'ensemble
3. **Statistiques globales** - Métriques clés

#### C. Gestion patients
4. **Liste patients** - Tous les patients
5. **Détails patient** - Vue complète
6. **Historique médical** - Consultation historique

#### D. Rendez-vous
7. **Calendrier global** - Tous les RDV
8. **Planification** - Gestion des créneaux

#### E. Prescriptions
9. **Gestion ordonnances** - Liste complète
10. **Pharmacie** - Base de données médicaments

#### F. Rapports
11. **Rapports médicaux** - Génération de rapports
12. **Export données** - Export des données

#### G. Paramètres
13. **Configuration** - Paramètres système
14. **Utilisateurs** - Gestion des comptes

---

## Navigation Mobile (Structure React Native Expo)

```
[Stack Navigation]
├── Auth Stack
│   ├── Splash
│   ├── Onboarding
│   ├── Login
│   ├── Register
│   └── ForgotPassword
│
├── Patient Stack (Tab Navigator)
│   ├── Home Tab
│   │   ├── Dashboard
│   │   ├── Rendez-vous
│   │   ├── Consultations
│   │   └── Articles
│   ├── Health Tab
│   │   ├── Journal Santé
│   │   ├── Dossier Médical
│   │   └── Médicaments
│   ├── Appointments Tab
│   │   ├── Mes RDV
│   │   ├── Prendre RDV
│   │   └── Historique
│   └── Profile Tab
│       ├── Profil
│       ├── Paramètres
│       └── Notifications
│
└── Doctor Stack (Tab Navigator)
    ├── Dashboard Tab
    │   ├── Aujourd'hui
    │   ├── Demain
    │   └── Statistiques
    ├── Patients Tab
    │   ├── Mes Patients
    │   ├── Nouveaux
    │   └── Recherche
    ├── Schedule Tab
    │   ├── Calendrier
    │   ├── Disponibilités
    │   └── Planification
    └── Profile Tab
        ├── Profil Médecin
        ├── Paramètres
        └── Rapports
```

---

## Technologies choisies

### Mobile (React Native Expo)
- **Framework** : React Native avec Expo
- **Navigation** : React Navigation (v6)
- **State Management** : Redux Toolkit + RTK Query
- **UI Components** : React Native Paper
- **Icons** : lucide react icon
- **Forms** : React Hook Form + Yup
- **HTTP Client** : Axios
- **Video** : React Native WebRTC
- **Notifications** : Expo Notifications

### Web (Visiteur)
- **Framework** : Next.js 14 (React)
- **Styling** : Tailwind CSS
- **UI Components** : Shadcn UI
- **Animation** : Framer Motion

### Dashboard (Web Admin)
- **Framework** : Next.js 14 (React)
- **Admin Panel** : React Admin
- **Charts** : Recharts
- **Tables** : TanStack Table
- **Forms** : React Hook Form

---

## Résumé des Écrans

### Interface Mobile Patient : **46 écrans**
### Interface Mobile Médecin : **37 écrans**
### Interface Web Visiteur : **8 pages**
### Dashboard Web Médecin : **14 écrans**

**Total : 105 écrans/pages**

