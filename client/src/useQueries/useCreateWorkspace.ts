import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface WorkspaceInput {
  name: string;
  description?: string;
  members?: { user: string; role: string }[];
}

/**
 * Hook to create a new workspace using React Query v5 mutation API.
 *
 * Usage:
 * const { mutate, isLoading, error } = useCreateWorkspace();
 * mutate({ name: '...', description: '...', members: [...] });
 */
export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  const token = localStorage.getItem('token')
  return useMutation({
    /**
     * Mutation function: calls backend to create a workspace.
     */
    // console.log("process.env.API_TOKEN",process.env.API_TOKEN)
    mutationFn: async (data: WorkspaceInput) => {
      console.log("data",data)
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorPayload = await response.json();
        throw new Error(errorPayload.message || 'Failed to create workspace');
      }
      return response.json();
    },

    /**
     * After successful mutation, invalidate the workspaces query to refetch updated data.
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    },

    /**
     * Optional: handle mutation errors globally or via callbacks.
     */
    onError: (error: Error) => {
      console.error('Workspace creation failed:', error.message);
    },
  });
}
