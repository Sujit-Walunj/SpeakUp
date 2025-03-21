import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroup } from '../../../Services/Operations/groupAPI';
import { useSelector } from 'react-redux';

const GroupDetails = () => {
  const { groupId } = useParams(); // Extract groupId from the route parameters
  const [groupDetails, setGroupDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch group details when the component mounts
    const fetchGroupDetails = async () => {
      try {
        setLoading(true);
        const data = await getGroup(token, groupId); // Assuming you have this function in groupAPI
        setGroupDetails(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch group details');
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId, token]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!groupDetails) {
    return <div className="text-center mt-[10vh]">No group details found</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-blue-50 rounded-lg shadow-md mx-4 md:mx-8 lg:mx-16 mt-[10vh]">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{groupDetails.groupName}</h1>
      <p className="mb-4 text-sm sm:text-base md:text-lg">{groupDetails.groupDescription}</p>
      
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
        <h4 className="font-semibold text-slate-800">Group Code:</h4>
        <p className="text-sm sm:text-base md:text-lg">{groupDetails.code}</p>
      </div>

      <div className="group-members">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Members:</h2>
        <ul className="list-disc list-inside pl-4">
          {groupDetails.members.map((member) => (
            <li key={member._id} className="text-sm sm:text-base">{member.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupDetails;
