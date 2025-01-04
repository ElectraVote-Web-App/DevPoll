import React from "react";
import { Separator } from "@/components/ui/separator"; // Adjust the import path if needed
import { AccountForm } from "./AccountForm"; // Adjust this path based on your file structure

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Change your password.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
