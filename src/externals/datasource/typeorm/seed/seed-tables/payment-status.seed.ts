import OrderStatusEnum from "core/enums/order-status.enum";
import PaymentStatusModel  from "@models/payment/payment-status.model";
import PaymentStatusEnum from "@enums/payment-status.enum";

const PaymentStatusMock: PaymentStatusModel[] = [
    new PaymentStatusModel({
        id: PaymentStatusEnum.PENDING,
        name: "Pendente",
        description: "O pagamento ainda não foi criado no provedor",
    }),
    new PaymentStatusModel({
        id: PaymentStatusEnum.CREATED,
        name: "Criado",
        description: "Aguardando pagamento.",
    }),
    new PaymentStatusModel({
        id: PaymentStatusEnum.APPROVED,
        name: "Aprovado",
        description: "O pagamento foi aprovado.",
    }),
    new PaymentStatusModel({
        id: PaymentStatusEnum.REJECTED,
        name: "Rejeitado",
        description: "O pagamento foi rejeitado.",
    })
]

export default PaymentStatusMock;