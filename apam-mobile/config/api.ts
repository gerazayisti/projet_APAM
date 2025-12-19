// API Configuration for Mobile App
export const API_CONFIG = {
    BASE_URL: 'http://localhost:5000', // Change to your server IP for physical devices
    // BASE_URL: 'http://192.168.1.X:5000', // Example for local network
};

// API Helper Functions
export const api = {
    // Appointments
    async getAppointments() {
        const res = await fetch(`${API_CONFIG.BASE_URL}/rdv`);
        return res.json();
    },

    async createAppointment(data: any) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/rdv`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    // Health Journal
    async getHealthJournal(patientId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/patient/${patientId}/journal`);
        return res.json();
    },

    async createJournalEntry(data: any) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/journal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    // Medications
    async getPatientMedications(patientId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/patient/${patientId}/medications`);
        return res.json();
    },

    async updateMedicationTracking(id: number, pris: boolean) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/medication/tracking/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pris }),
        });
        return res.json();
    },

    // Prescriptions
    async getPrescriptions(patientId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/prescription/${patientId}`);
        return res.json();
    },

    // Medical Dossier
    async getDossier(patientId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/dossier/${patientId}`);
        return res.json();
    },

    // Messages
    async getConversations(userId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/messages/${userId}`);
        return res.json();
    },

    async getMessages(senderId: number, receiverId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/messages/${senderId}/${receiverId}`);
        return res.json();
    },

    async sendMessage(data: { sender_id: number; receiver_id: number; content: string }) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    // Access Requests (for patients)
    async getPatientAccessRequests(patientId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/access-requests/patient/${patientId}`);
        return res.json();
    },

    async updateAccessRequest(id: number, statut: 'approved' | 'denied') {
        const res = await fetch(`${API_CONFIG.BASE_URL}/access-request/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ statut }),
        });
        return res.json();
    },

    // Consultation creation (when patient approves)
    async createConsultation(data: { id_patient: number; id_pro_sante: number; notes?: string }) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/consultation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    // Doctor features
    async getDoctorPatients(proId: number) {
        const res = await fetch(`${API_CONFIG.BASE_URL}/doctor/${proId}/patients`);
        return res.json();
    },

    async getStats() {
        const res = await fetch(`${API_CONFIG.BASE_URL}/stats`);
        return res.json();
    },
};
