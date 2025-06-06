import { CreateUserForm } from "../../form/create-user";
import { User } from "../../domain";

const createUser = async (form: CreateUserForm): Promise<User> => {
    return {
        id: '1',
        name: form.name,
        age: form.age,
        phone: form.phone,
        email: form.email,
    }
}

export { createUser };