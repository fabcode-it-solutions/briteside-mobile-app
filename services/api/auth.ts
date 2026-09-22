import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { API_BASE_URL } from "@/utils/config";

export type LoginResponse = {
  token: string;
  requiresTotp?: boolean;
  // Some servers might include session payloads on login; keep flexible
  authenticated?: boolean;
  user?: any;
};

export type SessionResponse = {
  authenticated: boolean;
  requiresTotp?: boolean;
  session?: { uid: string; role: string; type: string };
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: string;
  };
};

function safeBtoa(input: string): string {
  if (typeof globalThis.btoa === "function") return btoa(input);
  // Minimal Base64 encoder for ASCII strings (email/password are ASCII)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let str = input;
  let output = "";
  for (
    let block = 0, charCode: number, i = 0, map = chars;
    str.charAt(i | 0) || ((map = "="), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));
    if (charCode > 0xff) throw new Error("Invalid character in btoa polyfill");
    block = (block << 8) | charCode;
  }
  return output;
}

export async function loginWithBasic(email: string, password: string): Promise<LoginResponse> {
  const basic = `Basic ${safeBtoa(`${email}:${password}`)}`;
  return apiClient.post<LoginResponse>(endpoints.auth.login, undefined, {
    headers: {
      Authorization: basic,
      Accept: "application/json",
    },
  });
}

export async function getSession(): Promise<SessionResponse> {
  return apiClient.get<SessionResponse>(endpoints.auth.session, {
    headers: { Accept: "application/json" },
  });
}

export async function requestPasswordRecovery(
  email: string,
): Promise<{ success: boolean; message?: string }> {
  return apiClient.post(
    endpoints.auth.requestRecovery,
    { email },
    {
      headers: { Accept: "application/json" },
    },
  );
}

export async function submitPasswordRecovery(args: {
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<{ success: boolean; requiresTotp?: boolean; message?: string }> {
  return apiClient.post(endpoints.auth.submitRecovery, args, {
    headers: { Accept: "application/json" },
  });
}

// --- NextAuth-backed public auth APIs (as per provided docs) ---

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  dob: string; // ISO date string
};

export type RegisterResponse = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    dob: string;
  };
};

export async function registerUser(body: RegisterRequest): Promise<RegisterResponse> {
  return apiClient.post<RegisterResponse>(endpoints.authPublic.register, body, {
    headers: { Accept: "application/json" },
  });
}

export async function forgotPasswordApi(email: string): Promise<{ message: string }> {
  return apiClient.post<{ message: string }>(
    endpoints.authPublic.forgotPassword,
    { email },
    { headers: { Accept: "application/json" } },
  );
}

export async function verifyOtpApi(args: {
  email: string;
  otp: string; // length 6
}): Promise<{ message: string; verified: boolean }> {
  return apiClient.post(endpoints.authPublic.verifyOtp, args, {
    headers: { Accept: "application/json" },
  });
}

export async function resetPasswordApi(
  args: { token: string; password: string } | { email: string; otp: string; password: string },
): Promise<{ message: string }> {
  return apiClient.post(endpoints.authPublic.resetPassword, args, {
    headers: { Accept: "application/json" },
  });
}

// NextAuth cookie-based session helpers
export async function getNextAuthCsrf(): Promise<{ csrfToken: string }> {
  return apiClient.get(endpoints.authNext.csrf, { headers: { Accept: "application/json" } });
}

export async function signInWithNextAuthCredentials(email: string, password: string): Promise<void> {
  const { csrfToken } = await getNextAuthCsrf();
  await apiClient.postFormUrlEncoded(endpoints.authNext.callbackCredentials, {
    csrfToken,
    email,
    password,
    callbackUrl: "/",
  });
}

export async function getNextAuthSession(): Promise<any> {
  return apiClient.get(endpoints.authNext.session, { headers: { Accept: "application/json" } });
}

export async function signOutNextAuth(): Promise<void> {
  try {
    const { csrfToken } = await getNextAuthCsrf();
    await apiClient.postFormUrlEncoded(endpoints.authNext.signout, {
      csrfToken,
      callbackUrl: "/",
    });
  } catch {
    // ignore signout failure
  }
}

