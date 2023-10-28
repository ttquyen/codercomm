import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
    isLoading: false,
    error: null,
    currentPageUsers: [], //["userId1", "userID2"]
    usersById: {
        //"userId1":"info1..."
        //"userId2":"info2..."
        //"userId3":"info3..."
    },
    totalPages: 1,
    count: 0,
};
const slice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getUserListSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { users, count, totalPages } = action.payload;
            users.forEach((user) => {
                state.usersById[user._id] = user;
            });
            state.currentPageUsers = users.map((user) => user._id);
            state.totalPages = totalPages;
            state.count = count;
        },
        sendFriendRequestSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { targetUserId, ...friendship } = action.payload;
            state.usersById[targetUserId].friendship = friendship;
        },
        declineFriendRequestSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { targetUserId, ...friendship } = action.payload;
            state.usersById[targetUserId].friendship = friendship;
        },
        acceptFriendRequestSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { targetUserId, ...friendship } = action.payload;
            state.usersById[targetUserId].friendship = friendship;
        },
        cancelFriendRequestSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { targetUserId } = action.payload;
            state.usersById[targetUserId].friendship = null;
        },
        deleteFriendSuccess(state, action) {
            state.isLoading = false;
            state.error = null;
            const { targetUserId } = action.payload;
            state.usersById[targetUserId].friendship = null;
        },
        getFriendListSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { users, count, totalPages } = action.payload;
            users.forEach((user) => {
                state.usersById[user._id] = user;
            });
            state.currentPageUsers = users.map((user) => user._id);
            state.totalPages = totalPages;
            state.count = count;
        },
        getFriendRequestListSuccess(state, action) {
            state.isLoading = false;
            state.error = null;

            const { users, count, totalPages } = action.payload;
            users.forEach((user) => {
                state.usersById[user._id] = user;
            });
            state.currentPageUsers = users.map((user) => user._id);
            state.totalPages = totalPages;
            state.count = count;
        },
    },
});
export const getUsersListAsync =
    ({ name, page = 1, limit = 12 }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const params = { name, page, limit };
            const response = await apiService.get(`/users`, { params });
            dispatch(slice.actions.getUserListSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            toast.error(error.message);
        }
    };
export const sendFriendRequestAsync = (targetUserId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post(`/friends/requests`, {
            to: targetUserId,
        });
        dispatch(
            slice.actions.sendFriendRequestSuccess({
                ...response.data,
                targetUserId,
            })
        );
        toast.success("Request sent");
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};
export const declineFriendRequestAsync = (targetUserId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(
            `/friends/requests/${targetUserId}`,
            {
                status: "declined",
            }
        );
        dispatch(
            slice.actions.declineFriendRequestSuccess({
                ...response.data,
                targetUserId,
            })
        );
        toast.success("Request declined");
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};
export const acceptFriendRequestAsync = (targetUserId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.put(
            `/friends/requests/${targetUserId}`,
            {
                status: "accepted",
            }
        );
        dispatch(
            slice.actions.acceptFriendRequestSuccess({
                ...response.data,
                targetUserId,
            })
        );
        toast.success("Friend accepted");
        dispatch(getCurrentUserProfile());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};
export const cancelFriendRequestAsync = (targetUserId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.delete(
            `/friends/requests/${targetUserId}`
        );
        dispatch(
            slice.actions.cancelFriendRequestSuccess({
                ...response.data,
                targetUserId,
            })
        );
        toast.success("Request cancelled");
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};
export const deleteFriendAsync = (targetUserId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.delete(`/friends/${targetUserId}`);
        dispatch(
            slice.actions.deleteFriendSuccess({
                ...response.data,
                targetUserId,
            })
        );
        toast.success("Friend removed");
        dispatch(getCurrentUserProfile());
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
    }
};

export const getFriendListAsync =
    ({ name, page = 1, limit = 12 }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const params = { name, page, limit };
            const response = await apiService.get(`/friends`, { params });
            dispatch(slice.actions.getFriendListSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            toast.error(error.message);
        }
    };
export const getFriendRequestListAsync =
    ({ name, page = 1, limit = 12, requestType }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const params = { name, page, limit };
            const response = await apiService.get(
                `/friends/requests/${requestType}`,
                {
                    params,
                }
            );
            dispatch(slice.actions.getFriendRequestListSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error.message));
            toast.error(error.message);
        }
    };

export default slice.reducer;
