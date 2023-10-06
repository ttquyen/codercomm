import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { cloudinaryUpload } from "../../utils/cloundinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
};
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.updatedProfile = action.payload;
    },
  },
});
export const getUserByIdAsync =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/users/${id}`);

      dispatch(slice.actions.getUserByIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const updateAccountAsync =
  ({ id, ...params }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const imageUrl=await
      const data = {
        name: params?.name,
        coverUrl: params?.coverUrl,
        aboutMe: params?.aboutMe,
        city: params?.city,
        country: params?.country,
        company: params?.company,
        jobTitle: params?.jobTitle,
        facebookLink: params?.facebookLink,
        instagramLink: params?.instagramLink,
        twitterLink: params?.ftwitterink,
        linkedinLink: params?.linkedinLink,
      };

      if (params?.avatarUrl instanceof File) {
        const imgUrl = await cloudinaryUpload(params?.avatarUrl);
        data.avatarUrl = imgUrl;
      }
      const response = await apiService.put(`/users/${id}`, data);

      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export default slice.reducer;
