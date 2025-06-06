import { CreateUserForm } from "../../form/create-user";
import { User } from "../../domain";

const createUser = async (form: CreateUserForm): Promise<boolean> => {
    const insertUser = async (user: User) => {
        console.log("insert successfully")
        return true;
    }

    const user = {
        name: form.name,
        age: form.age,
        phone: form.phone,
        email: form.email
    } as User;
    const result = await insertUser(user);
    if (!result){
        return false;
    }
    return true;
}

export { createUser };