export async function fetchUserProfile(): Promise<{ user: any }> {
  return apiClient.get(endpoints.users.profile, { headers: { Accept: "application/json" } });
}

export async function deleteUserProfile(): Promise<{ message: string }> {
  return apiClient.delete(endpoints.users.profile, { headers: { Accept: "application/json" } });
}

// Start OAuth with NextAuth in a browser tab and return when redirected
export async function startNextAuthOAuth(provider: "google" | "apple"): Promise<void> {
  const redirectUri = Linking.createURL("/");
  const authUrl = `${API_BASE_URL}${endpoints.authNext.session.replace("/session", "")}/signin/${provider}?callbackUrl=${encodeURIComponent(
    redirectUri,
  )}`;
  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
  if (result.type !== "success") {
    throw new Error("Authentication canceled");
  }
  // Try cookie bridge if backend includes an exchange token in the redirect URL
  await tryBridgeFromRedirect(result.url).catch(() => false);
  // After browser returns, try to fetch profile/session to confirm auth
  try {
    await fetchUserProfile();
  } catch {
    await getNextAuthSession();
  }
}

// Attempt to bridge cookie session using an exchange token in the redirect URL
export async function tryBridgeFromRedirect(url?: string): Promise<boolean> {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const exchangeToken =
      parsed.searchParams.get("exchangeToken") ||
      parsed.searchParams.get("mobileToken") ||
      parsed.searchParams.get("sessionToken") ||
      parsed.searchParams.get("token");
    const provider = parsed.searchParams.get("provider") as "google" | "apple" | undefined;
    if (!exchangeToken) return false;
    await exchangeMobileOAuth({ provider: provider ?? "bridge", exchangeToken });
    return true;
  } catch {
    return false;
  }
}

// Mobile OAuth exchange API
export async function exchangeMobileOAuth(payload: {
  provider: "google" | "apple" | "bridge" | string;
  authorizationCode?: string;
  idToken?: string;
  accessToken?: string;
  identityToken?: string;
  exchangeToken?: string;
  redirectUri?: string;
  codeVerifier?: string;
}): Promise<{ message?: string; user?: any }> {
  return apiClient.post(endpoints.authMobile.exchange, payload, {
    headers: { Accept: "application/json" },
  });
}

// Google native sign-in using Authorization Code + PKCE, then exchange server-side to set cookie
export async function startGoogleNativeAndExchange(): Promise<void> {
  const AuthSession = await import("expo-auth-session");
  const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID as string;
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("Missing EXPO_PUBLIC_GOOGLE_CLIENT_ID");
  }
  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  } as any;

  const redirectUri = (AuthSession as any).makeRedirectUri({ useProxy: true });
  const request = new (AuthSession as any).AuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri,
    responseType: (AuthSession as any).ResponseType.Code,
    scopes: ["openid", "email", "profile"],
    usePKCE: true,
  });
  await request.makeAuthUrlAsync(discovery);
  const res = await request.promptAsync(discovery);
  if (res.type !== "success") throw new Error("Authentication canceled");
  const code = (res.params as any)?.code as string;
  if (!code) throw new Error("Missing authorization code");
  await exchangeMobileOAuth({
    provider: "google",
    authorizationCode: code,
    redirectUri,
    codeVerifier: request.codeVerifier ?? undefined,
  });
}

// Apple native sign-in and exchange
export async function startAppleNativeAndExchange(): Promise<void> {
  const Apple = await import("expo-apple-authentication");
  const available = await (Apple as any).isAvailableAsync();
  if (!available) throw new Error("Apple Sign-In not available on this device");
  const cr = await (Apple as any).signInAsync({
    requestedScopes: [
      (Apple as any).AppleAuthenticationScope.FULL_NAME,
      (Apple as any).AppleAuthenticationScope.EMAIL,
    ],
  });
  if (!cr.identityToken && !cr.authorizationCode) throw new Error("No Apple credentials returned");
  await exchangeMobileOAuth({
    provider: "apple",
    identityToken: cr.identityToken ?? undefined,
    authorizationCode: cr.authorizationCode ?? undefined,
  });
}
