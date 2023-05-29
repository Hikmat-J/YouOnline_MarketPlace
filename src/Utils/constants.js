// Site url
export const BASE_SITE_URL = "https://pythonaym.pythonanywhere.com";

// Frontend-API  url
export const BASE_FRONTEND_API_URL = `/api`;

export const IMAGES_URL = `${BASE_SITE_URL}/media/`;

export const BACK_COLORS_ID_LIST = {
    lightGreen: "#F2FCE4",
    lightOrange: "#FFF8D1",
    lightCyan: "#ECFFEC",
    lightRed: "#FEEFEA",
};

export const DATA_CHOICES = [("0", "0"), ("1", "1"), ("2", "2"), ("3", "3"), ("+", "+")];
export const TYPE_CHOICES = [("Rent", "Rent"), ("Sael", "Sael")];
export const UNIT_CHOICES = [
    ("Suqare Meter", "Suqare Meter"),
    ("Suqare Feet", "Suqare Feet"),
    ("Suqare Yard", "Suqare Yard"),
    ("Kanal", "Kanal"),
    ("Marla", "Marla"),
];

export const PRICE_RANGES = [
    {Key: {min: 0, max: 1000}, Value: "0 - 1000"},
    {Key: {min: 1000, max: 10000}, Value: "1000 - 10000"},
    {Key: {min: 10000, max: 50000}, Value: "10000 - 50000"},
    {Key: {min: 50000, max: 100000}, Value: "50000 - 100000"},
    {Key: {min: 100000, max: 500000}, Value: "100000 - 500000"},
    {Key: "", Value: "+500000"},
];

export const AREA_SPACES = [
    {Key: 100, Value: 100},
    {min: 500, Value: 500},
    {Key: 1000, Value: 1000},
    {Key: 2000, Value: 2000},
    {Key: 5000, Value: 5000},
];
