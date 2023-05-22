import BCard from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";
import Button from "../Button";
import {AiTwotoneStar, AiOutlineAreaChart} from "react-icons/ai";
import {MdLocationOn} from "react-icons/md";
import {BiDollar, BiBath, BiBed} from "react-icons/bi";
import {FavProperty} from "../../Features/Property/Favorite/middleware";
import Model from "../../Features/Property/Favorite/models/request";
import {useNavigate} from "react-router-dom";

export default function PropertyCard(props) {
    let Category = props.Category;
    const navigate = useNavigate();
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {Category}
        </Tooltip>
    );

    function OpenProperty() {
        console.log('props.PropertyId :>> ', props.PropertyId);
        console.log('props :>> ', props);
        if (props.WithNavigateToDetailsPage && Number(props.PropertyId) > 0) navigate("/Property/Details/" + props.PropertyId); 
        if (props.ImgClicked && typeof props.ImgClicked === "function") props.ImgClicked();
    }

    return (
        <BCard className="m-3" style={{minHeight: 410}}>
            <div>
                {/* <OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={renderTooltip}> */}
                <BCard.Img
                    className={props.ImgClass}
                    variant={props.ImgVariant}
                    src={props.ImgSrc}
                    height={200}
                    style={{cursor: "pointer"}}
                    onClick={OpenProperty}
                />
                {/* </OverlayTrigger> */}
                <div className="position-absolute p-0 m-0" style={{top: 10, left: 10}}>
                    <Button Size="sm" StartIcon={<AiTwotoneStar />} Label="featured" Variant="secondary" />
                    <Button Class="mx-2" Size="sm" Label="forsale" Variant="danger" />
                </div>
            </div>
            <BCard.Body>
                <BCard.Title className="fw-bold fs-5" onClick={OpenProperty}>
                    {props.Title}
                </BCard.Title>
                <BCard.Text>
                    <MdLocationOn className="text-primary fs-4" />
                    <small className="">
                        {props.Country} - {props.State} - {props.City}
                    </small>
                </BCard.Text>
                {props.Text}
                <br />
                <BiDollar className="fs-4 text-primary" />
                {props.Price}
            </BCard.Body>
            <BCard.Footer className="p-3 d-flex justify-content-between ">
                <small className="text-primary mx-2">
                    <BiBed className="fs-5 mx-2" />
                    {props.Beds}
                </small>
                <small className="text-primary mx-2">
                    <BiBath className="fs-5 mx-2" />
                    {props.Bath}
                </small>
                <small className="text-primary mx-2">
                    <AiOutlineAreaChart
                        className="fs-5 mx-2 "
                        onClick={() => {
                            // FavProperty({proprety: "20"});
                        }}
                    />
                    {props.Space}
                </small>
            </BCard.Footer>
        </BCard>
    );
}

PropertyCard.propTypes = {
    PropertyId: PropTypes.number,
    ImgVariant: PropTypes.string,
    ImgSrc: PropTypes.string,
    Title: PropTypes.string,
    Text: PropTypes.string,
    Location: PropTypes.string,
    ImgClass: PropTypes.string,
    Beds: PropTypes.string,
    Bath: PropTypes.string,
    Space: PropTypes.string,
    WithNavigateToDetailsPage: PropTypes.bool,
};

PropertyCard.defaultProps = {
    PropertyId: 0,
    ImgVariant: "",
    ImgSrc: "",
    Title: "",
    Text: "",
    Location: "",
    ImgClass: "",
    Beds: "",
    Bath: "",
    Space: "",
    WithNavigateToDetailsPage: true,
};
