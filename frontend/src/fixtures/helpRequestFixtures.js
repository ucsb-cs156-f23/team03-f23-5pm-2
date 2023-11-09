const helpRequestFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "bradencastillo@ucsb.edu",
        "teamId": "5pm-2",
        "tableOrBreakoutRoom": "Table 4",
        "requestTime": "2023-11-03T00:00:00",
        "explanation": "Need help with debugging",
        "solved": false
    },
    threeRequests: [
        {
            "id": 1,
            "requesterEmail": "bradencastillo@ucsb.edu",
            "teamId": "5pm-2",
            "tableOrBreakoutRoom": "Table 4",
            "requestTime": "2023-11-03T00:00:00",
            "explanation": "Need help with debugging",
            "solved": false
        },
        {
            "id": 2,
            "requesterEmail": "joegaucho@ucsb.edu",
            "teamId": "6pm-3",
            "tableOrBreakoutRoom": "Table 8",
            "requestTime": "2023-11-04T00:00:00",
            "explanation": "Need help with downloading maven",
            "solved": false
        },
        {
            "id": 3,
            "requesterEmail": "jimstorke@ucsb.edu",
            "teamId": "7pm-1",
            "tableOrBreakoutRoom": "Breakout Room 3",
            "requestTime": "2023-11-05T00:00:00",
            "explanation": "Need help with interpreting error message",
            "solved": false
        }
    ]
};


export { helpRequestFixtures };