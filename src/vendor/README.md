# Created anonymus functions for these modules, because of type issues in TypeScript.

Tried to fix it by installing the latest packages and earlier packages, but none of those seemed to work. In my other project, I have this exact setup and it doesn't give any type error so I tried to change version numbers to those modules version numbers, but still had this issue.

### Issue

_Example issue comes from `server.use(morgan('dev'))`_

```
No overload matches this call.
  The last overload gave the following error.
    Argument of type 'Handler<Request<never, never, never, never>, Response<never, number>>' is not assignable to parameter of type 'RequestHandlerParams<ParamsDictionary, any, any, ParsedQs>'.
      Type 'Handler<Request<never, never, never, never>, Response<never, number>>' is not assignable to type 'RequestHandler<ParamsDictionary, any, any, ParsedQs>'.
        Types of parameters 'req' and 'req' are incompatible.
          Type 'Request<ParamsDictionary, any, any, ParsedQs>' is not assignable to type 'Request<never, never, never, never>'.
            Type 'ParamsDictionary' is not assignable to type 'never'.
```

### Solution

Call signature eg.: `server.use((() => morgan('dev'))());`<br />
Instead, it uses `server.use(morgan())`