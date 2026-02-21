<script lang="ts" setup>
const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();
const loadingStore = useLoadingStore();

const handleGuestLogIn = async () => {
  try {
    loadingStore.showSpinner();
    await authStore.logIn({ username: "GuestUser", password: "Test1234!" });
    snackbarStore.showSnackbar("Logged in as guest user (for demo)", "success");
    navigateTo("/kanban");
  } catch (e) {
    console.log(e);
  } finally {
    loadingStore.hideSpinner();
  }
};
</script>

<template>
  <v-container class="d-flex flex-column fill-height align-center justify-center ga-6">
    <p class="text-h1">Welcome to <span class="text-primary">Kanban</span></p>
    <p class="text-h4">Organize your tasks!</p>
    <div v-if="!authStore.isLoggedIn" class="d-flex flex-column ga-3">
      <v-btn
        size="large"
        variant="flat"
        color="primary"
        text="Sign Up"
        :to="{ path: '/auth', query: { mode: 'signUp' } }"
      />
      <v-btn
        size="large"
        variant="outlined"
        color="primary"
        text="Log In"
        :to="{ path: '/auth', query: { mode: 'signIn' } }"
      />
      <v-btn
        size="large"
        variant="text"
        text="Continue as Guest (Demo)"
        @click="handleGuestLogIn"
      />
    </div>
    <div v-else class="d-flex flex-column ga-3">
      <v-btn size="large" variant="flat" color="primary" text="Go to your Board" to="/kanban" />
      <v-btn
        size="large"
        variant="outlined"
        color="error"
        text="Logout"
        @click="authStore.logout()"
      />
    </div>
  </v-container>
</template>
