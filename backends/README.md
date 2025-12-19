# AP.A.M Backend

Backend Flask/MySQL pour la plateforme AP.A.M.

## Installation

### 1. Installer les dépendances Python
```bash
pip install -r requirements.txt
```

### 2. Configurer MySQL
Assurez-vous que MySQL est installé et en cours d'exécution.

### 3. Créer la base de données
```bash
mysql -u root -p < setup_db.sql
```

### 4. Configuration
Copiez `.env.example` vers `.env` et modifiez selon votre configuration :
```bash
cp .env.example .env
```

## Lancement

```bash
python app.py
```

Le serveur démarre sur `http://localhost:5000`

## Endpoints API

### Authentification
- `POST /login` - Connexion patient/professionnel

### Patients
- `GET /patient` - Liste des patients (avec recherche ?q=)
- `GET /patient/<id>` - Détails d'un patient
- `POST /patient` - Créer un patient
- `PUT /patient/<id>` - Modifier un patient
- `DELETE /patient/<id>` - Supprimer un patient

### Rendez-vous
- `GET /rdv` - Liste des RDV
- `POST /rdv` - Créer un RDV
- `PUT /rdv/<id>` - Modifier un RDV
- `DELETE /rdv/<id>` - Supprimer un RDV

### Dossiers Médicaux
- `GET /dossier/<patient_id>` - Dossier médical d'un patient
- `PUT /dossier/<id>` - Modifier un dossier

### Prescriptions
- `POST /prescription` - Créer une prescription
- `GET /prescription/<patient_id>` - Prescriptions d'un patient
- `DELETE /prescription/<id>` - Supprimer une prescription

### Résultats de Tests
- `POST /resultat_test` - Ajouter un résultat
- `DELETE /resultat_test/<id>` - Supprimer un résultat

### Statistiques
- `GET /stats` - Stats dashboard (total patients, RDV à venir)

### Professionnels
- `GET /pro_sante/<id>` - Profil professionnel
- `PUT /pro_sante/<id>` - Modifier profil

### Messagerie
- `GET /conversations/<user_id>` - Liste des conversations d'un utilisateur
- `GET /messages/<convo_id>` - Liste des messages d'une conversation
- `POST /messages` - Envoyer un nouveau message
- `PUT /messages/<id>/read` - Marquer un message comme lu

### Demandes d'Accès & Consultations
- `GET /access-request/doctor/<id>` - Liste des demandes d'accès d'un médecin
- `GET /access-request/patient/<id>` - Liste des demandes pour un patient
- `POST /access-request` - Créer une nouvelle demande d'accès
- `PUT /access-request/<id>` - Approuver/Refuser une demande (Crée une consultation si approuvé)
- `GET /doctor-patients/<id>` - Liste des patients actifs (sous consultation) d'un médecin
- `GET /check-consultation` - Vérifier si un médecin a accès à un patient
- `POST /consultation` - Créer manuellement une consultation
