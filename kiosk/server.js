import express from "express";
import cors from "cors";
import router from "./payments.router.js";
import { createServer } from "http";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// "/sandbox-dev/api/v1/payments" 경로에 대한 라우터 사용
app.use("/sandbox-dev/api/v1/payments", router);

// "/sandbox-dev/api/v1/payments/confirm" 경로에 대한 POST 요청 핸들러 추가
app.post("/sandbox-dev/api/v1/payments/confirm", (req, res) => {
  // 이 부분에 결제 승인 로직을 구현하세요.
  // 요청 바디에서 필요한 데이터를 추출하고, 결제 승인을 처리한 후 응답을 보냅니다.
});

app.get("/api", (req, res) => {
  res.send({ message: "hello" });
});

server.listen(8080, () => {
  console.log("server is running on 8080");
});
