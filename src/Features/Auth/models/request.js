export const Type = "Object";
export const SignInModel = {
  Params: {},
  Body: {
    email: "",
    password: "",
  },
};

export const SignUpModel = {
  Params: {},
  Body: {
    fullname: "",
    email: "",
    password: "",
    password2: "",
    country: "",
    city: "",
    state: "",
    code: "",
    phone: "",
    type_user: -1,// 1 personal , 2 company
  },
};
