interface SignInResp {
  access: string;
  refresh: string;
}

export const useAuthService = () => {
  const { $api } = useNuxtApp();

  return {
    signIn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }): Promise<SignInResp> => {
      return await $api("token/", {
        method: "post",
        body: { username: username, password: password },
      });
    },
    getProfile: async (): Promise<{ username: string }> => {
      return await $api("profile/", { method: "get" });
    },
    refreshLogIn: async (refreshToken: string): Promise<SignInResp> => {
      // to bypass interceptor use $fetch instead of $api
      return await $fetch("http://localhost:8000/api/token/refresh/", {
        method: "post",
        body: { refresh: refreshToken },
      });
    },
    signUp: async (cred: {
      username: string;
      password: string;
    }): Promise<{ id: string; username: string }> => {
      return await $api("register/", { method: "post", body: cred });
    },
  };
};
