from flask import Flask, request, jsonify
from flask_cors import CORS
from payments_router import payments_bp
from payments_service import confirm_payment_service  # 추가된 임포트

app = Flask(__name__)
CORS(app)

# "/sandbox-dev/api/v1/payments" 경로에 대한 블루프린트 사용
app.register_blueprint(payments_bp, url_prefix='/sandbox-dev/api/v1/payments')

@app.route('/sandbox-dev/api/v1/payments/confirm', methods=['POST'])
def confirm_payment():
    # 요청 바디에서 필요한 데이터를 추출
    data = request.get_json()
    payment_key = data.get("paymentKey")
    order_id = data.get("orderId")
    amount = data.get("amount")

    # 결제 승인 로직을 호출
    confirm_response = confirm_payment_service(payment_key, order_id, amount)

    # 응답을 반환
    return jsonify({'data': confirm_response})

@app.route('/api', methods=['GET'])
def hello_api():
    return jsonify({'message': 'hello'})

if __name__ == '__main__':
    app.run(port=8080, debug=True)