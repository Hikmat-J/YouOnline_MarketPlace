import BCard from "react-bootstrap/Card";
import * as app from "../../Services/app";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";
import {Placeholder} from "react-bootstrap";

export default function CategoryCard(props) {
    let Category = props.Category;
    const handleClick = (event) => {
        let {value} = event;
        if (props.OnClick && typeof props.OnClick === "function") props.OnClick(value, event);
    };
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {Category}
        </Tooltip>
    );

    return props.ShowSkeleton ? (
        <>
            <BCard
                className={` m-3 ${props.ContainerClass} `}
                style={{height: 240, width: 150, backgroundColor: props.BackgroundColor}}
            >
                <Placeholder bg="#d2d9d4" as="p" style={{height: 120}} size="lg" animation={props.ImgSkeletonAnimation}>
                    <Placeholder bg="#d2d9d4" xs={12} className="h-100" />
                </Placeholder>
                <BCard.Body>
                    <Placeholder bg="#d2d9d4" as={BCard.Title} animation={props.SkeletonAnimation}>
                        <Placeholder bg="#d2d9d4" xs={12} />
                    </Placeholder>
                    <Placeholder
                        bg="#d2d9d4"
                        as={BCard.Text}
                        animation={props.SkeletonAnimation}
                        className="text-center"
                    >
                        <Placeholder bg="#d2d9d4" xs={6} />
                    </Placeholder>
                    {/* <Placeholder.Button variant="primary" xs={6} /> */}
                </BCard.Body>
            </BCard>
        </>
    ) : (
        <BCard
            className={` m-3 ${props.ContainerClass} `}
            style={{height: 240, width: 150, backgroundColor: props.BackgroundColor}}
            onClick={handleClick}
        >
            <OverlayTrigger
                placement="right"
                delay={{show: 250, hide: 400}}
                overlay={props.WithOverlay ? renderTooltip : <></>}
            >
                <BCard.Img
                    className={"border-0 p-2 " + props.ImgClass}
                    alt="Error in image."
                    variant={props.ImgVariant}
                    src={props.ImgSrc}
                    height={120}
                    style={{cursor: "pointer"}}
                    onClick={props.ImgClicked}
                />
            </OverlayTrigger>

            <BCard.Body className="text-center">
                <BCard.Title style={{height: 60, minHeight: 60}}>{app.translate(props.Title)}</BCard.Title>
                <BCard.Text>{props.Ads}</BCard.Text>
            </BCard.Body>
            {/* <BCard.Footer>
                <small className="text-muted">{props.footerText}</small>
            </BCard.Footer> */}
        </BCard>
    );
}

CategoryCard.propTypes = {
    OnClick: PropTypes.func,
    ImgVariant: PropTypes.string,
    ImgSrc: PropTypes.string,
    Title: PropTypes.string,
    ContainerClass: PropTypes.string,
    Ads: PropTypes.string,
    ImgClass: PropTypes.string,
    WithOverlay: PropTypes.bool,
    BackgroundColor: PropTypes.string,
    ShowSkeleton: PropTypes.bool,
    SkeletonAnimation: PropTypes.string,
    ImgSkeletonAnimation: PropTypes.string,
};

CategoryCard.defaultProps = {
    ImgVariant: "",
    ImgSrc: "",
    Title: "",
    // Text: "",
    Ads: "",
    ImgClass: " text-center px-4 ",
    WithOverlay: false,
    BackgroundColor: "",
    ContainerClass: "border-0",
    ShowSkeleton: false,
    SkeletonAnimation: "glow",
    ImgSkeletonAnimation: "",
};
