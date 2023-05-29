import BCard from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";
import PropTypes from "prop-types";
import Button from "../Button";
import {AiTwotoneStar, AiOutlineAreaChart, AiTwotoneHeart, AiOutlineHeart} from "react-icons/ai";
import {MdLocationOn} from "react-icons/md";
import {BiDollar, BiBath, BiBed} from "react-icons/bi";
import {FavProperty} from "../../Features/Property/Favorite/middleware";
import {useNavigate} from "react-router-dom";
import {OverlayTrigger, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Placeholder} from "react-bootstrap";
export default function PropertyCard(props) {
    let Tooltip = props.Tooltip;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {Tooltip}
        </Tooltip>
    );

    const [control, setControl] = useState({
        fav: props.fav,
    });

    function OpenProperty() {
        if (props.WithNavigateToDetailsPage && Number(props.PropertyId) > 0)
            navigate("/Property/Details/" + props.PropertyId);
        if (props.ImgClicked && typeof props.ImgClicked === "function") props.ImgClicked();
    }

    function handleFav() {
        setControl((old) => ({...old, fav: !old.fav}));
        FavProperty(props.PropertyId);
    }

    return props.ShowSkeleton ? (
        <>
            <BCard
                className={` m-3 ${props.ContainerClass} `}
                style={{height: 410, width: 250, backgroundColor: props.BackgroundColor}}
            >
                <Placeholder bg="#d2d9d4" as="p" style={{height: 200}} size="lg" animation={props.ImgSkeletonAnimation}>
                    <Placeholder bg="#d2d9d4" xs={12} className="h-100" />
                </Placeholder>
                <BCard.Body>
                    <Placeholder bg="#d2d9d4" as={BCard.Title} animation={props.SkeletonAnimation}>
                        <Placeholder bg="#d2d9d4" xs={12} />
                    </Placeholder>
                    <Placeholder bg="#d2d9d4" as={BCard.Text} animation={props.SkeletonAnimation}>
                        <Placeholder bg="#d2d9d4" xs={6} />
                    </Placeholder>
                    <Placeholder bg="#d2d9d4" as={BCard.Footer} animation={props.SkeletonAnimation}>
                        <Placeholder bg="#d2d9d4" xs={3} />
                        <Placeholder bg="#d2d9d4" xs={3} />
                        <Placeholder bg="#d2d9d4" xs={3} />
                    </Placeholder>
                    {/* <Placeholder bg="#d2d9d4".Button variant="primary" xs={6} /> */}
                </BCard.Body>
            </BCard>
        </>
    ) : (
        <BCard className={props.ContainerClass} style={{minHeight: 410}}>
            <div>
                {/* <OverlayTrigger
                    placement="right"
                    delay={{show: 250, hide: 400}}
                    overlay={renderTooltip}
                > */}
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
                    <Button
                        Class="my-1 text-light"
                        Size="sm"
                        StartIcon={<AiTwotoneStar />}
                        Label="featured"
                        Variant="secondary"
                    />
                    <Button
                        Class="mx-2 my-1"
                        Size="sm"
                        Label={props.PropType === "Sael" ? "forsale" : "forrent"}
                        Variant={props.PropType === "Sael" ? "danger" : "primary"}
                    />
                </div>
            </div>
            <BCard.Body>
                <Row className="justify-content-between">
                    <BCard.Title className="col-10 fw-bold fs-5" style={{height: 40}} onClick={OpenProperty}>
                        {props.Title}
                    </BCard.Title>
                    {control.fav ? (
                        <AiTwotoneHeart
                            className="col-2 text-primary fs-5 mt-1"
                            onClick={handleFav}
                            style={{cursor: "pointer"}}
                        />
                    ) : (
                        <AiOutlineHeart
                            className="col-2 text-primary fs-5 mt-1"
                            onClick={handleFav}
                            style={{cursor: "pointer"}}
                        />
                    )}{" "}
                </Row>
                <BCard.Text style={{height: 40}}>
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
    ContainerClass: PropTypes.string,
    ImgVariant: PropTypes.string,
    ImgSrc: PropTypes.string,
    Title: PropTypes.string,
    Text: PropTypes.string,
    Location: PropTypes.string,
    ImgClass: PropTypes.string,
    Beds: PropTypes.string,
    Bath: PropTypes.string,
    Space: PropTypes.string,
    fav: PropTypes.bool,
    WithNavigateToDetailsPage: PropTypes.bool,
    ShowSkeleton: PropTypes.bool,
    SkeletonAnimation: PropTypes.string,
    ImgSkeletonAnimation: PropTypes.string,
    PropType: PropTypes.string,
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
    ContainerClass: "m-3",
    fav: false,
    WithNavigateToDetailsPage: true,
    ShowSkeleton: false,
    SkeletonAnimation: "glow",
    ImgSkeletonAnimation: "wave",
    PropType: "Sael",
};
