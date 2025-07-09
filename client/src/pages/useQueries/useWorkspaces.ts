import { useQuery } from '@tanstack/react-query';
// import dotenv from 'dotenv';
// dotenv.config();


const fetchWorkspaces = async () => {
  // const token = import.meta.env.VITE_API_TOKEN

  const authToken = localStorage.getItem('token')

  console.log("authToken",authToken)
  console.log("fetchWorkspaces")
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch('/api/workspaces',{
    method: 'GET',
    headers,
  });

  console.log(response)
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
  console.log('Data:', data);
  console.log('Error:', error);
  console.log('Loading:', isLoading);
  return { data, error, isLoading };
};