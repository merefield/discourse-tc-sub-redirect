import { withPluginApi } from "discourse/lib/plugin-api";
import groupChecker from "../lib/group-checker";

export default {
  name: "discourse-fun-name-initializer",

  initialize() {
    withPluginApi("1.39.0", (api) => {
      api.modifyClass("route:topic", {
        beforeModel() {
          if (this.currentUser) {
            if (groupChecker(this.currentUser)) {
              // User is part of valid trust levels from 0 to their current level
              this.router.transitionTo(settings.redirect_path);
            }
          }
        },
      });
    });
  },
};
