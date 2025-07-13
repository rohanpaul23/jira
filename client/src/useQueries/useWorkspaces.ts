import { useQuery } from '@tanstack/react-query';
// import dotenv from 'dotenv';
// dotenv.config();


const fetchWorkspaces = async () => {
  const authToken = localStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  let data
  const response = await fetch('/api/workspaces?onlyMemberWorkspaces=true',{
    method: 'GET',
    headers,
  });
  if(response.ok){
    data = await response.json();
  }
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return data;
};

export const useWorkspaces = () => {
  const token = localStorage.getItem('token');
  const { data, error, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: fetchWorkspaces,
    enabled: Boolean(token),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    cacheTime: 0
  });
  console.log("useWorkspaces", data)
  if (isLoading || !data) {
    return { data: null, error, isLoading };
  }
  return { data, error, isLoading };  
};