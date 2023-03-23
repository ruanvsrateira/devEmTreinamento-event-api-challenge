import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEntity } from '../event/event.entity';
import { TestUtil } from '../common/test/test.util';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

describe('User Service', () => {
    let service: SubscriptionService;
    const mockRepositorySubscription = {
        find: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
    };
    const mockRepositoryEvent = {
        findOneBy: jest.fn()
    }

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SubscriptionService,
                {
                    provide: getRepositoryToken(SubscriptionEntity),
                    useValue: mockRepositorySubscription,
                },
                {
                    provide: getRepositoryToken(EventEntity),
                    useValue: mockRepositoryEvent, 
                }
            ],
        }).compile();

        service = module.get<SubscriptionService>(SubscriptionService);
    });

    beforeEach(() => {
        mockRepositorySubscription.find.mockReset()
        mockRepositorySubscription.findOneBy.mockReset()
        mockRepositorySubscription.save.mockReset()

        mockRepositoryEvent.findOneBy.mockReset()
    })

    it('Should be defined', async () => {
        expect(service).toBeDefined();
    });

    describe("Find by id of user", () => {
        it("Should be return subscriptions for user", async() => {
            const subscription = TestUtil.giveMeAValidSubscription()
            mockRepositorySubscription.find.mockReturnValue([subscription, subscription])
            const subscriptionsFounded = await service.findByIdUser("1")

            expect(subscriptionsFounded).toMatchObject([subscription, subscription])
            expect(mockRepositorySubscription.find).toHaveBeenCalledTimes(1)
        })
    })

    describe("Find Subscription by id", () => {
        it("Should return one subscription", async() => {
            const subscription = TestUtil.giveMeAValidSubscription()
            mockRepositorySubscription.findOneBy.mockReturnValue(subscription)
            const subscriptionFounded = await service.findById("3")

            expect(subscriptionFounded).toMatchObject(subscription)
            expect(mockRepositorySubscription.findOneBy).toHaveBeenCalledTimes(1)
        })

        it("Should throw ne error not founded subscription by this id", async() => {
            mockRepositorySubscription.findOneBy.mockReturnValue(null)

            expect(service.findById("123")).rejects.toBeInstanceOf(NotFoundException)
            expect(mockRepositorySubscription.findOneBy).toHaveBeenCalledTimes(1)
        })
    })

    describe("Create new Subscription", () => {
        it("Should be return new subscription", async() => {
            const subscription = TestUtil.giveMeAValidSubscription()
            const event = TestUtil.giveMeAValidEvent()

            mockRepositoryEvent.findOneBy.mockReturnValue(event)
            mockRepositorySubscription.save.mockReturnValue(subscription)

            const subscriptionCreated = await service.create(subscription)

            expect(subscriptionCreated).toMatchObject(subscription)
            expect(mockRepositoryEvent.findOneBy).toHaveBeenCalledTimes(1)
            expect(mockRepositorySubscription.save).toHaveBeenCalledTimes(1)
        })
    })

    it("Should be throw new Error event not founded by this event id", async() => {
        const subscription = TestUtil.giveMeAValidSubscription();

        mockRepositoryEvent.findOneBy.mockReturnValue(null)
        mockRepositorySubscription.save.mockReturnValue(subscription);

        expect(service.create(subscription)).rejects.toBeInstanceOf(NotFoundException)
        expect(mockRepositoryEvent.findOneBy).toHaveBeenCalledTimes(1)
    })

    it("Should be throw new Error invalid date registration", async() => {
        const subscription = TestUtil.giveMeAValidSubscription();
        const event = TestUtil.giveMeInvalidEventForDate();

        mockRepositoryEvent.findOneBy.mockReturnValue(event);
        mockRepositorySubscription.save.mockReturnValue(subscription);

        expect(service.create(subscription)).rejects.toBeInstanceOf(BadRequestException)
    })
});
