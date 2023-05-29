import React, {useState, useRef, useEffect} from "react";
import {Row, Col, Container, Button as RBButton, Form} from "react-bootstrap";
import {
    Button,
    VideoPlayer,
    GoogleMap,
    PhoneInput,
    RichTextArea,
    Input,
    Select,
    UploadImages,
    Checkbox,
    CategoryCard,
} from "../../Components";
import * as app from "../../Services/app";
import * as Constants from "../../Utils/constants";
import {RequestModel} from "../../Features/Property/Add/models";
import Countries from "../../Features/Common/Countries/components/Countries";
import States from "../../Features/Common/States/components/CStates";
import Cities from "../../Features/Common/Cities/components/Cities";
import {useDispatch, useSelector} from "react-redux";
import {selectPropertyCategories} from "../../Features/Property/Categories/slice";
import {GetPropertyCategories} from "../../Features/Property/Categories/middleware";
import {BsCheckCircleFill} from "react-icons/bs";
import {selectPropertySubCategories} from "../../Features/Property/SubCategories/slice";
import {GetPropSubCategories} from "../../Features/Property/SubCategories/middleware";

export default function AddProperty(props) {
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

    const [addModel, setAddModel] = useState({
        ...RequestModel,
    });
    const imageRef = useRef(null);
    const [images, setImages] = useState([]);
    const PropertyCategoriesSelector = useSelector((state) => selectPropertyCategories(state));
    const PropertySubCategorySelector = useSelector((state) => selectPropertySubCategories(state));

    const dispatch = useDispatch();
    const [data, setData] = useState({
        DATA_CHOICES: [...Constants.DATA_CHOICES],
        TYPE_CHOICES: [...Constants.TYPE_CHOICES],
        UNIT_CHOICES: [...Constants.UNIT_CHOICES],
    });
    const [control, setControl] = useState({
        validate: false,
    });
    function UploadProfileImage(event) {
        event.stopPropagation();
        event.preventDefault();
        setImages(Array.from(event.target.files));
    }

    function validateForm() {
        const newErrors = {};
        if (!addModel.title || addModel.title === "") newErrors.title = "Title field is required!";
        if (!addModel.price || addModel.price === "") newErrors.price = "Price field is required!";
        if (!addModel.phone || addModel.phone === "") newErrors.phone = "Phone field is required!";
        if (!addModel.address || addModel.address === "") newErrors.address = "Address field is required!";
        else if (!addModel.area || addModel.area === "") newErrors.area = "Area field is required!";
        return newErrors;
    }

    function Publish(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        // if (form.checkValidity() === false) {
        let formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            app.ShowToastAlert("alert", app.translate("pleasecheckrequiredfields!"));
            window.scrollTo({
                top: 100,
                behavior: "smooth",
            }); // app.ShowToastAlert("alert", app.translate("pleasecheckrequiredfields!"), "", "success");
        } else {
            if (Array.isArray(images) && images.length > 0) {
                let formdata = new FormData();
                for (var key in addModel) {
                    formdata.append(key, addModel[key]);
                }
                images.map((image) => {
                    formdata.append("image", image);
                });
                app.ShowToastAlert("alert", app.translate("postaddedsuccessfully!"), "", "success");
                props.Publish(formdata);
            } else props.Publish(addModel);
        }
        // }
        setControl((old) => ({...old, validate: true}));
    }
    useEffect(() => {
        if (PropertyCategoriesSelector.status === "idle") {
            dispatch(GetPropertyCategories());
        }
    }, []);

    useEffect(() => {
        if (addModel.category > 0) dispatch(GetPropSubCategories(addModel.category));
    }, [addModel.category]);

    useEffect(() => {
        props.changeControle({...props.control, disableNext: addModel.subcategory > 0 ? false : true});
    }, [addModel.subcategory]);
    useEffect(() => {
        if (props.control.Step === 2) {
            if (addModel.category <= 0 && addModel.subcategory <= 0) {
                props.changeControle({...props.control, disableNext: true});
            } else props.changeControle({...props.control, disableNext: false});
        } else if (props.control.Step === 3) {
            props.changeControle({...props.control, disableNext: images.length > 0 ? false : true});
        }
    }, [props.control.Step]);
    useEffect(() => {
        props.changeControle({...props.control, disableNext: images.length > 0 ? false : true});
    }, [images]);
    return (
        <>
            <div className={` ${screenSize.width > 700 ? "container col-8  " : " col-12 px-1"}`}>
                {props.control.Step === 2 ? (
                    <>
                        <Row className="text-center my-5 py-3  ">
                            <h2 className="fw-bold">{app.translate("whatareyouoffering?")}</h2>
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
                                              {addModel.category === category.id ? (
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
                                                      addModel.category === category.id
                                                          ? "shadow border-primary border-2"
                                                          : "shadow-sm"
                                                  }
                                                  BackgroundColor={addModel.category === category.id && "#F0FFF7"}
                                                  Title={category.name}
                                                  ImgSrc={category.image}
                                                  OnClick={() => {
                                                      addModel.category === category.id
                                                          ? setAddModel((old) => ({
                                                                ...old,
                                                                category: "",
                                                            }))
                                                          : setAddModel((old) => ({
                                                                ...old,
                                                                category: category.id,
                                                            }));
                                                  }}
                                              />
                                          </Col>
                                      );
                                  })}
                        </Row>
                        {/* {addModel.category > 0 && ( */}
                        <>
                            <Row className="text-center my-5 py-3  ">
                                <h2 className="fw-bold">{app.translate("choosecategory")}</h2>
                                <h5 className="text-gray">{app.translate("selectcategorymsg")}</h5>
                            </Row>
                            <Row className="row-cols-auto justify-content-center my-5">
                                {PropertySubCategorySelector.status !== "succeeded"
                                    ? [0, 1, 2, 3].map((cat, index) => {
                                          return (
                                              <Col key={index}>
                                                  <CategoryCard
                                                      ShowSkeleton
                                                      SkeletonAnimation={addModel.category > 0 ? "glow" : "wave"}
                                                      ImgSkeletonAnimation={addModel.category > 0 ? "wave" : ""}
                                                  />
                                              </Col>
                                          );
                                      })
                                    : PropertySubCategorySelector.data.count > 0 &&
                                      PropertySubCategorySelector.data.Subcategores.length > 0 &&
                                      PropertySubCategorySelector.data.Subcategores.map((category, index) => {
                                          return (
                                              <Col key={index}>
                                                  {addModel.subcategory === category.id ? (
                                                      <div>
                                                          <BsCheckCircleFill
                                                              className="text-primary fs-2 position-absolute "
                                                              style={{zIndex: 10}}
                                                          />
                                                      </div>
                                                  ) : null}
                                                  <CategoryCard
                                                      ShowSkeleton={PropertySubCategorySelector.status !== "succeeded"}
                                                      ContainerClass={
                                                          addModel.subcategory === category.id
                                                              ? "shadow border-primary border-2"
                                                              : "shadow-sm"
                                                      }
                                                      BackgroundColor={
                                                          addModel.subcategory === category.id && "#F0FFF7"
                                                      }
                                                      Title={category.name}
                                                      ImgSrc={require("../../assets/Icons/search.png")}
                                                      OnClick={() => {
                                                          if (addModel.subcategory === category.id)
                                                              setAddModel((old) => ({
                                                                  ...old,
                                                                  subcategory: "",
                                                              }));
                                                          else {
                                                              setAddModel((old) => ({
                                                                  ...old,
                                                                  subcategory: category.id,
                                                              }));
                                                          }
                                                      }}
                                                  />
                                              </Col>
                                          );
                                      })}
                            </Row>
                        </>
                        {/* )} */}
                    </>
                ) : props.control.Step === 3 ? (
                    <>
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
                                Value={addModel.linkurl}
                                OnChange={(linkurl) => setAddModel((old) => ({...old, linkurl}))}
                            />
                        </Row>
                        <Row className={`p-4  ${app.getCookie("lang", "en") === "ar" ? "me-2" : "ms-2"} `}>
                            <VideoPlayer VideoUrl={addModel.linkurl} />
                        </Row>
                        {/* <input id="image" multiple type="file" ref={imageRef} onChange={UploadProfileImage} /> */}
                        {/* <Image
                            className="rounded rounded-circle position-absolute "
                            style={{bottom: 0, top: 180}}
                            src={Constants.BASE_SITE_URL + "" + props.Profile.profile_image}
                            roundedCircle
                            width={85}
                            height={85}
                        /> */}
                    </> // <UploadImages OnChange={() => {}} Model={""} Title={"Upload Images"} />
                ) : props.control.Step === 4 ? (
                    <>
                        <Form noValidate validated={control.validate} onSubmit={Publish}>
                            <Row className="text-center my-5 pt-3  ">
                                <h2 className="fw-bold">{app.translate("includesomedetails")}</h2>
                            </Row>

                            <Row className="justify-content-center ">
                                <div className="col-auto p-1 m-4 h-50 rounded-3 bg-white  border border-2  border-primary">
                                    <Button
                                        Class={`rounded-3 m-0 px-5 ${
                                            addModel.prop_type === "Sael"
                                                ? "btn-primary text-light"
                                                : "btn-light text-primary"
                                        } ${screenSize.width < 950 ? "w-100" : ""}`}
                                        OnClick={() => {
                                            setAddModel((old) => ({...old, prop_type: "Sael"}));
                                        }}
                                        Label="forsale"
                                    />
                                    <Button
                                        Class={` rounded-3 m-0 px-5 ${
                                            addModel.prop_type === "Rent"
                                                ? "btn-primary text-light"
                                                : "btn-light text-primary"
                                        } ${screenSize.width < 950 ? "w-100" : ""}`}
                                        OnClick={() => {
                                            setAddModel((old) => ({...old, prop_type: "Rent"}));
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
                                    Value={addModel.title}
                                    OnChange={(title) => setAddModel((old) => ({...old, title}))}
                                />
                            </Row>

                            <Row className="my-2">
                                <Input
                                    WithFalseFeedback
                                    WithTrueFeedback
                                    Required
                                    Type="number"
                                    Min={0}
                                    Label="price"
                                    Value={addModel.price}
                                    OnChange={(price) => setAddModel((old) => ({...old, price}))}
                                />
                            </Row>

                            <Row className="py-3">
                                <h6 className="my-2">{app.translate("furnished")}</h6>
                                <Button
                                    Class={`m-2 col-auto ${addModel.furnished === 0 ? " btn-style-disabeld " : ""}`}
                                    Variant="primary"
                                    Label="furnished"
                                    OnClick={() => {
                                        setAddModel((old) => ({...old, furnished: 1}));
                                    }}
                                />
                                <Button
                                    Class={`m-2 col-auto ${addModel.furnished === 1 ? " btn-style-disabeld " : ""}`}
                                    Variant="primary "
                                    Label="unfurnished"
                                    OnClick={() => {
                                        setAddModel((old) => ({...old, furnished: 0}));
                                    }}
                                />
                            </Row>

                            <Row className="m-2 bg-light rounded-3  row-cols-xs-1 row-cols-sm-1 row-cols-md-5 row-cols-auto col-lg-12 ">
                                <Checkbox
                                    Id="check1"
                                    Class="m-1"
                                    Label="balcony"
                                    Value={addModel.balcony === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, balcony: old.balcony === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check2"
                                    Class="m-1"
                                    Label="gym"
                                    Value={addModel.gym === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, gym: old.gym === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check3"
                                    Class="m-1"
                                    Label="cinema"
                                    Value={addModel.cinema === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, cinema: old.cinema === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check4"
                                    Class="m-1"
                                    Label="livingroom"
                                    Value={addModel.living_room === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, living_room: old.living_room === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check5"
                                    Class="m-1"
                                    Label="lift"
                                    Value={addModel.lift === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, lift: old.lift === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check6"
                                    Class="m-1"
                                    Label="parking"
                                    Value={addModel.parking === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, parking: old.parking === 1 ? 0 : 1}));
                                    }}
                                />

                                <Checkbox
                                    Id="check7"
                                    Class="m-1"
                                    Label="storage"
                                    Value={addModel.storage === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, storage: old.storage === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check8"
                                    Class="m-1"
                                    Label="conference"
                                    Value={addModel.conference === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, conference: old.conference === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check9"
                                    Class="m-1"
                                    Label="swimmingpool"
                                    Value={addModel.swimming_poll === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({
                                            ...old,
                                            swimming_poll: old.swimming_poll === 1 ? 0 : 1,
                                        }));
                                    }}
                                />
                                <Checkbox
                                    Id="check9"
                                    Class="m-1"
                                    Label="maidroom"
                                    Value={addModel.maid_room === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, maid_room: old.maid_room === 1 ? 0 : 1}));
                                    }}
                                />
                                <Checkbox
                                    Id="check10"
                                    Class="m-1"
                                    Label="sports"
                                    Value={addModel.sports === 1}
                                    OnChange={() => {
                                        setAddModel((old) => ({...old, sports: old.sports === 1 ? 0 : 1}));
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
                                            Value={addModel.bedrooms}
                                            OnChange={(bedrooms) => setAddModel((old) => ({...old, bedrooms}))}
                                        />
                                    ) : (
                                        <Button
                                            key={index}
                                            Class={`mx-1 col-auto rounded-4 shadow-sm px-3 ${
                                                addModel.bedrooms !== data_choice ? " btn-style-disabeld " : ""
                                            }`}
                                            Variant="primary"
                                            Label={data_choice}
                                            OnClick={() => {
                                                setAddModel((old) => ({...old, bedrooms: data_choice}));
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
                                            Value={addModel.baths}
                                            OnChange={(baths) => setAddModel((old) => ({...old, baths}))}
                                        />
                                    ) : (
                                        <Button
                                            key={index}
                                            Class={`mx-1 col-auto rounded-4 px-3 ${
                                                addModel.baths !== data_choice ? " btn-style-disabeld " : ""
                                            }`}
                                            Variant="primary"
                                            Label={data_choice}
                                            OnClick={() => {
                                                setAddModel((old) => ({...old, baths: data_choice}));
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
                                    Value={addModel.area}
                                    OnChange={(area) => setAddModel((old) => ({...old, area}))}
                                />
                            </Row>

                            <Row className="py-3">
                                <h6 className="my-2">{app.translate("areaunit")}</h6>
                                {data.UNIT_CHOICES.map((unit_choice, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            Class={`m-1 col-auto rounded-4 px-3 ${
                                                addModel.areaunit !== unit_choice ? " btn-style-disabeld " : ""
                                            }`}
                                            Variant="primary"
                                            Label={unit_choice}
                                            OnClick={() => {
                                                setAddModel((old) => ({...old, areaunit: unit_choice}));
                                            }}
                                        />
                                    );
                                })}
                            </Row>
                            <Row>
                                <Col>
                                    <PhoneInput
                                        Class="w-100"
                                        Value={addModel.phone}
                                        OnChange={(phone) => {
                                            setAddModel((old) => ({...old, phone}));
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="my-3 py-2">
                                <RichTextArea
                                    Label="description"
                                    Value={addModel.description}
                                    OnChange={(description) => setAddModel((old) => ({...old, description}))}
                                />
                            </Row>

                            <Row xs={1} md={3} className="my-2 py-2">
                                <Countries
                                    LabelClass=" pb-1"
                                    Value={addModel.country}
                                    OnChange={(country) => setAddModel((old) => ({...old, country}))}
                                    OnLoad={(countries) =>
                                        countries &&
                                        countries.length > 0 &&
                                        setAddModel((old) => ({...old, country: countries[0].id}))
                                    }
                                />
                                <States
                                    LabelClass=" pb-1"
                                    Value={addModel.state}
                                    CountryId={addModel.country}
                                    OnChange={(state) => setAddModel((old) => ({...old, state}))}
                                    OnLoad={(states) =>
                                        states &&
                                        states.length > 0 &&
                                        setAddModel((old) => ({...old, state: states[0].id}))
                                    }
                                    Disabled={addModel.country <= 0}
                                />
                                <Cities
                                    LabelClass=" pb-1"
                                    Value={addModel.city}
                                    StateId={addModel.state}
                                    OnChange={(city) => setAddModel((old) => ({...old, city}))}
                                    OnLoad={(cities) =>
                                        cities &&
                                        cities.length > 0 &&
                                        setAddModel((old) => ({...old, city: cities[0].id}))
                                    }
                                    Disabled={addModel.state <= 0}
                                />
                            </Row>

                            <Row className="my-2">
                                <Input
                                    WithFalseFeedback
                                    WithTrueFeedback
                                    Required
                                    Label="address"
                                    Placeholder="enteraddress"
                                    Value={addModel.address}
                                    OnChange={(address) => setAddModel((old) => ({...old, address}))}
                                />
                            </Row>
                            <Row md={2} className="my-2">
                                <Input
                                    Label="latitude"
                                    Placeholder="00.00"
                                    Value={addModel.latitude}
                                    OnChange={(latitude) => setAddModel((old) => ({...old, latitude}))}
                                />
                                <Input
                                    Label="longitude"
                                    Placeholder="00.00"
                                    Value={addModel.longitude}
                                    OnChange={(longitude) => setAddModel((old) => ({...old, longitude}))}
                                />
                            </Row>
                            <Row className="my-2">
                                <GoogleMap />
                            </Row>
                            <Row className="my-3 justify-content-center">
                                <RBButton
                                    variant="primary col-auto px-5 mx-2"
                                    size="md"
                                    onClick={Publish}
                                    type="submit"
                                >
                                    {app.translate("publish")}
                                </RBButton>
                            </Row>
                        </Form>
                    </>
                ) : // ) : props.control.Step === 5 ? (

                null}
                {/* <Row className="my-3 justify-content-center">
                    <Button
                        Disabled={props.control.selectedCategory === ""}
                        Variant="primary col-auto px-5 mx-2"
                        Size="md"
                        OnClick={props.changeControle({...props.control, Step: props.control.Step + 1})}
                        Label="back"
                    />
                    {props.control.Step < 5 ? (
                        <Button
                            Disabled={props.control.selectedCategory === ""}
                            Variant="primary col-auto px-5 mx-2"
                            Size="md"
                            OnClick={props.changeControle({...props.control, Step: props.control.Step + 1})}
                            Label="next"
                        />
                    ) : (
                        <Button
                            Disabled={props.control.selectedCategory === ""}
                            Variant="primary col-auto px-5 mx-2"
                            Size="md"
                            OnClick={Publish}
                            Label="publish"
                        />
                    )}
                </Row> */}
            </div>
        </>
    );
}
