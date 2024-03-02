import { configureStore } from "@reduxjs/toolkit";
import featureSlice from "./featureSlice";
import projectSlice from "./projectSlice";
import userSlice from "./userSlice";

const appStore = configureStore(
    {
        reducer : {
            feature : featureSlice,
            project : projectSlice,
            user : userSlice
        }
    }
)

export default appStore