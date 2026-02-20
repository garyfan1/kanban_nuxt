export interface TaskApi {
  id: number;
  user: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
}

export type TaskCreateApiType = Pick<TaskApi, "title" | "description" | "status">;

export const useTaskService = () => {
  const nuxtApp = useNuxtApp();

  return {
    listTasks: async (): Promise<TaskApi[]> => {
      return await nuxtApp.$api("tasks/");
    },
    getTaskById: async (id: number): Promise<TaskApi> => {
      return await nuxtApp.$api(`tasks/${id.toString()}/`);
    },
    createTask: async (body: TaskCreateApiType): Promise<TaskApi> => {
      return await nuxtApp.$api("tasks/", { method: "post", body: body });
    },
    patchTask: async (body: { id: number; data: Partial<TaskCreateApiType> }): Promise<TaskApi> => {
      return await nuxtApp.$api(`tasks/${body.id.toString()}/`, {
        method: "patch",
        body: body.data,
      });
    },
    deleteTask: async (id: number): Promise<void> => {
      return await nuxtApp.$api(`tasks/${id.toString()}/`, { method: "delete" });
    },
  };
};
