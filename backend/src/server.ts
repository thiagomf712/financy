import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { buildContext } from './graphql/context/index';
import { AuthResolver } from './resolvers/auth.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { TransactionResolver } from './resolvers/transaction.resolver';
import { UserResolver } from './resolvers/user.resolver';

async function bootstrap() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      CategoryResolver,
      TransactionResolver,
      UserResolver,
    ],
    validate: false,
    emitSchemaFile: './schema.graphql',
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    })
  );

  app.listen({ port: 3333 }, () => {
    console.log(`Servidor iniciado na porta 3333!`);
  });
}

bootstrap();
