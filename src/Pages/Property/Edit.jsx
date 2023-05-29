import React, {useEffect, useState} from "react";
import {Row, Col, Tab, Tabs, Button as RBButton, Form, Image} from "react-bootstrap";
import * as app from "../../Services/app";
import GetPropById, {UpdatePropertyApi} from "../../Features/Property/Edit/middleware";
import {useDispatch, useSelector} from "react-redux";
import {selectPropertyCategories} from "../../Features/Property/Categories/slice";
import {selectPropertySubCategories} from "../../Features/Property/SubCategories/slice";
import {GetPropertyCategories} from "../../Features/Property/Categories/middleware";
import {GetPropSubCategories} from "../../Features/Property/SubCategories/middleware";
import {BsCheckCircleFill} from "react-icons/bs";
import * as Constants from "../../Utils/constants";

import {Model} from "../../Features/Property/Edit/models/response";
import {
    Button,
    GoogleMap,
    PhoneInput,
    RichTextArea,
    Input,
    Select,
    UploadImages,
    Checkbox,
    CategoryCard,
    VideoPlayer,
} from "../../Components";
import Countries from "../../Features/Common/Countries/components/Countries";
import States from "../../Features/Common/States/components/CStates";
import Cities from "../../Features/Common/Cities/components/Cities";
import {MdCancel} from "react-icons/md";
import {useParams} from "react-router-dom";
import {RequestModel} from "../../Features/Property/Add/models";

