export const endpoints = {
  auth: {
    login: "/api/v1/auth/login",
    session: "/api/v1/auth/session",
    requestRecovery: "/api/v1/auth/request-recovery-token",
    submitRecovery: "/api/v1/auth/submit-recovery-token",
    exchangeTotp: "/api/v1/auth/exchange-totp-token",
  },
  // Public auth endpoints (NextAuth-backed API)
  authPublic: {
    register: "/api/auth/register",
    forgotPassword: "/api/auth/forgot-password",
    verifyOtp: "/api/auth/verify-otp",
    resetPassword: "/api/auth/reset-password",
  },
  // NextAuth core endpoints for cookie sessions
  authNext: {
    csrf: "/api/auth/csrf",
    callbackCredentials: "/api/auth/callback/credentials",
    session: "/api/auth/session",
    signout: "/api/auth/signout",
  },
  users: {
    profile: "/api/users/profile",
  },
  authMobile: {
    exchange: "/api/auth/mobile/exchange",
  },
  teams: {
    list: "/api/v1/teams",
    sample: (teamId: string) => `/api/v1/teams/${encodeURIComponent(teamId)}/example`,
  },
};
