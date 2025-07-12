import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // return this.login({email, password});
                return userAccount;
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("appwrite service :: createAccount :: error", error);

        }

    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("appwrite service :: Login :: error", error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession()
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
        }
    }


    async getCurrentUser(){
        try {
            this.account.get()

        } catch (error) {
            console.log("appwrite service :: getCurrentUser :: error", error);

        }
    }


}

const authService = new AuthService

export default authService
