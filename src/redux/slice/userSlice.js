import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utlis/axios";
import { toast } from "react-toastify";

export const signup = createAsyncThunk(
  "/auth/sign-up",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/sign-up", credentials);
      toast.success("User Created successful");
      return res?.data?.data;
    } catch (error) {
      // console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const login = createAsyncThunk(
  "/auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/login", credentials);
      toast.success("Login successful");
      return res?.data?.data;
    } catch (error) {
      // console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  "/auth/logout",
  async (__dirname, { rejectWithValue }) => {
    try {
      const res = await axios.post("/user/logout");
      toast.success("Logged Out successful");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const fetchUser = createAsyncThunk(
  "/user/fetch-user",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/fetch-user");
      if (response?.data?.success) return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "/user/fetch-user-by-id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/fetch-user-by-id/${id}`);
      if (response?.data?.success) return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const fetchAllUser = createAsyncThunk(
  "user/fetch-all-user",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await axios.get("/user/fetch-all-user");
      if (response?.data?.success) {
        return response?.data?.data;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/update-user",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/user/update-user/${id}`, data);
      toast.success("User Updated successful");
      if (response?.data?.success) {
        return response?.data;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/delete-user",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/user/delete-user/${id}`);

      if (response?.data?.success) {
        return id; // ✅ return only the deleted user id
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    allUsers: null,
    user: null,
    userById: null,
    loading: false,
    error: null,
  },
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        const newUser = action.payload;
        state.allUsers.unshift(newUser); // add to top
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;
        state.allUsers = state.allUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUserId = action.payload;
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== deletedUserId,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
