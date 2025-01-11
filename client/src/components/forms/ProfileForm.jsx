"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/http/axiosConfig";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(30, { message: "Username must not be longer than 30 characters." }),
  email: z
    .string({ required_error: "Please select an email to display." })
    .email(),
  bio: z.string().max(160).min(4),
  avatar: z.string().optional(),
});

export function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      avatar: "",
    },
    mode: "onChange",
  });

  const {user} = useAuth()
  const userId = user.id
  // Fetch user data and initialize the form
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axiosClient.get(`/users/${userId}`);
        const data = response.data;

        form.reset({
          username: data.username || "",
          email: data.email || "",
          bio: data.bio || "",
          avatar: data.img ? `/public/avatars/${data.img}` : "",
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [form, userId]);

  const handleAvatarChange = (avatarPath) => {
    form.setValue("avatar", avatarPath);
  };
  function onSubmit(data) {
    const normalizedData = {
      ...data,
      img: data.avatar ? data.avatar.split("/").pop() : "",
    };
  
    axiosClient
      .put(`/users/${userId}`, normalizedData)
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  }
  

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Avatar Selection */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="cursor-pointer relative group"
                      onClick={() =>
                        handleAvatarChange(
                          `/public/avatars/avatar${index + 1}.png`
                        )
                      }
                    >
                      <Avatar className={"w-16 h-16"}>
                        <AvatarImage
                          src={`/public/avatars/avatar${index + 1}.png`}
                          alt={`Avatar ${index + 1}`}
                          className={cn(
                            "rounded-full transition-all duration-300 ease-in-out transform hover:scale-105",
                            field.value ===
                              `/public/avatars/avatar${index + 1}.png`
                              ? "border-4 border-blue-500 shadow-lg"
                              : "border-2 border-transparent group-hover:border-blue-300"
                          )}
                        />
                        <AvatarFallback>{`Avatar ${index + 1}`}</AvatarFallback>
                      </Avatar>
                      {field.value ===
                        `/public/avatars/avatar${index + 1}.png` && (
                        <div className="absolute top-0 right-0 p-1 bg-blue-500 rounded-full text-white text-xs font-bold">
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormDescription>
                Select an avatar to display on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio Field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
      <Toaster richColors />
    </Form>
  );
}
