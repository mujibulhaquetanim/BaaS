// import { Client, Account} from 'appwrite';
// import conf from '../conf/config';

// export const client = new Client();

// client
//     .setEndpoint(conf.appwriteUrl)
//     .setProject(conf.appwriteProjectId); 

// export const account = new Account(client);
// export { ID } from 'appwrite';

import { Client, Account, ID } from 'appwrite';
import conf from '../conf/config';

export class AuthService {
    client: Client;
    account: Account;
    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signup(email: string, password: string, name: string) {
        await this.account.create(ID.unique(), email, password, name);
    }

    async login(email: string, password: string) {
        await this.account.createEmailPasswordSession(email, password);
    }

    async logout() {
        await this.account.deleteSessions();
    }

    async get() {
        return this.account.get();
    }
}

const authService = new AuthService();
export default authService;