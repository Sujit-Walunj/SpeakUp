import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 p-6 bg-slate-200 rounded-lg border border-slate-400">
        <p className="text-xl font-semibold mb-3">
          {modalData?.text1}
        </p>
        <p className="leading-6 mb-6">
          {modalData?.text2}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <IconBtn
            customClasses="bg-red-500 py-2 px-4 font-semibold text-white"
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="bg-green-500 py-2 px-4 font-semibold text-white"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
