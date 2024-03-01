import { configureStore } from "@reduxjs/toolkit";
import featureSlice from "./featureSlice";

const appStore = configureStore(
    {
        reducer : {
            feature : featureSlice
        }
    }
)

export default appStore