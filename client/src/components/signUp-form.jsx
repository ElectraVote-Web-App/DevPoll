import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/http/axiosConfig";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage } from "./ui/avatar";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  img: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function SignUpForm({ onSignUpSuccess, className, ...props }) {
  const { toast } = useToast();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (selectedAvatar) {
        data.img = selectedAvatar;
      }
      const response = await axios.post("/auth/signup", data);
      const { message } = response.data;

      if (onSignUpSuccess) {
        onSignUpSuccess();
      }

      toast({
        title: "Registration Successful",
        description: "You have successfully registered.",
      });

      console.log("Registration successful:", message);
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || "An error occurred"
      );

      toast({
        title: "Registration Failed",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const avatars = [
    "avatar1.png",
    "avatar2.png",
    "avatar3.png",
    "avatar4.png",
    "avatar5.png",
    "avatar6.png",
  ];

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    setValue("img", avatar);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            {`Let's get started. Fill in the details below to create your account.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex justify-center gap-2">
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar}
                    className={`cursor-pointer transition-transform duration-150 ${
                      selectedAvatar === avatar
                        ? "border-2 border-blue-500"
                        : "hover:border-2 hover:border-green-500 hover:scale-125"
                    }`}
                    onClick={() => handleAvatarClick(avatar)}
                  >
                    <AvatarImage src={`./public/avatars/${avatar}`} />
                  </Avatar>
                ))}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="@User Name"
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <span className="ml-auto text-sm text-gray-500">
                    Minimum 8 characters.
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

SignUpForm.propTypes = {
  onSignUpSuccess: PropTypes.func,
  className: PropTypes.string,
};
