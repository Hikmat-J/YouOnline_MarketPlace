import React from "react";
import {useQuery} from "react-query";
import * as app from "./app";
export default function APIProcessing(props) {
    const {isLoading} = useQuery("", () => app.Get(props.url, props.params));
}
