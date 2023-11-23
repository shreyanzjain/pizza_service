## A microservices based backend for a pizza delivery service
### Microservices
1. User
    - Authentication (jwt, cookie)
    - Add to cart
    - Browse restaurants (in the same city, and online)
    - Browse restaurant menu
2. Restaurant 
    - Authentication (jwt, cookie)
    - Add item to the menu.
    - Update item in the menu.
    - Delete item from the menu.
    - Set restaurant status.
3. Admin
    - Add restaurant
    - Remove restaurant
### Requirements
1. Node.js v16.13.1 and above
2. Postgres 15

### Steps to get the backend running
1. Clone this git repository to your machine

2. Create a .env file with the following variables in the root of the cloned repository. Make sure to put your values in place of the placeholder values.

```bash
DATABASE_URL = "postgresql://your_username:your_password@localhost:5432/your_database_name?schema=public"
USER_SECRET_KEY = "YOUR_USER_SECRET_KEY"
ADMIN_SECRET_KEY = "YOUR_ADMIN_SECRET_KEY"
RESTAURANT_SECRET_KEY = "YOUR_RESTAURANT_SECRET_KEY" 
```

You can generate secret keys in this manner, [here](https://stackoverflow.com/questions/52996555/generate-a-sufficient-secret-for-jwt-nodejs-lambda).

3. Run the command
```bash
npm run build
```
This will build the project from source. You will be prompted to enter a migration name, you can add any name, I chose "0_init."

4. Now, run
```
npm run prod
```

If all goes well you should see this in your terminal.
```bash
[0] Admin. Listening on http://localhost:3001
[2] Restaurant. Listening on http://localhost:3003
[1] User. Listening on http://localhost:3002
```

5. You can find the documented apis as postman.json, you can import this file into your postman account.