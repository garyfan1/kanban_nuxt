import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", () => {
  const isShown = ref<boolean>(false);
  const message = ref<string>("");
  const color = ref<"info" | "error" | "success">("info");

  const showSnackbar = (msg: string, type: "error" | "info" | "success" = "info") => {
    message.value = msg;
    color.value = type;
    isShown.value = true;
  };

  return {
    isShown,
    message,
    color,
    showSnackbar,
  };
});
