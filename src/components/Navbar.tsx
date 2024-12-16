import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white">
      <Link href="/" className="font-bold text-xl">
        User Management
      </Link>
      <div>
        <Link href="/dashboard" className="mr-4 hover:underline">
          Dashboard
        </Link>
        <Link href="/login" className="mr-4 hover:underline">
          Login
        </Link>
        <Link href="/signup" className="mr-4 hover:underline">
          Signup
        </Link>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
}
