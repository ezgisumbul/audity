# Audity

Link: https://audity-app.netlify.app/

Full-Stack Application using React.js, SASS, MongoDB, REST-API, Axios, GoogleMaps API

About: Audity is not just an app, but a collective sound memory. On this platform you can upload your field recordings, share them with others, or listen to recordings of others and collect them in different libraries. On Audity you can network globally: You can follow your favorite users and view their sound collections. Use tags, keyword search or the interactive map, to find and download sounds for your projects! Audity is a low hierarchy platform open to all ears - from sound engineers, artists, radio producers to hobby sound lovers. Audity's sound topographies grow continuously - as does its community. Become part of this collective, artistic and non-commercial project now!

## Client

### Pages

- Home - / - Display about text, sounds on a map, links to sign in / sign up.

- Register - /register - Allows visitor to create account with name, email, password and profile picture and -sound.
- Log In - /log-in - Allows existing user to log-in.
- Profile Search - /profile/search - Search for users.
- Profile Edit - /profile/edit - Allows authenticated user to edit their profile.
- Profile - /profile/:id - Visualize users' profile and sounds they uploaded publicly.

- Sound Search - /sound/search - Search for sounds with tags / free text search / quality.
- Sound Add - /sound-create - Allows user to add a sound with title, description, tags, quality - privately or publicly - locate it on the map.
- Sound Detail - /sound/:id - Visualize single sound details, incl. map, allows authenticated users to contact owner, allows authenticated users to bookmark sound.
- Sound Edit - /sound/:id/edit - Allows authenticated user, that is creator of the sound to edit house that is up for rent.

- Sound library Add - /library/create - Allows authenticated user to create a sound library.
- Sound library edit - /library/:id/edit - Allows authenticated user, who is the creator of this library to edit a sound library.
- Sound library Detail - /library/:id
- Sound library list of single user - /library/:userId/list - Displays all sound libraries of a single user.
- Sound library authenticated user - /library/:userId/my-libraries - Displays all sound libraries of authenticated user

- Message Thread List - /message/list - Lists all message threads of an authenticated user.
- Message Thread Detail - /message/:id - Displays single message thread between authenticated user and another user. Allows authenticated userd to send new message.

- Follower list - /profile/:id/follower - Displays all followers of a single user.
- Following list - /profile/:id/following - Displays all user that a single user is following.

### Services

- registerUser - issues POST to '/authentication/sign-up' - Registers new user.
- logInUser - issues POST to '/authentication/sign-in' - Authenticates existing user.
- signOutUser - issues POST to '/authentication/sign-out' - Signs out user.
- loadUserInformation - issues GET to '/authentication/me' - Loads information about authenticated user.

- profileSearch - issues GET to '/profile/search' - Allows user to search for other user profiles.
- profileLoad - issues GET to '/profile/:id' - Loads single users profile.
- profileEdit - issues PATCH to '/profile' - Edit authenticated users profile.

- soundSearch - issues GET to '/sound/search' - Allows user to search for sounds.
- soundLoad - issues GET to '/sound/:id' - Loads single sound.
- soundList - issues a GET to '/sound/list' - Lists all sounds.
- soundEdit - issues PATCH to '/sound/:id' - Allows user to edit sounds they uploaded publicly.
- soundCreate - issues POST to '/sound' - Adds a new sound.

- addBookmark - issues POST to '/sound/:id/bookmark' - Set bookmark for this sound on this users profile.
- listAvailableLibraries - issues GET to '/sound/:id/selectable-libraries' - List all sound libraries of single user, which sound is not already part of.

- listLibraries - issues a GET to '/library/:userId/list' - Lists all libraries of sngle user
- listMyLibraries - issues a GET to '/library/:userId/my-libraries' - Lists all libraries of authenticated user.
- libraryCreate - issues a POST to '/library/create' - Creates a sound library.
- libraryEdit - issues a PATCH to '/library/:id' - Edits existing library of authenticated user.
- libraryDelete - issues DELETE to '/library/:id' - Removes library.
- loadLibrary - issues a GET to '/library/:id' - Loads all sounds from single library.
- removeFromLibrary - issues a PATCH to '/library/:id/my-libraries' - Edits existing sound library of Authenticated user.

