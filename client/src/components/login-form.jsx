import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/http/axiosConfig";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({ onLoginSuccess, className, ...props }) {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post("/auth/signin", data);
      const { token } = response.data;

      localStorage.setItem("token", token);

      if (onLoginSuccess) {
        onLoginSuccess(token);
      }
      
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });

    } catch (error) {
      
      console.error("Login failed:", error.response?.data?.message || "An error occurred");
        
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func,
  className: PropTypes.string
}