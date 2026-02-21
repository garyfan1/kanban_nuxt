export const useAuthStore = defineStore("auth", () => {
  const authService = useAuthService();
  const accessToken = useCookie<string | null>("accessToken", { maxAge: 60 * 5 }); // 5 mins
  const refreshToken = useCookie<string | null>("refreshToken", { maxAge: 60 * 60 * 24 }); // 1 day

  const isLoggedIn = computed(() => {
    return !!accessToken.value;
  });

  const logIn = async ({ username, password }: { username: string; password: string }) => {
    const resp = await authService.signIn({ username: username, password: password });
    accessToken.value = resp.access;
    refreshToken.value = resp.refresh;
  };
  const getProfile = async () => {
    const resp = await authService.getProfile();
    return resp;
  };

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    navigateTo("/");
  };

  const refreshLogIn = async () => {
    if (refreshToken.value) {
      const resp = await authService.refreshLogIn(refreshToken.value);
      accessToken.value = resp.access;
      refreshToken.value = resp.refresh;
    } else {
      logout();
    }
  };

  const signUp = async (cred: { username: string; password: string }) => {
    const resp = await authService.signUp(cred);
    return resp;
  };

  return {
    accessToken,
    refreshToken,
    isLoggedIn,
    getProfile,
    logIn,
    logout,
    refreshLogIn,
    signUp,
  };
});
