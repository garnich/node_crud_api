import { IUser, INewUser } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

class Storage {
  public users: IUser[];

  constructor() {
    this.users = [];
  }

  async apiGetUsers(): Promise<IUser[]> {
    return this.users;
  }

  async apiCreateUser({ username, age, hobbies }: INewUser): Promise<IUser> {
    const user: IUser = {
      id: uuidv4(),
      username,
      age,
      hobbies,
    };

    this.users.push(user);

    return user;
  }

  async apiGetUserById(id: string): Promise<IUser | undefined> {
    return this.users.find((user: IUser) => user.id === id);
  }

  async apiDeleteUser(id: string): Promise<IUser[] | undefined> {
    const idx = this.users.findIndex(user => user.id === id);
    if(idx >= 0) {
      this.users = [...this.users.slice(0, idx), ...this.users.slice(idx + 1)];
      return this.users;
    }

    return undefined;
  }

  async apiUpdateUser(id: string, { username, age, hobbies }: INewUser): Promise<IUser | undefined> {
    const idx = this.users.findIndex(user => user.id === id);
    if(idx >= 0) {
      const oldItem = this.users[idx];
      const newItem = { id, username: username || oldItem.username, age: age || oldItem.age, hobbies: hobbies || oldItem.hobbies };
  
      this.users = [...this.users.slice(0, idx), newItem, ...this.users.slice(idx + 1)];
  
      return newItem;
    }
    
    return undefined;
  }
}

export default new Storage();
