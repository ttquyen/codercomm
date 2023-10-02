import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};
const slice = createSlice({
  name: "comment",
  initialState,
  reducer: {},
});
export default slice.reducer;
