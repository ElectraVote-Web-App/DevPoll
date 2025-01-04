import Poll from "@/components/Poll";
import { Button } from "@/components/ui/button";
import { useGetNewPopularPolls } from "@/services/queries";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function PollsPage({ AUTH }) {
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    hasNextPage,
  } = useGetNewPopularPolls();

  const navigateBack = () => {
    const hasHistory = window.history.state !== null;
    navigate(hasHistory ? -1 : "/polls");
  };

  if (isLoading || isError) return null;

  if(data?.pages[0].length <= 0) return <h1 className="text-center text-2xl">No polls found</h1>;


  return (
    <section>
      <ul className="flex justify-between items-center mb-5">
      <Button onClick={navigateBack} variant="outline" size="icon">
        <ChevronLeft />
      </Button>

        {
          AUTH && <Button asChild className="rounded-xl hover:bg-[#277EBD] bg-blue-500">
          <Link to={'/polls/create'}>Create new</Link>
        </Button>
        }
      </ul>
      <ul className="sm:grid grid-cols-2 gap-5 space-y-3 sm:space-y-0">
        {
          data?.pages.map((page) => page.map((poll, index) => (<Poll key={index} poll={poll} />)))
        }
      </ul>
      <div className="flex justify-center w-full py-5">
      {hasNextPage && (
        <Button
        onClick={fetchNextPage}
        variant="outline"
        disabled={isFetchingNextPage}
        className="rounded-3xl" size='lg'
      >
        {isFetchingNextPage ? <>Loading more...{" "}<Loader2 className="animate-spin h-4 w-4"/> </> : 'Show more'}
      </Button>
      )}
      </div>
    </section>
  );
}

PollsPage.propTypes = {
  AUTH: PropTypes.bool.isRequired,
};
