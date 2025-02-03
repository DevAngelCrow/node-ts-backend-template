import { Readable } from "stream";
import { CustomError, MultimediaFile, PeopleImgPath, StorageRepository } from "../../../domain";
import googleAuth from "../../config/googleAuth";
import { google } from "googleapis";
import { envs } from "../../config/envs";


export class ImplStorageRepository implements StorageRepository {
    async updload(multimedia: MultimediaFile): Promise<string> {
        try{
            const { buffer, originalname, mimetype } = multimedia;
            
            const folderId = [];
            folderId.push(envs.FOLDER_ID!);
            const authenticate = await googleAuth.getAuthClient();
            const stream = Readable.from(buffer);
            const serviceGoogleDrive = google.drive({version: 'v3', auth: authenticate});

            const requestBody = {
                name: originalname,
                parents: folderId,
            };

            const media = {
                mimetype: mimetype,
                body: stream,
            };

            const url_img = await  serviceGoogleDrive.files.create({
                requestBody: requestBody,
                media,
                fields: "id",
            });

            const fileId = await url_img.data.id;
            await serviceGoogleDrive.permissions.create({
                fileId: fileId!,
                requestBody: {
                    role: "reader",
                    type: "anyone"
                },
            });

            const url_path_img = `https://drive.google.com/uc?id=${fileId}`;
            return url_path_img;
        
            
        }catch(error){
            throw CustomError.internalServer("Error in request from google drive")
        }
        throw new Error("Method not implemented.");
    }
    uploadMultiple(multimedias: MultimediaFile[]): Promise<PeopleImgPath[]> {
        throw new Error("Method not implemented.");
    }
    
}