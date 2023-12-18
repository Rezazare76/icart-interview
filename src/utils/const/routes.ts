import { lazy } from "react";
// admin
const AdminMerchant = lazy(() => import("pages/admin/merchants/Merchants"));
const AdminOrganization = lazy(
  () => import("pages/admin/organizations/Organizations")
);
const AdminAgents = lazy(() => import("pages/admin/agents/Agents"));
const AdminUsers = lazy(() => import("pages/admin/users/Users"));
const AdminRequests = lazy(
  () => import("pages/admin/requestsList/RequestsList")
);
const AdminDashboard = lazy(() => import("pages/admin/dashboard/Dashboard"));
const AdminTickets = lazy(() => import("pages/admin/tickets/Tickets"));
const DirectTickets = lazy(
  () => import("pages/admin/tickets/directTicket/DirectTickets")
);
const Transactions = lazy(
  () => import("pages/admin/transactions/Transactions")
);
const Activity = lazy(() => import("pages/admin/activity/Activity"));
const CooperationRequests = lazy(
  () => import("pages/admin/cooperationRequests/CooperationRequests")
);
const Deposit = lazy(() => import("pages/admin/deposit/Deposit"));

//  landing
const HeroPage = lazy(() => import("pages/landing/heroPage/HeroPage"));
const Stores = lazy(() => import("pages/landing/stores/Stores"));
const About = lazy(() => import("pages/landing/aboutUS/AboutUs"));
const WorkWithUs = lazy(() => import("pages/landing/workWithUs/WorkWithUs"));
const Investment = lazy(() => import("pages/landing/investment/Investment"));

const StoresInfo = lazy(
  () => import("pages/landing/stores/storesInfo/StoresInfo")
);
const Proposal = lazy(() => import("pages/landing/proposal/Proposal"));
// authentication
const Login = lazy(() => import("pages/authentication/login/Login"));
const SignUp = lazy(() => import("pages/authentication/signUp/SignUp"));
const ForgotPasswordNumber = lazy(
  () => import("pages/authentication/forgotPassword/ForgotPasswordNumber")
);

// perofile
const Dashboard = lazy(() => import("pages/profile/dashboard/Dashboard"));
const Wallet = lazy(() => import("pages/profile/wallet/Wallet"));
const PersonalInfo = lazy(
  () => import("pages/profile/personalInfo/PersonalInfo")
);
const Acceptors = lazy(() => import("pages/profile/acceptors/Acceptors"));
const Referral = lazy(() => import("pages/profile/referral/Referral"));

const Organizations = lazy(
  () => import("pages/profile/organizations/Organizations")
);
const SalesAgents = lazy(() => import("pages/profile/salesAgents/SalesAgents"));
const LoanRequest = lazy(() => import("pages/profile/loanRequest/LoanRequest"));
const RequestsList = lazy(
  () => import("pages/profile/requestsList/RequestsList")
);
const Tickets = lazy(() => import("pages/profile/tickets/Tickets"));
const MyCarts = lazy(() => import("pages/profile/myCarts/MyCarts"));
const Orders = lazy(() => import("pages/profile/orders/Orders"));

// payment
const Invoice = lazy(() => import("pages/payment/Invoice/Invoice"));
const PaymentType = lazy(() => import("pages/payment/type/type"));
const Installment = lazy(() => import("pages/payment/installment/Installment"));

export const profileRoutes = {
  "کاربر ساده": [
    { path: "personal-info", element: PersonalInfo },
    { path: "dashboard", element: Dashboard },
    { path: "tickets", element: Tickets },
    { path: "wallet", element: Wallet },
    { path: "loan-request", element: LoanRequest },
    { path: "my-cards", element: MyCarts },
    { path: "orders", element: Orders },
    { path: "referral", element: Referral },
  ],
  نماینده: [
    { path: "dashboard", element: Dashboard },
    { path: "wallet", element: Wallet },
    { path: "personal-info", element: PersonalInfo },
    { path: "acceptors", element: Acceptors },
    { path: "organizations", element: Organizations },
    { path: "sales-agents", element: SalesAgents },
    { path: "requests-list", element: RequestsList },
    { path: "tickets", element: Tickets },
    { path: "my-cards", element: MyCarts },
    { path: "orders", element: Orders },
    { path: "referral", element: Referral },
  ],
  پذیرنده: [
    { path: "dashboard", element: Dashboard },
    { path: "wallet", element: Wallet },
    { path: "personal-info", element: PersonalInfo },
    { path: "tickets", element: Tickets },
    { path: "my-cards", element: MyCarts },
    { path: "orders", element: Orders },
    { path: "referral", element: Referral },
  ],
  سازمان: [
    { path: "dashboard", element: Dashboard },
    { path: "wallet", element: Wallet },
    { path: "personal-info", element: PersonalInfo },
    { path: "tickets", element: Tickets },
    { path: "requests-list", element: RequestsList },
    { path: "users", element: AdminUsers },
    { path: "my-cards", element: MyCarts },
    { path: "orders", element: Orders },
    { path: "referral", element: Referral },
  ],
  "وارد شوید": [],
};
export const authenticationRoutes = [
  { path: "login", element: Login },
  { path: "signup", element: SignUp },
  { path: "forgot-password", element: ForgotPasswordNumber },
];
export const paymentRoutes = [
  { path: "invoice", element: Invoice },
  { path: "type", element: PaymentType },
  { path: "installment", element: Installment },
];
export const landingRoutes = [
  { path: "/", element: HeroPage },
  { path: "stores", element: Stores },
  { path: "stores/:id", element: StoresInfo },
  { path: "about", element: About },
  { path: "work-with-us", element: WorkWithUs },
  { path: "proposals", element: Proposal },
  { path: "investment", element: Investment },
];
export const adminRoutes = {
  کارشناس: [
    { path: "dashboard", element: AdminDashboard },
    { path: "agents", element: AdminAgents },

    { path: "organizations", element: AdminOrganization },
    { path: "merchants", element: AdminMerchant },
    { path: "users", element: AdminUsers },
    { path: "requests", element: AdminRequests },
  ],
  "مرکز تماس": [
    { path: "dashboard", element: AdminDashboard },
    { path: "tickets", element: AdminTickets },
  ],
  ادمین: [
    { path: "dashboard", element: AdminDashboard },
    { path: "agents", element: AdminAgents },
    { path: "organizations", element: AdminOrganization },
    { path: "merchants", element: AdminMerchant },
    { path: "users", element: AdminUsers },
    { path: "requests", element: AdminRequests },
    { path: "tickets", element: AdminTickets },
    { path: "tickets/:id", element: DirectTickets },
    { path: "transactions", element: Transactions },
    { path: "activity", element: Activity },
    { path: "cooperation-requests", element: CooperationRequests },
    { path: "Deposit", element: Deposit },
  ],
};
