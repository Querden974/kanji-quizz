import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: undefined,
  error: false,
};
const apiUrl = "https://kanjiapi.dev/v1/kanji/grade-1";

const kanjiApi = createSlice({
  name: "kanjiApi",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    addError: (state, action) => {
      state.error = true;
      state.loading = false;
    },
    addLoading: (state, action) => {
      state.loading = true;
    },
  },
});

export function getData(action) {
  return (dispatch, getState) => {
    dispatch(addLoading());
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(addData(data));
      })
      .catch((error) => dispatch(addError()));
  };
}

export const { addData, addError, addLoading } = kanjiApi.actions;

export default kanjiApi.reducer;
