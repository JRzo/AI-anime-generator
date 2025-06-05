
let OpenAI = require('openai')
module.exports ={
    genAI: async (req, res) =>{

        // Render page

        // The ai data will be here
        try{
            let value = req.body['userResponse']
        // Will eadd each values
        const openai = new OpenAI({
        apiKey: "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",
        });

        const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            {"role": "assistant", "content": "What animes should I watch if I have watched this anime's: " + value + "Limit them to 10. Provide actual images links that can be used (deep search) and a description of why should I watch the anime. Please only provide the results as a JSON file that can be used as JSON file. Just JSON style"},
        ],
        });

        completion.then(async (result) => {
            let response =  await result.choices[0].message.content
            res.render("genAI.ejs",{response:response})   
        });
        }
        catch(error){
            console.log(error)
        }
        
    }
}