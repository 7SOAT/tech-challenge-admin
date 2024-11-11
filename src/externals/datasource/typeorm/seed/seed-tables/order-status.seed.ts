import OrderStatusEnum from "core/enums/order-status.enum";
import OrderStatusModel  from "@models/order/order-status.model";

const OrderStatusMock: OrderStatusModel[] = [
    new OrderStatusModel({
        id: OrderStatusEnum.PENDING,
        name: "Pendente",
        description: "Aguardando confirmação do pagamento",
        priorityOrder: 4
    }),
    new OrderStatusModel({
        id: OrderStatusEnum.RECEPTED,
        name: "Recebido",
        description: "Pagamento confirmado! Aguardando preparação.",
        priorityOrder: 3
    }),
    new OrderStatusModel({
        id: OrderStatusEnum.IN_PREPARATION,
        name: "Em preparação",
        description: "O pedido está sendo preparado.",
        priorityOrder: 2
    }),
    new OrderStatusModel({
        id: OrderStatusEnum.READY,
        name: "Pronto",
        description: "O pedido já está pronto! Aguardando retirada.",
        priorityOrder: 1
    }),
    new OrderStatusModel({
        id: OrderStatusEnum.FINISHED,
        name: "Finalizado",
        description: "O pedido já foi entregue ao cliente!",
        priorityOrder: 5
    }),
    new OrderStatusModel({
        id: OrderStatusEnum.CANCELLED,
        name: "Cancelado",
        description: "O pedido foi cancelado",
        priorityOrder: 6
    })
]

export default OrderStatusMock;