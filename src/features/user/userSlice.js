import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
};
const slice = createSlice({
  name: "user",
  initialState,
  reducer: {},
});
export default slice.reducer;
