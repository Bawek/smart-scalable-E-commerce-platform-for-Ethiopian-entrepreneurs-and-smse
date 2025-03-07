import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import storage for persistence

import { setupListeners } from "@reduxjs/toolkit/query";
import merchantSlice from "./features/auth/merchantSlice";
import status from "./features/uiBuilder/status";
import { webBuilder } from "./features/webBuilder/webBuilder";
import { productsApi } from "./features/products/products";
import { authSlice } from "./features/auth/authMerchant";
import { shopSlice } from "./features/shop/shop";
import editorReducer from "./features/editor";
import shopNameSlice from "./features/shop/shopNameSlice";
import { publicShopSlice } from "./features/shop/publicShopSlice";
import currentPage from "./features/admin-my/currentPageSlice";
import currentIdPage from "./features/admin-my/woking-page";
import promptSlice from "./features/prompt";
import accountSlice from "./features/auth/accountSlice";
import AdminEditor from "./features/admin-my/admin-editor";
import { accountApi } from "./features/auth/accountApi";

// Redux Persist Configuration for the auth slice
const persistConfig = {
	key: "account", // Key to save in localStorage
	storage, // Type of storage (localStorage in this case)
	whitelist: ["firestName", "email", "accessToken", "role"], // Keys to persist from the auth state
};

const persistedAuthReducer = persistReducer(persistConfig, accountSlice);

export const makeStore = () => {
	const store = configureStore({
		reducer: {
			[webBuilder.reducerPath]: webBuilder.reducer,
			[productsApi.reducerPath]: productsApi.reducer,
			[accountApi.reducerPath]: accountApi.reducer,
			[authSlice.reducerPath]: authSlice.reducer,
			[shopSlice.reducerPath]: shopSlice.reducer,
			[publicShopSlice.reducerPath]: publicShopSlice.reducer,
			merchant: merchantSlice,
			shopName: shopNameSlice,
			currentPage: currentPage,
			currentIdPage: currentIdPage,
			account: persistedAuthReducer, // Use persisted reducer
			AdminEditor: AdminEditor,
			status: status,
			editor: editorReducer,
			prompt: promptSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false, // Avoid warnings about non-serializable values
			})
				.concat(webBuilder.middleware)
				.concat(productsApi.middleware)
				.concat(authSlice.middleware)
				.concat(shopSlice.middleware)
				.concat(accountApi.middleware)
				.concat(publicShopSlice.middleware),
	});

	setupListeners(store.dispatch);
	return store;
};

// Create store and persistor
export const store = makeStore();
export const persistor = persistStore(store);
