import { Toaster, toast } from "sonner";
import BackButton from "@/components/BackButton";
import CountDown from "@/components/CountDown";
import PollProfile from "@/components/PollProfile";
import { SondageBars } from "@/components/SondageBars";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VoteBars } from "@/components/VoteBars";
import { Info } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";

const fetchPollCreatorInfo = (pollId) => {
  return { creatorId: "123", username: "Moumen" };
};

const deletePoll = (pollId) => {
  console.log(`Poll with ID ${pollId} deleted.`);
  return true;
};

function PollPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pollCreator, setPollCreator] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const currentUser = "123";

  const pollType = id % 2 === 0 ? "vote" : "sondage";

  useEffect(() => {
    const creatorInfo = fetchPollCreatorInfo(id);
    setPollCreator(creatorInfo);
    setIsCreator(creatorInfo.creatorId === currentUser);
  }, [id]);

  const handleDelete = () => {
    const success = deletePoll(id);
    if (success) {
      navigate("/polls", { state: { toastMessage: "Poll deleted successfully" } });
    } else {
      toast.error("Failed to delete the poll. Please try again.");
    }
  };

  return (
    <section className="space-y-5">
      <BackButton />
      <Card className="w-full rounded-3xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <PollProfile
              pic={"./public/avatars/avatar6.png"}
              username={pollCreator?.username || "Loading..."}
              className="bg-gray-50 p-2 self-start"
            />
            <CountDown />
          </div>
          <CardTitle>PHP or Java?</CardTitle>
          <CardDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pollType === "sondage" ? (
            <SondageBars />
          ) : pollType === "vote" ? (
            <>
              <VoteBars />
              <div className="flex items-start sm:items-center gap-x-1 my-2">
                <Info size="14" className="stroke-gray-600 mt-1 sm:mt-0" />
                <span className="text-gray-500 text-xs">
                  You will be able to see the result once the vote is finished.
                </span>
              </div>
            </>
          ) : null}
        </CardContent>
        <CardFooter>
          {isCreator ? (
            <div className="flex justify-end gap-2 w-full">
              <Button
                className="rounded-md bg-blue-500 hover:bg-blue-600 text-xs px-3 py-1"
                size="sm"
              >
                <Link to={`/polls/edit/${id}`}>Edit</Link>
              </Button>
              <Button
                className="rounded-md bg-red-500 hover:bg-red-600 text-xs px-3 py-1"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button className="rounded-xl w-full bg-blue-500 hover:bg-blue-600" size="lg">
              Vote
            </Button>
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
    </section>
  );
}

export default PollPage;
