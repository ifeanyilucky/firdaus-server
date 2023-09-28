import express from "express";
import { getCurrentTerm } from "../controllers/term.controller";

const router = express.Router();

router.route("/current-term").get(getCurrentTerm);
