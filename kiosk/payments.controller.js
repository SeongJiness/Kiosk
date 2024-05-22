// read-only
import { confirmPayment as confirmPaymentService } from "./payments.service.js";

async function confirmPayment(req, res, next) {
  try {
    const confirmResponse = await confirmPaymentService(req.query);
    return res.json({ data: confirmResponse });
  } catch (error) {
    next(error); // 에러 처리를 위해 next 함수를 사용하여 다음 미들웨어로 전달
  }
}

export { confirmPayment };
