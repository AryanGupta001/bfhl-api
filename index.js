import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "john_doe";
const DOB = "17091999"; 
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

function alternateCaps(str) {
  return str
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is up and running",
    endpoints: ["/bfhl"]
  });
});
app.post("/bfhl", (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        is_success: false,
        message: "Invalid request body. Expecting JSON object."
      });
    }

    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        is_success: false,
        message: "Missing 'data' key in request."
      });
    }

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "'data' must be an array."
      });
    }

    if (data.length === 0) {
      return res.status(200).json({
        is_success: true,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = BigInt(0);

    data.forEach((item) => {
      if (typeof item !== "string") {
        special_characters.push(String(item));
        return;
      }

  
      if (/^-?\d+$/.test(item)) {
        let num = BigInt(item);  
        sum += num;

        if (num % BigInt(2) === BigInt(0)) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }

      } else if (/^[a-zA-Z]+$/.test(item)) {
    
        alphabets.push(item.toUpperCase());

      } else {
    
        special_characters.push(item);
      }
    });


    const concat_string = alternateCaps(
      alphabets.join("").split("").reverse().join("")
    );

    res.json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
