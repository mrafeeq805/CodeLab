import { configureStore } from "@reduxjs/toolkit";
import featureSlice from "./featureSlice";
import projectSlice from "./projectSlice";

const appStore = configureStore(
    {
        reducer : {
            feature : featureSlice,
            project : projectSlice
        }
    }
)

export default appStore