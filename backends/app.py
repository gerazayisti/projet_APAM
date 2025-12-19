from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import logging

app = Flask(__name__)
# Enable CORS for Next.js dashboard and Mobile App
CORS(app)

# Database Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'apam_user'
app.config['MYSQL_PASSWORD'] = 'password123'
app.config['MYSQL_DB'] = 'TP311'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# Configure Logging
logging.basicConfig(level=logging.INFO)

# --- Error Handlers --- 
@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.error(f"Error: {str(e)}")
    return jsonify({"error": "Une erreur interne est survenue", "details": str(e)}), 500

# --- AUTHENTICATION ---
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password') # In a real app, use check_password_hash

    cur = mysql.connection.cursor()
    # Check in PATIENT table
    cur.execute("SELECT *, 'patient' as role FROM PATIENT WHERE email=%s AND pwd_hash=%s", (email, password))
    user = cur.fetchone()

    if not user:
        # Check in PRO_SANTE (joining with a potential UTILISATEUR table if exists, or just MOCK)
        # For now, let's assume a simplified check or a mock for Doctor
        if email.startswith('dr.'):
             user = {"email": email, "role": "doctor", "nom": "Watson", "id_pro": 1}
        else:
            return jsonify({"message": "Identifiants invalides"}), 401

    cur.close()
    return jsonify({"message": "Connexion réussie", "user": user}), 200

