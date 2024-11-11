import { INestApplication } from "@nestjs/common";
import OrdersMock from "@datasource/typeorm/seed/seed-tables/order.seed";
import OrderStatusMock from "@datasource/typeorm/seed/seed-tables/order-status.seed";
import ProductsMock from "@datasource/typeorm/seed/seed-tables/product.seed";
import OrderStatusRepository from "../repositories/order-status.repository";
import OrderRepository from "../repositories/order.repository";
import ProductRepository from "../repositories/product.repository";
import PaymentStatusRepository from "../repositories/payment-status.repository";
import PaymentStatusMock from "./seed-tables/payment-status.seed";

export default async function MockTables(app: INestApplication<any>, enableMockTables: boolean) {
  await HandleDomainTablesData(app);
  if (enableMockTables) {
    await HandleExtraTablesData(app);
  }
}

async function HandleDomainTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, OrderStatusRepository, OrderStatusMock);
  await mockTableHandler(app, PaymentStatusRepository, PaymentStatusMock);
}

async function HandleExtraTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, ProductRepository, ProductsMock);
  await mockTableHandler(app, OrderRepository, OrdersMock);
}

async function mockTableHandler(app: INestApplication<any>, gateway: any, mockList) {
  const gatewayInstance: typeof gateway = app.get<typeof gateway>(gateway);
  await gatewayInstance.findAll().then(orderStatusList => {
    const orderStatusString = JSON.stringify(orderStatusList.map(x => x.id))
    mockList.forEach(mock => {
      if (!orderStatusString.includes(mock.id.toString())) {
        { gatewayInstance.insert(mock) }
      }
    })
  })
}