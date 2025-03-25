# Deployment Link
http://paymentgateway.fun
# PaymentGateway
Steps to setup:
cd Backend
# to install all the dependencies
npm install
# to start the server at the port specified
node server.js 
# include a .env file which will have Stripe keys, AWS account keys, AWS region, and DynamoDb table name
nano .env
STRIPE_SECRET_KEY=<>
STRIPE_PUBLISHABLE_KEY=<>
AWS_ACCESS_KEY_ID=<>
AWS_SECRET_ACCESS_KEY=<>
AWS_REGION=<aws-region-code>
DYNAMO_DB_TABLE=<table-name>
