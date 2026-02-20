import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utlis/axios";
import { toast } from "react-toastify";

export const createBlog = createAsyncThunk(
  "/blogs/create-blog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/blogs/create-blog`, data);
      if (response?.data?.success) toast.success("Blogs created Successfully");
      return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const getAllBlogs = createAsyncThunk(
  "/blogs/get-all-blogs",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/blogs/get-all-blogs`);
      if (response?.data?.success) return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const getBlogById = createAsyncThunk(
  "/blogs/get-blog-by-id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/blogs/get-blog-by-id/${id}`);
      if (response?.data?.success) return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const updateBlog = createAsyncThunk(
  "/blogs/update-blog",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/blogs/update-blog/${id}`, data);
      if (response?.data?.success) 
        return response?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "/blogs/delete-blog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/blogs/delete-blog/${id}`);
      if (response?.data?.success) {
        toast.success("Blog Deleted Successfully");
        return id;
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    allBlogs: null,
    blogById: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.allBlogs = action.payload;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.blogById = action.payload;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const updatedBlog = action.payload;
        // Update blog in allBlogs array
        state.allBlogs = state.allBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog,
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const deletedBlogId = action.payload;
        state.allBlogs = state.allBlogs.filter(
          (blog) => blog.id !== deletedBlogId,
        );
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.allBlogs.unshift(action.payload);
      });
  },
});

export default blogSlice.reducer;
