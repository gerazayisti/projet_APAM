'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.css';

import { Icons } from '@/components/ui/Icons';

const navItems = [
    { name: 'Vue d\'ensemble', href: '/dashboard', icon: <Icons.Layout size={20} /> },
    { name: 'Patients', href: '/dashboard/patients', icon: <Icons.Users size={20} /> },
    { name: 'Rendez-vous', href: '/dashboard/appointments', icon: <Icons.Calendar size={20} /> },
    { name: 'Dossiers Médicaux', href: '/dashboard/records', icon: <Icons.FileText size={20} /> },
    { name: 'Messagerie', href: '/dashboard/messages', icon: <Icons.MessageSquare size={20} /> },
    { name: 'Paramètres', href: '/dashboard/settings', icon: <Icons.Settings size={20} /> },
];

export function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    }, []);

    const name = user ? `Dr. ${user.nom}` : 'Dr. Watson';
    const initials = user ? `${user.nom?.charAt(0)}${user.prenom?.charAt(0)}` : 'DW';
    const role = user?.role === 'doctor' ? 'Médecin Généraliste' : 'Praticien Santé';

    return (
        <aside className={styles.sidebar}>
            <Link href="/dashboard" className={styles.brand}>
                <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4px', borderRadius: '4px', display: 'flex' }}>
                    <Icons.Shield size={20} />
                </div>
                AP.A.M
            </Link>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.user}>
                <div className={styles.avatar}>{initials}</div>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{name}</span>
                    <span className={styles.userRole}>{role}</span>
                </div>
            </div>
        </aside>
    );
}

