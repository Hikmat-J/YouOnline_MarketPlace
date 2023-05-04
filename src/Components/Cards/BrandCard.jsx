import BCard from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";

export default function BrandCard(props) {
    let Category = props.Category;
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {Category}
        </Tooltip>
    );

    return (
        <BCard className="m-3 border-0">
            <OverlayTrigger
                placement="right"
                delay={{show: 250, hide: 400}}
                overlay={props.WithOverlay ? renderTooltip : <></>}
            >
                <BCard.Img
                    className={props.ImgClass}
                    variant={props.ImgVariant}
                    src={props.ImgSrc}
                    height={175}
                    style={{cursor: "pointer"}}
                    onClick={props.ImgClicked}
                />
            </OverlayTrigger>

            <BCard.Body className="text-center mt-3">
                <BCard.Title>{props.Title}</BCard.Title>
                <BCard.Text className={props.SubTitleClass}>{props.SubTitle}</BCard.Text>
                {/* {props.Text}
                <br />
                {props.Price} */}
            </BCard.Body>
            {/* <BCard.Footer>
                <small className="text-muted">{props.footerText}</small>
            </BCard.Footer> */}
        </BCard>
    );
}

BrandCard.propTypes = {
    ImgVariant: PropTypes.string,
    ImgSrc: PropTypes.string,
    Title: PropTypes.string,
    SubTitle: PropTypes.string,
    SubTitleClass: PropTypes.string,
    ImgClass: PropTypes.string,
    WithOverlay: PropTypes.bool,
};

BrandCard.defaultValues = {
    ImgVariant: "",
    ImgSrc: "",
    Title: "",
    SubTitle: "",
    SubTitleClass: "text-primary fw-bold",
    ImgClass: "",
    WithOverlay: false,
};
