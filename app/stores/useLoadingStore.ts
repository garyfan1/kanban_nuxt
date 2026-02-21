export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref<boolean>(false);

  const showSpinner = () => {
    isLoading.value = true;
  };
  const hideSpinner = () => {
    isLoading.value = false;
  };

  return {
    isLoading,
    showSpinner,
    hideSpinner,
  };
});
