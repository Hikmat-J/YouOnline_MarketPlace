import React, {useEffect} from "react";
import PropTypes from "prop-types";
import * as app from "../Services/app";

export default function Tabs(props) {
    function selectedChangedHandler(item) {
        if (props.onSelect) props.onSelect(item.id);
        if (item.Clicked) item.Clicked();
    }

    var children = (props.children[0] != undefined ? props.children : [props.children]).filter(
        (r) => typeof r == "object"
    );

    useEffect(() => {
        if (!props.activeTab && children[0].props.Clicked) children[0].props.Clicked();
    }, []);

    return (
        <>
            <ul className="nav nav-tabs shadow-sm" id="myTab" role="tablist">
                {children.map((child, index) => (
                    <li className="nav-item" role="presentation" key={child.props.id}>
                        <button
                            className={`nav-link  ${
                                props.activeTab === child.props.id || (!props.activeTab && index == 0) ? "active" : ""
                            }`}
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target={`#${child.props.id}`}
                            type="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected="true"
                            onClick={() => selectedChangedHandler(child.props)}
                            disabled={child.props.disabled}
                            onFocus={child.props.onFocus}
                        >
                            {app.translate(child.props.label)}
                        </button>
                    </li>
                ))}
            </ul>
            <div
                className={`tab-content px-3 pb-3 pt-1 ${
                    props.noShadow ? "border-bottom-0" : "shadow-sm"
                } border border-top-0 border-1 overflow-auto position-relative ${
                    props.activeTab === children[0].props.id && (props.isLocked || props.isCanceled)
                        ? "bg-black bg-opacity-10"
                        : "bg-white"
                }`}
                id="nav-tabContent"
                style={{maxHeight: "calc(100vh - 195px)"}}
            >
                {children.map((tab, index) => (
                    <div
                        className={`tab-pane fade ${
                            props.activeTab === tab.props.id || (!props.activeTab && index == 0) ? " show active" : ""
                        }`}
                        key={index}
                        {...tab.props}
                    ></div>
                ))}
                {props.activeTab === children[0].props.id && (props.isLocked || props.isCanceled) && (
                    <div className="position-absolute top-50 start-50 translate-middle  ">
                        <img src={`images/${props.isLocked ? "lock" : "cancel"}.png `} className="rounded" alt="..." />
                    </div>
                )}
            </div>
        </>
    );
}

Tabs.propTypes = {
    isLocked: PropTypes.bool,
    isCanceled: PropTypes.bool,
    noShadow: PropTypes.bool,
};

Tabs.defaultProps = {
    isLocked: false,
    isCanceled: false,
    noShadow: false,
};