# --- PATIENT ENDPOINTS ---
@app.route('/patient', methods=['POST'])
def create_patient():
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO PATIENT (
                type, nom, prenom, email, telephone,
                date_nais, pwd_hash,
                groupe_sang, taille, poids, allergies,
                nom_urgence, tel_urgence, relation_urgence
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            'patient', data['nom'], data['prenom'], data['email'],
            data['telephone'], data['date_nais'], data['pwd_hash'],
            data.get('groupe_sang', 'N/A'), data.get('taille', 0), data.get('poids', 0),
            data.get('allergies', 'Aucune'), data.get('nom_urgence', ''),
            data.get('tel_urgence', ''), data.get('relation_urgence', '')
        ))
        mysql.connection.commit()
        patient_id = cur.lastrowid
        cur.close()
        return jsonify({"message": "Patient créé avec succès", "id_patient": patient_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/patient', methods=['GET'])
def get_patients():
    query = request.args.get('q', '')
    cur = mysql.connection.cursor()
    if query:
        cur.execute("SELECT * FROM PATIENT WHERE nom LIKE %s OR email LIKE %s", (f"%{query}%", f"%{query}%"))
    else:
        cur.execute("SELECT * FROM PATIENT")
    patients = cur.fetchall()
    cur.close()
    return jsonify(patients)

@app.route('/patient/<int:id>', methods=['GET'])
def get_patient(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM PATIENT WHERE id_patient=%s", (id,))
    patient = cur.fetchone()
    cur.close()
    if not patient:
        return jsonify({"message": "Patient introuvable"}), 404
    return jsonify(patient)

@app.route('/patient/<int:id>', methods=['PUT'])
def update_patient(id):
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE PATIENT SET
                nom=%s, prenom=%s, email=%s, telephone=%s,
                date_nais=%s, groupe_sang=%s, taille=%s, poids=%s,
                allergies=%s, nom_urgence=%s, tel_urgence=%s, relation_urgence=%s
            WHERE id_patient=%s
        """, (
            data.get('nom'), data.get('prenom'), data.get('email'), data.get('telephone'),
            data.get('date_nais'), data.get('groupe_sang'), data.get('taille'), data.get('poids'),
            data.get('allergies'), data.get('nom_urgence'), data.get('tel_urgence'), 
            data.get('relation_urgence'), id
        ))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Patient mis à jour"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/patient/<int:id>', methods=['DELETE'])
def delete_patient(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM PATIENT WHERE id_patient=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Patient supprimé"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- DASHBOARD STATS ---
@app.route('/stats', methods=['GET'])
def get_dashboard_stats():
    cur = mysql.connection.cursor()
    cur.execute("SELECT COUNT(*) as total FROM PATIENT")
    total_patients = cur.fetchone()['total']
    
    cur.execute("SELECT COUNT(*) as total FROM RDV WHERE date_rdv >= CURDATE()")
    upcoming_rdv = cur.fetchone()['total']
    
    cur.close()
    return jsonify({
        "total_patients": total_patients,
        "upcoming_appointments": upcoming_rdv,
        "new_messages": 5 # Placeholder
    })

# --- RDV (APPOINTMENTS) ---
@app.route('/rdv', methods=['POST'])
def create_rdv():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO RDV (id_patient, id_pro_sante, date_rdv, type, statut, motif)
        VALUES (%s, %s, %s, %s, 'planifie', %s)
    """, (data['id_patient'], data['id_pro_sante'], data['date_rdv'], data.get('type', 'Consultation'), data.get('motif', '')))
    mysql.connection.commit()
    rdv_id = cur.lastrowid
    cur.close()
    return jsonify({"message": "Rendez-vous planifié", "id_rdv": rdv_id}), 201

@app.route('/rdv', methods=['GET'])
def get_rdvs():
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT r.*, p.nom, p.prenom 
        FROM RDV r 
        JOIN PATIENT p ON r.id_patient = p.id_patient
        ORDER BY r.date_rdv DESC
    """)
    rdvs = cur.fetchall()
    cur.close()
    return jsonify(rdvs)

@app.route('/rdv/<int:id>', methods=['PUT'])
def update_rdv(id):
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE RDV SET
                date_rdv=%s, type=%s, statut=%s, motif=%s, notes=%s
            WHERE id_rdv=%s
        """, (
            data.get('date_rdv'), data.get('type'), data.get('statut'),
            data.get('motif'), data.get('notes'), id
        ))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Rendez-vous mis à jour"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/rdv/<int:id>', methods=['DELETE'])
def delete_rdv(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM RDV WHERE id_rdv=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Rendez-vous supprimé"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- PRESCRIPTION ---
@app.route('/prescription', methods=['POST'])
def create_prescription():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute("""
        INSERT INTO PRESCRIPTION (id_patient, id_pro_sante, date_prescription, date_expiration, ordonnance)
        VALUES (%s, %s, %s, %s, %s)
    """, (data['id_patient'], data['id_pro_sante'], data['date_prescription'], data['date_expiration'], data['ordonnance']))
    mysql.connection.commit()
    presc_id = cur.lastrowid
    cur.close()
    return jsonify({"message": "Prescription créée", "id_prescription": presc_id}), 201

@app.route('/prescription/<int:patient_id>', methods=['GET'])
def get_prescriptions(patient_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM PRESCRIPTION WHERE id_patient=%s ORDER BY date_prescription DESC", (patient_id,))
    prescriptions = cur.fetchall()
    cur.close()
    return jsonify(prescriptions)

@app.route('/prescription/<int:id>', methods=['DELETE'])
def delete_prescription(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM PRESCRIPTION WHERE id_prescription=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Prescription supprimée"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- RESULTAT_TEST ---
@app.route('/resultat_test', methods=['POST'])
def create_resultat_test():
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO RESULTAT_TEST (id_dossier, type_test, nom_labo, date_realisation, description_resultat)
            VALUES (%s, %s, %s, %s, %s)
        """, (data['id_dossier'], data['type_test'], data['nom_labo'], data['date_realisation'], data.get('description_resultat', '')))
        mysql.connection.commit()
        result_id = cur.lastrowid
        cur.close()
        return jsonify({"message": "Résultat ajouté", "id_resultat": result_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/resultat_test/<int:id>', methods=['DELETE'])
def delete_resultat_test(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM RESULTAT_TEST WHERE id_resultat=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Résultat supprimé"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- DOSSIER MEDICAL ---
@app.route('/dossier/<int:patient_id>', methods=['GET'])
def get_dossier_by_patient(patient_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM DOSSIER_MEDICAL WHERE id_patient=%s", (patient_id,))
    dossier = cur.fetchone()
    if dossier:
        # Get related test results
        cur.execute("SELECT * FROM RESULTAT_TEST WHERE id_dossier=%s", (dossier['id_dossier'],))
        dossier['resultats'] = cur.fetchall()
    cur.close()
    if not dossier:
        return jsonify({"message": "Dossier non trouvé"}), 404
    return jsonify(dossier)

@app.route('/dossier/<int:id>', methods=['PUT'])
def update_dossier(id):
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE DOSSIER_MEDICAL SET
                antecedent_familiaux=%s, antecedent_personnels=%s, vaccinations=%s,
                chirurgies=%s, allergies=%s, maladies_chroniques=%s
            WHERE id_dossier=%s
        """, (
            data.get('antecedent_familiaux'), data.get('antecedent_personnels'),
            data.get('vaccinations'), data.get('chirurgies'), data.get('allergies'),
            data.get('maladies_chroniques'), id
        ))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Dossier mis à jour"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- PROFESSIONNEL DE SANTE ---
@app.route('/pro_sante/<int:id>', methods=['GET'])
def get_pro_profile(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM PRO_SANTE WHERE id_pro=%s", (id,))
    pro = cur.fetchone()
    cur.close()
    return jsonify(pro if pro else {"message": "Profil pro non trouvé"})

@app.route('/pro_sante/<int:id>', methods=['PUT'])
def update_pro_profile(id):
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE PRO_SANTE SET
                nom=%s, prenom=%s, email=%s, telephone=%s,
                num_licence=%s, specialite=%s, etablissement=%s, tarifs=%s
            WHERE id_pro=%s
        """, (
            data.get('nom'), data.get('prenom'), data.get('email'), data.get('telephone'),
            data.get('num_licence'), data.get('specialite'), data.get('etablissement'),
            data.get('tarifs'), id
        ))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Profil mis à jour"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- MEDICATION TRACKING ---
@app.route('/patient/<int:patient_id>/medications', methods=['GET'])
def get_patient_medications(patient_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT sm.*, m.nom_commercial, m.substance_active, m.dosage, m.forme
        FROM SUIVI_MEDICAMENT sm
        JOIN MEDICAMENT m ON sm.id_medicament = m.id_medicament
        WHERE sm.id_patient=%s AND (sm.date_fin IS NULL OR sm.date_fin >= CURDATE())
        ORDER BY sm.created_at DESC
    """, (patient_id,))
    medications = cur.fetchall()
    cur.close()
    return jsonify(medications)

@app.route('/medication/tracking', methods=['POST'])
def create_medication_tracking():
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO SUIVI_MEDICAMENT (id_patient, id_medicament, date_debut, date_fin, frequence, pris)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (data['id_patient'], data['id_medicament'], data['date_debut'], 
              data.get('date_fin'), data['frequence'], data.get('pris', False)))
        mysql.connection.commit()
        tracking_id = cur.lastrowid
        cur.close()
        return jsonify({"message": "Suivi médicament créé", "id_suivi": tracking_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/access-request/<int:id>', methods=['PUT'])
def update_access_request(id):
    """Update access request status and create consultation if approved"""
    data = request.json
    statut = data.get('statut')
    
    if statut not in ['approved', 'denied']:
        return jsonify({"error": "Statut invalide. Utilisez 'approved' ou 'denied'"}), 400
    
    try:
        cur = mysql.connection.cursor()
        
        # Récupérer les infos de la demande
        cur.execute("""
            SELECT id_patient, id_pro_sante FROM ACCESS_REQUEST 
            WHERE id_request=%s
        """, (id,))
        request_info = cur.fetchone()
        
        if not request_info:
            cur.close()
            return jsonify({"error": "Demande d'accès non trouvée"}), 404
        
        # Mettre à jour le statut
        cur.execute("""
            UPDATE ACCESS_REQUEST 
            SET statut=%s, updated_at=NOW() 
            WHERE id_request=%s
        """, (statut, id))
        
        # Si approuvé, créer automatiquement la CONSULTATION
        if statut == 'approved':
            id_patient = request_info['id_patient']
            id_pro_sante = request_info['id_pro_sante']
            
            # Vérifier si consultation existe déjà (sécurité supplémentaire)
            cur.execute("""
                SELECT id_consultation FROM CONSULTATION 
                WHERE id_patient=%s AND id_pro_sante=%s AND statut='active'
            """, (id_patient, id_pro_sante))
            
            if not cur.fetchone():
                # Créer la consultation
                cur.execute("""
                    INSERT INTO CONSULTATION (id_patient, id_pro_sante, date_debut, notes)
                    VALUES (%s, %s, CURDATE(), 'Accès autorisé via demande')
                """, (id_patient, id_pro_sante))
                consultation_created = True
            else:
                consultation_created = False
        else:
            consultation_created = False
        
        mysql.connection.commit()
        cur.close()
        
        response = {"message": f"Demande {statut}"}
        if consultation_created:
            response["consultation_created"] = True
            response["message"] += " et consultation créée avec succès"
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/medication/tracking/<int:id>', methods=['PUT'])
def update_medication_tracking(id):
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE SUIVI_MEDICAMENT SET pris=%s WHERE id_suivi=%s
        """, (data.get('pris'), id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Statut mis à jour"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/medication/tracking/<int:id>', methods=['DELETE'])
def delete_medication_tracking(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM SUIVI_MEDICAMENT WHERE id_suivi=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Suivi supprimé"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- MEDICAMENT (Drug Database) ---
@app.route('/medicament', methods=['GET'])
def get_medications():
    query = request.args.get('q', '')
    cur = mysql.connection.cursor()
    if query:
        cur.execute("SELECT * FROM MEDICAMENT WHERE nom_commercial LIKE %s OR substance_active LIKE %s", 
                   (f"%{query}%", f"%{query}%"))
    else:
        cur.execute("SELECT * FROM MEDICAMENT LIMIT 100")
    medications = cur.fetchall()
    cur.close()
    return jsonify(medications)

@app.route('/medicament', methods=['POST'])
def create_medication():
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO MEDICAMENT (nom_commercial, substance_active, dosage, forme, fabricant)
            VALUES (%s, %s, %s, %s, %s)
        """, (data['nom_commercial'], data.get('substance_active'), data.get('dosage'), 
              data.get('forme'), data.get('fabricant')))
        mysql.connection.commit()
        med_id = cur.lastrowid
        cur.close()
        return jsonify({"message": "Médicament créé", "id_medicament": med_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- HEALTH JOURNAL ---
@app.route('/patient/<int:patient_id>/journal', methods=['GET'])
def get_health_journal(patient_id):
    limit = request.args.get('limit', 50)
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT * FROM JOURNAL_SANTE 
        WHERE id_patient=%s 
        ORDER BY date_entree DESC 
        LIMIT %s
    """, (patient_id, limit))
    entries = cur.fetchall()
    cur.close()
    return jsonify(entries)

@app.route('/journal', methods=['POST'])
def create_journal_entry():
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO JOURNAL_SANTE (id_patient, description, niveau_douleur, humeur)
            VALUES (%s, %s, %s, %s)
        """, (data['id_patient'], data['description'], data.get('niveau_douleur'), data.get('humeur')))
        mysql.connection.commit()
        entry_id = cur.lastrowid
        cur.close()
        return jsonify({"message": "Entrée créée", "id_entree": entry_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/journal/<int:id>', methods=['DELETE'])
def delete_journal_entry(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM JOURNAL_SANTE WHERE id_entree=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Entrée supprimée"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- MESSAGES / CHAT ---
# Note: We'll create a simple MESSAGE table structure
@app.route('/messages/<int:user_id>', methods=['GET'])
def get_user_conversations(user_id):
    """Get all conversations for a user (recent messages grouped by conversation)"""
    cur = mysql.connection.cursor()
    # This is a simplified version - in production you'd want a proper CONVERSATION table
    cur.execute("""
        SELECT DISTINCT 
            CASE 
                WHEN sender_id = %s THEN receiver_id 
                ELSE sender_id 
            END as other_user_id,
            MAX(created_at) as last_message_time
        FROM MESSAGE 
        WHERE sender_id = %s OR receiver_id = %s
        GROUP BY other_user_id
        ORDER BY last_message_time DESC
    """, (user_id, user_id, user_id))
    conversations = cur.fetchall()
    cur.close()
    return jsonify(conversations)

@app.route('/messages/<int:sender_id>/<int:receiver_id>', methods=['GET'])
def get_conversation_messages(sender_id, receiver_id):
    """Get messages between two users"""
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT * FROM MESSAGE 
        WHERE (sender_id = %s AND receiver_id = %s) 
           OR (sender_id = %s AND receiver_id = %s)
        ORDER BY created_at ASC
    """, (sender_id, receiver_id, receiver_id, sender_id))
    messages = cur.fetchall()
    cur.close()
    return jsonify(messages)

@app.route('/message', methods=['POST'])
def send_message():
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO MESSAGE (sender_id, receiver_id, content, is_read)
            VALUES (%s, %s, %s, FALSE)
        """, (data['sender_id'], data['receiver_id'], data['content']))
        mysql.connection.commit()
        message_id = cur.lastrowid
        cur.close()
        return jsonify({"message": "Message envoyé", "id_message": message_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/message/<int:id>/read', methods=['PUT'])
def mark_message_read(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("UPDATE MESSAGE SET is_read=TRUE WHERE id_message=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Message marqué comme lu"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- ACCESS REQUESTS (for medical records) ---
@app.route('/access-requests/<int:pro_id>', methods=['GET'])
def get_doctor_access_requests(pro_id):
    """Get pending access requests for a doctor"""
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT ar.*, p.nom, p.prenom, p.email
        FROM ACCESS_REQUEST ar
        JOIN PATIENT p ON ar.id_patient = p.id_patient
        WHERE ar.id_pro_sante=%s AND ar.statut='pending'
        ORDER BY ar.created_at DESC
    """, (pro_id,))
    requests = cur.fetchall()
    cur.close()
    return jsonify(requests)

@app.route('/access-requests/patient/<int:patient_id>', methods=['GET'])
def get_patient_access_requests(patient_id):
    """Get access requests sent by a patient"""
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT ar.*, ps.nom, ps.prenom, ps.specialite
        FROM ACCESS_REQUEST ar
        JOIN PRO_SANTE ps ON ar.id_pro_sante = ps.id_pro
        WHERE ar.id_patient=%s
        ORDER BY ar.created_at DESC
    """, (patient_id,))
    requests = cur.fetchall()
    cur.close()
    return jsonify(requests)

@app.route('/access-request', methods=['POST'])
def create_access_request():
    """Create new access request with duplicate prevention"""
    data = request.json
    try:
        cur = mysql.connection.cursor()
        
        # VÉRIFICATION 1: Consultation active existe déjà?
        cur.execute("""
            SELECT id_consultation FROM CONSULTATION 
            WHERE id_patient=%s AND id_pro_sante=%s AND statut='active'
        """, (data['id_patient'], data['id_pro_sante']))
        
        if cur.fetchone():
            cur.close()
            return jsonify({"error": "Ce patient est déjà dans vos consultations actives"}), 409
        
        # VÉRIFICATION 2: Demande d'accès en attente existe?
        cur.execute("""
            SELECT id_request FROM ACCESS_REQUEST 
            WHERE id_patient=%s AND id_pro_sante=%s AND statut='pending'
        """, (data['id_patient'], data['id_pro_sante']))
        
        if cur.fetchone():
            cur.close()
            return jsonify({"error": "Une demande d'accès est déjà en attente pour ce patient"}), 409
        
        # OK - Créer la demande
        cur.execute("""
            INSERT INTO ACCESS_REQUEST (id_patient, id_pro_sante, motif)
            VALUES (%s, %s, %s)
        """, (data['id_patient'], data['id_pro_sante'], data.get('motif', '')))
        mysql.connection.commit()
        request_id = cur.lastrowid
        cur.close()
        
        return jsonify({"message": "Demande d'accès envoyée avec succès", "id_request": request_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- NOTIFICATIONS ---
@app.route('/notifications/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT * FROM NOTIFICATION 
        WHERE user_id=%s 
        ORDER BY created_at DESC 
        LIMIT 50
    """, (user_id,))
    notifications = cur.fetchall()
    cur.close()
    return jsonify(notifications)

@app.route('/notification/<int:id>/read', methods=['PUT'])
def mark_notification_read(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("UPDATE NOTIFICATION SET is_read=TRUE WHERE id_notification=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Notification marquée comme lue"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/notification/<int:id>', methods=['DELETE'])
def delete_notification(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM NOTIFICATION WHERE id_notification=%s", (id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Notification supprimée"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- CONSULTATIONS (Doctor-Patient Relationships) ---
@app.route('/doctor/<int:pro_id>/patients', methods=['GET'])
def get_doctor_patients(pro_id):
    """Get all patients currently consulted by a doctor"""
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT p.*, c.date_debut, c.statut, c.notes
        FROM PATIENT p
        JOIN CONSULTATION c ON p.id_patient = c.id_patient
        WHERE c.id_pro_sante=%s AND c.statut='active'
        ORDER BY p.nom, p.prenom
    """, (pro_id,))
    patients = cur.fetchall()
    cur.close()
    return jsonify(patients)

@app.route('/consultation/check', methods=['GET'])
def check_consultation():
    """Check if a doctor has active consultation with a patient"""
    pro_id = request.args.get('pro_id')
    patient_id = request.args.get('patient_id')
    
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT * FROM CONSULTATION 
        WHERE id_patient=%s AND id_pro_sante=%s AND statut='active'
    """, (patient_id, pro_id))
    consultation = cur.fetchone()
    cur.close()
    
    return jsonify({"has_access": consultation is not None, "consultation": consultation})

@app.route('/consultation', methods=['POST'])
def create_consultation():
    """Create new consultation with duplicate prevention"""
    data = request.json
    try:
        cur = mysql.connection.cursor()
        
        # Vérifier si consultation active existe déjà
        cur.execute("""
            SELECT id_consultation FROM CONSULTATION 
            WHERE id_patient=%s AND id_pro_sante=%s AND statut='active'
        """, (data['id_patient'], data['id_pro_sante']))
        
        if cur.fetchone():
            cur.close()
            return jsonify({"error": "Une consultation active existe déjà avec ce patient"}), 409
        
        # Créer la consultation
        cur.execute("""
            INSERT INTO CONSULTATION (id_patient, id_pro_sante, date_debut, notes)
            VALUES (%s, %s, CURDATE(), %s)
        """, (data['id_patient'], data['id_pro_sante'], data.get('notes', '')))
        mysql.connection.commit()
        consultation_id = cur.lastrowid
        cur.close()
        
        return jsonify({"message": "Consultation créée avec succès", "id_consultation": consultation_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/consultation/<int:id>', methods=['PUT'])
def update_consultation(id):
    """Update consultation status"""
    data = request.json
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE CONSULTATION SET statut=%s WHERE id_consultation=%s
        """, (data.get('statut'), id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Consultation mise à jour"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --- PATIENT SEARCH ---
@app.route('/patient/search', methods=['GET'])
def search_patients():
    """Search patients by name or email"""
    query = request.args.get('q', '')
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT id_patient, nom, prenom, email, telephone, date_nais, groupe_sang
        FROM PATIENT 
        WHERE nom LIKE %s OR prenom LIKE %s OR email LIKE %s
        LIMIT 20
    """, (f"%{query}%", f"%{query}%", f"%{query}%"))
    patients = cur.fetchall()
    cur.close()
    return jsonify(patients)

@app.route('/patient/<int:id>/details', methods=['GET'])
def get_patient_details(id):
    """Get patient details without medical dossier"""
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT id_patient, nom, prenom, email, telephone, date_nais, 
               groupe_sang, taille, poids, allergies, 
               nom_urgence, tel_urgence, relation_urgence
        FROM PATIENT 
        WHERE id_patient=%s
    """, (id,))
    patient = cur.fetchone()
    cur.close()
    
    if not patient:
        return jsonify({"message": "Patient non trouvé"}), 404
    
    return jsonify(patient)

if __name__ == '__main__':
    app.run(debug=True, port=5000)