export default function EditProperty() {
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
    const params = useParams();
    const lang = app.getCookie("lang", "en");
    const [model, setModel] = useState({...Model});
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const PropertyCategoriesSelector = useSelector((state) => selectPropertyCategories(state));
    const PropertySubCategorySelector = useSelector((state) => selectPropertySubCategories(state));
    const [control, setControl] = useState({
        selectedTab: "details",
        selectedCategory: "",
        disableNext: true,
        GetPropById_Loading: false,
    });
    const [data, setData] = useState({
        DATA_CHOICES: [...Constants.DATA_CHOICES],
        TYPE_CHOICES: [...Constants.TYPE_CHOICES],
        UNIT_CHOICES: [...Constants.UNIT_CHOICES],
    });

    function removeImage(img) {}
    function UpdateProperty() {
        let sendModel = {...RequestModel};
        sendModel.address = model.address;
        sendModel.area = model.area;
        sendModel.areaunit = model.areaunit;
        sendModel.balcony = model.balcony;
        sendModel.baths = model.baths;
        sendModel.bedrooms = model.bedrooms;
        sendModel.category = model.category.id;
        sendModel.cinema = model.cinema;
        sendModel.city = model.city.id;
        sendModel.conference = model.conference;
        sendModel.country = model.country.id;
        sendModel.currency = model.currency;
        sendModel.description = model.description;
        sendModel.furnished = model.furnished;
        sendModel.gym = model.gym;
        sendModel.latitude = model.latitude;
        sendModel.lift = model.lift;
        sendModel.linkurl = model.linkurl;
        sendModel.living_room = model.living_room;
        sendModel.longitude = model.longitude;
        sendModel.maid_room = model.maid_room;
        sendModel.parking = model.parking;
        sendModel.phone = model.phone;
        sendModel.price = model.price;
        sendModel.prop_type = model.prop_type;
        sendModel.sports = model.sports;
        sendModel.state = model.state.id;
        sendModel.storage = model.storage;
        sendModel.subcategory = model.subcategory.id;
        sendModel.swimming_poll = model.swimming_poll;
        sendModel.title = model.title;

        app.ChangeLinesSpinnerStatus(true);
        UpdatePropertyApi(params.id, sendModel)
        .then((res) => {
            app.ShowToastAlert("alert", app.translate(""));
            app.ChangeLinesSpinnerStatus(false);
        })
        .catch((err) => {
            app.ShowToastAlert("alert", "error : " + err);
            app.ChangeLinesSpinnerStatus(false);
        });
    }
    useEffect(() => {
        if (PropertyCategoriesSelector.status === "idle") {
            dispatch(GetPropertyCategories());
        }
        setControl((old) => ({...old, GetPropById_Loading: true}));
    }, []);
    useEffect(() => {
        if (model.category.id > 0) dispatch(GetPropSubCategories(model.category.id));
    }, [model.category.id]);
    useEffect(() => {
        if (params.id > 0) {
            window.scrollTo(0, 0);
            GetPropById(params.id, (res) => {
                setControl((old) => ({...old, GetPropById_Loading: false}));
                setModel(res);
            });
        }
    }, [params.id]);
    return (
        <>
            {console.log("model >> ", model)}
            <div className="my-5 mx-lg-5 mx-3 px-0 px-lg-5 py-3 bg-light rounded-2">
                <Row className="justify-content-end my-3 ">
                    <Button Class="w-auto" Label="update" OnClick={UpdateProperty} Variant="primary" />
                </Row>
                <Tabs defaultActiveKey={control.selectedTab} id="editProptabs" className="mb-3">
                    <Tab eventKey="details" title={app.translate("details")}>
                        <>
                            {/* <Form noValidate validated={control.validate} onSubmit={}> */}
                            <Row className="text-center my-5 pt-3  ">
                                <h2 className="fw-bold">{app.translate("addetails")}</h2>
                            </Row>

                            <Row className="justify-content-center ">
                                <div className="col-auto p-1 m-4 h-50 rounded-3 bg-white  border border-2  border-primary">
                                    <Button
                                        Class={`rounded-3 m-0 px-5 ${
                                            model.prop_type === "Sael"
                                                ? "btn-primary text-light"
                                                : "btn-light text-primary"
                                        } ${screenSize.width < 950 ? "w-100" : ""}`}
                                        OnClick={() => {
                                            setModel((old) => ({...old, prop_type: "Sael"}));
                                        }}
                                        Label="forsale"
                                    />
                                    <Button
                                        Class={` rounded-3 m-0 px-5 ${
                                            model.prop_type === "Rent"
                                                ? "btn-primary text-light"
                                                : "btn-light text-primary"
                                        } ${screenSize.width < 950 ? "w-100" : ""}`}
                                        OnClick={() => {
                                            setModel((old) => ({...old, prop_type: "Rent"}));
                                        }}
                                        Label="forrent"
                                    />
                                </div>
                            </Row>

                            <Row className="my-2">
                                <Input
                                    WithFalseFeedback
                                    WithTrueFeedback
                                    Required
                                    Label="adtitle"
                                    Value={model.title}
                                    OnChange={(title) => setModel((old) => ({...old, title}))}
                                />
                            </Row>

                            <Row className="my-2">
                                <Input
                                    WithFalseFeedback
                                    WithTrueFeedback
                                    Required
                                    Min={0}
                                    Label="price"
                                    Value={model.price}
                                    OnChange={(price) => setModel((old) => ({...old, price}))}
                                />
                            </Row>

                            <Row className="py-3">
                                <h6 className="my-2">{app.translate("furnished")}</h6>
                                <Button
                                    Class={`m-2 col-auto ${!model.furnished ? " btn-style-disabeld " : ""}`}
                                    Variant="primary"
                                    Label="furnished"
                                    OnClick={() => {
                                        setModel((old) => ({...old, furnished: true}));
                                    }}
                                />
                                <Button
                                    Class={`m-2 col-auto ${model.furnished ? " btn-style-disabeld " : ""}`}
                                    Variant="primary "
                                    Label="unfurnished"
                                    OnClick={() => {
                                        setModel((old) => ({...old, furnished: false}));
                                    }}
                                />
                            </Row>

                            <Row className="m-2 bg-light rounded-3  row-cols-xs-1 row-cols-sm-1 row-cols-md-5 row-cols-auto col-lg-12 ">
                                <Checkbox
                                    Id="check1"
                                    Class="m-1"
                                    Label="balcony"
                                    Value={model.balcony}
                                    OnChange={() => {
                                        setModel((old) => ({...old, balcony: !old.balcony}));
                                    }}
                                />
                                <Checkbox
                                    Id="check2"
                                    Class="m-1"
                                    Label="gym"
                                    Value={model.gym}
                                    OnChange={() => {
                                        setModel((old) => ({...old, gym: !old.gym}));
                                    }}
                                />
                                <Checkbox
                                    Id="check3"
                                    Class="m-1"
                                    Label="cinema"
                                    Value={model.cinema}
                                    OnChange={() => {
                                        setModel((old) => ({...old, cinema: !old.cinema}));
                                    }}
                                />
                                <Checkbox
                                    Id="check4"
                                    Class="m-1"
                                    Label="livingroom"
                                    Value={model.living_room}
                                    OnChange={() => {
                                        setModel((old) => ({
                                            ...old,
                                            living_room: !old.living_room,
                                        }));
                                    }}
                                />
                                <Checkbox
                                    Id="check5"
                                    Class="m-1"
                                    Label="lift"
                                    Value={model.lift}
                                    OnChange={() => {
                                        setModel((old) => ({...old, lift: !old.lift}));
                                    }}
                                />
                                <Checkbox
                                    Id="check6"
                                    Class="m-1"
                                    Label="parking"
                                    Value={model.parking}
                                    OnChange={() => {
                                        setModel((old) => ({...old, parking: !old.parking}));
                                    }}
                                />

                                <Checkbox
                                    Id="check7"
                                    Class="m-1"
                                    Label="storage"
                                    Value={model.storage}
                                    OnChange={() => {
                                        setModel((old) => ({...old, storage: !old.storage}));
                                    }}
                                />
                                <Checkbox
                                    Id="check8"
                                    Class="m-1"
                                    Label="conference"
                                    Value={model.conference}
                                    OnChange={() => {
                                        setModel((old) => ({...old, conference: !old.conference}));
                                    }}
                                />
                                <Checkbox
                                    Id="check9"
                                    Class="m-1"
                                    Label="swimmingpool"
                                    Value={model.swimming_poll}
                                    OnChange={() => {
                                        setModel((old) => ({
                                            ...old,
                                            swimming_poll: !old.swimming_poll,
                                        }));
                                    }}
                                />
                                <Checkbox
                                    Id="check9"
                                    Class="m-1"
                                    Label="maidroom"
                                    Value={model.maid_room}
                                    OnChange={() => {
                                        setModel((old) => ({...old, maid_room: !old.maid_room}));
                                    }}
                                />
                                <Checkbox
                                    Id="check10"
                                    Class="m-1"
                                    Label="sports"
                                    Value={model.sports}
                                    OnChange={() => {
                                        setModel((old) => ({...old, sports: !old.sports}));
                                    }}
                                />
                            </Row>

                            <Row className="py-3">
                                <h6 className="my-2">{app.translate("bedrooms")}</h6>
                                {data.DATA_CHOICES.map((data_choice, index) => {
                                    return data_choice === "+" ? (
                                        <Input
                                            Disabled
                                            ContainerClass="m-1 px-0 col-4 col-lg-2 "
                                            Class="m-0 px-2 py-1 rounded-4 shadow-sm"
                                            Type="number"
                                            Min={0}
                                            Value={model.bedrooms}
                                            OnChange={(bedrooms) => setModel((old) => ({...old, bedrooms}))}
                                        />
                                    ) : (
                                        <Button
                                            key={index}
                                            Class={`mx-1 col-auto rounded-4 shadow-sm px-3 ${
                                                model.bedrooms !== data_choice ? " btn-style-disabeld " : ""
                                            }`}
                                            Variant="primary"
                                            Label={data_choice}
                                            OnClick={() => {
                                                setModel((old) => ({...old, bedrooms: data_choice}));
                                            }}
                                        />
                                    );
                                })}
                            </Row>

                            <Row className="py-3">
                                <h6 className="my-2">{app.translate("bathrooms")}</h6>
                                {data.DATA_CHOICES.map((data_choice, index) => {
                                    return data_choice === "+" ? (
                                        <Input
                                            Disabled
                                            ContainerClass="m-1 px-0 col-4 col-lg-2 "
                                            Class="m-0 px-2 py-1 rounded-4 shadow-sm"
                                            Type="number"
                                            Min={0}
                                            Value={model.baths}
                                            OnChange={(baths) => setModel((old) => ({...old, baths}))}
                                        />
                                    ) : (
                                        <Button
                                            key={index}
                                            Class={`mx-1 col-auto rounded-4 px-3 ${
                                                model.baths !== data_choice ? " btn-style-disabeld " : ""
                                            }`}
                                            Variant="primary"
                                            Label={data_choice}
                                            OnClick={() => {
                                                setModel((old) => ({...old, baths: data_choice}));
                                            }}
                                        />
                                    );
                                })}
                            </Row>

                            <Row className="my-2">
                                <Input
                                    WithFalseFeedback
                                    WithTrueFeedback
                                    Required
                                    Label="area"
                                    Placeholder="enterarea"
                                    Value={model.area}
                                    OnChange={(area) => setModel((old) => ({...old, area}))}
                                />
                            </Row>

                            <Row className="py-3">
                                <h6 className="my-2">{app.translate("areaunit")}</h6>
                                {data.UNIT_CHOICES.map((unit_choice, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            Class={`m-1 col-auto rounded-4 px-3 ${
                                                model.areaunit !== unit_choice ? " btn-style-disabeld " : ""
                                            }`}
                                            Variant="primary"
                                            Label={unit_choice}
                                            OnClick={() => {
                                                setModel((old) => ({...old, areaunit: unit_choice}));
                                            }}
                                        />
                                    );
                                })}
                            </Row>
                            {/* <Row>
                                <Col>
                                    <PhoneInput
                                        Class="w-100"
                                        Value={model.phone}
                                        OnChange={(phone) => {
                                            setModel((old) => ({...old, phone}));
                                        }}
                                    />
                                </Col>
                            </Row> */}
                            <Row className="my-3 py-2">
                                <RichTextArea
                                    Label="description"
                                    Value={model.description}
                                    OnChange={(description) => setModel((old) => ({...old, description}))}
                                />
                            </Row>

                            <Row xs={1} md={3} className="my-2 py-2">
                                <Countries
                                    LabelClass=" pb-1"
                                    Value={model.country.id}
                                    OnChange={(country) =>
                                        setModel((old) => ({...old, country: {...old.country, id: country}}))
                                    }
                                    // OnLoad={(countries) =>
                                    //     countries &&
                                    //     countries.length > 0 &&
                                    //     setModel((old) => ({...old, country: countries[0].id}))
                                    // }
                                />
                                <States
                                    LabelClass=" pb-1"
                                    Value={model.state.id}
                                    CountryId={model.country.id}
                                    OnChange={(state) =>
                                        setModel((old) => ({...old, state: {...old.state, id: state}}))
                                    }
                                    // OnLoad={(states) =>
                                    //     states &&
                                    //     states.length > 0 &&
                                    //     setModel((old) => ({...old, state: states[0].id}))
                                    // }
                                    Disabled={model.country <= 0}
                                />
                                <Cities
                                    LabelClass=" pb-1"
                                    Value={model.city.id}
                                    StateId={model.state.id}
                                    OnChange={(city) => setModel((old) => ({...old, city: {...old.city, id: city}}))}
                                    // OnLoad={(cities) =>
                                    //     cities && cities.length > 0 && setModel((old) => ({...old, city: cities[0].id}))
                                    // }
                                    Disabled={model.state <= 0}
                                />
                            </Row>

                            <Row className="my-2">
                                <Input
                                    WithFalseFeedback
                                    WithTrueFeedback
                                    Required
                                    Label="address"
                                    Placeholder="enteraddress"
                                    Value={model.address}
                                    OnChange={(address) => setModel((old) => ({...old, address}))}
                                />
                            </Row>
                            <Row md={2} className="my-2">
                                <Input
                                    Label="latitude"
                                    Placeholder="00.00"
                                    Value={model.latitude}
                                    OnChange={(latitude) => setModel((old) => ({...old, latitude}))}
                                />
                                <Input
                                    Label="longitude"
                                    Placeholder="00.00"
                                    Value={model.longitude}
                                    OnChange={(longitude) => setModel((old) => ({...old, longitude}))}
                                />
                            </Row>
                            <Row className="my-2">
                                <GoogleMap />
                            </Row>
                            {/* <Row className="my-3 justify-content-center">
                                    <RBButton
                                        variant="primary col-auto px-5 mx-2"
                                        size="md"
                                        onClick={()=>{}}
                                        type="submit"
                                    >
                                        {app.translate("publish")}
                                    </RBButton>
                                </Row> */}
                            {/* </Form> */}
                        </>
                    </Tab>
                    <Tab eventKey="categories" title={app.translate("categories")}>
                        <>
                            <Row className="text-center my-5 py-3  ">
                                <h2 className="fw-bold">{app.translate("propertytype")}</h2>
                            </Row>
                            <Row className="row-cols-auto justify-content-center my-5">
                                {PropertyCategoriesSelector.status !== "succeeded"
                                    ? [0, 1, 2, 3].map((cat, index) => {
                                          return (
                                              <Col key={index}>
                                                  <CategoryCard ShowSkeleton />
                                              </Col>
                                          );
                                      })
                                    : PropertyCategoriesSelector.data.count > 0 &&
                                      PropertyCategoriesSelector.data.Categories.length > 0 &&
                                      PropertyCategoriesSelector.data.Categories.map((category, index) => {
                                          return (
                                              <Col key={index}>
                                                  {model.category.id === category.id ? (
                                                      <div>
                                                          <BsCheckCircleFill
                                                              className="text-primary fs-2 position-absolute "
                                                              style={{zIndex: 10}}
                                                          />
                                                      </div>
                                                  ) : null}
                                                  <CategoryCard
                                                      ShowSkeleton={PropertyCategoriesSelector.status !== "succeeded"}
                                                      ContainerClass={
                                                          model.category.id === category.id
                                                              ? "shadow border-primary border-2"
                                                              : "shadow-sm"
                                                      }
                                                      BackgroundColor={model.category.id === category.id && "#F0FFF7"}
                                                      Title={category.name}
                                                      ImgSrc={category.image}
                                                      OnClick={() => {
                                                          model.category.id === category.id
                                                              ? setModel((old) => ({
                                                                    ...old,
                                                                    category: {id: 0, name: ""},
                                                                    subcategory: {id: 0, name: ""},
                                                                }))
                                                              : setModel((old) => ({
                                                                    ...old,
                                                                    category: {...old.category, id: category.id},
                                                                    subcategory: {id: 0, name: ""},
                                                                }));
                                                      }}
                                                  />
                                              </Col>
                                          );
                                      })}
                            </Row>
                            {/* {model.category.id > 0 && ( */}
                            <>
                                <Row className="text-center my-5 py-3  ">
                                    <h2 className="fw-bold">{app.translate("youradcategory")}</h2>
                                    <h5 className="text-gray">{app.translate("")}</h5>
                                </Row>
                                <Row className="row-cols-auto justify-content-center my-5">
                                    {PropertySubCategorySelector.status !== "succeeded"
                                        ? [0, 1, 2, 3].map((cat, index) => {
                                              return (
                                                  <Col key={index}>
                                                      <CategoryCard
                                                          ShowSkeleton
                                                          SkeletonAnimation={model.category.id > 0 ? "glow" : "wave"}
                                                          ImgSkeletonAnimation={model.category.id > 0 ? "wave" : ""}
                                                      />
                                                  </Col>
                                              );
                                          })
                                        : PropertySubCategorySelector.data.count > 0 &&
                                          PropertySubCategorySelector.data.Subcategores.length > 0 &&
                                          PropertySubCategorySelector.data.Subcategores.map((category, index) => {
                                              return (
                                                  <Col key={index}>
                                                      {model.subcategory.id === category.id ? (
                                                          <div>
                                                              <BsCheckCircleFill
                                                                  className="text-primary fs-2 position-absolute "
                                                                  style={{zIndex: 10}}
                                                              />
                                                          </div>
                                                      ) : null}
                                                      <CategoryCard
                                                          ShowSkeleton={
                                                              PropertySubCategorySelector.status !== "succeeded"
                                                          }
                                                          ContainerClass={
                                                              model.subcategory.id === category.id
                                                                  ? "shadow border-primary border-2"
                                                                  : "shadow-sm"
                                                          }
                                                          BackgroundColor={
                                                              model.subcategory.id === category.id && "#F0FFF7"
                                                          }
                                                          Title={category.name}
                                                          ImgSrc={require("../../assets/Icons/search.png")}
                                                          OnClick={() => {
                                                              if (model.subcategory.id === category.id)
                                                                  setModel((old) => ({
                                                                      ...old,
                                                                      subcategory: {id: 0, name: ""},
                                                                  }));
                                                              else {
                                                                  setModel((old) => ({
                                                                      ...old,
                                                                      subcategory: {
                                                                          ...old.subcategory,
                                                                          id: category.id,
                                                                      },
                                                                  }));
                                                              }
                                                          }}
                                                      />
                                                  </Col>
                                              );
                                          })}
                                </Row>
                            </>
                        </>
                    </Tab>
                    <Tab eventKey="media" title={app.translate("media")}>
                        <Row className="text-center  my-5 py-3  w-100">
                            <h2 className="fw-bold">{app.translate("youradimages")}</h2>
                        </Row>
                        <Row className="row-cols-auto justify-content-center">
                            {model.proprety_image.map((img) => {
                                return (
                                    <>
                                        <Col className="position-relative m-1 my-3 ">
                                            <MdCancel
                                                className="text-danger bg-light rounded-5 position-absolute start-0  "
                                                style={{top: -10, cursor: "pointer", zIndex: 20}}
                                                size={25}
                                                onClick={() => removeImage(img)}
                                            />
                                            <Image
                                                style={{zIndex: 10}}
                                                src={img.proprety_image}
                                                width={150}
                                                height={150}
                                                rounded
                                            />
                                        </Col>
                                    </>
                                );
                            })}
                        </Row>
                        <Row className="text-center my-5 ">
                            <h2 className="fw-bold">{`${app.translate("oruploadnewimages")}`}</h2>
                        </Row>
                        <Row className="text-center justify-content-center">
                            <UploadImages
                                IsMultiple
                                Images={images}
                                OnReadImages={(imagesArray) => {
                                    setImages(imagesArray);
                                }}
                                OnAddImage={(image) => {
                                    setImages((old) => [...old, image]);
                                }}
                            />
                        </Row>
                        <hr />
                        <p className="text-center m-5 mb-0 p-2">
                            <h2>{app.translate("uploadvideo")}</h2>
                            <h5>{`(${app.translate("optional")})`}</h5>
                        </p>
                        <Row className=" px-4 ">
                            <Input
                                Label="videourl"
                                Value={model.linkurl}
                                OnChange={(linkurl) => setModel((old) => ({...old, linkurl}))}
                            />
                        </Row>
                        <Row className={`py-4  ${lang === "ar" ? "me-2" : "ms-2"}`}>
                            <VideoPlayer Height={500} VideoUrl={model.linkurl} />
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}
