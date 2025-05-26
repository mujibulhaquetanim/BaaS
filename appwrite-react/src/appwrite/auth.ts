import { Client, Account, ID } from 'appwrite';
import conf from '../conf/config';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}:{email: string, password: string, name: string}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // redirect to login
                return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;           
        }
    }

    async login({email, password}:{email: string, password: string}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            // delete all sessions
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async getUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        // if user is not logged in or session is expired or problem with appwrite
        return null;
    }
}

const authService = new AuthService();
export default authService;