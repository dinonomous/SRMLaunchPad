import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5001/api/v2/authentication/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      Cookies.remove("uid", data.uid);
      Cookies.remove("email", data.email);
      router.push("/");
      window.location.reload();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="text-lg h-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full px-8 py-2.5 me-2 mb-2 dark:bg-[#235789] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
