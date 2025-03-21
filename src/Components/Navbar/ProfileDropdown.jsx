import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
 import useOnClickOutside from "../../Hook/useONClickOutside"
import { logout } from "../../Services/Operations/authAPI"
import { BiSolidUser } from "react-icons/bi";


export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))
                      
  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1 justify-center">
        <BiSolidUser className="text-2xl" />
        <p>{user.
firstname
}{" "+user.lastname}</p>
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[180%] right-0 z-[1000]   overflow-hidden rounded-lg border-[1px] 
          shadow-md shadow-slate-300
          bg-slate-100 max-w-max
          "
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-x-1 py-[10px] px-[12px] text-sm
             bg-white 
            hover:bg-slate-200
            rounded-md
            m-2
            
            ">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex items-center gap-x-1 py-[10px] px-[12px] text-sm 
            bg-white
            hover:bg-slate-200
            rounded-md
            m-2   "

            
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}
