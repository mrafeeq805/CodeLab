import { configureStore } from "@reduxjs/toolkit";
import screenshotSlice from "./screenshotSlice";

const appStore = configureStore(
    {
        reducer : {
            screenshot : screenshotSlice
        }
    }
)

export default appStore