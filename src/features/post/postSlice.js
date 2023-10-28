import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloundinary";
import { toast } from "react-toastify";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
    isLoading: false,
    error: null,
    currentPagePosts: [],
    postsById: {},
};
const slice = createSlice({
    name: "post",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        createPostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const newPost = action.payload;
            //remove the final post of current page before push a new once
            //if num of currentPagePost fits postPerPage
            if (state.currentPagePosts.length % POST_PER_PAGE === 0) {
                state.currentPagePosts.pop();
            }
            //re-render list after creating
            state.postsById[newPost._id] = newPost;
            state.currentPagePosts.unshift(newPost._id);
        },
        getPostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { count, posts } = action.payload;
            // filter duplicate post before push new page to current page
            posts.forEach((post) => {
                state.postsById[post._id] = post;
                if (!state.currentPagePosts.includes(post._id)) {
                    state.currentPagePosts.push(post._id);
                }
            });
            state.totalPost = count;
        },
        sendPostReactionSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { postId, reactions } = action.payload;
            state.postsById[postId].reactions = { ...reactions };
        },
        resetPost(state, action) {
            state.postsById = {};
            state.currentPagePosts = [];
        },
        editPostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const editedPost = action.payload;

            state.postsById[editedPost._id].content = editedPost.content;
            state.postsById[editedPost._id].image = editedPost.image;
        },
        deletePostSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
        },
    },
});
export const createPostAsync =
    ({ content, image }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            //upload img to cloudinary
            const imgUrl = await cloudinaryUpload(image);

            const response = await apiService.post("/posts", {
                content,
                image: imgUrl,
            });

            dispatch(slice.actions.createPostSuccess(response.data));
            toast.success("Create Post successfully");
            dispatch(getCurrentUserProfile());
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            toast.error(error.message);
        }
    };

export const getPostListAsync =
    ({ userId, page, limit = POST_PER_PAGE }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const params = { page, limit };
            const response = await apiService.get(`/posts/user/${userId}`, {
                params,
            });
            if (page === 1) dispatch(slice.actions.resetPost());
            dispatch(slice.actions.getPostSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            toast.error(error.message);
        }
    };

export const sendPostReactionAsync =
    ({ postId, emoji }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await apiService.post("/reactions", {
                targetType: "Post",
                targetId: postId,
                emoji,
            });
            dispatch(
                slice.actions.sendPostReactionSuccess({
                    reactions: response.data,
                    postId,
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
        }
    };

export const editPostAsync =
    ({ postId, content, image }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            //upload img to cloudinary
            let imgUrl;
            if (image) {
                imgUrl = await cloudinaryUpload(image);
            }

            const response = await apiService.put(`/posts/${postId}`, {
                content,
                image: imgUrl,
            });

            dispatch(slice.actions.editPostSuccess(response.data));
            toast.success("Edit Post successfully");
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            toast.error(error.message);
        }
    };
export const deletePostAsync = (postId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        await apiService.delete(`/posts/${postId}`);

        dispatch(slice.actions.deletePostSuccess(postId));
        toast.success("Delete Post successfully");
        dispatch(getCurrentUserProfile());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export default slice.reducer;
