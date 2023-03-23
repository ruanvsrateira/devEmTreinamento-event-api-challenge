import { UserEntity } from "../../user/user.entity";
import { EventEntity } from "../../event/event.entity";
import { SubscriptionEntity } from "../../subscription/subscription.entity";

export class TestUtil {
    static giveMeAValidEvent(): EventEntity {
        const event = new EventEntity();
        
        event.name = "Event test 1";
        event.aditionalInformation = "Aditional Information for event test 1";
        event.createdAt = new Date()
        event.updatedAt = new Date()
        event.participantsLimit = 10;
        event.id = "1"
        event.startDateRegistration  = new Date("21 oct 1999")
        event.endDateRegistration = new Date("22 oct 2050")
        event.startDate = new Date("23 oct 2050")
        event.link = "https://event.com"

        return event;
    }

    static giveMeInvalidEventForDate(): EventEntity {
        const event = new EventEntity();
        
        event.name = "Event test 1";
        event.aditionalInformation = "Aditional Information for event test 1";
        event.createdAt = new Date()
        event.updatedAt = new Date()
        event.participantsLimit = 10;
        event.id = "1"
        event.startDateRegistration  = new Date("21 oct 2050")
        event.endDateRegistration = new Date("22 oct 2050")
        event.startDate = new Date("23 oct 2050")
        event.link = "https://event.com"

        return event;
    }

    static giveMeAValidUser(): UserEntity {
        const user = new UserEntity()

        user.name = "Test user";
        user.email = "TestUser@Gmail.com"
        user.password = "123testando",
        user.createdAt = new Date()
        user.updatedAt = new Date()

        return user;
    }

    static giveMeAValidSubscription(): SubscriptionEntity {
        const subscription = new SubscriptionEntity()
        subscription.userId = "1"
        subscription.eventId = "2"
        subscription.subscriptionId = "123"
        subscription.subscriptionDate = new Date()

        return subscription;
    }

}