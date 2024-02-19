import {Form} from "../ui/form";
import Header from "../ui/header";
export default function Login() {
    return (
      <main>
        <Header />
        <div className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-3xl font-bold"> Admin Login</h1>
        <div className="flex flex-col gap-4 items-center w-1/3">
            <Form className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="p-2 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="p-2 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" />
            </div>
            <button type="submit">Login</button>
            </Form>
        </div>
        </div>
      </main>
    );
}