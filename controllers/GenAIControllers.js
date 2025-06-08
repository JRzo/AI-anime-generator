let OpenAI = require('openai')
module.exports ={
    // For the template
    aigenTemplate: (req, res) => {
        res.render("aigenTemplate.ejs")
    },
    genAI: async (req, res) =>{
        let value = req.body['userResponse']
        try{
            const openai = new OpenAI({
                apiKey: process.env.API_KEY,
            });

            const completion = await openai.chat.completions.create({ // Use await directly here
                model: "gpt-4o-mini",
                response_format: { type: "json_object" },
                // 'store: true' is not a valid parameter for chat completions. You might want to remove it.
                messages: [
                    {"role": "assistant", "content": "I'm looking for anime recommendations similar to " + value +"Please suggest up to 10 titles. For each recommendation, include the anime's name, an image URL, and a brief description explaining why I should watch it. Format your response as a JSON array like this: [ { \"name\": \"Anime Name\", \"image\": \"https://example.com/image.png\", \"description\": \"Why you should watch it.\" } ] Do not include any additional comments before or after the recommendations."},
                ],
            });

            let response = await completion.choices[0].message.content;

            res.render("genAI.ejs",{response:response}); // Only render after you have the response
        }
        catch(error){
            console.error("Error in genAI:", error); // Use console.error for errors
            // You should also send an error response to the client
            res.status(500).render("error.ejs", { message: "An error occurred while fetching AI response." });
        }
    }
}