 BFHL REST API

A simple REST API that processes an input array and returns:

- Status (`is_success`)
- User ID (format: `full_name_ddmmyyyy`)
- Email ID
- College Roll Number
- Even numbers
- Odd numbers
- Alphabets (converted to uppercase)
- Special characters
- Sum of all numbers
- Concatenated string of all alphabets (reverse order, alternating caps)



## Example Endpoint

**POST** `/bfhl`  
Base URL (Render): `https://bfhl-api-zn0h.onrender.com/bfhl`

### Request
```json
{
  "data": ["a","1","334","4","R","$"]
}
