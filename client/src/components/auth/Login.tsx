"use client";
import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Alert from "@mui/material/Alert";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const uid = Cookies.get('uid');
      console.log(uid);
      if (uid) {
        router.push("/"); 
      }
    }
  }, [router]);

  const handleServerResponse = (data: any) => {
    setData(data);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      handleServerResponse(data);
      Cookies.set("uid", data.uid, { expires: 1, sameSite: "Lax" }); 
      Cookies.set("email", data.email, { expires: 1, sameSite: "Lax" });
      router.push("/");
    } catch (error: any) {
      setError(error.message);
      handleServerResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen h-screen bg-gray-100 dark:bg-DarkPrimary-200">
      {error && <Alert severity="error" className="fixed top-2 left-2 right-2 z-10" onClose={() => {setError(null)}}>{error}</Alert>}
      {data && !error && <Alert severity="success" className="fixed top-2 left-2 right-2 z-10">Login Successful!</Alert>}
        <div className="p-4 rounded-lg shadow-lg h-full w-1/2">
          <div className="max-w-5xl h-full w-full relative flex items-center">
            <div className="w-full absolute top-0">
              <div className="w-48">
                <svg
                  viewBox="60 0 309.6551724137931 60.344834026370364"
                  className="looka-1j8o68f"
                >
                  <g
                    id="SvgjsG1185"
                    transform="matrix(1.9159621458622618,0,0,1.9159621458622618,78.08403876773968,6.765059387241363)"
                    fill="#260F26"
                    className="dark:fill-slate-50"
                  >
                    <path d="M11.9 14.5 c0.06 0.14 0.54 1.5 -0.08 2.92 c-0.72 1.7 -2.74 2.76 -5.26 2.78 c-2.18 0 -4.16 -0.96 -5.56 -2.48 l1.48 -1.48 c0.7 1.24 2.48 2.12 4.08 2.12 c1.74 -0.02 2.76 -0.66 3.18 -1.66 c0.32 -0.74 0.06 -1.54 0.04 -1.56 c-0.42 -1.16 -1.58 -1.42 -3.22 -1.92 c-1.86 -0.56 -4 -1.02 -4.7 -2.98 c-0.38 -1.02 -0.28 -2.2 0.24 -3.16 c1.16 -2.2 4.12 -2.26 4.46 -2.26 c2.2 0 4.16 0.96 5.56 2.5 l-1.46 1.46 c-0.82 -1.2 -2.42 -2.12 -4.1 -2.12 c-0.02 0 -1.78 0 -2.46 1.28 c-0.26 0.5 -0.32 1.16 -0.14 1.68 c0.4 1.1 1.54 1.36 3.14 1.84 c1.9 0.58 4.04 1.02 4.8 3.04 z M26.26 10.32 c0 2.28 -1.32 4.12 -3.22 4.92 l3.22 4.76 l-2.46 0 l-2.94 -4.36 l-3.5 0 l0 4.36 l-2.22 0 l0 -4.36 l0 -1.84 l0 -6.96 l0 -1.84 l2.22 0 l3.6 0 c2.94 0.02 5.3 2.3 5.3 5.32 z M17.36 6.84 l0 6.96 l3.58 0 c1.7 0 3.1 -1.44 3.1 -3.48 c0 -2.02 -1.4 -3.48 -3.1 -3.48 l-3.58 0 z M46 5 l0.32 0 l0 15 l-2.22 0 l0 -11.26 l-5.78 11.26 l-1.26 0 l-5.78 -11.26 l0 11.26 l-2.22 0 l0 -15 l0.3 0 l2.38 0 l5.94 11.6 l5.94 -11.6 l2.38 0 z M51.74 18.16 l7.56 0 l0 1.84 l-9.78 0 l0 -15 l2.22 0 l0 13.16 z M65.52000000000001 9.92 c2.84 0 3.98 1.72 3.98 3.18 l0 6.9 l-2.06 0 l0 -1.08 c-0.72 0.98 -2 1.26 -2.8 1.26 c-2.26 0 -3.74 -1.32 -3.74 -3.08 c0 -2.46 1.84 -3.34 3.74 -3.34 l2.8 0 l0 -0.66 c0 -0.62 -0.24 -1.48 -1.92 -1.48 c-0.94 0 -1.8 0.5 -2.36 1.28 l-1.42 -1.28 c0.94 -1.04 2.28 -1.7 3.78 -1.7 z M67.44000000000001 16.92 l0 -1.48 l-2.52 0 c-1.22 0 -2.08 0.62 -1.94 1.74 c0.12 0.94 0.88 1.32 1.94 1.32 c1.9 0 2.52 -0.9 2.52 -1.58 z M71.84 15.82 l0 -5.7 l2.06 0 l0 5.5 c0 2 0.62 2.88 2.32 2.88 c1.92 0 2.7 -1.34 2.7 -3.08 l0 -5.3 l2.06 0 l0 9.88 l-2.06 0 l0 -1.6 c-0.28 0.88 -1.52 1.68 -2.7 1.76 c-2.68 0.2 -4.38 -1.1 -4.38 -4.34 z M92.92 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -9.88 l2.06 0 l0 1.6 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M102.55999999999999 17.42 l1.42 1.28 c-0.94 1.04 -2.28 1.5 -3.78 1.5 c-2.84 0 -5.14 -2.18 -5.14 -5.12 s2.3 -5.14 5.14 -5.14 c1.5 0 2.84 0.46 3.78 1.5 l-1.42 1.28 c-0.58 -0.78 -1.42 -1.08 -2.36 -1.08 c-1.7 0 -3.08 1.42 -3.08 3.44 c0 2 1.38 3.44 3.08 3.44 c0.94 0 1.78 -0.3 2.36 -1.1 z M115.32 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -15 l2.06 0 l0 6.72 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M129.64 10.52 c0 3.04 -2.36 5.5 -5.28 5.52 l-3.6 0 l0 3.96 l-2.24 0 l0 -15 l5.84 0 c2.92 0.02 5.28 2.48 5.28 5.52 z M124.32 14.2 c1.72 0 3.1 -1.66 3.1 -3.68 s-1.38 -3.68 -3.1 -3.68 l-3.56 0 l0 7.36 l3.56 0 z M136.26 9.92 c2.84 0 3.98 1.72 3.98 3.18 l0 6.9 l-2.06 0 l0 -1.08 c-0.72 0.98 -2 1.26 -2.8 1.26 c-2.26 0 -3.74 -1.32 -3.74 -3.08 c0 -2.46 1.84 -3.34 3.74 -3.34 l2.8 0 l0 -0.66 c0 -0.62 -0.24 -1.48 -1.92 -1.48 c-0.94 0 -1.8 0.5 -2.36 1.28 l-1.42 -1.28 c0.94 -1.04 2.28 -1.7 3.78 -1.7 z M138.18 16.92 l0 -1.48 l-2.52 0 c-1.22 0 -2.08 0.62 -1.94 1.74 c0.12 0.94 0.88 1.32 1.94 1.32 c1.9 0 2.52 -0.9 2.52 -1.58 z M142.32000000000002 15.08 c0 -2.94 2.1 -5.14 4.94 -5.14 c0.98 0 2.18 0.42 2.84 0.96 l0 -5.9 l2.08 0 l0 15 l-2.08 0 l0 -0.74 c-0.78 0.58 -1.86 0.94 -2.84 0.94 c-2.84 0 -4.94 -2.18 -4.94 -5.12 z M144.4 15.08 c0 2 1.38 3.44 3.06 3.44 c1.12 0 2.12 -0.52 2.64 -1.58 c0.28 -0.54 0.44 -1.18 0.44 -1.86 s-0.16 -1.32 -0.44 -1.88 c-0.52 -1.06 -1.52 -1.56 -2.64 -1.56 c-1.68 0 -3.06 1.42 -3.06 3.44 z"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="m-auto min-h-fit h-1/2 w-9/12">
              <h1 className="text-5xl font-bold tracking-tight text-center mb-3">
                Welcome back!
              </h1>
              <h1 className="text-2xl font-bold text-white mb-8 text-center">
                Sign In
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className=" rounded-xl peer w-full pt-6 bg-gray-700 text-white p-4 h-14 border-none focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <label
                    htmlFor="email"
                    className=" absolute left-4 top-4 text-gray-400 transition-all transform peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-translate-y-3 peer-valid:text-xs"
                  >
                    Email or Phone Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-xl peer w-full pt-6 bg-gray-700 text-white p-4 h-14 border-none focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-4 text-gray-400 transition-all transform peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-gray-400 peer-valid:-translate-y-3 peer-valid:text-xs"
                  >
                    Password
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full h-[3.5rem] dark:bg-[#235789] rounded-full text-white font-semibold hover:bg-slate-600 transition-colors"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
              <span className="flex items-center justify-center space-x-2 mt-4">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="h-[13rem] flex flex-col mt-4 w-3xl">
                <button
                  className="relative rounded-full transition duration-75 ease-out w-full h-[100%] px-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black antialiased text-black mt-sm bg-white border border-sand hover:border-chalk hover:bg-chalk active:border-chalk active:bg-chalk"
                  type="button"
                  data-testid="google-login"
                >
                  <span className="flex items-center justify-center">
                    <span className="block pr-xs">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" "
                        role="img"
                        aria-hidden="true"
                        aria-labelledby=" "
                      >
                        <path
                          fill="#4285F4"
                          d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34Z"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.06v2.6A10 10 0 0 0 12 22Z"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M6.4 13.9a6.01 6.01 0 0 1 0-3.8V7.5H3.06a10 10 0 0 0 0 9l3.34-2.6Z"
                        ></path>
                        <path
                          fill="#EA4335"
                          d="M12 5.98c1.47 0 2.79.5 3.82 1.5L18.7 4.6A10 10 0 0 0 3.06 7.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12Z"
                        ></path>
                      </svg>
                    </span>
                    <span className="block text-md font-semibold mx-3">
                      Continue with Google
                    </span>
                  </span>
                </button>
                <div className="mt-5 text-lg border-b border-neutral-300 py-4 text-neutral-300">
                  <a href="#">Forgot your password?</a>
                </div>
                <div className="mt-3 text-lg flex justify-between items-center text-neutral-300">
                  <p>Don't have an account?</p>
                  <button
                    type="button"
                    className="text-lg h-12  text-gray-900 rounded-xl bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium px-8 py-2.5 me-2 mb-2 dark:bg-emerald-500 dark:text-DarkPrimary-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-1/2 py-4">
          <Image
            src="/images/loginbg.jpg"
            alt="loginbg"
            height={1000}
            width={1000}
            className="object-cover object-right h-full w-full"
          />
        </div>
      </div>
  );
};

export default Login;
