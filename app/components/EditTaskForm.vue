<script setup lang="ts">
interface EditTaskFormProps {
  id?: number;
  mode?: "add" | "edit";
  defaults?: {
    title: string;
    desc: string;
    status: "todo" | "doing" | "done";
  };
}

const { defaults, id, mode = "edit" } = defineProps<EditTaskFormProps>();
const emit = defineEmits(["close"]);

const taskStore = useTaskStore();

const formValid = ref(false);
const formTitle = ref(defaults?.title || "");
const formDesc = ref(defaults?.desc || "");
const formStatus = ref(defaults?.status || "todo");

const statusOptions = [
  { title: "To Do", value: "todo", icon: "mdi-pencil" },
  { title: "In Progress", value: "doing", icon: "mdi-progress-clock" },
  { title: "Done", value: "done", icon: "mdi-check" },
];

const notEmptyRule = (s: string) => {
  if (s.trim().length <= 0) {
    return "Title can not be empty.";
  }
  return true;
};

const handleSave = async () => {
  try {
    if (!formValid.value) {
      console.log("Form is not valid");
      return;
    }
    if (mode === "add") {
      await taskStore.createTask({
        title: formTitle.value,
        description: formDesc.value,
        status: formStatus.value,
      });
    } else {
      if (!id) {
        console.log("Edit task without id");
        return;
      }
      await taskStore.patchTask({
        id: id,
        data: {
          title: formTitle.value,
          description: formDesc.value,
          status: formStatus.value,
        },
      });
    }

    emit("close");
  } catch (e) {
    console.log(e);
  }
};

const handleDelete = async () => {
  try {
    if (!id) {
      console.log("trying to delete task but no id.");
      return;
    }
    await taskStore.deleteTask(id);
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <v-card rounded="lg" width="70%" class="align-self-center">
    <v-card-title>
      <div class="d-flex align-center ga-2 pa-2">
        <v-icon class="pa-4" :icon="mode === 'add' ? 'mdi-calendar-plus' : 'mdi-calendar-edit'" />
        <p class="text-h4">{{ mode === "add" ? "Add" : "Edit" }} Task</p>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form v-model="formValid" class="d-flex flex-column ga-4">
        <v-text-field label="Title" :rules="[notEmptyRule]" v-model="formTitle" />
        <v-select label="Status" :items="statusOptions" v-model="formStatus">
          <template #item="{ props, item }">
            <v-list-item v-bind="props" :prepend-icon="item.raw.icon"> </v-list-item>
          </template>
          <template #selection="{ item }">
            <div class="d-flex align-center ga-2">
              <v-icon :icon="item.raw.icon" />
              {{ item.title }}
            </div>
          </template>
        </v-select>
        <v-textarea label="Description" variant="outlined" v-model="formDesc"></v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions class="px-4 pb-4">
      <v-btn
        text="delete"
        variant="outlined"
        prepend-icon="mdi-trash-can"
        color="red"
        @click="handleDelete"
        v-if="mode === 'edit'"
      />
      <v-spacer />
      <v-btn prepend-icon="mdi-close" @click="emit('close')">Cancel</v-btn>
      <v-btn prepend-icon="mdi-content-save" :disabled="!formValid" @click="handleSave">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
