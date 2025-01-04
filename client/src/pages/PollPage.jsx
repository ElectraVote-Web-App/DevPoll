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
import { useGetPollById } from "@/services/queries";
import { Info } from "lucide-react";
// import { ChevronLeft, Info } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";

function PollPage() {
  // const navigate = useNavigate();
  // const navigateBack = () => {
  //   const hasHistory = window.history.state !== null;
  //   navigate(hasHistory ? -1 : "/polls");
  // };
  const {id} = useParams();
  const {data: poll, isLoading, isError, error} = useGetPollById(id);
  console.log(poll)

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="space-y-5">
      {/* <Button onClick={navigateBack} variant="outline" size="icon">
        <ChevronLeft />
      </Button> */}
      <BackButton/>
      <Card className="w-full rounded-3xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <PollProfile
              pic={`./public/avatars/${poll.creator.img}`}
              username={poll.creator.username}
              className="bg-gray-50 p-2 self-start"
            />
            <CountDown end_time={poll.end_time} />
          </div>
          <CardTitle>{poll.title}</CardTitle>
          <CardDescription>
            {poll.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {poll.options.length === 0 && <p className="text-gray-500 italic">No votes yet</p>}
          {poll.options.length > 0 && poll.type === "sondage" && <SondageBars options={poll.options} />}
          {poll.options.length > 0 && poll.type === "vote" && <>
              <VoteBars options={poll.options} />
              <div className="flex items-start sm:items-center gap-x-1 my-2">
                <Info size="14" className="stroke-gray-600 mt-1 sm:mt-0" />
                <span className="text-gray-500 text-xs">
                  You gonna be able to see the result, once the vote is
                  finished.
                </span>
              </div>
            </>}
        </CardContent>
        <CardFooter>
          <Button
            className="rounded-xl w-full bg-blue-500 hover:bg-blue-600"
            size="lg"
          >
            Vote
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
export default PollPage;
