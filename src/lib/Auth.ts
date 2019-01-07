import firebase from "firebase";

export class Auth {
  constructor(private auth: firebase.auth.Auth) {}

  async signInByEmailAndPassword(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async registerByEmailAndPassword(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async signInByGoogle() {
    await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async signOut() {
    await this.auth.signOut();
  }

  onAuthStateChanged(cb: (user: firebase.User | null) => any) {
    return this.auth.onAuthStateChanged(cb);
  }
}
