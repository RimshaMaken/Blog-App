import conf from "../conf/conf"
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
   client = new Client();
   databases;
   bucket;

    constructor(){
        this.client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);  
        this.bucket = new Storage(this.client)  
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                   title,
                   content,
                   featuredImage,
                   status,
                   userId
                }
            )
        } catch (error) {
            throw error;
        }

    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
             console.log("Appwrite service :: getPosts :: error", error);
             return false;
        }
    }

    //file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBuckketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
          await this.bucket.deleteFile(
            conf.appwriteBuckketId,
            fileId
          )
          return true;
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileId){
        return   this.bucket.getFileView(
            conf.appwriteBuckketId,
            fileId
        )
    }
}


const service = new Service()
export default service