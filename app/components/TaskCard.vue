<script setup lang="ts">
interface TaskCardProps {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  status?: "todo" | "doing" | "done";
}
const { id, title, subtitle, desc, status = "todo" } = defineProps<TaskCardProps>();
const taskStore = useTaskStore();

const handleMoveNext = async () => {
  if (status === "todo") {
    await taskStore.patchTask({ id: id, data: { status: "doing" } });
  }
  if (status === "doing") {
    await taskStore.patchTask({ id: id, data: { status: "done" } });
  }
};
const handleMoveBack = async () => {
  if (status === "doing") {
    await taskStore.patchTask({ id: id, data: { status: "todo" } });
  }
  if (status === "done") {
    await taskStore.patchTask({ id: id, data: { status: "doing" } });
  }
};

const getBorderColor = computed(() => {
  if (status === "todo") return "todo-border";
  if (status === "doing") return "doing-border";
  if (status === "done") return "done-border";
});
const getSubtitleColor = computed(() => {
  if (status === "todo") return "text-blue-lighten-1";
  if (status === "doing") return "text-amber-lighten-1";
  if (status === "done") return "text-green-lighten-1";
});
const getStatusColor = computed(() => {
  if (status === "todo") return "blue-lighten-1";
  if (status === "doing") return "amber-lighten-1";
  if (status === "done") return "green-lighten-1";
});
</script>

<template>
  <v-card :class="[getBorderColor, 'bg-surface']" variant="outlined" rounded="lg">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle :class="getSubtitleColor">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text>
      {{ desc }}
    </v-card-text>
    <v-divider class="mx-4" />
    <v-card-actions class="justify-space-between">
      <v-btn
        icon="mdi-chevron-left"
        :class="status === 'todo' && 'hidden'"
        :color="getStatusColor"
        @click="handleMoveBack"
        rounded="sm"
        density="comfortable"
      />
      <v-dialog>
        <template #activator="{ props }">
          <v-btn prepend-icon="mdi-calendar-edit" :color="getStatusColor" v-bind="props"
            >Edit</v-btn
          >
        </template>
        <template #default="{ isActive }">
          <EditTaskForm
            @close="isActive.value = false"
            :id="id"
            :defaults="{ title: title, status: status, desc: desc }"
          />
        </template>
      </v-dialog>
      <v-btn
        icon="mdi-chevron-right"
        :class="status === 'done' && 'hidden'"
        :color="getStatusColor"
        @click="handleMoveNext"
        rounded="sm"
        density="comfortable"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}

.todo-border {
  border-color: #42a5f5; /* blue-lighten-1 */
}
.doing-border {
  border-color: #ffca28; /* amber-lighten-1 */
}
.done-border {
  border-color: #66bb6a; /* green-lighten-1 */
}
</style>
