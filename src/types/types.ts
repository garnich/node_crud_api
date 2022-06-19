interface IUser {
  id: string | undefined;
  username: string | undefined;
  age: number | string | undefined;
  hobbies: string[] | undefined;
}

interface INewUser {
  username: string | undefined;
  age: number | string | undefined;
  hobbies: string[] | undefined;
}

export { IUser, INewUser };
