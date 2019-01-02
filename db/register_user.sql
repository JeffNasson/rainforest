INSERT INTO users(username,password,first_name,last_name,email,phone_number,zipcode,city)
VALUES($1,$2,$3,$4,$5,$6,$7,$8)

RETURNING *;