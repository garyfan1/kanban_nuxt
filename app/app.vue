<script setup lang="ts">
import { onMounted } from "vue";

const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();

onMounted(async () => {
  if (authStore.refreshToken) {
    try {
      await authStore.refreshLogIn();
    } catch (e) {
      authStore.logout();
    }
  }
});
</script>
<template>
  <v-app>
    <v-app-bar class="px-6">
      <div class="d-flex ga-4 align-center">
        <v-btn icon="mdi-calendar-blank" to="/" :active="false" />
        <v-btn density="comfortable" text="Home" to="/" variant="plain" />
        <v-btn
          v-if="!authStore.isLoggedIn"
          density="comfortable"
          text="Auth"
          to="/auth"
          variant="plain"
        />
        <v-btn
          v-if="authStore.isLoggedIn"
          density="comfortable"
          text="Kanban"
          to="/kanban"
          variant="plain"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn
        class="ml-auto"
        text="Log Out"
        append-icon="mdi-logout"
        v-if="useAuthStore().isLoggedIn"
        @click="() => authStore.logout()"
      />
    </v-app-bar>

    <v-main>
      <NuxtRouteAnnouncer />
      <NuxtPage />
      <v-snackbar v-model="snackbarStore.isShown" :color="snackbarStore.color">
        {{ snackbarStore.message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>
