import { Pool } from "pg";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());



export default pool;
