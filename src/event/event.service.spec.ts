import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TestUtil } from "../common/test/test.util";
import { EventEntity } from "./event.entity";
import { EventService } from "./event.service"

describe("Event Service", () => {
    let service: EventService;

    const mockRepository = {
        find: jest.fn(),
        save: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventService, {
                provide: getRepositoryToken(EventEntity),
                useValue: mockRepository,
            }],
        }).compile()
    
        service = module.get<EventService>(EventService)
    })

    it("Should be defined", async() => {
        expect(service).toBeDefined()
    })

    describe("Find all Events", () => {
        it("Should be return all events", async() => {
            const event = TestUtil.giveMeAValidEvent()
            mockRepository.find.mockReturnValue([event, event])
            const events = await service.findAll()

            expect(events).toHaveLength(2)
            expect(mockRepository.find).toHaveBeenCalledTimes(1)
        })
    })

    describe("Create new Event", () => {
        it("Should be return event created", async() => {
            const event = TestUtil.giveMeAValidEvent()
            mockRepository.save.mockReturnValue(event)
            const eventCreated = await service.create(event)

            expect(eventCreated).toMatchObject(event)
            expect(mockRepository.save).toHaveBeenCalledTimes(1)
        })
    })
})