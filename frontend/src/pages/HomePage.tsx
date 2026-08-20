import { apiClient } from "../shared/api/client";

const HomePage = () => {
  const testMe = async () => {
    try {
      const res = await apiClient.get("/auth/me");
      console.log("me result:", res.data);
    } catch (err) {
      console.log("me FAILED:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-15">
      <h1 className="text-3xl font-bold leading-tight">Home Page</h1>
      <button
        onClick={testMe}
        className="bg-green-500 px-4 py-3 rounded text-base font-bold"
      >
        Test /me
      </button>
    </div>
  );
};

export default HomePage;
