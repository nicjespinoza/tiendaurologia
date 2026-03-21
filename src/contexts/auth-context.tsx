"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type UserProfile = {
  uid: string;
  firstName: string;
  lastName: string;
  idNumber: string; // cedula
  phone: string;
  email: string;
  address: string;
  role?: "admin" | "cashier" | "customer";
  createdAt?: Date;
  ip?: string;
  geo?: {
    country?: string;
    region?: string;
    city?: string;
    zip?: string;
    lat?: number;
    lng?: number;
    timeZone?: string;
  };
  savedCards?: Array<{
    tokenTilopay: string;
    last4: string;
    brand?: string;
    expiry?: string;
  }>;
};

type AuthContextValue = {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  registerUser: (
    data: Omit<UserProfile, "uid" | "createdAt" | "geo" | "ip"> & { password: string },
    geo?: {
      ip?: string;
      country?: string;
      region?: string;
      city?: string;
      zip?: string;
      lat?: number;
      lng?: number;
      timeZone?: string;
    }
  ) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setUserProfile(null);
      if (!fbUser || !db) {
        setLoading(false);
        return;
      }
      const ref = doc(db, "users", fbUser.uid);
      const unsubProfile = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setUserProfile({
            uid: fbUser.uid,
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            idNumber: data.idNumber ?? "",
            phone: data.phone ?? "",
            email: data.email ?? fbUser.email ?? "",
            address: data.address ?? "",
            role: data.role ?? "customer",
            createdAt: data.createdAt?.toDate?.() ?? undefined,
            ip: data.ip,
            geo: data.geo,
            savedCards: data.savedCards ?? [],
          });
        }
        setLoading(false);
      });
      return () => unsubProfile();
    });
    return () => unsub();
  }, []);

  const registerUser: AuthContextValue["registerUser"] = async (data, geo) => {
    if (!auth || !db) throw new Error("Firebase no configurado");
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const ref = doc(db, "users", cred.user.uid);
    await setDoc(ref, {
      firstName: data.firstName,
      lastName: data.lastName,
      idNumber: data.idNumber,
      phone: data.phone,
      email: data.email,
      address: data.address,
      role: "customer",
      createdAt: serverTimestamp(),
      ip: geo?.ip,
      geo: {
        country: geo?.country,
        region: geo?.region,
        city: geo?.city,
        zip: geo?.zip,
        lat: geo?.lat,
        lng: geo?.lng,
        timeZone: geo?.timeZone,
      },
    });
  };

  const signInEmail = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase no configurado");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = async () => {
    if (!auth) throw new Error("Firebase no configurado");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const value = useMemo(
    () => ({ user, userProfile, loading, registerUser, signInEmail, signInGoogle, logout }),
    [user, userProfile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
