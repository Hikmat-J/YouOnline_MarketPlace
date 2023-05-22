import BCard from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";

export default function Card(props) {
    let Category = props.Category;
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {Category}
        </Tooltip>
    );

    return (
        <BCard className="m-3" style={{height: 410}}>
            <OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={renderTooltip}>
                <BCard.Img
                    className={props.ImgClass}
                    variant={props.ImgVariant}
                    src={props.ImgSrc}
                    height={200}
                    style={{cursor: "pointer"}}
                    onClick={props.ImgClicked}
                />
            </OverlayTrigger>

            <BCard.Body>
                <BCard.Title>{props.Title}</BCard.Title>
                <BCard.Text>{props.Condition}</BCard.Text>
                {props.Text}
                <br />
                {props.Price}
            </BCard.Body>
            <BCard.Footer>
                <small className="text-muted">{props.footerText}</small>
            </BCard.Footer>
        </BCard>
    );
}

Card.propTypes = {
    ImgVariant: PropTypes.string,
    ImgSrc: PropTypes.string,
    Title: PropTypes.string,
    Text: PropTypes.string,
    footerText: PropTypes.string,
    ImgClass: PropTypes.string,
};

Card.defaultProps = {
    ImgVariant: "",
    ImgSrc: "",
    Title: "",
    Text: "",
    footerText: "",
    ImgClass: "",
};
