import { persist } from "zustand/middleware";
import { sendExtensionAuthToken, sendExtensionLogout } from "@/utils/extension";
import { mmkvJSONStateStorage, clearEverything, setTokenInNative, create } from "./stateStorage";
import { setAuthToken } from "@/services/api/token";
import { setOnUnauthorized } from "@/services/api/events";
import { router } from "expo-router";
import {
  // new public auth APIs (NextAuth-backed)
  registerUser,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
  // NextAuth cookie helpers
  signInWithNextAuthCredentials,
  getNextAuthSession,
  signOutNextAuth,
  fetchUserProfile,
  deleteUserProfile,
  startNextAuthOAuth,
} from "@/services/api/auth";
import type { AuthUser } from "@/services/api/schemas";

type User = AuthUser & { name?: string };

type State = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  resetEmail?: string | null;
  resetToken?: string | null;
};

type Actions = {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    dob: string; // ISO date string
  }) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearError: () => void;
  setToken: (token: string, user: User) => void;
  reset: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyResetCode: (args: { email: string; code: string }) => Promise<void>;
  resetPassword: (
    args: { token: string; password: string } | { email: string; otp: string; password: string },
  ) => Promise<void>;
};

const initialState: State = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  resetEmail: null,
  resetToken: null,
};

// API base URL now handled by the shared api client + endpoints

// Private cleanup function for logout and delete account
const performCompleteCleanup = async () => {
  clearEverything();
  setAuthToken(null);
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        set({ user: null, token: null, isAuthenticated: true, isLoading: false, error: null });

        // try {
        //   // Switch to NextAuth credential flow to obtain cookie session
        //   await signInWithNextAuthCredentials(credentials.email, credentials.password);
        //   // Ensure bearer token is cleared; subsequent API calls use cookies
        //   setTokenInNative("");
        //   setAuthToken(null);
        //   let user: User | null = null;
        //   try {
        //     const { user: profile } = await fetchUserProfile();
        //     if (profile) {
        //       const u = profile as User;
        //       user = {
        //         ...u,
        //         name:
        //           u.firstName || u.lastName
        //             ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
        //             : undefined,
        //       };
        //     }
        //   } catch {
        //     const session = await getNextAuthSession();
        //     if (session?.user) {
        //       const u = session.user as User;
        //       user = {
        //         ...u,
        //         name:
        //           u.firstName || u.lastName
        //             ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
        //             : undefined,
        //       };
        //     }
        //   }
        //   set({ user, token: null, isAuthenticated: true, isLoading: false, error: null });
        // } catch (error) {
        //   set({ isLoading: false, error: error instanceof Error ? error.message : "Login failed" });
        //   throw error;
        // }
      },

      register: async (_credentials) => {
        set({ isLoading: true, error: null });
        try {
          await registerUser(_credentials);
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Registration failed",
          });
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          await forgotPasswordApi(email);
          set({ isLoading: false, resetEmail: email });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Request failed",
          });
          throw error;
        }
      },

      verifyResetCode: async ({ email, code }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await verifyOtpApi({ email, otp: code });
          if (!res?.verified) {
            throw new Error(res?.message || "Invalid OTP");
          }
          set({ isLoading: false, resetEmail: email, resetToken: code });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Verification failed",
          });
          throw error;
        }
      },

      resetPassword: async (args) => {
        set({ isLoading: true, error: null });
        try {
          // Supports both token and email+otp flows
          if ("token" in args) {
            await resetPasswordApi({ token: args.token, password: args.password });
          } else {
            await resetPasswordApi({ email: args.email, otp: args.otp, password: args.password });
          }
          set({ isLoading: false, resetToken: null });
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : "Reset failed" });
          throw error;
        }
      },

      logout: async () => {
        try {
          await signOutNextAuth();
        } finally {
          try {
            sendExtensionLogout();
          } finally {
            await performCompleteCleanup();
          }
        }
      },

      deleteAccount: async () => {
        try {
          await deleteUserProfile();

          // After successful deletion, perform complete cleanup
          sendExtensionLogout();
          await performCompleteCleanup();
        } catch (error) {
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      setToken: (token, user) => {
        setTokenInNative(token);
        setAuthToken(token);
        sendExtensionAuthToken(token);
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },

      reset: () => set(initialState),
    }),
    {
      name: "auth-store",
      storage: mmkvJSONStateStorage,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        try {
          const token = state?.token ?? null;
          setAuthToken(token);
          if (token) {
            // Ensure native side also has the token on cold start
            setTokenInNative(token);
          }
        } catch {}
      },
    },
  ),
);

// Register a global unauthorized handler used by the API client
setOnUnauthorized(async () => {
  try {
    await useAuthStore.getState().logout();
  } finally {
    router.replace("/(auth)/login");
  }
});
