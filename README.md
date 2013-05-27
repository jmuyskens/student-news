# Student News
## About

This is a simple web application to display community news bulletins. It is written in Python using the [Flask](http://flask.pocoo.org/docs/) framework. It is a response to the current state of student news at my school where email is sent as a ugly mailing list digest. Out-of-the-box this creates a site specific to my school, Calvin College, but it can easily be customized to your institution or organization.

## Installation

This project depends on Flask, so `pip install flask` if you don't already have it.

Be sure to initiate the database:

   `$ python`

   `>>> from news import init_db`

   `>>> init_db()`

Then `python news.py` and open a browser to `localhost:5000/`.

To add a new post, in the url bar type `localhost:5000/login`. The default username is `admin` and the password is `default`. These can be configured in `news.py`. `/logout` to log out.

## The Plan

The application is pretty basic as it stands. It is little more than an extension of the [Flask tutorial](http://flask.pocoo.org/docs/tutorial/). For the posting mechanism, I plan to add a user-facing posting interface. User posts will be reviewed by way of a spruced up administator dashboard. As for the posts themselves, I will add time information like post and expiration dates, tagging, and potentially some image support. Tags would be selected from small set, for example `Free`, `Art`, `Music`, `Film`, `Refreshments`, `Comedy`, `Social Justice`, etc. In the future, I would also like to add cookies for a more dynamic experience (e.g. highlighting new posts since you last visited) and Facebook integration so logged in users can like or rsvp to news items connected to Facebook events. Another idea would be to offer a daily or weekly email digest to replace the current student news emails.
   
