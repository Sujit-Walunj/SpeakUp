const BASE_URL = import.meta.env.VITE_BASE_URL;


// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}



export const groupEndpoints = {
  GET_ALL_GROUP_API: BASE_URL + "/member/get-all-groups",
  GET_GROUP_API: BASE_URL + "/member//get-details/:groupId",
  CREATE_GROUP_API: BASE_URL + "/admin/create-group",
  DELETE_GROUP_API: BASE_URL + "/admin/deleteCourse", // to be made
  JOIN_GROUP_APT: BASE_URL + "/member/join-group",
  
}

export const complaintEndpoints = {
  
  POST_COMPLAINTS_API:BASE_URL+"/complaint/group/:groupId/post-complaint",
  GET_COMPLAINTS_API:BASE_URL +"/complaint/group/:groupId/complaints",
  GET_MY_COMPLAINTS_API:BASE_URL +"/complaint/my-complaints",
  DELETE_COMPLAINTS_API:BASE_URL +"/delete-complaint/:complaintId",
  RESOLVE_COMPLAINT:BASE_URL + "/complaint/resolve-complaint/:groupId/:complaintId",
  VOTE_API:BASE_URL + "/complaint/vote-complaint/:groupId/:complaintId"
}


