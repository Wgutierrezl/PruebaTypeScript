"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetUp = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerSetUp = (app) => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API Usuarios",
                version: "1.0.0",
                description: "Documentación de la API con control de roles",
            },
            servers: [
                {
                    url: process.env.URL_SWAGGER || "http://localhost:3000",
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // rutas donde están tus endpoints
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.swaggerSetUp = swaggerSetUp;
//# sourceMappingURL=config-swagger.js.map