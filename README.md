# express-tutorial

## Deploy json file containing user data locally

```npx json-server --watch all-users.json```

## Deploy express app locally

```npx nodemon bin/www```

## Links

```localhost:8800/``` is the home page.

```http://localhost:8800/all_users``` displays the data in the web page.

```http://localhost:8800/users/all_users``` gives all users in json format.

```http://localhost:8800/users/user?id=1``` will give the user details of an individual user.

```http://localhost:8800/users/paginate?page=1&limit=3``` gives the paginated users.
