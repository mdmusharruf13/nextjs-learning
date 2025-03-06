export const initialUserData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
};

export const userFormInputs = [
    {
        type: "text",
        name: "firstName",
        placeholder: 'Enter first name',
        label: "First Name"
    },
    {
        type: "text",
        name: "lastName",
        placeholder: 'Enter last name',
        label: "Last Name"
    },
    {
        type: "email",
        name: "email",
        placeholder: 'Enter your email',
        label: "Email"
    },
    {
        type: "text",
        name: "address",
        placeholder: 'Enter your address',
        label: "Address"
    }
];

export const initialModelInfo = {
    title: '',
    btnLabel: ''
};

export const MODEL_STATE = {
    ADD: {
        title: "Add New User",
        btnLabel: "Add User"
    },
    UPDATE: {
        title: "Update User",
        btnLabel: "Save Changes"
    }
}

export const initialSignInUserInfo = {
    userName: '',
    email: '',
    password: ''
};

export const initialSignInFormInputs = [
    {
        type: 'input',
        name: 'userName',
        placeholder: 'Enter user name',
        label: 'UserName'
    },
    {
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email',
        label: 'Email'
    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'Enter password',
        label: 'Password'
    }
]