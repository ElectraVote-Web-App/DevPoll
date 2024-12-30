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
import { ChevronLeft, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function PollPage() {
  const navigate = useNavigate();
  const navigateBack = () => {
    const hasHistory = window.history.state !== null;
    navigate(hasHistory ? -1 : "/polls");
  };
  const {id} = useParams();
  const pollType = id % 2 === 0 ?"vote" : "sondage";

  return (
    <section className="space-y-5">
      <Button onClick={navigateBack} variant="outline" size="icon">
        <ChevronLeft />
      </Button>
      <Card className="w-full rounded-3xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <PollProfile
              pic={"./public/avatars/avatar6.png"}
              username={"Moumen"}
              className="bg-gray-50 p-2 self-start"
            />
            <CountDown />
          </div>
          <CardTitle>PHP or Java?</CardTitle>
          <CardDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.Make changes to your profile here. Click save when you&apos;re
            done.
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
                  You gonna be able to see the result, once the vote is
                  finished.
                </span>
              </div>
            </>
          ) : null}
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
