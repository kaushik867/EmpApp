export interface User{
    id: string;
    title: string;
    firstname: string;
    lastname: String;
    company: string;
    job: string;
    phone: {
        number: string;
    }
    email: {
        personal: string;
    }

}