'use client';
import { useState } from 'react';
import axios from 'axios';
import { Form } from "../ui/form";
import Header from "../ui/header";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make a request to authenticate the admin
      const response = await axios.post('/api/login', { email, password });

      // Handle the response accordingly
      if (response.status === 200) {
        // Redirect to the dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <main>
      <Header />
      <div className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-3xl font-bold"> Admin Login</h1>
        <div className="flex flex-col gap-4 items-center w-1/3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name='email' 
                value={email} // Bind value to state variable
                onChange={(e) => setEmail(e.target.value)} // Handle input change
                className="p-2 peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" 
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name='password' 
                value={password} // Bind value to state variable
                onChange={(e) => setPassword(e.target.value)} // Handle input change
                className="p-2 peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" 
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
}