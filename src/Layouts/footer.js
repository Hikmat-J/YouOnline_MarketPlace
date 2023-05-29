import React from "react";
import { Input } from "../Components";
import { Container } from "react-bootstrap";







export default function Footer() {
    const data = {
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        takeTour: ["Automotives", "Jobs", "Properties", "Classified"],
        OurCompany: ["About Us", "Blog", "Contact Us", "Privacy & Policy", "Terms & Conditions"],
        Subscribe: "Subscribe to get latest property, blog news from us",
    };
    return (
        <footer className=" bg-light py-5 mt-5  ">

        <Container className="">
            <div className="row pt-5 ">
                <div className="col-12 col-lg-4">
                    <h1 className="text-primary">YouOnline</h1>
                    <p>{data.introduction}</p>
                    <p>© 2022 . All rights reserved.</p>
                </div>

                <div className="col-12 col-md-3 mt-3 mt-md-0 col-lg-2">
                    <h4>Take a tour</h4>
                    {data.takeTour.map((item) => (
                        <h5>{item}</h5>
                    ))}
                </div>

                <div className="col-12 col-md-3 col-lg-2 mt-3 mt-md-0">
                    <h4>Our Company</h4>
                    {data.OurCompany.map((item) => (
                        <h5>{item}</h5>
                    ))}
                </div>

                <div className="col-12 col-md-6 col-lg-4 mt-3 mt-md-0">
                    <h5>Subscribe</h5>
                    <p>{data.Subscribe}</p>
                    <Input
                    Placeholder='Email Address'
                    />
                    </div>    
            </div>
        </Container>
        </footer>

    );
}
