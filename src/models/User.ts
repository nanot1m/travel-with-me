import { types as t } from "mobx-state-tree";
import { getAppEnv } from "../stores/getAppEnv";
import { User as FbUser } from "firebase";

export const User = t
  .model("User", {
    authenticated: t.optional(t.boolean, false),
    login: t.optional(t.string, "")
  })
  .actions(self => {
    const { auth } = getAppEnv(self);

    function setUser(user: FbUser | null) {
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
      signInByEmailAndPassword: auth.signInByEmailAndPassword.bind(auth),
      registerByEmailAndPassword: auth.registerByEmailAndPassword.bind(auth),
      resetPassword: auth.resetPassword.bind(auth),
      signInByGoogle: auth.signInByGoogle.bind(auth),
      signOut: auth.signOut.bind(auth),
      setUser
    };
  });
