import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TestUtil } from "../common/test/test.util";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service"

describe("User Service", () => {

    let service: UserService;
    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        exist: jest.fn(),
    }

    beforeAll(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, {
                provide: getRepositoryToken(UserEntity),
                useValue: mockRepository,
            }],
        }).compile()

        service = module.get<UserService>(UserService)
    })

    beforeEach(() => {
        mockRepository.find.mockReset()
        mockRepository.findOne.mockReset()
        mockRepository.save.mockReset()
        mockRepository.exist.mockReset()
    })

    describe("Get all Users", () => {

        it("Should be return all users", async() => {
            const user = TestUtil.giveMeAValidUser()
            mockRepository.find.mockReturnValue([user, user])
            const users = await service.findAll()

            expect(users).toHaveLength(2)
            expect(mockRepository.find).toHaveBeenCalledTimes(1)
        })

    })

    describe("Get User By Id", () => {

        it("Should be found user by id", async() => {
            const user = TestUtil.giveMeAValidUser()
            mockRepository.findOne.mockReturnValue(user)
            const userFounded = await service.findById('1')
            
            expect(userFounded).toMatchObject(user)
        })

        it("Should be throw new error user not founded by this id", async() => {
            mockRepository.findOne.mockReturnValue(null)

            expect(service.findById('3')).rejects.toBeInstanceOf(NotFoundException)
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
        })
    })

    describe("Get User By E-mail", () => {
        
        it("Should be return user founded by id", async() => {
            const user = TestUtil.giveMeAValidUser();
            mockRepository.findOne.mockReturnValue(user);
            const userFounded = await service.findByEmail("TestUser@Gmail.com")

            expect(userFounded).toMatchObject(user)
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
        })

        it("Should throw new Error User not founded by this email", async() => {
            mockRepository.findOne.mockReturnValue(null)

            expect(service.findByEmail("email@errado")).rejects.toBeInstanceOf(NotFoundException)
            expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
        })

    })

    describe("Create new User", () => {

        it("Should be return new user created", async() => {
            const user = TestUtil.giveMeAValidUser()
            mockRepository.save.mockReturnValue(user)
            const userCreated = await service.create(user)

            expect(userCreated).toMatchObject(user)
            expect(mockRepository.save).toHaveBeenCalledTimes(1)
        })

        it("Should be throw new Error User by this email already registred", async() => {
            const user = TestUtil.giveMeAValidUser()
            mockRepository.exist.mockReturnValue(true)
            
            expect(service.create(user)).rejects.toBeInstanceOf(BadRequestException)
            expect(mockRepository.exist).toHaveBeenCalledTimes(1)
        })

    })
})