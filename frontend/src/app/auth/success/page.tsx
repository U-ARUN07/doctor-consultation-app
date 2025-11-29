"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { userAuthStore } from "@/store/authStore";

function AuthSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setUser = userAuthStore((state) => state.setUser);

    useEffect(() => {
        const token = searchParams.get("token");
        const userParam = searchParams.get("user");

        if (token && userParam) {
            try {
                const user = JSON.parse(userParam);
                setUser(user, token);
                // Use replace instead of push for faster history navigation
                router.replace("/");
            } catch (error) {
                console.error("Failed to parse user data:", error);
                router.replace("/login?error=auth_failed");
            }
        } else {
            // If no token, redirect to login immediately
            router.replace("/login");
        }
    }, [searchParams, setUser, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Logging you in...</h2>
                <p className="text-gray-500">Please wait while we redirect you to the dashboard.</p>
            </div>
        </div>
    );
}

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthSuccessContent />
        </Suspense>
    );
}
