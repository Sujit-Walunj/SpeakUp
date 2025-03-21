import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className=' mx-0 md:mx-5 flex flex-col gap-y-5 md:gap-y-7
    text-slate-800 
    '>
      <div className="flex flex-col items-center">
      <h1 className='font-medium  text-3xl mb-5 uppercase 
      text-slate-900
      tracking-wider lg:text-left text-center' >Edit Profile</h1>

      <div className="bg-green-600 h-1 w-[20%] rounded-full"></div>
   
      </div>

    
      {/* Edit Profile Information */}
      <EditProfile />

      {/* Update Password */}
      <UpdatePassword />

      {/* Delete Account */}
      <DeleteAccount />


    </div>
  )
}
