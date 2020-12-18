# Node-Express BackEnd Boilerplate using MySQL and TypeScript

1. Express API
2. Error handling
3. Middlewares
4. MySQL with TypeORM
5. JWT authentication
6. File uploading with multer

See [changelog](https://github.com/kmpizmad/node-express-mysql-typescript-boilerplate/blob/main/CHANGELOG.md) for the latest updates.

### EndPoints

`/api`<br />
`/api/users`<br />
`/api/users/:id`

`/auth/register`<br />
`/auth/confirm/:token` - JWT token required to create entity in the database

`/logs`<br />
`/logs/:day` - format eg. _/logs/2020-12-15_

### Middlewares

**`isAuthenticated`**: Checks if the user is authenticated. Throws `401 - Unauthenticated` if not.

**`isEmail`**: Checks if the `email` field contains a valid email format.

**`isExists`**: Check if an `entity` does exist on a model. Throws corresponding error if not.

> _Example: `router.route('/').post(isExistsOn(User, true), isEmail, registration.post!)`_<br />
> _**True** means that the error should be **thrown when it exists**. `User` is the model / entity._

**`isPasswordChange`**: Checks if the user posted a different password. Useful when `Change password` action happens on the frontend.

### TODO

1. [ ] Redis
2. [ ] Login
3. [ ] Tests
