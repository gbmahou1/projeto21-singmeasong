import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { jest } from "@jest/globals";
import { recommendationService } from '../../src/services/recommendationsService';
import { faker } from '@faker-js/faker'

describe("/recomendations unit tests:", () => {
    beforeEach(clearAndResetMocks());


    describe("POST: unit tests /recommendations/:id/upvote AND /recommendations/:id/downvote", () => {
        it("should return status 404 when score+ with invalid ID", async() =>{
            jest.spyOn(recommendationRepository, "find").mockResolvedValue(null);

            try {
              const response = await recommendationService.getById(1)
            } catch (error) {
              expect(error.type).toEqual("not_found");
            }
        });

        it("should remove recommendation when score < -5", async () => {
            
            const recommendation = {
                id: 1,
                name: faker.lorem.words(3),
                youtubeLink: "https://www.youtube.com/watch?v=Ug-Jjp2sCj8&ab_channel=CarlosCassau",
                score: -7,
            };
        
            const findedRecommendationFind = jest
                .spyOn(recommendationRepository, "find")
                .mockResolvedValue(recommendation);
        
            const updatedRecommendation = jest
                .spyOn(recommendationRepository, "updateScore")
                .mockResolvedValue(recommendation);
        
            const removedRecommendation = jest
                .spyOn(recommendationRepository, "remove")
                .mockImplementation(() => null);
        
            await recommendationService.downvote(1);

            expect(removedRecommendation).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET: unit tests /recommendations/random", () => {
        it("should return status 404 when there is no recommendations", async () => {
            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

            try {
              await recommendationService.getRandom();
            } catch (error) {
              expect(error.type).toEqual("not_found");
            }
        });
    });
    describe("POST: unit tests /recommendations ", () => {
        it("should not be duplicated", async () => {
            const recommendation = {
                id: 1,
                name: faker.lorem.words(3),
                youtubeLink: "https://www.youtube.com/watch?v=Ug-Jjp2sCj8&ab_channel=CarlosCassau",
                score: -7,
            };;
        
            jest.spyOn(recommendationRepository, "findByName").mockResolvedValue(recommendation);

            try {
                await recommendationService.insert(recommendation)
            } catch (error) {
                    expect(error.message).toEqual("Recommendations names must be unique");
            }

        })

    })
});

function clearAndResetMocks(): jest.ProvidesHookCallback {
    return () => { jest.clearAllMocks(); jest.resetAllMocks(); };
}