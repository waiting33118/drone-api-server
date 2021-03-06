# Error Code

| code | service | description |
|:-:|:-:|-|
|600| auth/signUp | Email,Name,Password are required!|
|601| auth/signUp | Password must longer than 8 characters!|
|602| auth/signUp | Email exsit!|
|700| auth/signIn | Email, Password are required! |
|701| auth/signIn | User unregisted! |
|702| auth/signIn | Wrong password! |
|703| middleware/checkAuth | Access token missing! |
|704| middleware/checkAuth | Access token Expired! |
|705| middleware/checkAuth | Access Token Error! |
|706| auth/refreshToken | Refresh token missing! |
|707| auth/refreshToken | Refresh Token Expired! |
|708| auth/refreshToken | Refresh Token Error! |