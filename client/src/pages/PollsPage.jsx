import Poll from "@/components/Poll";
import { Button } from "@/components/ui/button";

export default function PollsPage() {
  const polls = [[], [], [], [], [], []];

  return (
    <section>
      <ul className="sm:grid grid-cols-2 gap-5 space-y-3 sm:space-y-0">
        {polls.map((_, index) => (
          <Poll key={index} status={index / 2 === 0 ? "closed" : ""} />
        ))}
      </ul>
      <div className="flex justify-center w-full py-5">
        <Button variant="outline" className="rounded-3xl" size='lg'>See more</Button>
      </div>
    </section>
  );
}
