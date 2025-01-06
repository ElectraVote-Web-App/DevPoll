import { useMutation } from 'react-query';
import { votePoll } from './api';

export const useVotePoll = () => {
  return useMutation({
    mutationKey: ["votePoll"],
    mutationFn: ({ pollId, optionId }) => votePoll(pollId, optionId),
    
  });
};