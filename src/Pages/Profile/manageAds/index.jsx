import React, {useEffect, useState} from "react";
import ManagePropAds from "./propAds";
import {Dialog} from "../../../Components";
export default function ManageAds(props) {
    const [control, setControl] = useState({Show: false});

    return (
        <div>
            <ManagePropAds />
          
        </div>
    );
}
