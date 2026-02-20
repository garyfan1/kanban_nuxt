<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const authStore = useAuthStore();
const username = ref("");
const taskStore = useTaskStore();

onMounted(async () => {
  try {
    username.value = (await authStore.getProfile()).username || "";
    await taskStore.getTaskList();
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div class="pa-6 d-flex flex-column ga-4 fill-height">
    <div class="d-flex align-center">
      <p class="text-h4" v-if="!!username">{{ username + "'s" }} Board</p>
      <v-dialog>
        <template #activator="{ props }">
          <v-btn
            prepend-icon="mdi-calendar-plus"
            text="Create Task"
            variant="tonal"
            class="ml-auto"
            v-bind="props"
            size="large"
            rounded="lg"
          />
        </template>
        <template #default="{ isActive }">
          <EditTaskForm mode="add" @close="isActive.value = false" />
        </template>
      </v-dialog>
    </div>

    <v-empty-state
      v-if="taskStore.tasks.length <= 0"
      headline="No task yet"
      title="Get started by adding some tasks!"
      icon="mdi-calendar-blank-outline"
    ></v-empty-state>

    <v-container v-else fluid class="fill-height align-start">
      <v-row>
        <v-col cols="4" class="d-flex flex-column ga-4">
          <div class="d-flex align-center ga-2">
            <div class="rounded-lg pa-1 todo-icon">
              <v-icon icon="mdi-pencil" class="opacity-100" />
            </div>
            <p class="text-h5">To Do</p>
          </div>
          <TaskCard
            v-for="task in taskStore.todoTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :subtitle="useDateFormat(task.created_at, 'YYYY/MM/DD HH:mm').value"
            :desc="task.description"
            status="todo"
          />
        </v-col>
        <v-col cols="4" class="d-flex flex-column ga-4">
          <div class="d-flex align-center ga-2">
            <div class="rounded-lg doing-icon pa-1">
              <v-icon icon="mdi-progress-clock" />
            </div>
            <p class="text-h5">In Progress</p>
          </div>
          <TaskCard
            v-for="task in taskStore.doingTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :subtitle="useDateFormat(task.created_at, 'YYYY/MM/DD HH:mm').value"
            :desc="task.description"
            status="doing"
          />
        </v-col>
        <v-col cols="4" class="d-flex flex-column ga-4">
          <div class="d-flex align-center ga-2">
            <div class="rounded-lg done-icon pa-1">
              <v-icon icon="mdi-check" />
            </div>
            <p class="text-h5">Done</p>
          </div>
          <TaskCard
            v-for="task in taskStore.doneTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :subtitle="useDateFormat(task.created_at, 'YYYY/MM/DD HH:mm').value"
            :desc="task.description"
            status="done"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.todo-icon {
  background-color: #1565c0cc /* blue-darken-3 80% */;
}
.doing-icon {
  background-color: #f9a825cc /* yellow-darken-3 80% */;
}
.done-icon {
  background-color: #2e7d32cc /* green-darken-3 80% */;
}
</style>
