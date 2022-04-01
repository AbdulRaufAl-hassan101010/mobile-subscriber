# Sample product

### [mobile subscriber](https://rauf-mobile-subscriber.herokuapp.com)

&nbsp;
&nbsp;

# Requirements

- ### Node js v14.17.0+

- ### Mongodb 6.2.8

&nbsp;
&nbsp;

# Installations

Run this to install the packages(node_module)

```nodejs
npm install
```

cd into frontend and run

```nodejs
npm install
```

&nbsp;
&nbsp;

# Commands

Run npm run dev to start react and server

```npm
npm run dev
```

&nbsp;
&nbsp;

Run only server

```npm
npm run server
```

&nbsp;
&nbsp;

Run only react(client)

```npm
npm run client
```

&nbsp;
&nbsp;

# ENVIROMENT VARIABLE

- ### [MONGODB_URL -](https://cloud.mongodb.com/v2/60ce1e33d97bfe6c56d1bcd9#clusters/connect?clusterId=Cluster0) You require mongodb url to connect to the remote database or you can connect locally.

```
MONGODB_URL = mongodb+srv://AbdulRaufAlhassan:B533Gate@cluster0.dtynu.mongodb.net/mobileSubscriber?retryWrites=true&w=majority
```

&nbsp;
&nbsp;

- ### [GOOGLE SIGN IN ID](https://console.cloud.google.com/apis/credentials?project=mobile-345411) You require mongodb url to connect to the remote database or you can connect locally.

```
CLIENT_ID = YOUR_CLIENT_ID.apps.googleusercontent.com
```

&nbsp;
&nbsp;

# USER ROUTES

Get users

```javascript
/api/users
```

&nbsp;
&nbsp;

Get user by ID

```javascript
/api/users/:id
```

&nbsp;
&nbsp;

Update user

```javascript
/api/users/:id
```

&nbsp;
&nbsp;

Delete user

```javascript
/api/users/:id
```

&nbsp;
&nbsp;

# OWNER ROUTES

Get owners

```javascript
/api/owners
```

&nbsp;
&nbsp;

Get owner by ID

```javascript
/api/owners/:id
```

&nbsp;
&nbsp;

Update owner

```javascript
/api/owners/:id
```

&nbsp;
&nbsp;

Delete owner

```javascript
/api/owners/:id
```

&nbsp;
&nbsp;

# PHONE ROUTES

Get phone

```javascript
/api/hones
```

&nbsp;
&nbsp;

Get phones by ID

```javascript
/api/phones/:id
```

&nbsp;
&nbsp;

Update phone

```javascript
/api/phone/:id
```

&nbsp;
&nbsp;

Delete phone

```javascript
/api/phone/:id
```
