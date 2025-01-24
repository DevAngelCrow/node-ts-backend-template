import { Router } from "express";

export interface ServerOptions{
    port: number;
    routes: Router;
    public_path?: string;
}