# Fantasy Stock Exchange

Live App: https://fantasy-stock-exchange.jyin25.now.sh

Live Server: https://stark-falls-29621.herokuapp.com

Client Repo: https://github.com/jy-lr/FSE-Client



## About

Fantasy Stock Exchange is a stock trading app that allows users to learn the principles of trading stocks, all while having fun competing with friends.  


## Technologies Used:

Front-end: React, HTML/CSS, Javascript, Victory Graph

Back-end: Node.js, Express, PostgreSQL


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`


## POST api/users
```
[
  {
    "full_name": String,
    "user_name": String,
    "password": String
  }
]
```


## POST /api/login
```
[
  {
    "user_name": String,
    "password": String
  }
]
```

## GET api/group
```
[
  {
    "id": Number,
    "group_name": String
  }
]
```


## POST api/group
```
[
  {
    "group_name": String
  }
]
```


## Get /api/equity
```
[
  {
    "id": Number,
    "userid": Number,
    "stock_symbol": String,
    "num_of_shares": Number,
    "groupid": Number
  }
]
```


## Patch /api/equity
```
[
  {
    "id": Number,
    "num_of_shares": Number,
  }
]
```


## Post /api/equity
```
[
  {
    "userid": Number,
    "stock_symbol": String,
    "num_of_shares": Number,
    "groupid": Number
  }
]
```


## Delete /api/equity
```
[
  {
    "id": Number,
  }
]
```


## Get /api/equity/:groupid
```
[
  {
    "id": Number,
    "userid": Number,
    "stock_symbol": String,
    "num_of_shares": Number,
    "groupid": Number
  }
]
```


## Get /api/usergroup
```
[
  {
    "id": Number,
    "groupid": Number,
    "group_name": String,
    "date_created": Date,
    "cash_balance": Number,
    "userid": Number,
    "user_name": String
  }
]
```


## Post /api/usergroup
```
[
  {
    "groupid": Number,
    "cash_balance": Number,
    "userid": Number,
  }
]
```


## Patch /api/usergroup
```
[
  {
    "id": Number,
    "cash_balance": Number,
  }
]
```


## Get /api/usergroup/groupid
```
[
  {
    "id": Number,
    "groupid": Number,
    "group_name": String,
    "date_created": Date,
    "cash_balance": Number,
    "userid": Number,
    "user_name": String
  }
]
```


## Get /api/usergraph
```
[
  {
    "id": Number,
    "groupid": Number,
    "date_created": Date,
    "userid": Number,
    "equity": Number
  }
]
```


## Post /api/usergraph
```
[
  {
    "groupid": Number,
    "userid": Number,
    "equity": Number
  }
]
```


## Post /api/usergraph
```
[
  {
    "id": Number,
    "equity": Number
  }
]
```

