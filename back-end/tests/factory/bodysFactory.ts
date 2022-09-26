import { CreateRecommendationData } from "../../src/services/recommendationsService.js";
import { faker } from "@faker-js/faker";

function recommendation() {
  const body: CreateRecommendationData = {
    name: faker.lorem.words(3),
    youtubeLink: "https://www.youtube.com/watch?v=gjit4OgRZFM",
  };

  return body;
}

export default {
    recommendation, 
}