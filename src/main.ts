import { NestFactory } from "@nestjs/core"
import AppModule from "./app.module"
import { GrpcOptions, Transport } from "@nestjs/microservices"
import { join } from "path"
const bootstrap = async () => {
    const app = await NestFactory.createMicroservice<GrpcOptions>(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                maxReceiveMessageLength: 1024 * 1024 * 1024 * 5,
                url: "0.0.0.0:3004",
                package: ["read", "write"],
                protoPath: [
                    join("protos", "services", "read", "read.service.proto"),
                    join("protos", "services", "write", "write.service.proto")
                ]
            },
        },
    )
    await app.listen()
}
bootstrap()
