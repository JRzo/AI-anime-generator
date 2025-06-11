let OpenAI = require('openai')
module.exports ={
    // For the template
    aigenTemplate: (req, res) => {
        let topTenAnimes = [{
            // One
            name: "Dragon Ball Super",
            image: "https://img4.hulu.com/user/v3/artwork/0921b58c-bef9-4a4d-a677-03ec7745428c?base_image_bucket_name=image_manager&base_image=ed8eeea7-d6c6-4e2f-bb12-44770908f809&size=1200x630&format=webp",
            description: "In a peaceful period following the defeat of Kid Buu, Goku continues to attempt to maintain Earth's peace despite being forced by Chi-Chi to get a job as a radish farmer. Gohan and Videl are married while Krillin has become a police officer."
        },
        {
            // Two
            name: "Fullmetal Alchemist: Brotherhood",
            image: "https://www.japanpowered.com/media/images/fma-brotherhood-characters-scaled.jpg?w=640",
            description: "The story is about two brothers, trying to hold each other through numerous hardships. Underneath all these complicated themes; FMAB is a story about the bond between family members and the trust between friends. "
        },
        {
            // Three
            name: "Demon Slayer: Kimetsu no Yaiba",
            image: "https://demonslayer-anime.com/portal/assets/img/img_kv_2.jpg",
            description: " Tanjiro embarks on a journey to find a cure for Nezuko and avenge his family, facing various demons and learning to master the skills of a demon slayer. "
        }, {
            // Four
            name: "Hunter * Hunter",
            image: "https://upload.wikimedia.org/wikipedia/en/8/82/Hunter_%C3%97_Hunter_%282011%29.png",
            description: "A shōnen manga and anime series created by Yoshihiro Togashi that follows the adventures of Gon Freecss, a young boy who wants to become a Hunter, a licensed professional, to find his father, who left him at a young age."
        }, {
            // Five
            name: "Naruto: Shippuden",
            image: "https://m.media-amazon.com/images/M/MV5BNTk3MDA1ZjAtNTRhYS00YzNiLTgwOGEtYWRmYTQ3NjA0NTAwXkEyXkFqcGc@._V1_.jpg",
            description: "Naruto Uzumaki wants to be the best ninja in the land. He's done well so far, but with the looming danger posed by the mysterious Akatsuki organization, Naruto knows he must train harder than ever and leaves his village for intense exercises that will push him to his limits."
        }, {
            // Six
            name: "One Piece",
            image: "https://www.themarysue.com/wp-content/uploads/2023/12/One-Piece-anime.jpg",
            description: "One Piece is a Japanese anime series that follows the adventures of Monkey D. Luffy and his crew, the Straw Hat Pirates, as they journey to find the legendary treasure 'One Piece' and become the next Pirate King. "
        }, {
            // Seven
            name: "Death Note",
            image: "https://m.media-amazon.com/images/M/MV5BYTgyZDhmMTEtZDFhNi00MTc4LTg3NjUtYWJlNGE5Mzk2NzMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            description: "A genius high school student, Light Yagami, who discovers a supernatural notebook called a Death Note. The Death Note allows Light to kill anyone by writing their name in it while visualizing their face"
        }, {
            // Eight
            name: "Tokyo Ghoul",
            image: "https://m.media-amazon.com/images/M/MV5BZWI2NzZhMTItOTM3OS00NjcyLThmN2EtZGZjMjlhYWMwODMzXkEyXkFqcGc@._V1_.jpg",
            description: "A Tokyo college student is attacked by a ghoul, a superpowered human who feeds on human flesh. He survives, but has become part ghoul and becomes a fugitive on the run"
        },{
            // Nine
            name: "Haikyu!!",
            image: "https://media.pocketgamer.com/artwork/na-34885-1722923386/haikyu-touch-the-dream-ios-android-pre-reg-cover_jpg_820.jpg",
            description: "Follows Shoyo Hinata, a short-statured middle schooler who becomes obsessed with volleyball after seeing a national championship match. "
        },{
            // Ten
            name: "Attack on Titan",
            image: "https://www.bochcenter.org/assets/img/20241107_AOT_Web_Boston-1200-x-500-49fdadad73.jpg",
            description: "It follows a group of young people in a world where humanity is forced to live behind towering walls to protect themselves from giant, man-eating humanoids called Titans."
        }
        ]
        res.render("aigenTemplate.ejs", {template: topTenAnimes})
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
                    {"role": "assistant", "content": `I'm looking for anime recommendations similar to "${value}".
                    Please suggest up to 10 titles.
                    For each recommendation, include the anime's name, a *well-known and generally stable image URL* (e.g., from Wikipedia, official promotional sites, or major anime databases), and a brief description explaining why I should watch it.
                    Focus on providing URLs that are likely to be persistent.
                    Format your response as a JSON array.
                    Do not include any additional comments before or after the recommendations.`},
                ],
            });

            let responseString = completion.choices[0].message.content;

            // Parse the JSON string into a JavaScript object
            try {
                let responseObject = JSON.parse(responseString);
                console.log(responseObject)
                res.render('genAI.ejs', {response: responseObject}) // Now send the actual JavaScript object
            } catch (error) {
                console.error("Failed to parse JSON response from OpenAI:", error);
                res.status(500).json({ error: "Failed to process AI response" });
}
        }
        catch(error){
            console.error("Error in genAI:", error); // Use console.error for errors
            // You should also send an error response to the client
            res.status(500).render("error.ejs", { message: "An error occurred while fetching AI response." });
        }
    }
}