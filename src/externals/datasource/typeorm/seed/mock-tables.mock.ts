import { INestApplication } from "@nestjs/common";
import ProductsMock from "../../../datasource/typeorm/seed/seed-tables/product.seed";
import ProductRepository from "../repositories/product.repository";

export default async function MockTables(app: INestApplication<any>, enableMockTables: boolean) {
  if (enableMockTables) {
    await HandleExtraTablesData(app);
  }
}

async function HandleExtraTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, ProductRepository, ProductsMock);
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