- messageThreadList - issues a GET to '/message/list' - List all message threads of an authenticated user.
- messageThreadLoad - issues a GET to '/message/:id' - List all messages between authenticated user and user of id param.
- messageSend - issues a POST to '/message/:id' - Send message between authenticated user and user of id param.

- followUser - issues a POST to '/profile/:id/follow' - Authenticated user follows single user.
- followedLoad - issues a GET to '/profile/:id/followed' - List all users who are followed by authenticated user.
- followerLoad - issues a GET to '/profile/:id/follower' - List all users who follow authenticated user.
- unFollowUser - issues a DELETE to '/profile/:id/unfollow - Authenticated user stops following a single user.

## Server

### Models

- User

  - name: String, required, trim
  - email: String, required, trim, lowercase
  - passwordHashAndSalt: String, required
  - description: String, maxlength: 400
  - picture: String
  - sound: String

- Library

  - user: ObjectId, ref: 'User', required
  - sound: ObjectId, ref: 'Sound', required
  - title: String, required
  - createdAt: Date (setting timestamps option on schema to true)

- Sound

  - title: String, required, trim, maxlength: 36
  - tags: Sring, enum
  - price: Number, required, min: 0
  - bedrooms: Number, required: min: 0
  - position: { type: String, default: 'Point', coordinates: [ Number ], default: [-6.101178540392873, 105.42380264840183] }
  - published: Boolean, required
  - owner: ObjectId, ref: 'User', required
  - soundFile: String, required
  - description: String, maxLength: 400, trim
  - quality: String, enum, required
  - recordedAt: String
  - createdAt: Date (setting timestamps option on schema to true)

- Message

  - content: String, required, minlength: 1, maxlength: 5000, trim
  - sender: ObjectId, ref: 'User', required
  - receiver: ObjectId, ref: 'User', required
  - createdAt: Date (setting timestamps option on schema to true)

- Follow

  - follower: ObjectId, ref: 'User', required
  - followed: ObjectId, ref: 'User', required

### Request Handlers

- POST - '/authentication/sign-up' - Registers new user.
- POST - '/authentication/sign-in' - Authenticates existing user.
- POST - '/authentication/sign-out' - Signs out user.
- GET - '/authentication/me' - Loads information about authenticated user.
- GET - '/profile/search' - Allows user to search for other user profiles.
- GET - '/profile/:id' - Loads single users profile.
- PATCH - '/profile' - Edit authenticated users profile.

- GET - '/sound/search' - Allows user to search for sounds.
- GET - '/sound/:id' - Loads single sound.
- GET - '/sound/list' - Lists all sounds.
- PATCH - '/sound/:id' - Allows user to edit sounds they uploaded publicly.
- POST - '/sound' - Adds a new sound.
- POST - '/sound/:id/bookmark' - Set bookmark for this sound on this users profile.
- GET - '/sound/:id/selectable-libraries' - List all sound libraries of single is not already part of.

- GET - '/library/:userId/list' - Lists all libraries of sngle user
- GET - '/library/:userId/my-libraries' - Lists all libraries of authenticated user.
- POST - '/library/create' - Creates a sound library.
- PATCH - '/library/:id' - Edits existing library of authenticated user.
- DELETE - '/library/:id' - Removes library.
- GET - '/library/:id' - Loads all sounds from single library.
- PATCH - '/library/:id/my-libraries' - Edits existing sound library of Authenticated

- GET - '/message/list' List all message threads of an authenticated user.
- GET - '/message/:id' - List all messages between authenticated user and user of id
- POST '/message/:id' - Send message between authenticated user and user of id param.

- POST - '/profile/:id/follow' - Authenticated user follows single user.
- GET - '/profile/:id/followed' - List all users who are followed by authenticated user.
- GET - '/profile/:id/follower' - List all users who follow authenticated user.
- DELETE - '/profile/:id/unfollow - Authenticated user stops following a single user.

## Wishlist

- Recording sound function.
- Implement payment.
- Custom styled player.
