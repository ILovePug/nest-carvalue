# create new nest app
nest new <project name>

# create a new module. 
# ex. `nest g module users` create file `users/users.module.ts`
nest g module <module name>

# create a new controller
# ex. `nest g controller users` create file `users/users.controller.ts`
nest g controller <controller name>

# create a new service
# ex. `nest g service users` create file `users/users.service.ts`
nest g service <service name>


# Migrations
# generate a new migration. -n (name), -o (outputJs)
# gotcha. it compares the schema with the compiled js inside dist folder. make sure compile first before create the migration
# ex. `npm run typeorm migration:generate -- -n itial-schema -o`
npm run typeorm migration:generate -- -n <name> -o

# run and apply migration
npm run typeorm migration:run


# production commands to run - set environment variables
1. heroku config:set COOKIE_KEY=2fergtrfdw
2. heroku config:set NOD_ENV=production
