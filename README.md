# Space Web App
>Name: Raphael Alfy Asaad <br> Email:raphael277.eng.alfy@gmail.com <br> phone:01032486682 <br>
>First of all i want to aplologize for the uncomplete submition (frontEnd)
>because i had a problem within the iti which was that i had interviews todays which took me about 6+ hours travelling from alexandria and comming back to alexandria besides the interview time and i had to do the interview today , no way  or even no any execuse 
>But what i garantee is that what i submitted , represents me , my mindset and my experience and the ability to write clean code 
>and i will be waiting for your feedback and i will be ready to do any changes or any updates you want
>Finally , I repeat my apology for the uncomplete submition and i hope you understand my situation , I wished i had more time to do it better and to show you my full potential

## Project Description
>NASA is a well-known space organization that has been studying and exploring spacesince July 29, 1958. During this period of time they have built a marvelous collection of assets, images, videos, ..etc, of various parts of space. Fortunately they provide these assets for the public for free through their wonderful NASA APIs. The application helps users so that they can join and search for the content provided by the NASA APIs, save some to favorites for later.

## Api Documentation 
https://documenter.getpostman.com/view/20217613/2s93sf2BLu

## Features

- As an anonymous user, I can register/login for/to an account.
- As a verified user, I can search for content by typing inside a search box.
- As a verified user, I can add/remove an image/video to/from my “favorites”.

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables
Add in the config folder a file called `config.env` with the following:
```
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb+srv://raphael_99:Kamal_rafy%4099@cluster0.iq5hotq.mongodb.net/?retryWrites=true&w=majority

JWT_SECRET=hfsdl5o34hkh34kj56h4kl57h45olih6356h435h6l45h6l34h56k
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

NASA_API_KEY=wggWlRZOnqBPRNXQP3GPhapR0FmsDsfwDcCp3flx
```


Change the JWT_SECRET to a random string

### Install Dependencies

```
cd Backend
npm install
```

### Run

```
# Run backend (:5000)
npm run dev
```

## License

The MIT License

Copyright (c) 2023 Raphael Alfy raphael277.eng.alfy@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
