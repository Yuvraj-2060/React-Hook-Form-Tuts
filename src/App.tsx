import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import './App.css';

// Define the interface for form input values
interface FormValues {
  username: string;
  email: string;
  password: string;
}

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [userInfo, setUserInfo] = useState<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    setUserInfo(data);
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-orange-300 h-screen w-screen">
      <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-600 rounded-lg shadow-md p-6 max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Registration Form</h1>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              {...register("username", { required: "Username is required" })}
              className="px-4 py-2 border rounded-md"
            />
            {errors.username && <p className="text-red-500">{errors.username?.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="px-4 py-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 4, message: "Password should be of minimum length 4" },
                maxLength: { value: 12, message: "Password should be of maximum length 12" },
              })}
              className="px-4 py-2 border rounded-md"
            />
            {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
          </div>
          <div>
            <button type="submit" className="bg-black text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
