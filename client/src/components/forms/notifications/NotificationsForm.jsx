"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const notificationsFormSchema = z.object({
  newPolls: z.boolean().default(true),
  pollUpdates: z.boolean().default(true),
  pollReminders: z.boolean().default(false),
  messageNotifications: z.boolean().default(true),
  platformUpdates: z.boolean().default(false),
});

const defaultValues = {
  newPolls: true,
  pollUpdates: true,
  pollReminders: false,
  messageNotifications: true,
  platformUpdates: false,
};

export function NotificationsForm() {
  const form = useForm({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data) {
    toast.success(
      <div>
        <p>You submitted the following values:</p>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    );
    console.log("Submitted data:", data); // Replace with API call to save preferences
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Poll Notifications */}
        <div>
          <h3 className="mb-4 text-lg font-medium">Poll Notifications</h3>
          <div className="space-y-4">
            {[
              { name: "newPolls", label: "New Polls", description: "Get notified about new polls." },
              {
                name: "pollUpdates",
                label: "Poll Updates",
                description: "Get updates for polls you created or subscribed to.",
              },
              {
                name: "pollReminders",
                label: "Poll Reminders",
                description: "Receive reminders for polls nearing deadlines.",
              },
            ].map(({ name, label, description }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{label}</FormLabel>
                      <FormDescription>{description}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Communication Preferences */}
        <div>
          <h3 className="mb-4 text-lg font-medium">Communication Preferences</h3>
          <div className="space-y-4">
            {[
              {
                name: "messageNotifications",
                label: "Messages",
                description: "Get notified about messages related to polls.",
              },
              {
                name: "platformUpdates",
                label: "Platform Updates",
                description: "Receive updates about new features and announcements.",
              },
            ].map(({ name, label, description }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{label}</FormLabel>
                      <FormDescription>{description}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button type="submit">Update Notifications</Button>
      </form>
      <Toaster richColors/>
    </Form>
  );
}
