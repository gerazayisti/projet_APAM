# 📱 AP.A.M Mobile - Application de Dossier Médical Partagé

Bienvenue sur le dépôt de l'application mobile **AP.A.M** (Application Patient-Médecin), une solution complète pour la gestion de la santé et la téléconsultation.

Cette application permet de connecter les patients et les médecins via une interface sécurisée, moderne et intuitive.

## ✨ Fonctionnalités Principales

### 🏥 Espace Patient
*   **Tableau de Bord Santé :** Suivi des constantes vitales (Tension, Glycémie, Poids) et journal des événements.
*   **Carnet de Santé Virtuel :** Accès centralisé aux antécédents, allergies, ordonnances et résultats d'examens.
    *   *Sécurité :* Le carnet est en lecture seule pour le patient. Seuls les médecins autorisés peuvent le modifier.
*   **Prise de Rendez-vous :** Gestion des consultations à venir et passées.
*   **Téléconsultation :** Appels vidéo et audio intégrés pour consulter son médecin à distance.
*   **Gestion des Accès :** Contrôle total sur quels médecins ont le droit d'accéder et de modifier le dossier médical.

### 👨‍⚕️ Espace Médecin
*   **Dashboard Professionnel :** Vue d'ensemble de l'activité (Patients du jour, Demandes en attente).
*   **Gestion des Patients :** Liste filtrable (Critique, Attention) pour un suivi efficace.
*   **Mode Consultation Active :** Interface immersive pour la téléconsultation avec résumé du patient (Vitals, Allergies) affiché en temps réel.
*   **Éditeur d'Ordonnance :** Outil rapide pour créer, signer et envoyer des ordonnances numériques.
*   **Gestion du Dossier Médical :**
    *   Demande d'autorisation d'accès au patient.
    *   Édition de l'historique et des allergies (une fois autorisé).
*   **Prise de Notes :** Éditeur de texte avec modèles rapides (Grippe, Bilan annuel, etc.).
*   **Inscription & Validation :** Processus d'inscription dédié avec vérification du numéro RPPS/Licence.

## 🛠 Technologies Utilisées

*   **Framework :** [React Native](https://reactnative.dev/) avec [Expo](https://expo.dev/) (SDK 54).
*   **Langage :** TypeScript.
*   **Navigation :** Expo Router.
*   **UI/UX :** React Native Paper (Material Design).
*   **Formulaires :** React Hook Form + Yup.
*   **Gestion d'état :** Redux Toolkit (prévu).

## 🚀 Installation et Démarrage

Suivez ces étapes pour installer et lancer l'application sur votre machine.

### Prérequis
*   [Node.js](https://nodejs.org/) installé sur votre machine.
*   L'application **Expo Go** installée sur votre téléphone (iOS ou Android).

### 1. Cloner le projet
```bash
git clone <votre-url-repo>
cd apam-mobile
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npx expo start
```

> **Note :** Si vous rencontrez des problèmes de connexion (erreur "failed to download remote update" ou timeout), utilisez l'option tunnel :
> ```bash
> npx expo start --tunnel
> ```

### 4. Tester sur votre téléphone
Scannez le **QR Code** qui s'affiche dans le terminal avec :
*   L'appareil photo (iOS).
*   L'application Expo Go (Android).

## 📱 Structure du Projet

*   `app/` : Routes et écrans de l'application (Expo Router).
    *   `(auth)/` : Écrans d'authentification (Login, Register).
    *   `(patient)/` : Espace Patient (Tabs: Accueil, Santé, RDV, Profil).
    *   `(doctor)/` : Espace Médecin (Tabs: Dashboard, Patients, Planning).
*   `components/` : Composants réutilisables.
*   `theme/` : Configuration du design (Couleurs, Typographie).
*   `assets/` : Images et ressources statiques.

---
*Développé pour le projet AP.A.M.*
