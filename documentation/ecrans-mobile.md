# Écrans Mobile - AP.A.M (React Native Expo)

## 📱 INTERFACE PATIENT (46 écrans)

### 1️⃣ AUTHENTIFICATION & ONBOARDING (8 écrans)
1. **Splash Screen** - Logo et chargement initial
2. **Onboarding 1** - "Bienvenue dans AP.A.M"
3. **Onboarding 2** - "Prenez rendez-vous facilement"
4. **Onboarding 3** - "Consultez en ligne"
5. **Connexion** - Email / Mot de passe
6. **Inscription** - Création de compte patient
7. **Mot de passe oublié** - Réinitialisation
8. **Vérification email** - Code de confirmation

### 2️⃣ ACCUEIL & PROFIL (3 écrans)
9. **Accueil / Dashboard** - Vue d'ensemble du patient
10. **Mon Profil** - Informations personnelles, groupe sanguin, allergies
11. **Paramètres** - Langue, notifications, confidentialité

### 3️⃣ GESTION DES RENDEZ-VOUS (7 écrans)
12. **Prendre un rendez-vous** - Liste des médecins disponibles
13. **Filtres médecins** - Spécialité, localisation, prix
14. **Profil médecin** - Spécialité, avis, disponibilités
15. **Sélection créneau** - Calendrier avec créneaux libres
16. **Confirmation RDV** - Récapitulatif et validation
17. **Mes rendez-vous** - Liste (à venir / passés)
18. **Détails RDV** - Informations complètes + option annulation

### 4️⃣ CONSULTATIONS EN LIGNE (5 écrans)
19. **Consultations** - Liste des consultations programmées
20. **Salle d'attente** - Avant la vidéoconférence
21. **Consultation vidéo** - Appel vidéo avec médecin (WebRTC)
22. **Consultation chat** - Chat en temps réel
23. **Résumé consultation** - Transcription, prescriptions, notes

### 5️⃣ JOURNAL DE SANTÉ (6 écrans)
24. **Journal de santé** - Liste des entrées par date
25. **Ajouter symptôme** - Formulaire avec niveau de douleur
26. **Ajouter mesure** - Tension, poids, glycémie, température
27. **Ajouter note** - Notes personnelles libres
28. **Détails entrée** - Affichage complet d'une entrée
29. **Statistiques santé** - Graphiques d'évolution

### 6️⃣ GESTION DES MÉDICAMENTS (5 écrans)
30. **Mes médicaments** - Liste des traitements
31. **Ajouter médicament** - Scan code-barres ou saisie manuelle
32. **Calendrier des prises** - Vue mensuelle avec rappels
33. **Détails médicament** - Posologie, interactions, effets
34. **Historique des prises** - Suivi de l'observance

### 7️⃣ DOSSIER MÉDICAL (6 écrans)
35. **Mon dossier médical** - Accès au dossier complet
36. **Antécédents médicaux** - Historique complet
37. **Allergies** - Liste détaillée des allergies
38. **Vaccinations** - Calendrier vaccinal avec rappels
39. **Résultats de tests** - Analyses, radiographies, PDF
40. **Partager dossier** - QR code ou lien sécurisé

### 8️⃣ NOTIFICATIONS (2 écrans)
41. **Notifications** - Liste des notifications (RDV, médicaments, tests)
42. **Détails notification** - Affichage complet d'une notification

### 9️⃣ ÉDUCATION SANTÉ (4 écrans)
43. **Articles santé** - Liste des articles éducatifs
44. **Détails article** - Lecture d'un article complet
45. **Vidéos éducatives** - Contenu vidéo santé
46. **FAQ** - Questions fréquentes et réponses

---

## 🩺 INTERFACE MÉDECIN (37 écrans)

### 1️⃣ AUTHENTIFICATION MÉDECIN (4 écrans)
47. **Splash Screen Médecin** - Logo médical
48. **Connexion Médecin** - Email / Mot de passe / Licence
49. **Vérification licence** - Validation du numéro d'ordre
50. **Prise en main** - Onboarding professionnel

### 2️⃣ ACCUEIL & PROFIL (3 écrans)
51. **Dashboard Médecin** - Vue d'ensemble (RDV du jour, patients, revenus)
52. **Profil Médecin** - Informations professionnelles, spécialité
53. **Paramètres Médecin** - Configuration du compte et notifications

### 3️⃣ GESTION DES RENDEZ-VOUS (5 écrans)
54. **Mes rendez-vous** - Calendrier de la semaine avec vue liste/jour/semaine
55. **Liste des patients** - Patients du jour (matin/après-midi)
56. **Détails patient** - Profil patient complet depuis le RDV
57. **Confirmer RDV** - Modification du statut d'un RDV
58. **Notes de consultation** - Ajouter notes post-consultation

### 4️⃣ CONSULTATIONS EN LIGNE (5 écrans)
59. **Consultations à venir** - Liste des téléconsultations programmées
60. **Salle d'attente vidéo** - Attendre que le patient se connecte
61. **Consultation vidéo** - Appel vidéo avec le patient (WebRTC)
62. **Consultation chat** - Chat en direct avec le patient
63. **Fin consultation** - Rédaction ordonnance, notes, transmission

### 5️⃣ DOSSIERS PATIENTS (5 écrans)
64. **Mes patients** - Liste complète de tous les patients
65. **Consultation dossier** - Accès au dossier médical complet
66. **Historique consultations** - Anciennes consultations avec le patient
67. **Résultats de tests** - Analyses, radiographies, examens
68. **Prescrire médicament** - Création d'ordonnance électronique

### 6️⃣ PRESCRIPTIONS (4 écrans)
69. **Mes prescriptions** - Liste des ordonnances délivrées
70. **Créer prescription** - Formulaire de prescription
71. **Signature électronique** - Validation et cryptage
72. **Partager prescription** - Envoi sécurisé au patient/pharmacie

### 7️⃣ PLANIFICATION (3 écrans)
73. **Mon planning** - Calendrier personnel avec indisponibilités
74. **Gérer disponibilités** - Bloquer des créneaux / créer disponibilités
75. **Modifier horaires** - Changer les horaires de consultation

### 8️⃣ LABORATOIRE & TESTS (3 écrans)
76. **Demander analyses** - Prescription de tests médicaux
77. **Résultats reçus** - Notification et affichage des nouveaux résultats
78. **Interprétation** - Ajouter des commentaires médicaux aux résultats

### 9️⃣ NOTIFICATIONS MÉDECIN (2 écrans)
79. **Notifications Médecin** - Nouvelles demandes RDV, urgences
80. **Alertes urgentes** - Notifications prioritaires patients

### 🔟 STATISTIQUES & RAPPORTS (3 écrans)
81. **Statistiques consultations** - Graphiques mensuels, paiements
82. **Rapport d'activité** - Bilan de consultations
83. **Revenus** - Suivi financier et paiements