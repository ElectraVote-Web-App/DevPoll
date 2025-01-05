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
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import NotFound from "./NotFound";

function PollPage() {
  const { id } = useParams();
  const { data: poll, isLoading, isError, error } = useGetPollById(id);
  const { width, height } = useWindowSize();

  console.log(poll?.creator?.img);

  if (isNaN(parseInt(id))) {
    return <NotFound />;
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="space-y-5">
      <BackButton />
      <Card className="w-full rounded-3xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-x-2">
              <PollProfile
                pic={`/avatars/${poll?.creator?.img}`}
                username={poll.creator.username}
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
              {poll.end_time > new Date().toISOString() && (
                <div className="flex items-start sm:items-center gap-x-1 my-2">
                  <Info size="14" className="stroke-gray-600 mt-1 sm:mt-0" />
                  <span className="text-gray-500 text-xs">
                    You gonna be able to see the result, once the vote is
                    finished.
                  </span>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {poll.end_time < new Date().toISOString() && (
        <Confetti width={width} height={height} />
      )}
    </section>
  );
}
export default PollPage;
