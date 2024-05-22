// read-only
import { Router } from "express";
import { confirmPayment } from "./payments.controller.js"; // 컨트롤러 모듈 경로와 확장자 명시

const router = Router();

router.route("/confirm").post(confirmPayment);

export default router;
