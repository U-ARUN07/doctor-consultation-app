import SettingsPage from "@/components/SettingsPage/SettingsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings | MediCare+",
    description: "Manage your account settings.",
};

export default function Page() {
    return <SettingsPage />;
}
