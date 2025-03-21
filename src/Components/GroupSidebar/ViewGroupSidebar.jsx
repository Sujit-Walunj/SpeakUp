import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { useState } from 'react';
import { useEffect } from 'react';
const ViewGroupSidebar = () => {
  // Accessing the userId and group data from the Redux store
  const {user} = useSelector((state)=>state.profile);
    
  const userId = user._id;
  const groupDataFromStore = useSelector((state) => state.viewGroup.group);

  // State for filtered groups
  const [myGroup, setMyGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (groupDataFromStore.length > 0) {
      const myGroupFromStore = groupDataFromStore.filter((group) => group.Admin === userId);
        myGroupFromStore.map((mg)=>console.log("my group are ",mg));
      setMyGroup(myGroupFromStore);
    }
    setLoading(false);
  }, [userId, groupDataFromStore]);

  if (loading) {
    return <div>Loading...</div>;
  }



  return (



    <div className='h-[calc(100vh-5rem)] overflow-auto no-scrollbar mt-[10vh] border-r-slate-200 border'>
      <div className='flex flex-col w-fit md:min-w-[220px] min-h-[calc(100vh-3.5rem)] py-5 px-4'>
        <div className='flex flex-col'>
          <div className='pb-7'>
            <Link to='/create-group'>
              <button className='flex gap-2 justify-start items-center bg-slate-200 p-2 rounded-lg w-full font-bold'>
                <IoMdAdd className='font-bold text-2xl' />
                New
              </button>
            </Link>
          </div>

          <div className='flex flex-col bg-slate-100 rounded-lg '>
            <div className='text-center p-2 font-semibold text-slate-800'>
              <h3>My Groups</h3>
            </div>
            <div className='border-slate-400 border-b-[1px] h-1 my-1 mx-14 rounded-full'></div>
            <div>
              {myGroup.length > 0 ? (
                myGroup.map((group) => (
                  <div key={group._id} className=''>
                    <Link to={`/group/${group._id}`}>
                      <h2 className='bg-blue-400 p-3 my-1 rounded-xl'>
                        {group.groupName}
                      </h2>
                    </Link>
                   
                  </div>

                ))
              ) : (
                <div >
                  <h4 className='p-2 w-full'>
                    You have not created any group</h4>
                </div>
              )}
               
            </div>
          </div>

          <div className='mt-3 rounded-lg '>
            <h3 className='text-center p-2 font-semibold text-slate-800'>All Groups</h3>
            <div className='border-slate-400 border-b-[1px] h-1 my-1 mx-14 rounded-full'>

            </div>
            {groupDataFromStore.length>0 ?(groupDataFromStore.map((group) => (
              <div key={group._id} className=''>
                <Link to={`/group/${group._id}`}>
                  <h2 className='bg-white p-3 rounded-xl font-semibold my-2 mx-2 overflow-hidden shadow-sm'>
                    {group.groupName}
                  </h2>
                </Link>
              </div>
            ))):( <div >
              <h4 className='p-2 w-full'>
                You are not member of any group</h4>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGroupSidebar;