import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import Toasify from "../../components/core/common/Toasify";

const ChangePassword = () => {
  const { changePassword } = useProfile();
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await changePassword(password, newPassword);
      if (response.flag) {
        setToasify({
          message: "Password changed successfully",
          type: "success",
        });
      }
    } catch (error) {
      setToasify({
        message: "Password change failed",
        type: "error",
      });
    }
  };

  return (
    <div className="w-[50%] m-auto p-10">
      {toasify.message && (
        <Toasify message={toasify.message} type={toasify.type} />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-12">
        <label className="flex flex-col text-sm font-medium text-gray-700">
          Current Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-gray-700">
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="bg-[#00277f] text-[white] self-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
