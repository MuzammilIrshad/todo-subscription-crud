//import 'dotenv/config';
//const { createServer }= require("http");
import mongoose from 'mongoose';
import path from 'path';
import { createServer } from "http";
import express from 'express';
import { execute, subscribe } from "graphql";
import {ApolloServer} from 'apollo-server-express'
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {typeDefs, resolvers} from './Schema/index';
//import dbConnection from "./Config/Connection";
//const express = require("express");
/*const { execute, subscribe } =  require("graphql");
const { ApolloServer, gql } =  require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./Schema/index.js")
*/
const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

//app.use(cors());
if (process.env.NODE_ENV === "production") {
    app.use(express.static("todo-sub-app/build"));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "todo-sub-app","build","index.html"));
    });
  } else {
    app.use(express.static(path.join(__dirname, "todo-sub-app","public")));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "todo-sub-app","public","index.html"));
    });
  }
(async () => {
    
    await server.start();
    server.applyMiddleware({ app, path:"/graphql" });

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath }
    );
    mongoose.connect('mongodb://user:user123@cluster0-shard-00-00.arwzj.mongodb.net:27017,cluster0-shard-00-01.arwzj.mongodb.net:27017,cluster0-shard-00-02.arwzj.mongodb.net:27017/crud?ssl=true&replicaSet=atlas-f3wnz1-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser : true, useUnifiedTopology: true})
    .then(() =>{
    console.log("MongoDB Connected")
    return httpServer.listen(PORT, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
        );
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
        );
    });
    })
    .then((res) => {
    console.log(`Server running at ${res.url}`)
    })
    

})();
//dbConnection()
//app.use(express.static(path.join(__dirname, 'public')))
//app.use('/uploads', express.static('uploads'))

