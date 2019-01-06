import { types as t } from "mobx-state-tree";
import { getAppEnv } from "../stores/getAppEnv";

export const User = t
  .model("User", {
    authenticated: t.optional(t.boolean, false),
    login: t.optional(t.string, "")
  })
  .actions(self => {
    const { auth } = getAppEnv(self);

    function signInByEmailAndPassword(email: string, password: string) {
      return auth.signInByEmailAndPassword(email, password);
    }

    function registerByEmailAndPassword(email: string, password: string) {
      return auth.registerByEmailAndPassword(email, password);
    }

    function resetPassword(email: string) {
      return auth.resetPassword(email);
    }

    function signInByGoogle() {
      return auth.signInByGoogle();
    }

    function signOut() {
      return auth.signOut();
    }

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
      signInByEmailAndPassword,
      registerByEmailAndPassword,
      resetPassword,
      signInByGoogle,
      signOut,
      setUser
    };
  });
