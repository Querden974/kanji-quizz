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
      console.log(state.urlApi);
    },
  },
});

export function getData(action) {
  return (dispatch, getState) => {
    if (getState().kanjiApi?.urlApi && getState().kanjiApi.urlApi.length > 0) {
      dispatch(addLoading());
      fetch(getState().kanjiApi.urlApi)
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error");
          }
          return response.json();
        })
        .then((data) => {
          dispatch(addData(data));
          console.log(data);
        })
        .catch((error) => dispatch(addError()));
    }
  };
}

export const { addData, addError, addLoading, setUrlApi } = kanjiApi.actions;

export default kanjiApi.reducer;
