import React, { useRef, useState } from "react";
import { toast } from "react-toastify"; // Import toast for notifications

const Modal = ({ group }) => {
  const codeRef = useRef(null); // Create a ref for the input element
  const [isCopied, setIsCopied] = useState(false); // State to track if the code is copied

  const handleCopyCode = () => {
    if (codeRef.current) {
      codeRef.current.select(); // Select the text in the input field
      navigator.clipboard.writeText(codeRef.current.value)
        .then(() => {
          setIsCopied(true); // Set the button text to "Copied"
          toast.success("Group code copied to clipboard!"); // Show success message
        })
        .catch((error) => {
          console.error("Failed to copy group code:", error);
          toast.error("Failed to copy group code.");
        });
    }
  };

  return (
    <div className="flex-col justify-between items-center">
      <h2 className="text-2xl font-bold">Group Created Successfully</h2>
      <div className="mt-4 flex text-center items-center justify-center">
        <h3 className=" font-semibold text-slate-600">Group Name :</h3>
        <p className="font-medium">{group.groupName}</p>
      </div>
      <div className="mt-4 flex justify-center items-center">
        <h3 className="font-semibold text-slate-600">Group Description:</h3>
        <p>{group.groupDescription}</p>
      </div>
      <div className="mt-2 flex gap-2">
        <h3 className="text-xl font-semibold">Join Code:</h3>
        <div className="flex justify-center items-center">
          <input
            ref={codeRef} // Attach the ref to the input element
            value={group.code}
            readOnly
            className="mr-2 rounded-md bg-blue-500
            py-1 font-bold w-20 text-center
            text-white"
          />
          <button
            onClick={handleCopyCode}
            className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white ${
              isCopied ? "bg-green-600" : "bg-indigo-600"
            } border border-transparent rounded-md shadow-sm hover:${
              isCopied ? "bg-green-700" : "bg-indigo-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            disabled={isCopied} // Disable the button once the code is copied
          >
            {isCopied ? "Copied" : "Copy "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
