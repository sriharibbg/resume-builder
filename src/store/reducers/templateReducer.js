import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../apis/apis";

export const add_template = createAsyncThunk(
  "template/add_template",
  async (template, { rejectWithValue, fulfillWithValue }) => {
    try {
        console.log('====>console')
      console.log(template);
      const { data } = await apis.post("/add-tmplate", template);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove_template = createAsyncThunk(
  "template/delete_template",
  async (template, { rejectWithValue, fulfillWithValue }) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    try {
        console.log('====>console')
      console.log(template._id);
      let template_id=template._id
      const { data } = await apis.delete(`/delete-template?id=${template_id}`);

      console.log(data);
   //   return fulfillWithValue(data);
    } catch (error) {
       console.log(error.response.data)
  //    return rejectWithValue(error.response.data);
    }
  }
);

// end method
// Slice
const templateReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_template.pending, (state, { payload }) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(add_template.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_template.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(remove_template.pending, (state, { payload }) => {
        state.loader = true;
      //  state.errorMessage = "";
      })
      .addCase(remove_template.rejected, (state, { payload }) => {
        state.loader = false;
      //  state.errorMessage = payload.error;
      })
      .addCase(remove_template.fulfilled, (state, { payload }) => {
        state.loader = false;
       // state.successMessage = payload.message;
      })

  },
});
export const { messageClear } = templateReducer.actions;

export default templateReducer.reducer; // ✅ only export the reducer
