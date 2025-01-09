import { Toaster, toast } from "sonner";
import BackButton from "@/components/BackButton";
import CountDown from "@/components/CountDown";
import PollProfile from "@/components/PollProfile";
import { SondageBars } from "@/components/SondageBars";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VoteBars } from "@/components/VoteBars";
import { useGetPollById } from "@/services/queries";
import { Info } from "lucide-react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import NotFound from "./NotFound";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/http/axiosConfig"; // Replace with your axios config

function PollPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCreator, setIsCreator] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { user } = useAuth();
  const currentUser = user?.id; // Ensure `user` exists
  const { data: poll, isLoading, isError, error } = useGetPollById(id);
  const { width, height } = useWindowSize();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 2000);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (poll && poll.creator) {
      setIsCreator(String(poll.creator.id) === String(currentUser));
    }
  }, [poll, currentUser]);

  if (isNaN(parseInt(id))) {
    return <NotFound />;
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  const handleDelete = () => {
    axiosClient
      .delete(`/polls/${id}`)
      .then(() => {
        toast.success("Poll deleted successfully");
        navigate("/me", {
          state: { toastMessage: "Poll deleted successfully" },
        });
      })
      .catch(() => {
        toast.error("Failed to delete the poll. Please try again.");
      });
  };

  return (
    <section className="space-y-5">
      <BackButton />
      <Card className="w-full rounded-3xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-x-2">
              <PollProfile
                pic={`/avatars/${poll?.creator?.img}`}
                username={poll?.creator?.username}
                className="bg-gray-50 p-2 self-start"
              />
              <div className="text-xs text-gray-500 italic">
                · {poll.type === "sondage" ? "Sondage" : "Vote"}
              </div>
            </div>
            <CountDown end_time={poll.end_time} />
          </div>
          <CardTitle>{poll.title}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {poll.options.length === 0 && (
            <p className="text-gray-500 italic">No votes yet</p>
          )}
          {poll.options.length > 0 && poll.type === "sondage" && (
            <SondageBars poll={poll} options={poll.options} />
          )}
          {poll.options.length > 0 && poll.type === "vote" && (
            <>
              <VoteBars poll={poll} options={poll.options} />
              {new Date(poll.end_time) > new Date() && (
                <div className="flex items-start sm:items-center gap-x-1 my-2">
                  <Info size="14" className="stroke-gray-600 mt-1 sm:mt-0" />
                  <span className="text-gray-500 text-xs">
                    You will be able to see the result once the vote is
                    finished.
                  </span>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          {isCreator && (
            <div className="flex justify-end gap-2 w-full">
              <Link to={`/polls/edit/${id}`}>
                <Button
                  className="rounded-md bg-blue-500 hover:bg-blue-600 text-xs px-3 py-1"
                  size="sm"
                >
                  Edit
                </Button>
              </Link>
              <Button
                className="rounded-md bg-red-500 hover:bg-red-600 text-xs px-3 py-1"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      <Toaster richColors />
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
      {new Date(poll.end_time) < new Date() && (
        <Confetti width={width} height={height} />
      )}
    </section>
  );
}

export default PollPage;
