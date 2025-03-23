import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-600 mt-2">عذرًا، الصفحة غير موجودة!</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        العودة إلى الرئيسية
      </button>
    </div>
  );
}
