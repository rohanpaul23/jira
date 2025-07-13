// useDeleteWorkSpace.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteWorkspace = (workspaceId) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token')
  console.log("workspaceId",workspaceId)
   const deleteWorkspace = async ({ workspaceId }: { workspaceId: string }) => {
    const response = await fetch(`/api/workspaces/${workspaceId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries('workspaces');
    },
  });

  return { mutate, isLoading, isError, error };
};

export default useDeleteWorkspace;