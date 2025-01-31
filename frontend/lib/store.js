import { configureStore } from "@reduxjs/toolkit";
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
import promptSlice from "./features/prompt";
export const makeStore = () => {
	return configureStore({
		reducer: {
			[webBuilder.reducerPath]: webBuilder.reducer,
			[productsApi.reducerPath]: productsApi.reducer,
			[authSlice.reducerPath]: authSlice.reducer,
			[shopSlice.reducerPath]: shopSlice.reducer,
			[publicShopSlice.reducerPath]: publicShopSlice.reducer,
			merchant: merchantSlice,
			shopName: shopNameSlice,
			status: status,
			editor: editorReducer,
			prompt: promptSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(webBuilder.middleware)
				.concat(productsApi.middleware)
				.concat(authSlice.middleware)
				.concat(shopSlice.middleware)
				.concat(publicShopSlice.middleware),
				
				
	});
};
setupListeners(makeStore().dispatch);
