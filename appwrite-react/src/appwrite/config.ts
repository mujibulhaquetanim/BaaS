import conf from "../conf/config";
import { Client, Databases, Query, Storage } from "appwrite";

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

    // interaction with specific database
    async createPost({title, slug, content, featuredImage, status}:{title: string, slug: string, content: string, featuredImage: string, status: string}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                slug,
                content,
                featuredImage,
                status,
            });
        } catch (error) {
            console.log(`Appwrite createPost error: ${error}`);
        }
    }

    async updatePost({title, slug, content, featuredImage, status, userId}:{title: string, slug: string, content: string, featuredImage: string, status: string, userId: string}) {
        try {
           return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            });
        } catch (error) {
            console.log(`Appwrite updatePost error: ${error}`);
        }
    }

    async deletePost(slug: string) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log(`Appwrite deletePost error: ${error}`);
            return false;
        }
    }

    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log(`Appwrite getPost error: ${error}`);
            // return null;
            return false;
        }
    }

    // query, for that indexes are needed, here get all posts with status active
    async getPosts() {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [Query.equal('status', 'active'), Query.limit(10)]);
        } catch (error) {
            console.log(`Appwrite getPosts error: ${error}`);
            return false;
        }
    }
}

const service = new Service();
export default service;