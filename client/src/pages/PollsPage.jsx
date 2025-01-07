import { Toaster, toast } from "sonner";
import Poll from "@/components/Poll";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useGetNewPopularPolls } from "@/services/queries";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function PollsPage() {
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    hasNextPage,
  } = useGetNewPopularPolls();

    useEffect(() => {
      if (location.state?.toastMessage) {
        toast.success(location.state.toastMessage);
        location.state.toastMessage = null
        // Clear the state after showing the toast
        navigate(location.pathname, { replace: true });
      }
    }, [location, navigate]);
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
          user && <Button asChild className="rounded-xl hover:bg-[#277EBD] bg-blue-500">
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
      <Toaster richColors/>
    </section>
  );
}
