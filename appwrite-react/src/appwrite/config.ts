import conf from "../conf/config";
import { Client, Databases, Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    buckets;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.buckets = new Storage(this.client);
    }
}

const service = new Service();
export default service;