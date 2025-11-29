"use client";
import React, { useState } from "react";
import Header from "../landing/Header";
import { userAuthStore } from "@/store/authStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Bell, Lock, User } from "lucide-react";

const SettingsPage = () => {
    const { user } = userAuthStore();
    const [loading, setLoading] = useState(false);

    // Dummy state for notifications
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        promotional: false,
    });

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Password update functionality coming soon!");
        }, 1000);
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <Header showDashboardNav={true} />
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600">Manage your account preferences</p>
                    </div>

                    <Tabs defaultValue="account" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3 max-w-md">
                            <TabsTrigger value="account" className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>Account</span>
                            </TabsTrigger>
                            <TabsTrigger value="security" className="flex items-center space-x-2">
                                <Lock className="w-4 h-4" />
                                <span>Security</span>
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="flex items-center space-x-2">
                                <Bell className="w-4 h-4" />
                                <span>Notifications</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="account">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Information</CardTitle>
                                    <CardDescription>
                                        View your basic account details. To edit, visit your Profile.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input value={user.name} disabled />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email Address</Label>
                                            <Input value={user.email} disabled />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>User Role</Label>
                                            <Input value={user.type} className="capitalize" disabled />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Settings</CardTitle>
                                    <CardDescription>
                                        Manage your password and security preferences.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input id="current-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input id="confirm-password" type="password" />
                                        </div>
                                        <Button type="submit" disabled={loading}>
                                            {loading ? "Updating..." : "Update Password"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Preferences</CardTitle>
                                    <CardDescription>
                                        Choose how you want to receive updates.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="email-notif"
                                            checked={notifications.email}
                                            onCheckedChange={() => handleNotificationChange('email')}
                                        />
                                        <label
                                            htmlFor="email-notif"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Email Notifications
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="sms-notif"
                                            checked={notifications.sms}
                                            onCheckedChange={() => handleNotificationChange('sms')}
                                        />
                                        <label
                                            htmlFor="sms-notif"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            SMS Notifications
                                        </label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="promo-notif"
                                            checked={notifications.promotional}
                                            onCheckedChange={() => handleNotificationChange('promotional')}
                                        />
                                        <label
                                            htmlFor="promo-notif"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Marketing & Promotional Emails
                                        </label>
                                    </div>

                                    <Button onClick={() => alert("Preferences saved!")}>
                                        Save Preferences
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
