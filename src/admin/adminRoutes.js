// src/admin/adminRoutes.js
import AdminList from "./pages/Admin/AdminList";
import AdminLogs from "./pages/Admin/AdminLogs";
import Roles from "./pages/Admin/Roles";
import Announcements from "./pages/CMS/Announcements";
import Pages from "./pages/CMS/Pages";
import Templates from "./pages/CMS/Templates";
import Dashboard from "./pages/Dashboard";
import CompletedDeposits from "./pages/Deposits/CompletedDeposits";
import PendingDeposits from "./pages/Deposits/PendingDeposits";
import AddPlan from "./pages/Plans/AddPlan";
import PlansList from "./pages/Plans/PlansList";
import AdminPromoCodes from "./pages/Promocode/AdminPromoCodes";
import ReferralSettings from "./pages/Referrals/ReferralSettings";
import ReferralTree from "./pages/Referrals/ReferralTree";
import DailyReport from "./pages/Reports/DailyReport";
import MonthlyReport from "./pages/Reports/MonthlyReport";
import GeneralSettings from "./pages/Settings/GeneralSettings";
import NotificationSettings from "./pages/Settings/NotificationSettings";
import PaymentSettings from "./pages/Settings/PaymentSettings";
import SecuritySettings from "./pages/Settings/SecuritySettings";
import TicketDetails from "./pages/Support/TicketDetails";
import TicketsList from "./pages/Support/TicketsList";
import AllTransactions from "./pages/Transactions/AllTransactions";
import DepositHistory from "./pages/Transactions/DepositHistory";
import WithdrawalHistory from "./pages/Transactions/WithdrawalHistory";
import UserDetails from "./pages/Users/UserDetails";
import UserList from "./pages/Users/UserList";
import CompletedWithdrawals from "./pages/Withdrawals/CompletedWithdrawals";
import PendingWithdrawals from "./pages/Withdrawals/PendingWithdrawals";
import WithdrawalSettings from "./pages/Withdrawals/WithdrawalSettings";

const adminRoutes = {
    Dashboard,
    UserDetails,
    UserList,
    AdminPromoCodes,
    PendingDeposits,
    CompletedDeposits,
    PendingWithdrawals,
    CompletedWithdrawals,
    WithdrawalSettings,
    PlansList,
    AddPlan,
    AllTransactions,
    DepositHistory,
    WithdrawalHistory,
    ReferralTree,
    ReferralSettings,
    DailyReport,
    MonthlyReport,
    TicketsList,
    TicketDetails,
    Pages,
    Announcements,
    Templates,
    GeneralSettings,
    PaymentSettings,
    SecuritySettings,
    NotificationSettings,
    AdminList,
    Roles,
    AdminLogs
};

export default adminRoutes;
