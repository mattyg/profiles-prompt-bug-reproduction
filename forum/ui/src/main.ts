import { createApp } from 'vue'
import './style.css'

// Profiles custom elements
import { CreateProfile, AgentAvatar, MyProfile, ProfilesContext, ProfilePrompt, ProfileDetail } from "@holochain-open-dev/profiles";
customElements.define("profiles-context", ProfilesContext);
customElements.define("profile-prompt", ProfilePrompt);

import App from './App.vue'
createApp(App).mount('#app')
