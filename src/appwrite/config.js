import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { AppwriteException } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;
   
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
     
  
    
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        const document = {
            title,
            content,
            featureimage: featuredImage,
            status,
            userid: userId,
        };
     
        console.log("Data before createPost/updatePost:", document);
        console.log("Content Type:", typeof content);
        
    
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                document
                
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
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
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
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
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
    
            if (post && post.featureimage) {
                // Check if featuredImage has a valid fileId before calling getFilePreview
                const previewUrl = await this.getFilePreview(post.featureimage);
                post.featureimagePreview = previewUrl; // Add a property for the preview URL
            }
    
            return post;
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;
        }
    }
    

   // ... (existing code)

async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    } catch (error) {
        if (error instanceof AppwriteException) {
            console.log("Appwrite service :: getPosts :: AppwriteException", error);
            console.log("Appwrite service :: getPosts :: AppwriteException Details", error.getMessage(), error.getCode());
        } else {
            console.log("Appwrite service :: getPosts :: error", error);
        }
        return false;
    }
}

// ... (existing code)


    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
    
}


const service = new Service()
export default service