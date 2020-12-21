# Node-Express BackEnd Boilerplate using TypeORM and TypeScript

### Technologies

1. Express API
2. MySQL with TypeORM
3. Redis
4. JWT authentication
5. File upload with multer
6. Custom middlewares
7. Custom error handling

See [changelog](https://github.com/kmpizmad/node-express-mysql-typescript-boilerplate/blob/main/CHANGELOG.md) for the latest updates.

### Commands

`yarn git` - shorthand for `git add . && git commit -m"`<br />
`yarn migration` - shorthand for `typeorm migration:create -n`<br />
`yarn test` - run tests (use --coverage option to see more elaborated results)<br />
`yarn build` - builds the application to the `build` folder<br />
`yarn devStart` - starts the server in `development` mode<br />
`yarn start` - starts the server in `production` mode

### EndPoints

`/api`<br />
`/api/users`<br />
`/api/users/:id`

`/auth/login`<br />
`/auth/logout`<br />
`/auth/register`<br />
`/auth/confirm/:token` - JWT token required to create entity in the database

`/logs`<br />
`/logs/:day` - format eg. _/logs/2020-12-15_

### Middlewares

**`isAuthenticated:`** Checks if the user is authenticated. Throws `401 - Unauthenticated` if not.

**`isEmail:`** Checks if the `email` field contains a valid email format.

**`isExists:`** Check if an `entity` does exist on a model. Throws corresponding error if not.<br />
<u>**Example:**</u><br />
> _`router.route('/').post(isExistsOn(User, true), isEmail, registration.post!)`_<br />
> _**True** means that the error should be **thrown when it exists**. `User` is the model / entity._

**`isPasswordChange:`** Checks if the user posted a different password. Useful when `Change password` action happens on the frontend.

### TODO

1. [x] Redis
2. [ ] Tests
  - Unit tests for [`utils`](https://github.com/kmpizmad/node-express-typeorm-typescript-boilerplate/tree/main/src/utils)
  - Integration tests for [`api`](https://github.com/kmpizmad/node-express-typeorm-typescript-boilerplate/tree/main/src/routes/api)
