FORMAT: 1A

# simple-discussion-board

Simple discussion board contains Threads with Messages. Both Threads and Messages are created by Users.
This is a demo project with a very basic functionality.

## Threads Collection [/threads{?limit}{?offset}]

### Get all Threads [GET]

List all threads. Returns basic information about the threads.
The request can specify limit and offset to allow pagination. 
Limit of 20 threads is used by default.

+ Parameters
    + limit (optional, number) ... Maximum number of Threads to retrieve
    + offset (optional, number) ... Index of first Thread

+ Response 200 (application/json)

        {
            "threads": [
                {
                    "id": 1,
                    "url": "/threads/1",
                    "title": "Thread 1",
                    "created": "2015-08-05T08:40:51.620Z",
                    "author": {
                        "username": "sharp",
                        "url": "/users/sharp",
                        "gravatar_url": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435"
                    }
                },
                
                {
                    "id": 2,
                    "url": "/threads/2",
                    "title": "Thread 2",
                    "created": "2015-10-05T08:40:51.620Z",
                    "author": {
                        "username": "sharp",
                        "url": "/users/sharp",
                        "gravatar_url": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435"
                    }
                }
            ],
            "limit": 20,
            "offset": 0,
            "next": "/threads?limit=20&offset=20",
            "prev": null
        }

### Create a new Thread [POST]

Create a new Thread as the current User.

+ Request (application/json)

    + Headers

            X-Board-Authorization: sharp

    + Body

            {
                "thread": {
                    "title": "New thread - 3",
                    "text": "Lorem ipsum..."
                }
            }

+ Response 201 (application/json)

    + Headers

            Location: /threads/3

    + Body

            {
                "id": 3,
                "url": "/threads/3",
                "title": "New thread - 3",
                "text": "Lorem ipsum...",
                "created": "2015-11-05T08:40:51.620Z",
                "author": {
                    "username": "sharp",
                    "url": "/users/sharp",
                    "gravatar_url": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435"
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "error": {
                    "message": "Unauthorized."
                }
            }

## Thread [/threads/{id}{?limit}{?offset}]

### Retrieve a single Thread [GET]

Retrive all Messages in a single Thread.

+ Parameters
    + id (number) ... Identifier of the Thread
    + limit (optional, number) ... Maximum number of Messages to retrieve
    + offset (optional, number) ... Index of first Message

+ Response 200 (application/json)

        {
            "thread": {
                    "id": 1,
                    "url": "/threads/1",
                    "title": "Thread 1",
                    "created": "2015-08-05T08:40:51.620Z",
                    "author": {
                        "username": "sharp",
                        "url": "/users/sharp",
                        "gravatar_url": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435"
                    }
            },
            "messages": [
                {
                    "id": 1,
                    "text": "Message 1",
                    "created": "2015-08-05T08:40:51.620Z",
                    "author": {
                        "username": "sharp",
                        "url": "/users/sharp",
                        "gravatar_url": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435"
                    }
                },
                
                {
                    "id": 2,
                    "text": "Message 2",
                    "created": "2015-10-05T08:40:51.620Z",
                    "author": {
                        "username": "sharp",
                        "url": "/users/sharp",
                        "gravatar_url": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435"
                    }
                }
            ],
            "limit": 20,
            "offset": 0,
            "next": "/threads/1?limit=20&offset=20",
            "prev": null
        }

### Create a new Message in Thread [POST]

Post new Message to a Thread.


+ Parameters
    + id ... Identifier of the Thread

+ Request (application/json)

    + Headers

            X-Board-Authorization: sharp

    + Body

            {
                "message": {
                    "text": "Lorem ipsum..."
                }
            }

+ Response 201 (application/json)

    + Body

            {
                "message": {
                    "id": 3,
                    "text": "Lorem ipsum...",
                    "created": "2015-11-15T20:40:51.620Z",
                    "author": {
                        "username": "sharp",
                        "url": "/users/sharp",
                        "gravatar_url": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435"
                    }
                }
            }

+ Response 401 (application/json)

    + Body

            {
                "error": {
                    "message": "Unauthorized."
                }
            }


## User login [/user/login]

### Log in [POST]

Retrieve a login token.

+ Request (application/json)

    + Body

            {
                "username": "sharp",
                "password": "password"
            }

+ Response 201 (application/json)

    + Body

            {
                "username": "sharp",
                "gravatar": "https://secure.gravatar.com/avatar/5a7155001ebcfb6cb2a3ffe0f1f05435",
                "token": "49rj34u9rj923"
            }

+ Response 401 (application/json)

    + Body

            {
                "error": {
                    "message": "Unauthorized."
                }
            }

## User logout [/user/logout]

### Log out [GET]

Log out the user.

+ Request (application/json)

    + Body

            {
                "token": "49rj34u9rj923"
            }

+ Response 201 (application/json)

