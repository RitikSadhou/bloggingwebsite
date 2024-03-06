const conf={
    appwriteUrl:String(import.meta.env.VITE_APP_APPWRITE_URL="https://cloud.appwrite.io/v1"),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID="65d64b02426e0a19a5c2"),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID="65d64bec0a058c3eda51"),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID="65d64c17c3fb40a0d12a"),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID="65d64e650351ff7b0e14"),
}


export default conf