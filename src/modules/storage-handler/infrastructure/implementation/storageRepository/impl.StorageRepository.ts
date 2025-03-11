import { Readable } from "stream";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { MultimediaFile } from "../../../../../shared/domain/types";
import { StorageRepository } from "../../../domain/repositories/storage/StorageRepository";
import { PeopleImgPath } from "../../../../../shared/domain/domain-container/DomainContainer";
import googleAuth from "../../../../../shared/infrastructure/config/googleAuth";
import { google } from "googleapis";
import { envs } from "../../../../../shared/infrastructure/config/envs";
import fs from "fs";
import path from "path";

export class ImplStorageRepository implements StorageRepository {
  constructor(private readonly folder_id: string | undefined) {}
  async updload(multimedia: MultimediaFile): Promise<string> {
    try {
      if (this.folder_id) {
        const { buffer, originalname, mimetype } = multimedia;

        const folderId = [];
        folderId.push(envs.FOLDER_ID!);
        const authenticate = await googleAuth.getAuthClient();
        const stream = Readable.from(buffer);
        const serviceGoogleDrive = google.drive({
          version: "v3",
          auth: authenticate,
        });

        const requestBody = {
          name: originalname,
          parents: folderId,
        };

        const media = {
          mimetype: mimetype,
          body: stream,
        };

        const url_img = await serviceGoogleDrive.files.create({
          requestBody: requestBody,
          media,
          fields: "id",
        });

        const fileId = await url_img.data.id;
        await serviceGoogleDrive.permissions.create({
          fileId: fileId!,
          requestBody: {
            role: "reader",
            type: "anyone",
          },
        });

        const url_path_img = `https://drive.google.com/uc?id=${fileId}`;
        return url_path_img;
      } else {
        const filePath = path.join("storage/images", multimedia.originalname);
        fs.writeFile(filePath, multimedia.buffer, (error) => {
          if (error) {
            console.log(error)
            throw CustomError.internalServer("Error saving image file");
          } else {
            return filePath.toString();
          }
        });

        return filePath;
      }
    } catch (error) {
      console.log(error, "Error in request google drive");
      throw CustomError.internalServer("Error in request from google drive");
    }
  }
  uploadMultiple(multimedias: MultimediaFile[]): Promise<PeopleImgPath[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    try {
      if (this.folder_id) {
        const authenticate = await googleAuth.getAuthClient();
        const serviceGoogleDrive = google.drive({
          version: "v3",
          auth: authenticate,
        });

        const response = await serviceGoogleDrive.files.delete({
          fileId: id,
        });
      } else {
        console.log(id, 'id que viene')
        fs.access(id, fs.constants.F_OK, (error) => {
          if (error) {
            throw CustomError.internalServer("Error deleting image file");
          }
          fs.unlink(id, (unlinkError) => {
            if(unlinkError){
              throw CustomError.internalServer("Error deleting image file");
            }
          })
        });
      }
    } catch (error) {
      console.log(error, 'error')
      throw CustomError.internalServer("Error in request from google drive");
    }
    //throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<Buffer> {
    try {
      //if (this.folder_id) {
        const authenticate = await googleAuth.getAuthClient();
        const serviceGoogleDrive = google.drive({
          version: "v3",
          auth: authenticate,
        });
        const index: number = id.toString().indexOf("id=");
        let param: string = id;
        if (index !== -1) {
          param = id.substring(index + 3, id.toString().length);
        }
        const imgFile = await serviceGoogleDrive.files.get(
          { fileId: param, alt: "media" },
          { responseType: "stream" }
        );
        const streamValue: Buffer = await this.readStream(imgFile.data);
        return streamValue;
      //}else{
        // const archivoPdf = fs.access(id, fs.constants.F_OK, (error)=>{
        //   if(error){
        //     throw CustomError.internalServer("Error getting image");
        //   }
        // });
      //}

    } catch (error) {
      console.log(error, 'error')
      throw CustomError.internalServer("Error in request from google drive");
    }
  }

  private async readStream(stream: Readable): Promise<Buffer> {
    let data: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream
        .on("data", (chunk: Buffer) => {
          data.push(chunk);
        })
        .on("end", () => {
          const buffer = Buffer.concat(data);
          resolve(buffer);
        })
        .on("error", (err: Error) => {
          reject(err);
        });
    });
  }
}
