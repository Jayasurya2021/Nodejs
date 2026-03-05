import { createContext, useContext, useState } from "react";

const AlertContext = createContext(undefined);

const STORAGE_KEY = "gramraksha_alerts";

const loadAlerts = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw).map((a) => ({ ...a, timestamp: new Date(a.timestamp) }));
    } catch {
        return [];
    }
};

const saveAlerts = (alerts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
};

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState(loadAlerts);

    const addAlert = (alert) => {
        const newAlert = {
            ...alert,
            id: crypto.randomUUID(),
            timestamp: new Date(),
        };
        const updated = [newAlert, ...alerts];
        setAlerts(updated);
        saveAlerts(updated);
    };

    const clearAlerts = () => {
        setAlerts([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, clearAlerts }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlerts = () => {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error("useAlerts must be used within AlertProvider");
    return ctx;
};
