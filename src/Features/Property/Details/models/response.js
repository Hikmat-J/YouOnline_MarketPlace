const Model = {
    proprety: {
        id: 0,
        uid: {
            id: 0,
            fullname: "",
            profile_image: "",
        },
        title: "",
        prop_type: "",
        category: {
            id: 0,
            name: "",
        },
        subcategory: {
            id: 0,
            name: "",
        },
        description: "",
        price: "",
        currency: "",
        area: "",
        areaunit: "",
        bedrooms: "",
        baths: "",
        furnished: false,
        living_room: false,
        balcony: false,
        lift: false,
        parking: false,
        storage: false,
        gym: false,
        cinema: false,
        conference: false,
        swimming_poll: false,
        maid_room: false,
        sports: false,
        country: {
            id: 0,
            country: "",
        },
        state: {
            id: 0,
            state: "",
        },
        city: {
            id: 0,
            city: "",
        },
        address: "",
        linkurl: "",
        proprety_image: [
            {
                id: 0,
                proprety_image: "",
                is_main: false,
                proprety: 0,
            },
        ],
        longitude: "",
        latitude: "",
        created_at: "",
        is_active: false,
    },
};

export default Model;
