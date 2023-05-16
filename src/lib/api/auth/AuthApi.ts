import {client} from "@/lib/api/instance";
import {RegisterFormFields} from "@/components/pages/register-page/components/register-form/types";

export class AuthApi {
    static async login(body: CredentialsDTO) {
        const {data} = await client.post(
            `/auth/login`,
            body
        );
        return data;
    }

    static async register(body: RegisterFormFields) {
        const {data} = await client.post(
            `/auth/register`,
            {
                first_name: body.firstName,
                last_name: body.lastName,
                email: body.email,
                gender: body.gender,
                password: body.password,
            }
        );
        return data;
    }
}