import { Or } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";
import { Order } from "@prisma/client";


interface OrderRequest{
    order_id: string
}

class RemoveOrderService{
    async execute({order_id}: OrderRequest){
const order = await prismaClient.order.delete({
    where: {
        id: order_id
    }
})

return order;

    }
}

export {RemoveOrderService}