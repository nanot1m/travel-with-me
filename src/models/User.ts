import { types as t } from "mobx-state-tree";
import { getAppEnv } from "../stores/getAppEnv";

export const User = t
  .model("User", {
    authenticated: t.optional(t.boolean, false),
    login: t.optional(t.string, "")
  })
  .actions(self => {
    const { auth } = getAppEnv(self);

    function setUser(user: firebase.User | null) {
      if (user) {
        self.authenticated = true;
        self.login = user.displayName || user.email || user.uid;
      } else {
        self.authenticated = false;
        self.login = "";
      }
    }

    function afterCreate() {
      auth.onAuthStateChanged((self as typeof User.Type).setUser);
    }

    return {
      afterCreate,
      signInByEmailAndPassword: auth.signInByEmailAndPassword,
      registerByEmailAndPassword: auth.registerByEmailAndPassword,
      resetPassword: auth.resetPassword,
      signInByGoogle: auth.signInByGoogle,
      signOut: auth.signOut,
      setUser
    };
  });
