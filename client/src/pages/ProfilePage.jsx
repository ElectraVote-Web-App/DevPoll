"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Poll from "@/components/Poll";
import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "@/http/axiosConfig";
import { useAuth } from "@/context/AuthContext";
import { toast, Toaster } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ProfilePage() {
  const { user } = useAuth();
  const userId = user.id;
  const [polls, setPolls] = useState([]);
  const [profile, setProfile] = useState(null); // To store the profile data
  const [userVotedPolls, setUserVotedPolls] = useState([]); // To store the profile data
  const [error, setError] = useState(null);
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      setTimeout(() => {
        location.state.toastMessage = null
        // Clear the state after showing the toast
        navigate(location.pathname, { replace: true });
        
      }, 2000);
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axiosClient.get(`/polls/user/${userId}`);
        setPolls(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching polls.");
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axiosClient.get(`/users/${userId}`);
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching profile.");
      }
    };

    const fetchUserVotedPolls = async () => {
      try {
        const response = await axiosClient.get(`/users/${userId}/voted-polls`);
        setUserVotedPolls(response.data.polls);
      } catch(err) {
        setError(err.response?.data?.message || "Error fetching user voted polls.");
      }
    }
    fetchPolls();
    fetchUserProfile();
    fetchUserVotedPolls();
    
    
  }, [userId]);
  
  if (error) {
    return <p>{error}</p>;
  }
  
  return (
    <>
      <BackButton />
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 p-4">
        {/* Left Profile Section */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4 lg:sticky lg:top-4">
          <div className="flex flex-col items-center">
            {profile && (
              <Avatar className="h-20 w-20 my-4 transition-transform transform hover:scale-110 duration-300 ease-in-out">
                <AvatarImage src={`./avatars/${profile.img}`} alt="User profile picture" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
            <h2 className="text-lg font-bold">{profile?.username || "UserName"}</h2>
            <p className="text-sm text-gray-500">@{profile?.username || "username"}</p>
          </div>
          <p className="mt-4 text-sm text-center text-gray-600">
            {profile?.bio || "Lorem ipsum bio text"}
          </p>
          <div className="mt-6 space-y-8">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Polls Created</span>
              <span className="text-lg font-bold">{polls.length}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Polls Participated</span>
              <span className="text-lg font-bold">{userVotedPolls.length}</span> {/* Replace with actual vote count */}
            </div>
          </div>
          <Link to={'/me/settings'} className="mt-6 w-full">
            <Button variant="default" className="mt-6 w-full">
              Update
            </Button>
          </Link>
        </div>

        {/* Right Polls and Activities Section */}
        <div className="w-full lg:w-2/3 h-[80vh] overflow-y-auto">
          <Tabs defaultValue="my-polls" className="w-full">
            <TabsList className="sticky top-0 bg-white z-10 shadow-md grid w-full grid-cols-2">
              <TabsTrigger value="my-polls" className="transition-all duration-300 ease-in-out hover:bg-gray-100">
                My Polls
              </TabsTrigger>
              <TabsTrigger value="my-activities" className="transition-all duration-300 ease-in-out hover:bg-gray-100">
                My Activities
              </TabsTrigger>
            </TabsList>

            {/* My Polls Tab */}
            <TabsContent value="my-polls">
              <ScrollArea className="h-[70vh] rounded-md border p-4">
                <div className="space-y-4">
                  {polls.length > 0 &&
                    polls.map((poll) => (
                      <Poll
                        key={poll.id}
                        poll={poll}
                        className="transition-opacity duration-500 ease-in-out"
                      />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* My Activities Tab */}
            <TabsContent value="my-activities">
              <ScrollArea className="h-[70vh] rounded-md border p-4">
                <div className="space-y-4">
                  {userVotedPolls.map((poll, index) => (
                    <Poll
                      key={index}
                      poll={poll}
                      className="transition-opacity duration-500 ease-in-out"
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster richColors/>
    </>
  );
}
