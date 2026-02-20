export const useTaskStore = defineStore("task", () => {
  const tasks = ref<TaskApi[]>([]);

  const taskService = useTaskService();

  const todoTask = computed(() => {
    return tasks.value.filter((t) => t.status === "todo");
  });
  const doingTask = computed(() => {
    return tasks.value.filter((t) => t.status === "doing");
  });
  const doneTask = computed(() => {
    return tasks.value.filter((t) => t.status === "done");
  });

  const getTaskList = async () => {
    const resp = await taskService.listTasks();
    tasks.value = resp.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    return tasks.value;
  };

  const getTaskById = async (id: number) => {
    const resp = await taskService.getTaskById(id);
    return resp;
  };
  const createTask = async (body: TaskCreateApiType) => {
    const resp = await taskService.createTask(body);
    await getTaskList();
    return resp;
  };
  const deleteTask = async (id: number) => {
    await taskService.deleteTask(id);
    await getTaskList();
  };
  const patchTask = async (body: { id: number; data: Partial<TaskCreateApiType> }) => {
    const resp = await taskService.patchTask(body);
    await getTaskList();
    return resp;
  };

  return {
    tasks,
    todoTask,
    doingTask,
    doneTask,
    getTaskList,
    getTaskById,
    createTask,
    deleteTask,
    patchTask,
  };
});
