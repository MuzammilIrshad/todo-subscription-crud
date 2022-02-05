//const { PubSub } = require("graphql-subscriptions");
//const pubsub = require("./index.js")
import { Data } from '../model/models';
import {pubsub} from './index';

export  const resolvers = {
    Query: {
 
      allData:async()=>{
           const data = await Data.find();
              if(data){
                console.log(data)
                const {_id, name} = data;
           return data
              }
      },
      deletedData:async(_,{id})=>{
       const data = await Data.findByIdAndDelete(id)
       console.log(data)
       if(data){
         const {_id, name} = data;
         const delData = {id:String(_id),name} 
        //console.log(delData)
         pubsub.publish('TRIGGER_DEL_USER',{delData})
        return delData;
       }


      }
    },
    Mutation:{
          addData:async(_,{name})=>{
            const data = new Data({name})
            console.log(data);
            data.save()
            if(data){                     
               const {_id, name} = data;
               console.log(String(_id));
               const newData = {id:String(_id),name}
              pubsub.publish('TRIGGER_NEW_USER',{newData})
            return newData;
            }
          },
          editData:async(_,args)=>{
            console.log(args)
            const {id, name} = args;
             const updateData =  await Data.findOneAndUpdate({_id:id},{name:name},{new:true})
               console.log(updateData)
               if(updateData){                     
                
                  pubsub.publish('TRIGGER_UPDATE_USER',{updateData})
                  return updateData;
             
            }
          }
    },
    Subscription: {
      newData: {
          subscribe: () => pubsub.asyncIterator(['TRIGGER_NEW_USER'])
      },
      delData:{
        subscribe:()=>pubsub.asyncIterator(['TRIGGER_DEL_USER'])
      },
      updateData:{
        subscribe:()=>pubsub.asyncIterator(['TRIGGER_UPDATE_USER'])
      }
    }
  };
