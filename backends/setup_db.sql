-- AP.A.M Database Setup Script
-- Database: TP311
-- Description: Complete schema for the AP.A.M medical platform

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS TP311 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE TP311;

-- ========================================
-- PATIENT Table
-- ========================================
CREATE TABLE IF NOT EXISTS PATIENT (
    id_patient INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('patient', 'admin') NOT NULL DEFAULT 'patient',
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    date_nais DATE,
    pwd_hash VARCHAR(255) NOT NULL,
    groupe_sang VARCHAR(5) DEFAULT 'N/A',
    taille INT DEFAULT 0,
    poids DECIMAL(5,2) DEFAULT 0,
    allergies TEXT,
    nom_urgence VARCHAR(100),
    tel_urgence VARCHAR(20),
    relation_urgence VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_nom (nom)
) ENGINE=InnoDB;

-- ========================================
-- PRO_SANTE Table (Healthcare Professionals)
-- ========================================
CREATE TABLE IF NOT EXISTS PRO_SANTE (
    id_pro INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    num_licence VARCHAR(50) UNIQUE,
    specialite VARCHAR(100),
    etablissement VARCHAR(200),
    tarifs VARCHAR(50),
    pwd_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_licence (num_licence)
) ENGINE=InnoDB;

-- ========================================
-- DOSSIER_MEDICAL Table
-- ========================================
CREATE TABLE IF NOT EXISTS DOSSIER_MEDICAL (
    id_dossier INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    antecedent_familiaux TEXT,
    antecedent_personnels TEXT,
    vaccinations TEXT,
    chirurgies TEXT,
    allergies TEXT,
    maladies_chroniques TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_patient) REFERENCES PATIENT(id_patient) ON DELETE CASCADE,
    INDEX idx_patient (id_patient)
) ENGINE=InnoDB;

-- ========================================
-- RDV Table (Appointments)
-- ========================================
CREATE TABLE IF NOT EXISTS RDV (
    id_rdv INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    id_pro_sante INT NOT NULL,
    date_rdv DATETIME NOT NULL,
    type VARCHAR(50) DEFAULT 'Consultation',
    statut ENUM('planifie', 'confirme', 'termine', 'annule') DEFAULT 'planifie',
    motif TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_patient) REFERENCES PATIENT(id_patient) ON DELETE CASCADE,
    FOREIGN KEY (id_pro_sante) REFERENCES PRO_SANTE(id_pro) ON DELETE CASCADE,
    INDEX idx_date (date_rdv),
    INDEX idx_patient (id_patient),
    INDEX idx_pro (id_pro_sante),
    INDEX idx_statut (statut)
) ENGINE=InnoDB;

-- ========================================
-- PRESCRIPTION Table
-- ========================================
CREATE TABLE IF NOT EXISTS PRESCRIPTION (
    id_prescription INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    id_pro_sante INT NOT NULL,
    date_prescription DATE NOT NULL,
    date_expiration DATE,
    ordonnance TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_patient) REFERENCES PATIENT(id_patient) ON DELETE CASCADE,
    FOREIGN KEY (id_pro_sante) REFERENCES PRO_SANTE(id_pro) ON DELETE CASCADE,
    INDEX idx_patient (id_patient),
    INDEX idx_date (date_prescription)
) ENGINE=InnoDB;

-- ========================================
-- RESULTAT_TEST Table
-- ========================================
CREATE TABLE IF NOT EXISTS RESULTAT_TEST (
    id_resultat INT AUTO_INCREMENT PRIMARY KEY,
    id_dossier INT NOT NULL,
    type_test VARCHAR(100) NOT NULL,
    nom_labo VARCHAR(200),
    date_realisation DATE NOT NULL,
    description_resultat TEXT,
    fichier_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_dossier) REFERENCES DOSSIER_MEDICAL(id_dossier) ON DELETE CASCADE,
    INDEX idx_dossier (id_dossier),
    INDEX idx_date (date_realisation)
) ENGINE=InnoDB;

-- ========================================
-- JOURNAL_SANTE Table (Health Journal)
-- ========================================
CREATE TABLE IF NOT EXISTS JOURNAL_SANTE (
    id_entree INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    date_entree DATETIME DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    niveau_douleur INT CHECK (niveau_douleur BETWEEN 0 AND 10),
    humeur VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_patient) REFERENCES PATIENT(id_patient) ON DELETE CASCADE,
    INDEX idx_patient (id_patient),
    INDEX idx_date (date_entree)
) ENGINE=InnoDB;

-- ========================================
-- MEDICAMENT Table
-- ========================================
CREATE TABLE IF NOT EXISTS MEDICAMENT (
    id_medicament INT AUTO_INCREMENT PRIMARY KEY,
    nom_commercial VARCHAR(200) NOT NULL,
    substance_active VARCHAR(200),
    dosage VARCHAR(100),
    forme VARCHAR(50),
    fabricant VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_nom (nom_commercial)
) ENGINE=InnoDB;

-- ========================================
-- SUIVI_MEDICAMENT Table
-- ========================================
CREATE TABLE IF NOT EXISTS SUIVI_MEDICAMENT (
    id_suivi INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    id_medicament INT NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE,
    frequence VARCHAR(100),
    pris BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_patient) REFERENCES PATIENT(id_patient) ON DELETE CASCADE,
    FOREIGN KEY (id_medicament) REFERENCES MEDICAMENT(id_medicament) ON DELETE CASCADE,
    INDEX idx_patient (id_patient),
    INDEX idx_medicament (id_medicament)
) ENGINE=InnoDB;

-- ========================================
-- MESSAGE Table (Chat/Messaging System)
-- ========================================
CREATE TABLE IF NOT EXISTS MESSAGE (
    id_message INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_sender (sender_id),
    INDEX idx_receiver (receiver_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- ========================================
-- ACCESS_REQUEST Table (Medical Record Access)
-- ========================================
CREATE TABLE IF NOT EXISTS ACCESS_REQUEST (
    id_request INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    id_pro_sante INT NOT NULL,
    statut ENUM('pending', 'approved', 'denied') DEFAULT 'pending',
    motif TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_patient) REFERENCES PATIENT(id_patient) ON DELETE CASCADE,
    FOREIGN KEY (id_pro_sante) REFERENCES PRO_SANTE(id_pro) ON DELETE CASCADE,
    INDEX idx_patient (id_patient),
    INDEX idx_pro (id_pro_sante),
    INDEX idx_statut (statut)
) ENGINE=InnoDB;

-- ========================================
-- NOTIFICATION Table
-- ========================================
CREATE TABLE IF NOT EXISTS NOTIFICATION (
    id_notification INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('rdv', 'message', 'access_request', 'prescription', 'other') DEFAULT 'other',
    title VARCHAR(200) NOT NULL,
    content TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- ========================================
-- CONSULTATION Table (Doctor-Patient Relationship)
-- ========================================
CREATE TABLE IF NOT EXISTS CONSULTATION (
    id_consultation INT AUTO_INCREMENT PRIMARY KEY,
    id_patient INT NOT NULL,
    id_pro_sante INT NOT NULL,
    date_debut DATE NOT NULL,
    statut ENUM('active', 'terminee') DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_patient) REFERENCES PATIENT(id_patient) ON DELETE CASCADE,
    FOREIGN KEY (id_pro_sante) REFERENCES PRO_SANTE(id_pro) ON DELETE CASCADE,
    INDEX idx_patient (id_patient),
    INDEX idx_pro (id_pro_sante),
    INDEX idx_statut (statut),
    UNIQUE KEY unique_active_consultation (id_patient, id_pro_sante, statut)
) ENGINE=InnoDB;
