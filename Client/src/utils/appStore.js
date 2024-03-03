import { configureStore } from "@reduxjs/toolkit";
import featureSlice from "./featureSlice";
import projectSlice from "./projectSlice";
import userSlice from "./userSlice";
import favoriteSlice from "./favoriteSlice";

const appStore = configureStore(
    {
        reducer : {
            feature : featureSlice,
            project : projectSlice,
            user : userSlice,
            favorite : favoriteSlice
        }
    }
)

export default appStore