import React from 'react';
import { useSelector } from 'react-redux';
import { GroupCard } from './GroupCard';
import CreateGroup from './CreateGroup';

export const GroupHome = () => {
  const groupData = useSelector((state) => state.viewGroup.group);

  return (
    <div className='bg-green-50 flex flex-col sm:flex-row h-[calc(100vh-5rem)] overflow-auto no-scrollbar rounded-lg w-full p-4 sm:p-6 mt-[10vh]'>
      {groupData && groupData.length > 0 ? (
        <div className='flex flex-wrap gap-4 justify-center items-center w-full'>
          {groupData.map((group, index) => (
            <GroupCard
              key={index}
              name={group.groupName}
              path={`/group/${group._id}`}
              description={group.groupDescription}
              className='w-full sm:w-60 md:w-80 lg:w-96'
            />
          ))}
        </div>
      ) : (
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='text-lg font-medium mb-4'>No groups available</div>
          <CreateGroup/>
        </div>
      )}
    </div>
  );
};
