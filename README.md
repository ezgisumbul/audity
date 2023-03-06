# Audity

A project by: [Ezgi Sümbül](https://github.com/ezgisumbul), [Martin Kaumanns](https://github.com/MartinKaumanns) & [Johanna Michel](https://github.com/JohannaPeanut)

Full-Stack Application using React.js, SASS, MongoDB, REST-API, Axios, GoogleMaps API


## Table of content

- [General Info](https://github.com/ezgisumbul/audity/edit/master/README.md#general-info)
- [Demo](https://github.com/ezgisumbul/audity/edit/master/README.md#demo)
- [Overview](https://github.com/ezgisumbul/audity/edit/master/README.md#overview)
- [Features](https://github.com/ezgisumbul/audity/edit/master/README.md#features)
- [Setup](https://github.com/ezgisumbul/audity/edit/master/README.md#setup)

## General Info

Audity is not just an app, but a collective sound memory. On this platform you can upload your field recordings, share them with others, or listen to recordings of others and collect them in different libraries. On Audity you can network globally: You can follow your favorite users and view their sound collections. Use tags, keyword search or the interactive map, to find and download sounds for your projects! Audity is a low hierarchy platform open to all ears - from sound engineers, artists, radio producers to hobby sound lovers. Audity's sound topographies grow continuously - as does its community. Become part of this collective, artistic and non-commercial project now!

## Demo

Here is a live demo : https://audity-app.netlify.app/

## Overview

### Landing Page

<img width="600" alt="landing-page" src="https://user-images.githubusercontent.com/32699859/223001876-b0c37ef6-9b75-4719-9565-9dac185cf874.png">

### Uploading sounds

<img width="600" alt="create-sound" src="https://user-images.githubusercontent.com/32699859/223002636-78111f54-b233-4d51-8c24-a69f659823de.png">

### Sound search

<img width="600" alt="sound-search" src="https://user-images.githubusercontent.com/32699859/223002753-f6c39e58-bfa1-47f9-ae04-b7111f8acea3.png">
  
### Sound libraries

<img width="600" alt="library" src="https://user-images.githubusercontent.com/32699859/223002403-668e4753-847e-4b53-a97e-8c21d28ca370.png">

### Mobile support

Audity is designed with a mobile first approach and is compatible with devices of all sizes.

<img width="375" alt="mobile" src="https://user-images.githubusercontent.com/32699859/223002833-aa87f0ca-0eba-4f05-9bb6-1ebeec7f9956.png">

## Features
- Creating a profile
- Uploading sounds
- Sound search and filtering
- Creating sound libraries
- Adding sounds to sound libraries
- User search
- User messages
- Following users

## Setup
#### Prerequisites: 

node.js, npm and MongoDB Compass are installed.

#### Steps:

1. Clone the repo `$ git clone https://github.com/ezgisumbul/audity.git`
2. Navigate into the client directory `cd audity/client`
3. Install the dependencies
`$ npm install`
4. Remove the .dist extension of the provided .env.dist file in the client directory
5. [Create a GoogleMaps API key ](https://developers.google.com/maps/documentation/javascript/get-api-key) and update **REACT_APP_GOOGLE_MAPS_API_KEY**
6. Navigate into the server directory `cd audity/server`
7. Install the dependencies
`$ npm install`
8. Remove the .dist extension of the provided .env.dist file in the server directory
9. Set up a **SESSION_SECRET**
10. [Create a Cloudinary account](https://cloudinary.com) and [update](https://www.youtube.com/watch?v=1SIp9VL5TMo&ab_channel=Cloudinary) **CLOUDINARY_NAME**, **CLOUDINARY_API_KEY** and **CLOUDINARY_API_SECRET**

Now you are ready to run the application.

11. Navigate into server directory and run
`$ npm run dev`
12. Navigate into client directory and run
`$ npm start`
