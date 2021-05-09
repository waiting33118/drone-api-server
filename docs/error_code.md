# Error Code

| code | service | description |
|:-:|:-:|-|
|1000| auth/signUp | Email,Password,DroneId are required!|
|1001| auth/signUp | Password must above or include 8 characters!|
|1002| auth/signUp | Password and CheckPassword are not match!|
|1003| auth/signUp | Email registered, Please login or change a email!|
|1100| auth/signIn | Email and Password are required! |
|1101| auth/signIn | User not found! |
|1102| auth/signIn | Invalid password! |
|2001| middleware/verifyToken | Token Expired!(need renew token) |
|2002| middleware/verifyToken | Token Error! |
|3000| middleware/checkDuplicateLogin | User has already login at another device! |