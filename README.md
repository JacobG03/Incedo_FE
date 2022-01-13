# Ideas

- [ ] Each user's page will have its own theme be displayed publicaly too

## Store structure

Store {
  user {
    userInfo {
      username,
      verified
      ...
    }
    ..
  }
  theme
}

## Todos

- [ ] Styled Components
  - [x] Global styles
  - [x] Register Page
    - [x] Form
      - [x] Handle submit
      - [x] Check if navigation ho /home works after successful registration (cookies should be saved)
      - [x] Handle errors
      - [x] Redirect to /verify (create page first)
    - [x] Redux
  - [x] Login Page
    - [x] Form
    - [x] Redux
  - [ ] Home Page
- [ ] Axios
  - [ ] CSRF cookie in header
- [ ] Redux
  - [ ] User authentication
    - [x] Register
    - [x] Login
    - [ ] Logout
- [ ] Navbar
- [x] Redirect unauthenticated users to /login
  - [ ] Redirect back to original path, for e.g -> /notes/:id
- [ ] Transitions
  - [ ] Page transitions
    - [ ] / -> /login; /login -> /register; /register -> /login; etc
  - [ ] Path transitions
    - [ ] / -> /notes; /notes -> /notes/:id; /notes/:id/:id -> /; etc
