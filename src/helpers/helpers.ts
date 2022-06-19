import { INewUser } from "../types/types";

const hobbiesChecker = (hobbies: any[]): boolean => {
    return hobbies.every(hobbie => typeof hobbie === 'string');
};

const dataChecker = (data: any): boolean => {
    if(
        data.username && typeof data.username === 'string' && 
        data.age && typeof data.age === 'number' &&
        Array.isArray(data.hobbies) && hobbiesChecker(data.hobbies)
        ) {
            return true;
        }

    return false;
};

export { dataChecker };
