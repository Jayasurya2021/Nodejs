const API_URL = 'http://localhost:5000';

const runTest = async () => {
    try {
        console.log("1. Reporting a Problem (No Auth)...");
        const problemData = {
            title: "Test Problem No Auth",
            description: "Testing backend API without authentication",
            location: "Script Location No Auth",
            category: "water"
        };

        const reportRes = await fetch(`${API_URL}/api/problems/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(problemData)
        });

        console.log("Report Response Status:", reportRes.status);
        const reportData = await reportRes.json();
        console.log("Report Response Data:", reportData);

        console.log("2. Fetching Problems...");
        const fetchRes = await fetch(`${API_URL}/api/problems`);
        const problems = await fetchRes.json();
        console.log("Problems count:", problems.length);
        const myProblem = problems.find(p => p.title === problemData.title);
        if (myProblem) {
            console.log("Found reported problem:", myProblem);
        } else {
            console.error("Reported problem not found in list!");
        }

    } catch (error) {
        console.error("Test Failed:", error);
    }
};

runTest();
