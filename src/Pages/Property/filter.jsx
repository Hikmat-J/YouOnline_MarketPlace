import React, {useEffect, useState} from "react";
import {Row, Col, Accordion as RBAccordion, Placeholder} from "react-bootstrap";
import {useAccordionButton} from "react-bootstrap/AccordionButton";
import {Accordion, AccordionItem, Button, Input, Radiobox, Switch} from "../../Components";
import * as app from "../../Services/app";
import {useDispatch, useSelector} from "react-redux";
import {FilterPropertiesApi, selectFilterProperties} from "../../Features/Property/Filter";
import * as RequestModel from "../../Features/Property/Filter/models/request";
import {PropertyCard, RangeScroll, Checkbox} from "../../Components";
import {BsInfinity} from "react-icons/bs";
import {selectPropertyCategories} from "../../Features/Property/Categories/slice";
import {GetPropertyCategories} from "../../Features/Property/Categories/middleware";
import {TiArrowDownThick, TiArrowUpThick} from "react-icons/ti";
import {selectPropertyCategoriesWithSub} from "../../Features/Property/CategoriesWithSub/slice";
import {GetPropertyCategoriesWithSub} from "../../Features/Property/CategoriesWithSub/middleware";

export default function PropertiesFilter(props) {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenSize]);

    const [model, setModel] = useState({
        ...RequestModel.Model,
    });
    const dispatch = useDispatch();
    const [control, setControl] = useState({
        isTopArrow: true,
    });
    const filterPropertiesSelector = useSelector((state) => selectFilterProperties(state));
    const PropertiesCategoriesWithSubSelector = useSelector((state) => selectPropertyCategoriesWithSub(state));

    function CustomToggle({children, eventKey}) {
        const decoratedOnClick = useAccordionButton(eventKey, () => {
            setControl((old) => ({...old, isTopArrow: !old.isTopArrow}));
        });
        return (
            <Button
                Size="sm"
                StartIcon={
                    control.isTopArrow ? <TiArrowDownThick className="fs-3" /> : <TiArrowUpThick className="fs-3" />
                }
                OnClick={decoratedOnClick}
                Class="btn-light m-2 text-primary border border-gray"
            />
        );
    }
    useEffect(() => {
        dispatch(FilterPropertiesApi({...model}));
    }, [model]);

    useEffect(() => {
        if (filterPropertiesSelector.status === "succeeded") {
            app.ChangeLinesSpinnerStatus(false);
        }
        if (filterPropertiesSelector.status === "failed") {
            app.ShowTopMessageAlert("Error : " + filterPropertiesSelector.error, "", "danger");
            app.ChangeLinesSpinnerStatus(false);
        }
        if (filterPropertiesSelector.status === "loading");
    }, [filterPropertiesSelector.status]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (PropertiesCategoriesWithSubSelector.status === "idle") {
            dispatch(GetPropertyCategoriesWithSub());
        }
    }, []);
    return (
        <>
            <Row className="mt-4">
                <Col lg={3} className="px-4">
                    <RBAccordion eventKey="filterCollapse">
                        <div className="bg-light position-relative px-4 border-1 border rounded-4">
                            <Row className="justify-content-between my-4">
                                <label className="col fs-4 fw-bold">{app.translate("filters")}</label>
                                <Col className={app.getCookie("lang", "en") === "en" ? "text-end " : "text-start"}>
                                    <Button
                                        Size="sm"
                                        Label="clearall"
                                        OnClick={() => {
                                            setModel({...RequestModel.Model});
                                        }}
                                        Class="btn-light text-primary border border-primary"
                                    />
                                    {screenSize.width <= 990 ? (
                                        <CustomToggle eventKey="filterCollapse"></CustomToggle>
                                    ) : null}
                                </Col>
                            </Row>
                            <hr />
                            <RBAccordion.Collapse
                                eventKey="filterCollapse"
                                className={screenSize.width > 990 ? "show" : ""}
                            >
                                <div>
                                    <label className="fw-bold my-2">{app.translate("propertykind")}</label>
                                    <Accordion>
                                        {PropertiesCategoriesWithSubSelector.status !== "succeeded"
                                            ? [0, 1, 2, 3].map((cat, index) => {
                                                  return (
                                                      <Row key={index}>
                                                          <Placeholder
                                                              bg="#ffffff"
                                                              as={"p"}
                                                              className="justify-content-between row w-100 py-2"
                                                              animation={"glow"}
                                                          >
                                                              <Placeholder bg="#ffffff" xs={5} className="mx-1" />
                                                              <Placeholder bg="#ffffff" xs={5} />
                                                          </Placeholder>
                                                      </Row>
                                                  );
                                              })
                                            : PropertiesCategoriesWithSubSelector.data.count > 0 &&
                                              PropertiesCategoriesWithSubSelector.data.cat.map((category) => {
                                                  return (
                                                      <Row>
                                                          <AccordionItem
                                                              eventKey={category.id}
                                                              Header={
                                                                  <Checkbox
                                                                      Class="col"
                                                                      Id={"check_" + category.id}
                                                                      Label={category.name
                                                                      .replace("Property", "")
                                                                      .trim()
                                                                      .toLowerCase()}
                                                                      Value={model.category === category.id}
                                                                      OnChange={() => {
                                                                          setModel((old) => ({
                                                                              ...old,
                                                                              category:
                                                                                  old.category === category.id
                                                                                      ? ""
                                                                                      : category.id,
                                                                              subcat: "",
                                                                          }));
                                                                      }}
                                                                  />
                                                              }
                                                          >
                                                              {category.sub_category.map((subCategory) => {
                                                                  return (
                                                                      <>
                                                                          <Row className="p-2 bg-light my-2 rounded-1">
                                                                              <Col>
                                                                                  <Checkbox
                                                                                      Class="col"
                                                                                      Id={"check_" + subCategory.id}
                                                                                      Label={subCategory.name
                                                                                      .replace("Property", "")
                                                                                      .trim()
                                                                                      .toLowerCase()}
                                                                                      Value={
                                                                                          model.subcat ===
                                                                                          subCategory.id
                                                                                      }
                                                                                      OnChange={() => {
                                                                                          setModel((old) => ({
                                                                                              ...old,
                                                                                              category:
                                                                                                  subCategory.category,
                                                                                              subcat:
                                                                                                  old.subcat ===
                                                                                                  subCategory.id
                                                                                                      ? ""
                                                                                                      : subCategory.id,
                                                                                          }));
                                                                                      }}
                                                                                  />
                                                                              </Col>
                                                                          </Row>
                                                                      </>
                                                                  );
                                                              })}
                                                          </AccordionItem>
                                                      </Row>
                                                  );
                                              })}
                                    </Accordion>
                                    <Row className="my-4">
                                        <RangeScroll
                                            Label="Select Range"
                                            MinValue={model.minprice}
                                            MaxValue={model.maxprice}
                                            OnChange={(minprice, maxprice) => {
                                                if (minprice !== model.minprice || maxprice !== model.maxprice)
                                                    setModel((old) => ({...old, minprice, maxprice}));
                                            }}
                                        />
                                        {/* <input type="range" multiple /> */}
                                    </Row>
                                    <Row>
                                        <h6 className="fw-bold">{app.translate("propertytype")}</h6>
                                    </Row>
                                    <Row className="mx-2 ">
                                        <Radiobox
                                            Class="col my-2"
                                            Id="radio_proptype"
                                            Label="all"
                                            Value={model.prop_type === ""}
                                            OnChange={() => setModel((old) => ({...old, prop_type: ""}))}
                                        />
                                        <Radiobox
                                            Class="col my-2"
                                            Id="radio_proptype"
                                            Label="seal"
                                            Value={model.prop_type === "Sael"}
                                            OnChange={() => setModel((old) => ({...old, prop_type: "Sael"}))}
                                        />
                                        <Radiobox
                                            Class="col my-2"
                                            Id="radio_proptype"
                                            Label="rent"
                                            Value={model.prop_type === "Rent"}
                                            OnChange={() => setModel((old) => ({...old, prop_type: "Rent"}))}
                                        />

                                        {/* <Switch
                                            Class="col"
                                            Label="seal"
                                            OnChange={() => setControl((old) => ({...old, IsSeal: !old.IsSeal}))}
                                            Checked={control.IsSeal}
                                            Id="RentOrSeal"
                                        />
                                        <Switch
                                            Class="col"
                                            Label="rent"
                                            OnChange={() => setControl((old) => ({...old, IsRent: !old.IsRent}))}
                                            Checked={control.IsRent}
                                            Id="RentOrSeal"
                                        /> */}
                                    </Row>
                                    <Row className=" my-4">
                                        <Col lg={6}>
                                            <Input
                                                ContainerClass="w-100 "
                                                Class=" py-0 shadow-sm"
                                                Type="number"
                                                Min={0}
                                                Label="bedrooms"
                                                Value={model.bedrooms}
                                                OnChange={(bedrooms) => setModel((old) => ({...old, bedrooms}))}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <Input
                                                ContainerClass="w-100 my-3 my-md-0"
                                                Class="py-0  shadow-sm"
                                                Type="number"
                                                Min={0}
                                                Label="baths"
                                                Value={model.baths}
                                                OnChange={(baths) => setModel((old) => ({...old, baths}))}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mx-2 my-4">
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check120"
                                            Label="sports"
                                            Value={model.sports === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, sports: old.sports === 1 ? "" : 1}));
                                            }}
                                        />
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check10"
                                            Label="furnished"
                                            Value={model.furnished === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, furnished: old.furnished === 1 ? "" : 1}));
                                            }}
                                        />
                                    </Row>

                                    <Row className="mx-2 my-4">
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_livingRoom"
                                            Label="livingroom"
                                            Value={model.living_room === 1}
                                            OnChange={() => {
                                                setModel((old) => ({
                                                    ...old,
                                                    living_room: old.living_room === 1 ? "" : 1,
                                                }));
                                            }}
                                        />
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_balcony"
                                            Label="balcony"
                                            Value={model.balcony === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, balcony: old.balcony === 1 ? "" : 1}));
                                            }}
                                        />
                                    </Row>

                                    <Row className="mx-2 my-4">
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_lift"
                                            Label="lift"
                                            Value={model.lift === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, lift: old.lift === 1 ? "" : 1}));
                                            }}
                                        />
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_parking"
                                            Label="parking"
                                            Value={model.parking === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, parking: old.parking === 1 ? "" : 1}));
                                            }}
                                        />
                                    </Row>

                                    <Row className="mx-2 my-4">
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_gym"
                                            Label="gym"
                                            Value={model.gym === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, gym: old.gym === 1 ? "" : 1}));
                                            }}
                                        />
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_cinema"
                                            Label="cinema"
                                            Value={model.cinema === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, cinema: old.cinema === 1 ? "" : 1}));
                                            }}
                                        />
                                    </Row>

                                    <Row className="mx-2 my-4">
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_conference"
                                            Label="conference"
                                            Value={model.conference === 1}
                                            OnChange={() => {
                                                setModel((old) => ({
                                                    ...old,
                                                    conference: old.conference === 1 ? "" : 1,
                                                }));
                                            }}
                                        />
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_swimming_poll"
                                            Label="swimmingpool"
                                            Value={model.swimming_poll === 1}
                                            OnChange={() => {
                                                setModel((old) => ({
                                                    ...old,
                                                    swimming_poll: old.swimming_poll === 1 ? "" : 1,
                                                }));
                                            }}
                                        />
                                    </Row>

                                    <Row className="mx-2 my-4">
                                        <Checkbox
                                            Class="col my-2"
                                            Id="check_maid_room"
                                            Label="maidroom"
                                            Value={model.maid_room === 1}
                                            OnChange={() => {
                                                setModel((old) => ({...old, maid_room: old.maid_room === 1 ? "" : 1}));
                                            }}
                                        />
                                    </Row>
                                </div>
                            </RBAccordion.Collapse>
                        </div>
                    </RBAccordion>
                </Col>
                <Col md={9}>
                    <h3 className="fw-bold mt-5 mt-md-3 m-3">{app.translate("propertiesads")}</h3>
                    <h5 className="text-gray mx-3">{`${app.translate("showing")} ${
                        filterPropertiesSelector.data.count
                    } ${app.translate("of")} ${filterPropertiesSelector.data.count} ${app.translate("results")}`}</h5>
                    <Row sm={2} lg={3} xxl={4}>
                        {filterPropertiesSelector.status !== "succeeded"
                            ? [0, 1, 2, 3, 4, 5, 6, 7].map((cat, index) => {
                                  return (
                                      <Col key={index}>
                                          <PropertyCard ShowSkeleton />
                                      </Col>
                                  );
                              })
                            : filterPropertiesSelector.data.count > 0 &&
                              filterPropertiesSelector.data.proprety.length > 0 &&
                              filterPropertiesSelector.data.proprety.map((item) => {
                                  return (
                                      <Col className="px-5 px-lg-0">
                                          <PropertyCard
                                              Beds={item.beds}
                                              Bath={item.baths}
                                              Space={item.area}
                                              PropType={item.prop_type}
                                              PropertyId={item.id}
                                              SubTitle="0 Ads"
                                              ImgSrc={
                                                  item.proprety_image && item.proprety_image.length > 0
                                                      ? item.proprety_image[0].proprety_image
                                                      : ""
                                              }
                                              Title={item.title}
                                              footerText="text"
                                              Country={item.country}
                                              City={item.city}
                                              State={item.state}
                                              Price={item.price}
                                              Id={item.id}
                                              fav={item.proprety_fav === 1}
                                          />
                                      </Col>
                                  );
                              })}
                    </Row>
                </Col>
            </Row>
        </>
    );
}
