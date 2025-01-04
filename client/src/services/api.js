import axiosClient from "@/http/axiosConfig";

export const getPopularActivePolls = async() => (await axiosClient.get('/polls?filter=popular_active')).data;
export const getNewPopularPolls = async(page, limit = 6) => (await axiosClient.get(`/polls?page=${page}&limit=${limit}`)).data;

export const getPoll = async(id) => (await axiosClient.get(`/polls/${id}`)).data;
