// src/admin/store.js
import { useEffect, useState } from "react";

// --- Seed Database (Initial Local Storage Data) ---
const seed = {
    users: [
        {
            uid: "U-1001",
            name: "Muhammad Farhan",
            email: "farhan@solarx0.com",
            phone: "0300-1234567",
            cnic: "35202-1234567-1",
            role: "user",
            status: "Active",
            joined: "2024-07-12",
            banned: false,
        },
        {
            uid: "U-1002",
            name: "Ayesha Khan",
            email: "ayesha@solarx0.com",
            phone: "0311-2345678",
            cnic: "61101-9876543-2",
            role: "user",
            status: "Active",
            joined: "2024-08-01",
            banned: false,
        },
    ],
    deposits: [
        {
            id: "D-1",
            uid: "U-1001",
            method: "Easypaisa",
            amount: 5000,
            status: "pending",
            date: "2025-08-23",
            proof: "",
        },
        {
            id: "D-2",
            uid: "U-1002",
            method: "Bank",
            amount: 8000,
            status: "completed",
            date: "2025-08-22",
            proof: "",
        },
    ],
    withdrawals: [
        {
            id: "W-1",
            uid: "U-1001",
            method: "JazzCash",
            account: "03001234567",
            name: "Ali Raza",
            amount: 3000,
            status: "pending",
            date: "2025-08-24",
        },
    ],
    plans: [
        { id: "P-1", name: "Starter", percent: 1.5, duration: 30, min: 1000, max: 10000, active: true },
        { id: "P-2", name: "Pro", percent: 2.0, duration: 45, min: 10000, max: 50000, active: true },
    ],
    userPlans: [
        { id: "UP-1", uid: "U-1001", planId: "P-1", started: "2025-08-01", active: true, invested: 5000 },
    ],
    tickets: [
        {
            id: "T-1",
            uid: "U-1001",
            subject: "Deposit not reflecting",
            status: "open",
            messages: [{ from: "user", text: "I transferred 5k to easypaisa", at: "2025-08-24 10:10" }],
        },
    ],
    referrals: [
        { uid: "U-1001", l1: ["U-1002"], l2: [], l3: [] },
    ],
    settings: {
        currency: "PKR",
        payments: {
            easypaisa: ["0300-0000000"],
            jazzcash: ["0301-1111111"],
            bank: [{ title: "Meezan", account: "1234567890", branch: "Karachi" }],
        },
        siteName: "Solarx0",
        security: { twoFA: true, captcha: true },
        notifications: { email: true, sms: false },
        general: { contact: "support@solarx0.com" },
    },
    admins: [{ id: "A-1", name: "Super Admin", role: "super" }],
    adminLogs: [],
};

// --- Hook: Mock Store ---
export function useMockStore() {
    const [db, setDb] = useState(() => {
        const saved = localStorage.getItem("solarx0-db");
        return saved ? JSON.parse(saved) : seed;
    });

    // Persist to localStorage on every change
    useEffect(() => {
        localStorage.setItem("solarx0-db", JSON.stringify(db));
    }, [db]);

    const logAction = (action, payload) => ({
        at: new Date().toISOString(),
        action,
        ...payload,
    });

    return {
        db,

        // --- SETTINGS ---
        saveSettings: (patch) =>
            setDb((d) => ({
                ...d,
                settings: { ...d.settings, ...patch },
                adminLogs: [...d.adminLogs, logAction("saveSettings", { patch })],
            })),

        // --- DEPOSITS ---
        approveDeposit: (id) =>
            setDb((d) => ({
                ...d,
                deposits: d.deposits.map((x) =>
                    x.id === id ? { ...x, status: "completed" } : x
                ),
                adminLogs: [...d.adminLogs, logAction("approveDeposit", { id })],
            })),

        rejectDeposit: (id) =>
            setDb((d) => ({
                ...d,
                deposits: d.deposits.map((x) =>
                    x.id === id ? { ...x, status: "rejected" } : x
                ),
                adminLogs: [...d.adminLogs, logAction("rejectDeposit", { id })],
            })),

        addDeposit: (payload) =>
            setDb((d) => ({
                ...d,
                deposits: [...d.deposits, payload],
                adminLogs: [...d.adminLogs, logAction("addDeposit", { id: payload.id })],
            })),

        // --- WITHDRAWALS ---
        approveWithdrawal: (id) =>
            setDb((d) => ({
                ...d,
                withdrawals: d.withdrawals.map((x) =>
                    x.id === id ? { ...x, status: "completed" } : x
                ),
                adminLogs: [...d.adminLogs, logAction("approveWithdrawal", { id })],
            })),

        rejectWithdrawal: (id) =>
            setDb((d) => ({
                ...d,
                withdrawals: d.withdrawals.map((x) =>
                    x.id === id ? { ...x, status: "rejected" } : x
                ),
                adminLogs: [...d.adminLogs, logAction("rejectWithdrawal", { id })],
            })),

        addWithdrawal: (payload) =>
            setDb((d) => ({
                ...d,
                withdrawals: [...d.withdrawals, payload],
                adminLogs: [...d.adminLogs, logAction("addWithdrawal", { id: payload.id })],
            })),

        // --- USERS ---
        banUser: (uid, reason) =>
            setDb((d) => ({
                ...d,
                users: d.users.map((u) =>
                    u.uid === uid ? { ...u, banned: true, banReason: reason } : u
                ),
                adminLogs: [...d.adminLogs, logAction("banUser", { uid, reason })],
            })),

        unbanUser: (uid) =>
            setDb((d) => ({
                ...d,
                users: d.users.map((u) =>
                    u.uid === uid ? { ...u, banned: false, banReason: undefined } : u
                ),
                adminLogs: [...d.adminLogs, logAction("unbanUser", { uid })],
            })),

        // --- TICKETS ---
        addTicket: (ticket) =>
            setDb((d) => ({
                ...d,
                tickets: [...d.tickets, ticket],
                adminLogs: [...d.adminLogs, logAction("addTicket", { id: ticket.id })],
            })),

        // --- PLANS ---
        addPlan: (plan) =>
            setDb((d) => ({
                ...d,
                plans: [...d.plans, plan],
                adminLogs: [...d.adminLogs, logAction("addPlan", { id: plan.id })],
            })),

        updatePlan: (plan) =>
            setDb((d) => ({
                ...d,
                plans: d.plans.map((p) => (p.id === plan.id ? plan : p)),
                adminLogs: [...d.adminLogs, logAction("updatePlan", { id: plan.id })],
            })),

        // --- LOGGING ONLY ---
        addAdminLog: (log) =>
            setDb((d) => ({
                ...d,
                adminLogs: [...d.adminLogs, { ...log, at: new Date().toISOString() }],
            })),
    };
}
