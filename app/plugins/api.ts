let refreshPromise: Promise<void> | null = null;

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();

  const api = $fetch.create({
    baseURL: "http://localhost:8000/api/",
    retry: 1,
    retryStatusCodes: [401],

    onRequest({ options }) {
      if (authStore.accessToken) {
        options.headers.set("Authorization", "Bearer " + authStore.accessToken);
      }
    },

    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        const url = request.toString();
        if (url.includes("token/") || url.includes("register/")) {
          return;
        }
        try {
          if (!refreshPromise) {
            refreshPromise = authStore.refreshLogIn();
          }
          await refreshPromise;
          options.headers.set("Authorization", `Bearer ${authStore.accessToken}`);
        } catch {
          authStore.logout();
        } finally {
          refreshPromise = null;
        }
      }
    },
  });

  return { provide: { api } };
});
