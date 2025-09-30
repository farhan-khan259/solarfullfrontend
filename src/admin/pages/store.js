// src/admin/pages/store.js
import { useState } from "react";

export function useMockStore() {
    // Simulated dashboard data (replace later with API calls)
    const [stats] = useState({
        users: 1245,
        deposits: 5000000,
        withdrawals: 2000000,
        pending: 12,
    });

    return { stats };
}
