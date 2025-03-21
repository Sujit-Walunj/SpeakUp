import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getAllGroup } from "../../../Services/Operations/groupAPI";
import ViewGroupSidebar from "../../GroupSidebar/ViewGroupSidebar";
import { useEffect, useState } from "react";
import { setGroup ,setMyGroup } from "../../../Slices/groupSlice";

function ViewGroup() {
  const dispatch = useDispatch();
  const groupData = useSelector((state) => state.viewGroup.group);
  const { token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (token) {
          console.log('Token:', token); // Log the token
          const fetchedGroupData = await getAllGroup(token);
          dispatch(setGroup(fetchedGroupData));

         

        } else {
          throw new Error('No token provided');
        }
      } catch (error) {
        console.error('Failed to fetch group data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGroupData();
  }, [dispatch, token]);
  
  console.log(groupData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] ">
      <ViewGroupSidebar />

      <div className="h-[calc(100vh-3.5rem)] flex-1 ">
        <div className="flex justify-center items-center mt-[10vh]">
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ViewGroup;
