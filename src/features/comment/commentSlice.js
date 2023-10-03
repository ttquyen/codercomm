import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
};
const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});
export const createCommentAsync =
  ({ content, postId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", { content, postId });
      dispatch(slice.actions.createCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;