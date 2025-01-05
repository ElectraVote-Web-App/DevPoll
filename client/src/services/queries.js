import { useInfiniteQuery, useQuery } from "react-query";
import { getNewPopularPolls, getPoll, getPopularActivePolls, getVoteStatistics } from "./api";


export const useGetPopularActivePolls = () => {
  return useQuery({
    queryKey: ["popular_active_polls"],
    queryFn: getPopularActivePolls,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export const useGetNewPopularPolls = () => {
  return useInfiniteQuery({
    queryKey: ["new-popular-polls"],
    queryFn: ({ pageParam = 1 }) => getNewPopularPolls(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length > 0 && lastPage.length === 6) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
    refetchOnMount: "always",
  })
}

export const useGetPollById = (id) => {
  return useQuery({
    queryKey: ["poll", id],
    queryFn: () => getPoll(id),
    refetchOnMount: "always",
  });
}

export const useGetVoteStatistics = (pollId) => {
  return useQuery({
    queryKey: ["vote_statistics", pollId],
    queryFn: () => getVoteStatistics(pollId),
    refetchOnMount: "always",
  });
}