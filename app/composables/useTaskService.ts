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
  const { $api } = useNuxtApp();

  return {
    listTasks: async (): Promise<TaskApi[]> => {
      return await $api("tasks/");
    },
    getTaskById: async (id: number): Promise<TaskApi> => {
      return await $api(`tasks/${id.toString()}/`);
    },
    createTask: async (body: TaskCreateApiType): Promise<TaskApi> => {
      return await $api("tasks/", { method: "post", body: body });
    },
    patchTask: async (body: { id: number; data: Partial<TaskCreateApiType> }): Promise<TaskApi> => {
      return await $api(`tasks/${body.id.toString()}/`, { method: "patch", body: body.data });
    },
    deleteTask: async (id: number): Promise<void> => {
      return await $api(`tasks/${id.toString()}/`, { method: "delete" });
    },
  };
};
