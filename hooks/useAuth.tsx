import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "@firebase/auth";
import {auth} from "@/firebase";
import {useRouter} from "next/router";

interface AuthProviderProps {
    children: React.ReactNode
}

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {
    },
    signIn: async () => {
    },
    logout: async () => {
    },
    error: null,
    loading: false
})

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged in...
                    setUser(user)
                    setLoading(false)
                } else {
                    // Not logged in...
                    setUser(null)
                    setLoading(true)
                    router.push('/login')
                }

                setInitialLoading(false)
            }),
        [auth]
    )
    const router = useRouter();

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push('/');
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push('/');
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    }

    const logout = async () => {
        setLoading(true);

        await signOut(auth)
            .then(() => {
                setUser(null);
                router.push('/login');
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false));
    }

    const memoedValue = useMemo(() => ({user, signUp, signIn, logout, loading, error}), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}> {!initialLoading && children}   </AuthContext.Provider>);
}

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;
