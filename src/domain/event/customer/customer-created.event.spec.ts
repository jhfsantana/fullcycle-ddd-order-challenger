import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@share/event-dispatcher";
import CustomerChangeAddressEvent from "./change-address/customer-change-address.event";
import CustomerCreatedEvent from "./created/customer-created.event";
import SendEmailWhenCustomerChangeAddressEvent from "./change-address/handler/envia-console-log-1.handler";
import EnviaConsoleLog1Handler from "./created/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./created/handler/envia-console-log-2.handler";

describe('Customer Event tests', () => {

    it('should register an event handler', () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length)
        .toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toEqual(eventHandler);
    });

    it('should unregister an event handler', () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length)
        .toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toEqual(eventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });

    it('should unregister all events handler', () => {
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"])
        .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length)
        .toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toEqual(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it('should notify all handlers when customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        
        const emailHandler = new EnviaConsoleLog1Handler();
        const queueHandler = new EnviaConsoleLog2Handler();

        const spyEmailHandler = jest.spyOn(emailHandler, "handle");
        const spyQueueHandler = jest.spyOn(queueHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", emailHandler);
        eventDispatcher.register("CustomerCreatedEvent", queueHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0])
        .toEqual(emailHandler);

        const customerCreatedEvent = new CustomerCreatedEvent("CustomerCreated");
        
        eventDispatcher.notify(customerCreatedEvent);
        
        expect(spyEmailHandler).toHaveBeenCalled();
        expect(spyQueueHandler).toHaveBeenCalled();
    });
});