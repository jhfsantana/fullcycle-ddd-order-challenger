import EventHandlerInterface from "../../@share/event-handler.interface";
import eventInterface from "../../@share/event.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler 
implements EventHandlerInterface<ProductCreatedEvent> {
    
    handle(event: ProductCreatedEvent): void {    
        console.log(`Sending email ..... ${JSON.stringify(event.eventData)}`)
    }
}