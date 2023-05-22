import React, {useState} from "react";
import RBCarousel from "react-bootstrap/Carousel";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import VideoPlayer from "./VideoPlayer";
import Dialog from "../Dialog";
import {BsFullscreen} from "react-icons/bs";

export default function Carousel(props) {
    const [index, setIndex] = useState(0);
    const [control, setControl] = useState({
        Show: false,
    });
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const renderCarousel = () => {
        return (
            <RBCarousel className="h-100 bg-dark text-center" activeIndex={index} onSelect={handleSelect}>
                {props.Items &&
                    props.Items.map((item, itemIndex) => {
                        return (
                            <RBCarousel.Item>
                                <img className="w-auto" src={item.src} alt={item.alt} height={props.Height} />
                                <RBCarousel.Caption>{item.caption}</RBCarousel.Caption>
                            </RBCarousel.Item>
                        );
                    })}
                {props.VideoUrl.trim().length > 0 && (
                    <RBCarousel.Item>
                        <VideoPlayer VideoUrl={props.VideoUrl} Height={props.Height} />
                    </RBCarousel.Item>
                )}
            </RBCarousel>
        );
    };
    return (
        <div className="position-relative">
            {props.Items.length > 0 && (
                <BsFullscreen
                    onClick={() => setControl((old) => ({...old, Show: true}))}
                    className="p-1 bg-light position-absolute text-primary rounded fs-2 m-3 mx-4"
                    style={
                        app.getCookie("lang", "en") === "en"
                            ? {zIndex: 10, right: 0, bottom: 0, cursor: "pointer", opacity: 0.7}
                            : {zIndex: 10, left: 0, bottom: 0, cursor: "pointer", opacity: 0.7}
                    }
                />
            )}
            {/* </div> */}
            {renderCarousel()}
            <Dialog
                FullScreen
                Show={control.Show}
                OnClose={() => {
                    setControl((old) => ({...old, Show: false}));
                }}
            >
                <RBCarousel className="h-100 bg-dark text-center" activeIndex={index} onSelect={handleSelect}>
                    {props.Items &&
                        props.Items.map((item, itemIndex) => {
                            return (
                                <RBCarousel.Item>
                                    <img className="w-100" src={item.src} alt={item.alt} height={620} />
                                    <RBCarousel.Caption>{item.caption}</RBCarousel.Caption>
                                </RBCarousel.Item>
                            );
                        })}
                    {props.VideoUrl.trim().length > 0 && (
                        <RBCarousel.Item>
                            <VideoPlayer VideoUrl={props.VideoUrl} Height={620} />
                        </RBCarousel.Item>
                    )}
                </RBCarousel>
            </Dialog>
        </div>
    );
}

Carousel.propTypes = {
    // Items: PropTypes.arrayOf(
    //     PropTypes.shape((('src' = PropTypes.string), (alt = PropTypes.string), (caption = PropTypes.element)))
    // ).isRequired,
    Height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    Width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    VideoUrl: PropTypes.string,
    WithFullSize: PropTypes.bool,
};
Carousel.defaultProps = {
    Width: 400,
    Height: 400,
    VideoUrl: "",
    WithFullSize: true,
};
