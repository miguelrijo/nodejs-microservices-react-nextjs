I am improving my microservices knowledge with "Microservices with Node JS and React" course by Stephen Grider.

So far I have studied and practiced Docker, K8s, Scaffold and microservices good practices. 

Apps:

***********BLOG***********

Blog is a simple post/comment app designed to teach microservices basic infrasctructure. I created a micro for a react app that would show a form to create posts, a list of post and each post contain another form for inserting comments.

There are 6 micros:
client ( Create React App), comments ( Insert comments)
posts (posts insertion),
comment ( comments insertion )
query ( posts and comments lists)
event-bus ( this broadcasts events to all micros ( new post, new comment, etc)
moderator ( comments are created with -toBeModerated status, this service upod receiving the post created event decides which status need to be set)

NOTE: Blog project is not a production ready project, since by design this first project is about 'recreating the wheel' to get to know how things work under the hood.
