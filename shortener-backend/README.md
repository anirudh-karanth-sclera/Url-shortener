
```
shortner
├─ .mvn
│  └─ wrapper
│     └─ maven-wrapper.properties
├─ mvnw
├─ mvnw.cmd
├─ pom.xml
└─ src
   ├─ main
   │  ├─ java
   │  │  └─ com
   │  │     └─ shortner
   │  │        └─ ungari
   │  │           └─ shortner
   │  │              ├─ config
   │  │              │  ├─ JwtFilter.java
   │  │              │  └─ SecurityConfig.java
   │  │              ├─ controller
   │  │              │  ├─ ShortUrlController.java
   │  │              │  └─ UserController.java
   │  │              ├─ model
   │  │              │  ├─ Url.java
   │  │              │  ├─ UserDTO.java
   │  │              │  ├─ UserPrincipal.java
   │  │              │  └─ Users.java
   │  │              ├─ Repository
   │  │              │  ├─ UrlRepo.java
   │  │              │  └─ UserRepo.java
   │  │              ├─ service
   │  │              │  ├─ JWTService.java
   │  │              │  ├─ MyUserDetailsService.java
   │  │              │  ├─ UrlServiceDao.java
   │  │              │  └─ UserService.java
   │  │              └─ ShortnerApplication.java
   │  └─ resources
   │     ├─ application.properties
   │     ├─ static
   │     └─ templates
   └─ test
      └─ java
         └─ com
            └─ shortner
               └─ ungari
                  └─ shortner
                     └─ ShortnerApplicationTests.java

```