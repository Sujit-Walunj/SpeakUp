import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../Services/Operations/SettingsAPI";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <div className="mt-7 rounded-md border border-pink-700 bg-pink-900 p-6 md:p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-14 w-14 bg-pink-700 rounded-full">
            <FiTrash2 className="text-3xl text-pink-200" />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-richblack-5 uppercase tracking-wider">
            Delete Account
          </h2>
          <div className="text-pink-25 space-y-2 text-md lg:text-lg tracking-wider">
            <p>Would you like to delete your account?</p>
            <p className="lg:text-base text-sm">
              This account may contain paid courses. Deleting your account is permanent and will remove all the content associated with it.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-pink-700 py-2 px-4 rounded-md text-pink-200 font-medium tracking-wider hidden md:block"
          >
            I want to delete my account
          </button>
        </div>
      </div>

      <div className="mt-5 flex justify-center md:hidden">
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="bg-pink-700 py-2 px-4 rounded-md text-pink-200 font-medium tracking-wider"
        >
          I want to delete my account
        </button>
      </div>
    </div>
  );
}
