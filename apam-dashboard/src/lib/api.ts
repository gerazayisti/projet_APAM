const API_BASE_URL = 'http://localhost:5000';

export const api = {
    // Auth
    async login(email: any, password?: string) {
        const body = typeof email === 'object' ? email : { email, password };
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return res.json();
    },

    // Professionals
    async getProProfile(id: number) {
        const res = await fetch(`${API_BASE_URL}/pro_sante/${id}`);
        return res.json();
    },

    // Patients
    async getPatients(query = '') {
        const res = await fetch(`${API_BASE_URL}/patient?q=${query}`);
        return res.json();
    },

    async getPatientById(id: number) {
        const res = await fetch(`${API_BASE_URL}/patient/${id}`);
        return res.json();
    },

    async createPatient(data: any) {
        const res = await fetch(`${API_BASE_URL}/patient`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async updatePatient(id: number, data: any) {
        const res = await fetch(`${API_BASE_URL}/patient/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async deletePatient(id: number) {
        const res = await fetch(`${API_BASE_URL}/patient/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    // Dossier & Results
    async getDossierByPatient(patientId: number) {
        const res = await fetch(`${API_BASE_URL}/dossier/${patientId}`);
        return res.json();
    },

    async updateDossier(id: number, data: any) {
        const res = await fetch(`${API_BASE_URL}/dossier/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async createTestResult(data: any) {
        const res = await fetch(`${API_BASE_URL}/resultat_test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async deleteTestResult(id: number) {
        const res = await fetch(`${API_BASE_URL}/resultat_test/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    // Appointments (RDV)
    async getAppointments() {
        const res = await fetch(`${API_BASE_URL}/rdv`);
        return res.json();
    },

    async createAppointment(data: any) {
        const res = await fetch(`${API_BASE_URL}/rdv`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async updateAppointment(id: number, data: any) {
        const res = await fetch(`${API_BASE_URL}/rdv/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async deleteAppointment(id: number) {
        const res = await fetch(`${API_BASE_URL}/rdv/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    // Prescriptions
    async createPrescription(data: any) {
        const res = await fetch(`${API_BASE_URL}/prescription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async getPrescriptions(patientId: number) {
        const res = await fetch(`${API_BASE_URL}/prescription/${patientId}`);
        return res.json();
    },

    async deletePrescription(id: number) {
        const res = await fetch(`${API_BASE_URL}/prescription/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    },

    // Stats
    async getDashboardStats() {
        const res = await fetch(`${API_BASE_URL}/stats`);
        return res.json();
    },

    // Messaging
    async getConversations(userId: number) {
        const res = await fetch(`${API_BASE_URL}/messages/${userId}`);
        return res.json();
    },

    async getMessages(senderId: number, receiverId: number) {
        const res = await fetch(`${API_BASE_URL}/messages/${senderId}/${receiverId}`);
        return res.json();
    },

    async sendMessage(data: { sender_id: number, receiver_id: number, content: string }) {
        const res = await fetch(`${API_BASE_URL}/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async markMessageRead(id: number) {
        const res = await fetch(`${API_BASE_URL}/message/${id}/read`, {
            method: 'PUT'
        });
        return res.json();
    },

    // Access Requests
    async getDoctorAccessRequests(proId: number) {
        const res = await fetch(`${API_BASE_URL}/access-requests/${proId}`);
        return res.json();
    },

    async getPatientAccessRequests(patientId: number) {
        const res = await fetch(`${API_BASE_URL}/access-requests/patient/${patientId}`);
        return res.json();
    },

    async createAccessRequest(data: { id_patient: number, id_pro_sante: number, motif: string }) {
        const res = await fetch(`${API_BASE_URL}/access-request`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    async updateAccessRequest(id: number, statut: 'approved' | 'denied') {
        const res = await fetch(`${API_BASE_URL}/access-request/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ statut })
        });
        return res.json();
    },

    // Consultations
    async getDoctorPatients(proId: number) {
        const res = await fetch(`${API_BASE_URL}/doctor/${proId}/patients`);
        return res.json();
    },

    async checkConsultation(proId: number, patientId: number) {
        const res = await fetch(`${API_BASE_URL}/consultation/check?pro_id=${proId}&patient_id=${patientId}`);
        return res.json();
    },

    async createConsultation(data: { id_patient: number, id_pro_sante: number, notes?: string }) {
        const res = await fetch(`${API_BASE_URL}/consultation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.json();
    },

    // Patient Search
    async searchPatients(query: string) {
        const res = await fetch(`${API_BASE_URL}/patient/search?q=${encodeURIComponent(query)}`);
        return res.json();
    },

    async getPatientDetails(id: number) {
        const res = await fetch(`${API_BASE_URL}/patient/${id}/details`);
        return res.json();
    },

};
