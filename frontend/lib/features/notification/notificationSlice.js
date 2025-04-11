// features/notification/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: {
        admin: [],
        customers: [],
        merchants: []
    }
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.admin.unshift({
                ...action.payload,
                isRead: false,
                id: action.payload.id || Date.now(),
                timestamp: action.payload.timestamp || new Date().toISOString(),
            });
        },
        storeNotifications: (state, action) => {
            // Sort by timestamp when storing from DB
            state.notifications.admin = action.payload.sort((a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            );
        },
        clearNotifications: (state) => {
            state.notifications.admin = [];
        },
        markAllAsRead: (state) => {
            state.notifications.admin.forEach(notification => {
                notification.isRead = true;
            });
        },
        markAsRead: (state, action) => {
            const notification = state.notifications.admin.find(
                n => n.id === action.payload
            );
            if (notification) {
                notification.isRead = true;
            }
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.admin.filter(
                n => n.id !== action.payload
            );
        },
    },
});

export const {
    addNotification,
    storeNotifications,
    clearNotifications,
    markAllAsRead,
    markAsRead,
    removeNotification,
} = notificationSlice.actions;

// Selectors
export const selectNotifications = (state) => {
    console.log(state.notification, 'state')
    return state.notification.notifications.admin || [];
};
export const selectUnreadCount = (state) =>
    state.notification.notifications.admin.filter(n => !n.isRead).length;

export default notificationSlice.reducer;