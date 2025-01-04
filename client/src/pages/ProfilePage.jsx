"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Poll from "@/components/Poll";
import BackButton from "@/components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <>
      <BackButton />
      <div className="container mx-auto flex gap-6">
        {/* Left Profile Section */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 sticky top-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-20 w-20 my-4 transition-transform transform hover:scale-110 duration-300 ease-in-out">
              <AvatarImage src="./public/avatars/avatar6.png" alt="User profile picture" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-bold">UserName</h2>
            <p className="text-sm text-gray-500">@alice</p>
          </div>
          <p className="mt-4 text-sm text-center text-gray-600">
            Lorem ipsum bio text lodsmk mendor kajsti mendor fal
          </p>
          <div className="mt-6 space-y-8">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Polls</span>
              <span className="text-lg font-bold">1.2k</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Votes</span>
              <span className="text-lg font-bold">543</span>
            </div>
          </div>
          <Button variant="default" className="mt-6 w-full">
            <Link to={'/me/settings'}>Update</Link>
          </Button>
        </div>

        {/* Right Polls and Activities Section */}
        <div className="w-2/3 h-[80vh] overflow-y-auto">
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
              <div className="space-y-4 mt-4">
                {[...Array(9)].map((_, index) => (
                  <Poll key={index} id={index + 1} status={index === 0 ? "closed" : ""} className="transition-opacity duration-500 ease-in-out" />
                ))}
              </div>
            </TabsContent>

            {/* My Activities Tab */}
            <TabsContent value="my-activities">
              <div className="space-y-4 mt-4">
                {[...Array(5)].map((_, index) => (
                  <Poll key={index} id={index + 10} voted={true} className="transition-opacity duration-500 ease-in-out" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
