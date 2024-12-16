import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to User Management</h1>
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </Link>
        <Link href="/signup" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Signup
        </Link>
        <Link href="/dashboard" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
