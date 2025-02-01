import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urlApi: "",
  loading: false,
  data: undefined,
  error: false,
};
// const apiUrl = "https://kanjiapi.dev/v1/kanji/grade-1";

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
    setUrlApi: (state, action) => {
      state.urlApi = "https://kanjiapi.dev/v1/kanji/grade-" + action.payload;
    },
    resetState: (state) => {
      state.urlApi = "";
      state.loading = false;
      state.data = undefined;
      state.error = false;
    },
  },
});

export function getData(action) {
  return (dispatch, getState) => {
    const { api } = getState();
    const url = api?.urlApi;
    if (url && url.length > 0) {
      dispatch(addLoading());
      fetch(url)
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
    }
  };
}

export const { addData, addError, addLoading, setUrlApi, resetState } =
  kanjiApi.actions;

export default kanjiApi.reducer;
