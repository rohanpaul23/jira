import { useQuery } from '@tanstack/react-query';
// import dotenv from 'dotenv';
// dotenv.config();


const fetchWorkspaces = async () => {
  const authToken = localStorage.getItem('token')
  console.log("authToken",authToken)
  console.log("fetchWorkspaces")
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/workspaces?onlyMemberWorkspaces=true',{
    method: 'GET',
    headers,
  });
  if(response.ok){
    const data = await response.json();
    console.log("data",data);
  }
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const useWorkspaces = () => {
  console.log('useWorkspaces is being executed');
  const { data, error, isLoading } = useQuery({
    queryKey: ['workspaces'],
    queryFn: fetchWorkspaces,
    enabled: true,
  });
  return { data, error, isLoading };
};