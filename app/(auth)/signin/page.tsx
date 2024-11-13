"use client"; 

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize useRouter hook
  const router = useRouter();  

  useEffect(() => {
    setIsMounted(true); // Ensure component is mounted
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  if (!email || !password) {
    setErrorMessage('Both email and password are required.');
    return;
  }

  try {
    // Make sure the endpoint matches the backend route
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: email,      // Ensure email is correctly assigned
      password: password  // Ensure password is correctly assigned
    });

    if (response.status === 200) {  // Check if login was successful
      console.log(response.data);
      router.push('/dashboard');  // Redirect to the dashboard
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    setErrorMessage('Invalid credentials. Please try again.');
  }
};

  if (!isMounted) return null;

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="text-3xl font-semibold">Welcome back</h1>
          </div>
          <form className="mx-auto max-w-[400px]" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            <button className="btn w-full bg-indigo-500 text-white mt-4" type="submit">
              Sign In
            </button>
            <div className="mt-4 text-center text-sm">
              Don't have an account? <Link href="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}