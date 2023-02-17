<template>
  <div>
    <div v-if="loading">
      <mwc-circular-progress indeterminate></mwc-circular-progress>
    </div>
    <div v-else>
      <main>
        <h1>Forum</h1>
        <span>Please create a profile</span>
        <div id="content">
          <profiles-context :profilesStore="profilesStore">
            <profile-prompt>
              test
            </profile-prompt>
          </profiles-context>
        </div>
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppAgentWebsocket, AppAgentClient } from '@holochain/client';
import { ProfilesStore, ProfilesClient, ProfilePrompt, ProfilesContext, Profile } from "@holochain-open-dev/profiles";

export default defineComponent({
  data(): {
    client?: AppAgentClient;
    profilesStore?: ProfilesStore;
    loading: boolean;
  } {
    return {
      client: undefined,
      profilesStore: undefined,
      loading: true,
    };
  },
  async mounted() {
    // Setup conductor websocket
    this.client = await AppAgentWebsocket.connect('', 'forum', 12000);

    // Setup profiles store
    const profilesClient = new ProfilesClient(this.client, 'forum', 'profiles');
    this.profilesStore = new ProfilesStore(profilesClient, {
      avatarMode: "avatar-optional",
    });

    const my_profile = await this.profilesStore.client.getAgentProfile(this.client.myPubKey);
    console.log('profiles store', my_profile);

    this.loading = false;
  },
  provide() {
    return {
      client: computed(() => this.client),
      profilesStore: computed(() => this.profilesStore),
    };
  },
});
</script>
