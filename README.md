# Auth Server

## Arkitektur

```mermaid
graph LR
    BF[business-frontend] -- "API Requests" --> BB[business-backend]
    AF[admin-frontend] -- "API Requests" --> AB[admin-backend]
    BB -- "API Calls for authentication" --> AS[auth-server]
    AB -- "Admin operations and login" --> AS

    BB -.-> DB[(Database)]
    AB -.-> DB[(Database)]
    AS -.-> DB[(Database)]

    classDef frontend fill:#f9f,stroke:#333,stroke-width:2px;
    classDef backend fill:#ccf,stroke:#333,stroke-width:2px;
    classDef database fill:#ffc,stroke:#333,stroke-width:2px;
    classDef auth fill:#fc9,stroke:#333,stroke-width:2px;

    class BF,AF frontend;
    class BB,AB backend;
    class AS auth;
    class DB database;
```

<hr>

## Sequence Diagram

```mermaid
sequenceDiagram
    participant BF as Business-Frontend
    participant BB as Business-Backend
    participant AS as Auth-Server
    participant DB as Database

    BF->>+BB: Send login credentials (username, password)
    BB->>+AS: Verify credentials
    AS->>+DB: Check user credentials in database
    DB-->>-AS: Return verification result
    alt credentials valid
        AS->>+AS: Generate access token
        AS-->>-BB: Send access token
        BB->>+BF: Return access token
        BF->>BF: Store access token and proceed to user session
    else credentials invalid
        AS-->>-BB: Send error message
        BB->>-BF: Relay error message
    end
```


<hr>

## Översikt

```mermaid
classDiagram
    class UserHandler {
        +getUserById(id)
        +getUsers()
        +addUser(user)
        +updateUser(id, details)
        +deleteUser(id)
    }

    class GroupHandler {
        +addGroup(groupName)
        +listGroups()
        +deleteGroup(groupName)
        +addUserToGroup(userId, groupName)
        +removeUserFromGroup(userId, groupName)
    }

    class AuthHandler {
        +generateAccessToken(user)
        +generateRefreshToken(user)
        +validateAccessToken(token)
        +validateRefreshToken(token)
        +generateCsrfToken()
    }

    class AdminController {
        +createUser()
        +getAllUsers()
        +getUser()
        +updateUser()
        +deleteUser()
        +createGroup()
        +getGroups()
        +deleteGroup()
        +addUserToGroup()
        +removeUserFromGroup()
    }

    class AuthController {
        +login()
        +refreshToken()
        +logout()
    }

    class AdminRoutes {
        --Routes linked to AdminController methods--
    }

    class AuthRoutes {
        --Routes linked to AuthController methods--
    }

    class Config {
        +readConfig()
        +getConfigValue(key)
    }

    class Service {
        --Starts the application--
    }

    class App {
        --Configures middleware and routes--
    }

    %% Linking modules
    AuthHandler --> UserHandler : Uses for Token Validation
    AdminController --> UserHandler : Manages Users
    AdminController --> GroupHandler : Manages Groups
    AuthController --> AuthHandler : Uses for Authentication Processes
    AdminRoutes --> AdminController : Routes to Controller
    AuthRoutes --> AuthController : Routes to Controller
    Service --> App : Initializes
    Config --> UserHandler : Provides Configuration
    Config --> GroupHandler : Provides Configuration
    Config --> AuthHandler : Provides Configuration
    App --> AdminRoutes : Includes Routes
    App --> AuthRoutes : Includes Routes
```
