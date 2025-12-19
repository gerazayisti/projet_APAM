# Guide de Setup - Mobile AP.A.M

## 📱 Configuration du Projet

### 1. Après initialisation du projet
Créez cette structure de dossiers dans `mobile-apam/` :

```
mobile-apam/
├── app/                      # App Router (Expo Router)
│   ├── (auth)/               # Stack d'authentification
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (patient)/            # Stack patient
│   │   └── (tabs)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── health.tsx
│   │       ├── appointments.tsx
│   │       └── profile.tsx
│   └── (doctor)/             # Stack médecin
│       └── (tabs)/
│           ├── _layout.tsx
│           ├── index.tsx
│           ├── patients.tsx
│           └── schedule.tsx
├── components/               # Composants réutilisables
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Loading.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── TabBar.tsx
│   │   └── Container.tsx
│   └── patient/
│       ├── AppointmentCard.tsx
│       ├── MedicationCard.tsx
│       └── HealthEntryCard.tsx
├── services/                 # Services API
│   ├── api/
│   │   ├── auth.ts
│   │   ├── appointments.ts
│   │   └── health.ts
│   └── blockchain/
│       └── web3.ts
├── store/                    # Redux Store
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── userSlice.ts
│   │   └── appointmentSlice.ts
│   └── store.ts
├── theme/                    # Thème Material UI
│   ├── colors.ts
│   ├── typography.ts
│   └── index.ts
├── types/                    # Types TypeScript
│   ├── user.ts
│   ├── appointment.ts
│   └── health.ts
├── utils/                    # Utilitaires
│   ├── validators.ts
│   ├── formatters.ts
│   └── constants.ts
├── hooks/                    # Custom Hooks
│   ├── useAuth.ts
│   ├── useNotification.ts
│   └── useWebRTC.ts
└── assets/                   # Assets statiques
    ├── images/
    ├── icons/
    └── fonts/
```

### 2. Palette de couleurs (WCAG conformité)

```typescript
// theme/colors.ts
export const colors = {
  // 60% - Fond
  background: '#FFFFFF',
  surface: '#F5F5F5',
  surfaceVariant: '#E8E8E8',
  
  // 30% - Primaire (Bleu doux)
  primary: '#2196F3',
  primaryDark: '#1976D2',
  primaryLight: '#64B5F6',
  
  // 10% - Accentuation (Vert menthe)
  accent: '#4CAF50',
  accentDark: '#388E3C',
  accentLight: '#81C784',
  
  // Texte
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  
  // États
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
  info: '#2196F3',
  
  // Contraste élevé
  onPrimary: '#FFFFFF',
  onAccent: '#FFFFFF',
  onSurface: '#212121',
  onError: '#FFFFFF',
}
```

### 3. Typographie Material UI

```typescript
// theme/typography.ts
export const typography = {
  h1: { fontSize: 34, fontWeight: '400', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '400', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '400', lineHeight: 28 },
  h4: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  body1: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  button: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  overline: { fontSize: 10, fontWeight: '400', lineHeight: 16 },
}
```

### 4. Configuration Expo Router

```typescript
// app.json
{
  "expo": {
    "name": "AP.A.M",
    "slug": "apam-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FFFFFF"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.apam.mobile"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.apam.mobile"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

### 5. Commandes de développement

```bash
# Démarrer en mode développement
npx expo start

# Démarrer sur Android
npx expo start --android

# Démarrer sur iOS
npx expo start --ios

# Lancer sur web
npx expo start --web

# Lancer le générateur de code
npx expo prebuild
```

---

## 🎨 Principes de Design

### Material Design
- **Élévation** : Utiliser shadows pour la profondeur
- **Couleurs plates** : Pas de dégradés
- **Espacement** : 8px grid system
- **Animation** : 200-300ms transitions
- **Accessibilité** : Contraste minimum 4.5:1 (WCAG AA)

### Éléments UI
- **Boutons** : Hauteur 48dp, corners arrondis 4dp
- **Cards** : Élévation 2dp-8dp
- **Inputs** : Labels flottants, validation en temps réel
- **Icons** : Lucide React Native (24dp par défaut)

---

## 📦 Dépendances principales

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-paper": "^5.11.3",
    "react-native-vector-icons": "^10.0.3",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",
    "axios": "^1.6.2",
    "react-hook-form": "^7.49.2",
    "yup": "^1.4.0",
    "lucide-react-native": "^0.292.0",
    "@react-native-async-storage/async-storage": "1.21.0"
  }
}
```

---

## 🚀 Prochaines étapes

1. Exécutez les commandes d'installation ci-dessus
2. Je créerai la structure de dossiers et les premiers fichiers
3. Nous développerons les écrans d'authentification en premier
4. Puis nous passerons aux fonctionnalités principales

