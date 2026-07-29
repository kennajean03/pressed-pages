import { useState } from "react"
import { supabase } from "./lib/supabase"
import "./Auth.css"

function Auth({ user, onAuthChange }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [authMode, setAuthMode] = useState("signIn")

  async function signUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setMessage(error ? error.message : "Account created! Log in to Continue!")
    onAuthChange()
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setMessage(error ? error.message : "Logged in!")
    onAuthChange()
  }

  async function signOut() {
    await supabase.auth.signOut()
    setMessage("Logged out.")
    onAuthChange()
  }

  if (user) {
    return (
      <div className="score-card">
        <p>Logged in as:</p>
        <strong>{user.email}</strong>
        <br />
        <button onClick={signOut}>Log Out</button>
      </div>
    )
  }

  async function submitAuth(event) {
    event.preventDefault()

    if (authMode === "signUp") {
      await signUp()
      return
    }

    await signIn()
  }

  return (
    <div className="auth-paper">
      <div
        className="auth-paper__tabs"
        role="tablist"
        aria-label="Account access"
      >
        <button
          type="button"
          role="tab"
          aria-selected={authMode === "signIn"}
          className={
            authMode === "signIn"
              ? "auth-paper__tab is-active"
              : "auth-paper__tab"
          }
          onClick={() => setAuthMode("signIn")}
        >
          Sign In
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={authMode === "signUp"}
          className={
            authMode === "signUp"
              ? "auth-paper__tab is-active"
              : "auth-paper__tab"
          }
          onClick={() => setAuthMode("signUp")}
        >
          Create Account
        </button>
      </div>

      <form
        className="auth-paper__form"
        onSubmit={submitAuth}
      >
        <div className="auth-paper__heading">
          <p>
            {authMode === "signUp"
              ? "Begin a new reading life"
              : "Return to your reading life"}
          </p>
          <h2>
            {authMode === "signUp"
              ? "Create your account"
              : "Welcome back"}
          </h2>
        </div>

        <label>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            autoComplete={
              authMode === "signUp"
                ? "new-password"
                : "current-password"
            }
            placeholder={
              authMode === "signUp"
                ? "Create a password"
                : "Enter your password"
            }
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </label>

        <button
          type="submit"
          className="auth-paper__submit"
        >
          <span aria-hidden="true">▣</span>
          {authMode === "signUp"
            ? "Create Account"
            : "Sign In to Pressed Pages"}
        </button>

        <p className="auth-paper__switch">
          {authMode === "signUp"
            ? "Already have an account?"
            : "New here?"}{" "}
          <button
            type="button"
            onClick={() =>
              setAuthMode(
                authMode === "signUp"
                  ? "signIn"
                  : "signUp"
              )
            }
          >
            {authMode === "signUp"
              ? "Sign in"
              : "Create an account"}
          </button>
        </p>

        {message && (
          <p
            className="auth-paper__message"
            role="status"
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

export default Auth
