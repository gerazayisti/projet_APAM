# AP.A.M Dashboard - Portail Professionnel de Santé

## 📝 Description du Projet
AP.A.M (Application d'Assistance Médicale) est une plateforme de santé numériques. Le Dashboard est l'interface centrale destinée aux professionnels de santé (médecins, infirmiers, pharmaciens) pour gérer efficacement les patients, consulter les carnets médicaux digitaux et communiquer en temps réel.

## 🚀 Procédure d'Installation

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- Serveur Backend AP.A.M en cours d'exécution (Flask + MySQL)

### Étapes
1. **Accéder au répertoire :**
   ```bash
   cd apam-dashboard
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configurer l'API :**
   Vérifiez que le fichier `src/lib/api.ts` pointe vers l'URL correcte de votre serveur backend (par défaut : `http://localhost:5000`).

4. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

5. **Accéder à l'application :**
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ✅ Fonctionnalités Implémentées

### 👨‍⚕️ Gestion des Patients
- **Liste Dynamique :** Affichage des patients ayant une consultation active avec le professionnel connecté.
- **Détails Patients :** Modal affichant les informations personnelles, contacts d'urgence et résumé médical.
- **Recherche :** Filtrage instantané des patients par nom ou email.

### 📋 Carnet Médical Digital (Records)
- **Visualisation :** Accès au carnet de santé physique (version digitale) avec antécédents, vaccinations et allergies.
- **Gestion des Accès :** Système de demande d'autorisation permettant au médecin de solliciter l'accès au carnet d'un patient.
- **Recherche de Patients :** Module de recherche global pour initier de nouvelles demandes d'accès.
- **Édition :** Interface dédiée pour mettre à jour les informations du carnet, ajouter des prescriptions et des résultats d'examens (pour les patients autorisés).

### 💬 Messagerie
- **Interface Moderne :** Design inspiré de WhatsApp Web aux couleurs de la plateforme (Bleu AP.A.M).
- **Temps Réel :** Envoi et réception de messages avec les patients.
- **Nouvelle Conversation :** Bouton flottant (FAB) permettant d'initier une discussion avec n'importe quel patient de sa liste de consultation.

---

## 🛠️ Ce qui reste à faire (Roadmap)

### 🔗 Intégration Blockchain (Priorité Haute)
- **Sécurisation des Données :** Intégration d'un module de Blockchain (ex: Hyperledger Fabric ou Ethereum) pour garantir l'immuabilité et l'intégrité des dossiers médicaux.
- **Gestion des Consentements :** Enregistrement des autorisations d'accès sur le registre partagé (Smart Contracts) pour une protection maximale de la vie privée.
- **Audit des Actions :** Historique infalsifiable de toutes les consultations et modifications effectuées sur les carnets de santé.

### 📂 Autres Améliorations
- **Téléconsultation :** Intégration du module WebRTC pour les appels vidéo.
- **Notifications Push :** Alertes directes sur le dashboard pour les nouveaux messages et urgences.
- **Gestion des Pharmacies :** Extension du module prescription pour une validation directe en officine.

---

## 🛠️ Technologies Utilisées
- **Framework :** Next.js (App Router)
- **Langage :** TypeScript
- **Style :** CSS Modules (Vanilla CSS)
- **Icônes :** Lucide / Icons personnalisés
- **Communication API :** Fetch API
