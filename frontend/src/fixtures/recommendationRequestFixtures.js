const recommendationRequestFixtures = {
    oneRecommendationRequest: {
        "id": 1,
        "requesterEmail": "student@ucsb.edu",
        "professorEmail": "professor@ucsb.edu",
        "explanation": "write me a rec thanks boss",
        "dateRequested": "2022-01-02T12:00:00",
        "dateNeeded": "2023-01-02T12:00:00",
        "done": true
    },
    threeRecommendationRequests: [
        {
            "id": 1,
            "requesterEmail": "student1@ucsb.edu",
            "professorEmail": "professor1@ucsb.edu",
            "explanation": "write me a rec thanks boss",
            "dateRequested": "2022-01-02T12:00:00",
            "dateNeeded": "2023-01-02T12:00:00",
            "done": true
        },
        {
            "id": 2,
            "requesterEmail": "student2@ucsb.edu",
            "professorEmail": "professor2@ucsb.edu",
            "explanation": "write me a rec thanks bro",
            "dateRequested": "2022-01-03T12:00:00",
            "dateNeeded": "2023-01-04T12:00:00",
            "done": true
        },
        {
            "id": 3,
            "requesterEmail": "student3@ucsb.edu",
            "professorEmail": "professor3@ucsb.edu",
            "explanation": "write me a rec thanks g",
            "dateRequested": "2022-01-05T12:00:00",
            "dateNeeded": "2023-01-06T12:00:00",
            "done": true
        }
    ]
};


export { recommendationRequestFixtures };