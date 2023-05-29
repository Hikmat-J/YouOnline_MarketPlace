import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player/lazy";
import PropTypes from "prop-types";
import * as app from "../../Services/app";
import {Row} from "react-bootstrap";
import {MdOutlineOndemandVideo} from "react-icons/md";
import {AiOutlineVideoCameraAdd} from "react-icons/ai";

export default function VideoPlayer(props) {
    const [control, setControl] = useState({
        ready: false,
    });
    useEffect(() => {
        setControl((old) => ({...old, ready: ReactPlayer.canPlay(props.VideoUrl + "")}));
    }, [props.VideoUrl]);
    return (
        <>
            {control.ready ? (
                <ReactPlayer
                    width={props.Width}
                    height={props.Height}
                    url={props.VideoUrl}
                    controls={props.WithControls}
                    light={props.IsLight}
                />
            ) : (
                <>
                    <Row
                        className=" text-center align-items-center text-gray rounded-4 border-dotted border-lightGrey border-1"
                        style={{width: props.Width, height: props.Height}}
                    >
                        <AiOutlineVideoCameraAdd className="mx-2 " size={150} />
                        <h4>{app.translate(props.Text)}</h4>
                    </Row>
                </>
            )}
        </>
    );
}

VideoPlayer.propTypes = {
    VideoUrl: PropTypes.string.isRequired,
    WithControls: PropTypes.bool,
    IsLight: PropTypes.bool,
    Width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Text: PropTypes.string,
};

VideoPlayer.defaultProps = {
    WithControls: true,
    IsLight: false,
    Width: "100%",
    Height: 360,
    Text: "uploadvideourl",
};
