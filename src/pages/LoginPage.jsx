import React, { useState } from "react";
import { Icon } from "../components/icons";
import ThemeToggle from "../components/ThemeToggle";
import IllustrationFrame from "../components/login/IllustrationFrame";
import Logo from "../components/branding/Logo";
import { Button, Field } from "../components/ui";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const valid = /.+@.+\..+/.test(email) && password.length >= 6;
  const error = touched && !valid ? "Enter a valid email and 6+ char password" : "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Login to Massist Admin Panel
          </h1>
          <p className="mt-3 max-w-xl text-gray-600 dark:text-gray-300">
            Monitor shelf data, manage SKUs, and make informed decisions.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              setTouched(true);
              if (valid) {
                onLogin();
              }
            }}
          >
            <Field label="Email Address" error={error}>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setTouched(true)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none ring-red-300 focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                required
                aria-invalid={Boolean(error)}
              />
            </Field>
            <Field label="Password" hint="Minimum 6 characters">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  onBlur={() => setTouched(true)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 outline-none ring-red-300 focus:ring dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-2 inline-flex items-center rounded p-1 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-gray-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon.eye className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <a href="#" className="mt-2 inline-block text-sm font-medium text-red-600 hover:underline">
                Forgot password?
              </a>
            </Field>
            <Button type="submit" className="w-full" disabled={!valid}>
              Continue
            </Button>
          </form>
        </div>
        <div className="hidden justify-center md:flex">
          <IllustrationFrame />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;