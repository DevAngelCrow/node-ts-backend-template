import { Gender } from "../../entities";
import { GenderId } from "../../value-object";

export interface GenderRepository{
    create(address: Gender) : Promise<void>;
    update(address: Gender) : Promise<void>;
    getAll() : Promise<Gender[]>;
    getOneById(id: GenderId) : Promise<Gender | null>;
    delete(id: GenderId) : Promise<void>;
}